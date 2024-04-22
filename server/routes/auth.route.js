import express from 'express';
import { google, signUp, signin } from '../controllers/auth.controller.js';
const router = express.Router();
// sign-up
router.post('/sign-up', signUp);
router.post('/sign-in', signin);
router.post('/google', google);
//
export default router;
