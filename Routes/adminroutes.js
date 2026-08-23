const exp = require("express")
const auth = require("../middlewares/auth.js")
const { mod_maker, allproducts, verifyproduct, delproduct, verifyseller } = require("../controllers/admincontrol.js")

const router = exp.Router()

router.post("/mod", auth, mod_maker)
router.get("/products", auth, allproducts)
router.patch("/product/verify", auth, verifyproduct)
router.delete("/product", auth, delproduct)
router.patch("/seller/verify", auth, verifyseller)

module.exports = router
