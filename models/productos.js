const{Schema,model}=require('mongoose');

const ProdutosSchema=Schema({

    
   
    codigo:{
        type:String,
        required:true,
        unique:true
    },
    nombre:{
        type:String,
        require:true
    },
    id_laboratorio:{
        type:Int32Array,
        require:true
    },
    id_proveedor :{
        type:Int32Array,
        default:true
    },
    id_molecula:{
        type:Int32Array,
        default:true
    },
    precio:{
        type:Number,
        require:true
    },
    costo:{
        type:Number,
        require:true
    }

});
UsuarioSchema.method('toJSON',function(){
    const{__v,_id,...object}=this.toObject();
    object.uid=_id;
    return object;
})

module.exports=model('productos',ProdutosSchema);