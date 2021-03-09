const crypto = require('crypto');
const mongoose = require('mongoose');
const { generatePasswordData } = require('utils/random');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true },
  salt: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

userSchema.methods.setPassword = function (password){
  const { salt, passwordHash } = generatePasswordData(password);
  this.salt = salt
  this.passwordHash = passwordHash
};

userSchema.methods.validatePassword = function (password){
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');

  return this.passwordHash === hash;
};

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.passwordHash;
    delete ret.salt;
  }
});

module.exports = mongoose.model('User', userSchema);
