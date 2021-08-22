const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")

router.use(bodyParser.json())

// model import
const {Product} = require("../models/product.model")



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


module.exports = router