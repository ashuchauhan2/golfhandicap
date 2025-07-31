import React, { useState } from 'react';
import type { Round } from '../types/Round';
import { APP_CONFIG } from '../config/app';

interface AddRoundFormProps {
  onAddRound: (round: Omit<Round, 'id'>) => Promise<void>;
  loading: boolean;
}

export const AddRoundForm: React.FC<AddRoundFormProps> = ({ onAddRound, loading }) => {
  const [formData, setFormData] = useState({
    score: '',
    courseRating: '',
    slopeRating: '',
    playedAt: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:MM format
    pin: '',
  });
  
  const [pinError, setPinError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    
    if (!formData.score || !formData.courseRating || !formData.slopeRating || !formData.pin) {
      alert('Please fill in all fields');
      return;
    }

    // Validate PIN
    if (formData.pin !== APP_CONFIG.ADMIN_PIN) {
      setPinError('Invalid PIN. Access denied.');
      return;
    }

    try {
      await onAddRound({
        score: parseInt(formData.score),
        courseRating: parseFloat(formData.courseRating),
        slopeRating: parseInt(formData.slopeRating),
        playedAt: new Date(formData.playedAt).toISOString(),
      });
      
      // Reset form
      setFormData({
        score: '',
        courseRating: '',
        slopeRating: '',
        playedAt: new Date().toISOString().slice(0, 16),
        pin: '',
      });
      setPinError('');
    } catch (error) {
      console.error('Error adding round:', error);
      alert('Failed to add round. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-round-form">
      <h2>Add New Round</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="score">Score:</label>
          <input
            type="number"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleInputChange}
            min="1"
            max="200"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseRating">Course Rating:</label>
          <input
            type="number"
            id="courseRating"
            name="courseRating"
            value={formData.courseRating}
            onChange={handleInputChange}
            step="0.1"
            min="50"
            max="80"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="slopeRating">Slope Rating:</label>
          <input
            type="number"
            id="slopeRating"
            name="slopeRating"
            value={formData.slopeRating}
            onChange={handleInputChange}
            min="55"
            max="155"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="playedAt">Date Played:</label>
          <input
            type="datetime-local"
            id="playedAt"
            name="playedAt"
            value={formData.playedAt}
            onChange={handleInputChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group pin-group">
          <label htmlFor="pin">Security PIN:</label>
          <input
            type="password"
            id="pin"
            name="pin"
            value={formData.pin}
            onChange={handleInputChange}
            maxLength={4}
            pattern="[0-9]{4}"
            placeholder="••••"
            required
            disabled={loading}
            className="pin-input"
            autoComplete="off"
          />
          {pinError && <div className="pin-error">{pinError}</div>}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding Round...' : 'Add Round'}
        </button>
      </form>
    </div>
  );
};