const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User is required to create an event'],
    },
    about: {
      type: String,
      required: [true, 'Event details is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date and time is required'],
    },
    isCancelled: {
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

const Event = mongoose.model('Event', eventSchema, 'events');
module.exports = Event;
