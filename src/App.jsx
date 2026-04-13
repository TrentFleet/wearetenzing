import React, { useState, useEffect, useRef } from 'react';

/* ============================================================
   IMAGE CONSTANTS — sourced from wearetenzing.com
   ============================================================ */
const IMGS = {
  howtodad:   'https://wearetenzing.com/wp-content/uploads/2025/09/howtodad.png',
  torrell:    'https://wearetenzing.com/wp-content/uploads/2021/10/torrell-1-e1633915481477.jpeg',
  rubytui:    'https://wearetenzing.com/wp-content/uploads/2021/10/233664388_355059956106363_7655657044298845147_n.jpg',
  groupEvent: 'https://wearetenzing.com/wp-content/uploads/2025/01/ABC08431-scaled.jpg',
  groupHero:  'https://wearetenzing.com/wp-content/uploads/2023/11/ABC09871-scaled.jpg',
  talent1:    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
  talent2:    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
  talent3:    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
  jazz:       '/jazz.jpg',
  louis:      '/louis.png',
  teamphoto:  '/teamphoto.png',
};

/* Phone slider talent cards */
const TALENT_CARDS = [
  {
    image:        IMGS.howtodad,
    username:     '@howtodad',
    label:        'HowToDad',
    platformIcon: 'logos:tiktok-icon',
    followers:    '6M+',
    ctaText:      'Follow',
    ctaClass:     'bg-black text-white',
    ringClass:    'bg-black',
  },
  {
    image:        IMGS.torrell,
    username:     '@torrelltafa',
    label:        'Torrell Tafa',
    platformIcon: 'logos:instagram-icon',
    followers:    '2.3M+',
    ctaText:      'View',
    ctaClass:     'bg-orange-500 text-white',
    ringClass:    'bg-orange-500',
  },
  {
    image:        IMGS.rubytui,
    username:     '@rubytui',
    label:        'Ruby Tui',
    platformIcon: 'logos:instagram-icon',
    followers:    '318K+',
    ctaText:      'Connect',
    ctaClass:     'bg-pink-500 text-white',
    ringClass:    'bg-pink-500',
  },
  {
    image:        IMGS.jazz,
    username:     '@jazzthornton',
    label:        'Jazz Thornton',
    platformIcon: 'logos:instagram-icon',
    followers:    '4.1M+',
    ctaText:      'Follow',
    ctaClass:     'bg-rose-500 text-white',
    ringClass:    'bg-rose-500',
  },
  {
    image:        IMGS.groupEvent,
    username:     '@wearetenzing',
    label:        'WeAreTenzing',
    platformIcon: 'logos:instagram-icon',
    followers:    '34M+ combined',
    ctaText:      'Explore',
    ctaClass:     'bg-teal-600 text-white',
    ringClass:    'bg-teal-600',
  },
  {
    image:        IMGS.louis,
    username:     '@louisdavis',
    label:        'Louis Davis',
    platformIcon: 'logos:tiktok-icon',
    followers:    '2.7M+',
    ctaText:      'Watch',
    ctaClass:     'bg-violet-600 text-white',
    ringClass:    'bg-violet-600',
  },
];

/* Brand logos for marquee */
const BRAND_LOGOS = [
  { icon: 'simple-icons:nike',    w: 64,  h: 24 },
  { icon: 'simple-icons:shopify', w: 88,  h: 26 },
  { icon: 'simple-icons:netflix', w: 80,  h: 22 },
  { icon: 'simple-icons:spotify', w: 88,  h: 26 },
  { icon: 'simple-icons:airbnb',  w: 88,  h: 28 },
  { icon: 'simple-icons:uber',    w: 64,  h: 24 },
  { icon: 'simple-icons:sony',    w: 56,  h: 24 },
  { icon: 'simple-icons:samsung', w: 74,  h: 22 },
];

export default function App() {
  /* ─── State ─────────────────────────────────────────── */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Page loader
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderPhase, setLoaderPhase] = useState(0);
  const [loaderExiting, setLoaderExiting] = useState(false);

  /* ─── Refs ───────────────────────────────────────────── */
  const cursorRef         = useRef(null);
  const phoneContainerRef = useRef(null);

  const totalCards = TALENT_CARDS.length;

  /* ─── Effects ────────────────────────────────────────── */

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Hero carousel auto-advance
  useEffect(() => {
    const id = setInterval(() => setCurrentCardIndex(p => (p + 1) % totalCards), 4500);
    return () => clearInterval(id);
  }, [totalCards]);

  // Custom cursor tracking
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const onMove  = (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; };
    const onDown  = () => cursor.classList.add('cursor-click');
    const onUp    = () => cursor.classList.remove('cursor-click');
    const addHov  = () => cursor.classList.add('cursor-hover');
    const remHov  = () => cursor.classList.remove('cursor-hover');
    const hovEls  = document.querySelectorAll('a, button, [role="button"], input, .cursor-pointer');
    hovEls.forEach(el => { el.addEventListener('mouseenter', addHov); el.addEventListener('mouseleave', remHov); });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      hovEls.forEach(el => { el.removeEventListener('mouseenter', addHov); el.removeEventListener('mouseleave', remHov); });
    };
  }, []);

  // Phone 3D tilt on mousemove
  useEffect(() => {
    const container = phoneContainerRef.current;
    if (!container) return;
    const phone = container.querySelector('.phone-inner');
    if (!phone) return;
    const onMove  = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      phone.style.transform = `perspective(1200px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => { phone.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'; };
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => { container.removeEventListener('mousemove', onMove); container.removeEventListener('mouseleave', onLeave); };
  }, []);

  // Sticky nav on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-driven reveals — delayed past loader exit so animations actually fire
  useEffect(() => {
    let observer;
    const tid = setTimeout(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
      document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }, 4600);
    return () => { clearTimeout(tid); if (observer) observer.disconnect(); };
  }, []);

  // Journey step reveal — delayed past loader exit
  useEffect(() => {
    let observer;
    const tid = setTimeout(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('step-visible'); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.journey-step').forEach(el => observer.observe(el));
    }, 4600);
    return () => { clearTimeout(tid); if (observer) observer.disconnect(); };
  }, []);

  // Bar chart grow animation — delayed past loader exit
  useEffect(() => {
    let observer;
    const tid = setTimeout(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-chart-bar').forEach(bar => bar.classList.add('bar-grown'));
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('.bar-chart-section').forEach(el => observer.observe(el));
    }, 4600);
    return () => { clearTimeout(tid); if (observer) observer.disconnect(); };
  }, []);

  // Count-up animation — delayed past loader exit
  useEffect(() => {
    let observer;
    const tid = setTimeout(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el      = entry.target;
          const target  = parseFloat(el.dataset.target);
          const suffix  = el.dataset.suffix || '';
          const isFloat = el.dataset.float === 'true';
          const dur     = 2200;
          const start   = performance.now();
          const tick    = (now) => {
            const p      = Math.min((now - start) / dur, 1);
            const eased  = 1 - Math.pow(1 - p, 3);
            el.textContent = (isFloat ? (eased * target).toFixed(1) : Math.floor(eased * target)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('.count-up').forEach(el => observer.observe(el));
    }, 4600);
    return () => { clearTimeout(tid); if (observer) observer.disconnect(); };
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const cleanups = [];
    document.querySelectorAll('.btn-magnetic').forEach(el => {
      const onMove  = (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width/2)*0.28}px, ${(e.clientY - r.top - r.height/2)*0.28}px)`; };
      const onLeave = () => { el.style.transform = ''; };
      el.addEventListener('mousemove',  onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); });
    });
    return () => cleanups.forEach(fn => fn());
  }, []);

  // Page loader sequence: Talent → Managed → Amplified → Logo (slow, cinematic)
  useEffect(() => {
    const t1 = setTimeout(() => setLoaderPhase(1), 200);
    const t2 = setTimeout(() => setLoaderPhase(2), 950);
    const t3 = setTimeout(() => setLoaderPhase(3), 1700);
    const t4 = setTimeout(() => setLoaderPhase(4), 2450);
    const t5 = setTimeout(() => setLoaderExiting(true), 3400);
    const t6 = setTimeout(() => setLoaderVisible(false), 4500);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, []);

  // Parallax scroll effect — disabled on touch/mobile devices
  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches || window.innerWidth < 768;
    if (isTouchDevice()) return;
    const onScroll = () => {
      const sy = window.scrollY;
      document.querySelectorAll('[data-parallax-speed]').forEach(el => {
        el.style.transform = `translateY(${sy * parseFloat(el.dataset.parallaxSpeed || 0)}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ─── Marquee content ────────────────────────────────── */
  const marqueeItems = [
    { name: 'HowToDad',      stat: '6M+ Followers' },
    { name: 'Jazz Thornton', stat: '4.1M+ Followers' },
    { name: 'Ruby Tui',      stat: '318K+ Followers' },
    { name: 'Torrell Tafa',  stat: '2.3M Followers' },
    { name: 'Louis Davis',   stat: '2.7M Followers' },
    { name: '120+ Creators', stat: 'Managed by Tenzing' },
    { name: '50+ Campaigns', stat: 'Every Month' },
    { name: '100% NZ-Owned', stat: 'Purpose-Driven' },
  ];

  /* ══════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════ */
  return (
    <>
      {/* ─── Page Loader ─── */}
      {loaderVisible && (
        <div className={`page-loader ${loaderExiting ? 'loader-exit' : ''}`} aria-hidden="true">
          {/* Subtle corner label */}
          <div className="loader-counter">NZ · Creator Agency</div>

          {/* Centre word / logo sequence */}
          <div className="relative flex items-center justify-center w-full" style={{ minHeight: '1.1em' }}>
            {loaderPhase >= 1 && loaderPhase < 4 && (
              <span key={loaderPhase} className="loader-word">
                {[null, 'Talent.', 'Managed.', 'Amplified.'][loaderPhase]}
              </span>
            )}
            {loaderPhase >= 4 && (
              <div key="logo" className="loader-logo-lockup">
                <img
                  src="https://wearetenzing.com/wp-content/uploads/2025/08/icon-dark.png"
                  alt=""
                  className="w-16 h-16 object-contain brightness-0 invert"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <span>WeAreTenzing</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="loader-bar"><div className="loader-bar-fill"></div></div>
        </div>
      )}

      {/* ─── Custom Cursor ─── */}
      <div ref={cursorRef} id="cursor" aria-hidden="true"></div>

      {/* ─── Navbar ─── */}
      <nav className={`nav-base px-6 md:px-12 ${isScrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
        <div className="flex max-w-7xl mx-auto items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="https://wearetenzing.com/wp-content/uploads/2025/08/icon-dark.png" alt="WeAreTenzing" className="w-7 h-7 object-contain" />
            <span className="hidden sm:inline font-bold text-base tracking-tight">WeAreTenzing</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {['Talent','Services','About','Articles'].map(l => (
              <a key={l} href={`/${l.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="/contact" className="btn-magnetic hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:bg-gray-800 transition-colors">
              Let's Connect
              <iconify-icon icon="solar:arrow-right-linear" width="16"></iconify-icon>
            </a>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-2xl flex items-center justify-center w-8 h-8" aria-label="Toggle Menu">
              <iconify-icon icon={isMobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}></iconify-icon>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <div className={`fixed inset-0 z-[300] flex flex-col justify-center items-center gap-10 bg-[#E3DDD7] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} aria-hidden={!isMobileMenuOpen}>
        {['Talent','Services','About','Articles'].map(l => (
          <a key={l} href={`/${l.toLowerCase()}`} className="text-4xl font-bold tracking-tight text-gray-900 hover:text-gray-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{l}</a>
        ))}
        <a href="/contact" className="mt-4 bg-black text-white px-8 py-4 rounded-full text-lg font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Let's Connect</a>
      </div>

      {/* ═══════════════════════════════════════════════════
          HERO — gradient, two-column
          ═══════════════════════════════════════════════════ */}
      <main>
        <section className="hero-gradient relative overflow-hidden page-top-pad">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-10 sm:py-14 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

              {/* ── Left: Text ── */}
              <div className="flex flex-col gap-5 sm:gap-7 max-w-xl z-10">

                {/* Headline */}
                <h1 className="animate-enter delay-100 text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.91] tracking-tight text-gray-900">
                  We connect brands<br />with the voices<br />people{' '}
                  <span className="font-cormorant italic font-normal">trust.</span>
                </h1>

                {/* Sub-text */}
                <p className="animate-enter delay-200 text-base text-gray-500 leading-relaxed max-w-sm">
                  NZ's leading creator agency — matching purpose-driven brands with authentic creators.
                </p>

                {/* Actions */}
                <div className="animate-enter delay-300 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <a href="/contact" className="btn-magnetic bg-black text-white text-sm px-7 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg shadow-gray-900/15">
                    Let's Connect
                    <iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon>
                  </a>
                  <a href="/talent" className="text-sm text-gray-600 font-medium hover:text-black flex items-center gap-1.5 transition-colors">
                    <iconify-icon icon="solar:users-group-rounded-linear" width="20"></iconify-icon>
                    View our talent
                  </a>
                </div>

                {/* Stats */}
                <div className="animate-enter delay-400 mt-1 pt-5 border-t border-gray-900/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                  {[
                    { target: 120, suffix: '+',  label: 'Creators' },
                    { target: 34,  suffix: 'M+', label: 'Reach', float: true },
                    { target: 50,  suffix: '+',  label: 'Campaigns/mo' },
                    { target: 300, suffix: '+',  label: 'Network' },
                  ].map(({ target, suffix, label, float }) => (
                    <div key={label}>
                      <p className="count-up text-2xl md:text-3xl font-bold tracking-tight" data-target={target} data-suffix={suffix} data-float={float ? 'true' : 'false'}>
                        0{suffix}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 font-semibold uppercase tracking-wide">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: Phone ── */}
              <div ref={phoneContainerRef} className="phone-tilt-container phone-slide-in relative flex justify-center lg:justify-end mt-2 lg:mt-0">

                {/* Ambient glow — hidden on mobile to prevent image edge bleed */}
                <div className="phone-ambient-glow hidden sm:block absolute inset-0 z-0 scale-125 rounded-full overflow-hidden pointer-events-none">
                  {TALENT_CARDS.map((card, i) => (
                    <div key={i} className="absolute inset-0 transition-opacity duration-[2500ms]" style={{ opacity: i === currentCardIndex ? 1 : 0 }}>
                      <img src={card.image} className="w-full h-full object-cover" aria-hidden="true" alt="" />
                    </div>
                  ))}
                </div>

                {/* Floating pills — hidden on xs, shown sm+ */}
                <div className="floating-pill pill-1 hidden sm:flex absolute top-[12%] -left-2 md:-left-10 z-30">
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <iconify-icon icon="logos:tiktok-icon" width="10"></iconify-icon>
                  </div>
                  <span className="text-gray-900">6M+ <span className="font-normal text-gray-500">Followers</span></span>
                </div>
                <div className="floating-pill pill-2 hidden sm:flex absolute top-[38%] -right-2 md:-right-8 z-30">
                  <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center">
                    <iconify-icon icon="solar:heart-bold" width="10" className="text-pink-500"></iconify-icon>
                  </div>
                  <span className="text-gray-900">+245% <span className="font-normal text-gray-500">Engagement</span></span>
                </div>
                <div className="floating-pill pill-3 hidden sm:flex absolute bottom-[24%] -left-2 md:-left-12 z-30">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <iconify-icon icon="solar:verified-check-linear" width="10" className="text-green-600"></iconify-icon>
                  </div>
                  <span className="text-gray-900">NZ <span className="font-normal text-gray-500">#1 Agency</span></span>
                </div>

                {/* Phone Frame */}
                <div className="phone-inner relative w-[220px] h-[450px] xs:w-[230px] xs:h-[470px] sm:w-[260px] sm:h-[530px] md:w-[290px] md:h-[590px] bg-white rounded-[2.2rem] shadow-2xl border-[7px] border-white ring-1 ring-gray-900/8 overflow-hidden z-10">
                  {/* Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black rounded-b-xl z-30"></div>
                  {/* Status bar */}
                  <div className="absolute top-2 w-full px-5 flex justify-between text-xs font-semibold text-white/90 z-30 mix-blend-difference tracking-tight">
                    <span>9:41</span>
                    <div className="flex gap-1 items-center">
                      <iconify-icon icon="solar:signal-linear"></iconify-icon>
                      <iconify-icon icon="solar:wifi-linear"></iconify-icon>
                      <iconify-icon icon="solar:battery-full-linear"></iconify-icon>
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-transparent to-black/60 pointer-events-none z-20"></div>
                  {/* Slide dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                    {TALENT_CARDS.map((_, i) => (
                      <button key={i} onClick={() => setCurrentCardIndex(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === currentCardIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`} aria-label={`Slide ${i + 1}`} />
                    ))}
                  </div>
                  {/* Cards */}
                  <div className="w-full h-full relative bg-gray-900">
                    {TALENT_CARDS.map((card, i) => (
                      <div key={i} className={`slider-card w-full h-full absolute inset-0 ${i === currentCardIndex ? 'card-active' : 'card-hidden'}`}>
                        <img src={card.image} className="w-full h-full object-cover object-center" alt={card.label} loading={i === 0 ? 'eager' : 'lazy'} style={{ objectPosition: 'center top' }} />
                        <div className="absolute top-10 left-4 flex items-center gap-2 z-20">
                          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-black flex items-center justify-center">
                            <iconify-icon icon={card.platformIcon} width="14"></iconify-icon>
                          </div>
                          <div>
                            <span className="text-white text-xs font-semibold drop-shadow-md block leading-tight">{card.username}</span>
                            <span className="text-white/60 text-[10px] leading-tight">{card.followers}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-14 left-4 right-4 z-20">
                          <p className="text-white text-xl font-cormorant italic font-medium drop-shadow-lg">{card.label}</p>
                        </div>
                        <div className="absolute bottom-24 right-4 z-30">
                          <div className="relative inline-block">
                            <div className={`absolute inset-0 ${card.ringClass} rounded-full sonar-ring opacity-50`}></div>
                            <button className={`relative ${card.ctaClass} px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1`}>
                              {card.ctaText}
                              <iconify-icon icon="solar:arrow-right-up-linear" width="10"></iconify-icon>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Reaction icons */}
                  <div className="absolute right-3 bottom-28 flex flex-col gap-3.5 z-20">
                    {['solar:heart-linear','solar:chat-round-dots-linear','solar:share-linear'].map(icon => (
                      <div key={icon} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                        <iconify-icon icon={icon} width="18"></iconify-icon>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative gradient blob */}
          <div className="gradient-blob absolute top-1/3 right-0 w-[55%] h-[80%] rounded-full blur-3xl pointer-events-none bg-gradient-to-br from-orange-200/50 via-amber-100/30 to-orange-300/40 opacity-70 translate-x-1/4"></div>
        </section>

        {/* ── Brand Logos Marquee ── */}
        <div className="border-y border-gray-900/6 py-5 bg-white/20">
          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-5">Brands we've connected with creators</p>
          <div className="marquee-container">
            <div className="marquee-track items-center">
              {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
                <div key={i} className="flex items-center justify-center px-8 opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500">
                  <iconify-icon icon={logo.icon} width={logo.w} height={logo.h}></iconify-icon>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>


      {/* ═══════════════════════════════════════════════════
          DARK PARALLAX STATS SECTION — structured
          ═══════════════════════════════════════════════════ */}
      <section className="bg-[#0c0c0c] relative overflow-hidden py-12 md:py-24">

        {/* Ghost text background — talent names only */}
        <div className="ghost-text-layer" aria-hidden="true">
          {[
            ['HowToDad', 'Jazz Thornton', 'Ruby Tui', 'Torrell Tafa', 'Louis Davis'],
            ['Ruby Tui', 'HowToDad', 'Torrell Tafa', 'Louis Davis', 'Jazz Thornton'],
            ['Jazz Thornton', 'Ruby Tui', 'Louis Davis', 'HowToDad', 'Torrell Tafa'],
          ].map((row, ri) => (
            <div key={ri} className="ghost-text-row">
              {[...row, ...row, ...row, ...row].map((t, i) => (
                <span key={i} className="text-white font-bold text-5xl md:text-7xl lg:text-8xl" style={{ fontFamily: 'var(--font-ui)', letterSpacing: '-0.04em' }}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">

          {[
            { idx: '01', num: '34M+',  label: 'Combined Creator Reach',  sub: 'Across TikTok, Instagram & YouTube',      speed: '-0.02', right: false },
            { idx: '02', num: '120+',  label: 'Talent Managed',          sub: 'Active creators in our NZ & AU roster',   speed:  '0.02', right: true  },
            { idx: '03', num: '300%',  label: 'Avg. Engagement Lift',    sub: '3× above the industry benchmark',         speed: '-0.02', right: false },
          ].map(({ idx, num, label, sub, speed, right }) => (
            <div
              key={num}
              className={`flex ${right ? 'sm:justify-end justify-start' : 'justify-start'} items-center gap-4 sm:gap-6 md:gap-10 py-5 md:py-6 border-b border-white/[0.06] scroll-reveal group`}
            >
              {!right && <span className="text-white/20 text-[10px] font-bold tracking-[0.25em] tabular-nums shrink-0 hidden md:block">{idx}</span>}
              <span className="giant-text text-white leading-none tabular-nums" data-parallax-speed={speed}>{num}</span>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-gray-300 text-sm sm:text-base md:text-xl font-light group-hover:text-white transition-colors leading-snug">{label}</span>
                <span className="text-gray-600 text-xs md:text-sm font-normal leading-snug">{sub}</span>
              </div>
              {right && <span className="text-white/20 text-[10px] font-bold tracking-[0.25em] tabular-nums shrink-0 hidden md:block">{idx}</span>}
            </div>
          ))}
        </div>{/* end max-w-7xl */}
      </section>

      {/* ═══════════════════════════════════════════════════
          BENTO GRID — Results
          ═══════════════════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-14 sm:py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 scroll-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[0.95]">
            Real creators.<br />
            <span className="font-cormorant italic font-normal">Real results.</span>
          </h2>
          <a href="#" className="group flex items-center gap-2 text-sm font-semibold text-gray-900 border-b border-gray-900/20 pb-1 hover:border-gray-900 transition-colors whitespace-nowrap self-start md:self-auto">
            View all work
            <iconify-icon icon="solar:arrow-right-up-linear" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></iconify-icon>
          </a>
        </div>

        <div className="bento-grid scroll-reveal sr-delay-1">

          {/* Torrell portrait */}
          <div className="talent-portrait-card rounded-[1.5rem]">
            <img src={IMGS.torrell} alt="Torrell Tafa" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
            <div className="absolute bottom-5 left-5 z-10">
              <p className="text-white font-bold tracking-tight text-sm">Torrell Tafa</p>
              <p className="text-white/60 text-xs">2.3M Followers</p>
            </div>
          </div>

          {/* Jazz Thornton portrait */}
          <div className="talent-portrait-card rounded-[1.5rem]">
            <img src={IMGS.jazz} alt="Jazz Thornton" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-5 left-5 z-10">
              <p className="text-white font-bold tracking-tight text-sm">Jazz Thornton</p>
              <p className="text-white/60 text-xs">Mental Health Activist</p>
              <p className="text-white/80 text-xs font-semibold mt-0.5">4.1M+ Followers</p>
            </div>
          </div>

          {/* Ruby Tui */}
          <div className="talent-portrait-card rounded-[1.5rem]">
            <img src={IMGS.rubytui} alt="Ruby Tui" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
            <div className="absolute bottom-5 left-5 z-10">
              <p className="text-white font-bold tracking-tight text-sm">Ruby Tui</p>
              <p className="text-white/60 text-xs">156% Sales Lift</p>
            </div>
          </div>

          {/* HowToDad */}
          <div className="talent-portrait-card rounded-[1.5rem]">
            <img src={IMGS.howtodad} alt="HowToDad" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
            <div className="absolute bottom-5 left-5 z-10">
              <p className="text-white font-bold tracking-tight text-sm">HowToDad</p>
              <p className="text-white text-3xl font-bold tracking-tight leading-none mt-1">6M+</p>
              <p className="text-white/60 text-xs">Followers</p>
            </div>
          </div>

          {/* Talent stat tile */}
          <div className="bg-[#0c0c0c] text-white rounded-[1.5rem] p-6 md:p-8 flex flex-col justify-end border border-white/5">
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mb-3">Talent Managed</p>
            <p className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">120+</p>
            <p className="text-gray-600 text-xs mt-2">Across NZ & Australia</p>
          </div>
        </div>

        {/* Talent scroll — fused directly below bento grid */}
        <div className="mt-14 sm:mt-20">
          <div className="talent-scroll-track scroll-reveal sr-delay-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            {[
              { img: IMGS.howtodad,   name: 'HowToDad',      niche: 'Family & Comedy',        f: '6M+' },
              { img: IMGS.jazz,       name: 'Jazz Thornton', niche: 'Mental Health & Author', f: '4.1M+' },
              { img: IMGS.torrell,    name: 'Torrell Tafa',  niche: 'Lifestyle',              f: '2.3M' },
              { img: IMGS.rubytui,    name: 'Ruby Tui',      niche: 'Sport & Wellbeing',      f: '318K' },
              { img: IMGS.louis,      name: 'Louis Davis',   niche: 'Entertainment',          f: '2.7M' },
              { img: IMGS.groupEvent, name: 'WeAreTenzing',  niche: 'Agency Events',          f: '34M combined' },
            ].map(({ img, name, niche, f }) => (
              <div key={name} className="talent-portrait-card shrink-0 w-[180px] sm:w-[210px] md:w-[250px] rounded-[1.2rem]">
                <img src={img} alt={name} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 z-10">
                  <p className="text-white font-bold tracking-tight text-sm">{name}</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">{niche}</p>
                  <p className="text-white text-sm font-bold mt-1">{f}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe bar */}
        <div className="mt-12">
          <div className="bg-[#efeae5] rounded-[1.5rem] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 scroll-reveal border border-gray-900/5">
            <div>
              <p className="font-bold text-gray-900 tracking-tight">Stay across NZ's creator economy</p>
              <p className="text-xs text-gray-500 mt-1">Campaigns, talent news, and insights — straight to your inbox.</p>
            </div>
            <button className="btn-magnetic bg-black text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap shrink-0">
              Subscribe →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW WE WORK — journey timeline + bar chart
          ═══════════════════════════════════════════════════ */}
      <section className="w-full bg-[#080808] py-20 md:py-28 overflow-hidden relative">
        {/* Decorative colour orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }}></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)', transform: 'translate(30%, 0)' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)', transform: 'translateY(40%)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}></div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 scroll-reveal">
            <div>
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-gray-600 mb-4 block">End-to-end</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[0.93]">
                How we{' '}
                <span className="font-cormorant italic font-normal">deliver.</span>
              </h2>
            </div>
            <a href="/contact" className="btn-magnetic inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors self-start md:self-auto shrink-0">
              Book a strategy call
              <iconify-icon icon="solar:arrow-right-linear" width="16"></iconify-icon>
            </a>
          </div>

          {/* Journey timeline — horizontal, colourful */}
          <div className="relative mb-16 md:mb-24">
            {/* Gradient connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[38px] left-[40px] right-[40px] h-px z-0" style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4, #10b981, #84cc16)' }}></div>

            <div className="journey-track grid md:grid-cols-5 gap-6 md:gap-4">
              {[
                { n: '01', icon: 'solar:phone-calling-linear',            title: 'Discovery',  desc: 'We learn your goals and audience.',             color: 'from-indigo-500 to-violet-600',   ring: 'ring-indigo-500/30',   text: 'text-indigo-300',   bar: '#6366f1' },
                { n: '02', icon: 'solar:users-group-two-rounded-linear',  title: 'Match',      desc: 'We pair you with the right creators.',           color: 'from-violet-500 to-purple-600',   ring: 'ring-violet-500/30',   text: 'text-violet-300',   bar: '#8b5cf6' },
                { n: '03', icon: 'solar:document-add-linear',             title: 'Create',     desc: 'Concepts developed & approved by you.',          color: 'from-cyan-500 to-blue-600',       ring: 'ring-cyan-500/30',     text: 'text-cyan-300',     bar: '#06b6d4' },
                { n: '04', icon: 'solar:play-circle-linear',              title: 'Launch',     desc: 'Content goes live across platforms.',             color: 'from-emerald-500 to-teal-600',    ring: 'ring-emerald-500/30',  text: 'text-emerald-300',  bar: '#10b981' },
                { n: '05', icon: 'solar:chart-square-linear',             title: 'Measure',    desc: 'Full performance reporting delivered.',          color: 'from-lime-500 to-green-600',      ring: 'ring-lime-500/30',     text: 'text-lime-300',     bar: '#84cc16' },
              ].map(({ n, icon, title, desc, color, ring, text, bar }, idx, arr) => (
                <React.Fragment key={n}>
                  <div
                    className="journey-step flex flex-col items-center text-center relative z-10"
                    style={{ '--step-delay': `${idx * 130}ms` }}
                  >
                    <div className={`w-[76px] h-[76px] bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-4 ring-4 ${ring} shadow-lg hover:scale-105 transition-transform duration-300`}>
                      <iconify-icon icon={icon} width="32" className="text-white"></iconify-icon>
                    </div>
                    {/* Mobile progress bar */}
                    <div className="md:hidden w-10 h-0.5 rounded-full mb-3 opacity-60" style={{ background: bar }}></div>
                    <span className={`text-[10px] font-bold tracking-widest ${text} mb-1`}>{n}</span>
                    <p className="font-bold text-white tracking-tight mb-1.5">{title}</p>
                    <p className="journey-step-desc text-gray-500 text-xs leading-relaxed max-w-[140px]">{desc}</p>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="journey-arrow">›</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Performance comparison — colourful radial chart feel */}
          <div className="bar-chart-section">
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-gray-600 mb-10">
              Traditional Agencies vs.{' '}
              <span style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4, #10b981, #84cc16)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>WeAreTenzing</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { metric: 'Engagement Rate',     wt: 92, ta: 38, grad: 'linear-gradient(to top, #6366f1, #a78bfa)' },
                { metric: 'Content Authenticity',wt: 96, ta: 45, grad: 'linear-gradient(to top, #06b6d4, #67e8f9)' },
                { metric: 'Campaign Speed',       wt: 88, ta: 52, grad: 'linear-gradient(to top, #10b981, #6ee7b7)' },
                { metric: 'ROI Delivered',        wt: 94, ta: 41, grad: 'linear-gradient(to top, #8b5cf6, #c4b5fd)' },
              ].map(({ metric, wt, ta, grad }, mIdx) => (
                <div key={metric} className="flex flex-col">
                  <div className="flex items-end gap-2 mb-4" style={{ height: '160px' }}>
                    {/* Traditional Agency */}
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-[10px] text-gray-600 font-bold tabular-nums">{ta}%</span>
                      <div className="w-full relative rounded-t-lg overflow-hidden" style={{ height: '140px' }}>
                        <div
                          className="bar-chart-bar absolute bottom-0 left-0 right-0 rounded-t-lg"
                          style={{ '--bar-delay': `${mIdx * 80}ms`, height: `${ta}%`, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                        ></div>
                      </div>
                    </div>
                    {/* WeAreTenzing — colourful gradient */}
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-[10px] text-white font-bold tabular-nums">{wt}%</span>
                      <div className="w-full relative rounded-t-lg overflow-hidden" style={{ height: '140px' }}>
                        <div
                          className="bar-chart-bar absolute bottom-0 left-0 right-0 rounded-t-lg"
                          style={{ '--bar-delay': `${mIdx * 80 + 200}ms`, height: `${wt}%`, background: grad, boxShadow: `0 -4px 20px ${grad.includes('6366f1') ? '#6366f130' : grad.includes('06b6d4') ? '#06b6d430' : grad.includes('10b981') ? '#10b98130' : '#8b5cf630'}` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-medium leading-snug">{metric}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}></div>
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">Traditional Agencies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4, #10b981)' }}></div>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>WeAreTenzing</span>
              </div>
            </div>
          </div>
        </div>{/* end relative z-10 */}
      </section>


      {/* ═══════════════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="w-full max-w-3xl mx-auto px-5 sm:px-6 md:px-12 py-14 sm:py-20 relative">
        <div className="mb-14 scroll-reveal">
          <span className="bg-[#d1c8c0] text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 inline-block">Questions</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[0.95] mt-6">
            Frequently Asked{' '}
            <span className="font-cormorant italic font-normal">Questions</span>
          </h2>
        </div>
        <div className="flex flex-col gap-3 scroll-reveal sr-delay-1">
          {[
            { q: 'How quickly will we see results?',         a: 'Creator content works fast. Once content goes live, most brands see immediate spikes in reach and engagement, with conversions scaling through paid amplification.' },
            { q: 'How do you choose the right creators?',    a: 'We look beyond follower counts. We match based on audience demographics, brand values, engagement rates, and previous conversion performance.' },
            { q: 'Do we get to approve the content?',        a: 'Absolutely. Nothing goes live without your final approval. You review all creator concepts and drafts before publishing.' },
            { q: 'Can we use the content for our own ads?',  a: 'Yes. All our campaigns include usage rights, meaning you can repurpose the creator content for your website, emails, and paid social ads.' },
            { q: 'What platforms do you cover?',             a: 'Our creators dominate TikTok, Instagram (Reels & Stories), and YouTube. We focus on the platforms where short-form video drives the highest ROI.' },
          ].map(({ q, a }) => (
            <details key={q} className="group bg-[#efeae5] rounded-xl overflow-hidden border border-gray-900/5">
              <summary className="flex justify-between items-center p-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-black">
                {q}
                <div className="w-7 h-7 rounded-full bg-black/8 flex items-center justify-center shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180">
                  <iconify-icon icon="solar:alt-arrow-down-linear" width="18"></iconify-icon>
                </div>
              </summary>
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed max-w-xl">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER CTA + LINKS
          ═══════════════════════════════════════════════════ */}
      <footer className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-12 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-20 scroll-reveal">

          {/* CTA Card */}
          <div className="bg-[#efeae5] rounded-[1.5rem] p-8 sm:p-10 md:p-16 flex flex-col justify-center items-start text-left relative overflow-hidden border border-gray-900/5">
            <div className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center mb-8 rotate-3">
              <iconify-icon icon="solar:stars-minimalistic-linear" width="28"></iconify-icon>
            </div>
            <span className="bg-white/60 border border-white/60 text-gray-900 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-5 inline-block">Get started</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-[0.95] mb-6">
              Ready to work with creators your audience already{' '}
              <span className="font-cormorant italic font-normal">loves?</span>
            </h2>
            <p className="text-gray-500 mb-8 text-sm max-w-xs">Book a free 30-min strategy call. We'll show you how to turn followers into customers.</p>
            <a href="/contact" className="btn-magnetic bg-black text-white px-7 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-3 shadow-xl shadow-gray-900/15 text-sm">
              Let's Connect
              <iconify-icon icon="solar:arrow-right-linear" width="16"></iconify-icon>
            </a>
          </div>

          {/* Instagram-style phone — cycles through talent */}
          <div className="bg-[#0c0c0c] rounded-[1.5rem] relative overflow-hidden flex items-center justify-center min-h-[400px] sm:min-h-[480px] py-10 border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
            {/* Phone frame — fixed height */}
            <div className="relative">
              <div className="bg-[#1c1c1e] rounded-[2.2rem] p-2.5 shadow-2xl ring-1 ring-white/10" style={{ width: '230px' }}>
                <div className="bg-white rounded-[1.8rem] overflow-hidden" style={{ height: '420px' }}>
                  {/* Dynamic Island */}
                  <div className="w-16 h-4 bg-black rounded-b-2xl mx-auto mt-1 mb-2"></div>
                  {/* Profile header — cycles with currentCardIndex */}
                  <div className="px-3 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 shrink-0" style={{ ringColor: TALENT_CARDS[currentCardIndex].ringClass }}>
                        <img
                          src={TALENT_CARDS[currentCardIndex].image}
                          className="w-full h-full object-cover object-center"
                          style={{ objectPosition: 'center top' }}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-gray-900 leading-tight truncate">{TALENT_CARDS[currentCardIndex].username}</p>
                        <p className="text-[9px] text-gray-500 leading-tight">{TALENT_CARDS[currentCardIndex].followers} Followers · NZ 🇳🇿</p>
                      </div>
                      <div className={`${TALENT_CARDS[currentCardIndex].ctaClass} text-[8px] font-bold px-2 py-1 rounded`}>
                        {TALENT_CARDS[currentCardIndex].ctaText}
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="flex justify-around py-1.5 border-y border-gray-100 mb-2">
                      {[['120+','Creators'],['34M','Reach'],['50+','Camps']].map(([v, l]) => (
                        <div key={l} className="text-center">
                          <p className="text-[11px] font-bold text-gray-900 leading-tight">{v}</p>
                          <p className="text-[8px] text-gray-500 leading-tight">{l}</p>
                        </div>
                      ))}
                    </div>
                    {/* Stories row — rotates starting from currentCardIndex */}
                    <div className="flex gap-2 mb-2">
                      {[...TALENT_CARDS.slice(currentCardIndex), ...TALENT_CARDS.slice(0, currentCardIndex)].slice(0, 4).map((card, i) => (
                        <div key={i} className="w-10 h-10 rounded-full overflow-hidden ring-[1.5px] ring-orange-400 ring-offset-1 shrink-0">
                          <img src={card.image} className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} alt="" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* 3×3 Instagram grid — rotates images */}
                  <div className="grid grid-cols-3 gap-[1px] bg-gray-200">
                    {[...TALENT_CARDS.map(c => c.image), IMGS.groupHero, IMGS.talent1, IMGS.groupEvent]
                      .slice(currentCardIndex, currentCardIndex + 9)
                      .concat([...TALENT_CARDS.map(c => c.image), IMGS.groupHero, IMGS.talent1, IMGS.groupEvent])
                      .slice(0, 9)
                      .map((img, i) => (
                        <div key={i} className="insta-grid-item transition-opacity duration-700">
                          <img src={img} alt="" loading="lazy" />
                        </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Slide dots */}
              <div className="flex justify-center gap-1.5 mt-3">
                {TALENT_CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentCardIndex(i)}
                    className={`rounded-full transition-all duration-300 ${i === currentCardIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 -right-8 bg-white rounded-xl shadow-xl px-2.5 py-1.5 flex items-center gap-1.5 border border-gray-100 z-10">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white shrink-0">
                  <iconify-icon icon="solar:graph-up-linear" width="12"></iconify-icon>
                </div>
                <div>
                  <p className="text-[8px] text-gray-400 font-semibold uppercase leading-none">Growth</p>
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">+128% Engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-900/10 pt-10 sm:pt-14 flex flex-col md:flex-row justify-between gap-10 md:gap-24 scroll-reveal">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-5">
              <img src="https://wearetenzing.com/wp-content/uploads/2025/08/icon-dark.png" alt="WeAreTenzing" className="w-6 h-6 object-contain" />
              <span className="font-bold text-lg tracking-tight">WeAreTenzing</span>
            </div>
            <h4 className="text-xl font-semibold tracking-tight text-gray-900 leading-tight mb-3">
              Social media that drives <span className="font-cormorant italic font-normal">real</span> results.
            </h4>
            <p className="text-xs text-gray-500 mb-5">NZ-owned. Purpose-driven. Creator-first.</p>
            <div className="flex gap-2.5">
              {[['simple-icons:instagram','Instagram'],['simple-icons:tiktok','TikTok'],['simple-icons:linkedin','LinkedIn']].map(([ic, label]) => (
                <a key={ic} href="#" aria-label={label} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <iconify-icon icon={ic} width="14"></iconify-icon>
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 w-full md:w-auto">
            {[
              { heading: 'Navigate', links: ['Home','About','Talent','Articles'] },
              { heading: 'Connect',  links: ['Book a call','Instagram','LinkedIn','TikTok'] },
              { heading: 'Legal',    links: ['Privacy Policy','Terms of Service','Contact','Sitemap'] },
            ].map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-3.5">
                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">{heading}</span>
                {links.map(l => <a key={l} href="#" className="text-sm text-gray-500 hover:text-black transition-colors">{l}</a>)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-gray-900/5 flex justify-between text-xs text-gray-400 font-medium">
          <span>© 2025 WeAreTenzing. All rights reserved.</span>
          <span>NZ talent, done properly.</span>
        </div>
      </footer>
    </>
  );
}
