import type { Feature } from '../types';

// Mock data for initial features
export const mockFeatures: Feature[] = [
  {
    id: '1',
    title: 'Dark Mode Support',
    description: 'Add a dark mode theme option for better viewing experience in low-light conditions. This should include system preference detection and manual toggle.',
    status: 'Planned',
    votes: 42
  },
  {
    id: '2',
    title: 'Export to CSV',
    description: 'Allow users to export their data to CSV format for external analysis and backup purposes.',
    status: 'Open',
    votes: 28
  },
  {
    id: '3',
    title: 'Keyboard Shortcuts',
    description: 'Implement keyboard shortcuts for common actions to improve productivity for power users.',
    status: 'Completed',
    votes: 35
  },
  {
    id: '4',
    title: 'Mobile Responsive Design',
    description: 'Improve the mobile experience with better responsive layouts and touch-friendly interactions.',
    status: 'Open',
    votes: 56
  },
  {
    id: '5',
    title: 'API Rate Limiting Dashboard',
    description: 'Create a dashboard to monitor and manage API rate limits for better resource management.',
    status: 'Planned',
    votes: 19
  },
  {
    id: '6',
    title: 'Multi-language Support',
    description: 'Add internationalization support to make the application accessible to users in different regions.',
    status: 'Open',
    votes: 31
  }
];
