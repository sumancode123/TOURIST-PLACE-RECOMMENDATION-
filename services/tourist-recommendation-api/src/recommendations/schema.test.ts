import { describe, expect, it } from "vitest";
import { preferencesSchema } from "./schema.js";

describe("trip preference validation", () => {
  it("accepts supported, bounded trip preferences", () => {
    expect(preferencesSchema.safeParse({
      interests: ["culture", "food"],
      budget: "moderate",
      durationDays: 5,
      season: "autumn",
    }).success).toBe(true);
  });

  it("rejects empty interests, unknown seasons, and out-of-range durations", () => {
    for (const invalid of [
      { interests: [], budget: "moderate", durationDays: 5, season: "autumn" },
      { interests: ["culture"], budget: "moderate", durationDays: 0, season: "autumn" },
      { interests: ["culture"], budget: "moderate", durationDays: 5, season: "monsoon" },
    ]) expect(preferencesSchema.safeParse(invalid).success).toBe(false);
  });
});
