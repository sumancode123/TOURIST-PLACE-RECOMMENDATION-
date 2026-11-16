import type { Destination } from "../../../../services/shared/types/index.js";
import { pool } from "./pool.js";

// Curated, illustrative trip estimates; refresh them before using for real bookings.
const destinations: Destination[] = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    summary: "A thoughtful blend of historic temples, quiet gardens, and lively neighborhood dining.",
    estimatedCostUsd: 1050,
    interests: ["culture", "food", "history", "nature"],
    bestSeasons: ["spring", "autumn"],
    shoulderSeasons: ["winter"],
    idealDurationDays: 5,
    highlights: ["Historic temples and gardens", "Nishiki Market and local dining", "Autumn foliage and walkable districts"],
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    region: "Southern Europe",
    summary: "Colorful hilltop neighborhoods, tiled architecture, and an easygoing food scene.",
    estimatedCostUsd: 980,
    interests: ["culture", "food", "coast", "history", "nightlife"],
    bestSeasons: ["spring", "autumn"],
    shoulderSeasons: ["summer"],
    idealDurationDays: 4,
    highlights: ["Historic tram-lined streets", "Riverside seafood and markets", "Easy day trips to the coast"],
  },
  {
    id: "vancouver",
    name: "Vancouver",
    country: "Canada",
    region: "North America",
    summary: "A lively coastal city with mountain trails, green spaces, and a diverse dining scene.",
    estimatedCostUsd: 1150,
    interests: ["nature", "coast", "adventure", "food"],
    bestSeasons: ["summer", "autumn"],
    shoulderSeasons: ["spring"],
    idealDurationDays: 5,
    highlights: ["Stanley Park seawall", "Mountain and harbor views", "Neighborhood markets and cafés"],
  },
  {
    id: "oaxaca",
    name: "Oaxaca City",
    country: "Mexico",
    region: "Central America",
    summary: "A richly layered city known for regional cuisine, craft traditions, and nearby landscapes.",
    estimatedCostUsd: 760,
    interests: ["culture", "food", "history", "nature"],
    bestSeasons: ["spring", "autumn"],
    shoulderSeasons: ["winter"],
    idealDurationDays: 4,
    highlights: ["Local markets and regional cooking", "Historic center and craft studios", "Nearby mountain villages"],
  },
  {
    id: "reykjavik",
    name: "Reykjavík",
    country: "Iceland",
    region: "Northern Europe",
    summary: "A compact creative capital and a comfortable starting point for dramatic outdoor escapes.",
    estimatedCostUsd: 1850,
    interests: ["nature", "adventure", "culture", "wellness"],
    bestSeasons: ["summer", "winter"],
    shoulderSeasons: ["spring", "autumn"],
    idealDurationDays: 6,
    highlights: ["Harbor-side city walks", "Geothermal bathing", "Day trips to waterfalls and volcanic scenery"],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    summary: "A varied island escape with coastal days, green inland landscapes, and restorative stays.",
    estimatedCostUsd: 1250,
    interests: ["coast", "nature", "wellness", "adventure", "food"],
    bestSeasons: ["summer", "spring"],
    shoulderSeasons: ["autumn"],
    idealDurationDays: 7,
    highlights: ["Coastal walks and swimming", "Rice terraces and inland villages", "Wellness studios and local food"],
  },
];

try {
  for (const destination of destinations) {
    await pool.query(
      `INSERT INTO destinations
        (id, name, country, region, summary, estimated_cost_usd, interests,
         best_seasons, shoulder_seasons, ideal_duration_days, highlights)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       ON CONFLICT (id) DO UPDATE SET
         name=EXCLUDED.name, country=EXCLUDED.country, region=EXCLUDED.region,
         summary=EXCLUDED.summary, estimated_cost_usd=EXCLUDED.estimated_cost_usd,
         interests=EXCLUDED.interests, best_seasons=EXCLUDED.best_seasons,
         shoulder_seasons=EXCLUDED.shoulder_seasons,
         ideal_duration_days=EXCLUDED.ideal_duration_days,
         highlights=EXCLUDED.highlights, updated_at=NOW()`,
      [
        destination.id, destination.name, destination.country, destination.region,
        destination.summary, destination.estimatedCostUsd, destination.interests,
        destination.bestSeasons, destination.shoulderSeasons, destination.idealDurationDays,
        destination.highlights,
      ],
    );
  }
  console.log(`Seeded ${destinations.length} curated destinations.`);
} finally {
  await pool.end();
}
