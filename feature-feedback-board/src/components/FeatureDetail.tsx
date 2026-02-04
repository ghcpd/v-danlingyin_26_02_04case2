import React from 'react';
import type { Feature, FeatureStatus } from '../types';

interface FeatureDetailProps {
  feature: Feature;
  onVote: (id: string) => void;
  onStatusChange: (id: string, status: FeatureStatus) => void;
  onClose: () => void;
}

const FeatureDetail: React.FC<FeatureDetailProps> = ({
  feature,
  onVote,
  onStatusChange,
  onClose
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content feature-detail">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        
        <div className="detail-header">
          <h2>{feature.title}</h2>
          <span className={`status-badge large ${getStatusClass(feature.status)}`}>
            {feature.status}
          </span>
        </div>
        
        <div className="detail-body">
          <div className="detail-section">
            <h3>Description</h3>
            <p>{feature.description}</p>
          </div>
          
          <div className="detail-section">
            <h3>Votes</h3>
            <div className="vote-display">
              <span className="vote-number">{feature.votes}</span>
              <span className="vote-label">votes</span>
            </div>
          </div>
          
          <div className="detail-section">
            <h3>Update Status</h3>
            <select
              className="status-select large"
              value={feature.status}
              onChange={(e) => onStatusChange(feature.id, e.target.value as FeatureStatus)}
            >
              <option value="Open">Open</option>
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        
        <div className="detail-footer">
          <button
            className="btn-primary vote-button-large"
            onClick={() => onVote(feature.id)}
          >
            <span className="vote-icon">▲</span>
            Vote for this Feature
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;
