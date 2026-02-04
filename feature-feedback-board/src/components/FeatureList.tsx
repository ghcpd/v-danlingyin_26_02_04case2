import React from 'react';
import type { Feature, FeatureStatus, SortOrder, StatusFilter } from '../types';
import FeatureCard from './FeatureCard';

interface FeatureListProps {
  features: Feature[];
  sortOrder: SortOrder;
  statusFilter: StatusFilter;
  onSortChange: (sort: SortOrder) => void;
  onFilterChange: (filter: StatusFilter) => void;
  onVote: (id: string) => void;
  onSelect: (feature: Feature) => void;
  onStatusChange: (id: string, status: FeatureStatus) => void;
}

const FeatureList: React.FC<FeatureListProps> = ({
  features,
  sortOrder,
  statusFilter,
  onSortChange,
  onFilterChange,
  onVote,
  onSelect,
  onStatusChange
}) => {
  // Apply filtering
  const filteredFeatures = statusFilter === 'All'
    ? features
    : features.filter(f => f.status === statusFilter);

  // Apply sorting
  const sortedFeatures = [...filteredFeatures].sort((a, b) => {
    switch (sortOrder) {
      case 'votes-desc':
        return b.votes - a.votes;
      case 'votes-asc':
        return a.votes - b.votes;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'oldest':
        return parseInt(a.id) - parseInt(b.id);
      default:
        return 0;
    }
  });

  return (
    <div className="feature-list-container">
      <div className="list-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onFilterChange(e.target.value as StatusFilter)}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="sort-group">
          <label htmlFor="sort-order">Sort by:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as SortOrder)}
          >
            <option value="votes-desc">Most Votes</option>
            <option value="votes-asc">Least Votes</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="feature-count">
        Showing {sortedFeatures.length} of {features.length} features
      </div>

      {sortedFeatures.length === 0 ? (
        <div className="empty-state">
          <p>No features found matching your criteria.</p>
        </div>
      ) : (
        <div className="feature-grid">
          {sortedFeatures.map(feature => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onVote={onVote}
              onSelect={onSelect}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureList;
