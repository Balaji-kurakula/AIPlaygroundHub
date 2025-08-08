import React from 'react';
import '../styles/components.css';

const History = ({ history }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'conversation': return '🎤';
      case 'image': return '🖼️';
      case 'document': return '📄';
      default: return '📄';
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (history.length === 0) {
    return (
      <div className="history-container">
        <h2 className="history-title">Recent History</h2>
        <p className="history-empty">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h2 className="history-title">Recent History</h2>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <span className="history-icon">{getIcon(item.type)}</span>
            <div className="history-content">
              <div className="history-filename">{item.input}</div>
              <div className="history-time">
                <span>🕒</span>
                {formatDate(item.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
