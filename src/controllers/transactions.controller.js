const {getConnection} = require('../database/database');
const bcrypt = require('bcryptjs');
/**
*@param {*} req
*@param {*} res
**/

const getTransactions = async(req, res)=>{
    try {
        const connection = await getConnection();

        const result = await connection.query("SELECT * FROM transactions");
        
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

const getTransactionById = async(req, res)=>{
    try {
        const connection = await getConnection();
        const {id}=req.params;

        const result = await connection.query("SELECT * FROM `transaction` WHERE id=?",[id]);
        
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

const createTransaction = async(req, res)=>{
    try {
        const {origen, destino,cantidad = null} = req.body;
        const usuario = {
            origen, 
            destino,
            cantidad
        }

        const connection = await getConnection();
        const sql = 'INSERT INTO `transactions` set ?';
        const resultado = await connection.query(sql,usuario);

        return res.status(200).json({
            ok:true,
            msg:'Transacción exitosa'
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: error.message
        })
    }
}




module.exports={
    getTransactions,
    getTransactionById,
    createTransaction

}