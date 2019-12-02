const LocalStrategy = require('passport-local');
const User = require('../Users/UserModel');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// const JwtStrategy = PassportJWT.Strategy;
const secret = 'nobody tosses a dwarf';
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};

const AuthMiddleware = {
    localStrategy: new LocalStrategy((username, password, done) => {
        User.findOne({ username })
        .then(user => {
            if(!user) {
                done(null, false);
            } else {
                user
                .validatePassword(password)
                .then(isValid => {
                    if(isValid) {
                        const { _id, username } = user;
                        return done(null, { _id, username }); //ends in req.user
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => {
                    return done(err);
                });
            }
        })
        .catch(err => done(err));
    }),
    jwtStrategy: new JwtStrategy(jwtOptions, (payload, done) => {
        //here token was decoded successfully
        User.findById(payload.sub)
        .then(user => {
            if (user) {
                done(null, payload.sub); // <--req.user
            } else {
                done(null, false);
            }
        })
        .catch(err => {
            done(err);
        });
    }),
}

module.exports = AuthMiddleware;