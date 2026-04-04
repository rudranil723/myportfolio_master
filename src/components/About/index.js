import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faHtml5, faCss3, faReact, faJsSquare, faGitAlt,
//   faPython, faNodeJs
// } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const stats = [
  { value: '1+',   label: 'Years Coding' },
  { value: '6+',   label: 'Projects Built' },
  { value: '∞',    label: 'Cups of Tea' },
  { value: '100%', label: 'Passion' },
];

const timeline = [
  { year: '2022', title: 'Started the Journey',       desc: 'Wrote my first line of code. HTML felt like magic.' },
  { year: '2023', title: 'Dived into React & Python', desc: 'Built my first website and discovered the world of machine learning.' },
  { year: '2024', title: 'Internships and Freelancing',    desc: 'Did a bunch of internships and gained real-world experience, and started building this portfolio.' },
  { year: '2025', title: 'Full Stack & Beyond',       desc: 'Exploring full stack development, AI integrations ' },
  { year: '2026', title: 'Research & AI Projects',       desc: 'Published hybrid stock market research combining NLP, LSTM & sentiment analysis.' },
];

const S = 400;
const CX = S / 2;
const CY = S / 2;

const orbitConfig = [
  {
    r: 75,  ry: 28, tilt: 20,  duration: 8,
    icons: [
      { color: '#5ED4F4', label: 'Re', offset: 0   },
      { color: '#FFD43B', label: 'Py', offset: 180 },
    ],
  },
  {
    r: 125, ry: 46, tilt: -15, duration: 14,
    icons: [
      { color: '#F06529', label: 'HT', offset: 0   },
      { color: '#28A4D9', label: 'CS', offset: 120 },
      { color: '#EFD81D', label: 'JS', offset: 240 },
    ],
  },
  {
    r: 170, ry: 63, tilt: 35,  duration: 22,
    icons: [
      { color: '#EC4D28', label: 'Gi', offset: 0   },
      { color: '#3C873A', label: 'No', offset: 180 },
    ],
  },
];

// Full icon names for tooltip
// const labelMap = {
//   Re: 'React', Py: 'Python', HT: 'HTML5',
//   CS: 'CSS3',  JS: 'JS',    Gi: 'Git',  No: 'Node',
// };

const Atom = () => {
  const [, forceUpdate] = useState(0);
  const rafRef  = useRef();
  const lastRef = useRef();
  const accRef  = useRef(0);

  useEffect(() => {
    const tick = (ts) => {
      if (lastRef.current != null) {
        accRef.current += (ts - lastRef.current) * 0.04;
        forceUpdate(n => n + 1);
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const t = accRef.current;

  const getPos = (r, ry, tiltDeg, speed, offsetDeg) => {
    const tiltRad = (tiltDeg * Math.PI) / 180;
    const angle   = ((t / speed + offsetDeg / 360) ) % (2 * Math.PI);
    const lx = r  * Math.cos(angle);
    const ly = ry * Math.sin(angle);
    const x  = CX + lx * Math.cos(tiltRad) - ly * Math.sin(tiltRad);
    const y  = CY + lx * Math.sin(tiltRad) + ly * Math.cos(tiltRad);
    // depth for z-order & opacity
    const depth = Math.sin(angle) * Math.cos(tiltRad) + Math.cos(angle) * Math.sin(tiltRad);
    return { x, y, depth };
  };

  // Collect all icons with their positions so we can z-sort them
  const allIcons = [];
  orbitConfig.forEach((orb) => {
    orb.icons.forEach((icon) => {
      const pos = getPos(orb.r, orb.ry, orb.tilt, orb.duration, icon.offset);
      allIcons.push({ ...icon, ...pos, r: orb.r });
    });
  });
  allIcons.sort((a, b) => a.depth - b.depth);

  return (
    <div className="atom-wrapper">
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>

        {/* Orbit rings */}
        {orbitConfig.map((o, i) => (
          <ellipse
            key={i}
            cx={CX} cy={CY}
            rx={o.r} ry={o.ry}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            transform={`rotate(${o.tilt} ${CX} ${CY})`}
          />
        ))}

        {/* Nucleus */}
        <circle cx={CX} cy={CY} r={38} fill="rgba(255,215,0,0.05)" />
        <circle cx={CX} cy={CY} r={26} fill="rgba(255,215,0,0.12)" />
        <circle cx={CX} cy={CY} r={16} fill="rgba(255,215,0,0.25)" />
        <circle cx={CX} cy={CY} r={8}  fill="#ffd700" />

        {/* Icons — z-sorted so far ones render behind near ones */}
        {allIcons.map((ic, i) => {
          const opacity = 0.45 + (ic.depth + 1) * 0.27;
          const scale   = 0.7  + (ic.depth + 1) * 0.18;
          const bgR = 14 * scale;

          return (
            <g key={i} transform={`translate(${ic.x}, ${ic.y})`} opacity={Math.min(opacity, 1)}>
              {/* Circular badge background */}
              <circle r={bgR} fill="rgba(0,0,0,0.55)" stroke={ic.color} strokeWidth="1.2" />
              {/* Tech label text */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={7 * scale}
                fontWeight="700"
                fontFamily="sans-serif"
                fill={ic.color}
                letterSpacing="0.5"
              >
                {ic.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const id = setTimeout(() => setLetterClass('text-animate-hover'), 4000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="container about-page">

      <div className="about-top">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A','b','o','u','t',' ','m','e']}
              idx={15}
            />
          </h1>
          <p>
            Hey! I'm <span className="highlight">Rudranil</span> — an engineering
            student who loves to explore technology, build things, and code to the
            rhythm of good music.
          </p>
          <p>
            It's been over a year on this journey and I'm loving every challenge.
            From building React apps to diving deep into AI and NLP research — I'm
            always pushing to become a more dependable and knowledgeable developer.
          </p>
          <p>Thank you for taking the time to visit. ✨</p>
          <a className="resume-btn" href="/resume.pdf" download>
            <FontAwesomeIcon icon={faDownload} /> Download Resume
          </a>
        </div>

        <div className="atom-section">
          <Atom />
        </div>
      </div>

      <div className="stats-bar">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="timeline-section">
        <h2 className="section-title">My Journey</h2>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="made-with">made with &nbsp;🍵&nbsp; and &nbsp;❤️</div>

    </div>
  );
};

export default About;