var should = require('should');
var sinon = require('sinon');
var _ = require('lodash');
var restApi = {customers:[{name:'buddy',id:1},{name:'secondBuddy',id:2},{name:'thirddBuddy',id:3}]}
module.exports = {
  before: function () {

  },
  '#list()':{
    'Should return a list of customers':function(done){
      sinon.stub(glob.modules,'debitoor').yields(null,null,restApi.customers);
      var requestConfig = {url:'/customers',method:'GET',json:true}
      glob.modules.debitoor(requestConfig,function(err,response,body){
        console.log('body:',body);
        should.not.exist(err);
        should.not.exist(response);
        should.exist(body);
        body.should.be.instanceof(Array).and.have.lengthOf(3);
        console.log('ok');
        done();
      })
    },
    after:function(){
      glob.modules.debitoor.restore();
    }
  }
}