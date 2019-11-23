'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SkillModel = require('./SkillModel');

var _SkillModel2 = _interopRequireDefault(_SkillModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SkillController = {

    getSkill: function getSkill(req, res) {
        _SkillModel2.default.find({ userId: req.user }).then(function (docs) {
            return res.status(200).json(docs);
        }).catch(function (err) {
            return res.status(500).json({ err: 'could not get Skills...lel' });
        });
    },
    createSkill: function createSkill(req, res) {
        if ('title' in req.body && 'desc' in req.body && 'level' in req.body && 'type' in req.body) {
            var skillBody = { title: req.body.title, desc: req.body.desc, level: req.body.level, type: req.body.type, userId: req.user };
            var newSkill = new _SkillModel2.default(skillBody);
            newSkill.save().then(function (doc) {
                return res.status(201).json(doc);
            }).catch(function (err) {
                return res.status(500).json({ err: 'something went wrong' });
            });
        } else {
            res.send('title, desc, level, type and equipped are required');
        }
    },
    updateSkill: function updateSkill(req, res) {
        var id = req.params.id;

        if ('title' in req.body && 'desc' in req.body && 'level' in req.body && 'type' in req.body) {
            var _req$body = req.body,
                title = _req$body.title,
                desc = _req$body.desc,
                level = _req$body.level,
                type = _req$body.type;

            _SkillModel2.default.findOneAndUpdate({ _id: id }, { $set: { title: title, desc: desc, level: level, type: type } }).then(function (doc) {
                return res.status(200).json(doc);
            }).catch(function (err) {
                return res.status(500).json({ err: 'something went wrong' });
            });
        } else {
            res.send('title, desc, level and type are required');
        }
    },
    deleteSkill: function deleteSkill(req, res) {
        var id = req.params.id;

        _SkillModel2.default.findByIdAndRemove(id).then(function (doc) {
            return res.status(200).json(doc);
        }).catch(function (err) {
            return res.status(500).json({ err: 'failed to delete work' });
        });
    },
    getSkillById: function getSkillById(req, res) {
        var id = req.params.id;

        _SkillModel2.default.findById(id).then(function (doc) {
            return res.status(201).json(doc);
        }).catch(function (err) {
            return res.status(500).json({ err: "cant yo" });
        });
    }
};

exports.default = SkillController;