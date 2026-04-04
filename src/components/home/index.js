import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logg.png';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';

const codeLines = [
  { text: 'const rudranil = {',           color: '#fff'     },
  { text: '  name: "Rudranil Shil",',     color: '#98c379'  },
  { text: '  role: "Software Developer',  color: '#98c379'  },
  { text: '         & AI Enthusiast",',   color: '#98c379'  },
  { text: '  skills: [',                  color: '#fff'     },
  { text: '    "React", "Python",',       color: '#e5c07b'  },
  { text: '    "Machine Learning",',      color: '#e5c07b'  },
  { text: '    "NLP", "Deep Learning"',   color: '#e5c07b'  },
  { text: '  ],',                         color: '#fff'     },
  { text: '  passion: "Building things',  color: '#98c379'  },
  { text: '            that matter",',    color: '#98c379'  },
  { text: '  status: "Open to work 🚀"',  color: '#56b6c2'  },
  { text: '};',                           color: '#fff'     },
  { text: '',                             color: '#fff'     },
  { text: 'rudranil.init();',             color: '#61afef'  },
];

const outputLines = [
  { text: '',                                        color: '#fff',    delay: 0   },
  { text: '> Initializing...',                       color: '#5c6370', delay: 300 },
  { text: '> Loading skills..........  ✅',          color: '#5c6370', delay: 500 },
  { text: '> Brewing tea...............  ☕',        color: '#5c6370', delay: 400 },
  { text: '> Compiling passion..........  ✅',       color: '#5c6370', delay: 500 },
  { text: '',                                        color: '#fff',    delay: 200 },
  { text: '┌─────────────────────────────────┐',    color: '#ffd700', delay: 300 },
  { text: '│                                 │',    color: '#ffd700', delay: 100 },
  { text: '│   Hey buddy, welcome to         │',    color: '#ffd700', delay: 100 },
  { text: '│         my page!! 👋            │',    color: '#ffd700', delay: 100 },
  { text: '│                                 │',    color: '#ffd700', delay: 100 },
  { text: '└─────────────────────────────────┘',    color: '#ffd700', delay: 100 },
  { text: '',                                        color: '#fff',    delay: 200 },
  { text: '// Feel free to look around :)',          color: '#5c6370', delay: 400 },
];

const PHASE_TYPING  = 'typing';
const PHASE_OUTPUT  = 'output';
const PHASE_DONE    = 'done';

const Terminal = () => {
  const [phase, setPhase]               = useState(PHASE_TYPING);
  const [typedLines, setTypedLines]     = useState([]);   // fully typed code lines
  const [outputShown, setOutputShown]   = useState([]);   // output lines revealed so far
  const [currentLine, setCurrentLine]   = useState(0);
  const [currentChar, setCurrentChar]   = useState(0);
  const [showCursor, setShowCursor]     = useState(true);
  const bottomRef = useRef(null);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  // ── Phase 1: typing code ──
  useEffect(() => {
    if (phase !== PHASE_TYPING) return;
    if (currentLine >= codeLines.length) {
      // All code typed — move to output phase
      setTimeout(() => {
        setPhase(PHASE_OUTPUT);
        setCurrentLine(0);
      }, 400);
      return;
    }

    const line = codeLines[currentLine];

    if (currentChar < line.text.length) {
      const id = setTimeout(() => {
        setTypedLines(prev => {
          const next = [...prev];
          next[currentLine] = {
            color: line.color,
            typed: line.text.slice(0, currentChar + 1),
          };
          return next;
        });
        setCurrentChar(c => c + 1);
      }, 26);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 80);
      return () => clearTimeout(id);
    }
  }, [phase, currentLine, currentChar]);

  // ── Phase 2: reveal output lines one by one ──
  useEffect(() => {
    if (phase !== PHASE_OUTPUT) return;
    if (currentLine >= outputLines.length) {
      setPhase(PHASE_DONE);
      return;
    }

    const line = outputLines[currentLine];
    const id = setTimeout(() => {
      setOutputShown(prev => [...prev, line]);
      setCurrentLine(l => l + 1);
    }, line.delay);
    return () => clearTimeout(id);
  }, [phase, currentLine]);

  // ── Phase 3: restart after a pause ──
  useEffect(() => {
    if (phase !== PHASE_DONE) return;
    const id = setTimeout(() => {
      setTypedLines([]);
      setOutputShown([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setPhase(PHASE_TYPING);
    }, 5000);
    return () => clearTimeout(id);
  }, [phase]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [typedLines, outputShown]);

  return (
    <div className="terminal-window">
      {/* Title bar */}
      <div className="terminal-bar">
        <span className="dot red"    />
        <span className="dot yellow" />
        <span className="dot green"  />
        <span className="terminal-title">rudranil@portfolio:~</span>
      </div>

      {/* Body */}
      <div className="terminal-body">
        {/* Command prompt */}
        <div className="terminal-prompt">
          <span className="prompt-user">rudranil</span>
          <span className="prompt-at">@</span>
          <span className="prompt-host">portfolio</span>
          <span className="prompt-colon">:</span>
          <span className="prompt-tilde">~</span>
          <span className="prompt-dollar">$</span>
          <span className="prompt-cmd"> node about-me.js</span>
        </div>

        {/* Typed code lines */}
        {typedLines.map((line, i) =>
          line === undefined ? null : (
            <div key={`code-${i}`} className="code-line">
              {line.text === '' ? (
                <br />
              ) : (
                <span style={{ color: line.color }}>{line.typed}</span>
              )}
              {/* cursor on active line while typing */}
              {phase === PHASE_TYPING && i === currentLine && (
                <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}>▋</span>
              )}
            </div>
          )
        )}

        {/* Blinking cursor on empty new line while waiting for next code line */}
        {phase === PHASE_TYPING && typedLines.length === currentLine && (
          <div className="code-line">
            <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}>▋</span>
          </div>
        )}

        {/* Output lines */}
        {outputShown.map((line, i) => (
          <div key={`out-${i}`} className="code-line">
            {line.text === '' ? <br /> : (
              <span style={{ color: line.color }}>{line.text}</span>
            )}
          </div>
        ))}

        {/* Final blinking prompt when done */}
        {phase === PHASE_DONE && (
          <div className="code-line blink-line">
            <span className="prompt-dollar">$</span>
            <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}>▋</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const nameArray  = ['u','d','r','a','n','i','l'];
  const jobArray   = ['S','o','f','t','w','a','r','e',' ','D','e','v','e','l','o','p','e','r'];
  const job2Array  = ['&',' ','A','I',' ','E','n','t','h','u','s','i','a','s','t'];

  useEffect(() => {
    const id = setTimeout(() => setLetterClass('text-animate-hover'), 4000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          <span className={letterClass}>H</span>
          <span className={`${letterClass} _12`}>i,</span>
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>'m</span>
          <img className="namelogo" src={LogoTitle} alt="Rudranil" />
          <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
          <br />
          <AnimatedLetters letterClass={`${letterClass} yellow-text`} strArray={jobArray}  idx={22} />
          <br />
          <AnimatedLetters letterClass={`${letterClass} yellow-text`} strArray={job2Array} idx={40} />
        </h1>
        <h2>Engineering Student · AI/ML · React · Python</h2>
        <Link to="/contact" className="flat-button">CONTACT ME</Link>
      </div>

      <div className="terminal-section">
        <Terminal />
      </div>
    </div>
  );
};

export default Home;
