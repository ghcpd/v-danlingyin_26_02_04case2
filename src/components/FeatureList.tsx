import { useState, useMemo, FC } from 'react';
import { Feature, SortOrder, StatusFilter, FeatureStatus } from '../types';

interface FeatureListProps {
  features: Feature[];
  onVote: (featureId: string) => void;
  onViewDetail: (featureId: string) => void;
  onNewFeature: () => void;
}

const FeatureList: FC<FeatureListProps> = ({
  features,
  onVote,
  onViewDetail,
  onNewFeature
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('votes-desc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  /**
   * Apply filtering and sorting to features
   * This computation is memoized to optimize performance
   */
  const filteredAndSortedFeatures = useMemo(() => {
    // Step 1: Filter by status
    let result = features;
    if (statusFilter !== 'all') {
      result = result.filter(feature => feature.status === statusFilter);
    }

    // Step 2: Sort based on selected order
    result = [...result].sort((a, b) => {
      switch (sortOrder) {
        case 'votes-desc':
          return b.votes - a.votes;
        case 'votes-asc':
          return a.votes - b.votes;
        case 'recent':
          // Newer IDs are higher (timestamp-based)
          return Number(b.id) - Number(a.id);
        default:
          return 0;
      }
    });

    return result;
  }, [features, statusFilter, sortOrder]);

  /**
   * Get status badge CSS class
   */
  const getStatusClass = (status: FeatureStatus): string => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  return (
    <div className="feature-list-container">
      {/* Controls Section */}
      <div className="list-controls">
        <button className="btn btn-primary" onClick={onNewFeature}>
          + New Feature Request
        </button>

        <div className="controls-row">
          {/* Filter by Status */}
          <div className="control-group">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="select-input"
            >
              <option value="all">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="control-group">
            <label htmlFor="sort-order">Sort by:</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="select-input"
            >
              <option value="votes-desc">Most Votes</option>
              <option value="votes-asc">Least Votes</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        Showing {filteredAndSortedFeatures.length} of {features.length} features
      </div>

      {/* Feature Cards */}
      <div className="feature-grid">
        {filteredAndSortedFeatures.length === 0 ? (
          <div className="empty-state">
            <p>No features match your current filter.</p>
            <button className="btn btn-secondary" onClick={() => setStatusFilter('all')}>
              Clear Filter
            </button>
          </div>
        ) : (
          filteredAndSortedFeatures.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card-header">
                <h3 className="feature-title">{feature.title}</h3>
                <span className={getStatusClass(feature.status)}>
                  {feature.status}
                </span>
              </div>

              <p className="feature-description">
                {feature.description.length > 120
                  ? `${feature.description.substring(0, 120)}...`
                  : feature.description}
              </p>

              <div className="feature-card-footer">
                <div className="vote-section">
                  <button
                    className="btn-vote"
                    onClick={() => onVote(feature.id)}
                    aria-label={`Vote for ${feature.title}`}
                  >
                    ▲
                  </button>
                  <span className="vote-count">{feature.votes}</span>
                  <span className="vote-label">votes</span>
                </div>

                <button
                  className="btn btn-link"
                  onClick={() => onViewDetail(feature.id)}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeatureList;
