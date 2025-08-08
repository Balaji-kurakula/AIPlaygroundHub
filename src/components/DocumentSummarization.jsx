import React, { useState } from 'react';
import api from '../utils/api';
import '../styles/components.css';

const DocumentSummarization = ({ addToHistory }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [inputType, setInputType] = useState('file');

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSummarization = async () => {
    if (!file && !url) return;

    setLoading(true);
    try {
      const formData = new FormData();
      if (inputType === 'file' && file) {
        formData.append('file', file);
      } else if (inputType === 'url' && url) {
        formData.append('url', url);
      }

      const response = await api.post('/document/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setResult(response.data);
      addToHistory({
        type: 'document',
        input: inputType === 'file' ? file.name : url,
        output: response.data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Summarization failed:', error);
      alert('Summarization failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2 className="component-title">Document Summarization</h2>
      
      <div className="input-tabs">
        <button
          onClick={() => setInputType('file')}
          className={`tab-btn ${inputType === 'file' ? 'active' : ''}`}
        >
          📄 Upload File
        </button>
        <button
          onClick={() => setInputType('url')}
          className={`tab-btn ${inputType === 'url' ? 'active' : ''}`}
        >
          🔗 URL
        </button>
      </div>

      {inputType === 'file' ? (
        <div className="upload-area">
          <div className="upload-icon">📄</div>
          <div className="upload-text">
            Upload a document (PDF, DOC, DOCX) for summarization
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="file-input"
            id="doc-upload"
          />
          <label htmlFor="doc-upload" className="upload-label">
            <span>📁</span>
            Choose Document
          </label>
        </div>
      ) : (
        <div className="url-input-group">
          <span className="url-icon">🔗</span>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to summarize"
            className="url-input"
          />
        </div>
      )}
      
      {((inputType === 'file' && file) || (inputType === 'url' && url)) && (
        <div className="file-selected">
          <div className="file-info">
            {inputType === 'file' ? `Selected: ${file.name}` : `URL: ${url}`}
          </div>
          <button
            onClick={handleSummarization}
            disabled={loading}
            className="btn btn-success"
          >
            {loading && <span className="loading-spinner"></span>}
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>
      )}

      {result && (
        <div className="results-section">
          <div className="result-card">
            <h3 className="result-title">
              <span>📋</span>
              Summary
            </h3>
            <div className="result-content">{result.summary}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentSummarization;
