import express from 'express';

import funcFromshowAll from './showAll/controller.js';

const tableName = "purchases.json";
const tablePath = "Data/purchases.json";
const configPath = "Config/Schemas/purchases.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));

export { router };