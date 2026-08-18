import express from 'express';

import funcFromCount from './count/controller.js';
import funcFromshowAll from './showAll/controller.js';
import funcFromVoucherTypes from './voucherTypes/controller.js';
import funcFromForStock from './forStock/controller.js';
import funcFromBatchArray from './getBatchArray/controller.js';

const tableName = "purchases.json";
const tablePath = "Data/purchases.json";
const configPath = "Config/Schemas/purchases.json";

const router = express.Router();

router.get('/count', (req, res) => funcFromCount({ req, res, inTablePath: tablePath }));
router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.get('/voucherTypes', (req, res) => funcFromVoucherTypes({ req, res, inTablePath: tablePath }));
router.get('/forStock', (req, res) => funcFromForStock({ req, res, inTablePath: tablePath }));
router.get('/getBatchArray', (req, res) => funcFromBatchArray({ req, res, inTablePath: tablePath }));

export { router };