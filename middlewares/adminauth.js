const usermodel = require("../Models/user")
const apierr = require("../utils/errclass")
const modtype = {manageproducts: ["allproducts","verifyproduct","delproduct"] }
const adminauth = async(req , resp, next)=>{
    try{
        const {permission} = req.admin
        const work = req.path.split("/")[1]
        const flag = true
        for(p in permission){
            if(modtype[p].includes(work)){
                flag = false
                break
        }}
        if(flag){
            throw new apierr("Not auhtorised for this request", 403)
        }

    }catch(err){
        next(err)
    }
}