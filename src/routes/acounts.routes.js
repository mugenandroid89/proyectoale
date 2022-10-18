const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const {getAcounts, getAcountById, createAcount, editAcount, deleteAcount} = require('../controllers/acounts.controller');
const router = Router();

router.get('/',validarJWT, getAcounts);
router.get('/:id',validarJWT ,getAcountById);
router.post('/',[ 
check(['username', 'password'], 'El usuario y la contraseña son requeridos').notEmpty(),
check('username', 'El usuario no puede superar los 30 caracteres').isLength({max:30}),
check('password', 'La contraseña no puede superar los 60 caracteres').isLength({max:60}),
validarCampo], createAcount)
router.put('/:id', validarJWT, editAcount);
router.delete('/:id', validarJWT, deleteAcount);



module.exports = router;

//check(['username', 'password'], 'El usuario y la contraseña son requeridos'),



