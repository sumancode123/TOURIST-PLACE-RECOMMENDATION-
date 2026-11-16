import type { ApiData, ApiError, Destination, Recommendation, TripPreferences } from "@app/shared";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new Error("We couldn't reach the recommendation service. Check that the API is running, then try again.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null) as ApiError | null;
    throw new Error(body?.error?.message ?? "The request couldn't be completed. Please try again.");
  }
  return response.json() as Promise<T>;
}

export async function fetchRecommendations(preferences: TripPreferences): Promise<Recommendation[]> {
  const result = await request<ApiData<Recommendation[]>>("/recommendations", {
    method: "POST",
    body: JSON.stringify(preferences),
  });
  return result.data;
}

export async function fetchDestination(id: string): Promise<Destination> {
  const result = await request<ApiData<Destination>>(`/destinations/${encodeURIComponent(id)}`);
  return result.data;
}

export async function fetchDestinations(): Promise<Destination[]> {
  const result = await request<ApiData<Destination[]>>("/destinations");
  return result.data;
}
