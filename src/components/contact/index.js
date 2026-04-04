import { useEffect, useRef, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import './index.scss';

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const form = useRef();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Replace these with your actual EmailJS credentials
    emailjs.sendForm(
      'service_2hm65qm',
      'template_7nt6mfu',
      form.current,
      'fh-D1xEL7MP6pDIK3'
    )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 4000);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => setStatus(''), 4000);
      });
  };

  return (
    <div className="container contact-page">
      <div className="text-zone">
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e']}
            idx={15}
          />
        </h1>
        <p>
          I'm currently open to new opportunities. Whether you have a question,
          a project in mind, or just want to say hi — my inbox is always open!
        </p>

        <div className="contact-info">
          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            <a href="mailto:rudranilshil07@example.com">rudranilshil07@example.com</a>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
            <span>West Bengal, India</span>
          </div>
        </div>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/rudranil-shil-49a2131b9/" target="_blank" rel="noreferrer" className="social-btn linkedin">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a href="https://github.com/rudranil723" target="_blank" rel="noreferrer" className="social-btn github">
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
          <a href="https://www.youtube.com/@rudranilshil7" target="_blank" rel="noreferrer" className="social-btn youtube">
            <FontAwesomeIcon icon={faYoutube} /> YouTube
          </a>
        </div>
      </div>

      <div className="right-zone">
        <form ref={form} onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'sending' ? (
              'Sending...'
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} /> Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="status-msg success">✅ Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="status-msg error">❌ Something went wrong. Please try again.</p>
          )}
        </form>

        <div className="map-container">
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230492.0457736093!2d88.20720!3d22.56263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sWest%20Bengal%2C%20India!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;