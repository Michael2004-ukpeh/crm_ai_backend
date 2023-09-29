const Event = require('./../models/eventModel');
const factory = require('./handleFactory');

const getAllEvents = factory.getAll(Event);
const createEvent = factory.createOne(Event);
const getEvent = factory.getOne(Event);
const updateEvent = factory.updateOne(Event);
const deleteEvent = factory.deleteOne(Event);

module.exports = {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
