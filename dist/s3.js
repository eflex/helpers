'use strict';
/**
  Example:
  var s3 = new S3(config)

  var result = yield s3.upload(src, dest);
  var result = yield s3.uploadStream(readable_stream, dest);

  // return file in the browser
  var file = yield s3.download(file_name);
  this.type = path.extname(file_name);
  this.body = file;

  var result = yield s3.delete(location)

  // success:
  .statusCode == 200

  *note:
    for more information check
      https://github.com/LearnBoost/knox

*/
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _knox = require('knox');

var _knox2 = _interopRequireDefault(_knox);

var _knoxMpu = require('knox-mpu');

var _knoxMpu2 = _interopRequireDefault(_knoxMpu);

var S3 = (function () {
  function S3(config) {
    _classCallCheck(this, S3);

    if (!(this instanceof S3)) return new S3(config);

    this.s3_client = _knox2['default'].createClient({
      key: config.key,
      secret: config.secret,
      bucket: config.bucket
    });
  }

  _createClass(S3, [{
    key: 'upload',
    value: function upload(src, dest) {
      if (!(src instanceof _stream2['default'].Readable)) src = _fs2['default'].createReadStream(src);

      var client = this.s3_client;
      return function (cb) {
        new _knoxMpu2['default']({ client: client, objectName: dest, stream: src }, cb);
      };
    }
  }, {
    key: 'uploadStream',
    value: function uploadStream(readable_stream, dest) {
      var client = this.s3_client;
      return function (cb) {
        new _knoxMpu2['default']({ client: client, objectName: dest, stream: readable_stream }, cb);
      };
    }

    /**
      return a readable stream
    */
  }, {
    key: 'download',
    value: function download(file_name) {
      var client = this.s3_client;
      return function (cb) {
        client.getFile(file_name, cb);
      };
    }
  }, {
    key: 'delete',
    value: function _delete(file_name) {
      var client = this.s3_client;
      return function (cb) {
        if (file_name instanceof Array) {
          client.deleteMultiple(file_name, cb);
        } else {
          client.deleteFile(file_name, cb);
        }
      };
    }
  }]);

  return S3;
})();

exports['default'] = S3;
module.exports = exports['default'];