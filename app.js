const express = require("express")
const errror = require("./middlewares/err")
const app = express()
const useroutes = require("./Routes/useroute")

app.use(express.json())
app.use("/user" , useroutes )
app.use("/user/seller", seller_routes)
app.use("/user/admin", adminroutes)
app.use(errror)

module.exports = app