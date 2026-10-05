export type Frequency = "daily" | "weekly" | "monthly" | "annually";
export interface RewardsRequest { principal: number; apy: number; durationYears: number; compoundingFrequency: Frequency; tokenPrice?: number; }
export interface GrowthPoint { month: number; years: number; balance: number; }
export interface RewardsResult { finalBalance: number; totalRewards: number; finalValueUsd: number | null; timeSeries: GrowthPoint[]; }
