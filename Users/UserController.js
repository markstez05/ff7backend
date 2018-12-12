import User from './UserModel';
import GenerateToken from '../Middleware/Token';

const UserController = {
    createUser: (req, res) => {
        const userInfo = req.body;
        if('username' in userInfo && 'password' in userInfo) {
            const newUser = new User(userInfo);
            newUser.save()
            .then(doc => {
                const token = GenerateToken(doc);
                res.status(201).json({
                    user: { _id: doc._id, username: doc.username, name: doc.name, userClass: doc.userClass, age: doc.age, location: doc.location },
                    token
                });
            })
            .catch(err => res.status(500).json({err: 'Cant Log In'}));
        } else {
            res.status(500).json({err:'please provide a username and passoword'});
        }
    },
    login: (req, res) => {
        //if this far use logged in correctly and passes local strat
        const user = req.body;
        console.log("req body", req.body)
        User.find({"username": req.body.username}, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log("SERVER USER", user)
                res.status(200).json({ token:  GenerateToken(req.user), user: user[0] });
            }
        });
    },

    logout: (req, res) => {
        res.send('Logged out Successfully');
    },
    updateUser: (req, res) => {
        const { id } = req.params;
        if('name' in req.body || 'userClass' in req.body || 'age' in req.body || 'location' in req.body || 'picture' in req.body) {
            const { name, userClass, location, age, picture } = req.body;
            console.log(req.body);
            User.findOneAndUpdate({_id: id}, {$set:{name, location, userClass, age, picture}})
            .then(doc => res.status(200).json(doc))
            .catch(err => res.status(500).json({ err: 'something went wrong'}));
        } else {
            res.send('additional fields are required');
        }
    },
    getUserById: (req, res) => {
        const { id } = req.params;
        User.findById(id)
        .then(doc => res.status(201).json(doc))
        .catch(err => res.status(500).json({ err: "cant yo"}));
    },
    getUsers:(req, res) => {
        User.find()
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(500).json({err: 'could not get users...lel'}))
    },
};

export default UserController;