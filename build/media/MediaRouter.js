'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MediaController = require('./MediaController');

var _MediaController2 = _interopRequireDefault(_MediaController);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passportOptions = { session: false };
var checkForToken = _passport2.default.authenticate('jwt', passportOptions);
var MediaRouter = _express2.default.Router();

var getMedia = _MediaController2.default.getMedia;


MediaRouter.get('/:img', getMedia);

exports.default = MediaRouter;
//# sourceMappingURL=MediaRouter.js.map