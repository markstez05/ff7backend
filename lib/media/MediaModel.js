'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaSchema = new _mongoose2.default.Schema({
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    userId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

var Media = _mongoose2.default.model('Media', MediaSchema);

exports.default = Media;