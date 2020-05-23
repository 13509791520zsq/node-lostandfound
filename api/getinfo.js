const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const router = express.Router()

const Litem = require('../models/litem')
const Fitem = require('../models/fitem')
//$route  GET /get/getalllitems
//@desc   返回的请求的json数据
//@acess  private
router.get('/getalllitems', passport.authenticate('jwt',{session: false}), (req,res)=>{
  Litem.find({},(err,doc)=>{
    doc.forEach(item=>{
      if(item.image){
        item.image = 'http://localhost:3000'+item.image.slice(2,-1)
      }
	 })
    
    res.json(doc)
  })

})

//$route  GET /get/getlitems
//@desc   返回的请求的json数据
//@acess  private
router.get('/getlitems', passport.authenticate('jwt',{session: false}), (req,res)=>{
  Litem.find({userid: req.user.id},(err,doc)=>{
    if(err){
      throw err
      res.status(500).json({success: false})
    }
    res.json(doc)
  })

})

//$route  GET /get/getallfitems
//@desc   返回的请求的json数据
//@acess  private
router.get('/getallfitems', passport.authenticate('jwt',{session: false}), (req,res)=>{
  Fitem.find({},(err,doc)=>{

    doc.forEach(item=>{
      if(item.image){
        item.image = 'http://localhost:3000'+item.image.slice(2,-1)
      }
	 })

    res.json(doc)
  })

})

//$route  GET /get/getfitems
//@desc   返回的请求的json数据
//@acess  private
router.get('/getfitems', passport.authenticate('jwt',{session: false}), (req,res)=>{
  Fitem.find({userid: req.user.id},(err,doc)=>{
    // console.log(doc)
    res.json(doc)
  })

})

router.get('/',(req,res)=>{
  res.json('hello getinfo')
})

module.exports = router