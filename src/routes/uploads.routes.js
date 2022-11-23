const {Router} = require('express');
const { subirArchivo, updateImage, getImage } = require('../controllers/uploads.controller');
const {check} = require('express-validator');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const route = Router();

route.post('/', subirArchivo);
route.get('/:coleccion/:id',[
    check('coleccion').custom(c => coleccionesPermitidas(c, ['accounts']))
],getImage)
route.put('/:coleccion/:id',[
    check('coleccion').custom(c => coleccionesPermitidas(c, ['accounts']))
],updateImage)

module.exports = route;