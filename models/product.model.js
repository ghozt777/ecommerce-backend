const mongoose = require("mongoose")
const {Schema,model} = mongoose

const productSchema = new Schema({
    name:{
        type: String,
        required: "Cannot create a product without a name",
        // this is the same as required: [true,"error message"]
        unique: true
        // this unique is not a validator as its not handeled by mongoose rather its handleled by mongodb directly
        // all the other validators apart from unique like required, min, max , minLength ... are all ahandled by mongoose as a middleware
    },
    price:{
        type:Number,
        required:"cannot create a product without a price",
    },
    quantity:{
        type:Number,
        min: [1,"To have a product there must be more than 1 of it"],
        max: [100,"cannot create more than 100 product"]
    },
    
},{timestamps: true})

const Product = model("Product",productSchema)

module.exports = {Product}

/**
 * Notes to refer back to :
 *  <---------------------*********-------------------------->
 * to check for URLs use mongoose-type-url JS library
 * type: mongoose.SchemaTypes.Url
 */