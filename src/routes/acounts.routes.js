const {Router} = require('express');
const { check } = require('express-validator');
const {getAcounts, getAcountById, createAcount, editAcount, deleteAcount} = require('../controllers/acounts.controller');
const router = Router();

router.get('/',getAcounts);
router.get('/:id',getAcountById);
router.post('/', createAcount);
router.put('/:id', editAcount);
router.delete('/:id', deleteAcount);

module.exports = router;

//check(['username', 'password'], 'El usuario y la contraseña son requeridos'),



