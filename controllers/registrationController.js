const Registration = require('./../models/registrationModel');
const factory = require('./handleFactory');

const getAllRegistrations = factory.getAll(Registration);
const createRegistration = factory.createOne(Registration);
const getRegistration = factory.getOne(Registration);
const updateRegistration = factory.updateOne(Registration);
const deleteRegistration = factory.deleteOne(Registration);

module.exports = {
  getAllRegistrations,
  createRegistration,
  getRegistration,
  updateRegistration,
  deleteRegistration,
};
