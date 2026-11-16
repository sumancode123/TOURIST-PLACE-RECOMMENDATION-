import type { Destination, Interest, Season } from "../../../../services/shared/types/index.js";
import { pool } from "../db/pool.js";

interface DestinationRow {
  id: string;
  name: string;
  country: string;
  region: string;
  summary: string;
  estimated_cost_usd: number;
  interests: Interest[];
  best_seasons: Season[];
  shoulder_seasons: Season[];
  ideal_duration_days: number;
  highlights: string[];
}

function mapDestination(row: DestinationRow): Destination {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    region: row.region,
    summary: row.summary,
    estimatedCostUsd: Number(row.estimated_cost_usd),
    interests: row.interests,
    bestSeasons: row.best_seasons,
    shoulderSeasons: row.shoulder_seasons,
    idealDurationDays: Number(row.ideal_duration_days),
    highlights: row.highlights,
  };
}

// Keep SQL and persistence details behind this repository boundary.
export async function listDestinations(filters: {
  interests?: Interest[];
  season?: Season;
  maxBudgetUsd?: number;
} = {}): Promise<Destination[]> {
  const clauses: string[] = [];
  const values: unknown[] = [];

  if (filters.interests?.length) {
    values.push(filters.interests);
    clauses.push(`interests && $${values.length}::text[]`);
  }
  if (filters.season) {
    values.push(filters.season);
    clauses.push(`(best_seasons @> ARRAY[$${values.length}]::text[] OR shoulder_seasons @> ARRAY[$${values.length}]::text[])`);
  }
  if (filters.maxBudgetUsd !== undefined) {
    values.push(filters.maxBudgetUsd);
    clauses.push(`estimated_cost_usd <= $${values.length}`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await pool.query<DestinationRow>(
    `SELECT id, name, country, region, summary, estimated_cost_usd, interests,
            best_seasons, shoulder_seasons, ideal_duration_days, highlights
       FROM destinations ${where} ORDER BY id`,
    values,
  );
  return result.rows.map(mapDestination);
}

export async function getDestination(id: string): Promise<Destination | null> {
  const result = await pool.query<DestinationRow>(
    `SELECT id, name, country, region, summary, estimated_cost_usd, interests,
            best_seasons, shoulder_seasons, ideal_duration_days, highlights
       FROM destinations WHERE id = $1`,
    [id],
  );
  return result.rows[0] ? mapDestination(result.rows[0]) : null;
}

export async function checkDatabase(): Promise<void> {
  await pool.query("SELECT 1");
}
