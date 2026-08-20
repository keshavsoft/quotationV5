import express from 'express';
import loginUser from './controller.js';

const router = express.Router();

// Route for /api/v2/login
router.post('/', express.json(), loginUser);
router.get('/', loginUser); // Allowing GET for easy browser testing in the demo

export { router };
