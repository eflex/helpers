'use strict'
/**
  Example:
  config:
  {
    target: "...",
    merchant_id: "...",
    user_id: "..."
    pin: "..."
  }

  var elavon = Elavon(config);
  var result = yield elavon.process(data);

  note:
    ssl_result = 0 (transaction success)
*/

var request = require('koa-request');

function *convertToObject(str){
  var arr_result = str.trim().split("\n");
  var obj_result = {};
  arr_result.forEach(function(val){
    var tmp = val.split("=");
    obj_result[tmp[0]] = tmp[1];
  });
  return obj_result;
}

export default class Elavon {
  constructor (config){
    this.target = config.target;
    this.merchant_id = config.merchant_id;
    this.user_id = config.user_id;
    this.pin = config.pin;
    this.transaction_type = "ccsale";
  }

  * process(data){
    /* set default values */
    if(!data.ssl_merchant_id) data.ssl_merchant_id = this.merchant_id;
    if(!data.ssl_user_id) data.ssl_user_id = this.user_id;
    if(!data.ssl_pin) data.ssl_pin = this.pin;
    if(!data.ssl_transaction_type) data.ssl_transaction_type = this.transaction_type;

    data.ssl_result_format = "ascii";
    data.ssl_show_form = false;
    data.ssl_cvv2cvc2_indicator = 1;

    try{
      var result = yield request.post(this.target, {form: data})
      return yield convertToObject(result.body);
    }catch(e){
      throw (e.message);
    }
  }
}
