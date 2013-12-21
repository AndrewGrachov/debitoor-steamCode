var async = require('async');
module.exports = function(file,callback){
  var factories = glob.factories;
  var actions = {
    parseCsv:function(callback){
      factories.customer.getCustomersFromGoogleCsv(file.path,callback)
    },
    uploadToServer:function(customers,callback){
      var parallelHandlers = [];

      customers.forEach(function (contact) {
        parallelHandlers.push(function (pcallback) {
          glob.modules.debitoor('/customers', {json: contact, method: 'POST'}, function (err, response, body) {
            pcallback(err, body);
          });
        });
      });
      async.parallel(parallelHandlers,callback);
    }
  }
    async.waterfall([actions.parseCsv,actions.uploadToServer],callback)
}