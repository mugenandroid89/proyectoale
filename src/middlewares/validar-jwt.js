const jwt = require("jsonwebtoken");


const validarJWT = (req, res, next)=>{
    
    const token = req.header('x_token');

    if(!token){
    return res.status(401).json({
        ok:false,
        msg:'No hay token en la petición'
    });
    }

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        //Estamos seguros de que el token es correcto.
        req.id = id;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}