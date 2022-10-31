const express = require('express');
const { ModifierFlags } = require('typescript');
const router = express.Router();

const saucesCtrl = require('../controllers/sauce');

router.post('', saucesCtrl.saveSauces);

module.exports = router;