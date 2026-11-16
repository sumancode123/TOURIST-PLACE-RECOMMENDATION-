import { z } from "zod";
import { BUDGETS, INTERESTS, SEASONS } from "../../../../services/shared/types/index.js";

export const preferencesSchema = z.object({
  interests: z.array(z.enum(INTERESTS)).min(1).max(INTERESTS.length),
  budget: z.enum(BUDGETS),
  durationDays: z.number().int().min(1).max(30),
  season: z.enum(SEASONS),
}).strict();

export const destinationFiltersSchema = z.object({
  interests: z.array(z.enum(INTERESTS)).optional(),
  season: z.enum(SEASONS).optional(),
  maxBudgetUsd: z.coerce.number().positive().max(100_000).optional(),
});
