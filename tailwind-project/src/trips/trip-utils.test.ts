import { describe, expect, it, vi } from "vitest";
import { estimateTripCost, getBudgetBreakdown, loadSavedTrips, persistSavedTrips, type SavedTrip } from "./trip-utils";

const sampleTrip: SavedTrip = {
  destination: {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    estimatedCostUsd: 1050,
    idealDurationDays: 7,
  },
  plannedDays: 5,
};

describe("saved trip utilities", () => {
  it("round-trips saved trips through browser storage", () => {
    let stored: string | null = null;
    const storage = {
      getItem: vi.fn(() => stored),
      setItem: vi.fn((_key: string, value: string) => { stored = value; }),
    };

    persistSavedTrips(storage, [sampleTrip]);

    expect(loadSavedTrips(storage)).toEqual([sampleTrip]);
    expect(storage.setItem).toHaveBeenCalledOnce();
  });

  it("reports invalid stored JSON instead of silently discarding it", () => {
    expect(() => loadSavedTrips({ getItem: () => "{" })).toThrow(/browser data is invalid/);
  });

  it("scales destination estimates to the planned trip length", () => {
    expect(estimateTripCost(sampleTrip)).toBe(750);
  });

  it("splits the estimate into categories without losing dollars to rounding", () => {
    const breakdown = getBudgetBreakdown(101);

    expect(breakdown.reduce((sum, item) => sum + item.amount, 0)).toBe(101);
    expect(breakdown.map((item) => item.label)).toEqual(["Stay", "Transport", "Food", "Activities"]);
  });
});
