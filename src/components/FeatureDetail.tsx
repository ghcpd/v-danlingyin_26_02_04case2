import React from "react";
import { Feature, FeatureStatus } from "../types";

interface FeatureDetailProps {
  feature: Feature | null;
  onVote: (id: string) => void;
  onStatusChange: (id: string, status: FeatureStatus) => void;
}

export function FeatureDetail({ feature, onVote, onStatusChange }: FeatureDetailProps) {
  if (!feature) {
    return (
      <section className="card detail">
        <p className="muted">Select a feature to see details.</p>
      </section>
    );
  }

  return (
    <section className="card detail">
      <div className="detail-header">
        <div>
          <p className="label">Status</p>
          <select
            value={feature.status}
            onChange={(event) => onStatusChange(feature.id, event.target.value as FeatureStatus)}
          >
            <option value="Open">Open</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button className="vote-button" onClick={() => onVote(feature.id)}>
          ▲ {feature.votes}
        </button>
      </div>
      <h2>{feature.title}</h2>
      <p>{feature.description}</p>
    </section>
  );
}
