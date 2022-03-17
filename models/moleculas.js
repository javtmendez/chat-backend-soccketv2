const{Schema,model}=require('mongoose');

const MoleculaSchema=Schema({

    
    nombreMolecula:{
        type:String,
        require:true
    }
       

});
UsuarioSchema.method('toJSON',function(){
    const{__v,_id,...object}=this.toObject();
    object.uid=_id;
    return object;
})

module.exports=model('Molecula',MoleculaSchema);