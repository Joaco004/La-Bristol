import { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard';
import type { Player } from '../types';
import styles from './Team.module.css';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const Team = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/api/players`)
      .then((r) => { if (!r.ok) throw new Error('Error al cargar jugadores'); return r.json(); })
      .then(setPlayers)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

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
          {loading && <p className={styles.status}>Cargando jugadores...</p>}
          {error && <p className={styles.statusError}>{error}</p>}
          {!loading && !error && (
            <div className={styles.grid}>
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Team;
