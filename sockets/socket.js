const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const{usuarioConectado,usuarioDesconectado, grabarMensaje}=require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', (client) => {
   

    //leer los headers

    const[valido,uid]=comprobarJWT(client.handshake.headers['x-token']);
    // console.log(valido,uid);
// verificar autenticacion
    if(!valido)
    {
        return client.disconnect();
    }
    //cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario a una sala en particular
    //sala global =>client.id,5f2954654654654v555s
    client.join(uid);

//escuchar el mensaje del cliente mensaje-personal
    client.on('mensaje-personal',(payload)=>{
        console.log(payload);

        //guardar mensaje
        grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal',payload);


    });
   
        client.on('disconnect', () => {
            usuarioDesconectado(uid);
        });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
