import express from 'express';

import { router as routerFrompurchases } from './purchases/end-points.js';
import { router as routerFromall } from './all/end-points.js';

const router = express.Router();

router.use("/purchases", routerFrompurchases);
router.use("/all", routerFromall);

export { router };