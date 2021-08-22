const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const {extend} = require("lodash")

router.use(bodyParser.json())

// model import
const {Product} = require("../models/product.model")

// middleware
const {findProduct} = require("../middleware/findProduct.middleware")

// /product route
router.route("/")
.get(async(req,res) => {
    try{
        const products = await Product.find({})
        res.status(200).json({success:true,products})
    }catch(err){
        res.status(500).json({success:false,errorMessage:err.message})
    }
})
.post(async(req,res) => {
    try{
        const newProduct = req.body
        const responseFromServer = await new Product(newProduct).save()
        res.status(201).json({success:true,responseFromServer})
    }catch(err){
        res.status(500).json({success:false,errorMessage:err.message})
    }
})

router.param("productId",findProduct)

// /product/:productId route
router.route("/:productId")
.get((req,res) => {
    const {product} = req
    product.__v=undefined
    res.json({success:true,product})
})
.post(async(req,res) => {
    try{
        let {product} = req
        const updateProduct = req.body
        product = extend(product,updateProduct)
        product = await product.save()
        res.status(201).json({success:true,updatedProduct:product})
    }catch(err){
        res.status(500).json({success:false,message:` error message: ${err.message}`})
    }
})
.delete(async(req,res) => {
    try{
        let {product} = req
        await product.delete()
        res.status(201).json({success:true,message:"product deletion successful"})
    }catch(error){
        res.status(500).json({success:false,message:`error while deletion with message: ${error.message}`})
    }
})

module.exports = router

