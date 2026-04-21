import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamInfo, achievements } from '../data/team';
import players from '../data/players';
import products from '../data/products';
import PlayerCard from '../components/PlayerCard';
import styles from './Home.module.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();

  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const playersGridRef = useRef<HTMLDivElement>(null);
  const merchGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance timeline ──────────────────────────────────
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(heroBadgeRef.current, {
        opacity: 0,
        y: -24,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Set title chars to initial rotated state (hover flips them to 0)
      const chars = heroTitleRef.current?.querySelectorAll('[data-char]');
      if (chars) {
        gsap.set(chars, { rotationX: 78, transformOrigin: 'center center' });
      }

      tl.from(
        heroTaglineRef.current,
        { opacity: 0, y: 28, duration: 0.65, ease: 'power3.out' },
        '-=0.45'
      );

      const ctaChildren = heroCtasRef.current
        ? Array.from(heroCtasRef.current.children)
        : [];
      if (ctaChildren.length) {
        tl.from(
          ctaChildren,
          { opacity: 0, y: 20, stagger: 0.12, duration: 0.55, ease: 'power3.out' },
          '-=0.35'
        );
      }

      tl.from(
        heroScrollRef.current,
        { opacity: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.1'
      );

      // ── About section ──────────────────────────────────────────
      if (aboutRef.current) {
        const aboutLeft = aboutRef.current.querySelector('[data-about-left]');
        const aboutLogo = aboutRef.current.querySelector('[data-about-logo]');
        const aboutMeta = aboutRef.current.querySelectorAll('[data-meta]');

        gsap.from(aboutLeft, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: aboutLeft, start: 'top 82%', once: true },
        });

        gsap.from(aboutLogo, {
          opacity: 0,
          scale: 0.8,
          rotation: -8,
          duration: 0.9,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: aboutLogo, start: 'top 82%', once: true },
        });

        gsap.from(aboutMeta, {
          opacity: 0,
          x: 40,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: aboutMeta[0], start: 'top 85%', once: true },
        });
      }

      // ── Stats countup ──────────────────────────────────────────
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll('[data-stat-card]');
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          scale: 0.92,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
        });

        const countEls = statsRef.current.querySelectorAll('[data-count]');
        countEls.forEach((el) => {
          const target = parseFloat(el.getAttribute('data-count') || '0');
          if (isNaN(target)) return;
          const suffix = el.getAttribute('data-suffix') || '';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = Math.round(obj.val) + suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          });
        });
      }

      // ── Player cards cascade ───────────────────────────────────
      if (playersGridRef.current) {
        const cards = playersGridRef.current.querySelectorAll('[data-card]');
        gsap.from(cards, {
          opacity: 0,
          y: 55,
          scale: 0.88,
          stagger: { amount: 0.7, from: 'start' },
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: playersGridRef.current,
            start: 'top 78%',
            once: true,
          },
        });
      }

      // ── Merch cards ────────────────────────────────────────────
      if (merchGridRef.current) {
        const cards = merchGridRef.current.querySelectorAll('[data-card]');
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: { amount: 0.5, from: 'start' },
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: merchGridRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleTitleEnter = () => {
    const chars = heroTitleRef.current?.querySelectorAll('[data-char]');
    if (!chars) return;
    gsap.to(chars, {
      rotationX: 0,
      stagger: { amount: 0.3, from: 'start' },
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleTitleLeave = () => {
    const chars = heroTitleRef.current?.querySelectorAll('[data-char]');
    if (!chars) return;
    gsap.to(chars, {
      rotationX: 78,
      stagger: { amount: 0.22, from: 'end' },
      duration: 0.5,
      ease: 'power2.in',
      overwrite: 'auto',
    });
  };

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={`container ${styles.heroContent}`}>
          <div ref={heroBadgeRef} className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            E-Sports Team · Argentina
          </div>
          <h1
            ref={heroTitleRef}
            className={styles.heroTitle}
            onMouseEnter={handleTitleEnter}
            onMouseLeave={handleTitleLeave}
          >
             <span className={styles.heroWord}>
              {'La'.split('').map((char, i) => (
                <span key={`a${i}`} data-char className={styles.heroChar}>
                  {char}
                </span>
              ))}
            </span>
            <span className={styles.heroSpace}>{' '}</span>
            <span className={styles.heroWord}>
              {'Bristol'.split('').map((char, i) => (
                <span key={`b${i}`} data-char className={`${styles.heroChar} ${styles.heroCharAccent}`}>
                  {char}
                </span>
              ))}
            </span>
          </h1>
          <p ref={heroTaglineRef} className={styles.heroTagline}>{teamInfo.tagline}</p>
          <div ref={heroCtasRef} className={styles.heroCtas}>
            <button className="btn-primary" onClick={() => navigate('/team')}>
              Conocé al equipo
            </button>
            <button className="btn-outline" onClick={() => navigate('/merch')}>
              Ver merch
            </button>
          </div>
        </div>
        <div ref={heroScrollRef} className={styles.heroScroll}>
          <span />
        </div>
      </section>

      {/* SOBRE EL EQUIPO */}
      <section ref={aboutRef} className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div data-about-left className={styles.aboutLeft}>
              <h2 className="section-title">Sobre <span>nosotros</span></h2>
              <p className={styles.aboutText}>{teamInfo.description}</p>
            </div>
            <div data-about-logo className={styles.aboutLogoWrap}>
              <img src="/la-bristol-logo.png" alt="La Bristol" className={styles.aboutLogo} />
              <div className={styles.aboutLogoRing} />
            </div>
            <div className={styles.aboutMeta}>
              {[
                { label: 'Fundación', value: teamInfo.founded },
                { label: 'Juegos', value: teamInfo.games.join(', ') },
                { label: 'Jugadores', value: `${players.length} activos` },
              ].map((item) => (
                <div key={item.label} data-meta className={styles.metaItem}>
                  <span className={styles.metaLabel}>{item.label}</span>
                  <span className={styles.metaValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOGROS */}
      <section className={`section ${styles.achievements}`}>
        <div className="container">
          <h2 className="section-title">Nuestros <span>logros</span></h2>
          <p className="section-subtitle">Resultados que hablan por sí solos</p>
          <div ref={statsRef} className={styles.statsGrid}>
            {achievements.map((ach) => {
              const isNum = typeof ach.value === 'number';
              return (
                <div key={ach.label} data-stat-card className={styles.statCard}>
                  <span className={styles.statIcon}>{ach.icon}</span>
                  {isNum ? (
                    <span
                      className={styles.statValue}
                      data-count={ach.value}
                      data-suffix=""
                    >
                      0
                    </span>
                  ) : (
                    <span className={styles.statValue}>{ach.value}</span>
                  )}
                  <span className={styles.statLabel}>{ach.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREVIEW JUGADORES */}
      <section className={`section ${styles.playersSection}`}>
        <div className="container">
          <h2 className="section-title">Nuestro <span>roster</span></h2>
          <p className="section-subtitle">Los guerreros detrás de La Bristol</p>
          <div ref={playersGridRef} className={styles.playersGrid}>
            {players.map((player) => (
              <div key={player.id} data-card>
                <PlayerCard player={player} />
              </div>
            ))}
          </div>
          <div className={styles.seeAll}>
            <button className="btn-outline" onClick={() => navigate('/team')}>
              Ver perfil completo
            </button>
          </div>
        </div>
      </section>

      {/* PREVIEW MERCH */}
      <section className={`section ${styles.merchSection}`}>
        <div className="container">
          <div className={styles.merchHeader}>
            <div>
              <h2 className="section-title">Nuestra <span>tienda</span></h2>
              <p className="section-subtitle">Representá a La Bristol en la cancha y fuera de ella</p>
            </div>
            <button className="btn-outline" onClick={() => navigate('/merch')}>
              Ver todo
            </button>
          </div>
          <div ref={merchGridRef} className={styles.merchGrid}>
            {products.slice(0, 4).map((product) => (
              <div key={product.id} data-card className={styles.merchCard}>
                <div className={styles.merchImg}>
                  <span className={styles.merchEmoji}>
                    {product.category === 'Ropa' ? '👕' : product.category === 'Gaming' ? '🖱️' : '🎩'}
                  </span>
                </div>
                <div className={styles.merchInfo}>
                  <p className={styles.merchName}>{product.name}</p>
                  <p className={styles.merchPrice}>${product.price.toLocaleString('es-AR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
