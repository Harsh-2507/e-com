const joi = require("joi")
const valid_permissions = [
    // "manageUsers",
    "manageProducts",
    "manageOrders",
    "manageSellers"
    ]
const signupschema = joi.object({
    name: joi.string().required().min(3).max(30),
    email: joi.string().email().min(15).max(50),
    phone: joi.number().required().min(1000000000).max(9999999999),
    password: joi.string().required().min(6),
})

const loginschema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
})
const pass_schema = joi.object({
    currentpassword: joi.string().min(6).max(20).required(),
    newpassword: joi.string.min(6).max(20).required()
})

const addresschema = joi.object({
    state : joi.string().required(),
    city: joi.string().required(),
    address_type:joi.string().required(),
    country: joi.string().required()
})

const notallowed = joi.object({
    isverified: joi.forbidden(),
    isblocked: joi.forbidden(),
    password: joi.forbidden()
})

const adminschema = joi.object({
    userid: joi.string().required(),
    permission: joi.array().items(joi.string().valid(valid_permissions)).required() 
})


module.exports = {signupschema , loginschema , addresschema, pass_schema, notallowed, adminschema}