'use strict';
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

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var marked0$0 = [convertToObject].map(regeneratorRuntime.mark);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var request = require('koa-request');

function convertToObject(str) {
  var arr_result, obj_result;
  return regeneratorRuntime.wrap(function convertToObject$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        arr_result = str.trim().split("\n");
        obj_result = {};

        arr_result.forEach(function (val) {
          var tmp = val.split("=");
          obj_result[tmp[0]] = tmp[1];
        });
        return context$1$0.abrupt('return', obj_result);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

var Elavon = (function () {
  function Elavon(config) {
    _classCallCheck(this, Elavon);

    this.target = config.target;
    this.merchant_id = config.merchant_id;
    this.user_id = config.user_id;
    this.pin = config.pin;
    this.transaction_type = "ccsale";
  }

  _createClass(Elavon, [{
    key: 'process',
    value: regeneratorRuntime.mark(function process(data) {
      var result;
      return regeneratorRuntime.wrap(function process$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            /* set default values */
            if (!data.ssl_merchant_id) data.ssl_merchant_id = this.merchant_id;
            if (!data.ssl_user_id) data.ssl_user_id = this.user_id;
            if (!data.ssl_pin) data.ssl_pin = this.pin;
            if (!data.ssl_transaction_type) data.ssl_transaction_type = this.transaction_type;

            data.ssl_result_format = "ascii";
            data.ssl_show_form = false;
            data.ssl_cvv2cvc2_indicator = 1;

            context$2$0.prev = 7;
            context$2$0.next = 10;
            return request.post(this.target, { form: data });

          case 10:
            result = context$2$0.sent;
            context$2$0.next = 13;
            return convertToObject(result.body);

          case 13:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 16:
            context$2$0.prev = 16;
            context$2$0.t0 = context$2$0['catch'](7);
            throw context$2$0.t0.message;

          case 19:
          case 'end':
            return context$2$0.stop();
        }
      }, process, this, [[7, 16]]);
    })
  }]);

  return Elavon;
})();

exports['default'] = Elavon;
module.exports = exports['default'];