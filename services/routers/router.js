const express = require("express");
const target = require("../models/target.model");
const playedTarget = require("../models/playedTarget.model");
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Import controllers
const targetController = require('../controllers/target.controller');
const playedTargetController = require('../controllers/playedTarget.controller');
const locationController = require('../controllers/location.controller');

//#region target
router
  .route('/target')
  .get(targetController.index)
  .post(targetController.new)
router
  .route('/target/:target_id')
  .get(targetController.view)
  .put(targetController.update)
  .delete(targetController.delete)
router
  .route('/target/:target_id/score')
  .get(targetController.getScores);
router
  .route('/target/:target_id/score/:score_id')
  .get(targetController.getScore);
router
  .route('/target/:target_id/score/:score_id/tag/:tag_id')
  .get(targetController.getScoreTag);
router
  .route('/target/:target_id/score/:score_id/tag')
  .get(targetController.getScoreTags);
router
  .route('/target/:target_id/hints/:hint_id')
  .get(targetController.getHint);
//#endregion

//#region playedTarget
router
  .route('/playedTarget')
  .get(playedTargetController.index)
  .post(playedTargetController.new)
router
  .route('/playedTarget/:playedTarget_id')
  .get(playedTargetController.view)
  .put(playedTargetController.update)  
  .delete(playedTargetController.delete);
router
  .route('/playedTarget/target/:target_id')
  .get(playedTargetController.uploadedTo);
router
  .route('/playedTarget/:playedTarget_id/score/:score_id')
  .get(playedTargetController.getScore);
router
  .route('/playedTarget/:playedTarget_id/score')
  .get(playedTargetController.getScores);
router
  .route('/playedTarget/:playedTarget_id/score/:score_id/tag')
  .get(playedTargetController.getScoreTags);
router
  .route('/playedTarget/:playedTarget_id/score/:score_id/tag/:tag_id')
  .get(playedTargetController.getScoreTag);
//#endregion

//#region location
router
  .route('/location')
  .get(locationController.index)
  .post(locationController.new);
router
  .route('/location/:location_id')
  .get(locationController.view)
  .post(locationController.addTarget)
  .put(locationController.update)
  .delete(locationController.delete);
router
  .route('/location/:location_id/target/:target_id/')
  .get(locationController.getTarget);
router
  .route('/location/:location_id/target')
  .get(locationController.getTargets);
router
  .route('/location/:location_id/target/:target_id/hints/:hint_id')
  .get(locationController.getHint);
router
  .route('/location/:location_id/target/:target_id/score/:score_id')
  .get(locationController.getScore);
router
  .route('/location/:location_id/target/:target_id/score')
  .get(locationController.getScores);
router
  .route('/location/:location_id/target/:target_id/score/:score_id/tag/:tag_id')
  .get(locationController.getScoreTag);
router
  .route('/location/:location_id/target/:target_id/score/:score_id/tag')
  .get(locationController.getScoreTags);
router
  .route('/location/target/:target_id')
  .get(locationController.belongsTo);
//#endregion

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.get(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email, role: user.role };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

// Export API routes
module.exports = router;