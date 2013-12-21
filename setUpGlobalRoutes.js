
module.exports = {
  init: function (app) {

    app.all('/api/debitoor/*', function (req, res) {
      var path = req.url.substr(13);
      var requestConfig = {url: path,json:true,body:req.body,method:req.method};
      glob.modules.debitoor(requestConfig,function(err,response,body){
        if (err){
          res.send(err);
        }
        else{
          res.send(body);
        }
      });
    });
    app.post('/contacts/uploadCsv', function (req, res) {
        var csvFile = req.files.file;
        glob.service.customer.synchronizeGoogleContacts(csvFile,function(err,customers){
           if (err){
             res.send(500,err.message);
           }
           else{
             res.send(customers);
           }
        });
      });
  }
}
