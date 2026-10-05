const express = require('express');
const { calculate } = require('../../controllers/rewardsController');
const validateRewards = require('../../middleware/validateRewards');

const router = express.Router();
router.post('/', validateRewards, calculate);
module.exports = router;
