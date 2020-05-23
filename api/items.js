const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const upload = multer({ dest: '../static/upload' })
const Litem = require('../models/litem')
const Fiten = require('../models/fitem')
const User = require('../models/user')

router.get('/',passport.authenticate('jwt',{session: false}),(req,res) => {
  User.findById(req.user.id,(err,data)=>{
     data.litemsid = []
    data.save()
        .then(doc=>console.log('清空数组'))
        .catch(err=>console.log(err))
  })
  res.send('hello')
})

//$route  post /api/items/lupload
//@desc   返回的请求的json数据
//@acess  public

router.post('/lupload',passport.authenticate('jwt',{session: false}), upload.single('image'), (req, res) => {
  // console.log(req)
  if(req.file){
    fs.renameSync(req.file.path, `../static/upload/${req.file.originalname}`)
  }
  // console.log(req.file)
  const temp = {}
  if(req.body.itemname)temp.itemname=req.body.itemname
  if(req.body.place)temp.place=req.body.place
  if(req.body.date)temp.date=req.body.date
  // if(req.body.image)temp.image=`http://localhost:3000/static/upload/${req.file.originalname}`
  
  if(req.body.sketch)temp.sketch=req.body.sketch
  if(req.user.id)temp.userid=req.user.id
  if(req.body.phone)temp.phone=req.body.phone
  new Litem(temp).save().then(item=>{
    // console.log(item)
    res.json({success: true})
  })
})

//$route  post items/fupload
//@desc   返回的请求的json数据
//@acess  public

router.post('/fupload',passport.authenticate('jwt',{session: false}), upload.single('image'), (req, res) => {
  if(req.file){
    fs.renameSync(req.file.path, `../static/upload/${req.file.originalname}`)
  }
  const temp = {}
  if(req.body.itemname)temp.itemname=req.body.itemname
  if(req.body.place)temp.place=req.body.place
  if(req.body.date)temp.date=req.body.date
  // if(req.body.path)temp.image=`../static/upload/${req.file.originalname}
  if(req.body.sketch)temp.sketch=req.body.sketch
  if(req.body.phone)temp.phone=req.body.phone
  if(req.user.id)temp.userid=req.user.id
  new Fitem(temp).save().then(item=>{
    // console.log(item)
    res.json({success: true})
  })
})




//$route  DELETE items/ldelete
//@desc   返回的请求的json数据
//@acess  protect
router.delete('/ldelete/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
  Litem.findById(req.params.id,(err,doc)=>{
    // console.log(req.params.id)
    // console.log(data)
  //   if(doc.image==null){
  //     let imgurl = doc.image
  //     fs.unlink(imgurl,err=>{
  //       if(err){
  //         throw err
  //       }
  //       console.log('文件'+imgurl+'删除成功！')
  //     })
  //   }
  })

  Litem.deleteOne({_id: req.params.id},(err) => {
    if(err){
      throw err
      return res.json({success: false})
    }
    res.json({success: true})
  })
})
 
//$route  DELETE items/fdelete
//@desc   返回的请求的json数据
//@acess  protect
router.delete('/fdelete/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
  Fitem.findById(req.params.id,(err,doc)=>{
    if(doc.image){
      let imgurl = doc.image
      fs.unlink(imgurl,err=>{
        if(err){
          throw err
        }
        console.log('文件'+imgurl+'删除成功！')
      })
    }
  })

  Fitem.deleteOne({_id: req.params.id},(err,doc) => {
    if(err){
      throw err
      return res.json({success: false})
    }
    res.json({success: true})
  })
})

module.exports = router
