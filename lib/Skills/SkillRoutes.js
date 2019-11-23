'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _SkillController = require('./SkillController');

var _SkillController2 = _interopRequireDefault(_SkillController);

var _AuthMiddleware = require('../Middleware/Auth-Middleware');

var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SkillRouter = _express2.default.Router();
// Methods from skill controller
var getSkill = _SkillController2.default.getSkill,
    createSkill = _SkillController2.default.createSkill,
    updateSkill = _SkillController2.default.updateSkill,
    deleteSkill = _SkillController2.default.deleteSkill,
    getSkillById = _SkillController2.default.getSkillById;
// JWT strat for securing user work

var jwtStrategy = _AuthMiddleware2.default.jwtStrategy;

//passport global middleware

_passport2.default.use(jwtStrategy);
//passport local middleware
var passportOptions = { session: false };
//require JWT strat for accessing work
var checkForToken = _passport2.default.authenticate('jwt', passportOptions);

SkillRouter.get('/', checkForToken, getSkill);
SkillRouter.post('/', checkForToken, createSkill);
SkillRouter.put('/:id', updateSkill);
SkillRouter.delete('/:id', deleteSkill);
SkillRouter.get('/:id', getSkillById);

exports.default = SkillRouter;