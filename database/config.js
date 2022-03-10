const mongoose = require('mongoose');


const dbConnection = async() => {

try{

   
   await  mongoose.connect  (process.env.DB_CNN,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true,
    });
    console.log('db Online');

}catch(error){
    console.log(error);
    throw new Error('error en la base de datos - hable con el administrador');
}



}

module.exports={
    dbConnection
}