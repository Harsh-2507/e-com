const exp = require("express")
const router = exp.Router()
const upload = require("../middlewares/uploader.js")
const auth = require("../middlewares/auth.js")
const {addproduct, sellersignup, getproduct, getproducts, deleteproduct, updateproduct, updateseller  } = require("../controllers/sellercontrol.js")


router.post("/sellersignup", sellersignup)
router.post("/addproduct", auth ,upload.array("image", 5 ), addproduct )
router.post("/deleteproduct", auth, deleteproduct)
router.post("/getproducts", auth, getproducts )
router.post("/getproduct", auth, getproduct)
router.post("updateproduct", auth, updateproduct)
router.post("/updateseller", auth, updateseller)