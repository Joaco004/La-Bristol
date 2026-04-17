import { useNavigate } from 'react-router-dom';
import { teamInfo, achievements } from '../data/team';
import players from '../data/players';
import products from '../data/products';
import PlayerCard from '../components/PlayerCard';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>E-Sports Team</div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroAccent}>{teamInfo.name}</span>
          </h1>
          <p className={styles.heroTagline}>{teamInfo.tagline}</p>
          <div className={styles.heroCtas}>
            <button className="btn-primary" onClick={() => navigate('/team')}>
              Conocé al equipo
            </button>
            <button className="btn-outline" onClick={() => navigate('/merch')}>
              Ver merch
            </button>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span />
        </div>
      </section>

      {/* SOBRE EL EQUIPO */}
      <section className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLeft}>
              <h2 className="section-title">Sobre <span>nosotros</span></h2>
              <p className={styles.aboutText}>{teamInfo.description}</p>
            </div>
            <div className={styles.aboutLogoWrap}>
              <img src="/la-bristol-logo.png" alt="La Bristol" className={styles.aboutLogo} />
            </div>
            <div className={styles.aboutMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Fundación</span>
                <span className={styles.metaValue}>{teamInfo.founded}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Juegos</span>
                <span className={styles.metaValue}>{teamInfo.games.join(', ')}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Jugadores</span>
                <span className={styles.metaValue}>{players.length} activos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGROS */}
      <section className={`section ${styles.achievements}`}>
        <div className="container">
          <h2 className="section-title">Nuestros <span>logros</span></h2>
          <p className="section-subtitle">Resultados que hablan por sí solos</p>
          <div className={styles.statsGrid}>
            {achievements.map((ach) => (
              <div key={ach.label} className={styles.statCard}>
                <span className={styles.statIcon}>{ach.icon}</span>
                <span className={styles.statValue}>{ach.value}</span>
                <span className={styles.statLabel}>{ach.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW JUGADORES */}
      <section className={`section ${styles.playersSection}`}>
        <div className="container">
          <h2 className="section-title">Nuestro <span>roster</span></h2>
          <p className="section-subtitle">Los guerreros detrás de NOVA</p>
          <div className={styles.playersGrid}>
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
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
              <p className="section-subtitle">Representá a NOVA en la cancha y fuera de ella</p>
            </div>
            <button className="btn-outline" onClick={() => navigate('/merch')}>
              Ver todo
            </button>
          </div>
          <div className={styles.merchGrid}>
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className={styles.merchCard}>
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
