'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _UserController = require('./UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _AuthMiddleware = require('../Middleware/Auth-Middleware');

var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserRouter = _express2.default.Router();
//Methods from user controller
var createUser = _UserController2.default.createUser,
    login = _UserController2.default.login,
    logout = _UserController2.default.logout,
    getUserById = _UserController2.default.getUserById,
    getUsers = _UserController2.default.getUsers,
    updateUser = _UserController2.default.updateUser;
//validates a users password and sends token

var localStrategy = _AuthMiddleware2.default.localStrategy;


var storage = _multer2.default.diskStorage({
    destination: './media/images/',
    filename: function filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + _path2.default.extname(file.originalname));
        console.log('IMG INFO', file);
    }
});

//passport global middleware
_passport2.default.use(localStrategy);
var upload = (0, _multer2.default)({ storage: storage });
//passport local middleware
var passportOptions = { session: false };
//block login by requiring a valid password
var authenticate = _passport2.default.authenticate('local', passportOptions);

UserRouter.get('/', getUsers);
UserRouter.put('/:id', upload.single('picture'), updateUser);
UserRouter.post('/register', createUser);
UserRouter.post('/login', authenticate, login);
UserRouter.get('/logout', logout);
UserRouter.get('/:id', getUserById);

exports.default = UserRouter;
//# sourceMappingURL=UserRoutes.js.map