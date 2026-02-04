import { ChangeEvent, FC } from 'react';
import { Feature, FeatureStatus } from '../types';

interface FeatureDetailProps {
  feature: Feature;
  onVote: (featureId: string) => void;
  onStatusChange: (featureId: string, newStatus: FeatureStatus) => void;
  onBack: () => void;
}

const FeatureDetail: FC<FeatureDetailProps> = ({
  feature,
  onVote,
  onStatusChange,
  onBack
}) => {
  /**
   * Get status badge CSS class
   */
  const getStatusClass = (status: FeatureStatus): string => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  /**
   * Handle status change from dropdown
   */
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as FeatureStatus;
    onStatusChange(feature.id, newStatus);
  };

  return (
    <div className="feature-detail-container">
      {/* Navigation */}
      <button className="btn btn-link back-button" onClick={onBack}>
        ← Back to List
      </button>

      {/* Feature Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <h2 className="detail-title">{feature.title}</h2>
          <span className={getStatusClass(feature.status)}>
            {feature.status}
          </span>
        </div>
        <div className="detail-meta">
          <span className="meta-item">Feature ID: {feature.id}</span>
        </div>
      </div>

      {/* Voting Section */}
      <div className="detail-vote-section">
        <div className="vote-display">
          <button
            className="btn-vote-large"
            onClick={() => onVote(feature.id)}
            aria-label={`Vote for ${feature.title}`}
          >
            ▲ Vote
          </button>
          <div className="vote-count-large">
            <span className="count-number">{feature.votes}</span>
            <span className="count-label">{feature.votes === 1 ? 'vote' : 'votes'}</span>
          </div>
        </div>

        <div className="voting-info">
          <p className="info-text">
            Click the vote button to show your support for this feature.
            Votes help us prioritize development.
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className="detail-section">
        <h3 className="section-title">Description</h3>
        <p className="detail-description">{feature.description}</p>
      </div>

      {/* Status Management Section */}
      <div className="detail-section">
        <h3 className="section-title">Status Management</h3>
        <div className="status-control">
          <label htmlFor="status-select" className="status-label">
            Update Status:
          </label>
          <select
            id="status-select"
            value={feature.status}
            onChange={handleStatusChange}
            className="status-select"
          >
            <option value="Open">Open</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="status-info">
          <div className="status-info-item">
            <strong>Open:</strong> Feature request is submitted and under review
          </div>
          <div className="status-info-item">
            <strong>Planned:</strong> Feature is approved and scheduled for development
          </div>
          <div className="status-info-item">
            <strong>Completed:</strong> Feature has been implemented and released
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="detail-actions">
        <button className="btn btn-primary" onClick={onBack}>
          Return to Feature List
        </button>
      </div>
    </div>
  );
};

export default FeatureDetail;
