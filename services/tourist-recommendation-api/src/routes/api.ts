import { Router } from "express";
import { checkDatabase, getDestination, listDestinations } from "../destinations/repository.js";
import { notFoundHandler } from "../middleware/error-handler.js";
import { destinationFiltersSchema, preferencesSchema } from "../recommendations/schema.js";
import { rankDestinations } from "../recommendations/engine.js";

export const apiRouter = Router();

apiRouter.get("/health", async (_request, response, next) => {
  try {
    await checkDatabase();
    response.json({ status: "ok", services: { database: "connected" } });
  } catch (error) {
    console.error("Health check failed", error);
    response.status(503).json({
      status: "unavailable",
      services: { database: "disconnected" },
    });
  }
});

apiRouter.get("/destinations", async (request, response, next) => {
  try {
    const raw = {
      interests: typeof request.query.interests === "string"
        ? request.query.interests.split(",").filter(Boolean)
        : undefined,
      season: request.query.season,
      maxBudgetUsd: request.query.maxBudgetUsd,
    };
    const filters = destinationFiltersSchema.parse(raw);
    response.json({ data: await listDestinations(filters) });
  } catch (error) {
    next(error);
  }
});

apiRouter.get("/destinations/:id", async (request, response, next) => {
  try {
    const destination = await getDestination(request.params.id);
    if (!destination) {
      response.status(404).json({
        error: { code: "NOT_FOUND", message: "Destination not found.", details: null },
      });
      return;
    }
    response.json({ data: destination });
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/recommendations", async (request, response, next) => {
  try {
    const preferences = preferencesSchema.parse(request.body);
    const destinations = await listDestinations();
    response.json({ data: rankDestinations(destinations, preferences) });
  } catch (error) {
    next(error);
  }
});

apiRouter.use(notFoundHandler);
