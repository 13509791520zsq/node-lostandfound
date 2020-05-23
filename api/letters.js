const express = require('express')
const router = express.Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')
const Letter = require('../models/letter')


router.get('/',(req,res)=>{
  res.json({success: true})
})

//$route  post /api/letters/uploadletters
//@desc   返回的请求的json数据
//@acess  private
//参数： userid . title . body [data,fonduserid, ]
router.post('/uploadletters',passport.authenticate('jwt',{session: false}),(req,res)=>{
  let letter = {}
  if(req.body.title){
    if(req.body.body){
      letter.title = req.body.title
      letter.body = req.body.body
      letter.userid = req.user.id
    }
  }
  
  if(req.body.data){
    letter.data = req.body.data
  }
  if(req.body.founduserid){
    letter.founduserid = req.body.founduserid
  }
  new Letter(letter).save().then(item=>{
    res.status(200).json({success: true})
  }).catch(err=>console.log(err))

})





//$route  get /api/letters/getallletters
//@desc   返回的请求的json数据
//@acess  public
router.get('/getallletters',passport.authenticate('jwt',{session: false}),(req,res)=>{
  Letter.find({},(err,doc)=>{
    if(err){
      console.log(err)
      throw err
    }
    res.json(doc)
  })
})

//$route  get /api/letters/getallletters
//@desc   返回的请求的json数据
//@acess  public
router.get('/getmyletters',passport.authenticate('jwt',{session: false}),(req,res)=>{
  Letter.find({userid: req.user.id},(err,doc)=>{
    if(err){
      console.log(err)
      throw err
    }
    res.json(doc)
  })
})

//$route  delete /api/letters/deleteletter/: id
//@desc   返回的请求的json数据
//@acess  public
router.delete('/deleteletter/:id',passport.authenticate('jwt',{session: false}), (req,res)=>{
  Letter.deleteOne({_id: req.params.id},(err)=>{
    if(err){
      console.log(err)
      throw err
    }
    res.json({success: true})
  })

})
//$route  delete /api/letters/thumbsup
//@desc   返回的请求的json数据
//@acess  public
//参数： letterid
router.post('/thumbsup',passport.authenticate('jwt',{session: false}),(req,res)=>{
  Letter.findById(req.body.id,(err,doc)=>{
    doc.thumbsup++
    doc.save().then(item=>{
      res.json({success: true})
    })
    .catch(err=>console.log(err))
  })
})


module.exports=router