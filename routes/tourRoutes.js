const express = require('express');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  deleteAllTours,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require(`${__dirname}/../controllers/tourControllers`);

const router = express.Router();
// router.param('id', checkId);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(getAllTours).post(createTour).delete(deleteAllTours);
router.route('/tour-stats').get(getTourStats);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
