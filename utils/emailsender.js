const transporter = require("../config/mailer.js")

const sendmail = (to , sub , data)=>{
    const mailoptions = {
        from : process.env.app_mail ,
        to : to,
        subject : sub,
        html : data
    }
    transporter.sendMail(mailoptions)
}

module.exports = sendmail