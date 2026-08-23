const { object } = require("joi")
const mongoose = require("mongoose")
const usermodel = require("./user")
const address_schema = mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: usermodel
    },
    
    address_type : {
        type: String,
        required: true
    },

    state: String,
    city: String,
    near_by: String,
    town: String,
    Country: {
        type: String,
        default: "India",
    }
    

})