import React from "react";
import { Feature } from "../types";

interface FeatureCardProps {
  feature: Feature;
  onVote: (id: string) => void;
  onSelect: (id: string) => void;
}

const statusColors: Record<Feature["status"], string> = {
  Open: "#2563eb",
  Planned: "#ea580c",
  Completed: "#16a34a",
};

export function FeatureCard({ feature, onVote, onSelect }: FeatureCardProps) {
  return (
    <article className="card" onClick={() => onSelect(feature.id)} role="button">
      <div className="card-header">
        <span className="status-pill" style={{ background: statusColors[feature.status] }}>
          {feature.status}
        </span>
        <button
          className="vote-button"
          onClick={(event) => {
            event.stopPropagation();
            onVote(feature.id);
          }}
          aria-label={`Vote for ${feature.title}`}
        >
          ▲ {feature.votes}
        </button>
      </div>
      <h3 className="card-title">{feature.title}</h3>
      <p className="card-description">{feature.description}</p>
    </article>
  );
}
