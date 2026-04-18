import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import styles from './PageTransition.module.css';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.set(overlay, { scaleY: 1, transformOrigin: 'top center' });
    gsap.to(overlay, {
      scaleY: 0,
      duration: 0.65,
      ease: 'power4.inOut',
      delay: 0.04,
    });
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <div ref={overlayRef} className={styles.overlay} />
      {children}
    </div>
  );
};

export default PageTransition;
