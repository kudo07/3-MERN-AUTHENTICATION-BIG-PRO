import express from 'express';
import { signUp, signin } from '../controllers/auth.controller.js';
const router = express.Router();
// sign-up
router.post('/sign-up', signUp);
router.post('/sign-in', signin);
//
export default router;
