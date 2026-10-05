const { calculateRewards } = require("../../../server/services/rewardsService");

describe("calculateRewards", () => {
  test("calculates monthly compound interest accurately", () => {
    const result = calculateRewards({ principal: 1000, apy: 12, durationYears: 1, compoundingFrequency: "monthly" });
    expect(result.finalBalance).toBeCloseTo(1126.82503, 5);
    expect(result.totalRewards).toBeCloseTo(126.82503, 5);
    expect(result.timeSeries).toHaveLength(13);
  });
  test("returns no rewards for zero APY and supports fractional years", () => {
    const result = calculateRewards({ principal: 250, apy: 0, durationYears: 1.5, compoundingFrequency: "daily" });
    expect(result.finalBalance).toBe(250); expect(result.totalRewards).toBe(0); expect(result.timeSeries[result.timeSeries.length - 1].years).toBe(1.5);
  });
  test("calculates optional USD value", () => {
    const result = calculateRewards({ principal: 100, apy: 0, durationYears: 1, compoundingFrequency: "annually", tokenPrice: 2.5 });
    expect(result.finalValueUsd).toBe(250);
  });

  test.each([
    ["daily", 365],
    ["weekly", 52],
    ["monthly", 12],
    ["annually", 1],
  ])("supports %s compounding", (frequency, periodsPerYear) => {
    const result = calculateRewards({
      principal: 1000,
      apy: 10,
      durationYears: 0.5,
      compoundingFrequency: frequency,
    });
    const expected = 1000 * Math.pow(1 + 0.1 / periodsPerYear, periodsPerYear * 0.5);
    expect(result.finalBalance).toBeCloseTo(expected, 6);
  });
});

export {};
