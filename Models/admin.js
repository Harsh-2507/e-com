const { string } = require('joi')
const mongoose = require('mongoose')
const usermodel = require('./user')
const valid_permissions = [
    // "manageUsers",
    "manageproducts",
    "manageorders",
    "managesellers"
    ]

const adminschema = mongoose.Schema({
    
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usermodel
    },

    permission: {
        type: [String],
        required: true,
        enum: valid_permissions
    },



})

const adminmodel = mongoose.model("Admin", adminschema)

module.exports = adminmodel