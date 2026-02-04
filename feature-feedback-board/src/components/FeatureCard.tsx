import React from 'react';
import type { Feature, FeatureStatus } from '../types';

interface FeatureCardProps {
  feature: Feature;
  onVote: (id: string) => void;
  onSelect: (feature: Feature) => void;
  onStatusChange: (id: string, status: FeatureStatus) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  onVote,
  onSelect,
  onStatusChange
}) => {
  const getStatusClass = (status: FeatureStatus): string => {
    switch (status) {
      case 'Open':
        return 'status-open';
      case 'Planned':
        return 'status-planned';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onVote(feature.id);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation(); // Prevent card click
    onStatusChange(feature.id, e.target.value as FeatureStatus);
  };

  return (
    <div className="feature-card" onClick={() => onSelect(feature)}>
      <div className="feature-card-header">
        <h3 className="feature-title">{feature.title}</h3>
        <span className={`status-badge ${getStatusClass(feature.status)}`}>
          {feature.status}
        </span>
      </div>
      
      <p className="feature-description">
        {feature.description.length > 120
          ? `${feature.description.substring(0, 120)}...`
          : feature.description}
      </p>
      
      <div className="feature-card-footer">
        <button
          className="vote-button"
          onClick={handleVoteClick}
          aria-label={`Vote for ${feature.title}. Current votes: ${feature.votes}`}
        >
          <span className="vote-icon">▲</span>
          <span className="vote-count">{feature.votes}</span>
        </button>
        
        <select
          className="status-select"
          value={feature.status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
          aria-label="Change status"
        >
          <option value="Open">Open</option>
          <option value="Planned">Planned</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default FeatureCard;
