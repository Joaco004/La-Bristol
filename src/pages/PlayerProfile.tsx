import { useParams, useNavigate } from 'react-router-dom';
import players from '../data/players';
import styles from './PlayerProfile.module.css';

const PlayerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const player = players.find((p) => p.id === id);

  if (!player) {
    return (
      <main className={styles.notFound}>
        <div className="container">
          <h2>Jugador no encontrado</h2>
          <button className="btn-primary" onClick={() => navigate('/team')}>
            Volver al equipo
          </button>
        </div>
      </main>
    );
  }

  const initials = player.nickname.slice(0, 2).toUpperCase();

  return (
    <main className={`${styles.page}${player.photo ? ` ${styles.hasBg}` : ''}`}>
      {player.photo && (
        <>
          <img src={player.photo} alt="" aria-hidden className={styles.pageBg} style={{ objectPosition: player.photoPosition ?? 'center center' }} />
          <div className={styles.pageBgOverlay} />
        </>
      )}
      <div className={styles.topBar}>
        <div className="container">
          <button className={styles.back} onClick={() => navigate('/team')}>
            ← Volver al equipo
          </button>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {player.image
                ? <img src={player.image} alt={player.nickname} className={styles.avatarImg} />
                : <span className={styles.initials}>{initials}</span>
              }
            </div>
            <div className={styles.avatarGlow} />
          </div>

          <div className={styles.heroInfo}>
            <span className={styles.role}>{player.role}</span>
            <h1 className={styles.nickname}>{player.nickname}</h1>
            <p className={styles.realName}>{player.realName}</p>
            <span className={styles.game}>{player.game}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.content}`}>
          <div className={styles.mainCol}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Biografía</h2>
              <p className={styles.bio}>{player.bio}</p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Características</h2>
              <ul className={styles.traits}>
                {player.traits.map((trait) => (
                  <li key={trait} className={styles.trait}>
                    <span className={styles.traitDot}>◈</span> {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Estadísticas</h2>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{player.stats.kd}</span>
                  <span className={styles.statLabel}>K/D Ratio</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{player.stats.winrate}%</span>
                  <span className={styles.statLabel}>Win Rate</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{player.stats.hoursPlayed.toLocaleString()}</span>
                  <span className={styles.statLabel}>Horas Jugadas</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{player.stats.tournamentsPlayed}</span>
                  <span className={styles.statLabel}>Torneos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlayerProfile;
