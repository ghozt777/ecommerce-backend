const {Product} = require("../models/product.model")

async function findProduct(req,res,next,productId){
    
    try{
        const foundProduct = await Product.findById(productId)
        if(!foundProduct){
            return res.status(400).json({success:false, message:`error while retriving product of id ${productId}`})
        }
        req.product = foundProduct
        console.log(foundProduct)
        next()
    }catch(err){
        res.status(400).json({success:false, errorMessage:`product not found with error message: ${err.message}`})
    }
}

module.exports = {findProduct}