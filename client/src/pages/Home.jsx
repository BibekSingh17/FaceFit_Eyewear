import React from 'react';
import '../styles/home.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const IconFeature1 = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="#6366f1" strokeWidth="1.5" />
    <circle cx="10" cy="10" r="3.5" fill="#e0e7ff" />
    <circle cx="10" cy="8.5" r="1.2" fill="#6366f1" />
  </svg>
);

const IconFeature2 = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 17l4-5 3 3.5 4-6 3 7.5" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17" cy="3" r="2" fill="#ddd6fe" stroke="#6366f1" strokeWidth="1.2" />
  </svg>
);

const IconFeature3 = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="5" width="16" height="11" rx="2.5" stroke="#6366f1" strokeWidth="1.5" />
    <path d="M7 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#6366f1" strokeWidth="1.3" />
    <line x1="10" y1="9" x2="10" y2="12" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="8.5" y1="10.5" x2="11.5" y2="10.5" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const TagIconFeatures = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect width="14" height="14" rx="4" fill="#6366f1" />
    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TagIconFaq = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect width="14" height="14" rx="4" fill="#8b5cf6" />
    <text x="7" y="10.5" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="sans-serif" fontWeight="700">?</text>
  </svg>
);

const TagIconReviews = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect width="14" height="14" rx="4" fill="#f59e0b" />
    <path d="M7 3l1 3h3l-2.5 1.8 1 3L7 9l-2.5 1.8 1-3L3 6h3z" fill="#fff" />
  </svg>
);

// ── Sub-components ──────────────────────────────────────────────────────────

const SpinBorder = ({ children, dark = false }) => (
  <div className={`spin-border${dark ? ' spin-border--dark' : ''}`}>
    <span className={`spin-inner${dark ? ' spin-inner--dark' : ''}`}>
      {children}
    </span>
  </div>
);

const HeroCard = () => (
  <div className="hero-card-wrap">
    <div className="hero-card">
      {/* Top bar */}
      <div className="card-top-bar">
        <span className="dot dot--red" />
        <span className="dot dot--yellow" />
        <span className="dot dot--green" />
        <span className="card-top-bar__label">FaceFit — Analysis Mode</span>
        <span className="ai-chip">
          <span className="chip-pulse" />
          Scanning…
        </span>
      </div>

      {/* Card body */}
      <div className="card-body">
        <div className="card-body__inner">
          {/* Face visualiser */}
          <div className="face-viz-col">
            <div className="face-viz">
              <div className="face-oval">
                <div className="scan-line" />
                <svg width="100%" height="100%" viewBox="0 0 160 200" style={{ position: 'absolute', inset: 0 }}>
                  <circle cx="52" cy="80" r="3" fill="#818cf8" opacity="0.7" />
                  <circle cx="108" cy="80" r="3" fill="#818cf8" opacity="0.7" />
                  <circle cx="80" cy="110" r="2.5" fill="#818cf8" opacity="0.6" />
                  <circle cx="80" cy="135" r="2.5" fill="#818cf8" opacity="0.6" />
                  <circle cx="60" cy="155" r="2" fill="#818cf8" opacity="0.5" />
                  <circle cx="100" cy="155" r="2" fill="#818cf8" opacity="0.5" />
                  <circle cx="40" cy="100" r="2" fill="#a78bfa" opacity="0.4" />
                  <circle cx="120" cy="100" r="2" fill="#a78bfa" opacity="0.4" />
                  <line x1="52" y1="80" x2="108" y2="80" stroke="#c7d2fe" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.5" />
                  <line x1="80" y1="80" x2="80" y2="160" stroke="#c7d2fe" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4" />
                  <g transform="translate(80,80)">
                    <rect x="-35" y="-2" width="29" height="19" rx="5" fill="rgba(49,46,129,0.12)" stroke="#312e81" strokeWidth="1.5" />
                    <rect x="6" y="-2" width="29" height="19" rx="5" fill="rgba(49,46,129,0.12)" stroke="#312e81" strokeWidth="1.5" />
                    <line x1="-6" y1="8" x2="6" y2="8" stroke="#312e81" strokeWidth="1.5" />
                    <line x1="-64" y1="6" x2="-35" y2="6" stroke="#312e81" strokeWidth="1.5" />
                    <line x1="35" y1="6" x2="64" y2="6" stroke="#312e81" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Analysis results */}
          <div className="analysis-col">
            <div className="analysis-title">Analysis results</div>

            <div className="analysis-items">
              {/* Face shape */}
              <div className="analysis-item">
                <div className="analysis-item__header">
                  <span className="analysis-item__key">Face shape</span>
                  <span className="analysis-item__val">Oval</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '87%' }} />
                </div>
                <div className="analysis-item__note">87% match confidence</div>
              </div>

              {/* Recommended styles */}
              <div className="analysis-item">
                <div className="analysis-item__key" style={{ marginBottom: 8 }}>Recommended styles</div>
                <div className="style-tags">
                  <span className="style-tag style-tag--indigo">Rectangle</span>
                  <span className="style-tag style-tag--violet">Aviator</span>
                  <span className="style-tag style-tag--green">Round</span>
                </div>
              </div>

              {/* Top pick */}
              <div className="analysis-item analysis-item--gradient">
                <div className="analysis-item__pick-label">Top pick for you</div>
                <div className="analysis-item__pick-name">Thin-frame Rectangle</div>
                <div className="analysis-item__pick-note">Balances face width perfectly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="stat-row">
          <div className="stat-col">
            <div className="stat-n">98%</div>
            <div className="stat-l">Fit accuracy</div>
          </div>
          <div className="stat-col">
            <div className="stat-n">500+</div>
            <div className="stat-l">Frame styles</div>
          </div>
          <div className="stat-col">
            <div className="stat-n">1.8s</div>
            <div className="stat-l">Avg scan time</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const marqueeItems = [
  { label: 'Virtual Try-On', style: {} },
  { label: 'AI Face Analysis', style: { background: 'linear-gradient(135deg,#34d399,#06b6d4)' } },
  { label: '500+ Styles', style: { background: 'linear-gradient(135deg,#f472b6,#fb923c)' } },
  { label: 'Instant Results', style: { background: 'linear-gradient(135deg,#fbbf24,#f97316)' } },
  { label: 'Secure & Private', style: {} },
  { label: 'Free to Try', style: { background: 'linear-gradient(135deg,#60a5fa,#818cf8)' } },
  { label: 'Same-Day Delivery', style: { background: 'linear-gradient(135deg,#34d399,#06b6d4)' } },
];
const allMarqueeItems = [...marqueeItems, ...marqueeItems]; // duplicate for seamless loop

const features = [
  {
    num: '01',
    icon: <IconFeature1 />,
    title: 'Virtual Try-On',
    desc: 'See frames on your face in real time using your camera. Zero downloads, zero friction — just point and see.',
  },
  {
    num: '02',
    icon: <IconFeature2 />,
    title: 'AI Recommendations',
    desc: 'Our model maps 68 facial landmarks to surface frames that complement your geometry — not just your vibe.',
  },
  {
    num: '03',
    icon: <IconFeature3 />,
    title: 'Seamless Ordering',
    desc: 'Pick a frame, configure your lenses, and check out in under three minutes. We handle the rest.',
  },
];

const faqs = [
  {
    n: '01',
    q: 'How does the virtual try-on work?',
    a: 'Your device camera maps key points on your face. Frames are rendered and positioned in real time — no app download needed.',
  },
  {
    n: '02',
    q: 'How does AI recommend frames?',
    a: 'We analyze your face shape, proportions, and stated preferences to surface styles that genuinely complement your features.',
  },
  {
    n: '03',
    q: 'Can I order directly through the platform?',
    a: 'Yes. Select your frame, choose lens type and coatings, and complete your order — all in one flow.',
  },
  {
    n: '04',
    q: 'Is my biometric data stored?',
    a: 'Never. All face analysis runs locally on your device. Nothing leaves your browser, nothing is stored on our servers.',
  },
];

const reviews = [
  {
    text: '"I"ve wasted money on glasses that didn\'t suit me for years. FaceFit nailed it on the first recommendation."',
    initials: 'SR',
    name: 'Sophia R.',
    aviStyle: { background: '#eef2ff', color: '#4338ca' },
  },
  {
    text: '"The virtual try-on is shockingly accurate. Ordered two pairs without visiting a single store."',
    initials: 'MK',
    name: 'Marcus K.',
    aviStyle: { background: '#faf5ff', color: '#6d28d9' },
  },
  {
    text: '"Finally, glasses that feel like they were made for my face. The AI suggestion was better than my optician\'s."',
    initials: 'AL',
    name: 'Aisha L.',
    aviStyle: { background: '#f0fdf4', color: '#15803d' },
  },
];

// ── Page ────────────────────────────────────────────────────────────────────

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-grid" />

        <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <SpinBorder>
            <span className="live-dot" />
            AI-Powered Face Analysis — Live
          </SpinBorder>
        </div>

        <h1 className="hero__heading fade-in d1">
          Find frames that <em>actually</em><br />fit your face
        </h1>

        <p className="hero-sub fade-in d2">
          FaceFit Eyewear uses real-time face-analysis to recommend glasses perfectly matched to your shape, style, and proportions.
        </p>

        <div className="btns fade-in d3">
          <button onClick={() => navigate("/signup")} className="btn-p">Try it free <span className="btn-p__arrow">→</span></button>
          <button onClick={() => navigate("/tryon")} className="btn-s">See how it works</button>
        </div>

        <HeroCard />
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {allMarqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-icon" style={item.style} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="section section--white">
        <div className="s-head">
          <div className="s-tag">
            <TagIconFeatures />
            Features
          </div>
          <div className="s-title">Everything you need,<br />nothing you don't</div>
          <p className="s-sub">Precision tools built for the modern eyewear shopper. Fast, accurate, beautiful.</p>
        </div>

        <div className="feat-grid">
          {features.map((f) => (
            <div key={f.num} className="feat-cell">
              <div className="feat-num">{f.num}</div>
              <div className="feat-ico">{f.icon}</div>
              <div className="feat-ttl">{f.title}</div>
              <div className="feat-dsc">{f.desc}</div>
              <a className="feat-link" href="#">Learn more →</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-alt">
        <div className="s-head">
          <div className="s-tag">
            <TagIconFaq />
            FAQ
          </div>
          <div className="s-title">Common questions</div>
          <p className="s-sub">Everything you need to know about FaceFit before you dive in.</p>
        </div>

        <div className="how-row">
          {faqs.map((faq) => (
            <div key={faq.n} className="how-card">
              <span className="how-n">{faq.n}</span>
              <div className="how-q">{faq.q}</div>
              <div className="how-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="section section--white">
        <div className="s-head">
          <div className="s-tag">
            <TagIconReviews />
            Reviews
          </div>
          <div className="s-title">Loved by eyewear shoppers</div>
          <p className="s-sub">Real people. Real frames. Real fits.</p>
        </div>

        <div className="review-grid">
          {reviews.map((r) => (
            <div key={r.name} className="review-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <span key={i} className="star" />)}
              </div>
              <div className="review-text">{r.text}</div>
              <div className="reviewer">
                <div className="avi" style={r.aviStyle}>{r.initials}</div>
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-role">Verified buyer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-wrap">
        <div className="cta-glow" />
        <div className="cta-inner">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <SpinBorder>No credit card required</SpinBorder>
          </div>
          <h2>Your perfect frames<br />are one scan away</h2>
          <p>Join 40,000+ people who found glasses they actually love with FaceFit.</p>
          <div className="cta-btns">
            <button className="btn-p">Start free scan <span className="btn-p__arrow">→</span></button>
            <button className="btn-s">View all frames</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );

};

export default Home;