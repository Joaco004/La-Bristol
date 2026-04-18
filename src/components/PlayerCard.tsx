import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import type { Player } from '../types';
import styles from './PlayerCard.module.css';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const initials = player.nickname.slice(0, 2).toUpperCase();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationY: x * 14,
      rotationX: -y * 14,
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (glowRef.current) {
      glowRef.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      glowRef.current.style.setProperty('--my', `${(y + 0.5) * 100}%`);
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    });
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={() => navigate(`/team/${player.id}`)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glowRef} className={styles.mouseGlow} />
      <div className={styles.topBar} />
      <div className={styles.avatar}>
        {player.image
          ? <img src={player.image} alt={player.nickname} className={styles.avatarImg} />
          : <span className={styles.initials}>{initials}</span>
        }
      </div>
      <div className={styles.info}>
        <h3 className={styles.nickname}>{player.nickname}</h3>
        <p className={styles.realName}>{player.realName}</p>
        <span className={styles.role}>{player.role}</span>
        <span className={styles.game}>{player.game}</span>
      </div>
      <div className={styles.arrow}>→</div>
    </div>
  );
};

export default PlayerCard;
