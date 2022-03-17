const{Schema,model}=require('mongoose');

const ProveedorSchema=Schema({

    
    nombreProveedor:{
        type:String,
        require:true
    },
    direccionProveedor:{
        type:String,
        require:true
    },
    nombreTelefono:{
        type:String,
        require:true
    },
    emailProveedor:{
        type:String,
        require:true
    },

       

});
UsuarioSchema.method('toJSON',function(){
    const{__v,_id,...object}=this.toObject();
    object.uid=_id;
    return object;
})

module.exports=model('Proveedor',ProveedorSchema);