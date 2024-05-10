var express = require('express');
var router = express.Router();
var productosModel = require('../models/productsModel');

/* GET home page. */
router.get('/', async function (req, res) {
  var data = await productosModel.getProducts();
  res.render('products', { layout: 'layout', products: data });  
});

router.get('/nuevo', function (req, res) {
  res.render('addProduct', { layout: 'layout' });
});

router.post('/nuevo', function (req, res) {
  try {
    if (req.body.NombreProducto != "" && req.body.Medidas != "" && req.body.Descripcion != "") {
      var obj = {
        NombreProducto: req.body.NombreProducto,
        Medidas: req.body.Medidas,
        Descripcion: req.body.Descripcion,
        OtrasEspecificaciones: req.body.OtrasEspecificaicones
      }
      productosModel.addProduct(obj);
      res.redirect('/productos');
    }else{
      res.render('addProduct', 
        {
          layout: 'layout', 
          error: true, 
          message: "Todos los campos son obligatorios"
        });
    }
  } catch (error) {
    
  }
});

router.get('/editar/:id', async function (req, res) {
  let id = req.params.id;
  let product = await productosModel.getProductById(id);

  res.render('updateProduct', { layout: 'layout', product });
});

router.post('/editar/', function (req, res) {
  try {

    if (req.body.NombreProducto != "" && req.body.Medidas != "" && req.body.Descripcion != "") {
      var obj = {
        NombreProducto: req.body.NombreProducto,
        Medidas: req.body.Medidas,
        Descripcion: req.body.Descripcion,
        OtrasEspecificaciones: req.body.OtrasEspecificaciones,
      }

      productosModel.updateProduct(obj, +req.body.id);
      res.redirect('/productos');
    }else{
      res.render('updateProduct', 
        {
          layout: 'layout', 
          error: true, 
          message: "Todos los campos son obligatorios"
        });
    }
  } catch (error) {
    
  }
});

router.get('/eliminar/:id', async function (req, res) {
  let id = req.params.id;
  let product = await productosModel.deleteProduct(id);

  res.redirect('/productos');
});

module.exports = router;