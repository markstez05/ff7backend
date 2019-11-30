import jwt from 'jsonwebtoken';

const secret = 'nobody tosses a dwarf';
const GenerateToken = user => {
    const timestamp = new Date().getTime();
    const payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username,
    };
    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secret, options);
}

export default GenerateToken;