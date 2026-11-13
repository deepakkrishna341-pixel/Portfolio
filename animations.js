/* =========================================================
   Premium motion system (GSAP + ScrollTrigger)
   Content always stays sharp and visible
   ========================================================= */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* Safety: force everything visible after 2.5s no matter what */
  const forceVisible = () => {
    $$('.reveal, .hero-copy > *, .float-card, .scroll-note, .section-head, .section-head h2, .section-kicker, .section-intro, .portrait-frame, .achievement-photo, .highlight-band').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.style.clipPath = 'none';
      el.classList.add('visible');
    });
  };
  setTimeout(forceVisible, 2500);

  /* ---- Split hero heading into per-letter spans ---- */
  const h1 = $('h1');
  if (h1 && !reduce) {
    h1.setAttribute('aria-label', h1.textContent.replace(/\s+/g, ' ').trim());
    let n = 0;
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(' '));
              return;
            }
            const w = document.createElement('span');
            w.className = 'w';
            w.setAttribute('aria-hidden', 'true');
            [...part].forEach(c => {
              const s = document.createElement('span');
              s.className = 'ch';
              s.textContent = c;
              s.style.setProperty('--i', n++);
              w.appendChild(s);
            });
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(h1);
  }

  /* ---- Preloader ---- */
  const pre = $('.preloader');
  const bar = pre && $('.preloader-bar span');
  const count = pre && $('.preloader-count');
  let started = false;

  const startSite = () => {
    if (started) return;
    started = true;

    if (pre) {
      pre.classList.add('done');
      setTimeout(() => pre.remove(), 1200);
    }

    setTimeout(() => {
      root.classList.add('is-ready');
      runMotion();
    }, pre ? 250 : 0);
  };

  if (pre && !reduce) {
    const t0 = performance.now();
    const dur = 1400;

    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);

      if (bar) bar.style.transform = `scaleX(${e})`;
      if (count) count.textContent = String(Math.round(e * 100)).padStart(3, '0');

      p < 1 ? requestAnimationFrame(tick) : setTimeout(startSite, 150);
    };

    requestAnimationFrame(tick);
    setTimeout(startSite, 3500);
  } else {
    if (pre) pre.remove();
    root.classList.add('is-ready');
    setTimeout(runMotion, 40);
  }

  /* ---- Scroll progress + header + active nav ---- */
  const progress = $('.scroll-progress');
  const header = $('.site-header');
  let lastY = scrollY;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;

    if (progress) {
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    }

    if (header) {
      header.classList.toggle(
        'hide',
        scrollY > lastY && scrollY > 320 && !$('.nav-links.open')
      );
    }

    lastY = scrollY;
  };

  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = $$('.nav-links a[href^="#"]');

  const secObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => {
        a.classList.toggle(
          'active',
          a.getAttribute('href') === '#' + e.target.id
        );
      });
    }
  }), { rootMargin: '-45% 0px -50% 0px' });

  $$('main section[id]').forEach(s => secObs.observe(s));

  /* ---- Static skill bars animation ---- */
  const chart = $('#skillChart');

  if (chart) {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;

      $$('.skill-level-row', chart).forEach((r, i) => {
        r.style.setProperty('--i', i);
      });

      chart.classList.add('in');

      setTimeout(() => {
        chart.classList.add('settled');
      }, 2600);

      co.disconnect();
    }), { threshold: 0.2 });

    co.observe(chart);
  }

  /* ---- Project filter pop ---- */
  $$('.filter-btn[data-filter]').forEach(b => {
    b.addEventListener('click', () => {
      $$('.project-card').forEach(c => {
        if (!c.hidden) {
          c.classList.remove('pop');
          void c.offsetWidth;
          c.classList.add('pop');
        }
      });
    });
  });

  if (reduce) {
    forceVisible();
    return;
  }

  /* =====================================================
     GSAP MOTION — no blur, content always ends visible
     ===================================================== */
  function runMotion() {
    if (typeof gsap === 'undefined') {
      forceVisible();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero sequence
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    heroTl
      .from('.hero-copy .eyebrow', {
        y: 28,
        opacity: 0,
        duration: 0.7
      }, 0.05)
      .from('.hero-copy .hero-lead', {
        y: 36,
        opacity: 0,
        duration: 0.8
      }, 0.25)
      .from('.hero-copy .hero-actions', {
        y: 28,
        opacity: 0,
        duration: 0.7
      }, 0.4)
      .from('.hero-copy .quick-links', {
        y: 20,
        opacity: 0,
        duration: 0.65
      }, 0.55)
      .from('.float-top', {
        y: 40,
        opacity: 0,
        duration: 0.85
      }, 0.6)
      .from('.float-bottom', {
        y: 40,
        opacity: 0,
        duration: 0.85
      }, 0.75)
      .from('.scroll-note', {
        y: 16,
        opacity: 0,
        duration: 0.6
      }, 0.95);

    gsap.from('.portrait-frame', {
      scale: 0.92,
      opacity: 0.6,
      duration: 1.2,
      delay: 0.15,
      ease: 'power3.out'
    });

    // Section heads
    $$('.section-head').forEach(head => {
      const h2 = head.querySelector('h2');
      const kicker = head.querySelector('.section-kicker');
      const intro = head.querySelector('.section-intro');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: head,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      if (kicker) {
        tl.from(kicker, {
          y: 18,
          opacity: 0,
          duration: 0.55
        }, 0);
      }

      if (h2) {
        gsap.set(h2, { y: 36, opacity: 0 });

        tl.to(h2, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out'
        }, 0.06);
      }

      if (intro) {
        tl.from(intro, {
          y: 16,
          opacity: 0,
          duration: 0.65
        }, 0.18);
      }

      head.classList.add('visible');
    });

    // Cards & reveal blocks — clean rise, no blur
    $$('.skill-grid, .project-grid, .timeline, .cert-grid, .fact-stack').forEach(grid => {
      const kids = [...grid.children];

      if (!kids.length) return;

      gsap.from(kids, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        onComplete: () => {
          kids.forEach(k => k.classList.add('visible'));
        }
      });
    });

    // Remaining .reveal items not in grids
    $$('.reveal').forEach(el => {
      if (el.closest('.skill-grid, .project-grid, .timeline, .cert-grid, .fact-stack, .section-head')) {
        return;
      }

      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onComplete: () => {
          el.classList.add('visible');
        }
      });
    });

    // Highlight band + photo
    const band = $('.highlight-band');

    if (band) {
      gsap.from(band, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: band,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    }

    const photo = $('.achievement-photo');

    if (photo) {
      gsap.from(photo, {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: photo,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  /* ---- Cursor + magnetic + spotlight ---- */
  if (fine) {
    root.classList.add('has-cursor');

    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;

    addEventListener('pointermove', e => {
      mx = e.clientX;
      my = e.clientY;

      if (dot) {
        dot.style.transform = `translate(${mx}px,${my}px)`;
      }
    }, { passive: true });

    addEventListener('pointerdown', () => {
      if (ring) ring.classList.add('down');
    });

    addEventListener('pointerup', () => {
      if (ring) ring.classList.remove('down');
    });

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      if (ring) {
        ring.style.transform = `translate(${rx}px,${ry}px)`;
      }

      requestAnimationFrame(loop);
    };

    loop();

    $$('.button, .nav-cta, .social-icon').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });

    $$('.skill-card, .project-card, .timeline-item, .cert-card, .fact').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();

        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---- Mobile menu ---- */
  const toggle = $('#menuToggle');
  const nav = $('#navLinks');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();