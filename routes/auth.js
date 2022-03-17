/*
path:api/login
*/

const{ Router }=require('express');
const { check } = require('express-validator');

const{ crearUsuario, login, renewToken }=require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const   router=Router();
router.post('/new',
[
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('password','password obligatorio').not().isEmpty(),
    check('email','email obligatorio').isEmail(),
    check('nombreempresa','nombre de la empresa obligatorio'),
    validarCampos
],
crearUsuario);


router.post('/',
[
    check('password','password obligatorio').not().isEmpty(),
    check('email','email obligatorio').isEmail(),
    validarCampos
],
login);
// validarJWT,
router.get('/renew',validarJWT,renewToken);



module.exports=router;