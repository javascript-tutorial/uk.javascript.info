let http = require('http');
let static = require('node-static');
let fileServer = new static.Server('.');
let path = require('path');
let fs = require('fs');
let debug = require('debug')('example:resume-upload');

let uploads = Object.create(null);

function onUpload(req, res) {

  let fileId = req.headers['x-file-id'];
  let startByte = +req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }

  // ми будемо зберігати файли в "нікуди"
  let filePath = '/dev/null';
  // замість цього можна використовувати реальний шлях, наприклад
  // let filePath = path.join('/tmp', fileId);

  debug("onUpload fileId: ", fileId);

  // ініціалізуємо нове завантаження
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

  let fileStream;

  // якщо startByte не встановлений або дорівнює 0, то створюємо новий файл, в противному випадку перевіряємо розмір і додаємо дані до наявного файлу
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    debug("New file created: " + filePath);
  } else {
    // ми також можемо перевірити розмір файлу на диску, щоб бути впевненими
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    // додати дані до наявного файлу
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    debug("File reopened: " + filePath);
  }


  req.on('data', function(data) {
    debug("bytes received", upload.bytesReceived);
    upload.bytesReceived += data.length;
  });

  // відправляємо тіло запиту у файл
  req.pipe(fileStream);

  // коли запит буде завершено, і всі його дані будуть записані
  fileStream.on('close', function() {
    if (upload.bytesReceived == req.headers['x-file-size']) {
      debug("Upload finished");
      delete uploads[fileId];

      // тут можна зробити ще щось інше із завантаженим файлом

      res.end("Success " + upload.bytesReceived);
    } else {
      // з’єднання втрачено, ми зберігаємо незавершений файл
      debug("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

  // у разі помилки введення/виводу - завершити запит
  fileStream.on('error', function(err) {
    debug("fileStream error");
    res.writeHead(500, "File error");
    res.end();
  });

}

function onStatus(req, res) {
  let fileId = req.headers['x-file-id'];
  let upload = uploads[fileId];
  debug("onStatus fileId:", fileId, " upload:", upload);
  if (!upload) {
    res.end("0")
  } else {
    res.end(String(upload.bytesReceived));
  }
}


function accept(req, res) {
  if (req.url == '/status') {
    onStatus(req, res);
  } else if (req.url == '/upload' && req.method == 'POST') {
    onUpload(req, res);
  } else {
    fileServer.serve(req, res);
  }

}




// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Server listening at port 8080');
} else {
  exports.accept = accept;
}
