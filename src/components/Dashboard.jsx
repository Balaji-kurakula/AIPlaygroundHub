import React, { useState } from 'react';
import ConversationAnalysis from './ConversationAnalysis';
import ImageAnalysis from './ImageAnalysis';
import DocumentSummarization from './DocumentSummarization';
import History from './History';
import '../styles/Dashboard.css';

const Dashboard = ({ user, setIsAuthenticated }) => {
  const [selectedSkill, setSelectedSkill] = useState('conversation');
  const [history, setHistory] = useState([]);

  const skills = [
    { id: 'conversation', name: 'Conversation Analysis', icon: '🎤' },
    { id: 'image', name: 'Image Analysis', icon: '🖼️' },
    { id: 'document', name: 'Document Summarization', icon: '📄' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
  };

  const addToHistory = (entry) => {
    setHistory(prev => [entry, ...prev].slice(0, 10));
  };

  const renderSkillComponent = () => {
    switch (selectedSkill) {
      case 'conversation':
        return <ConversationAnalysis addToHistory={addToHistory} />;
      case 'image':
        return <ImageAnalysis addToHistory={addToHistory} />;
      case 'document':
        return <DocumentSummarization addToHistory={addToHistory} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">AI Playground</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <div>
          <div className="sidebar">
            <h2 className="sidebar-title">Select Skill</h2>
            <div className="skills-list">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  className={`skill-btn ${selectedSkill === skill.id ? 'active' : ''}`}
                >
                  <span className="skill-icon">{skill.icon}</span>
                  <span>{skill.name}</span>
                </button>
              ))}
            </div>
          </div>
          <History history={history} />
        </div>
        <div className="main-content">
          {renderSkillComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
