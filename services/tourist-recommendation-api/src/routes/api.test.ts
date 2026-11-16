import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
const { sample } = vi.hoisted(() => ({
  sample: {
    id: "kyoto", name: "Kyoto", country: "Japan", region: "East Asia",
    summary: "Historic neighborhoods.", estimatedCostUsd: 1050,
    interests: ["culture", "food"], bestSeasons: ["autumn"], shoulderSeasons: ["spring"],
    idealDurationDays: 5, highlights: ["Temples"],
  },
}));

vi.mock("../destinations/repository.js", () => ({
  listDestinations: vi.fn(async () => [sample]),
  getDestination: vi.fn(async (id: string) => id === "kyoto" ? sample : null),
  checkDatabase: vi.fn(async () => undefined),
}));

import { app } from "../app.js";
import { checkDatabase, getDestination, listDestinations } from "../destinations/repository.js";

afterEach(() => vi.clearAllMocks());

describe("API routes", () => {
  it("returns health status and destination list", async () => {
    await request(app).get("/api/health").expect(200).expect({
      status: "ok", services: { database: "connected" },
    });
    const response = await request(app).get("/api/destinations").expect(200);
    expect(response.body.data).toHaveLength(1);
    expect(listDestinations).toHaveBeenCalled();
  });

  it("returns recommendations with typed factors", async () => {
    const response = await request(app).post("/api/recommendations").send({
      interests: ["culture"], budget: "moderate", durationDays: 5, season: "autumn",
    }).expect(200);
    expect(response.body.data[0].factors).toMatchObject({
      interests: { max: 40 }, budget: { max: 25 }, duration: { max: 20 }, season: { max: 15 },
    });
  });

  it("returns the shared validation error envelope", async () => {
    const response = await request(app).post("/api/recommendations").send({
      interests: [], budget: "moderate", durationDays: 5, season: "autumn",
    }).expect(422);
    expect(response.body.error).toMatchObject({
      code: "VALIDATION_ERROR", message: expect.any(String), details: expect.any(Array),
    });
  });

  it("returns 404 for an unknown destination and 503 for unavailable health", async () => {
    await request(app).get("/api/destinations/missing").expect(404);
    vi.mocked(checkDatabase).mockRejectedValueOnce(new Error("offline"));
    await request(app).get("/api/health").expect(503);
    expect(getDestination).toHaveBeenCalledWith("missing");
  });
});
