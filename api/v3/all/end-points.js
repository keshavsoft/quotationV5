import express from 'express';

import funcFromshowAll from './showAll/controller.js';

const tableName = "all.json";
const tablePath = "Data/all.json";
const configPath = "Config/Schemas/all.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));

export { router };