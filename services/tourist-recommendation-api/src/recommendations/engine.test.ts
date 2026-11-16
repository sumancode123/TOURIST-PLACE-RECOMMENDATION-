import { describe, expect, it } from "vitest";
import type { Destination, TripPreferences } from "../../../../services/shared/types/index.js";
import { rankDestinations, scoreDestination } from "./engine.js";

const kyoto: Destination = {
  id: "kyoto",
  name: "Kyoto",
  country: "Japan",
  region: "East Asia",
  summary: "Temples, gardens, and dining.",
  estimatedCostUsd: 1050,
  interests: ["culture", "food", "history"],
  bestSeasons: ["autumn", "spring"],
  shoulderSeasons: ["winter"],
  idealDurationDays: 5,
  highlights: [],
};
const defaultPreferences: TripPreferences = {
  interests: ["culture", "food", "nature"],
  budget: "moderate",
  durationDays: 5,
  season: "autumn",
};

describe("recommendation scoring", () => {
  it("scores each factor within its published weight and is repeatable", () => {
    const first = scoreDestination(kyoto, defaultPreferences);
    expect(first.score).toBe(87);
    expect(first.factors.interests).toMatchObject({ score: 27, max: 40 });
    expect(first.factors.budget).toMatchObject({ score: 25, max: 25 });
    expect(first.factors.duration).toMatchObject({ score: 20, max: 20 });
    expect(first.factors.season).toMatchObject({ score: 15, max: 15 });
    expect(scoreDestination(kyoto, defaultPreferences)).toEqual(first);
  });

  it("sorts by descending score with a stable id tie-breaker", () => {
    const sameFit = { ...kyoto, id: "a-destination" };
    expect(rankDestinations([kyoto, sameFit], defaultPreferences).map((item) => item.destination.id))
      .toEqual(["a-destination", "kyoto"]);
  });

  it("reflects a budget preference change in the budget contribution", () => {
    const moderate = scoreDestination(kyoto, defaultPreferences);
    const budget = scoreDestination(kyoto, { ...defaultPreferences, budget: "budget" });
    expect(budget.factors.budget.score).toBeLessThan(moderate.factors.budget.score);
  });
});
