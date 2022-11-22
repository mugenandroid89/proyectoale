const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const {getTransactions, getTransactionById} = require('../controllers/transactions.controller');

const router = Router();

router.get('/',validarJWT, getTransactions);
router.get('/:id',validarJWT ,getTransactionById);


module.exports = router;

