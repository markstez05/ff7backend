'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _UserModel = require('../Users/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = _passportJwt2.default.Strategy;
var secret = 'nobody tosses a dwarf';
var jwtOptions = {
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

var AuthMiddleware = {
    localStrategy: new _passportLocal2.default(function (username, password, done) {
        _UserModel2.default.findOne({ username: username }).then(function (user) {
            if (!user) {
                done(null, false);
            } else {
                user.validatePassword(password).then(function (isValid) {
                    if (isValid) {
                        var _id = user._id,
                            _username = user.username;

                        return done(null, { _id: _id, username: _username }); //ends in req.user
                    } else {
                        return done(null, false);
                    }
                }).catch(function (err) {
                    return done(err);
                });
            }
        }).catch(function (err) {
            return done(err);
        });
    }),
    jwtStrategy: new JwtStrategy(jwtOptions, function (payload, done) {
        //here token was decoded successfully
        _UserModel2.default.findById(payload.sub).then(function (user) {
            if (user) {
                done(null, payload.sub); // <--req.user
            } else {
                done(null, false);
            }
        }).catch(function (err) {
            done(err);
        });
    })
};

exports.default = AuthMiddleware;
//# sourceMappingURL=Auth-Middleware.js.map