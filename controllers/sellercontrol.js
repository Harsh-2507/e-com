const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const apierr = require("../utils/errclass")
const bcrypt = require("bcrypt")
const cloud = require("../config/cloud")
const usermodel = require("../Models/user")
const sellermodel = require("../Models/seller")
const fs = require("fs")
const productmodel = require("../Models/product")

const sellersignup = async ( req , resp , next)=>{
    try{
    const seller = req.body
    const ifexist = await sellermodel.findONe({email: seller.email})
    if(ifexist){
        throw new apierr("Seller for this email already exists", 400)
    }
    const hasedpass =await bcrypt.hash(seller.password , 10)
    const user = {name: seller.name , email: seller.email , phone: seller.phone, password: hasedpass, role: "seller" }
    const newuser = await usermodel.create(user)
    seller.userid = newuser._id
    const newseller = await sellermodel.create(seller)
    resp.status(201).json({status: true, message: "Seller has been created"})
}catch(err){
    next(err)}}

const applyforseller = async(req, resp ,next)=>{
    try{
    const user = req.user
    const seller = req.body
    const email = req.user.email
    const ifexist = await sellermodel.findOne({email: email})
    if(ifexist){
        throw new apierr("Seller for this email already exists", 400)
    }
    seller.name = user.name
    seller.email = user.email
    seller.password = user.password
    seller.phone = user.phone
    seller.userid = user._id
    user.role = "seller" 
    await user.save()
    const newseller = await sellermodel.create(seller)
    resp.status(201).json({status: true, message: "Seller has been created"})

}catch(err){
    next(err)
}}

const addproduct = async(req, resp , next)=>{
    try{
        const product = req.body
        for( let i= 0; i< req.files.length ; i++){
            const endfile = await cloud.uploader.upload(req.files[i].path)
            await fs.unlink(req.files[i].path)
            const image = { public_id: endfile.public_id, url: endfile.url, original_name: endfile.original_filename}
            product.images.push(image)
        }
        product.seller = req.seller._id
        product.isverified = false
        const endproduct = await productmodel.create(product)
        resp.status(201).json({status: true, message: "Product has been added.", product: endproduct})
    }catch(err){
    next(err)
}}

const getproducts = async(req, resp ,next)=>{
    try{
        const seller = req.seller
        const products = await find({seller: seller._id})
        if(!products){
            throw new apierr("No products found..", 400)
        }
        resp.status(200).json({status: true, message: "Products have been found..", products: products})
    }catch(err){
        next(err)
}}

const updateproduct = async(req, resp , next)=>{
    try{
    const {productid} = req.body
    // if(req.user.role == "seller"){
        // if(req.body.isverified){
        //     throw new apierr("not auhtorized to update this property", 403)
        // }
        const productID = productid
        delete req.body.productid
        const updateprod = await productmodel.findByIDAndUpdate(productID, req.body, {new: true})
        resp.status(200).json({status: true , message: "Product has been updated", product : updateprod})
    // }
    }catch(err){
        next(err)
}}

const updateseller = async(req, resp,next)=>{
    try{
        const {sellerid} = req.seller._id
        const updatedseller = req.body
        if(updatedseller.isverified || updatedseller.isblocked || updatedseller.password ){
            throw new apierr("Can't update these credentials", 403)
        }
        const seller = await sellermodel.findByIDAndUpdate(sellerid , updatedseller , {new: true} )
        resp.status(200).json({status: true , message: "Seller has been updated" , updatedseller: seller})
    }catch(err){
        next(err)
}}

const getproduct = async(req, resp , next)=>{
    try{
        const {productid} = req.body
        const ifprod = await productmodel.findByid(productid)
        if(!ifprod){
            throw new apierr("Product for this id not exists", 400)
        }
        resp.status(200).json({status: true, message:"Here is the asked product" , product: ifprod})
    }catch(err){
        next(err)
}}

const deleteproduct = async(req, resp , next)=>{
    try{
        const {productid} = req.body
        const deletedprod = await productmodel.findByIDAndDelete(productid)
        if(!deletedprod){
            throw new apierr("product of this id dont,nt exists", 400)
        }
        resp.status(200).json({status: true, message:"Product was deleted successfuly"})
    }catch(err){
        next(err)
}}




module.exports = {sellersignup  , applyforseller , addproduct, getproducts, getproduct, deleteproduct, updateseller, updateproduct}
