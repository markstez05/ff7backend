'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'nobody tosses a dwarf';
var GenerateToken = function GenerateToken(user) {
    var timestamp = new Date().getTime();
    var payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username
    };
    var options = {
        expiresIn: '24h'
    };

    return _jsonwebtoken2.default.sign(payload, secret, options);
};

exports.default = GenerateToken;
//# sourceMappingURL=Token.js.map