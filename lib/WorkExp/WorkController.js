'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _WorkModel = require('./WorkModel');

var _WorkModel2 = _interopRequireDefault(_WorkModel);

var _UserModel = require('../Users/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkController = {

    getWork: function getWork(req, res) {
        _WorkModel2.default.find({ userId: req.user }).then(function (docs) {
            return res.status(200).json(docs);
        }).catch(function (err) {
            return res.status(500).json({ err: 'could not get work...lel' });
        });
    },
    createWork: function createWork(req, res) {
        if ('title' in req.body && 'location' in req.body && 'date' in req.body && 'text' in req.body) {
            var workBody = { title: req.body.title, location: req.body.location, date: req.body.date, text: req.body.text, userId: req.user };
            var newWork = new _WorkModel2.default(workBody);
            newWork.save().then(function (doc) {
                return res.status(201).json(doc);
            }).catch(function (err) {
                return res.status(500).json({ err: 'something went wrong' });
            });
        } else {
            res.send('title, location, date, text and user are required');
        }
    },
    updateWork: function updateWork(req, res) {
        var id = req.params.id;

        if ('title' in req.body && 'location' in req.body && 'date' in req.body && 'text' in req.body) {
            var _req$body = req.body,
                title = _req$body.title,
                location = _req$body.location,
                date = _req$body.date,
                text = _req$body.text,
                completed = _req$body.completed;

            _WorkModel2.default.findOneAndUpdate({ _id: id }, { $set: { title: title, location: location, date: date, text: text, completed: completed } }).then(function (doc) {
                return res.status(204).json(doc);
            }).catch(function (err) {
                return res.status(500).json({ err: 'something went wrong' });
            });
        } else {
            res.send('title, location, date and text are required');
        }
    },
    deleteWork: function deleteWork(req, res) {
        var id = req.params.id;

        _WorkModel2.default.findByIdAndRemove(id).then(function (doc) {
            return res.status(200).json(doc);
        }).catch(function (err) {
            return res.status(500).json({ err: 'failed to delete work' });
        });
    },
    getWorkById: function getWorkById(req, res) {
        var id = req.params.id;

        _WorkModel2.default.findById(id).then(function (doc) {
            return res.status(204).json(doc);
        }).catch(function (err) {
            return res.status(500).json({ err: "cant yo" });
        });
    }
};

exports.default = WorkController;