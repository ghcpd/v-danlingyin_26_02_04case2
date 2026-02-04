import { Feature } from "./types";

export const initialFeatures: Feature[] = [
  {
    id: "f1",
    title: "Dark mode toggle",
    description: "Add an accessible dark mode with system preference support.",
    status: "Planned",
    votes: 24,
  },
  {
    id: "f2",
    title: "Keyboard shortcuts",
    description: "Global shortcuts for quick navigation between sections.",
    status: "Open",
    votes: 15,
  },
  {
    id: "f3",
    title: "Mobile responsive layout",
    description: "Improve layout spacing and typography on smaller screens.",
    status: "Completed",
    votes: 38,
  },
  {
    id: "f4",
    title: "Export feedback",
    description: "Allow CSV export of feedback items for offline analysis.",
    status: "Open",
    votes: 9,
  },
];
