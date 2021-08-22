const mongoose = require("mongoose")
const {uri} = require("../.env/secrets") // connects to ecommerce DB

async function dbConnect() {
    try{
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        console.log("connection established")
    }catch(err){
        console.log(err)
    }
}

module.exports = {dbConnect}