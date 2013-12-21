var should = require('should');
var path= require('path');
var sinon = require('sinon');
module.exports = {

  '#synchronizeGoogleContacts':{
    'should parse csv and make request':function(done){

      sinon.stub(glob.modules,'debitoor').yields(null,null,{name:"just an object"});
      glob.service.customer.synchronizeGoogleContacts({path:'fake/contacts.csv'},function(err,response){
         should.exist(response);
         response.should.be.instanceof(Array).and.have.lengthOf(5);
         done();
       });
    },
    after:function(){
      glob.modules.debitoor.restore();
    }
  }

}
