import React, { useState } from 'react';
import api from '../utils/api';
import '../styles/components.css';

const ImageAnalysis = ({ addToHistory }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleAnalysis = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/image/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setResult(response.data);
      addToHistory({
        type: 'image',
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
      <h2 className="component-title">Image Analysis</h2>
      
      <div className="upload-area">
        <div className="upload-icon">🖼️</div>
        <div className="upload-text">
          Upload an image for detailed analysis and description
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="file-input"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="upload-label">
          <span>📁</span>
          Choose Image File
        </label>
      </div>
      
      {file && (
        <div className="file-selected">
          <div className="file-preview">
            {preview && (
              <img src={preview} alt="Preview" className="preview-image" />
            )}
            <div>
              <div className="file-info">Selected: {file.name}</div>
              <button
                onClick={handleAnalysis}
                disabled={loading}
                className="btn btn-success"
              >
                {loading && <span className="loading-spinner"></span>}
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="results-section">
          <div className="result-card">
            <h3 className="result-title">
              <span>🔍</span>
              Image Description
            </h3>
            <div className="result-content">{result.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;
