const jwt = require('jsonwebtoken');
// const managerCollection = require("../src/database/managerDB")

const auth = async (req,res,next) =>{
    try{
        const cookie = req.cookies.manJwt
        const verify = jwt.verify(cookie,'kjwehcbskhfwehwjefncwefyioenkejvaejgire')
        next()
        
        // const user = await managerCollection.findOne({_id:verify._id})
        // if(!user) {throw new Error("User Not Found")}
        // req.user = user
    }
    catch(err){
        res.status(401).json({
            message:'Session Expired. Please Login Again',
            status:false
        })
    }
    
}

module.exports = auth