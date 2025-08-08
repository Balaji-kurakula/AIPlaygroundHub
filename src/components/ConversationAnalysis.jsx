import React, { useState } from 'react';
import api from '../utils/api';
import '../styles/components.css';

const ConversationAnalysis = ({ addToHistory }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid audio file');
    }
  };

  const handleAnalysis = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await api.post('/conversation/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setResult(response.data);
      addToHistory({
        type: 'conversation',
        input: file.name,
        output: response.data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2 className="component-title">Conversation Analysis</h2>
      
      <div className="upload-area">
        <div className="upload-icon">🎤</div>
        <div className="upload-text">
          Upload an audio file for speech-to-text and speaker diarization
        </div>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="file-input"
          id="audio-upload"
        />
        <label htmlFor="audio-upload" className="upload-label">
          <span>📁</span>
          Choose Audio File
        </label>
      </div>
      
      {file && (
        <div className="file-selected">
          <div className="file-info">Selected: {file.name}</div>
          <button
            onClick={handleAnalysis}
            disabled={loading}
            className="btn btn-success"
          >
            {loading && <span className="loading-spinner"></span>}
            {loading ? 'Analyzing...' : 'Analyze Audio'}
          </button>
        </div>
      )}

      {result && (
        <div className="results-section">
          <div className="result-card">
            <h3 className="result-title">
              <span>📝</span>
              Transcript
            </h3>
            <div className="result-content">{result.transcript}</div>
          </div>

          <div className="result-card">
            <h3 className="result-title">
              <span>👥</span>
              Speaker Diarization
            </h3>
            <div>
              {result.diarization.map((segment, index) => (
                <div key={index} className="diarization-item">
                  <span className={`speaker-badge ${segment.speaker === 'Speaker 1' ? 'speaker-1' : 'speaker-2'}`}>
                    {segment.speaker}
                  </span>
                  <span className="speaker-text">{segment.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationAnalysis;
