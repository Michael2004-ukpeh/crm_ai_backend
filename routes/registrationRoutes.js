const {
  getAllRegistrations,
  createRegistration,
  getRegistration,
  updateRegistration,
  deleteRegistration,
} = require('./../controllers/registrationController');
const { protect } = require('./../controllers/authController');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllRegistrations)
  .post(protect, createRegistration);
router
  .route('/:id')
  .get(protect, getRegistration)
  .patch(protect, updateRegistration)
  .delete(protect, deleteRegistration);

module.exports = router;
