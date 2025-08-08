import React, { useState } from 'react';
import ConversationAnalysis from './ConversationAnalysis';
import ImageAnalysis from './ImageAnalysis';
import DocumentSummarization from './DocumentSummarization';
import History from './History';
import '../styles/Dashboard.css';

const Dashboard = ({ user, setIsAuthenticated }) => {
  const [selectedSkill, setSelectedSkill] = useState('conversation');
  const [history, setHistory] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const skills = [
    { id: 'conversation', name: 'Conversation Analysis', icon: '🎤', gradient: 'from-blue-500 to-purple-600' },
    { id: 'image', name: 'Image Analysis', icon: '🖼️', gradient: 'from-green-500 to-blue-500' },
    { id: 'document', name: 'Document Summarization', icon: '📄', gradient: 'from-orange-500 to-red-500' }
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
    const components = {
      conversation: <ConversationAnalysis addToHistory={addToHistory} />,
      image: <ImageAnalysis addToHistory={addToHistory} />,
      document: <DocumentSummarization addToHistory={addToHistory} />
    };
    
    return (
      <div className="skill-component-wrapper">
        {components[selectedSkill]}
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="background-gradient">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <span className="header-logo">🤖</span>
              <h1 className="header-title">AI Playground</h1>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="user-info">
              <div className="avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="welcome-text">Welcome, {user?.name || 'User'}</span>
            </div>
            
            <button onClick={handleLogout} className="logout-btn">
              <span className="logout-icon">🚪</span>
              <span>Logout</span>
              <div className="button-ripple"></div>
            </button>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <div className="sidebar-container">
          <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
              <h2 className="sidebar-title">AI Skills</h2>
              <button 
                className="collapse-btn"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
            </div>
            
            <div className="skills-list">
              {skills.map((skill, index) => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                  className={`skill-btn ${selectedSkill === skill.id ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="skill-btn-content">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-btn-bg"></div>
                  {selectedSkill === skill.id && <div className="active-indicator"></div>}
                </button>
              ))}
            </div>
          </div>
          
          <div className="history-wrapper">
            <History history={history} />
          </div>
        </div>

        <div className="main-content">
          <div className="content-header">
            <h2 className="content-title">
              {skills.find(s => s.id === selectedSkill)?.name}
            </h2>
            <div className="content-badge">
              {skills.find(s => s.id === selectedSkill)?.icon}
            </div>
          </div>
          {renderSkillComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
