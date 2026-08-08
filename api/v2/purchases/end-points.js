import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import findByVoucherNumber from './findByVoucherNumber/controller.js';
import findByVoucherNumberAndType from './findByVoucherNumberAndType/controller.js';

const tableName = "purchases.json";
const tablePath = "Data/purchases.json";
const configPath = "Config/Schemas/purchases.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.get('/findByVoucherNumber/:vounum', (req, res) => findByVoucherNumber({ req, res, inTablePath: tablePath }));
router.get('/findByVoucherNumberAndType/:vchtype/:vounum', (req, res) => findByVoucherNumberAndType({ req, res, inTablePath: tablePath }));

export { router };