const {request, response} = require('express');
const {validationResult} = require('express-validator');

const validarCampo = (req=request, res=response, next)=>{
    //Valida la consulta hecha por el usuario con la libreria express-validator
    const errores = validationResult(req);

    //Verifica que el arreglo que trae errores no esté vacío
    if(!errores.isEmpty()){
        //Si no está vacío el arreglo de errores lanza error 400 
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }
    next(); //pasa pasa a la siguiente función de middleware
}

module.exports = {
    validarCampo
}