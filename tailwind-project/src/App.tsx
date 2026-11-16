import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  FluentProvider,
  Spinner,
  Text,
  webLightTheme,
} from "@fluentui/react-components";
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import type { Budget, Destination, Interest, Recommendation, Season, TripPreferences } from "@app/shared";
import { BUDGETS, INTERESTS, SEASONS } from "@app/shared";
import { fetchDestination, fetchRecommendations } from "./api/client";
import { estimateTripCost, getBudgetBreakdown, loadSavedTrips, persistSavedTrips, type SavedTrip } from "./trips/trip-utils";
import "./App.css";

const labels: Record<string, string> = {
  culture: "Culture",
  food: "Food",
  nature: "Nature",
  coast: "Coast",
  adventure: "Adventure",
  history: "History",
  nightlife: "Nightlife",
  wellness: "Wellness",
  budget: "Budget · up to $700",
  moderate: "Moderate · up to $1,200",
  flexible: "Flexible · up to $2,000",
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
};

const defaultPreferences: TripPreferences = {
  interests: ["culture", "food", "nature"],
  budget: "moderate",
  durationDays: 5,
  season: "autumn",
};

function Header({ savedCount }: { savedCount: number }) {
  return (
    <>
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Atlas and Tide home">
          <span className="brand-mark" aria-hidden="true">AT</span>
          <span>Atlas <i>&amp;</i> Tide</span>
        </Link>
        <span className="topbar-note">Thoughtful trips, made simple</span>
      </header>
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="nav-link">Plan a Trip</Link>
        <Link to="/recommendations" className="nav-link">Your Matches</Link>
        <Link to="/my-trips" className="nav-link">My Trips <span className="trip-count">{savedCount}</span></Link>
        <a className="nav-link nav-link--quiet" href="#how-it-works">How matching works</a>
      </nav>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Atlas &amp; Tide · Thoughtful trips, made simple</span>
      <span>Preference-based suggestions, not a trained model or booking quote.</span>
    </footer>
  );
}

function FactorPill({ label, score, max }: { label: string; score: number; max: number }) {
  return (
    <span className="factor-pill" aria-label={`${label}: ${score} out of ${max}`}>
      {label} <strong>{score}/{max}</strong>
    </span>
  );
}

function DestinationCard({ recommendation, isSaved, onSave }: {
  recommendation: Recommendation;
  isSaved: boolean;
  onSave: (destination: Destination) => void;
}) {
  const { destination, factors, score } = recommendation;
  return (
    <Card className="destination-card">
      <div className={`destination-art destination-art--${destination.id}`} aria-hidden="true">
        <span className="art-orbit" />
        <span className="art-label">{destination.region}</span>
        <span className="art-monogram">{destination.country.slice(0, 2).toUpperCase()}</span>
      </div>
      <div className="destination-content">
        <div className="card-title-row">
          <div>
            <Text as="h3" className="destination-title">{destination.name}, {destination.country}</Text>
            <p className="destination-meta">{destination.region} <span>·</span> about {destination.idealDurationDays} days</p>
          </div>
          <div className="match-score"><strong>{score}%</strong><span>match</span></div>
        </div>
        <p className="destination-summary">{destination.summary}</p>
        <div className="estimate-row">
          <span>Estimated trip budget</span>
          <strong>${destination.estimatedCostUsd.toLocaleString()} <small>USD</small></strong>
        </div>
        <div className="score-track" role="img" aria-label={`${score}% preference match`}>
          <span style={{ width: `${score}%` }} />
        </div>
        <div className="factor-list" aria-label="Score breakdown">
          <FactorPill label="Interests" score={factors.interests.score} max={40} />
          <FactorPill label="Budget" score={factors.budget.score} max={25} />
          <FactorPill label="Duration" score={factors.duration.score} max={20} />
          <FactorPill label="Season" score={factors.season.score} max={15} />
        </div>
        <p className="explanation">{recommendation.explanation}</p>
        <div className="destination-actions">
          <Link className="text-link" to={`/destinations/${destination.id}`}>Explore this destination <span aria-hidden="true">→</span></Link>
          <Button appearance={isSaved ? "secondary" : "outline"} disabled={isSaved} onClick={() => onSave(destination)}>
            {isSaved ? "Added to My Trips" : "Add to My Trips"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function Planner({ preferences, setPreferences, onSearch }: {
  preferences: TripPreferences;
  setPreferences: (preferences: TripPreferences) => void;
  onSearch: () => void;
}) {
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (preferences.interests.length === 0) {
      setValidationMessage("Choose at least one interest so we can find relevant places.");
      return;
    }
    setValidationMessage("");
    onSearch();
    navigate("/recommendations");
  }

  function toggleInterest(interest: Interest, checked: boolean) {
    const interests = checked
      ? [...preferences.interests, interest]
      : preferences.interests.filter((item) => item !== interest);
    setPreferences({ ...preferences, interests });
    setValidationMessage("");
  }

  return (
    <main className="page-main">
      <section className="hero-panel">
        <span className="hero-eyebrow"><span className="eyebrow-dot" /> A better kind of getaway</span>
        <h1>Find a place that<br /><em>feels like you.</em></h1>
        <p>Tell us what makes a trip memorable. We’ll compare your preferences with curated destinations—and show exactly why each one fits.</p>
        <div className="hero-decoration" aria-hidden="true"><span>✳</span><span>◌</span><span>✳</span></div>
      </section>

      <div className="planner-grid">
        <Card className="panel planner-panel">
          <div className="panel-heading">
            <span className="section-icon" aria-hidden="true">✦</span>
            <div><h2>Your trip, your way</h2><p>Set a few preferences to get started.</p></div>
            <span className="time-note">About 1 minute</span>
          </div>
          <form onSubmit={submit} className="preference-form">
            <fieldset className="interest-field">
              <legend>What are you drawn to?</legend>
              <p className="field-hint">Choose a few interests to shape your matches.</p>
              <div className="interest-grid">
                {INTERESTS.map((interest) => (
                  <Checkbox
                    key={interest}
                    className="interest-option"
                    label={labels[interest]}
                    checked={preferences.interests.includes(interest)}
                    onChange={(_, data) => toggleInterest(interest, data.checked === true)}
                  />
                ))}
              </div>
              {validationMessage && <p className="validation-message" role="alert">{validationMessage}</p>}
            </fieldset>

            <label className="form-field" htmlFor="budget">
              <span className="field-label">Total trip budget</span>
              <select id="budget" value={preferences.budget} onChange={(event) => setPreferences({ ...preferences, budget: event.target.value as Budget })}>
                {BUDGETS.map((budget) => <option key={budget} value={budget}>{labels[budget]}</option>)}
              </select>
            </label>
            <div className="form-row">
              <label className="form-field" htmlFor="duration">
                <span className="field-label">How long?</span>
                <select id="duration" value={preferences.durationDays} onChange={(event) => setPreferences({ ...preferences, durationDays: Number(event.target.value) })}>
                  {[3, 5, 7, 10, 14].map((days) => <option key={days} value={days}>{days} days</option>)}
                </select>
              </label>
              <label className="form-field" htmlFor="season">
                <span className="field-label">When?</span>
                <select id="season" value={preferences.season} onChange={(event) => setPreferences({ ...preferences, season: event.target.value as Season })}>
                  {SEASONS.map((season) => <option key={season} value={season}>{labels[season]}</option>)}
                </select>
              </label>
            </div>
            <div className="form-actions">
              <Button appearance="primary" type="submit" className="primary-button">
                Explore my matches <span aria-hidden="true">→</span>
              </Button>
              <span className="privacy-note">No sign-in. Your preferences stay in this session.</span>
            </div>
          </form>
        </Card>

        <aside className="panel method-panel" id="how-it-works">
          <div className="panel-heading">
            <span className="section-icon section-icon--coral" aria-hidden="true">◎</span>
            <div><h2>How matching works</h2><p>Clear scores, no black box.</p></div>
          </div>
          <p className="method-intro">Each destination gets a deterministic score from the preferences you choose. Every factor adds up to 100 points.</p>
          <div className="weight-list">
            <div><span className="weight-symbol">⌕</span><span><strong>Interests</strong><small>How well activities line up</small></span><b>40%</b></div>
            <div><span className="weight-symbol">↗</span><span><strong>Budget</strong><small>Estimate versus your range</small></span><b>25%</b></div>
            <div><span className="weight-symbol">◷</span><span><strong>Duration</strong><small>Trip length suitability</small></span><b>20%</b></div>
            <div><span className="weight-symbol">☼</span><span><strong>Season</strong><small>Seasonal destination fit</small></span><b>15%</b></div>
          </div>
          <div className="method-note"><strong>Built for clarity</strong><p>This portfolio demo uses curated examples and transparent rules—not AI predictions or live booking prices.</p></div>
        </aside>
      </div>
    </main>
  );
}

function Results({ preferences, searchVersion, savedTrips, onSave }: {
  preferences: TripPreferences;
  searchVersion: number;
  savedTrips: SavedTrip[];
  onSave: (destination: Destination) => void;
}) {
  const [results, setResults] = useState<Recommendation[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [maxCost, setMaxCost] = useState("any");
  const [sortBy, setSortBy] = useState<"match" | "cost">("match");

  async function load() {
    setStatus("loading");
    setError("");
    try {
      setResults(await fetchRecommendations(preferences));
      setStatus("ready");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  useEffect(() => { void load(); }, [searchVersion, preferences]);

  const visibleResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return results
      .filter(({ destination }) => {
        const matchesQuery = !normalizedQuery
          || `${destination.name} ${destination.country} ${destination.region}`.toLowerCase().includes(normalizedQuery);
        const matchesBudget = maxCost === "any" || destination.estimatedCostUsd <= Number(maxCost);
        return matchesQuery && matchesBudget;
      })
      .sort((left, right) => sortBy === "cost"
        ? left.destination.estimatedCostUsd - right.destination.estimatedCostUsd
        : right.score - left.score);
  }, [maxCost, query, results, sortBy]);

  return (
    <main className="page-main results-main">
      <div className="results-heading">
        <div><span className="hero-eyebrow dark-eyebrow">YOUR TRIP, THOUGHTFULLY MATCHED</span><h1>Your next <em>somewhere.</em></h1>
          <p>Ranked from your interests, {labels[preferences.budget].split(" ·")[0].toLowerCase()} budget, {preferences.durationDays} days, and {labels[preferences.season].toLowerCase()} season.</p></div>
        <Link className="edit-link" to="/">← Edit preferences</Link>
      </div>

      {status === "loading" && (
        <div className="results-list" aria-live="polite" aria-label="Loading recommendations">
          <div className="loading-card"><Spinner label="Finding destinations that fit your trip…" /><div className="skeleton-line" /><div className="skeleton-block" /></div>
          <div className="loading-card loading-card--secondary"><Spinner size="small" /><div className="skeleton-line" /></div>
        </div>
      )}
      {status === "error" && (
        <div className="state-card error-state" role="alert">
          <span className="state-icon" aria-hidden="true">!</span>
          <h2>We couldn’t build your trip just now</h2><p>{error}</p>
          <Button appearance="secondary" onClick={() => void load()}>Try again</Button>
        </div>
      )}
      {status === "ready" && results.length === 0 && (
        <div className="state-card empty-state">
          <span className="state-icon" aria-hidden="true">⌖</span>
          <h2>No matches in this collection—yet</h2>
          <p>Try broadening your interests or choosing a more flexible budget. We’ll keep your trip preferences here.</p>
          <Link className="primary-link" to="/">Adjust preferences</Link>
        </div>
      )}
      {status === "ready" && results.length > 0 && (
        <>
          <div className="match-tools" aria-label="Filter and sort destinations">
            <label className="search-field" htmlFor="destination-search">
              <span aria-hidden="true">⌕</span>
              <input id="destination-search" type="search" placeholder="Search city, country, or region" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <label className="filter-field" htmlFor="max-cost">
              <span>Maximum estimate</span>
              <select id="max-cost" value={maxCost} onChange={(event) => setMaxCost(event.target.value)}>
                <option value="any">Any budget</option>
                <option value="700">Up to $700</option>
                <option value="1200">Up to $1,200</option>
                <option value="2000">Up to $2,000</option>
              </select>
            </label>
            <label className="filter-field" htmlFor="sort-matches">
              <span>Sort by</span>
              <select id="sort-matches" value={sortBy} onChange={(event) => setSortBy(event.target.value as "match" | "cost")}>
                <option value="match">Best match</option>
                <option value="cost">Lowest estimate</option>
              </select>
            </label>
          </div>
          <div className="results-subhead"><span>{visibleResults.length} of {results.length} curated destinations</span><span>{sortBy === "match" ? "Sorted by preference fit" : "Sorted by lowest estimate"}</span></div>
          {visibleResults.length === 0 ? (
            <div className="state-card empty-state">
              <span className="state-icon" aria-hidden="true">⌖</span>
              <h2>No destinations match those filters</h2>
              <p>Try another search or increase your maximum estimate.</p>
              <Button appearance="secondary" onClick={() => { setQuery(""); setMaxCost("any"); }}>Clear filters</Button>
            </div>
          ) : (
          <div className="results-list">
            {visibleResults.map((recommendation) => (
              <DestinationCard
                key={recommendation.destination.id}
                recommendation={recommendation}
                isSaved={savedTrips.some((trip) => trip.destination.id === recommendation.destination.id)}
                onSave={onSave}
              />
            ))}
          </div>
          )}
          <p className="results-disclaimer">Estimates are illustrative planning ranges, not quotes. Verify current costs and conditions before booking.</p>
        </>
      )}
    </main>
  );
}

function BudgetBreakdown({ estimatedCostUsd }: { estimatedCostUsd: number }) {
  return (
    <Card className="panel budget-panel">
      <h2>Where your budget may go</h2>
      <p className="budget-caption">Illustrative split of the ${estimatedCostUsd.toLocaleString()} trip estimate.</p>
      <div className="budget-breakdown">
        {getBudgetBreakdown(estimatedCostUsd).map(({ label, amount }) => (
          <div className="budget-row" key={label}>
            <span>{label}</span>
            <div className="budget-track" aria-hidden="true"><span style={{ width: `${estimatedCostUsd ? (amount / estimatedCostUsd) * 100 : 0}%` }} /></div>
            <strong>${amount.toLocaleString()}</strong>
          </div>
        ))}
      </div>
      <p className="budget-disclaimer">Planning example only. Actual expenses vary by dates and travel style.</p>
    </Card>
  );
}

function DestinationDetails({ savedTrips, onSave }: { savedTrips: SavedTrip[]; onSave: (destination: Destination) => void }) {
  const { id = "" } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [error, setError] = useState("");
  const isSaved = savedTrips.some((trip) => trip.destination.id === id);

  useEffect(() => {
    let active = true;
    fetchDestination(id).then((value) => { if (active) setDestination(value); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : "Destination could not be loaded."); });
    return () => { active = false; };
  }, [id]);

  if (error) return <main className="page-main"><div className="state-card error-state" role="alert"><h2>Destination unavailable</h2><p>{error}</p><Link className="text-link" to="/recommendations">Back to matches</Link></div></main>;
  if (!destination) return <main className="page-main"><div className="state-card"><Spinner label="Loading destination…" /></div></main>;

  return (
    <main className="page-main detail-main">
      <Link className="edit-link" to="/recommendations">← Back to matches</Link>
      <section className="detail-hero">
        <div className={`destination-art destination-art--${destination.id}`} aria-hidden="true"><span className="art-orbit" /><span className="art-label">{destination.region}</span><span className="art-monogram">{destination.country.slice(0, 2).toUpperCase()}</span></div>
        <div className="detail-copy">
          <Badge appearance="tint" color="brand">{destination.region}</Badge>
          <h1>{destination.name}, <em>{destination.country}</em></h1>
          <p>{destination.summary}</p>
          <div className="detail-estimate"><span>Illustrative trip estimate</span><strong>${destination.estimatedCostUsd.toLocaleString()} <small>USD</small></strong></div>
          <p className="results-disclaimer">Planning estimate only; actual costs vary by dates, route, and travel style.</p>
          <Button appearance={isSaved ? "secondary" : "primary"} disabled={isSaved} onClick={() => onSave(destination)}>
            {isSaved ? "Added to My Trips" : "Add to My Trips"}
          </Button>
        </div>
      </section>
      <section className="detail-sections">
        <Card className="panel">
          <h2>What makes it special</h2>
          <ul className="highlight-list">{destination.highlights.map((highlight) => <li key={highlight}><span aria-hidden="true">✦</span>{highlight}</li>)}</ul>
        </Card>
        <Card className="panel">
          <h2>Plan around your trip</h2>
          <dl className="detail-facts">
            <div><dt>Best seasons</dt><dd>{destination.bestSeasons.map((item) => labels[item]).join(" · ")}</dd></div>
            <div><dt>Also worth considering</dt><dd>{destination.shoulderSeasons.length ? destination.shoulderSeasons.map((item) => labels[item]).join(" · ") : "No shoulder season listed"}</dd></div>
            <div><dt>Suggested duration</dt><dd>About {destination.idealDurationDays} days</dd></div>
            <div><dt>Interests</dt><dd>{destination.interests.map((item) => labels[item]).join(", ")}</dd></div>
          </dl>
        </Card>
      </section>
      <BudgetBreakdown estimatedCostUsd={destination.estimatedCostUsd} />
      <div className="method-note detail-method"><strong>How this recommendation is built</strong><p>The app combines your stated interests, estimated budget fit, trip duration, and season into a 100-point score. Factor contributions are deterministic and visible on your matches page.</p></div>
    </main>
  );
}

function MyTrips({ trips, onDaysChange, onRemove }: {
  trips: SavedTrip[];
  onDaysChange: (destinationId: string, days: number) => void;
  onRemove: (destinationId: string) => void;
}) {
  const totalEstimate = trips.reduce((total, trip) => total + estimateTripCost(trip), 0);

  return (
    <main className="page-main trips-main">
      <div className="results-heading">
        <div><span className="hero-eyebrow dark-eyebrow">YOUR PERSONAL ITINERARY</span><h1>My <em>Trips.</em></h1>
          <p>Keep a shortlist, adjust trip lengths, and see an updated planning estimate.</p></div>
        <Link className="edit-link" to="/recommendations">← Find more destinations</Link>
      </div>
      {trips.length === 0 ? (
        <div className="state-card empty-state">
          <span className="state-icon" aria-hidden="true">✦</span>
          <h2>Your travel shortlist starts here</h2>
          <p>Add destinations from your matches to build an itinerary and compare estimated costs.</p>
          <Link className="primary-link" to="/recommendations">Explore your matches</Link>
        </div>
      ) : (
        <>
          <div className="trip-summary">
            <div><span>Saved destinations</span><strong>{trips.length}</strong></div>
            <div><span>Combined planning estimate</span><strong>${totalEstimate.toLocaleString()} <small>USD</small></strong></div>
          </div>
          <div className="saved-trip-list">
            {trips.map((trip) => {
              const { destination } = trip;
              return (
                <Card className="saved-trip-card" key={destination.id}>
                  <div className={`destination-art destination-art--${destination.id}`} aria-hidden="true">
                    <span className="art-orbit" /><span className="art-label">{destination.region}</span>
                    <span className="art-monogram">{destination.country.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div className="saved-trip-content">
                    <div className="saved-trip-heading">
                      <div><h2>{destination.name}, {destination.country}</h2><p>{destination.region}</p></div>
                      <strong>${estimateTripCost(trip).toLocaleString()} <small>estimated</small></strong>
                    </div>
                    <label className="days-control" htmlFor={`days-${destination.id}`}>
                      Planned days
                      <input
                        id={`days-${destination.id}`}
                        type="number"
                        min={1}
                        max={30}
                        value={trip.plannedDays}
                        onChange={(event) => onDaysChange(destination.id, Math.min(30, Math.max(1, Number(event.target.value) || 1)))}
                      />
                    </label>
                    <div className="saved-trip-actions">
                      <Link className="text-link" to={`/destinations/${destination.id}`}>View destination <span aria-hidden="true">→</span></Link>
                      <Button appearance="subtle" onClick={() => onRemove(destination.id)}>Remove</Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <p className="results-disclaimer">Estimates are illustrative and scale with planned days; they are not current booking prices.</p>
        </>
      )}
    </main>
  );
}

function TripPlannerApp() {
  const [preferences, setPreferences] = useState<TripPreferences>(defaultPreferences);
  const [searchVersion, setSearchVersion] = useState(0);
  const [initialSavedTrips] = useState(() => {
    try {
      return { trips: loadSavedTrips(window.localStorage), error: "" };
    } catch (reason) {
      return { trips: [], error: reason instanceof Error ? reason.message : "Saved trips could not be loaded." };
    }
  });
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(initialSavedTrips.trips);
  const [storageError, setStorageError] = useState(initialSavedTrips.error);

  function updateSavedTrips(nextTrips: SavedTrip[]) {
    setSavedTrips(nextTrips);
    try {
      persistSavedTrips(window.localStorage, nextTrips);
      setStorageError("");
    } catch {
      setStorageError("Your trip changes are available until you close this tab, but could not be saved in this browser.");
    }
  }

  function saveDestination(destination: Destination) {
    if (savedTrips.some((trip) => trip.destination.id === destination.id)) return;
    updateSavedTrips([...savedTrips, {
      destination: {
        id: destination.id,
        name: destination.name,
        country: destination.country,
        region: destination.region,
        estimatedCostUsd: destination.estimatedCostUsd,
        idealDurationDays: destination.idealDurationDays,
      },
      plannedDays: destination.idealDurationDays,
    }]);
  }

  function changeTripDays(destinationId: string, plannedDays: number) {
    updateSavedTrips(savedTrips.map((trip) => trip.destination.id === destinationId ? { ...trip, plannedDays } : trip));
  }

  function removeTrip(destinationId: string) {
    updateSavedTrips(savedTrips.filter((trip) => trip.destination.id !== destinationId));
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="app-shell">
        <Header savedCount={savedTrips.length} />
        {storageError && <p className="storage-message" role="status">{storageError}</p>}
        <Routes>
          <Route path="/" element={<Planner preferences={preferences} setPreferences={setPreferences} onSearch={() => setSearchVersion((value) => value + 1)} />} />
          <Route path="/recommendations" element={<Results preferences={preferences} searchVersion={searchVersion} savedTrips={savedTrips} onSave={saveDestination} />} />
          <Route path="/my-trips" element={<MyTrips trips={savedTrips} onDaysChange={changeTripDays} onRemove={removeTrip} />} />
          <Route path="/destinations/:id" element={<DestinationDetails savedTrips={savedTrips} onSave={saveDestination} />} />
          <Route path="*" element={<main className="page-main"><div className="state-card"><h2>Page not found</h2><Link className="text-link" to="/">Return to trip planner</Link></div></main>} />
        </Routes>
        <Footer />
      </div>
    </FluentProvider>
  );
}

export default function App() {
  return <BrowserRouter><TripPlannerApp /></BrowserRouter>;
}
