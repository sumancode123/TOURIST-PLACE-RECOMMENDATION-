import type {
  Destination,
  Recommendation,
  ScoreFactor,
  TripPreferences,
} from "../../../../services/shared/types/index.js";

const BUDGET_LIMITS = { budget: 700, moderate: 1200, flexible: 2000 } as const;

function factor(score: number, max: number, explanation: string): ScoreFactor {
  return { score, max, explanation };
}

export function scoreDestination(
  destination: Destination,
  preferences: TripPreferences,
): Recommendation {
  const normalizedInterests = new Set(preferences.interests.map((value) => value.toLowerCase()));
  const matched = destination.interests.filter((interest) => normalizedInterests.has(interest));
  const interestScore = Math.round((matched.length / preferences.interests.length) * 40);

  const budgetLimit = BUDGET_LIMITS[preferences.budget];
  const budgetScore = destination.estimatedCostUsd <= budgetLimit
    ? 25
    : Math.max(0, Math.round(25 * (budgetLimit / destination.estimatedCostUsd)));

  const dayDifference = Math.abs(preferences.durationDays - destination.idealDurationDays);
  const durationScore = Math.max(0, 20 - dayDifference * 4);

  const seasonScore = destination.bestSeasons.includes(preferences.season)
    ? 15
    : destination.shoulderSeasons.includes(preferences.season) ? 9 : 3;

  const factors = {
    interests: factor(
      interestScore,
      40,
      matched.length ? `Matches ${matched.join(", ")}.` : "No selected interests overlap.",
    ),
    budget: factor(
      budgetScore,
      25,
      destination.estimatedCostUsd <= budgetLimit
        ? `Estimated $${destination.estimatedCostUsd} fits your $${budgetLimit} budget.`
        : `Estimated $${destination.estimatedCostUsd} is above your $${budgetLimit} budget.`,
    ),
    duration: factor(
      durationScore,
      20,
      `${destination.idealDurationDays} days is closest to your ${preferences.durationDays}-day trip.`,
    ),
    season: factor(
      seasonScore,
      15,
      destination.bestSeasons.includes(preferences.season)
        ? `${preferences.season} is a best season.`
        : destination.shoulderSeasons.includes(preferences.season)
          ? `${preferences.season} is a good shoulder season.`
          : `${preferences.season} is outside the destination's preferred seasons.`,
    ),
  };
  const score = factors.interests.score + factors.budget.score + factors.duration.score + factors.season.score;

  return {
    destination,
    score,
    factors,
    explanation: `${matched.length ? `Strong fit for ${matched.join(" and ")}` : "A different kind of trip"}; ${factors.budget.explanation.toLowerCase()} ${factors.season.explanation}`,
  };
}

export function rankDestinations(
  destinations: Destination[],
  preferences: TripPreferences,
): Recommendation[] {
  return destinations
    .map((destination) => scoreDestination(destination, preferences))
    .sort((a, b) => b.score - a.score || a.destination.id.localeCompare(b.destination.id));
}
