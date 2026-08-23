   const mongoose = require("mongoose")
const usermodel = require("./user")
const productmodel = require("./product")
const sellermodel = require("./seller")
const orderschema = mongoose.Schema(
    {
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: usermodel
    },

    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: productmodel
            },

            quantity: Number,

            price: {
                type: Number
            }
        }
    ],

    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: sellermodel
    },

    shippingAddress:{
        
    },

    paymentMethod:{
        type: String,
        required: true
    },

    paymentStatus:{
        type: String,
        enum: ["In-process", "complete"],
        default: "In-process"
    },

    // orderStatus,

    totalAmount:{

    }
})

const ordermodel = mongoose.model("Order", orderschema)
module.exports = ordermodel