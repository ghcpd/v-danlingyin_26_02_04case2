/**
 * Status types for feature requests
 */
export type FeatureStatus = 'Open' | 'Planned' | 'Completed';

/**
 * Feature entity representing a feature request
 */
export interface Feature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  votes: number;
}

/**
 * Sort order options for feature list
 */
export type SortOrder = 'votes-desc' | 'votes-asc' | 'recent';

/**
 * Filter options for feature list
 */
export type StatusFilter = 'all' | FeatureStatus;
