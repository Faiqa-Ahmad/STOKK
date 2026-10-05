const { COMPOUNDING_PERIODS } = require('../services/rewardsService');

const LIMITS = Object.freeze({
  principal: { min: 0.00000001, max: 1_000_000_000 },
  apy: { min: 0, max: 10_000 },
  durationYears: { min: 1 / 365, max: 100 },
  tokenPrice: { min: 0, max: 1_000_000_000 },
});

const validateNumber = (body, field, { min, max }, errors, optional = false) => {
  const value = body[field];
  if (optional && (value === undefined || value === null || value === '')) return;
  if (value === undefined || value === null || value === '') errors.push(`${field} is required`);
  else if (typeof value !== 'number' || !Number.isFinite(value)) errors.push(`${field} must be a finite number`);
  else if (value < min || value > max) errors.push(`${field} must be between ${min} and ${max}`);
};

const validateRewards = (req, res, next) => {
  const errors = [];
  validateNumber(req.body, 'principal', LIMITS.principal, errors);
  validateNumber(req.body, 'apy', LIMITS.apy, errors);
  validateNumber(req.body, 'durationYears', LIMITS.durationYears, errors);
  validateNumber(req.body, 'tokenPrice', LIMITS.tokenPrice, errors, true);
  if (!Object.prototype.hasOwnProperty.call(COMPOUNDING_PERIODS, req.body.compoundingFrequency)) {
    errors.push(`compoundingFrequency must be one of: ${Object.keys(COMPOUNDING_PERIODS).join(', ')}`);
  }
  if (errors.length) return res.status(400).json({ error: 'Invalid request', details: errors });
  return next();
};

module.exports = validateRewards;
