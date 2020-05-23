const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const router = express.Router()

const Litem = require('../models/litem')
const Fitem = require('../models/fitem')


//$route  POST /api/query/querylitems  参数：itemname/place/date
//@desc   返回的请求的json数据
//@acess  private
router.post('/querylitems', passport.authenticate('jwt',{session: false}), (req,res)=>{
  const queryinfo = {}
  if(req.body.itemname){
    queryinfo.itemname = req.body.itemname
  }
  if(req.body.place){
    queryinfo.place = req.body.place
  }
  if(req.body.date){
    queryinfo.date = req.body.date
  }
  Litem.find(queryinfo,(err,doc)=>{
    if(err){
      throw err
      return res.status(500).json('success: false')
    }
    // console.log(doc)
    res.json(doc)
  })
})
//$route  POST /api/query/queryfitems 参数：itemname/place/date
//@desc   返回的请求的json数据
//@acess  private
router.post('/queryfitems', passport.authenticate('jwt',{session: false}), (req,res)=>{
  const queryinfo = {}
  if(req.body.itemname){
    queryinfo.itemname = req.body.itemname
  }
  if(req.body.place){
    queryinfo.place = req.body.place
  }
  if(req.body.date){
    queryinfo.date = req.body.date
  }
  Fitem.find(queryinfo,(err,doc)=>{
    if(err){
      throw err
      return res.status(500).json('success: false')
    }
    res.json(doc)
  })

})



router.get('/',(req,res)=>{
  res.json('hello getinfo')
})

module.exports = router