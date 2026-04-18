import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      });
      const links = navRef.current?.querySelectorAll('nav a');
      if (links) {
        gsap.from(links, {
          opacity: 0,
          y: -16,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.5,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={navRef} className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src="/la-bristol-logo.png" alt="La Bristol" className={styles.logoImg} />
          <span className={styles.logoText}>LA <span className={styles.logoAccent}>BRISTOL</span></span>
        </Link>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>
            <span className={styles.linkInner}>Inicio</span>
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>
            <span className={styles.linkInner}>Equipo</span>
          </NavLink>
          <NavLink to="/merch" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} onClick={closeMenu}>
            <span className={styles.linkInner}>Merch</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
