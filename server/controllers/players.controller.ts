import { Request, Response } from 'express';
import { Player } from '../models/Player.js';
import { uploadToCloudinary, destroyFromCloudinary } from '../config/cloudinary.js';

const toSlug = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const getPlayers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const players = await Player.find().select('-_id').lean();
    res.json(players);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const player = await Player.findOne({ id: req.params.id }).select('-_id').lean();
    if (!player) { res.status(404).json({ error: 'Player not found' }); return; }
    res.json(player);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nickname, realName, role, game, bio, traits, stats, photoPosition } = req.body;
    if (!nickname || !realName || !role || !game) {
      res.status(400).json({ error: 'nickname, realName, role and game are required' });
      return;
    }
    const id = toSlug(nickname);
    const exists = await Player.findOne({ id });
    if (exists) {
      res.status(409).json({ error: `Player with id "${id}" already exists` });
      return;
    }
    const parsedTraits = Array.isArray(traits)
      ? traits
      : typeof traits === 'string'
      ? traits.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];
    const parsedStats = stats ?? { kd: 0, winrate: 0, hoursPlayed: 0, tournamentsPlayed: 0 };
    const player = await Player.create({
      id, nickname, realName, role, game,
      bio: bio ?? '',
      traits: parsedTraits,
      stats: parsedStats,
      image: '',
      photo: '',
      photoPosition: photoPosition ?? 'center center',
    });
    const obj = player.toObject();
    delete (obj as Record<string, unknown>)._id;
    res.status(201).json(obj);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nickname, realName, role, game, bio, traits, stats, photoPosition } = req.body;
    const update: Record<string, unknown> = {};
    if (nickname !== undefined) update.nickname = nickname;
    if (realName !== undefined) update.realName = realName;
    if (role !== undefined) update.role = role;
    if (game !== undefined) update.game = game;
    if (bio !== undefined) update.bio = bio;
    if (photoPosition !== undefined) update.photoPosition = photoPosition;
    if (traits !== undefined) {
      update.traits = Array.isArray(traits)
        ? traits
        : traits.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
    if (stats !== undefined) update.stats = stats;
    const player = await Player.findOneAndUpdate({ id: req.params.id }, update, { new: true }).select('-_id').lean();
    if (!player) { res.status(404).json({ error: 'Player not found' }); return; }
    res.json(player);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const player = await Player.findOneAndDelete({ id: req.params.id });
    if (!player) { res.status(404).json({ error: 'Player not found' }); return; }
    if (player.image) { try { await destroyFromCloudinary(player.image); } catch { /* ignore */ } }
    if (player.photo) { try { await destroyFromCloudinary(player.photo); } catch { /* ignore */ } }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) { res.status(400).json({ error: 'No file provided' }); return; }
    const player = await Player.findOne({ id: req.params.id });
    if (!player) { res.status(404).json({ error: 'Player not found' }); return; }
    if (player.image) { try { await destroyFromCloudinary(player.image); } catch { /* ignore */ } }
    const result = await uploadToCloudinary(file.buffer, `la-bristol/players/${req.params.id}/avatar`);
    player.image = result.secure_url;
    await player.save();
    const obj = player.toObject();
    delete (obj as Record<string, unknown>)._id;
    res.json(obj);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) { res.status(400).json({ error: 'No file provided' }); return; }
    const player = await Player.findOne({ id: req.params.id });
    if (!player) { res.status(404).json({ error: 'Player not found' }); return; }
    if (player.photo) { try { await destroyFromCloudinary(player.photo); } catch { /* ignore */ } }
    const result = await uploadToCloudinary(file.buffer, `la-bristol/players/${req.params.id}/photo`);
    player.photo = result.secure_url;
    await player.save();
    const obj = player.toObject();
    delete (obj as Record<string, unknown>)._id;
    res.json(obj);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
