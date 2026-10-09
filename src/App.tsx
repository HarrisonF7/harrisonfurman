import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { content } from './content';
const BasketballScene = lazy(() => import('./components/BasketballScene'));
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(media.matches); media.addEventListener('change', update); return () => media.removeEventListener('change', update); }, []);
  return reduced;
}
function BallFallback() { return <div className="ball-fallback" role="img" aria-label="Orange basketball"><img src={`${import.meta.env.BASE_URL}ball.svg`} alt="" /></div>; }
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <BallFallback /> : this.props.children; }
}
function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  return <header className="site-header"><a className="wordmark" href="#home" aria-label="Home"><img src={`${import.meta.env.BASE_URL}ball.svg`} alt="" /><span>{content.name}<small>A PERSONAL CORNER OF THE INTERNET</small></span></a><button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Close ×' : 'Menu +'}</button><nav id="main-nav" className={open ? 'open' : ''} aria-label="Main navigation" onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); button.current?.focus(); } }}><a href="#about" onClick={() => setOpen(false)}>About me</a><a href="#interests" onClick={() => setOpen(false)}>My interests</a><a className="nav-knicks" href="#knicks" onClick={() => setOpen(false)}>Let’s talk Knicks <span>↗</span></a></nav></header>;
}
function Hero() {
  const reduced = useReducedMotion();
  const [rotating, setRotating] = useState(true);
  const [available, setAvailable] = useState(true);
  useEffect(() => { try { const canvas = document.createElement('canvas'); setAvailable(Boolean(canvas.getContext('webgl2'))); } catch { setAvailable(false); } }, []);
  return <section className="hero" id="home"><div className="hero-court" aria-hidden="true"/><div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> A LITTLE ABOUT ME. A LOT ABOUT THE GAME.</p><h1>Life beyond<br/>the <span>baseline.</span></h1><p className="hero-description">{content.introduction}</p><a className="primary-button" href="#about">Explore my world <span>↘</span></a><div className="hero-footnote"><span className="mini-line"/> PERSONAL STORIES. SHARED PASSIONS.</div></div><div className="basketball-stage"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="ball-label">THE GAME NEVER STOPS.</span><SceneBoundary><Suspense fallback={<BallFallback />}>{available ? <BasketballScene rotating={rotating && !reduced} /> : <BallFallback />}</Suspense></SceneBoundary><div className="ball-controls"><span>↔ Drag to spin · Scroll to explore</span>{available && <button aria-pressed={rotating && !reduced} disabled={reduced} onClick={() => setRotating(!rotating)}>{reduced ? 'Motion reduced' : rotating ? 'Ⅱ Pause rotation' : '▷ Resume rotation'}</button>}</div><span className="stage-number" aria-hidden="true">01 / 04</span></div><div className="hero-bottom"><span>ROOTED IN PASSION</span><a href="#about">SCROLL TO DISCOVER ↓</a><span>BLUE & ORANGE, ALWAYS.</span></div></section>;
}
function AboutSection() {
  return <section id="about" className="section about-section reveal"><div className="section-intro"><p className="eyebrow">01 / THE PERSON BEHIND THE PASSION</p><h2>More than<br/>a <em>fan.</em></h2></div><div className="about-content"><p className="lead">Hey, I’m {content.name}.<br/>Glad you’re here.</p><p className="muted">{content.bio}</p>{content.portrait && <img className="portrait" src={content.portrait} alt={`Portrait of ${content.name}`} />}<dl className="details">{content.details.map(detail => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl></div></section>;
}
function HobbyIcon({ type }: { type: string }) { return type === 'ball' ? <img className="hobby-ball" src={`${import.meta.env.BASE_URL}ball.svg`} alt="" /> : <span className="hobby-symbol" aria-hidden="true">{type === 'spark' ? '✳' : '↗'}</span>; }
function InterestsSection() {
  return <section id="interests" className="interests-section section reveal"><div className="section-heading"><div><p className="eyebrow">02 / WHAT KEEPS ME MOVING</p><h2>Different interests.<br/>Same <em>energy.</em></h2></div><p className="muted">The things I make time for.<br/>The things that make me, me.</p></div><div className="interest-grid">{content.hobbies.map(hobby => <article className="interest-card" key={hobby.category}><div className="card-top"><span>{hobby.category}</span><span aria-hidden="true">↗</span></div><div className="icon-wrap"><HobbyIcon type={hobby.icon}/></div><h3>{hobby.title}</h3><p>{hobby.description}</p></article>)}</div></section>;
}
function KnicksSection() {
  return <section id="knicks" className="knicks-section reveal"><div className="knicks-court" aria-hidden="true"/><div className="knicks-top"><p className="eyebrow">03 / MY TEAM. MY COLORS.</p><span className="fan-badge">NEW YORK BASKETBALL</span></div><div className="knicks-headline"><h2>New York.<br/>New York.<br/><span>Always Knicks.</span></h2><div className="ny-mark" aria-hidden="true">NY<span>BLUE. ORANGE. FOREVER.</span></div></div><div className="knicks-stories"><article><span>01 / HOW IT STARTED</span><h3>A fan for a reason.</h3><p>{content.knicks.connection}</p></article><article><span>02 / THE MOMENTS THAT STAY</span><h3>Beyond the final buzzer.</h3><p>{content.knicks.memory}</p></article><article><span>03 / WHY IT MATTERS</span><h3>More than basketball.</h3><p>{content.knicks.love}</p></article></div><div className="knicks-bottom"><span>FROM THE GARDEN TO WHEREVER I AM.</span><span>LET’S GO KNICKS ↗</span></div></section>;
}
function SiteFooter() { return <footer className="site-footer"><a className="footer-brand" href="#home">See you <em>courtside.</em> <span>↗</span></a><div className="footer-bottom"><span>© {new Date().getFullYear()} {content.name}</span><div>{content.links.filter(link => /^https?:\/\//.test(link.href)).map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div><span>A personal fan site. Not affiliated with the NBA or New York Knicks.</span></div></footer>; }
export default function App() {
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); return () => observer.disconnect(); }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main"><Hero/><AboutSection/><InterestsSection/><KnicksSection/></main><SiteFooter/></>;
}
