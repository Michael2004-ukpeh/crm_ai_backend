const Subscription = require('./../models/subscriptionModel');
const factory = require('./handleFactory');

const getAllSubscriptions = factory.getAll(Subscription);
const createSubscription = factory.createOne(Subscription);
const getSubscription = factory.getOne(Subscription);
const updateSubscription = factory.updateOne(Subscription);
const deleteSubscription = factory.deleteOne(Subscription);

module.exports = {
  getAllSubscriptions,
  createSubscription,
  getSubscription,
  updateSubscription,
  deleteSubscription,
};
