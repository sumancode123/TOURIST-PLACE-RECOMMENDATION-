import type { Destination } from "@app/shared";

export interface SavedTrip {
  destination: Pick<Destination, "id" | "name" | "country" | "region" | "estimatedCostUsd" | "idealDurationDays">;
  plannedDays: number;
}

export interface BudgetCategory {
  label: string;
  amount: number;
}

const STORAGE_KEY = "atlas-and-tide.saved-trips";

function isSavedTrip(value: unknown): value is SavedTrip {
  if (typeof value !== "object" || value === null || !("destination" in value) || !("plannedDays" in value)) {
    return false;
  }

  const trip = value as { destination?: unknown; plannedDays?: unknown };
  if (typeof trip.destination !== "object" || trip.destination === null || typeof trip.plannedDays !== "number") {
    return false;
  }

  const destination = trip.destination as Record<string, unknown>;
  return typeof destination.id === "string"
    && typeof destination.name === "string"
    && typeof destination.country === "string"
    && typeof destination.region === "string"
    && typeof destination.estimatedCostUsd === "number"
    && Number.isFinite(destination.estimatedCostUsd)
    && typeof destination.idealDurationDays === "number"
    && Number.isFinite(destination.idealDurationDays)
    && destination.idealDurationDays > 0
    && Number.isInteger(trip.plannedDays)
    && trip.plannedDays >= 1
    && trip.plannedDays <= 30;
}

export function loadSavedTrips(storage: Pick<Storage, "getItem">): SavedTrip[] {
  const stored = storage.getItem(STORAGE_KEY);
  if (stored === null) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    throw new Error("Saved trips could not be read because the browser data is invalid.");
  }

  if (!Array.isArray(parsed) || !parsed.every(isSavedTrip)) {
    throw new Error("Saved trips could not be read because the saved data has an unexpected format.");
  }

  return parsed;
}

export function persistSavedTrips(storage: Pick<Storage, "setItem">, trips: SavedTrip[]): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function estimateTripCost(trip: SavedTrip): number {
  return Math.round((trip.destination.estimatedCostUsd / trip.destination.idealDurationDays) * trip.plannedDays);
}

export function getBudgetBreakdown(total: number): BudgetCategory[] {
  const categories = [
    { label: "Stay", share: 35 },
    { label: "Transport", share: 30 },
    { label: "Food", share: 20 },
    { label: "Activities", share: 15 },
  ];
  let remaining = total;

  return categories.map((category, index) => {
    const amount = index === categories.length - 1 ? remaining : Math.round((total * category.share) / 100);
    remaining -= amount;
    return { label: category.label, amount };
  });
}
