import React, { useState } from 'react';
import type { Feature, FeatureStatus } from '../types';

interface FeatureFormProps {
  onSubmit: (feature: Omit<Feature, 'id' | 'votes'>) => void;
  onCancel?: () => void;
}

const FeatureForm: React.FC<FeatureFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<FeatureStatus>('Open');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validate = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status
    });
    
    // Reset form after successful submission
    setTitle('');
    setDescription('');
    setStatus('Open');
    setErrors({});
  };

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <h2>Submit a New Feature Request</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a concise title for your feature request"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the feature in detail. What problem does it solve?"
          rows={4}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Initial Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as FeatureStatus)}
        >
          <option value="Open">Open</option>
          <option value="Planned">Planned</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn-primary">
          Submit Feature Request
        </button>
      </div>
    </form>
  );
};

export default FeatureForm;
