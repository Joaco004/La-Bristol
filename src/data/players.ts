import type { Player } from '../types';
import joaco from '../assets/joaco.png';
import mate from '../assets/mate.jpeg';
import toto from '../assets/toto.jpg';
import parra from '../assets/parra.jpeg';
import uri from '../assets/uri.jpeg';
import santi from '../assets/santi.jpg';
import juan from '../assets/juan.jpg';
import pepe from '../assets/pepe.png';
import mati from '../assets/mati.jpg';
import agus from '../assets/agus.png';
import pacho from '../assets/pacho.png';
import maxi from '../assets/maxi.jpg';

const players: Player[] = [
  {
    id: 'joaco',
    nickname: 'el acompañante',
    realName: 'Joaquin Garinei',
    role: 'Entry Fragger',
    game: 'R6, CS2, TFT, FIFA, COD, Clash',
    bio: 'Líder estratégico del equipo con más de 8 años en la escena competitiva. Conocido por su capacidad de enojo facil y putear sin parar.',
    traits: ['Liderazgo táctico', 'Comunicación bajo presión', 'Visión de mapa completa', 'Adaptabilidad mid-round'],
    stats: { kd: 1.48, winrate: 64, hoursPlayed: 4200, tournamentsPlayed: 47 },
    image: joaco,
  },
  {
    id: 'toto',
    nickname: 'el pasajero',
    realName: 'Tomas Villegas',
    role: 'Camper',
    game: 'CS2, LOL, R6, Minecraft, TFT, COD',
    bio: 'El francotirador del equipo. Su precisión con la AWP es legendaria en la región. Capaz de quedarse toda la partida campeando.',
    traits: ['Precisión extrema', 'Control de ángulos', 'BOT', 'Tranquilidad'],
    stats: { kd: 0.80, winrate: 61, hoursPlayed: 5800, tournamentsPlayed: 39 },
    image: toto,
  },
  {
    id: 'uri',
    nickname: 'el gordo ramon',
    realName: 'Uriel Agliani',
    role: 'AWper',
    game: 'CS2, Minecraft, FIFA, Fortnite, Clash',
    bio: 'El gordo usa el AWP como un puto dios, ademas de ser la maldita cabra del equipo.',
    traits: ['Utility mastery', 'Sacrificio estratégico', 'Game sense', 'Comunicación constante'],
    stats: { kd: 1.85, winrate: 66, hoursPlayed: 3900, tournamentsPlayed: 52 },
    image: uri,
  },
  {
    id: 'mati',
    nickname: 'el chofer',
    realName: 'Matias Mingarini',
    role: 'Support',
    game: 'CS2, FIFA, Fortnite, Clash, PORNHUB',
    bio: 'El hombre que abre las puertas. Surge entra primero en cada ronda, creando espacio para el equipo. Se suma a los calentones y amanete del porno gay.',
    traits: ['Agressividad controlada', 'Velocidad de reacción', 'Aperturas consistentes', 'Resistencia mental'],
    stats: { kd: 1.28, winrate: 59, hoursPlayed: 4600, tournamentsPlayed: 41 },
    image: mati,
  },
  {
    id: 'nacho',
    nickname: 'RYUKIN GOLDFISH',
    realName: 'Nachito Tosi',
    role: 'Lurker',
    game: 'CS2, Minecraft, FIFA, Clash, Fortnite',
    bio: 'El fantasma del equipo. ECH0 opera en solitario creando presión desde ángulos inesperados. Su capacidad de lectura del mapa y timing son su mayor arma.',
    traits: ['Movimiento silencioso', 'Timing perfecto', 'Rotaciones inesperadas', 'Información táctica'],
    stats: { kd: 1.35, winrate: 63, hoursPlayed: 5100, tournamentsPlayed: 44 },
    image: pacho,
  },
  {
    id: 'parra',
    nickname: 'el mismisimo',
    realName: 'Santino Parra',
    role: 'GOAT',
    game: 'CS2, R6, Minecraft, FIFA, Clash, Fortnite',
    bio: 'La cabra serena del equipo encargado de tranquilizar las aguas y ponerse el equipo al hombro.',
    traits: ['Movimiento silencioso', 'Timing perfecto', 'Rotaciones inesperadas', 'Información táctica'],
    stats: { kd: 1.35, winrate: 63, hoursPlayed: 5100, tournamentsPlayed: 44 },
    image: parra,
  },
  {
    id: 'mate',
    nickname: 'Ronaldinho Gaucho',
    realName: 'Mateo Sotnyk',
    role: 'Lurker',
    game: 'R6, CS2, TFT, FIFA, COD, Minecraft, Fortnite, Clash, RL',
    bio: 'El más encendido del equipo. Cuando las cosas van mal, explota; cuando van bien, también. Su habilidad mecánica es innegable, pero primero tenés que sobrevivir a sus gritos.',
    traits: ['Aim instintivo', 'Reacciones de élite', 'Tilt instantáneo', 'Clutch en modo furia'],
    stats: { kd: 1.61, winrate: 58, hoursPlayed: 3100, tournamentsPlayed: 31 },
    image: mate,
  },
  {
    id: 'juan',
    nickname: 'La-Iguanita',
    realName: 'Juan Araujo',
    role: 'Support',
    game: 'R6, CS2, FIFA',
    bio: 'Una contradicción andante: puede ir de cero a cien en dos segundos y volver a la calma total en uno. Piensa cada movimiento mientras insulta al equipo, y casi siempre tiene razón.',
    traits: ['Pensamiento táctico', 'Temperamento impredecible', 'Lectura de juego lenta pero precisa', 'Calma post-tilt'],
    stats: { kd: 1.29, winrate: 61, hoursPlayed: 2800, tournamentsPlayed: 28 },
    image: juan,
  },
  {
    id: 'agus',
    nickname: 'Fernando de stake',
    realName: 'Agustin Garinei',
    role: 'AWPer',
    game: 'R6, CS2, FIFA, COD, RL, Fortnite, PORNHUB',
    bio: 'No sabe bien dónde está, no sabe bien qué hacer, pero si algo se le cruza por la mira, está muerto. Su AIM compensa años de desorientación táctica a al hora de analizar anos.',
    traits: ['Aim mecánico brutal', 'Rotaciones cuestionables', 'Posicionamiento a la suerte', 'Headshots involuntarios'],
    stats: { kd: 1.54, winrate: 52, hoursPlayed: 2400, tournamentsPlayed: 22 },
    image: agus,
  },
  {
    id: 'pedro',
    nickname: 'pedrito azucar',
    realName: 'Pedro Ferreyra',
    role: 'IGL',
    game: 'R6, CS2, TFT, FIFA, COD, Fortnite',
    bio: 'Nadie sabe si está jugando en serio o trolleando, y él tampoco. La mitad de sus jugadas parecen un meme y la otra mitad son geniales por accidente. El caos personificado.',
    traits: ['Creatividad sin límites', 'Decisiones impredecibles', 'Moral del equipo en alza', 'Trolleo de alto nivel'],
    stats: { kd: 0.98, winrate: 49, hoursPlayed: 1900, tournamentsPlayed: 19 },
    image: pepe,
  },
  {
    id: 'santicass',
    nickname: 'Santycass',
    realName: 'Santiago Castro',
    role: 'Rifler',
    game: 'R6, CS2, TFT, LOL, F1, FIFA, Clash',
    bio: 'El cerebro frío del equipo. Mientras todos gritan, él ya procesó tres escenarios posibles y eligió el correcto. Su calma desespera tanto a los rivales como a sus propios compañeros.',
    traits: ['IQ táctico fuera de escala', 'Gestión del tiempo perfecta', 'Nunca tilteado', 'Siempre un paso adelante'],
    stats: { kd: 1.42, winrate: 68, hoursPlayed: 3600, tournamentsPlayed: 41 },
    image: santi,
  },
  {
    id: 'maxi',
    nickname: 'Maxiard',
    realName: 'Maximiliano Ruiz Diaz',
    role: 'Sentinel',
    game: 'R6, CS2, Battlefield, COD, Fortnite',
    bio: 'Tiene el cerebro para ganar cualquier round y el corazón para cagarse en el momento crítico. Su análisis pre-ronda es impecable; su ejecución bajo presión, otra historia. Y ademas es el numero 1 del porno',
    traits: ['Inteligencia táctica alta', 'Nervios en clutch', 'Planificación detallada', 'Tranquilidad hasta que importa'],
    stats: { kd: 1.21, winrate: 55, hoursPlayed: 2600, tournamentsPlayed: 25 },
    image: maxi,
  },
];

export default players;
