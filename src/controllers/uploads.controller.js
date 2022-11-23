const { request, response } = require('express');
const { getConnection } = require('../database/database');
const { cargarArchivos } = require('../helpers/cargar-archivos');
const path = require('path');
const fs = require('fs');


const subirArchivo = async(req = request, res=response)=>{


  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send('Los archivos no han sido subidos.');
    return;
  }

  const pathUpload = await cargarArchivos(req.files, undefined,'images/accounts');

  res.json(
    pathUpload
  )
}


const updateImage = async(req = request, res=response)=>{

  const {id, coleccion} = req.params;

  const connection = await getConnection()

  switch(coleccion){
    case'accounts':
        const account = await connection.query('SELECT id_account, img FROM accounts WHERE id_account = ? ', id);
        console.log(account)
        if(account.length<1){
          return res.status(400).json({
            msg: `No existe usuario con id: ${id}`
          })
        }else{

          //limpiar imagenes previas

          const img = account[0].img;
          try {
            if(img){
              const pathImage = path.join(__dirname, '../uploads/images', coleccion, img);
              if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage);
              }
            }
          } catch (error) {
            
          }

          const nombreImagen = await cargarArchivos(req.files, undefined,'images/accounts');
          await connection.query('Update accounts set img=? where id_account = ?', [nombreImagen, id]);

          res.status(200).json({
            ok:true,
            msg:'imagen actualizada con exito!'
          })

        }
        
        break;

    default:
      return res.status(500).json({msg: 'Coleccion no permitida'})
  }
}


const getImage = async (req=request, res=response)=>{
  const {id, coleccion} = req.params;

  const connection = await getConnection();
  const account = await connection.query('SELECT id_account, img FROM accounts WHERE id_account = ? ', id);
  if(account.length<1){
    return res.status(400).json({
      msg: `No existe usuario con id: ${id}`
    })
  }else{

    //limpiar imagenes previas

    const img = account[0].img;
    try {
      if(img){
        const pathImage = path.join(__dirname, '../uploads/images', coleccion, img);
        if(fs.existsSync(pathImage)){
          console.log(pathImage);
          return res.sendFile(pathImage)
        }
      }
    } catch (error) {
      res.status(500).json({
        ok:false,
        msg:error.msg
      })
    }
  }

  res.json({
    msg: 'Falta place Holder'
  })
  

}


module.exports = {
    subirArchivo,
    updateImage,
    getImage
}