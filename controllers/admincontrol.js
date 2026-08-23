const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const apierr = require("../utils/errclass")
const bcrypt = require("bcrypt")
const usermodel = require("../Models/user")
const adminmodel = require("../Models/admin")
const productmodel = require("../Models/product")

const mod_maker = async( req , resp ,next)=>{
    try{
        const admin = req.body
        const ifuser = await usermodel.findByID(admin.userid)
        if(!ifuser){
            throw new apierr("User for this id not exists", 400)
        }
        const ifadmin = await adminmodel.findOne({email: ifuser.email})
        if(ifadmin){
            throw new apierr("Mod already exists", 400)
        }
        ifuser.role = "admin"
        await ifuser.save()
        const newadmin = await adminmodel.create(admin)
        resp.status(201).json({status: true , message:"Mod has been created", mod: newadmin})
    }catch(err){
        next(err)
}}

const allproducts = async( req, resp, next)=>{
    try{
        const products = await productmodel.find()
        resp.status(200).json({status: true, message:"here are all the unverified products", products: products})
    }catch(err){
        next(err)
}}

const verifyproduct = async(req, resp ,next)=>{
    try{
        const {productid} = req.body
        const productID = productid
        delete req.body.productid
        const ifprod = await productmodel.findByID(productID)
        if(!ifprod){
            throw new apierr("Product for this id not exists", 400)
        }
        Object.assign(ifprod , req.body)
        await ifprod.save()
        resp.status(200).json({status: true, message:"Product verified"}) 
    }catch(err){
        next(err)
}}

const delproduct = async(req, resp, next)=>{
    try{
        const {productid} = req.body
        const ifprod = await productmodel.findByID(productid)
        if(!ifprod){
            throw new apierr("Product for this id not exists", 400)
        }
        await ifprod.deleteOne()
        resp.status(200).json({status: true, message: "Product hass been deleted"})
    }catch(err){
        next(err)
}}

const verifyseller = async(req, resp, next)=>{

}


module.exports = {mod_maker, allproducts, verifyproduct, delproduct, verifyseller }



