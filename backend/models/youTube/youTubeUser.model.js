const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  photo: { type: String, required: false },
  accountId: { type: String, required: true },
  displayName: { type: String, required: true },
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

module.exports = mongoose.model('YouTubeUser', userSchema);
