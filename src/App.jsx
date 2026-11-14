import { useEffect, useRef } from "react";
import SectionIllustration from "./SectionIllustrations";
import CodeBackground from "./CodeBackground";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   SOCIAL MEDIA ICONS
========================================= */

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/deepak_krishna_ms_.i/",
    className: "instagram",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="instagramGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="35%" stopColor="#F77737" />
            <stop offset="65%" stopColor="#E1306C" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#instagramGradient)" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="url(#instagramGradient)" strokeWidth="2.2" />
        <circle cx="17.5" cy="6.8" r="1.2" fill="#E1306C" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/deepakkrishna341/",
    className: "leetcode",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 2.5 6.2 10.8a4.2 4.2 0 0 0 0 5.9l3.8 3.8" fill="none" stroke="#FFA116" strokeWidth="2.5" strokeLinecap="round" />
        <path d="m12.2 5-6 6a4.2 4.2 0 0 0 0 5.9l3.6 3.6" fill="none" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 13h10" fill="none" stroke="#FFA116" strokeWidth="2.5" strokeLinecap="round" />
        <path d="m15.5 9.5 4 3.5-4 3.5" fill="none" stroke="#FFA116" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@deepakkrishna122",
    className: "youtube",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9Z" fill="#FF0000" />
        <path d="m9.7 15.5 5.8-3.5-5.8-3.5v7Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/deepak-krishna-877772332/",
    className: "linkedin",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 2H3.55C2.7 2 2 2.7 2 3.55v16.9c0 .85.7 1.55 1.55 1.55h16.9c.85 0 1.55-.7 1.55-1.55V3.55C22 2.7 21.3 2 20.45 2ZM8 18H5V9h3v9ZM6.5 7.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 18h-3v-4.4c0-1.05-.02-2.4-1.47-2.4-1.47 0-1.7 1.14-1.7 2.32V18h-3V9h2.88v1.23h.04a3.16 3.16 0 0 1 2.84-1.56C18.62 8.67 19 10.7 19 13.33V18Z" fill="#0A66C2" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/deepakkrishna341-pixel",
    className: "github",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.55.1.75-.24.75-.53v-2.08c-3.07.67-3.72-1.3-3.72-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.2 3.18.92.1-.71.38-1.2.7-1.47-2.45-.28-5.03-1.23-5.03-5.46 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.05 1.13a10.6 10.6 0 0 1 5.56 0c2.12-1.43 3.04-1.13 3.04-1.13.6 1.52.23 2.64.12 2.92.7.77 1.12 1.76 1.12 2.96 0 4.24-2.58 5.18-5.04 5.45.4.35.75 1.02.75 2.06v3.05c0 .3.2.64.76.53A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    ),
  },
];

/* =========================================
   REUSABLE SOCIAL LINKS
========================================= */

function SocialLinks({ variant = "" }) {
  return (
    <div className={`social-icons ${variant}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-icon ${social.className}`}
          aria-label={`Visit my ${social.name} profile`}
          title={social.name}
        >
          {social.icon}
          <span className="social-tooltip">{social.name}</span>
        </a>
      ))}
    </div>
  );
}

/* =========================================
   3D HERO OBJECTS
========================================= */

function OrbitalScene() {
  const group = useRef(null);
  const sphere = useRef(null);
  const torus = useRef(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x += delta * 0.05;
    }

    if (sphere.current) {
      sphere.current.rotation.y += delta * 0.3;
      sphere.current.rotation.x += delta * 0.15;
    }

    if (torus.current) {
      torus.current.rotation.x += delta * 0.2;
      torus.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={sphere} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.15, 4]} />
          <MeshDistortMaterial
            color="#A0A0A0"
            roughness={0.2}
            metalness={0.85}
            distort={0.25}
            speed={2}
          />
        </mesh>
      </Float>

      <mesh ref={torus} rotation={[1.2, 0.3, 0.4]}>
        <torusGeometry args={[1.8, 0.018, 16, 120]} />
        <meshStandardMaterial color="#DEDEDE" metalness={1} roughness={0.2} />
      </mesh>

      <mesh rotation={[0.8, 0.5, 0]}>
        <torusGeometry args={[2.15, 0.012, 16, 120]} />
        <meshStandardMaterial color="#777777" metalness={1} roughness={0.3} />
      </mesh>

      <Float speed={2} floatIntensity={1}>
        <mesh position={[2.1, 1.1, 0.2]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial color="#DEDEDE" metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>

      <Float speed={1.8} floatIntensity={1}>
        <mesh position={[-2, -1.2, 0.5]}>
          <icosahedronGeometry args={[0.2, 1]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.5} floatIntensity={0.8}>
        <mesh position={[1.7, -1.5, 0]}>
          <sphereGeometry args={[0.13, 32, 32]} />
          <meshStandardMaterial color="#DEDEDE" metalness={1} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 5]} intensity={2.5} />
      <pointLight position={[-4, -2, 3]} intensity={2} color="#A0A0A0" />
      <OrbitalScene />
    </Canvas>
  );
}

/* =========================================
   MAIN APP
========================================= */

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Keep the page fully usable without motion for visitors who request it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const cleanupHandlers = [];

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.3,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      intro
        .from(".site-nav", {
          y: -40,
          opacity: 0,
          duration: 1,
        })
        .from(".hero-kicker", {
          y: 30,
          opacity: 0,
          duration: 0.7,
        }, "-=0.4")
        .from(".hero-title .hero-word", {
          y: 100,
          opacity: 0,
          rotateX: -40,
          stagger: 0.12,
          duration: 1,
        }, "-=0.3")
        .from(".hero-description", {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, "-=0.4")
        .from(".hero-actions a", {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
        }, "-=0.4")
        .from(".hero-visual", {
          scale: 0.8,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out",
        }, "-=1");

      gsap.to(".hero-image-frame", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orbit-label", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 55,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      [
        ".skill-card",
        ".project-card",
        ".certificate-card",
        ".info-card",
        ".section-illustration",
      ].forEach((selector) => {
        gsap.utils.toArray(selector).forEach((card, index) => {
          gsap.from(card, {
            y: 45,
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
            },
          });
        });
      });

      gsap.utils.toArray(".skill-progress").forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${bar.dataset.progress}%`,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });

      if (window.matchMedia("(pointer: fine)").matches) {
        gsap.utils.toArray(".project-card").forEach((card) => {
          const move = (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x - rect.width / 2) / rect.width) * 12;
            const rotateX = ((rect.height / 2 - y) / rect.height) * 12;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              transformPerspective: 900,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const reset = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", reset);

          cleanupHandlers.push(() => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", reset);
          });
        });
      }

      gsap.utils.toArray(".research-image").forEach((image) => {
        gsap.from(image, {
          scale: 0.92,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: image,
            start: "top 85%",
          },
        });
      });

      ScrollTrigger.refresh();
    }, appRef);

    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    });

    return () => {
      cleanupHandlers.forEach((cleanup) => cleanup());
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const skills = [
    { name: "HTML & CSS", level: 90, symbol: "⌘" },
    { name: "JavaScript", level: 75, symbol: "JS" },
    { name: "React", level: 65, symbol: "⚛" },
    { name: "Python", level: 75, symbol: "Py" },
    { name: "C / C++", level: 80, symbol: "C+" },
    { name: "PHP & Laravel", level: 80, symbol: "PHP" },
    { name: "MySQL", level: 75, symbol: "DB" },
  ];

  return (
    <div className="portfolio" ref={appRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {/* BACKGROUND */}

      <div className="background-effects">
        <CodeBackground />
        <div className="code-scrim"></div>
        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>
        <div className="ambient ambient-three"></div>
        <div className="noise-overlay"></div>
        <div className="grid-overlay"></div>

        <div className="particles">
          {Array.from({ length: 20 }).map((_, index) => (
            <span className="particle" key={index}></span>
          ))}
        </div>

        {/* Lightweight animated developer atmosphere: decorative only. */}
        <div className="dev-atmosphere" aria-hidden="true">
          <div className="circuit-field circuit-field-one"></div>
          <div className="circuit-field circuit-field-two"></div>
          <div className="glass-object glass-object-one"><span>&lt;/&gt;</span></div>
          <div className="glass-object glass-object-two"><span>{"{ }"}</span></div>
          <div className="glass-object glass-object-three"><span>01</span></div>

          <div className="mini-workstation">
            <div className="mini-monitor"><span></span><i></i><i></i><i></i></div>
            <div className="mini-keyboard"></div>
            <div className="mini-base"></div>
          </div>
          <div className="data-orbit data-orbit-one"></div>
          <div className="data-orbit data-orbit-two"></div>
        </div>
      </div>

      {/* NAVIGATION */}

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#home" className="brand-logo" aria-label="Deepak Krishna home">
          <span className="brand-symbol">
            <span>D</span>
            <span>K</span>
          </span>
          <span className="brand-name">
            DEEPAK<span>.</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#awards">Awards</a>
          <a href="#research">Research</a>
          <a href="#technology">My Journey</a>
        </div>

        <details
          className="mobile-nav"
          onClick={(event) => {
            if (event.target.closest("a")) event.currentTarget.open = false;
          }}
        >
          <summary aria-label="Open navigation menu">Menu <span aria-hidden="true">☰</span></summary>
          <div className="mobile-nav-panel">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#awards">Awards</a>
            <a href="#research">Research</a>
            <a href="#technology">My Journey</a>
            <a href="#contact">Contact</a>
          </div>
        </details>

        <a href="#contact" className="nav-cta">
          Let's Talk <span>↗</span>
        </a>
      </nav>

      <main id="main-content">
      {/* HERO */}

      <section className="hero section" id="home">
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="status-indicator"></span>
            OPEN TO OPPORTUNITIES
          </div>

          <h1 className="hero-title">
            <span className="hero-word">Hello,</span>
            <span className="hero-word muted-word">I'm Deepak</span>
            <span className="hero-word accent-word">Krishna.</span>
          </h1>

          <div className="hero-role">
            <span className="role-line"></span>
            MCA STUDENT <span>·</span> ASPIRING DEVELOPER
          </div>

          <p className="hero-description">
            I build digital experiences through code, creativity,
            and curiosity. Exploring software development,
            artificial intelligence, and immersive technologies.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="button button-light">
              Explore My Work <span>↗</span>
            </a>

            <a href="#contact" className="button button-outline">
              Get In Touch <span>↗</span>
            </a>

            <a
              href="/Deepak-Krishna-Resume.pdf"
              download="Deepak-Krishna-Resume.pdf"
              className="resume-link"
            >
              Download CV ↓
            </a>
          </div>

          <div className="hero-social-area">
            <span className="social-heading">FIND ME ON</span>
            <SocialLinks variant="hero-social-icons" />
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow"></div>

          <div className="hero-3d">
            <Hero3D />
          </div>

          <div className="hero-image-frame">
            <img src="/profile.jpeg" alt="Portrait of Deepak Krishna" fetchPriority="high" decoding="async" />
          </div>

          <div className="hero-orbit-label">
            <svg viewBox="0 0 200 200">
              <defs>
                <path
                  id="orbitTextPath"
                  d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
                />
              </defs>

              <text>
                <textPath href="#orbitTextPath">
                  CREATIVE DEVELOPER · ALWAYS LEARNING ·
                </textPath>
              </text>
            </svg>
          </div>

          <div className="visual-caption">
            <span>01 / 08</span>
            <span>CREATIVE MINDSET</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>BASED IN KERALA, INDIA</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <span>© 2026</span>
        </div>
      </section>

      {/* ABOUT */}

      <section className="section about-section" id="about">
        <div className="section-heading reveal">
          <span className="section-index">01 — ABOUT ME</span>
          <h2>
            Curious by nature.
            <br />
            <span>Driven by technology.</span>
          </h2>
        </div>

        <div className="about-content">
          <div className="about-text reveal">
            <p className="large-paragraph">
              I'm Deepak Krishna, an MCA student from Idukki, Kerala,
              passionate about building useful and meaningful
              digital experiences.
            </p>

            <p>
              My academic journey has introduced me to programming,
              database management, web development, cybersecurity,
              cloud computing, and Virtual Reality research.
            </p>

            <p>
              I enjoy exploring new technologies, solving problems,
              building projects, and continuously improving my
              technical skills.
            </p>

            <a href="#contact" className="underlined-link">
              LET'S CONNECT <span>↗</span>
            </a>
          </div>

          <div className="about-info">
            <div className="info-card">
              <span>01</span>
              <h3>Education</h3>
              <p>Master of Computer Applications</p>
            </div>

            <div className="info-card">
              <span>02</span>
              <h3>Location</h3>
              <p>Idukki, Kerala, India</p>
            </div>

            <div className="info-card">
              <span>03</span>
              <h3>Interests</h3>
              <p>Development, AI & Virtual Reality</p>
            </div>

            <div className="info-card">
              <span>04</span>
              <h3>Languages</h3>
              <p>English, Malayalam, Hindi</p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}

      <section className="section education-section" id="education">
        <div className="section-heading reveal">
          <span className="section-index">02 — EDUCATION</span>
          <h2>
            My learning <span>journey.</span>
          </h2>
        </div>

        <div className="timeline">
          <div className="timeline-item reveal">
            <span className="timeline-year">2025 — 2027</span>
            <div className="timeline-content">
              <span>POSTGRADUATE</span>
              <h3>Master of Computer Applications</h3>
              <h4>Santhigiri College of Computer Sciences</h4>
              <p>
                Currently pursuing postgraduate studies in computer
                applications, focusing on software development and
                advanced computing concepts.
              </p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <span className="timeline-year">2022 — 2025</span>
            <div className="timeline-content">
              <span>UNDERGRADUATE</span>
              <h3>Bachelor of Computer Applications</h3>
              <h4>Jai Bharat Arts and Science College</h4>
              <p>
                Developed foundational knowledge in programming,
                computer science, databases, and application development.
              </p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <span className="timeline-year">HIGHER SECONDARY</span>
            <div className="timeline-content">
              <span>PLUS TWO</span>
              <h3>Higher Secondary Education</h3>
              <h4>MES HSS Vandenmedu</h4>
              <p>Completed higher secondary education with 79%.</p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <span className="timeline-year">SSLC</span>
            <div className="timeline-content">
              <span>SECONDARY</span>
              <h3>Secondary School Education</h3>
              <h4>GHSS Kallar</h4>
              <p>Achieved 93% with 8 A+ and 2 A grades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}

      <section className="section skills-section" id="skills">
        <div className="section-heading reveal">
          <span className="section-index">03 — EXPERTISE</span>
          <h2>
            Tools of <span>my trade.</span>
          </h2>
          <p>
            Technologies and tools I'm learning and working with.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={skill.name}>
              <div className="skill-card-top">
                <span className="skill-symbol">{skill.symbol}</span>
                <span className="skill-number">0{index + 1}</span>
              </div>

              <h3>{skill.name}</h3>

              <div className="skill-track">
                <div
                  className="skill-progress"
                  data-progress={skill.level}
                ></div>
              </div>

              <span className="skill-level">
                {skill.level}% FAMILIARITY
              </span>
            </div>
          ))}
        </div>

        <div className="technology-tags reveal">
          <span>Problem Solving</span>
          <span>Team Collaboration</span>
          <span>Web Development</span>
          <span>Database Management</span>
          <span>AI Tools</span>
          <span>Cloud Computing</span>
          <span>Virtual Reality Research</span>
        </div>
      </section>

      {/* CERTIFICATIONS */}

      <section className="section certification-section" id="certifications">
        <div className="section-heading reveal">
          <span className="section-index">04 — ACHIEVEMENTS</span>
          <h2>
            Learning never <span>stops.</span>
          </h2>
        </div>

        <div className="certification-grid">
          <div className="certificate-card reveal certificate-card-featured">
            <span className="certificate-number">01</span>
            <div className="portfolio-media certificate-media">
              <img
                src="/portfolio-media/nptel-cloud-certificate.webp"
                alt="NPTEL Cloud Computing online certification awarded to Deepak Krishna MS"
                loading="lazy"
              />
              <span className="media-caption">NPTEL · JAN–APR 2026</span>
            </div>
            <div className="certificate-icon">◈</div>
            <span className="certificate-type">NPTEL CERTIFICATION</span>
            <h3>Cloud Computing</h3>
            <p>
              Completed the NPTEL Cloud Computing course, gaining
              knowledge of cloud architecture, services, and
              fundamental cloud technologies.
            </p>
          </div>

          <div className="certificate-card reveal">
            <span className="certificate-number">02</span>
            <div className="certificate-icon">⌘</div>
            <span className="certificate-type">CERTIFICATION</span>
            <h3>Cybersecurity</h3>
            <p>
              Completed cybersecurity certification training covering
              security concepts and fundamentals.
            </p>
          </div>

          <div className="certificate-card reveal">
            <span className="certificate-number">03</span>
            <div className="certificate-icon">◉</div>
            <span className="certificate-type">CERTIFICATION</span>
            <h3>Cloud Computing</h3>
            <p>
              Completed additional cloud computing training covering
              cloud services and essential concepts.
            </p>
          </div>

          <div className="certificate-card reveal">
            <span className="certificate-number">04</span>
            <div className="certificate-icon">✳</div>
            <span className="certificate-type">INTERNSHIP</span>
            <h3>AI Internship</h3>
            <p>
              Completed a three-month online internship focused on
              Artificial Intelligence.
            </p>
          </div>

        </div>
      </section>

      {/* RECOGNITION / AWARD */}

      <section className="section award-section" id="awards">
        <div className="section-heading reveal">
          <span className="section-index">05 — RECOGNITION</span>
          <h2>
            A moment worth <span>remembering.</span>
          </h2>
          <p>
            Recognised with second prize for AI Prompt Generation.
          </p>
        </div>

        <div className="award-showcase reveal">
          <div className="award-photo-wrap">
            <div className="award-photo-glow"></div>
            <img
              src="/portfolio-media/ai-prompt-award.webp"
              alt="Deepak Krishna receiving the second prize certificate for AI Prompt Generation"
              loading="lazy"
            />
            <span className="award-photo-label">AWARD PRESENTATION · 2026</span>
          </div>

          <div className="award-copy">
            <span className="award-kicker">COMPETITION ACHIEVEMENT</span>
            <div className="award-trophy" aria-hidden="true">✦</div>
            <h3>Second Prize</h3>
            <h4>AI Prompt Generation</h4>
            <p>
              Received second prize in an AI Prompt Generation competition,
              recognising creativity and the effective use of AI prompts.
            </p>
            <div className="award-tags">
              <span>Artificial Intelligence</span>
              <span>Prompt Engineering</span>
              <span>Recognition</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}

      <section className="section projects-section" id="projects">
        <div className="section-heading reveal">
          <span className="section-index">06 — SELECTED WORK</span>
          <h2>
            Things I've <span>created.</span>
          </h2>
          <p>
            Academic and personal projects I've worked on.
          </p>
        </div>

        <div className="projects-grid">
          <article className="project-card">
            <div className="project-top">
              <span>01 / MCA PROJECT</span>
              <span className="project-arrow">↗</span>
            </div>

            <div className="project-icon">✳</div>
            <div className="portfolio-media project-media">
              <img
                src="/portfolio-media/smart-event-management.webp"
                alt="Smart Event Management System sign-in page"
                loading="lazy"
              />
              <span className="media-caption">PROJECT INTERFACE</span>
            </div>
            <h3>Smart Event Management System</h3>

            <p>
              A web-based event management platform that allows
              administrators to manage organizers, events, and
              participants. Organizers can manage events and programs,
              while participants can explore and register for events.
            </p>

            <div className="project-tech">
              <span>Laravel</span>
              <span>PHP</span>
              <span>MySQL</span>
              <span>JavaScript</span>
            </div>
          </article>

          <article className="project-card">
            <div className="project-top">
              <span>02 / BCA PROJECT</span>
              <span className="project-arrow">↗</span>
            </div>

            <div className="project-icon">✈</div>
            <div className="portfolio-media project-media">
              <img
                src="/portfolio-media/travel-buddy-project.webp"
                alt="Travel Buddy trip planning website interface"
                loading="lazy"
              />
              <span className="media-caption">PROJECT INTERFACE</span>
            </div>
            <h3>Travel Planner with Buddy Finder</h3>

            <p>
              An academic project designed to help users plan their
              trips and discover travel companions with similar
              destinations and travel interests. The concept combines
              travel planning with social connectivity.
            </p>

            <div className="project-tech">
              <span>Travel Planning</span>
              <span>Buddy Finder</span>
              <span>Web Development</span>
            </div>
          </article>

          <article className="project-card">
            <div className="project-top">
              <span>03 / WEB DEVELOPMENT PROJECT</span>
              <a
                className="project-arrow project-external-link"
                href="https://github.com/deepakkrishna341-pixel/KERALA.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Kerala Tourism Guide source code on GitHub"
                title="View source on GitHub"
              >
                ↗
              </a>
            </div>

            <div className="project-icon">⌖</div>
            <h3>Kerala Tourism Guide</h3>

            <p>
              A responsive, district-wise tourism guide created to help
              international visitors explore Kerala. It covers all 14
              districts with dedicated guides to local attractions,
              regional food, hotels, culture, lifestyle, activities,
              livelihoods and practical travel tips. Visitors can search
              district cards and move between district guides with ease.
            </p>

            <div className="project-tech">
              <span>HTML5</span>
              <span>CSS3</span>
              <span>JavaScript</span>
              <span>Responsive Design</span>
            </div>

            <a
              className="project-repo-link"
              href="https://keralasss.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live Demo <span aria-hidden="true">↗</span>
            </a>

            <a
              className="project-repo-link"
              href="https://github.com/deepakkrishna341-pixel/KERALA.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source on GitHub <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="project-card">
            <div className="project-top">
              <span>04 / PERSONAL PROJECT</span>
              <span className="project-arrow">↗</span>
            </div>

            <div className="project-icon">◎</div>
            <h3>Personal Portfolio</h3>

            <p>
              A personal portfolio website showcasing my education,
              technical skills, achievements, research interests,
              and development projects. Built with React and animated
              using GSAP.
            </p>

            <div className="project-tech">
              <span>React</span>
              <span>Three.js</span>
              <span>GSAP</span>
              <span>Lenis</span>
            </div>
          </article>
        </div>
      </section>

      {/* RESEARCH */}

      <section className="section research-section" id="research">
        <div className="section-heading reveal">
          <span className="section-index">07 — RESEARCH</span>
          <h2>
            Exploring <span>new dimensions.</span>
          </h2>
          <p>
            Exploring immersive technologies and their applications
            in education and professional skill development.
          </p>
        </div>

        <div className="research-intro reveal">
          <div className="research-number">01</div>

          <div>
            <span className="research-category">
              MAIN RESEARCH DOMAIN
            </span>

            <h3>Virtual Reality in Education and Skill Training</h3>

            <p>
              My research interest focuses on how Virtual Reality (VR)
              can transform traditional learning and practical skill
              development. VR creates immersive, interactive
              environments where learners can explore concepts,
              practice tasks, and experience realistic scenarios.
            </p>

            <div className="research-tags">
              <span>Virtual Reality</span>
              <span>Immersive Learning</span>
              <span>Education</span>
              <span>Skill Development</span>
            </div>
          </div>
        </div>

        <div className="research-image-card reveal">
          <div className="research-image">
            <img
              src="https://research.smu.edu.sg/sites/research.smu.edu.sg/files/news/VR%20Classroom.jpg"
              alt="Students using virtual reality headsets in an educational classroom"
              loading="lazy"
            />
          </div>

          <div className="research-image-caption">
            <span>VIRTUAL REALITY IN EDUCATION</span>
            <p>
              Immersive learning environments allow students to
              interact with digital experiences beyond traditional
              classroom methods.
            </p>
          </div>
        </div>

        <div className="research-subdomain reveal">
          <div className="research-subdomain-content">
            <span className="research-category">
              RESEARCH SUBDOMAIN
            </span>

            <h3>Virtual Reality in Pilot Training</h3>

            <p>
              This research explores the use of Virtual Reality as a
              training method for beginner-level instrument pilots.
              VR-based flight simulation provides an immersive
              environment in which trainees can practice flight-related
              skills without depending entirely on real aircraft.
            </p>

            <p>
              The study compares VR-based training, PC-based training,
              and a control group to understand how immersive
              technologies influence pilot training performance.
            </p>

            <div className="research-tags">
              <span>Pilot Training</span>
              <span>Flight Simulation</span>
              <span>VR Technology</span>
              <span>Performance Evaluation</span>
            </div>
          </div>

          <div className="research-image research-pilot-image">
            <img
              src="https://cdn.halldale.com/files/2025/07/85934f00-6996-11f0-88d6-e729fe961729-CAT-SF-article-for-28-July-_1.jpg"
              alt="Trainee using a virtual reality headset in a flight simulator cockpit"
              loading="lazy"
            />
          </div>
        </div>

        <div className="research-findings reveal">
          <span className="research-category">STUDY OVERVIEW</span>
          <h3>Understanding the Research</h3>

          <div className="research-stats">
            <div>
              <strong>120</strong>
              <span>Beginning-level instrument pilots</span>
            </div>

            <div>
              <strong>42</strong>
              <span>VR training group</span>
            </div>

            <div>
              <strong>30</strong>
              <span>PC-based training group</span>
            </div>

            <div>
              <strong>48</strong>
              <span>Control group</span>
            </div>
          </div>

          <div className="research-description">
            <h4>Research Methodology</h4>

            <p>
              The study used pre-test and post-test assessments to
              examine training performance. Participants in the VR
              and PC-based groups completed three practice sessions.
              Performance was evaluated using altitude, airspeed,
              and cross-track distance accuracy.
            </p>

            <h4>Key Findings</h4>

            <p>
              The results indicated improvements in altitude and
              cross-track distance accuracy for the VR and
              PC-based training groups compared with the control
              group. Airspeed accuracy did not show a statistically
              significant difference.
            </p>

            <p>
              These findings highlight the potential of VR as a
              supplementary tool for pilot training and practical
              skill development.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          TECHNOLOGY JOURNEY / ANIMATED ILLUSTRATIONS
      ========================================= */}

      <section className="section technology-section" id="technology">
        <div className="section-heading reveal">
          <span className="section-index">08 — MY TECHNOLOGY JOURNEY</span>

          <h2>
            Learning. Building. <span>Exploring.</span>
          </h2>

          <p>
            A visual journey through my internship, certifications,
            research interests, and academic projects.
          </p>
        </div>

        <div className="illustration-showcase">

          <SectionIllustration
            type="internship"
            title="AI Internship"
            description="Three-month online internship focused on Artificial Intelligence and practical AI applications."
          />

          <SectionIllustration
            type="ai"
            title="Artificial Intelligence"
            description="Exploring AI technologies, intelligent systems, and prompt engineering."
          />

          <SectionIllustration
            type="cloud"
            title="Cloud Computing"
            description="NPTEL Cloud Computing certification and learning about cloud infrastructure."
          />

          <SectionIllustration
            type="security"
            title="Cybersecurity"
            description="Cybersecurity certification and an interest in digital security."
          />

          <SectionIllustration
            type="vr"
            title="Virtual Reality Research"
            description="Research interest in virtual reality applications in education and skill training."
          />

          <SectionIllustration
            type="pilot"
            title="VR in Pilot Training"
            description="Exploring immersive flight simulation and its applications in pilot training."
          />

          <SectionIllustration
            type="event"
            title="Smart Event Management"
            description="Laravel-based project for managing events, organizers, programs, and participant registrations."
          />

          <SectionIllustration
            type="travel"
            title="Travel Planner with Buddy Finder"
            description="BCA project concept combining travel planning and finding compatible travel companions."
          />

        </div>
      </section>

      {/* CONTACT */}

      <section className="section contact-section" id="contact">
        <div className="section-heading reveal">
          <span className="section-index">09 — GET IN TOUCH</span>

          <h2>
            Have a project?
            <br />
            <span>Let's talk.</span>
          </h2>

          <p>
            Have an opportunity, idea, or just want to connect?
            Send me a message.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-details reveal">
            <h3>Let's start a conversation.</h3>

            <p>
              I'm always interested in learning, collaborating,
              and exploring new opportunities.
            </p>

            <div className="contact-detail">
              <span>✉</span>

              <div>
                <small>EMAIL</small>
                <a href="mailto:deepakkrishna341@gmail.com">
                  deepakkrishna341@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-detail">
              <span>⌖</span>

              <div>
                <small>LOCATION</small>
                <p>Idukki, Kerala, India</p>
              </div>
            </div>

            <div className="contact-social-block">
              <span className="social-heading">CONNECT WITH ME</span>
              <SocialLinks variant="contact-social-icons" />
            </div>
          </div>

          <form
            className="contact-form reveal"
            action="https://formsubmit.co/deepakkrishna341@gmail.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_subject"
              value="New message from your portfolio!"
            />

            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />

            <label htmlFor="name">YOUR NAME</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              autoComplete="name"
              required
            />

            <label htmlFor="email">YOUR EMAIL</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <label htmlFor="message">YOUR MESSAGE</label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message..."
              required
            ></textarea>

            <button type="submit" className="button button-light">
              Send Message <span>↗</span>
            </button>
          </form>
        </div>
      </section>

      </main>

      {/* FOOTER */}

      <footer className="footer">
        <a href="#home" className="brand-logo">
          <span className="brand-symbol">
            <span>D</span>
            <span>K</span>
          </span>

          <span className="brand-name">
            DEEPAK<span>.</span>
          </span>
        </a>

        <p>Designed & developed by Deepak Krishna.</p>

        <SocialLinks variant="footer-social-icons" />

        <a href="#home" className="back-to-top">
          BACK TO TOP ↑
        </a>

        <small>
          © {new Date().getFullYear()} Deepak Krishna. All rights reserved.
        </small>
      </footer>

      <a
        href="#contact"
        className="floating-contact"
        aria-label="Contact me"
      >
        ↗
      </a>
    </div>
  );
}

export default App;