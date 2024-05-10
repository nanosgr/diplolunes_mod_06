var express = require('express');
var router = express.Router();
var usuariosModel = require('../../models/usuariosModel');

router.get('/', (req, res, next) => {
  res.render('admin/login', 
    {
        layout: 'layout', 
    });
});

router.post('/', async (req, res, next) => {
  try{
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if(data != undefined){
        
        req.session.id_usuario = data.id;
        req.session.nombre = data.usuario;
        
        res.redirect('/productos');
    }else{
        res.render('admin/login', 
        {
            layout: 'layout', 
            error: true
        });
    }}catch(error){
        console.log(error);
    } 
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'layout', 
    });
});

module.exports = router;