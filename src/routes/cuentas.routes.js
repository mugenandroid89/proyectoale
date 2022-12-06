const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const {getCuentas, getCuentaById, createCuenta, updateCuenta, getCuentaByIdDuenio} = require('../controllers/cuentas.controller');

const router = Router();

router.get('/', getCuentas);
router.get('/:id', getCuentaById);
router.get('/duenio/:id', getCuentaByIdDuenio);
router.put('/:id', updateCuenta);
router.post('/',[ 
    check(['nro_cuenta', 'tipo', 'saldo'], 'No deben haber campos vacíos').notEmpty(),
    validarCampo], createCuenta)


module.exports = router;

