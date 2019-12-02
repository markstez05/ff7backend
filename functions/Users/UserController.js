const User = require('./UserModel');
const GenerateToken = require('../Middleware/Token');

const UserController = {
    createUser: (req, res) => {
        const userInfo = req.body;
        if('username' in userInfo && 'password' in userInfo) {
            const newUser = new User(userInfo);
            newUser.save()
            .then(doc => {
                const token = GenerateToken(doc);
                res.status(201).json({
                    user: { _id: doc._id, username: doc.username, name: doc.name, userClass: doc.userClass, age: doc.age, location: doc.location, picture: doc.picture },
                    token
                });
                return
            })
            .catch(error => res.status(500).json({error: 'Cant Log In'}));
        } else {
            res.status(500).json({error:'please provide a username and password'});
        }
    },
    login: (req, res) => {
        //if this far use logged in correctly and passes local strat
        const user = req.body;
        User.find({"username": req.body.username}, (error, user) => {
            if (error) {
                res.status(500).json({error:'please proved a valid username and password'});
            } else {
                res.status(200).json({ token:  GenerateToken(req.user), user: user[0] });
            }
        });
    },

    logout: (req, res) => {
        res.send('Logged out Successfully');
    },
    updateUser: (req, res) => {
        const { id } = req.params;  
        console.log('here', id)
        if('name' in req.body || 'userClass' in req.body || 'age' in req.body || 'location' in req.body) {
            const { name, userClass, location, age} = req.body;
            console.log(req.body)
            User.findOneAndUpdate({_id: id}, {$set:{name, location, userClass, age}})
            .then(doc => res.status(200).json(doc))
            .catch(error => res.status(500).json({ error: 'something went wrong'}));
        } else {
            const picture = req.file.path
            User.findOneAndUpdate({_id: id}, {$set:{picture: picture}})
            .then(doc => res.status(200).json(doc))
            .catch(error => res.status(500).json({ error: 'something went wrong'}));
        }
    },
    getUserById: (req, res) => {
        const { id } = req.params;
        User.findById(id)   
        .then(doc => res.status(201).json(doc))
        .catch(error => res.status(500).json({ error: "cant yo"}));
    },
    getUsers:(req, res) => {
        User.find()
        .then(docs => res.status(200).json(docs))
        .catch(error => res.status(500).json({error: 'could not get users...lel'}))
    },
};

module.exports = UserController;