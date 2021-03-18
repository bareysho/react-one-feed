const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  accountId: { type: String, required: true },
  username: { type: String, required: true },
  credentials: { type: Object, required: true },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.user;
  }
});

module.exports = mongoose.model('EpnUser', userSchema);
