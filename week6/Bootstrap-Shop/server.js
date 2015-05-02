"use strict"

// dependancies
var express = require('express')
var fs = require("fs");
var products = require("./products.json");
var chart = require("./chart.json");

// create app
var app = express()


// configuration and middleware 
app.use(express.static('public'));
app.set('view engine', 'jade');


// routes
app.get('/', function (req, res) {
  res.render('index', {products: products, chart: chart});
});

// listen for files: /product -> /views/product.jade
app.get("/:fileName", function(req, res, next){
  if(req.params && req.params.fileName){
    var fileName = req.params.fileName.replace(".html","");

    // if jade file exists
    if(fs.existsSync(__dirname+"/views/"+fileName+".jade")){
      res.render(fileName);
    // if product is in products
    } else if (products[fileName]) {
      res.render("product", {product: products[fileName]});
    // else continue
    } else {
      next();
    }

  } else {
    next();
  }
})



// set up server
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})