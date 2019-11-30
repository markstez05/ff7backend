'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-polyfill");


var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

var UserSchema = new _mongoose2.default.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        default: 'New Player'
    },
    userClass: {
        type: String,
        required: true,
        default: 'Worker'
    },
    age: {
        type: Number,
        required: true,
        default: 20
    },
    location: {
        type: String,
        required: true,
        default: 'Somewhere, USA'
    },
    picture: {
        type: String,
        required: true,
        default: "media/images/default.jpg"
    }
});

UserSchema.pre('save', function (next) {
    var _this = this;

    _bcryptjs2.default.hash(this.password, 10, function (err, hash) {
        _this.password = hash;
        return next();
    });
});

UserSchema.methods.validatePassword = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', _bcryptjs2.default.compare(password, this.password));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();

var User = _mongoose2.default.model('User', UserSchema);

exports.default = User;
//# sourceMappingURL=UserModel.js.map