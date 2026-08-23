const mongoose = require("mongoose")
const usermodel = require("../Models/user")
const jwt = require("jsonwebtoken")
const apierr = require("../utils/errclass")
const bcrypt = require("bcrypt")
const OTP = require("../utils/otpmaker")
const emailer = require("../utils/emailsender")
const cache = require("memory-cache")

const usersignup = async (req, resp , next)=>{
    try{
    const User = req.body
    const ifuser = await usermodel.findOne({email: req.user.email})

    if(ifuser){
        throw new apierr("User already exists, please signup or login", 400)
    }
    User.role = user 
    User.email = req.user.email
    User.password = await bcrypt.hash(user.password, 10)
    const newuser = await usermodel.create(User)
    resp.status(201).json({status: true , message: "New user has been created" , user: newuser})

}catch(err){
    next(err)
}}

const verifier = async (req , resp , next)=>{
    try{
    const {email} = req.body
    if(!email){
        throw new apierr("Email not entered" , 400)
    }
    const otp = OTP()
    const hashedotp = await bcrypt.hash(otp , 7) 
    cache.put(email, hashedotp, 300000); 
    emailer(email , "Otp for signup" , otp)
    resp.status(200).json({status: true, message: "check your email for the otp"})

}catch(err){
    next(err)
}}

const otpverify = async (req , resp , next)=>{
    try{
    const {email , otp} = req.body
    if(!email || !otp){
        throw new apierr("email or otp not entered", 400)
    }
    const savedotp = cache.get(email)   
    if(!savedotp){
        throw new apierr("Otp has expired or does'nt exist", 400)
    }
    const check = await bcrypt.compare(otp , savedotp)
    if(!check){
        throw new apierr("Incorrect otp", 400)
    }
    const token = jwt.sign({email: email},  process.env.jwt_secret_key ,{expiresIn :"1d"} )
    resp.status(200).json({status:true , message :"You can now signup" , token:token })

}catch(err){
    next(err)
}}

const newpassword = async(req, resp ,next)=>{
    try{
        const {password} = req.body
        const hashedpass = await bcrypt.hash(password, 10)
        const ifuser = await usermodel.updateOne({email: req.user.email},{password:hashedpass}, {new:true})
        resp.status(200).json({status:true, message:"password has been changed successfuly", newpass:password})
    }catch(err){
        next(err)
    }

}

const userlogin = async (req, resp , next)=>{
    try{
    const {email , password} = req.body
    const user = await usermodel.findOne({email:email})
    if(!user){
        throw new apierr("User not exists , please signup", 400)
    }
    const check = await bcrypt.compare(password , user.password)
    if(!check){
        throw new apierr("Worng passowrd", 400)
    }
    const token = await jwt.sign({email: email, id: user._id , role: user.role } , process.env.jwt_secret_key , {expiredIn: "5d"})
    resp.status(200).json({status: true , message: "you are now loggedIN , enjoy ", token: token})

}catch(err){
    next(err)
}}

const updatepassword = async(req, resp ,next)=>{
    try{
        const pass = req.user.password
        const {currentpassword , newpassword} = req.body
        if(!currentpassword || !newpassword){
            throw new apierr("Fill the passwords properly", 400 )
        }
        const check = await bcrypt.compare(currentpassword , pass)
        if(!check){
            throw new apierr("Wrong current password", 400)
        }
        const hasspass = await bcrypt.hash(newpassword , 10)
        req.user.password = hasspass
        await req.user.save()
        resp.status(200).json({status: true, message:"Password changed successfuly" })
    }catch(err){
        next(err)
    }}


module.exports = {usersignup ,  otpverify,  userlogin, verifier ,newpassword, updatepassword}




