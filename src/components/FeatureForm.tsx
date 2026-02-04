import { useState, FormEvent, ChangeEvent, FC } from 'react';
import { FeatureStatus } from '../types';

interface FeatureFormProps {
  onSubmit: (feature: { title: string; description: string; status: FeatureStatus }) => void;
  onCancel: () => void;
}

const FeatureForm: FC<FeatureFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<FeatureStatus>('Open');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  /**
   * Validate form inputs
   */
  const validate = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (description.trim().length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        status
      });
      // Reset form
      setTitle('');
      setDescription('');
      setStatus('Open');
      setErrors({});
    }
  };

  /**
   * Handle title input change
   */
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // Clear error when user starts typing
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  };

  /**
   * Handle description input change
   */
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    // Clear error when user starts typing
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: undefined }));
    }
  };

  return (
    <div className="feature-form-container">
      <div className="form-header">
        <h2>Submit a New Feature Request</h2>
        <p className="form-subtitle">
          Help us improve by suggesting new features or improvements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="feature-form">
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="feature-title" className="form-label">
            Feature Title *
          </label>
          <input
            id="feature-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className={`form-input ${errors.title ? 'input-error' : ''}`}
            placeholder="Enter a descriptive title"
            maxLength={100}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
          <span className="character-count">{title.length}/100</span>
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="feature-description" className="form-label">
            Description *
          </label>
          <textarea
            id="feature-description"
            value={description}
            onChange={handleDescriptionChange}
            className={`form-textarea ${errors.description ? 'input-error' : ''}`}
            placeholder="Describe the feature in detail"
            rows={6}
            maxLength={500}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
          <span className="character-count">{description.length}/500</span>
        </div>

        {/* Status Selection */}
        <div className="form-group">
          <label htmlFor="feature-status" className="form-label">
            Initial Status
          </label>
          <select
            id="feature-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as FeatureStatus)}
            className="form-select"
          >
            <option value="Open">Open</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
          </select>
          <span className="help-text">Most feature requests start as "Open"</span>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Feature Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeatureForm;
