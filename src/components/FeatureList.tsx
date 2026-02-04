import React from "react";
import { Feature } from "../types";
import { FeatureCard } from "./FeatureCard";

interface FeatureListProps {
  features: Feature[];
  onVote: (id: string) => void;
  onSelect: (id: string) => void;
}

export function FeatureList({ features, onVote, onSelect }: FeatureListProps) {
  if (features.length === 0) {
    return <p className="muted">No features match the current filter.</p>;
  }

  return (
    <div className="grid">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} onVote={onVote} onSelect={onSelect} />
      ))}
    </div>
  );
}
