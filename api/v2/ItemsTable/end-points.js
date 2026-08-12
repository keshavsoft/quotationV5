import express from 'express';

import funcFromshowAll from './showAll/controller.js';
import findByVoucherNumber from './findByVoucherNumber/controller.js';
import findByVoucherNumberAndType from './findByVoucherNumberAndType/controller.js';
import getInventoryColumn from './getInventoryColumn/controller.js';
import getInventoryArray from './getInventoryArray/controller.js';
import getBatchTree from './getBatchTree/controller.js';
import funcFromlastRecord from './lastRecord/controller.js';
import findParentPk from './findParentPk/controller.js';
import funcFromgroupBy from './groupBy/controller.js';

import funcFrominsert from './insertWithMeta/controller.js';

import funcFrommodify from './modify/controller.js';

import funcFromdel from './del/controller.js';

const tableName = "ItemsTable.json";
const tablePath = "Data/ItemsTable.json";
const configPath = "Config/Schemas/ItemsTable.json";

const router = express.Router();

router.get('/showAll', (req, res) => funcFromshowAll({ req, res, inTablePath: tablePath }));
router.get('/findByVoucherNumber/:vounum', (req, res) => findByVoucherNumber({ req, res, inTablePath: tablePath }));
router.get('/findByVoucherNumberAndType/:vchtype/:vounum', (req, res) => findByVoucherNumberAndType({ req, res, inTablePath: tablePath }));
router.get('/getInventoryColumn', (req, res) => getInventoryColumn({ req, res, inTablePath: tablePath }));
router.get('/getInventoryArray', (req, res) => getInventoryArray({ req, res, inTablePath: tablePath }));
router.get('/getBatchTree', (req, res) => getBatchTree({ req, res, inTablePath: tablePath }));
router.get('/lastRecord', (req, res) => funcFromlastRecord({ req, res, inTablePath: tablePath }));
router.get('/findParentPk/:pk', (req, res) => findParentPk({ req, res, inTablePath: tablePath }));
router.get('/groupBy', (req, res) => funcFromgroupBy({ req, res, inTablePath: tablePath }));

router.post('/insertWithMeta', express.json(), (req, res) => funcFrominsert({ req, res, inTablePath: tablePath, inConfigPath: configPath }));

router.put('/modify', express.json(), (req, res) => funcFrommodify({ req, res, inTablePath: tablePath, inConfigPath: configPath }));

router.delete('/del/:pk', (req, res) => funcFromdel({ req, res, inTablePath: tablePath }));

export { router };