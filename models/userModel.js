const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already in use'],
      validate: [validator.isEmail, 'Email provided must be a valid email'],
    },
    password: {
      type: String,
      required: [true, 'password must be 8 or more characters'],
      select: false,
    },
    active: { type: Boolean, default: true },
  },
  {
    strict: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },

    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // 1) Hash Password
  if (this.isNew === true) {
    this.password = await bcrypt.hash(this.password, 12);
    // 2) Remove confirmPassword field
    this.confirmPassword = undefined;
  }
  next();
});
userSchema.methods.correctPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
