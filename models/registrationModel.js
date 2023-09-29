const mongoose = require('mongoose');
const validator = require('validator');
const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: [true, 'Event is required to get registration'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'Email provided must be a valid email'],
    },
    phoneNumber: {
      type: String,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    isSubscribing: {
      type: Boolean,
      default: false,
    },
    isAddedToCalendar: {
      type: Boolean,
      default: false,
    },
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

const Registration = mongoose.model(
  'Registration',
  registrationSchema,
  'registrations'
);
module.exports = Registration;
