const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('./../controllers/eventController');
const { parseDate } = require('./../middlewares/eventMiddleware');
const { protect } = require('./../controllers/authController');
const { parseBoolean } = require('../middlewares/registrationMiddleware');

router
  .route('/')
  .get(protect, parseBoolean, getAllEvents)
  .post(protect, parseDate, createEvent);
router
  .route('/:id')
  .get(protect, getEvent)
  .patch(protect, parseDate, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
