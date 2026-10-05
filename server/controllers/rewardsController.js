const { calculateRewards } = require('../services/rewardsService');

const calculate = (req, res, next) => {
  try { return res.status(200).json(calculateRewards(req.body)); }
  catch (error) { return next(error); }
};

module.exports = { calculate };
