import React, { useMemo, useState } from "react";
import { initialFeatures } from "./data";
import { Feature, FeatureStatus } from "./types";
import { FeatureForm } from "./components/FeatureForm";
import { Filters } from "./components/Filters";
import { FeatureList } from "./components/FeatureList";
import { FeatureDetail } from "./components/FeatureDetail";

function sortFeatures(features: Feature[], sort: "votes" | "title") {
  const copy = [...features];
  if (sort === "votes") {
    return copy.sort((a, b) => b.votes - a.votes || a.title.localeCompare(b.title));
  }
  return copy.sort((a, b) => a.title.localeCompare(b.title));
}

export default function App() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);
  const [statusFilter, setStatusFilter] = useState<FeatureStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"votes" | "title">("votes");
  const [selectedId, setSelectedId] = useState<string | null>(initialFeatures[0]?.id ?? null);

  const filteredAndSorted = useMemo(() => {
    const filtered = statusFilter === "All"
      ? features
      : features.filter((feature) => feature.status === statusFilter);
    return sortFeatures(filtered, sortBy);
  }, [features, statusFilter, sortBy]);

  const selectedFeature = useMemo(
    () => features.find((feature) => feature.id === selectedId) ?? null,
    [features, selectedId]
  );

  const handleVote = (id: string) => {
    setFeatures((prev) =>
      prev.map((feature) => (feature.id === id ? { ...feature, votes: feature.votes + 1 } : feature))
    );
  };

  const handleCreate = (payload: { title: string; description: string; status: FeatureStatus }) => {
    const newFeature: Feature = {
      id: crypto.randomUUID(),
      votes: 0,
      ...payload,
    };
    setFeatures((prev) => [newFeature, ...prev]);
    setSelectedId(newFeature.id);
    setStatusFilter("All");
  };

  const handleStatusChange = (id: string, status: FeatureStatus) => {
    setFeatures((prev) => prev.map((feature) => (feature.id === id ? { ...feature, status } : feature)));
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Feature Feedback Board</p>
          <h1>Surface ideas. Prioritize faster.</h1>
          <p className="muted">
            Capture requests, vote with the team, and keep delivery status visible at a glance.
          </p>
        </div>
        <FeatureForm onSubmit={handleCreate} />
      </header>

      <section className="toolbar">
        <Filters status={statusFilter} sort={sortBy} onStatusChange={setStatusFilter} onSortChange={setSortBy} />
        <p className="muted">{filteredAndSorted.length} features</p>
      </section>

      <main className="layout">
        <div className="list-column">
          <FeatureList features={filteredAndSorted} onVote={handleVote} onSelect={setSelectedId} />
        </div>
        <div className="detail-column">
          <FeatureDetail feature={selectedFeature} onVote={handleVote} onStatusChange={handleStatusChange} />
        </div>
      </main>
    </div>
  );
}
