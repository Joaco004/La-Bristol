import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  uploadImage,
  uploadPhoto,
} from '../controllers/players.controller.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', getPlayers);
router.get('/:id', getPlayer);
router.post('/', authMiddleware, createPlayer);
router.put('/:id', authMiddleware, updatePlayer);
router.delete('/:id', authMiddleware, deletePlayer);
router.post('/:id/image', authMiddleware, upload.single('image'), uploadImage);
router.post('/:id/photo', authMiddleware, upload.single('photo'), uploadPhoto);

export default router;
