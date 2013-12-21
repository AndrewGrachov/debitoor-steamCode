var should = require('should');
var path = require('path');
module.exports = {
  before: function () {
    global.glob = {
      factories: require('../factories'),
      config: require('../config'),
      modules: {fs: require('./mocks/fs').create({'fake': {'contacts.csv': 2}})},
      service:require('../service'),
      mocks: {
        fs: require('./mocks/fs')
      }
    }
    glob.modules.debitoor = require('debitoor')(glob.config.app.app_token);
    glob.mockGoogleCsv = ['Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Group Membership,E-mail 1 - Type,E-mail 1 - Value,Phone 1 - Type,Phone 1 - Value,Address 1 - Type,Address 1 - Formatted,Address 1 - Street,Address 1 - City,Address 1 - PO Box,Address 1 - Region,Address 1 - Postal Code,Address 1 - Country,Address 1 - Extended Address,Website 1 - Type,Website 1 - Value',

      'Автомотозип,Автомотозип,,,,,,,,,,,,,,,,,,,,,,,,,* My Contacts,,,Mobile,+380961386500,Home,"Украина, Харьков, ул. Пушкинская,43","ул. Пушкинская,43",Харьков,,,,Украина,,Profile,automotozip.ua',
      'Алексей мото мастер,Алексей мото мастер,,,,,,,,,,,,,,,,,,,,,,,,,* My Contacts,,,Mobile,0636295078,,,,,,,,,,,',
      'Алексей такси,Алексей такси,,,,,,,,,,,,,,,,,,,,,,,,,* My Contacts,,,Mobile,0636303553,,,,,,,,,,,',
      'Андрюха водолага,Андрюха водолага,,,,,,,,,,,,,,,,,,,,,,,,,* My Contacts,,,Mobile,+380990274552,,,,,,,,,,,',
      'Валерий Черепанов,Валерий,,Черепанов,,,,,,,,Троллера,,,,,,,,,,,,,,,* My Contacts,,,Mobile,0632732034,,,,,,,,,,,'].join('\n');
    glob.modules.fs.writeFile('fake/contacts.csv', glob.mockGoogleCsv, function (err, file) {
    });

  },
  customerFactory: {
    '#getCustomerFrom()': {
      'should return customer from google contact': function () {
        var mockObject = {
          name: "Joe",
          'address 1 - formatted': "Joe street,4",
          'phone 1 - value': '123456789',
          'e-mail 1 - value': 'joe@joe.com',
          'website 1 - value': 'http://example.com',
          'address 1 - country': 'Ukraine'
        }
        console.log('we are at getCustomer from');
        var customer = glob.factories.customer.getCustomerFrom(mockObject, 'googleContact');
        customer.name.should.equal('Joe');
        customer.address.should.equal('Joe street,4');
        customer.phone.should.equal('123456789');
        customer.homepage.should.equal('http://example.com');
        customer.countryName.should.equal('Ukraine');
      }
    },
    '#getCustomersFrom()': {
      'should return array customers from': function () {
        var mockObjects = [
          {
            name: "Joe",
            'address 1 - formatted': "Joe street,4",
            'phone 1 - value': '123456789',
            'e-mail 1 - value': 'joe@joe.com',
            'website 1 - value': 'http://example.com',
            'address 1 - country': 'Ukraine'
          },
          {
            name: "Joe2",
            'address 1 - formatted': "Joe street,5",
            'phone 1 - value': '123456789',
            'e-mail 1 - value': 'joe@joe.com',
            'website 1 - value': 'http://example.com',
            'address 1 - country': 'Ukraine'
          },
          {
            name: "Joe3",
            'address 1 - formatted': "Joe street,6",
            'phone 1 - value': '123456789',
            'e-mail 1 - value': 'joe@joe.com',
            'website 1 - value': 'http://example.com',
            'address 1 - country': 'Ukraine'
          }
        ]
        var customers = glob.factories.customer.getCustomersFrom(mockObjects, 'googleContact');

        customers.length.should.equal(3);
      }
    },
    '#getCustomersFromGoogleCsv()': {
      'should read csvFile and return json formatted customers': function (done) {
        var fs = glob.modules.fs;


        glob.factories.customer.getCustomersFromGoogleCsv('fake/contacts.csv', function (err, contents) {
          console.log('contents:', contents);
          should.not.exist(err);
          contents.length.should.equal(5);
          done();
        });

      }
    }
  }
}
