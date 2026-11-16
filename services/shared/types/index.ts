export const INTERESTS = [
  "culture",
  "food",
  "nature",
  "coast",
  "adventure",
  "history",
  "nightlife",
  "wellness",
] as const;

export const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
export const BUDGETS = ["budget", "moderate", "flexible"] as const;

export type Interest = (typeof INTERESTS)[number];
export type Season = (typeof SEASONS)[number];
export type Budget = (typeof BUDGETS)[number];

export interface TripPreferences {
  interests: Interest[];
  budget: Budget;
  durationDays: number;
  season: Season;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  summary: string;
  estimatedCostUsd: number;
  interests: Interest[];
  bestSeasons: Season[];
  shoulderSeasons: Season[];
  idealDurationDays: number;
  highlights: string[];
}

export interface ScoreFactor {
  score: number;
  max: number;
  explanation: string;
}

export interface Recommendation {
  destination: Destination;
  score: number;
  factors: {
    interests: ScoreFactor;
    budget: ScoreFactor;
    duration: ScoreFactor;
    season: ScoreFactor;
  };
  explanation: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details: unknown;
  };
}

export interface ApiData<T> {
  data: T;
}
