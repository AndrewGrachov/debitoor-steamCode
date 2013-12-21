var async = require('async');
var csv = require('csvtojson');

function keysToLowerCase(obj) {
  Object.keys(obj).forEach(function (key) {
    var k = key.toLowerCase();
    if (k != key) {
      obj[k] = obj[key];
      delete obj[key];
    }
  });
  return (obj);
}

maps = {
  googleContact: function (data) {
    return {
      name: data.name,
      address: data['address 1 - formatted'],
      phone: data['phone 1 - value'],
      email: data['e-mail 1 - value'],
      homepage: data['website 1 - value'],
      vatNumber: '123',
      paymentTermsId: 1,
      'countryName': data['address 1 - country'] || 'Denmark',
      'isArchived': false,
      'countryCode': 'UA' //todo:add Resolver
    }
  }
}


module.exports = {
  getCustomerFrom: function (data, map) {
    if (maps[map]) {
      return maps[map](data);
    }
    else return null;
  },
  getCustomersFrom: function (array, map) {
    var result = [];
    var self = this;
    array.forEach(function (arrayItem) {
      var customer = self.getCustomerFrom(arrayItem, map);
      if (customer) {
        result.push(customer)
      }
    });
    return result;
  },
  getCustomersFromGoogleCsv: function (filePath, callback) {
    var fs = glob.modules.fs;
    var self = this;
    var actions = {
      readFile: function (callback) {
        fs.readFile(filePath, {encoding: 'UTF-16LE'}, callback)
      },
      parseCsv: function (contents, callback) {
        console.log('contents',contents.toString());
        var csvConverter = new csv.core.Converter();
        csvConverter.on('error', callback);
        csvConverter.on('end_parsed', function (jsonObj) {

          var contacts = jsonObj.csvRows.map(function (object) {
            return keysToLowerCase(object);
          });
          callback(null, contacts);
        });
        csvConverter.from(contents.toString());
      },
      transform:function(jsonContacts,callback){

        var customers = self.getCustomersFrom(jsonContacts,'googleContact');
        callback(null,customers);
      }
    }
    async.waterfall([actions.readFile, actions.parseCsv,actions.transform], callback);
  }
}
