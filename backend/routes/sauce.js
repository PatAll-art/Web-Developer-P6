const express = require('express');
const { ModifierFlags } = require('typescript');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauce');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, saucesCtrl.getSauces);
router.get('/:id', auth, saucesCtrl.findSauces);
router.delete('/:id', auth, saucesCtrl.deleteSauce);

module.exports = router;