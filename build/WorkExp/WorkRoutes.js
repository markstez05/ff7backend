'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _WorkController = require('./WorkController');

var _WorkController2 = _interopRequireDefault(_WorkController);

var _AuthMiddleware = require('../Middleware/Auth-Middleware');

var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkRouter = _express2.default.Router();
// Methods from work controller
var getWork = _WorkController2.default.getWork,
    createWork = _WorkController2.default.createWork,
    updateWork = _WorkController2.default.updateWork,
    deleteWork = _WorkController2.default.deleteWork,
    getWorkById = _WorkController2.default.getWorkById;
// JWT strat for securing user work

var jwtStrategy = _AuthMiddleware2.default.jwtStrategy;

//passport global middleware

_passport2.default.use(jwtStrategy);
//passport local middleware
var passportOptions = { session: false };
//require JWT strat for accessing work
var checkForToken = _passport2.default.authenticate('jwt', passportOptions);

WorkRouter.get('/', checkForToken, getWork);
WorkRouter.post('/', checkForToken, createWork);
WorkRouter.put('/:id', updateWork);
WorkRouter.delete('/:id', deleteWork);
WorkRouter.get('/:id', getWorkById);

exports.default = WorkRouter;
//# sourceMappingURL=WorkRoutes.js.map