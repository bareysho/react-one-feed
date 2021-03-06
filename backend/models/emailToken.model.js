const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
});

emailTokenSchema.virtual('isExpired').get(() => Date.now() >= this.expires);

emailTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.id;
    delete ret.user;
  }
});

module.exports = mongoose.model('EmailToken', emailTokenSchema);
