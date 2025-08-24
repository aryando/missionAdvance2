import express from 'express';
import { registerUser, getUsers, loginUser, authMiddleware, verifyEmail } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
})

export default router;