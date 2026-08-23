const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail" ,
    auth:{
        user: process.env.app_mail ,
        pass: process.env.app_pass
    }
})

module.exports = transporter