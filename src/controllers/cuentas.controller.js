const {getConnection} = require('../database/database');
/**
*@param {*} req
*@param {*} res
**/

const getCuentas = async(req, res)=>{
    try {
        const connection = await getConnection();

        const result = await connection.query("SELECT * FROM cuentas");
        
        res.status(200).json({
            ok:true,
            result
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
   
}

const getCuentaById = async(req, res)=>{
    try {
        const connection = await getConnection();
        const {id}=req.params;

        const result = await connection.query("SELECT * FROM `cuentas` WHERE id_cuenta=?",[id]);
        
        res.status(200).json({
            ok:true,
            result
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
   
}

const getCuentaByIdDuenio = async(req, res)=>{
    try {
        const connection = await getConnection();
        const {id}=req.params;

        const result = await connection.query("SELECT * FROM `cuentas` WHERE id_duenio=?",[id]);
        
        res.status(200).json({
            ok:true,
            result
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
   
}

const createCuenta = async(req, res)=>{
    try {
        const {nro_cuenta, tipo,saldo, id_duenio} = req.body;
        const cuenta = {
            nro_cuenta, 
            tipo,
            saldo,
            id_duenio
        }

        const connection = await getConnection();
        const sql = 'INSERT INTO `cuentas` set ?';
        const resultado = await connection.query(sql,cuenta);

        return res.status(200).json({
            ok:true,
            msg:'Cuenta creada con éxito'
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}

const updateCuenta = async(req, res)=>{
    try {
        const {id}=req.params;

        const connection = await getConnection();
        const sql = "UPDATE `cuentas` set ?  WHERE id_cuenta=?";
        const resultado = await connection.query(sql, [req.body, id]);

        return res.status(200).json({
            ok:true,
            msg:'Cuenta actualizada con éxito'
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}




module.exports={
    getCuentas,
    getCuentaById,
    createCuenta,
    updateCuenta,
    getCuentaByIdDuenio

}