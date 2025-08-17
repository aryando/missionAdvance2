import express from 'express';
import { createUser, getUsers, loginUser, authMiddleware } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
})

export default router;