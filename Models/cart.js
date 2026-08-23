const mongoose = require("mongoose")
const usermodel = require("./user")
const productmodel = require("./product")
const cartschema = mongoose.Schema(
    {
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usermodel
    },

    items: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: productmodel
            },
            quantity: Number
        }
    ]
    
})

const cartmodel = mongoose.model("Cart", cartschema)
module.exports = cartmodel 