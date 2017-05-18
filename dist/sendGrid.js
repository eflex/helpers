'use strict';
/**
  var sendgrid = new SendGrid(config);
  var result = yield sendgrid.setData({...}).send();
        or yield sendgrid.send({...})


  for more information check:
    https://github.com/sendgrid/sendgrid-nodejs#usage
*/

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _sendgrid = require('sendgrid');

var _sendgrid2 = _interopRequireDefault(_sendgrid);

var SendGrid = (function () {
  function SendGrid(config) {
    _classCallCheck(this, SendGrid);

    if (!(this instanceof SendGrid)) return new SendGrid(config);

    if (!config.username) throw new Error('Sendgrid username missing');
    if (!config.password) throw new Error('Sendgrid password missing');

    this.sendgrid = (0, _sendgrid2['default'])(config.username, config.password);
  }

  /*
    {
      to:       [],
      toname:   [],
      from:     '',
      fromname: '',
      subject:  '',
      text:     '',
      html:     '',
      bcc:      [],
      replyto:  '',
      date:     new Date(),
      files: [
        {
          filename:     '',           // required only if file.content is used.
          contentType:  '',           // optional
          cid:          '',           // optional, used to specify cid for inline content
          path:         '',           //
          url:          '',           // == One of these three options is required
          content:      ('' | Buffer) //
        }
      ],
      file_data:  {}
    }
  */

  _createClass(SendGrid, [{
    key: 'setData',
    value: function setData(data) {
      this.data = data;
      return this;
    }

    /* yieldable .send */
  }, {
    key: 'send',
    value: function send(data) {
      this.data = data;

      var sendgrid = this.sendgrid;
      var email = new sendgrid.Email(this.data);

      return function (cb) {
        sendgrid.send(email, cb);
      };
    }
  }]);

  return SendGrid;
})();

exports['default'] = SendGrid;
module.exports = exports['default'];