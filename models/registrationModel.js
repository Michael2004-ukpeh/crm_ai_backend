const mongoose = require('mongoose');
const Event = require('./eventModel');
const User = require('./userModel');
const sendEmail = require('./../utils/sendEmail');
const schedule = require('./../jobs/schedule');
const validator = require('validator');
const cron = require('node-cron');

const {
  createCustomEmail,
  createConfirmationEmail,
} = require('../processes/application.process');

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

registrationSchema.post('save', async function () {
  const eventId = this.event;
  const event = await Event.findById(eventId);
  console.log(event.name);
  const eventOrganizer = await User.findById(event.createdBy);

  const eventDate = new Date(event.date);

  const customConfirmationEmail = await createConfirmationEmail({
    name: event.name,
    about: event.about,
    attendee: this.name,
    date: eventDate.toLocaleDateString(),
    location: event.location,
    organizer: eventOrganizer.name,
    organizerEmail: eventOrganizer.email,
  });
  console.log(customConfirmationEmail);
  await sendEmail({
    email: this.email,
    subject: `Registered for ${event.name}`,
    text: customConfirmationEmail,
  });

  const cronString =
    process.env.NODE_ENV === 'development' ? '*/2 * * * * ' : '0 8 */2 * * ';
  const job = schedule(cronString, async () => {
    console.log(cronString);
    if (new Date() < eventDate) {
      const customReminderEmail = await createCustomEmail({
        name: event.name,
        about: event.about,
        attendee: this.name,
        date: eventDate.toLocaleDateString(),
        location: event.location,
        organizer: eventOrganizer.name,
        organizerEmail: eventOrganizer.email,
      });
      console.log(customReminderEmail);
      await sendEmail({
        email: this.email,
        subject: `Reminder for ${event.name}`,
        text: customReminderEmail,
      });
    } else {
      console.log('Job expired');
      job.stop();
    }
  });
  job.start();
});

const Registration = mongoose.model(
  'Registration',
  registrationSchema,
  'registrations'
);
module.exports = Registration;
