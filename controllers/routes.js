var express = require('express');
var bodyParser = require('body-parser');
var Product = require('./../models/product');
var router = express.Router();

var express = require('express');
var app = express();


router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


var msg = "";



router.route('/products').post(function (req, res) {
        var products = new Product();//instance of Product()-(name,amount,description)
       
        Product.findOne({id:req.body.id},function(err,result){
            if(result){
                console.log(err);
              this.msg = '{message: "ID ALREADY EXISTS"}';
            }
            else{
                products.name = req.body.name;
                products.id = req.body.id;
                products.amount = req.body.amount;
                products.description = req.body.description;
        
                products.save(function (error) {
                    if (error)
                        res.status(500).send('Failed to register new product. ERROR: ' + error);
                  
                    this.msg = "product successfully registered";
                });
            }
        });
        res.json({message: ""+this.msg});
       
    })
     .get(function (req, res) {
        Product.find(function (error, products) {
            if (error)
                res.status(500).send("Failed to show products. ERROR: " + error);
            res.json(products);
        });
    });


router.route('/products/:id').get(function (req, res) {
        Product.findOneAndRemove(req.params.id, function (error, product) {
            if (error)
                res.status(500).send('error: ' + error);
            res.json(product);
        })
    })
    .put(function (req, res) {
        //serch a product by id - with id in req
        Product.findOneAndRemove(req.params.id, function (error, product) {
            if (error)
                res.send('error: ' + error);
            //update attributes of the product with req fields
            product.name = req.body.name;
            product.amount = req.body.amount;
            product.description = req.body.description;
            product.id = req.body.id
            //save
            product.save(function (error) {
                if (error)
                    res.status(500).send('Failed to update product. ERROR: ' + error);
                res.json({message: 'Product update successful!'});
            });
        });
    })
    .delete(function (req, res) {
        Product.findOneAndRemove(req.params.id, function (error, product) {
            if (error)
                res.send('error: ' + error);
    });
});

module.exports = router;