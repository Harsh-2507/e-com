const mongoose = require("mongoose")

mongoose.connect(process.env.connection_string).then(()=>{
    console.log("Db connected successfuly")
}).catch((err)=>{
    console.log("You got an error while connecting to the db" , err)
})

module.exports = mongoose
