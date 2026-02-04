import { useState } from 'react';
import { Feature, FeatureStatus } from './types';
import FeatureList from './components/FeatureList';
import FeatureForm from './components/FeatureForm';
import FeatureDetail from './components/FeatureDetail';
import './App.css';

/**
 * Mock initial data for the application
 */
const INITIAL_FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Dark Mode Support',
    description: 'Add a dark mode theme to reduce eye strain during night usage.',
    status: 'Planned',
    votes: 42
  },
  {
    id: '2',
    title: 'Mobile App',
    description: 'Create native mobile applications for iOS and Android platforms.',
    status: 'Open',
    votes: 87
  },
  {
    id: '3',
    title: 'Export to PDF',
    description: 'Allow users to export their data and reports as PDF files.',
    status: 'Completed',
    votes: 23
  },
  {
    id: '4',
    title: 'Real-time Collaboration',
    description: 'Enable multiple users to work on the same document simultaneously.',
    status: 'Open',
    votes: 156
  },
  {
    id: '5',
    title: 'Keyboard Shortcuts',
    description: 'Implement comprehensive keyboard shortcuts for power users.',
    status: 'Completed',
    votes: 34
  }
];

/**
 * View types for navigation
 */
type ViewType = 'list' | 'form' | 'detail';

function App() {
  const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

  /**
   * Add a new feature to the list
   */
  const handleAddFeature = (newFeature: Omit<Feature, 'id' | 'votes'>) => {
    const feature: Feature = {
      ...newFeature,
      id: Date.now().toString(),
      votes: 0
    };
    setFeatures(prev => [feature, ...prev]);
    setCurrentView('list');
  };

  /**
   * Increment vote count for a feature
   */
  const handleVote = (featureId: string) => {
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? { ...feature, votes: feature.votes + 1 }
          : feature
      )
    );
  };

  /**
   * Update feature status
   */
  const handleStatusChange = (featureId: string, newStatus: FeatureStatus) => {
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? { ...feature, status: newStatus }
          : feature
      )
    );
  };

  /**
   * Navigate to feature detail view
   */
  const handleViewDetail = (featureId: string) => {
    setSelectedFeatureId(featureId);
    setCurrentView('detail');
  };

  /**
   * Navigate back to list view
   */
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedFeatureId(null);
  };

  const selectedFeature = selectedFeatureId
    ? features.find(f => f.id === selectedFeatureId)
    : undefined;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Feature Feedback Board</h1>
        <p className="tagline">Share your ideas and vote on features</p>
      </header>

      <main className="app-main">
        {currentView === 'list' && (
          <FeatureList
            features={features}
            onVote={handleVote}
            onViewDetail={handleViewDetail}
            onNewFeature={() => setCurrentView('form')}
          />
        )}

        {currentView === 'form' && (
          <FeatureForm
            onSubmit={handleAddFeature}
            onCancel={handleBackToList}
          />
        )}

        {currentView === 'detail' && selectedFeature && (
          <FeatureDetail
            feature={selectedFeature}
            onVote={handleVote}
            onStatusChange={handleStatusChange}
            onBack={handleBackToList}
          />
        )}
      </main>
    </div>
  );
}

export default App;
