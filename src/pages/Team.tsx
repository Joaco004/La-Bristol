import players from '../data/players';
import PlayerCard from '../components/PlayerCard';
import styles from './Team.module.css';

const Team = () => {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className={styles.eyebrow}>◈ Roster Oficial</p>
          <h1 className="section-title">Nuestro <span>equipo</span></h1>
          <p className="section-subtitle">
            Cinco jugadores. Una sola mente. El roster que representa a La Bristol en cada torneo.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;
