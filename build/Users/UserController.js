'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UserModel = require('./UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _Token = require('../Middleware/Token');

var _Token2 = _interopRequireDefault(_Token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserController = {
    createUser: function createUser(req, res) {
        var userInfo = req.body;
        if ('username' in userInfo && 'password' in userInfo) {
            var newUser = new _UserModel2.default(userInfo);
            newUser.save().then(function (doc) {
                var token = (0, _Token2.default)(doc);
                console.log('user', user);
                res.status(201).json({
                    user: { _id: doc._id, username: doc.username, name: doc.name, userClass: doc.userClass, age: doc.age, location: doc.location, picture: doc.picture },
                    token: token
                });
                console.log('user', user);
            }).catch(function (err) {
                return res.status(500).json({ err: 'Cant Log In' });
            });
        } else {
            res.status(500).json({ err: 'please provide a username and password' });
        }
    },
    login: function login(req, res) {
        //if this far use logged in correctly and passes local strat
        var user = req.body;
        _UserModel2.default.find({ "username": req.body.username }, function (err, user) {
            if (err) {
                res.status(500).json({ err: 'please proved a valid username and password' });
            } else {
                res.status(200).json({ token: (0, _Token2.default)(req.user), user: user[0] });
            }
        });
    },

    logout: function logout(req, res) {
        res.send('Logged out Successfully');
    },
    updateUser: function updateUser(req, res) {
        var id = req.params.id;

        console.log('here', id);
        if ('name' in req.body || 'userClass' in req.body || 'age' in req.body || 'location' in req.body) {
            var _req$body = req.body,
                name = _req$body.name,
                userClass = _req$body.userClass,
                location = _req$body.location,
                age = _req$body.age;

            console.log(req.body);
            _UserModel2.default.findOneAndUpdate({ _id: id }, { $set: { name: name, location: location, userClass: userClass, age: age } }).then(function (doc) {
                return res.status(200).json(doc);
            }).catch(function (err) {
                return res.status(500).json({ err: 'something went wrong' });
            });
        } else {
            var picture = req.file.path;
            _UserModel2.default.findOneAndUpdate({ _id: id }, { $set: { picture: picture } }).then(function (doc) {
                return res.status(200).json(doc);
            }).catch(function (err) {
                return res.status(500).json({ err: 'something went wrong' });
            });
        }
    },
    getUserById: function getUserById(req, res) {
        var id = req.params.id;

        _UserModel2.default.findById(id).then(function (doc) {
            return res.status(201).json(doc);
        }).catch(function (err) {
            return res.status(500).json({ err: "cant yo" });
        });
    },
    getUsers: function getUsers(req, res) {
        _UserModel2.default.find().then(function (docs) {
            return res.status(200).json(docs);
        }).catch(function (err) {
            return res.status(500).json({ err: 'could not get users...lel' });
        });
    }
};

exports.default = UserController;
//# sourceMappingURL=UserController.js.map