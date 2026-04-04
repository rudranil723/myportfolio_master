import { useEffect, useState, useCallback } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faTimes, faFlask, faBrain, faCloud, faMusic, faRobot, faCode } from '@fortawesome/free-solid-svg-icons';
import image2 from '../../assets/images/2.png';
import image3 from '../../assets/images/3.jpeg';
import './index.scss';

const projects = [
  {
    id: 1,
    title: 'Hybrid Stock Market Research',
    shortDesc: 'Stock market analysis combining sentiment analysis, deep learning & NLP.',
    longDesc: 'A research-grade project that fuses sentiment analysis from financial news with technical indicators using LSTM deep learning models. Predicts market movements by understanding both the numbers and the narrative behind them.',
    tags: ['Python', 'NLP', 'Deep Learning', 'LSTM'],
    github: 'https://github.com/rudranil723/sentiment-technical-synergy',
    live: null,
    icon: faFlask,
    color: '#a78bfa',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'NLP Chatbot',
    shortDesc: 'A conversational chatbot built using Machine Learning and NLP.',
    longDesc: 'Trained on conversational datasets using natural language processing techniques. The bot understands user intent and responds meaningfully to simple conversations. Built and experimented on Google Colab.',
    tags: ['Python', 'ML', 'NLP'],
    github: null,
    live: 'https://colab.research.google.com/drive/1sgS-DPnYjkGHRX2QlZfdiskyQ-nbziRy',
    icon: faRobot,
    color: '#34d399',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Live Weather App',
    shortDesc: 'Real-time weather for any city with animations, React & Google API.',
    longDesc: 'A React-powered weather application that fetches live data for any city using the Google API. Features smooth weather-based animations, a database for saving searched cities, and a clean responsive UI.',
    tags: ['React', 'Google API', 'CSS'],
    github: 'https://github.com/rudranil723',
    live: null,
    image: image2,
    icon: faCloud,
    color: '#38bdf8',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Python Chatbot',
    shortDesc: 'An intelligent chatbot for handling basic conversations and queries.',
    longDesc: 'An early-stage Python chatbot project focused on understanding user queries and providing relevant responses. A stepping stone into the world of conversational AI and natural language understanding.',
    tags: ['Python', 'NLP'],
    github: 'https://github.com/rudranil723',
    live: null,
    image: image3,
    icon: faBrain,
    color: '#fb923c',
    status: 'Completed',
  },
  {
    id: 5,
    title: 'AI Music Player',
    shortDesc: 'Music player that curates songs based on your mood or command.',
    longDesc: 'An AI-powered music player that listens to your mood or a simple text command and builds a personalized playlist. Combines speech/text understanding with music metadata to deliver the perfect vibe — whether you\'re grinding, chilling, or feeling nostalgic.',
    tags: ['React', 'AI', 'Python', 'NLP'],
    github: null,
    live: null,
    icon: faMusic,
    color: '#f472b6',
    status: 'Coming Soon',
  },
  {
    id: 6,
    title: 'DevMind — AI Code Reviewer',
    shortDesc: 'Paste your code, get instant AI-powered reviews and suggestions.',
    longDesc: 'An intelligent code review tool where developers paste their code and receive structured feedback — bugs, performance issues, security vulnerabilities, and style suggestions. Powered by a fine-tuned LLM with support for multiple languages including Python, JavaScript, and Java.',
    tags: ['React', 'AI', 'LLM', 'Python'],
    github: null,
    live: null,
    icon: faCode,
    color: '#ffd700',
    status: 'Coming Soon',
  },
];

const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))];

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLetterClass('text-animate-hover'), 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setSelectedProject(null);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="container portfolio-page">

      {/* Header */}
      <div className="portfolio-header">
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['P', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o']}
            idx={15}
          />
        </h1>
        <p className="subtitle">Things I've built, researched, and dreamed up.</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-bar">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="projects-grid">
        {filtered.map((project) => (
          <div
            className="project-card"
            key={project.id}
            onClick={() => setSelectedProject(project)}
            style={{ '--accent': project.color }}
          >
            {/* Card visual area */}
            <div className="card-visual">
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                <div className="card-icon-bg">
                  <FontAwesomeIcon icon={project.icon} style={{ color: project.color }} />
                </div>
              )}
              {project.status === 'Coming Soon' && (
                <span className="badge-soon">Coming Soon</span>
              )}
            </div>

            {/* Card body */}
            <div className="card-body">
              <div className="card-title-row">
                <h3>{project.title}</h3>
                <div className="card-links" onClick={e => e.stopPropagation()}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  )}
                </div>
              </div>
              <p>{project.shortDesc}</p>
              <div className="tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag" style={{ borderColor: project.color, color: project.color }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ '--accent': selectedProject.color }}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="modal-icon">
              <FontAwesomeIcon icon={selectedProject.icon} style={{ color: selectedProject.color }} />
            </div>

            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <span className={`modal-status ${selectedProject.status === 'Coming Soon' ? 'soon' : 'done'}`}>
                {selectedProject.status}
              </span>
            </div>

            <p className="modal-desc">{selectedProject.longDesc}</p>

            <div className="modal-tags">
              {selectedProject.tags.map(tag => (
                <span key={tag} className="tag" style={{ borderColor: selectedProject.color, color: selectedProject.color }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="modal-actions">
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="modal-btn">
                  <FontAwesomeIcon icon={faGithub} /> View on GitHub
                </a>
              )}
              {selectedProject.live && (
                <a href={selectedProject.live} target="_blank" rel="noreferrer" className="modal-btn outline">
                  <FontAwesomeIcon icon={faExternalLinkAlt} /> Open Live
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;