import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoAccent}>◈LBRL</span> 
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
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Inicio</NavLink>
          <NavLink to="/team" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Equipo</NavLink>
          <NavLink to="/merch" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>Merch</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
