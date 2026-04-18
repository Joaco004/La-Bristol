import { Schema, model } from 'mongoose';

export interface IPlayer {
  id: string;
  nickname: string;
  realName: string;
  role: string;
  game: string;
  bio: string;
  traits: string[];
  stats: {
    kd: number;
    winrate: number;
    hoursPlayed: number;
    tournamentsPlayed: number;
  };
  image: string;
  photo: string;
  photoPosition: string;
}

const playerSchema = new Schema<IPlayer>(
  {
    id: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
    realName: { type: String, required: true },
    role: { type: String, required: true },
    game: { type: String, required: true },
    bio: { type: String, default: '' },
    traits: [{ type: String }],
    stats: {
      kd: { type: Number, default: 0 },
      winrate: { type: Number, default: 0 },
      hoursPlayed: { type: Number, default: 0 },
      tournamentsPlayed: { type: Number, default: 0 },
    },
    image: { type: String, default: '' },
    photo: { type: String, default: '' },
    photoPosition: { type: String, default: 'center center' },
  },
  { versionKey: false }
);

export const Player = model<IPlayer>('Player', playerSchema);
