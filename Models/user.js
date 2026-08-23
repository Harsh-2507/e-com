const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },

    email:{
        type: String ,
        unique: true 
    },

    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30
    },

    phone:{
        type: Number,
        required: true,
        min:1000000000,
        max:9999999999,
        unique: true
    },

    role: {
        type: String,
        enum: ["user", "seller", "mod", "superadmin" ],
        default: "user"
    }

})

const usermodel = mongoose.model("user" , userschema)
module.exports = usermodel