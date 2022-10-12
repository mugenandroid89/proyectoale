const {getConnection} = require('../database/database')
/**
*@param {*} req
*@param {*} res
**/
const getAcounts = async(req, res)=>{
    try {
        const connection = await getConnection();

        const result = await connection.query("SELECT id_account, username, first_name, last_name, email, password, groups, user_permissions, is_staff, is_active, is_superuser, last_login, date_joined FROM accounts");
        
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
const getAcountById = async(req, res)=>{
    try {
        const connection = await getConnection();
        const {id}=req.params;

        const result = await connection.query("SELECT * FROM `accounts` WHERE id_account=?",[id]);
        
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
const editAcount = async(req, res)=>{
    try {
        const connection = await getConnection();
        const {id}=req.params;

        const result = await connection.query("UPDATE `accounts` SET ? WHERE id_account=?",[req.body, id]);
        
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
const deleteAcount = async(req, res)=>{
    try {
        const connection = await getConnection();
        const {id}=req.params;

        const result = await connection.query("UPDATE `accounts` SET is_active=0 WHERE id_account=?",[id]);
        
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
const createAcount = ()=>{}



module.exports={
    getAcounts,
    getAcountById,
    createAcount,
    editAcount,
    deleteAcount

}