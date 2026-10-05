const COMPOUNDING_PERIODS = Object.freeze({ daily: 365, weekly: 52, monthly: 12, annually: 1 });
const round = (value, precision = 8) => Number(value.toFixed(precision));

const calculateRewards = ({ principal, apy, durationYears, compoundingFrequency, tokenPrice }) => {
  const periodsPerYear = COMPOUNDING_PERIODS[compoundingFrequency];
  const rate = apy / 100;
  const balanceAt = (years) => principal * Math.pow(1 + rate / periodsPerYear, periodsPerYear * years);
  const finalBalance = balanceAt(durationYears);
  const wholeMonths = Math.floor(durationYears * 12);
  const timeSeries = [];

  for (let month = 0; month <= wholeMonths; month += 1) {
    const years = month / 12;
    timeSeries.push({ month, years: round(years, 4), balance: round(balanceAt(years)) });
  }
  const finalMonth = durationYears * 12;
  if (Math.abs(finalMonth - wholeMonths) > Number.EPSILON) {
    timeSeries.push({ month: round(finalMonth, 4), years: round(durationYears, 4), balance: round(finalBalance) });
  }
  return {
    finalBalance: round(finalBalance),
    totalRewards: round(finalBalance - principal),
    finalValueUsd: tokenPrice == null ? null : round(finalBalance * tokenPrice, 2),
    timeSeries,
  };
};

module.exports = { calculateRewards, COMPOUNDING_PERIODS };
