const jwt = require("jsonwebtoken")
const apierr = require("../utils/errclass")
const tokenverify = (req, resp , next)=>{
    try{
    const token = req.headers.authorization
    const verified = jwt.verify(token , process.env.jwt_secret_key )
    if(!verified){
        throw new apierr("Token not verified", 400)
    }
    req.user = verified
    }catch(err){
        next(err)
    }}

module.exports = tokenverify