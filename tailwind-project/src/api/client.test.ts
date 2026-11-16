import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRecommendations } from "./client";

afterEach(() => vi.unstubAllGlobals());

describe("API client", () => {
  it("posts the typed preferences and unwraps data", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchRecommendations({
      interests: ["culture"],
      budget: "moderate",
      durationDays: 5,
      season: "autumn",
    });
    expect(result).toEqual([]);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/recommendations$/),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ interests: ["culture"], budget: "moderate", durationDays: 5, season: "autumn" }),
      }),
    );
  });

  it("surfaces API errors with a retryable human-readable message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: { code: "VALIDATION_ERROR", message: "Choose an interest.", details: null } }),
    }));
    await expect(fetchRecommendations({
      interests: [], budget: "moderate", durationDays: 5, season: "autumn",
    })).rejects.toThrow("Choose an interest.");
  });
});
