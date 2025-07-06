import React, { useState } from 'react';
import './PageStyles.css';

const MathSolverPage = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = async () => {
    if (!problem.trim()) return;

    setLoading(true);
    setError('');
    setSolution('');

    try {
      const response = await fetch('http://localhost:5000/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to solve');
      }

      setSolution(data.solution);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>AI Math Solver</h2>
      <div className="tools-grid">
        <div className="tool-card" style={{ padding: '30px' }}>
          <h3>Solve Your Math Problem</h3>
          <textarea
            placeholder="Type or paste math problem here..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={4}
            style={{
              width: '97%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginTop: '15px',
              resize: 'none',
            }}
          />
          <button
            onClick={handleSolve}
            disabled={loading}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#27ae60',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Solving...' : 'Solve Problem'}
          </button>

          {error && (
            <div style={{ marginTop: '10px', color: 'red', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          {solution && (
            <div
              style={{
                marginTop: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '15px',
                borderRadius: '10px',
                whiteSpace: 'pre-wrap',
              }}
            >
              <h4 style={{ color: '#27ae60' }}>Solution:</h4>
              <p style={{ color: '#fff' }}>{solution}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathSolverPage;
