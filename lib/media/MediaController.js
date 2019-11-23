'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MediaModel = require('./MediaModel');

var _MediaModel2 = _interopRequireDefault(_MediaModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var MEDIA = '' + __dirname;

var MediaController = {
    getMedia: function getMedia(req, res) {
        var img = req.params.img;

        _MediaModel2.default.find({ userId: req.user });
        console.log('user', req.user);
        fs.readFile(MEDIA + '/images/' + img, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var c = Buffer.from(data).toString("base64");
                console.log("base64", c);
                res.set("Content-Type", "image/jpg").send(data);
            }
        });
    }
};

exports.default = MediaController;