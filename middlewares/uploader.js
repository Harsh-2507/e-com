const multer = require("multer")
const Apierror = require("../utils/errclass")


const storage = multer.diskStorage({
    destination : (req , file , cb )=>{
        cb(null , "../uploads")
    },

    filename : (req , file , cb)=>{
        const date = Date.now()
        const filenName = `${date}_${file.originalname}`
        // console.log(filenName)
        cb(null , filenName)
    }
})

const upload = multer({
    storage : storage ,

    fileFilter: (req , file , cb)=>{
        const allowedfiles = ["image/jpeg" , "image/png" , "image/jpg" , "application/pdf"  ]

        if(allowedfiles.includes(file.mimetype)){
            cb(null , true)
        }
        else{
            cb(new Apierror('Wrong file type', 400))
        }
    },

    limits : {
        fileSize : 2*1024*1024 ,
        files : 5
    }
})

module.exports = upload