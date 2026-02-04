// Status values for feature requests
export type FeatureStatus = 'Open' | 'Planned' | 'Completed';

// Feature entity as defined in the spec
export interface Feature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  votes: number;
}

// Sort options for the feature list
export type SortOrder = 'votes-desc' | 'votes-asc' | 'newest' | 'oldest';

// Filter options (null means show all)
export type StatusFilter = FeatureStatus | 'All';
