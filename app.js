
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
var request = require('request');
var fs = require('fs');
var app = express();
var globalRoutes = require("./setUpGlobalRoutes")

global.glob = {
    config:require("./config"),
    factories:require("./factories"),
    service:require("./service"),
    modules:{
      fs:require('fs')

    }
}
glob.modules.debitoor= require('debitoor')(glob.config.app.app_token)


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/uploads' }));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res){
   path = "./app/index.html"
   fs.readFile(path,function (err,content){
      if (err){
        throw err
      }
      else
        res.setHeader("Content-Type","text/html;charset=utf8");
        res.setHeader("content-length",content.length);
        res.send(content)
   })
});

globalRoutes.init(app)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
