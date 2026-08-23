const mongoose = require("mongoose")
const sellermodel = require("./seller.js")
const { boolean } = require("joi")
const productschema = mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    brand: {
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    subCategory:{
        type: String,
    },

    price:{
        type: Number,
        required: true,
    },

    stock:{
        type: Number,
        required: true,
    },

    images: [{
        url: String,
        public_id: String,
        original_filename: String
    }],

    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: sellermodel,
        required: true
    },

    warranty:{
        type: String,
    },

    returnPolicy:{
        type: String
    },

    isverified:{
        type: boolean,
        default: false
    }

})

const productmodel = mongoose.model("Product", productschema)
module.exports = productmodel