const express = require("express")
const app = express()

//db 
const {dbConnect} = require("./db/connect")
dbConnect()

// routes
const home = require("./routes/home.route")
const products = require("./routes/products.route")

// middleware
const logRequest = require("./middleware/logRequest.middleware")
const {routeNotFound} = require("./middleware/routeNotFound.middleware")
const {errorHandler} = require("./middleware/errorHandler.middleware")


// app.use(logRequest)
app.get("/",home)
app.get("/products",products)

/**
 *  404 Handler Do Not Move
 */
app.use(routeNotFound)


/**
 *  Error Handler Do Not Move
 */
app.use(errorHandler)

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started on PORT: ",PORT))

