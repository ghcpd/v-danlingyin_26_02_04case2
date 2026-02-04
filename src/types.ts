export type FeatureStatus = "Open" | "Planned" | "Completed";

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  votes: number;
}

export interface SortOption {
  label: string;
  value: "votes" | "title";
}
