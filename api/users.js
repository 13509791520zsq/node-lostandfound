const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/user')
const passport = require('passport')

mongoose.set('useFindAndModify', false);

//$route  GET /users/test
//@desc   返回的请求的json数据
//@acess  public

router.get('/test',(req,res)=>{
  res.json('hello!!!!')
})


//$route  POST /users/login
//@desc   返回success,token
//@acess  public
//status  200 成功 ，404 用户不存在在， 400 密码错误 ,500 未知报错
router.post('/login',(req,res)=>{
  User.findOne({email: req.body.email})
      .then(user=>{
        if(!user){
          return res.status(404).json('用户不存在')
        }
        bcrypt.compare(req.body.password,user.password)
              .then(ismatch=>{
                if(ismatch){
                  const role = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar,
                    identity: user.identity
                  }
                  jwt.sign(role,keys.secretOrKey,{expiresIn : 3600} , (err,token)=>{
                    if(err){
                      throw err
                    }
                    res.status(200).json({success: true, token: 'Bearer ' + token})
                  })
                }else{
                  res.status(400).json({success: false,message: '密码错误！'})
                }
              })
      })
      .catch(err=>{
        res.status(500).json(err)
      })

})
//$route  POST /users/register
//@desc   返回的请求的json数据
//@acess  public
//status  200 成功 ， 400 邮箱已注册 ，500 未知错误
router.post('/register',(req,res)=>{
  User.findOne({email: req.body.email})
      .then(user=>{

        if(user){
          return res.status(400).json("邮箱已注册")
        }else{

          const avatar = gravatar.url(req.body.email,{s: '200', r: 'pg', d: 'mm'})

          let newUser =new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar
          })

          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if(err){
                throw err
              }
              newUser.password = hash
              newUser.save()
                    .then(user=>res.status(200).json(user))
                    .catch(err=>res.status(500).json(err))
            })
          })

        }
      })
      .catch(err=>{
        res.status(500).json(err)
      })
})


//$route  get /users/deleteuser
//@desc   返回所有user的信息
//@acess  private
//status  200 成功 ，404 用户不存在在， 400 密码错误 ,500 未知报错

router.get('/getuser', passport.authenticate('jwt',{session: false}), (req,res)=>{
  User.find()
      .then(doc=>{
        // console.log(doc)
        res.status(200).json(doc)
      })
      .catch(err=>{
        console.log(err)
        res.status(400).json({success: false})
      })
})




//$route  delete /users/deleteuser/:id   参数： id
//@desc   返回success,info
//@acess  private
//status  200 成功 ，404 用户不存在在， 400 密码错误 ,500 未知报错

router.delete('/deleteuser/:id', passport.authenticate('jwt',{session: false}), (req,res)=>{
  if(req.user.identity!=='root'){
    res.status(422).json({success: false,message: '权限不足'})
  }else{
    User.deleteOne({_id: req.params.id},(err)=>{
      if(err){
        console.log(err)
        throw err
      }else{
        res.status(200).json({success: true})
      }
    })
  }
})

//$route  post /users/deleteuser    参数： id
//@desc   返回success
//@acess  private
//status  200 成功 ，404 用户不存在在， 400 密码错误 ,500 未知报错
router.post('/privilege', passport.authenticate('jwt',{session: false}), (req,res)=>{


  User.findByIdAndUpdate(req.body.id,{identity: 'root'},(err,doc)=>{
    if(err){
      console.log(err)
      throw err
    }
    res.json({success: true})
  })
})






module.exports = router