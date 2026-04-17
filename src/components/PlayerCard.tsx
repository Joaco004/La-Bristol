import { useNavigate } from 'react-router-dom';
import type { Player } from '../types';
import styles from './PlayerCard.module.css';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const navigate = useNavigate();

  const initials = player.nickname.slice(0, 2).toUpperCase();

  return (
    <div className={styles.card} onClick={() => navigate(`/team/${player.id}`)}>
      <div className={styles.avatar}>
        {player.image
          ? <img src={player.image} alt={player.nickname} className={styles.avatarImg} />
          : <span className={styles.initials}>{initials}</span>
        }
        <div className={styles.avatarGlow} />
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
