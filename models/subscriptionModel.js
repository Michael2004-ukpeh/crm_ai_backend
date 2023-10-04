const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.ObjectId,
      ref: 'Registration',
      required: true,
    },

    stopAt: {
      type: Date,
    },
    isCustomized: Boolean,
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

const Subscription = mongoose.model(
  'Subscription',
  subscriptionSchema,
  'subscriptions'
);
module.exports = Subscription;
