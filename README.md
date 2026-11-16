# Atlas & Tide — Tourist Recommendation Portfolio

A local React + TypeScript trip planner backed by a typed Express API and PostgreSQL destination catalog. Its deterministic, explainable recommendation baseline does not use an AI API key, paid AI dependency, account, or preference persistence.

## Local setup

Prerequisites: Node.js 20+ and npm. Docker Desktop / Docker Compose is needed for the PostgreSQL workflow.

1. Start PostgreSQL from the repository root:

   ```sh
   docker compose up -d postgres
   ```

2. Create the catalog table and load the separate, illustrative demo catalog:

   ```sh
   npm --prefix services/tourist-recommendation-api install
   npm --prefix services/tourist-recommendation-api run db:migrate
   npm --prefix services/tourist-recommendation-api run db:seed
   ```

   The API defaults to `postgresql://tourism:tourism@localhost:5432/tourism`. Override with `DATABASE_URL` if needed. Optional API settings are in `services/tourist-recommendation-api/.env.example`.

3. In a terminal, run the API:

   ```sh
   npm --prefix services/tourist-recommendation-api run dev
   ```

4. In another terminal, run the frontend:

   ```sh
   npm --prefix tailwind-project install
   npm --prefix tailwind-project run dev
   ```

   Open the Vite URL (normally `http://localhost:5173`). Set `VITE_API_BASE_URL` in `tailwind-project/.env.local` to override the API endpoint. Vite’s dev server is configured to be embeddable in a preview iframe.

## Routes

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | API and PostgreSQL readiness |
| GET | `/api/destinations` | Curated catalog; optional `interests=culture,food`, `season=autumn`, `maxBudgetUsd=1200` filters |
| GET | `/api/destinations/:id` | Destination details |
| POST | `/api/recommendations` | Deterministically rank trip preferences with per-factor explanations |

Recommendation request:

```json
{
  "interests": ["culture", "food", "nature"],
  "budget": "moderate",
  "durationDays": 5,
  "season": "autumn"
}
```

Budget tiers are illustrative caps: budget $700, moderate $1,200, and flexible $2,000. Scores use interests (40), budget (25), duration (20), and season (15), with a stable destination-ID tie-breaker. Estimates are planning examples, not current booking prices.

## Tests and builds

```sh
npm --prefix services/tourist-recommendation-api test
npm --prefix services/tourist-recommendation-api run build
npm --prefix tailwind-project test
npm --prefix tailwind-project run build
```

The score engine and validation schemas are independent of PostgreSQL; route tests mock the repository. Frontend API tests verify typed request payloads and shared API errors.

## Portfolio features

- Search and filter matches by destination, country, region, and maximum estimated cost; sort by match score or cost.
- Save destinations to **My Trips**, adjust planned days, and compare the combined trip estimate. Shortlists are stored only in the current browser using local storage; no account or server-side preference storage is used.
- Review an illustrative stay, transport, food, and activities split on destination details. These budget shares are planning examples, not current prices.

## Portfolio talking points

- Typed contracts shared across React and Express, with Zod validation at the API boundary.
- A modular route → service/recommendation → repository design keeps the ranking function independently testable.
- Factor weights and tie-breaking are explicit, deterministic, and returned with each result rather than hidden behind a black box.
- The PostgreSQL catalog is the source of truth; anonymous trip preferences are only held in frontend session state and are not written to the database.
- Saved trip snapshots stay in browser storage and can be removed or adjusted without creating an account.
- Discuss scoring-weight trade-offs, budget-estimate freshness, and why the baseline remains understandable and measurable.

## Future enhancements (not MVP dependencies)

With an opt-in feedback flow and a clear privacy policy, evaluate whether collaborative filtering improves ranking quality and add offline evaluation metrics before changing the baseline. Curator tools, destination-estimate freshness checks, multilingual content, and optional saved itineraries are also possible follow-ups; account-based persistence is intentionally out of scope until confirmed as a need.

No Azure resources are deployed or provisioned by this project setup.
