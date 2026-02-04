import { useState, useCallback } from 'react';
import type { Feature, FeatureStatus, SortOrder, StatusFilter } from './types';
import { mockFeatures } from './data/mockData';
import FeatureList from './components/FeatureList';
import FeatureForm from './components/FeatureForm';
import FeatureDetail from './components/FeatureDetail';
import './App.css';

/**
 * Main App Component
 * 
 * State Management Explanation:
 * - features: Array of all feature requests, initialized with mock data
 * - selectedFeature: Currently selected feature for detail view (null when none selected)
 * - showForm: Boolean to toggle the feature submission form visibility
 * - sortOrder: Current sorting preference for the feature list
 * - statusFilter: Current status filter for the feature list
 * 
 * State Updates:
 * - Voting: Updates the votes count for a specific feature by mapping over the array
 *   and incrementing the vote count for the matching feature
 * - Status Change: Updates the status of a specific feature by mapping over the array
 * - Add Feature: Appends a new feature to the array with a generated ID and 0 votes
 * - Select Feature: Sets the selectedFeature state to show the detail modal
 */

function App() {
  // Core state: list of all features
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);
  
  // UI state: currently selected feature for detail view
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  
  // UI state: show/hide the submission form
  const [showForm, setShowForm] = useState(false);
  
  // List controls state
  const [sortOrder, setSortOrder] = useState<SortOrder>('votes-desc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  /**
   * Handle voting for a feature
   * Creates a new array with the updated vote count for immediate UI reflection
   */
  const handleVote = useCallback((id: string) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === id
          ? { ...feature, votes: feature.votes + 1 }
          : feature
      )
    );
    
    // Also update selectedFeature if it's the one being voted on
    setSelectedFeature(prev =>
      prev && prev.id === id
        ? { ...prev, votes: prev.votes + 1 }
        : prev
    );
  }, []);

  /**
   * Handle status change for a feature
   * Updates both the main features array and the selected feature if applicable
   */
  const handleStatusChange = useCallback((id: string, newStatus: FeatureStatus) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature =>
        feature.id === id
          ? { ...feature, status: newStatus }
          : feature
      )
    );
    
    // Also update selectedFeature if it's the one being modified
    setSelectedFeature(prev =>
      prev && prev.id === id
        ? { ...prev, status: newStatus }
        : prev
    );
  }, []);

  /**
   * Handle new feature submission
   * Generates a unique ID and initializes votes to 0
   */
  const handleAddFeature = useCallback((featureData: Omit<Feature, 'id' | 'votes'>) => {
    const newFeature: Feature = {
      ...featureData,
      id: Date.now().toString(), // Simple ID generation
      votes: 0
    };
    
    setFeatures(prevFeatures => [...prevFeatures, newFeature]);
    setShowForm(false);
  }, []);

  /**
   * Handle feature selection for detail view
   */
  const handleSelectFeature = useCallback((feature: Feature) => {
    setSelectedFeature(feature);
  }, []);

  /**
   * Close the detail modal
   */
  const handleCloseDetail = useCallback(() => {
    setSelectedFeature(null);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Feature Feedback Board</h1>
          <p className="header-subtitle">Submit and vote on feature requests</p>
        </div>
        <button
          className="btn-primary add-feature-btn"
          onClick={() => setShowForm(true)}
        >
          + New Feature Request
        </button>
      </header>

      <main className="app-main">
        {showForm && (
          <div className="form-container">
            <FeatureForm
              onSubmit={handleAddFeature}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <FeatureList
          features={features}
          sortOrder={sortOrder}
          statusFilter={statusFilter}
          onSortChange={setSortOrder}
          onFilterChange={setStatusFilter}
          onVote={handleVote}
          onSelect={handleSelectFeature}
          onStatusChange={handleStatusChange}
        />
      </main>

      {selectedFeature && (
        <FeatureDetail
          feature={selectedFeature}
          onVote={handleVote}
          onStatusChange={handleStatusChange}
          onClose={handleCloseDetail}
        />
      )}

      <footer className="app-footer">
        <p>Feature Feedback Board — Desktop Web Application</p>
      </footer>
    </div>
  );
}

export default App;
