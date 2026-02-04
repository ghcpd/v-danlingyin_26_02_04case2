import React from "react";
import { FeatureStatus, SortOption } from "../types";

interface FiltersProps {
  status: FeatureStatus | "All";
  sort: SortOption["value"];
  onStatusChange: (status: FeatureStatus | "All") => void;
  onSortChange: (sort: SortOption["value"]) => void;
}

const statusOptions: Array<FeatureStatus | "All"> = ["All", "Open", "Planned", "Completed"];
const sortOptions: SortOption[] = [
  { label: "Sort by votes", value: "votes" },
  { label: "Sort by title", value: "title" },
];

export function Filters({ status, sort, onStatusChange, onSortChange }: FiltersProps) {
  return (
    <div className="filters">
      <div className="filter-group">
        <span className="label">Status</span>
        <div className="pill-group">
          {statusOptions.map((option) => (
            <button
              key={option}
              className={option === status ? "pill active" : "pill"}
              onClick={() => onStatusChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <label className="label" htmlFor="sort-select">
          Sort
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption["value"])}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
