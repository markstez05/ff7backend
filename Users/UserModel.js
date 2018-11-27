import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';
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
    }
});

UserSchema.pre('save', function(next) {
    Bcrypt.hash(this.password, 10, (err, hash) => {
           this.password = hash;
           return next();
      });
  });
  
  UserSchema.methods.validatePassword = async function(password){
      return Bcrypt.compare(password, this.password);
  }

const User = mongoose.model('User', UserSchema);

export default User;