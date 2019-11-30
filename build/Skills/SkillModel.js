'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SkillSchema = new _mongoose2.default.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 5
    },
    type: {
        type: String,
        required: true
    },
    // equipped: {
    //     type: Boolean,
    //     default: false
    // },
    userId: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        required: true
    }
});

var Skill = _mongoose2.default.model('Skill', SkillSchema);

exports.default = Skill;
//# sourceMappingURL=SkillModel.js.map