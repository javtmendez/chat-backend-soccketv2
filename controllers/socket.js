const Usuario = require("../models/usuario")
const Mensaje = require("../models/mensajes")

const usuarioConectado = async (uid='')=>{
    const usuario=await Usuario.findById(uid);
    usuario.online=true;
    await usuario.save();
    return usuario;
}
const usuarioDesconectado = async (uid='')=>{
    const usuario=await Usuario.findById(uid);
    usuario.online=false;
    await usuario.save();
    return usuario;
}

const grabarMensaje=async(payload) =>{
const mensaje=new Mensaje (payload);
await mensaje.save();



try{

    return true;
}catch(e){
    return false;
}

}

module.exports={
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}