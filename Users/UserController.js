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
                    user: { _id: doc._id, username: doc.username },
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
        res.status(200).json({ token:  GenerateToken(req.user), user: req.user });
    },
    logout: (req, res) => {
        res.send('Logged out Successfully');
    },
    getUserById: (req, res) => {
        const { id } = req.params;
        User.findById(id)
        .then(doc => res.status(201).json(doc))
        .catch(err => res.status(500).json({ err: "cant yo"}));
    }
};

export default UserController;