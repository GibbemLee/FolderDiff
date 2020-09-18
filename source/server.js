//https://hongku.tistory.com/94

var http = require('http');
var fs = require('fs');
var queryString = require('querystring');
var main = require('./main_server');

function send404Message(response)
{
  response.writeHead(404, {"Content-Type":"text/plain"});
  response.write("404 ERROR...");
  response.end();
}

function onRequest(request,response)
{
  if(request.method == 'GET' && request.url == '/')
  {
    response.writeHead(200, {"Content-Type":"text/html"});
    fs.createReadStream("./folderDiff.html").pipe(response);
  }
  else if(request.method == 'POST')
  {
    request.on('data', function(chunk){
      var data = queryString.parse(chunk.toString());
      console.log("folder1:",data.folder1,"folder2:",data.folder2, "save:",data.savediff);
      main.searchDiff(data.folder1, data.folder2, data.savediff);
      response.write('diff result saved in '+data.savediff);
      response.end();
    });
  }
  else
  {
    send404Message(response);
  }
}

http.createServer(onRequest).listen(8888);
console.log("Server Created...");
