const { response } = require("express");
const bcrypt=require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario=async ( req,res=response)=>{
    
   const{email,password}=req.body;
    try {
        //buscar un usuario
        const existeEmail=await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'Correo ya fue utilizado'
            });
        }
//guardar una usuario
        const usuario=new Usuario(req.body);
        //encriptar contrase;a
        const salt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);

        await usuario.save();

        const token=await generarJWT(usuario.id);
    
        res.json({
            ok:true,
            msg:'crear usuario!!',
            usuario,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    
}
const login=async ( req,res=response)=>{
    const{email,password}=req.body;

    try {
        // validar email
        const usuarioDB=await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'credenciales invalidas'
            });
        }
// validar password
const validarPassword=bcrypt.compareSync(password,usuarioDB.password);
if(!validarPassword){
    return res.status(400).json({
        ok:false,
        msg:'credenciales invalidas'
    });
}
//generar el jwt
const token=await generarJWT(usuarioDB.id);


        return res.json({
            ok:true,
            msg:'login',
            usuario:usuarioDB,
            token:token

        })
    
    
    
    }  catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
   
}

const renewToken =async ( req,res=response)=>{
const uid=req.uid
const token=await generarJWT(uid);
const usuario=await Usuario.findById(uid);

res.json({
    ok:true,
    msg:'Renew',
    usuario,
    token
});
}

module.exports={
    crearUsuario,
    login,
    renewToken
};