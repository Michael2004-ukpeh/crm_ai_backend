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

router
  .route('/')
  .get(protect, getAllEvents)
  .post(protect, parseDate, createEvent);
router
  .route('/:id')
  .get(protect, getEvent)
  .patch(protect, parseDate, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
