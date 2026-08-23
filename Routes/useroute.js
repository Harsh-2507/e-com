const {signupschema , loginschema, pass_schema} = require("../validation/inputschema")
const validator = require("../middlewares/validator")
const tokenverify = require("../middlewares/tokenverify")
const auth = require("../middlewares/auth.js")
const {usersignup , verifier , otpverify, userlogin, newpassword, updatepassword } = require("../controllers/usercontrol.js")
const {mod_maker } = require("../controllers/admincontrol.js")
const {sellersignup , applyforseller } = require("../controllers/sellercontrol.js")
const exp = require("express")
const router = exp.Router()


router.post("/signup", tokenverify , validator(signupschema) , usersignup )
router.post(["/emailverify", "/forgotpass"] , verifier )
router.post("/otpverify" , otpverify)
router.post("/login" , validator(loginschema), userlogin)
router.post("/newpass" , tokenverify , newpassword)
router.post("/sellersignup" , sellersignup)
router.post("/applyforseller" , auth , applyforseller)
router.post("/updatepass",auth ,validator(pass_schema) , updatepassword)


module.exports = router