import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from './models/Admin.js';
import { Product } from './models/Product.js';
import { Player } from './models/Player.js';

const PRODUCTS = [
  { id: 'tshirt-black', name: 'Remera Oficial LBRL', price: 4500, category: 'Ropa', description: 'Remera negra con logo NOVA bordado. 100% algodón premium.', images: [] },
  { id: 'hoodie-nova', name: 'Buzo LBRL Gaming', price: 8900, category: 'Ropa', description: 'Buzo con capucha, logo frente y espalda. Tela fleece premium.', images: [] },
  { id: 'cap-nova', name: 'Gorra LBRL Snapback', price: 3200, category: 'Accesorios', description: 'Gorra snapback ajustable con bordado 3D del logo.', images: [] },
  { id: 'mousepad-xl', name: 'Mousepad XL LBRL', price: 2800, category: 'Gaming', description: 'Mousepad extendido 90x40cm. Superficie de control premium.', images: [] },
  { id: 'tshirt-white', name: 'Remera LBRL Blanca', price: 4500, category: 'Ropa', description: 'Remera blanca edición especial. Logo en tono oscuro.', images: [] },
  { id: 'hoodie-zip', name: 'Buzo Zippado LBRL', price: 9500, category: 'Ropa', description: 'Buzo con cierre central. Bolsillos laterales. Logo en pecho.', images: [] },
  { id: 'sticker-pack', name: 'Pack de Stickers', price: 800, category: 'Accesorios', description: '10 stickers holográficos con logos y diseños del equipo.', images: [] },
  { id: 'mousepad-desk', name: 'Deskpad LBRL Pro', price: 5500, category: 'Gaming', description: 'Deskpad de escritorio 120x60cm. Base antideslizante.', images: [] },
];

const PLAYERS = [
  { id: 'joaco', nickname: 'el acompañante', realName: 'Joaquin Garinei', role: 'Entry Fragger', game: 'R6, CS2, TFT, FIFA, COD, Clash', bio: 'Líder estratégico del equipo con más de 8 años en la escena competitiva. Conocido por su capacidad de enojo facil y putear sin parar.', traits: ['Liderazgo táctico', 'Comunicación bajo presión', 'Visión de mapa completa', 'Adaptabilidad mid-round'], stats: { kd: 1.48, winrate: 64, hoursPlayed: 4200, tournamentsPlayed: 47 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'toto', nickname: 'el pasajero', realName: 'Tomas Villegas', role: 'Camper', game: 'CS2, LOL, R6, Minecraft, TFT, COD', bio: 'El francotirador del equipo. Su precisión con la AWP es legendaria en la región. Capaz de quedarse toda la partida campeando.', traits: ['Precisión extrema', 'Control de ángulos', 'BOT', 'Tranquilidad'], stats: { kd: 0.80, winrate: 61, hoursPlayed: 5800, tournamentsPlayed: 39 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'uri', nickname: 'el gordo ramon', realName: 'Uriel Agliani', role: 'AWper', game: 'CS2, Minecraft, FIFA, Fortnite, Clash', bio: 'El gordo usa el AWP como un puto dios, ademas de ser la maldita cabra del equipo.', traits: ['Utility mastery', 'Sacrificio estratégico', 'Game sense', 'Comunicación constante'], stats: { kd: 1.85, winrate: 66, hoursPlayed: 3900, tournamentsPlayed: 52 }, image: '', photo: '', photoPosition: 'center 30%' },
  { id: 'mati', nickname: 'el chofer', realName: 'Matias Mingarini', role: 'Support', game: 'CS2, FIFA, Fortnite, Clash, PORNHUB', bio: 'El hombre que abre las puertas. Surge entra primero en cada ronda, creando espacio para el equipo. Se suma a los calentones y amanete del porno gay.', traits: ['Agressividad controlada', 'Velocidad de reacción', 'Aperturas consistentes', 'Resistencia mental'], stats: { kd: 1.28, winrate: 59, hoursPlayed: 4600, tournamentsPlayed: 41 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'nacho', nickname: 'RYUKIN GOLDFISH', realName: 'Nachito Tosi', role: 'Lurker', game: 'CS2, Minecraft, FIFA, Clash, Fortnite', bio: 'El fantasma del equipo. ECH0 opera en solitario creando presión desde ángulos inesperados. Su capacidad de lectura del mapa y timing son su mayor arma.', traits: ['Movimiento silencioso', 'Timing perfecto', 'Rotaciones inesperadas', 'Información táctica'], stats: { kd: 1.35, winrate: 63, hoursPlayed: 5100, tournamentsPlayed: 44 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'parra', nickname: 'el mismisimo', realName: 'Santino Parra', role: 'GOAT', game: 'CS2, R6, Minecraft, FIFA, Clash, Fortnite', bio: 'La cabra serena del equipo encargado de tranquilizar las aguas y ponerse el equipo al hombro.', traits: ['Movimiento silencioso', 'Timing perfecto', 'Rotaciones inesperadas', 'Información táctica'], stats: { kd: 1.35, winrate: 63, hoursPlayed: 5100, tournamentsPlayed: 44 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'mate', nickname: 'Ronaldinho Gaucho', realName: 'Mateo Sotnyk', role: 'Lurker', game: 'R6, CS2, TFT, FIFA, COD, Minecraft, Fortnite, Clash, RL', bio: 'El más encendido del equipo. Cuando las cosas van mal, explota; cuando van bien, también. Su habilidad mecánica es innegable, pero primero tenés que sobrevivir a sus gritos.', traits: ['Aim instintivo', 'Reacciones de élite', 'Tilt instantáneo', 'Clutch en modo furia'], stats: { kd: 1.61, winrate: 58, hoursPlayed: 3100, tournamentsPlayed: 31 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'juan', nickname: 'La-Iguanita', realName: 'Juan Araujo', role: 'Support', game: 'R6, CS2, FIFA', bio: 'Una contradicción andante: puede ir de cero a cien en dos segundos y volver a la calma total en uno. Piensa cada movimiento mientras insulta al equipo, y casi siempre tiene razón.', traits: ['Pensamiento táctico', 'Temperamento impredecible', 'Lectura de juego lenta pero precisa', 'Calma post-tilt'], stats: { kd: 1.29, winrate: 61, hoursPlayed: 2800, tournamentsPlayed: 28 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'agus', nickname: 'Fernando de stake', realName: 'Agustin Garinei', role: 'AWPer', game: 'R6, CS2, FIFA, COD, RL, Fortnite, PORNHUB', bio: 'No sabe bien dónde está, no sabe bien qué hacer, pero si algo se le cruza por la mira, está muerto. Su AIM compensa años de desorientación táctica a al hora de analizar anos.', traits: ['Aim mecánico brutal', 'Rotaciones cuestionables', 'Posicionamiento a la suerte', 'Headshots involuntarios'], stats: { kd: 1.54, winrate: 52, hoursPlayed: 2400, tournamentsPlayed: 22 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'pedro', nickname: 'pedrito azucar', realName: 'Pedro Ferreyra', role: 'IGL', game: 'R6, CS2, TFT, FIFA, COD, Fortnite', bio: 'Nadie sabe si está jugando en serio o trolleando, y él tampoco. La mitad de sus jugadas parecen un meme y la otra mitad son geniales por accidente. El caos personificado.', traits: ['Creatividad sin límites', 'Decisiones impredecibles', 'Moral del equipo en alza', 'Trolleo de alto nivel'], stats: { kd: 0.98, winrate: 49, hoursPlayed: 1900, tournamentsPlayed: 19 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'santicass', nickname: 'Santycass', realName: 'Santiago Castro', role: 'Rifler', game: 'R6, CS2, TFT, LOL, F1, FIFA, Clash', bio: 'El cerebro frío del equipo. Mientras todos gritan, él ya procesó tres escenarios posibles y eligió el correcto. Su calma desespera tanto a los rivales como a sus propios compañeros.', traits: ['IQ táctico fuera de escala', 'Gestión del tiempo perfecta', 'Nunca tilteado', 'Siempre un paso adelante'], stats: { kd: 1.42, winrate: 68, hoursPlayed: 3600, tournamentsPlayed: 41 }, image: '', photo: '', photoPosition: 'center center' },
  { id: 'maxi', nickname: 'Maxiard', realName: 'Maximiliano Ruiz Diaz', role: 'Sentinel', game: 'R6, CS2, Battlefield, COD, Fortnite', bio: 'Tiene el cerebro para ganar cualquier round y el corazón para cagarse en el momento crítico. Su análisis pre-ronda es impecable; su ejecución bajo presión, otra historia. Y ademas es el numero 1 del porno', traits: ['Inteligencia táctica alta', 'Nervios en clutch', 'Planificación detallada', 'Tranquilidad hasta que importa'], stats: { kd: 1.21, winrate: 55, hoursPlayed: 2600, tournamentsPlayed: 25 }, image: '', photo: '', photoPosition: 'center center' },
];

const seed = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error('MONGODB_URI not set'); process.exit(1); }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Admin
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const exists = await Admin.findOne({ email: adminEmail.toLowerCase() });
    if (!exists) {
      const hashed = await bcrypt.hash(adminPassword, 12);
      await Admin.create({ email: adminEmail.toLowerCase(), password: hashed });
      console.log(`Admin created: ${adminEmail}`);
    } else {
      console.log(`Admin already exists: ${adminEmail}`);
    }
  } else {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set, skipping admin seed');
  }

  // Products
  let prodCreated = 0;
  for (const p of PRODUCTS) {
    const exists = await Product.findOne({ id: p.id });
    if (!exists) { await Product.create(p); prodCreated++; }
  }
  console.log(`Products: ${prodCreated} created, ${PRODUCTS.length - prodCreated} already existed`);

  // Players
  let playerCreated = 0;
  for (const p of PLAYERS) {
    const exists = await Player.findOne({ id: p.id });
    if (!exists) { await Player.create(p); playerCreated++; }
  }
  console.log(`Players: ${playerCreated} created, ${PLAYERS.length - playerCreated} already existed`);

  await mongoose.disconnect();
  console.log('Seed complete');
};

seed().catch((err) => { console.error(err); process.exit(1); });
