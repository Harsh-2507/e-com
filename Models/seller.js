const mongoose = require("mongoose")
const usermodel = require("./user")

const sellerschema = mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        requried: true,
        maxlength: 30
    },

    email:{
        type: String ,
        unique: true,
        required: true 
    },

    password:{
        type: String,
        minlength: 6,
        maxlength: 30,
        required: true
    },

    phone:{
        type: Number,
        min:1000000000,
        max:9999999999,
        unique: true,
        required: true
    },

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usermodel
    },

    storeName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },

    ownerName:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },

    category:{
        type: String,
        categories:[],
    },

    gstNumber:{
        type: String,
        minlength: 15,
        maxlength: 15,
        required: true
    },

    panNumber:{
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true
    },

    businesstype: {
        type: String,
        minlength: 5,
        maxlength: 40,
        required: true
    },

    bankDetails: {
        accountHolder: String,
        accountNumber: {
            type: Number,
            required: [true, 'Bank account number is required'],
            minlength: [9, 'Account number cannot be less than 9 digits'],
            maxlength: [18, 'Account number cannot exceed 18 digits'],
        },
        ifsc: {
            type: String,
            required: [true, 'IFSC code is required'],
            uppercase: true,
            minlength: [11, 'IFSC code must be exactly 11 characters'],
            maxlength: [11, 'IFSC code must be exactly 11 characters'],
        },
        bankName: String
    },

    isVerified:{
        type: Boolean,
        default: false
    },

    isBlocked:{
        type: Boolean,
        default: false
    },

    totalproducts : Number,

    // role: {
    //     type: String,
    //     default: "Seller"
    // }

})

const sellermodel = mongoose.model("Sellers" , sellerschema)

module.exports = sellermodel