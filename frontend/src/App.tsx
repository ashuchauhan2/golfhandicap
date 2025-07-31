import { useState, useEffect } from 'react';
import { AddRoundForm } from './components/AddRoundForm';
import { HandicapDisplay } from './components/HandicapDisplay';
import { roundService } from './services/api';
import type { Round } from './types/Round';
import './App.css';

function App() {
  const [handicap, setHandicap] = useState<number | null>(null);
  const [handicapLoading, setHandicapLoading] = useState(true);
  const [handicapError, setHandicapError] = useState<string | null>(null);
  const [addRoundLoading, setAddRoundLoading] = useState(false);

  const fetchHandicap = async () => {
    try {
      setHandicapLoading(true);
      setHandicapError(null);
      const handicapValue = await roundService.getHandicap();
      setHandicap(handicapValue);
    } catch (error) {
      console.error('Error fetching handicap:', error);
      setHandicapError('Failed to load handicap');
    } finally {
      setHandicapLoading(false);
    }
  };

  const handleAddRound = async (round: Omit<Round, 'id'>) => {
    setAddRoundLoading(true);
    try {
      await roundService.addRound(round);
      // Refresh handicap after adding a round
      await fetchHandicap();
    } catch (error) {
      console.error('Error adding round:', error);
      throw error; // Re-throw to let the form handle the error
    } finally {
      setAddRoundLoading(false);
    }
  };

  useEffect(() => {
    fetchHandicap();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Golf Handicap Calculator</h1>
        <p>Track your golf rounds and calculate your handicap</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <div className="content-grid">
            <div className="handicap-section">
              <HandicapDisplay
                handicap={handicap}
                loading={handicapLoading}
                error={handicapError}
              />
              <button 
                onClick={fetchHandicap} 
                className="refresh-btn"
                disabled={handicapLoading}
              >
                {handicapLoading ? 'Refreshing...' : 'Refresh Handicap'}
              </button>
            </div>
            
            <div className="form-section">
              <AddRoundForm
                onAddRound={handleAddRound}
                loading={addRoundLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
