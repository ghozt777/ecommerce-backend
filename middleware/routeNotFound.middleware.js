function routeNotFound(req,res){
    res.status(404).json({success:false,message:`404 route ${req.path} not found`})
}

module.exports = {routeNotFound}