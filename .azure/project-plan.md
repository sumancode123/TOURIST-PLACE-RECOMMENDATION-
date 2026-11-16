# Project Plan

**Status**: Approved
**Created**: 2026-11-16
**Mode**: AUGMENT

---

## 1. Project Overview

**Goal**: Extend the existing workspace into a placement-portfolio tourist recommendation web application. Travelers enter interests, budget, trip duration, and season; a TypeScript API ranks curated destinations using transparent preference-based scoring and returns understandable score breakdowns. Keep every module independently testable and preserve the existing frontend assets.

**App Type**: SPA + API

**API Login**: No

**Mode**: AUGMENT

**Deployment Plan**: No deployment plan found

---

## 2. Backend - Express

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node |
| **Framework** | Express |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |
| **Orchestration** | docker-compose |

Implement a modular REST API with typed request/response contracts, input validation, centralized error handling, and repository/service boundaries. Keep the ranking engine deterministic and independently testable: normalize user selections, score each destination across interest overlap, budget fit, duration fit, and seasonal suitability, then return a stable ranked list with per-factor contributions and a concise explanation. Store the curated destination catalog in PostgreSQL; do not persist anonymous trip preferences by default. Seed a small, maintained destination dataset for a reliable demo. No API key, paid AI dependency, sign-in, or claim of a trained model is in scope. Use the shared error envelope `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": null } }` for API failures.

**Placement talking points**: explain the typed API contract, input validation, independently tested deterministic ranking function, PostgreSQL repository boundary, and score explanations as measurable engineering decisions. Demonstrate how changing a preference changes factor scores and ranking, and discuss trade-offs in weights and transparent fallbacks.

**Future enhancements**: after collecting opt-in feedback with a clear privacy policy, evaluate whether collaborative filtering improves ranking quality; add offline evaluation metrics before changing the baseline. Other realistic follow-ups are curator tools and data freshness checks for destination estimates, multilingual content, and optional saved itineraries only if account-based persistence becomes a confirmed requirement. These are not MVP dependencies.

---

## 3. Frontend — Web App

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Framework** | React + Vite |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |

Preserve and evolve the existing Vite/React UI under `tailwind-project/`, replacing or migrating its JavaScript implementation to TypeScript without discarding existing assets. Build a responsive preference form for interests, budget, trip duration, and season; render ranked destination cards with accessible, understandable score breakdowns; and provide destination details and an explanation of the recommendation method. Include loading, validation/error, empty-results, and retry states. Do not collect sign-in details or imply user accounts.

---

## 4. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| Azure Static Web Apps | Host the React + Vite frontend and configure its API endpoint | `VITE_API_BASE_URL` | `http://localhost:3000` | Essential |
| Azure App Service | Host the Express recommendation API; configure database connectivity and CORS for the frontend origin | `DATABASE_URL` | `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/tourism` | Essential |
| Azure Database for PostgreSQL Flexible Server | Persist the curated destination catalog; the API is the only service that connects to it | `DATABASE_URL` | `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/tourism` | Essential |

The local developer workflow may use Docker Compose for PostgreSQL; it is a development aid, not an additional Azure service. Keep the deployed catalog database as the source of truth. No object storage or external AI service is required for this MVP.

---

## 5. Prerequisites

Verify every `❓` tool before running or debugging the project. Detected versions below reflect the current workspace environment.

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | * | ✅ | v24.18.0 |
| npm | * | ✅ | 11.16.0 |
| Azure CLI | * | ❓ | Unknown |
| PostgreSQL client (`psql`) | backend | ❓ | Unknown |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Docker Engine | backend | ❓ | Unknown |
| Docker Compose | backend | ❓ | Unknown |
| VS Code JavaScript Debugger | frontend, backend | ✅ | Built in to VS Code 1.146.0 |
| Azure Static Web Apps VS Code extension | frontend | ❓ | Unknown |
| Azure App Service VS Code extension | backend | ❓ | Unknown |

---

## 6. Design System & UI

**Component Library**: Fluent UI v9
**Style Direction**: Create a calm, editorial travel-planning experience with a deep teal identity, warm coral highlights, generous whitespace, and destination cards that feel inviting without relying on unverified stock photography. Use restrained elevation and clear, accessible score visualizations so the recommendation logic remains the focus.
**Typography**: Inter, system-ui

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0F766E` | Teal actions, active navigation, and match-score emphasis |
| `accent` | `#E07A5F` | Warm travel highlights, selected interest chips, and seasonal accents |
| `surface` | `#F6F8F5` | Soft neutral background for trip planning and results |
| `text` | `#18312F` | High-contrast headings, destination names, and body copy |
| `muted` | `#667874` | Secondary trip details, score labels, and helper text |
| `border` | `#D8E2DD` | Subtle dividers, input outlines, and card boundaries |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Plan a Trip | `/` | Capture travel preferences and introduce the transparent recommendation experience | `header, nav, hero, split(form+card-list), footer` |
| Your Matches | `/recommendations` | Show ranked curated destinations, score explanations, and alternate result states | `header, nav, main, card-list, tabs, footer` |
| Destination Details | `/destinations/kyoto` | Explain one destination's highlights, estimated trip fit, and contributing match factors | `header, nav, two-column(media+main), card-list, action-bar, footer` |

### Sample Content

Plan a Trip — preference form:
| Field | Example value |
|-------|---------------|
| Interests | Culture, food, nature |
| Budget | Moderate · up to $1,200 |
| Trip duration | 5 days |
| Season | Autumn |

Your Matches — destination:
| Destination | Match | Budget estimate | Best season | Score breakdown |
|-------------|-------|-----------------|-------------|-----------------|
| Kyoto, Japan | 94% | $1,050 · moderate | Autumn | Interests 38/40 · budget 24/25 · duration 17/20 · season 15/15 |
| Lisbon, Portugal | 86% | $980 · moderate | Spring / autumn | Interests 34/40 · budget 25/25 · duration 15/20 · season 12/15 |
| Vancouver, Canada | 79% | $1,150 · moderate | Summer / autumn | Interests 32/40 · budget 21/25 · duration 14/20 · season 12/15 |

Destination Details — Kyoto, Japan:
| Highlight | Trip fit | Match contribution |
|-----------|----------|-------------------|
| Historic temples and gardens | Culture interest | Interests 38/40 |
| Nishiki Market and local dining | Food interest | Budget 24/25 · estimated $1,050 |
| Autumn foliage and walkable districts | Autumn · 5 days | Duration 17/20 · season 15/15 |

Your Matches — state examples: a skeleton list while the API calculates; an empty-results panel when no curated destination matches the selected constraints; an inline retryable service error when recommendations cannot be loaded.

---

## 7. Project Structure

```
TOURIST-RECOMMENDATION-SYSTEM/
├── .azure/
│   ├── project-plan.md
│   └── .preview-temp/
├── package.json
├── package-lock.json
├── tailwind.config.js
├── build/
├── tailwind-project/                    # Preserve existing Vite/React app and assets
│   ├── package.json
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── api/
│       └── types/
└── services/
    ├── tourist-recommendation-api/
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── src/
    │   │   ├── app.ts
    │   │   ├── routes/
    │   │   ├── middleware/
    │   │   ├── recommendations/
    │   │   └── destinations/
    │   ├── migrations/
    │   └── tests/
    └── shared/
        ├── package.json
        ├── types/
        └── schemas/
```

---

## 8. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | GET | `/api/health` | Health check | — | `{ status, services }` | 200, 503 |
| 2 | GET | `/api/destinations` | List curated destinations with optional interest, season, and budget filters | — | `{ data: Destination[] }` | 200, 422, 500 |
| 3 | GET | `/api/destinations/:id` | Retrieve destination details | — | `{ data: Destination }` | 200, 404, 500 |
| 4 | POST | `/api/recommendations` | Rank destinations for the supplied trip preferences and return factor-level explanations | `{ interests, budget, durationDays, season }` | `{ data: Recommendation[] }` | 200, 422, 500 |

---

## 9. Next Steps

1. Run **azure-project-scaffold** to execute this plan after explicit approval
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification
