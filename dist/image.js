'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

/**
  Example:
    var img = new GM(file);
    img.resize(w,h);
    var info = yield img.identify();
    var result = yield img.write(dest)
    var result = yield img.stream(writeStream)
    ....

  *note:
    for more information check
      http://aheckmann.github.io/gm/docs.html
*/

var GM = (function () {
  function GM(image_path) {
    _classCallCheck(this, GM);

    var imageMagick = _gm2['default'].subClass({ imageMagick: true });

    this.image = imageMagick(image_path);
    // return this;
  }

  /* return the gm intance */

  _createClass(GM, [{
    key: 'toObject',
    value: function toObject() {
      return this.image;
    }
  }, {
    key: 'resize',
    value: function resize(w, h) {
      this.image.resize(w, h);
      return this;
    }
  }, {
    key: 'crop',
    value: function crop(w, h) {
      this.image.crop(w, h);
      return this;
    }
  }, {
    key: 'gravity',
    value: function gravity(loc) {
      if (!loc) loc = 'Center';
      this.image.gravity(loc);
      return this;
    }
  }, {
    key: 'quality',
    value: function quality(qty) {
      if (!qty) qty = 90;
      this.image.quality(qty);
      return this;
    }

    /* identify */
  }, {
    key: 'identify',
    value: function identify() {
      var image = this.image;
      return function (cb) {
        image.identify(cb);
      };
    }

    /* yieldable write */
  }, {
    key: 'write',
    value: regeneratorRuntime.mark(function write(dest_path) {
      var write;
      return regeneratorRuntime.wrap(function write$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            write = function write(gm, dest) {
              return function (cb) {
                gm.write(dest, cb);
              };
            };

            context$2$0.prev = 1;
            context$2$0.next = 4;
            return write(this.image, dest_path);

          case 4:
            return context$2$0.abrupt('return', { message: 'success' });

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](1);
            return context$2$0.abrupt('return', { message: 'fail', error: context$2$0.t0 });

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, write, this, [[1, 7]]);
    })

    /**
      yieldable stream
      if no writable stream provided then returns a readable stream
    */
  }, {
    key: 'stream',
    value: regeneratorRuntime.mark(function stream(writable_stream, type) {
      return regeneratorRuntime.wrap(function stream$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (writable_stream) {
              context$2$0.next = 2;
              break;
            }

            return context$2$0.abrupt('return', this.image.stream(type));

          case 2:
            context$2$0.prev = 2;

            this.image.stream(type).pipe(writable_stream);
            return context$2$0.abrupt('return', { message: 'success' });

          case 7:
            context$2$0.prev = 7;
            context$2$0.t0 = context$2$0['catch'](2);
            return context$2$0.abrupt('return', { message: 'fail', error: context$2$0.t0 });

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, stream, this, [[2, 7]]);
    })
  }]);

  return GM;
})();

exports['default'] = GM;
module.exports = exports['default'];

/* thunkified gm.write */