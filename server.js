require("dotenv").config()
const app = require("./app.js")
const dbstart = require("./config/Dbconnect")

require("dotenv").config()

dbstart

app.listen(process.env.port , ()=>{
    console.log("Server has started")
})
