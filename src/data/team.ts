import type { TeamInfo, Achievement } from '../types';

export const teamInfo: TeamInfo = {
  name: 'La Bristol',
  tagline: 'Born in the dark. Built to dominate.',
  founded: 2026,
  description:
    'La Bristol es un equipo de e-sports argentino fundado en 2026 con la misión de llevar el talento local a la élite competitiva internacional. Competimos en CS2 con una filosofía de equipo primero: la estrategia, la comunicación y el trabajo colectivo son nuestra mayor ventaja.',
  games: ['CS2', 'R6', 'Rocket League', 'LOL', 'TFT'],
  socials: {
    twitter: '#',
    instagram: '#',
    kick: '#',
    youtube: '#',
    discord: '#',
  },
};

export const achievements: Achievement[] = [
  { label: 'Torneos Jugados', value: 47, icon: '🏆' },
  { label: 'Victorias', value: 31, icon: '⚡' },
  { label: 'Ranking Regional', value: '#1', icon: '📊' },
  { label: 'Años Activos', value: 1, icon: '🔥' },
];
