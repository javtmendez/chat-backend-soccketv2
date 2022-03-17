
const Mensajes=require('../models/mensajes');


const obtnerChat=async(req,res)=>{

    const miId= req.uid;
    const mensajesDe=req.params.de;

    const last30=await Mensajes.find({
        $or:[{de:miId,para:mensajesDe},{de:mensajesDe,para:miId}]
    })
    .sort({createAt:'desc'})
    .limit(30);


    res.json({
        ok:true,
       mensajes: last30
    })



}

module.exports={
    obtnerChat
}