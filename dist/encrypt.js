'use strict';
/**
  Example:

    var encrypt = this.helpers.encrypt();
    var password = encrypt.generate('...')
    if(encrypt.check('...', password))
      ...
*/

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var bcrypt = require('bcryptjs');

var Encrypt = (function () {
  function Encrypt() {
    _classCallCheck(this, Encrypt);
  }

  _createClass(Encrypt, [{
    key: 'generate',
    value: function generate(raw) {
      if (!raw) throw new Error("raw is required");

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(raw, salt);

      return hash;
    }
  }, {
    key: 'check',
    value: function check(raw, encrypted) {
      if (!raw) throw new Error("argument raw is required");
      if (!encrypted) throw new Error('argument encrypted is required');

      return bcrypt.compareSync(raw, encrypted);
    }
  }]);

  return Encrypt;
})();

exports['default'] = Encrypt;
module.exports = exports['default'];