import React, { useState } from "react";
import { FeatureStatus } from "../types";

interface FeatureFormProps {
  onSubmit: (payload: { title: string; description: string; status: FeatureStatus }) => void;
}

export function FeatureForm({ onSubmit }: FeatureFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FeatureStatus>("Open");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
    });

    setTitle("");
    setDescription("");
    setStatus("Open");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Submit a feature</h2>
      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Short summary"
        required
      />

      <label className="label" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What problem does this solve?"
        rows={3}
        required
      />

      <label className="label" htmlFor="status">
        Status
      </label>
      <select id="status" value={status} onChange={(event) => setStatus(event.target.value as FeatureStatus)}>
        <option value="Open">Open</option>
        <option value="Planned">Planned</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit" className="primary">
        Add feature
      </button>
    </form>
  );
}
