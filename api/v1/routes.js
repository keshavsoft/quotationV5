import express from 'express';

import { router as routerFrompurchases } from './purchases/end-points.js';

const router = express.Router();

router.use("/purchases", routerFrompurchases);

export { router };