const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: 'New Player'
    },
    userClass: {
        type: String,
        required: true,
        default: 'Worker'
    },
    age: {
        type: Number,
        required: true,
         default: 20
    },
    location: {
        type: String,
        required: true,
        default: 'Somewhere, USA'
    },
    picture:{
        type: String,
        required: true,
        default: "media/images/default.jpg"
    }
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
           this.password = hash;
           return next();
      });
  });
  
  UserSchema.methods.validatePassword = async function(password){
      return bcrypt.compare(password, this.password);
  }

const User = mongoose.model('User', UserSchema);

module.exports = User;