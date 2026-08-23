const jwt = require("jsonwebtoken")
const usermodel = require("../Models/user")
const sellermodel = require("../Models/seller")
const apierr = require("../utils/errclass")
const adminmodel = require("../Models/admin")
const works = { mod_maker: ["superadmin"] , applyforseller:["user"], addproduct:["seller"], updatepass:["user", "seller", "superadmin","mod"],
    verifyproduct: ["mod"]
}

const auth = async (req , resp , next)=>{
    try{
    const token = req.headers.authorization
    const verified = jwt.verify(token , process.env.jwt_secret_key )
    const work = req.path.split("/")[1]

    if(!works[work].includes(verified.role)){
        throw new apierr("Not auhtorized for this request", 403)
    }

    if(verified.role =="seller" ){
        const seller = await sellermodel.findOne({userid: verified._id})
        req.seller = seller
    }

    if(verified.role == "mod"){
        const mod = await adminmodel.findOne({userid: verified._id})
        req.mod = mod
    }

    const dbuser = await usermodel.findById(verified.id)
    req.user = dbuser
    
    }catch(err){
        next(err)
}}

module.exports = auth