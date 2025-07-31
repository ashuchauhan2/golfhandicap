import React from 'react';

interface HandicapDisplayProps {
  handicap: number | null;
  loading: boolean;
  error: string | null;
}

export const HandicapDisplay: React.FC<HandicapDisplayProps> = ({ handicap, loading, error }) => {
  if (loading) {
    return (
      <div className="handicap-display loading">
        <h2>Current Handicap</h2>
        <div className="handicap-value">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="handicap-display error">
        <h2>Current Handicap</h2>
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="handicap-display">
      <h2>Current Handicap</h2>
      <div className="handicap-value">
        {handicap !== null ? handicap.toFixed(1) : 'No rounds recorded'}
      </div>
      {handicap !== null && (
        <div className="handicap-info">
          <p>
            {handicap === 0 
              ? 'Perfect average! Your scores match the course ratings.' 
              : handicap > 0 
                ? `You typically score ${handicap.toFixed(1)} strokes above course rating.`
                : `You typically score ${Math.abs(handicap).toFixed(1)} strokes below course rating.`
            }
          </p>
        </div>
      )}
    </div>
  );
};