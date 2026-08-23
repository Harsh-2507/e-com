const joi = require("joi")
const apierr = require("../utils/errclass")

const validator = (schema)=>{
    return (req, resp, next)=>{
        const {error , value} = schema.validate(req.body ,{ 
            abortEarly: false,
            stripUnknown: true
    })
    if(error)
        throw new apierr(error.message , 400)

    next()
    }
}

module.exports= validator
