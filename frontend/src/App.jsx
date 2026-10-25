import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { SiUpwork, SiFiverr, SiFreelancer, SiToptal, SiFigma } from 'react-icons/si';
import { FaYoutube, FaTiktok, FaFacebookF, FaSnapchat, FaInstagram, FaLinkedinIn, FaXTwitter, FaTelegram, FaWhatsapp, FaBehance, FaDribbble, FaGithub, FaTwitch, FaPatreon, FaPinterest, FaDiscord, FaPenNib } from 'react-icons/fa6';
import { API_URL, PROFILE_LINKS } from './config.js';

const getToken = () => localStorage.getItem('pathfinder_token');
const request = async (path, options = {}) => {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type':'application/json', ...(token ? {Authorization:`Bearer ${token}`} : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

const heroBrandTiles = [
  { name: 'Upwork', Icon: SiUpwork, color: '#6FDA44', size: 62, top: 12, left: 12, duration: '10s', delay: '0s' },
  { name: 'Fiverr', Icon: SiFiverr, color: '#1DBF73', size: 56, top: 24, left: 72, duration: '12s', delay: '0.7s' },
  { name: 'Freelancer', Icon: SiFreelancer, color: '#29B2FF', size: 58, top: 16, left: 54, duration: '11s', delay: '1.2s' },
  { name: 'YouTube', Icon: FaYoutube, color: '#FF3B30', size: 64, top: 32, left: 18, duration: '9s', delay: '0.5s' },
  { name: 'TikTok', Icon: FaTiktok, color: '#00F2EA', size: 52, top: 48, left: 72, duration: '13s', delay: '1.8s' },
  { name: 'Facebook', Icon: FaFacebookF, color: '#1877F2', size: 48, top: 52, left: 10, duration: '10s', delay: '0.9s' },
  { name: 'Snapchat', Icon: FaSnapchat, color: '#FFFC00', size: 50, top: 62, left: 82, duration: '14s', delay: '1.4s' },
  { name: 'Instagram', Icon: FaInstagram, color: '#E1306C', size: 58, top: 66, left: 30, duration: '12s', delay: '0.3s' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, color: '#0A66C2', size: 52, top: 76, left: 66, duration: '11s', delay: '1.6s' },
  { name: 'X', Icon: FaXTwitter, color: '#FFFFFF', size: 46, top: 77, left: 49, duration: '8s', delay: '2.2s' },
  { name: 'Telegram', Icon: FaTelegram, color: '#2AABEE', size: 54, top: 14, left: 80, duration: '9s', delay: '2s' },
  { name: 'WhatsApp', Icon: FaWhatsapp, color: '#25D366', size: 52, top: 32, left: 86, duration: '10s', delay: '0.2s' },
  { name: 'Behance', Icon: FaBehance, color: '#1769FF', size: 50, top: 64, left: 6, duration: '12s', delay: '1.1s' },
  { name: 'Dribbble', Icon: FaDribbble, color: '#EA4C89', size: 50, top: 82, left: 18, duration: '13s', delay: '1.7s' },
  { name: 'GitHub', Icon: FaGithub, color: '#F5F5F5', size: 50, top: 82, left: 78, duration: '11s', delay: '0.8s' },
  { name: 'Canva', Icon: FaPenNib, color: '#00C4CC', size: 54, top: 48, left: 44, duration: '10s', delay: '1.5s' }
];

const heroTextChips = [
  { label: 'Freelancing', top: 20, left: 60, duration: '9s', delay: '0.2s' },
  { label: 'Content creator', top: 28, left: 40, duration: '12s', delay: '1.4s' },
  { label: 'Video editing', top: 56, left: 58, duration: '11s', delay: '2.1s' },
  { label: 'Design', top: 68, left: 40, duration: '10s', delay: '0.8s' },
  { label: 'Writing', top: 76, left: 58, duration: '13s', delay: '1.9s' },
  { label: 'Remote work', top: 34, left: 22, duration: '11s', delay: '2.8s' },
  { label: 'Side income', top: 72, left: 24, duration: '12s', delay: '0.6s' },
  { label: 'New skills', top: 12, left: 40, duration: '9s', delay: '1.1s' }
];

const marqueeRowOne = [
  { label: 'Upwork', Icon: SiUpwork, color: '#6FDA44' },
  { label: 'Fiverr', Icon: SiFiverr, color: '#1DBF73' },
  { label: 'Freelancer', Icon: SiFreelancer, color: '#29B2FF' },
  { label: 'Toptal', Icon: SiToptal, color: '#3863FF' },
  { label: 'LinkedIn', Icon: FaLinkedinIn, color: '#0A66C2' },
  { label: 'Behance', Icon: FaBehance, color: '#1769FF' },
  { label: 'Dribbble', Icon: FaDribbble, color: '#EA4C89' },
  { label: 'GitHub', Icon: FaGithub, color: '#F5F5F5' },
  { label: 'Canva', Icon: FaPenNib, color: '#00C4CC' },
  { label: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { label: 'Photoshop', mark: 'Ps', color: '#31A8FF' },
  { label: 'After Effects', mark: 'Ae', color: '#9B6BFF' },
  { label: 'Premiere Pro', mark: 'Pr', color: '#EA77FF' }
];

const marqueeRowTwo = [
  { label: 'YouTube', Icon: FaYoutube, color: '#FF3B30' },
  { label: 'TikTok', Icon: FaTiktok, color: '#00F2EA' },
  { label: 'Instagram', Icon: FaInstagram, color: '#E1306C' },
  { label: 'Facebook', Icon: FaFacebookF, color: '#1877F2' },
  { label: 'Snapchat', Icon: FaSnapchat, color: '#FFFC00' },
  { label: 'X', Icon: FaXTwitter, color: '#FFFFFF' },
  { label: 'Telegram', Icon: FaTelegram, color: '#2AABEE' },
  { label: 'WhatsApp', Icon: FaWhatsapp, color: '#25D366' },
  { label: 'Twitch', Icon: FaTwitch, color: '#9146FF' },
  { label: 'Patreon', Icon: FaPatreon, color: '#FF424D' },
  { label: 'Pinterest', Icon: FaPinterest, color: '#E60023' },
  { label: 'Discord', Icon: FaDiscord, color: '#5865F2' },
  { label: 'DaVinci', mark: 'Dv', color: '#1F78FF' },
  //{ label: 'CapCut', mark: '', color: '#FF6B6B' }
];

const initialContactForm = { name: '', email: '', phone: '', message: '', website: '' };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+()\-\s]{7,20}$/;

function validateContactForm(form) {
  const nextErrors = {};
  const name = (form.name || '').trim();
  const email = (form.email || '').trim();
  const phone = (form.phone || '').trim();
  const message = (form.message || '').trim();

  if (name.length < 2 || name.length > 80) nextErrors.name = 'Name must be 2 to 80 characters.';
  if (email && !emailRegex.test(email)) nextErrors.email = 'Please enter a valid email address.';
  if (phone && !phoneRegex.test(phone)) nextErrors.phone = 'Please enter a valid phone number.';
  if (!email && !phone) nextErrors.contact = 'Please add either an email or phone number.';
  if (message.length < 10 || message.length > 2000) nextErrors.message = 'Message must be 10 to 2000 characters.';

  return nextErrors;
}

export default function App() {
  const [user,setUser] = useState(null);
  const [screen,setScreen] = useState('welcome');
  const [pathway,setPathway] = useState(null);
  const [assessment,setAssessment] = useState(null);
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState({});
  const [index,setIndex] = useState(0);
  const [result,setResult] = useState(null);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('pathfinder_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (err) {
      // ignore storage access issues and fall back to system preference
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [contactErrors, setContactErrors] = useState({});
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });
  const [contactSubmitting, setContactSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('pathfinder_theme', theme);
    } catch (err) {}
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#10121b' : '#f4efe9');
    }
  }, [theme]);

  useEffect(() => {
    if (!getToken()) return;
    request('/api/me').then(d => {setUser(d.user); setScreen('intro');}).catch(() => localStorage.removeItem('pathfinder_token'));
  }, []);

  const current = questions[index];
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;
  const contactMessageLength = contactForm.message.length;
  const showContactSection = screen === 'welcome' || screen === 'intro' || screen === 'result';
  const showContactLink = screen !== 'choose' && screen !== 'quiz';

  async function onGoogleSuccess(response) {
    setBusy(true); setError('');
    try {
      const data = await request('/api/auth/google', {method:'POST', body:JSON.stringify({credential:response.credential})});
      localStorage.setItem('pathfinder_token',data.token);
      setUser(data.user); setScreen('intro');
    } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  function signOut() {
    googleLogout(); localStorage.removeItem('pathfinder_token');
    setUser(null); setAssessment(null); setQuestions([]); setAnswers({}); setResult(null); setScreen('welcome');
  }

  async function begin(which) {
    setBusy(true); setError('');
    try {
      const {assessment:a} = await request('/api/assessments',{method:'POST',body:JSON.stringify({pathway:which})});
      const data = await request(`/api/assessments/${a.id}`);
      setPathway(which); setAssessment(a); setQuestions(data.questions); setAnswers(data.assessment.answers || {}); setIndex(0); setResult(null); setScreen('quiz');
    } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function choose(optionId) {
    if (!current || !assessment) return;
    setError('');
    const nextAnswers = {...answers,[current.id]:optionId};
    setAnswers(nextAnswers);
    try {
      await request(`/api/assessments/${assessment.id}/answer`, {
        method:'PUT', body:JSON.stringify({questionId:current.id,answerId:optionId,currentQuestion:index})
      });
    } catch(e) { setError(`Your answer may not have saved. ${e.message}`); }
  }

  async function next() {
    if (!current || !answers[current.id]) return;
    if (index < questions.length - 1) { setIndex(index + 1); return; }
    setBusy(true); setError('');
    try {
      const data = await request(`/api/assessments/${assessment.id}/finish`,{method:'POST',body:'{}'});
      setResult(data.result); setScreen('result');
    } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function restart() {
    if (!assessment) {setScreen('intro'); return;}
    setBusy(true);
    try { await begin(pathway); } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  function handleContactFieldChange(event) {
    const { name, value } = event.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    setContactStatus({ type: '', message: '' });
    setContactErrors(prev => ({ ...prev, [name]: undefined, contact: undefined }));
  }

  async function handleContactSubmit(event) {
    event.preventDefault();

    const formErrors = validateContactForm(contactForm);
    setContactErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setContactStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
      return;
    }

    if (contactForm.website && contactForm.website.trim()) {
      setContactStatus({ type: 'success', message: 'Thanks, your message was sent.' });
      setContactForm(initialContactForm);
      setContactErrors({});
      return;
    }

    setContactSubmitting(true);
    setContactStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
          website: contactForm.website
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Unable to send your message right now.');
      }

      setContactForm(initialContactForm);
      setContactErrors({});
      setContactStatus({ type: 'success', message: 'Thanks, your message was sent.' });
    } catch (err) {
      setContactStatus({ type: 'error', message: err.message || 'Unable to send your message right now.' });
    } finally {
      setContactSubmitting(false);
    }
  }

  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there';

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setScreen(user ? 'intro' : 'welcome')} aria-label="Pathfinder home">
        <span className="brand-mark">P</span><span>pathfinder<span className="brand-dot">.</span></span>
      </button>
      <div className="top-actions">
        <button
          type="button"
          className="theme-toggle"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 1.8v2.4M12 19.8v2.4M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M1.8 12h2.4M19.8 12h2.4M4.93 19.07l1.7-1.7M17.37 6.63l1.7-1.7" />
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 15.2A7.9 7.9 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        {user && <><span className="user-label">{user.name}</span><button className="text-button" onClick={signOut}>Sign out</button></>}
        <span className="status-dot"/><span className="small-muted">Your next chapter starts here</span>
      </div>
    </header>

    {error && <div className="error-banner" role="alert">{error}<button onClick={()=>setError('')} aria-label="Dismiss error">×</button></div>}

    <main>
      {screen === 'welcome' && <>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/> A clearer way forward</div>
            <h1>Too many paths.<br/><span className="gradient-text">One that fits you.</span></h1>
            <p className="hero-description">Your interests are a starting point. Your strengths are clues. Let’s turn the noise into a direction you can actually explore.</p>
            <div className="hero-points"><span>✦ Thoughtful questions</span><span>✦ Personal recommendations</span><span>✦ Practical next steps</span></div>
            <div className="auth-card">
              <div><strong>Start with the person you are.</strong><p>Sign in to save your progress and revisit your results.</p></div>
              <div className="google-wrap">
                {busy ? <span className="muted">Signing you in…</span> : <GoogleLogin onSuccess={onGoogleSuccess} onError={()=>setError('Google sign-in failed. Please try again.')} text="continue_with" shape="pill" theme={theme === 'dark' ? 'filled_black' : 'outline'} width="290"/>}
              </div>
              <p className="privacy-note">By continuing, you agree to use your results as guidance—not a guarantee.</p>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-glow"/>
            <div
              className="center-core"
              role="img"
              aria-label="You"
            >
              <svg className="hero-avatar" viewBox="0 0 150 150" aria-hidden="true">
                <defs>
                  <linearGradient id="hero-avatar-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--accent-mint)" />
                  </linearGradient>
                </defs>
                <circle cx="75" cy="75" r="59" fill="rgba(154, 133, 255, 0.12)" stroke="rgba(255,255,255,0.28)" />
                <circle cx="75" cy="75" r="48" fill="url(#hero-avatar-gradient)" opacity="0.95" />
                <circle cx="75" cy="58" r="21" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.32)" strokeWidth="2" />
                <path d="M48 116c7-15 19-23 27-23s20 8 27 23" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.32)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M62 68c3-8 9-13 13-13s10 5 13 13" fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="68" cy="58" r="2.3" fill="rgba(17,18,23,0.8)" />
                <circle cx="82" cy="58" r="2.3" fill="rgba(17,18,23,0.8)" />
                <path d="M69 69c4 6 7 6 12 0" fill="none" stroke="rgba(17,18,23,0.7)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            {heroBrandTiles.map(({ name, Icon, color, size, top, left, duration, delay }) => (
              <span
                key={name}
                className="hero-art-tile"
                style={{
                  '--tile-size': `${size}px`,
                  '--tile-top': `${top}%`,
                  '--tile-left': `${left}%`,
                  '--tile-color': color,
                  '--tile-duration': duration,
                  '--tile-delay': delay
                }}
                aria-hidden="true"
              >
                <Icon />
              </span>
            ))}
            {heroTextChips.map(({ label, top, left, duration, delay }) => (
              <span
                key={label}
                className="hero-art-chip"
                style={{
                  '--chip-top': `${top}%`,
                  '--chip-left': `${left}%`,
                  '--chip-duration': duration,
                  '--chip-delay': delay
                }}
                aria-hidden="true"
              >
                {label}
              </span>
            ))}
          </div>
        </section>

        <div className="platform-marquee" aria-hidden="true">
          <div className="marquee-caption">Where digital careers are built</div>
          <div className="marquee-stack">
            <div className="marquee-row marquee-row-one">
              {[...marqueeRowOne, ...marqueeRowOne].map(({ label, Icon, color, mark }, index) => (
                <div key={`${label}-${index}`} className="marquee-pill">
                  <span className="marquee-icon" style={{ color }}>{Icon ? <Icon /> : <span>{mark}</span>}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="marquee-row marquee-row-two">
              {[...marqueeRowTwo, ...marqueeRowTwo].map(({ label, Icon, color, mark }, index) => (
                <div key={`${label}-${index}`} className="marquee-pill">
                  <span className="marquee-icon" style={{ color }}>{Icon ? <Icon /> : <span>{mark}</span>}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section id="contact" className="contact-section">
          <div className="contact-intro">
            <div className="eyebrow"><span className="eyebrow-line" /> Say hello</div>
            <h2>Let’s talk about your next direction.</h2>
            <p>Share what you’re exploring, and I’ll get back to you with a thoughtful reply.</p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" type="text" value={contactForm.name} onChange={handleContactFieldChange} aria-invalid={Boolean(contactErrors.name)} aria-describedby={contactErrors.name ? 'contact-name-error' : undefined} autoComplete="name" />
                {contactErrors.name && <span id="contact-name-error" className="field-error">{contactErrors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" value={contactForm.email} onChange={handleContactFieldChange} aria-invalid={Boolean(contactErrors.email)} aria-describedby={contactErrors.email ? 'contact-email-error' : undefined} autoComplete="email" />
                {contactErrors.email && <span id="contact-email-error" className="field-error">{contactErrors.email}</span>}
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="contact-phone">Phone number</label>
                <input id="contact-phone" name="phone" type="tel" value={contactForm.phone} onChange={handleContactFieldChange} aria-invalid={Boolean(contactErrors.phone)} aria-describedby={contactErrors.phone ? 'contact-phone-error' : undefined} autoComplete="tel" />
                {contactErrors.phone && <span id="contact-phone-error" className="field-error">{contactErrors.phone}</span>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" value={contactForm.message} onChange={handleContactFieldChange} maxLength={2000} aria-invalid={Boolean(contactErrors.message)} aria-describedby={contactErrors.message ? 'contact-message-error' : undefined} />
              <div className="field-meta">
                <span>At least one of email or phone is required.</span>
                <span>{contactMessageLength}/2000</span>
              </div>
              {contactErrors.message && <span id="contact-message-error" className="field-error">{contactErrors.message}</span>}
            </div>
            <input type="text" name="website" className="hidden-honeypot" tabIndex={-1} autoComplete="off" value={contactForm.website} onChange={handleContactFieldChange} />
            {contactErrors.contact && <div className="field-error global-error">{contactErrors.contact}</div>}
            {contactStatus.message && (
              <div className={`contact-status ${contactStatus.type}`} role="status" aria-live="polite">
                {contactStatus.message}
              </div>
            )}
            <div className="contact-actions">
              <button type="submit" className="primary-button" disabled={contactSubmitting}>
                {contactSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </div>
            <p className="contact-note">Your details are only used to reply to you.</p>
          </form>
        </section>
      </>}

      {screen === 'intro' && <section className="welcome-screen">
        <div className="welcome-symbol">✦</div>
        <div className="eyebrow centered">A fresh start, made for you</div>
        <h1 className="welcome-title">Hello, <span className="gradient-text">{firstName}.</span></h1>
        <p className="welcome-subtitle">You don’t need to have it all figured out.<br/>You only need to find your next good question.</p>
        <div className="intro-card">
          <p>Digital work is full of possibilities—and that can feel overwhelming. Pathfinder helps you explore a direction based on your interests, current strengths, resources, and the kind of work you want to do.</p>
          <div className="three-mini"><div><span>01</span><b>Tell us about you</b><small>Simple, thoughtful questions</small></div><div><span>02</span><b>Explore your fit</b><small>Clear reasons, not guesses</small></div><div><span>03</span><b>Take a first step</b><small>A practical experiment</small></div></div>
        </div>
        <button className="primary-button" onClick={()=>setScreen('choose')}>Let’s begin <span>→</span></button>
        <p className="microcopy">About 5–8 minutes · You can go back and change answers</p>

        <section id="contact" className="contact-section">
          <div className="contact-intro">
            <div className="eyebrow"><span className="eyebrow-line" /> Say hello</div>
            <h2>Let’s talk about your next direction.</h2>
            <p>Share what you’re exploring, and I’ll get back to you with a thoughtful reply.</p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="intro-contact-name">Name</label>
                <input id="intro-contact-name" name="name" type="text" value={contactForm.name} onChange={handleContactFieldChange} autoComplete="name" aria-invalid={Boolean(contactErrors.name)} />
                {contactErrors.name && <span className="field-error">{contactErrors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="intro-contact-email">Email</label>
                <input id="intro-contact-email" name="email" type="email" value={contactForm.email} onChange={handleContactFieldChange} autoComplete="email" aria-invalid={Boolean(contactErrors.email)} />
                {contactErrors.email && <span className="field-error">{contactErrors.email}</span>}
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="intro-contact-phone">Phone number</label>
                <input id="intro-contact-phone" name="phone" type="tel" value={contactForm.phone} onChange={handleContactFieldChange} autoComplete="tel" aria-invalid={Boolean(contactErrors.phone)} />
                {contactErrors.phone && <span className="field-error">{contactErrors.phone}</span>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="intro-contact-message">Message</label>
              <textarea id="intro-contact-message" name="message" value={contactForm.message} onChange={handleContactFieldChange} maxLength={2000} aria-invalid={Boolean(contactErrors.message)} />
              <div className="field-meta">
                <span>At least one of email or phone is required.</span>
                <span>{contactMessageLength}/2000</span>
              </div>
              {contactErrors.message && <span className="field-error">{contactErrors.message}</span>}
            </div>
            <input type="text" name="website" className="hidden-honeypot" tabIndex={-1} autoComplete="off" value={contactForm.website} onChange={handleContactFieldChange} />
            {contactErrors.contact && <div className="field-error global-error">{contactErrors.contact}</div>}
            {contactStatus.message && <div className={`contact-status ${contactStatus.type}`} role="status" aria-live="polite">{contactStatus.message}</div>}
            <div className="contact-actions">
              <button type="submit" className="primary-button" disabled={contactSubmitting}>{contactSubmitting ? 'Sending…' : 'Send message'}</button>
            </div>
            <p className="contact-note">Your details are only used to reply to you.</p>
          </form>
        </section>
      </section>}

      {screen === 'choose' && <section className="choice-screen">
        <div className="eyebrow centered">Choose your starting point</div>
        <h1>Which path are you exploring?</h1>
        <p className="section-subtitle">There’s no wrong answer. Choose what best describes what you want to build right now.</p>
        <div className="choice-grid">
          <button className="choice-card" onClick={()=>begin('creator')} disabled={busy}>
            <span className="choice-icon purple">◉</span><span className="choice-number">PATH 01</span><h2>Content creator</h2><p>Find a niche where your curiosity, creative style, and audience needs can meet.</p><span className="choice-bottom">Explore content niches <b>↗</b></span>
          </button>
          <button className="choice-card" onClick={()=>begin('freelancer')} disabled={busy}>
            <span className="choice-icon green">⌘</span><span className="choice-number">PATH 02</span><h2>Freelancer</h2><p>Explore a digital service that fits your skills, work style, resources, and goals.</p><span className="choice-bottom">Explore freelance skills <b>↗</b></span>
          </button>
        </div>
        <button className="back-link" onClick={()=>setScreen('intro')}>← Back to welcome</button>
      </section>}

      {screen === 'quiz' && current && <section className="quiz-screen">
        <div className="quiz-topline"><button className="back-link" onClick={()=>setScreen('choose')}>← Exit assessment</button><span>{pathway === 'creator' ? 'CONTENT CREATOR PATH' : 'FREELANCER PATH'}</span></div>
        <div className="progress-meta"><span>Question {index+1} <i>of {questions.length}</i></span><span>{Math.round(((index+1)/questions.length)*100)}% explored</span></div>
        <div className="progress-track"><div style={{width:`${((index+1)/questions.length)*100}%`}}/></div>
        <div className="question-layout">
          <div className="question-aside"><div className="question-number"><span className="question-q">Q</span><span className="question-number-value">{String(index+1).padStart(2,'0')}</span></div><p>There’s no perfect answer. Choose what feels most true for you today.</p><div className="aside-rule"/></div>
          <div className="question-main">
            <h1>{current.text}</h1>{current.hint && <p className="question-hint">{current.hint}</p>}
            <div className="option-list">
              {current.options.map((o,i)=><button key={o.id} className={`option ${answers[current.id]===o.id?'selected':''}`} onClick={()=>choose(o.id)}>
                <span className="option-letter">{String.fromCharCode(65+i)}</span><span>{o.label}</span><span className="option-check">{answers[current.id]===o.id?'✓':'→'}</span>
              </button>)}
            </div>
            <div className="quiz-controls"><button className="secondary-button" onClick={()=>setIndex(Math.max(0,index-1))} disabled={index===0}>← Previous</button><button className="primary-button" onClick={next} disabled={!answers[current.id]||busy}>{busy?'Saving…':index===questions.length-1?'See my direction':'Continue'} <span>→</span></button></div>
            <p className="save-note">Your answers are saved to your account as you go.</p>
          </div>
        </div>
      </section>}

      {screen === 'result' && result && <>
        <section className="result-screen">
          <div className="result-spark">✦</div><div className="eyebrow centered">Your first direction</div>
          <h1>Thank you, {firstName}.</h1><p className="section-subtitle">You’ve taken a real step toward clarity. Here’s a direction worth testing—not a box you have to stay in.</p>
          <div className="result-card"><span className="result-label">YOUR TOP MATCH</span><h2>{result.recommendation.label}</h2><p>{result.recommendation.reasons?.length ? `Your answers pointed toward this area through ${result.recommendation.reasons.slice(0,3).join('; ').toLowerCase()}.` : 'Your current answers provide an initial signal. A few more questions or a small experiment can help clarify your direction.'}</p><div className="result-stats"><div><small>Answers considered</small><b>{result.completedAnswers}</b></div><div><small>Signal strength</small><b>{result.confidence==='directional'?'Directional':result.confidence==='exploratory'?'Exploratory':'Early signal'}</b></div></div></div>
          <div className="next-steps"><h3>Your next 7 days</h3>{result.nextSteps?.map((s,i)=><div className="step-row" key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{s}</p></div>)}</div>
          <div className="alternatives"><h3>Also worth exploring</h3>{result.alternatives?.map(a=><div className="alternative" key={a.id}><span>{a.label}</span><span>Explore ↗</span></div>)}</div>
          <p className="result-note">{result.note}</p>
          <div className="result-actions"><button className="secondary-button" onClick={()=>{setIndex(0);setScreen('quiz')}}>Review my answers</button><button className="primary-button" onClick={restart} disabled={busy}>Start again <span>↻</span></button></div>
          <p className="closing-note">Thanks for exploring with Pathfinder. We’ll keep working to make your next step clearer—with more useful tools and features in the future.</p>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-intro">
            <div className="eyebrow"><span className="eyebrow-line" /> Say hello</div>
            <h2>Let’s talk about your next direction.</h2>
            <p>Share what you’re exploring, and I’ll get back to you with a thoughtful reply.</p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="result-contact-name">Name</label>
                <input id="result-contact-name" name="name" type="text" value={contactForm.name} onChange={handleContactFieldChange} autoComplete="name" aria-invalid={Boolean(contactErrors.name)} />
                {contactErrors.name && <span className="field-error">{contactErrors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="result-contact-email">Email</label>
                <input id="result-contact-email" name="email" type="email" value={contactForm.email} onChange={handleContactFieldChange} autoComplete="email" aria-invalid={Boolean(contactErrors.email)} />
                {contactErrors.email && <span className="field-error">{contactErrors.email}</span>}
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="result-contact-phone">Phone number</label>
                <input id="result-contact-phone" name="phone" type="tel" value={contactForm.phone} onChange={handleContactFieldChange} autoComplete="tel" aria-invalid={Boolean(contactErrors.phone)} />
                {contactErrors.phone && <span className="field-error">{contactErrors.phone}</span>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="result-contact-message">Message</label>
              <textarea id="result-contact-message" name="message" value={contactForm.message} onChange={handleContactFieldChange} maxLength={2000} aria-invalid={Boolean(contactErrors.message)} />
              <div className="field-meta">
                <span>At least one of email or phone is required.</span>
                <span>{contactMessageLength}/2000</span>
              </div>
              {contactErrors.message && <span className="field-error">{contactErrors.message}</span>}
            </div>
            <input type="text" name="website" className="hidden-honeypot" tabIndex={-1} autoComplete="off" value={contactForm.website} onChange={handleContactFieldChange} />
            {contactErrors.contact && <div className="field-error global-error">{contactErrors.contact}</div>}
            {contactStatus.message && <div className={`contact-status ${contactStatus.type}`} role="status" aria-live="polite">{contactStatus.message}</div>}
            <div className="contact-actions">
              <button type="submit" className="primary-button" disabled={contactSubmitting}>{contactSubmitting ? 'Sending…' : 'Send message'}</button>
            </div>
            <p className="contact-note">Your details are only used to reply to you.</p>
          </form>
        </section>
      </>}
    </main>

    <footer className="footer">
      <div className="footer-branding">
        <span>© {new Date().getFullYear()} Pathfinder</span>
        <span className="footer-tagline">Built to make digital choices feel clearer.</span>
      </div>
      <div className="footer-links">
        {PROFILE_LINKS.linkedin && (
          <a className="footer-pill" href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
            <span>LinkedIn</span>
          </a>
        )}
        {PROFILE_LINKS.telegram && (
          <a className="footer-pill" href={PROFILE_LINKS.telegram} target="_blank" rel="noopener noreferrer">
            <FaTelegram />
            <span>{PROFILE_LINKS.telegramHandle || '@lidetalem'}</span>
          </a>
        )}
        {showContactLink && (
          <button type="button" className="footer-pill footer-contact" onClick={scrollToContact}>
            Contact
          </button>
        )}
      </div>
    </footer>
  </div>;
}
