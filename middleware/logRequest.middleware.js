function logRequest(req,res,next){
    console.log(req)
    next()
}

module.exports = logRequest