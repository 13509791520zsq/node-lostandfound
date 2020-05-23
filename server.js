const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const bodyparser = require('body-parser')
const passport = require('passport')
const multer  = require('multer')
const upload = multer({ dest: './static/upload' })

const users = require('./api/users')
const items = require('./api/items')
const getinfo = require('./api/getinfo')
const query = require('./api/queryitems')
const letters = require('./api/letters')

const app = express()


// app.all('*', function(req, res, next) {  
//     res.header("Access-Control-Allow-Origin", "*");  
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");  
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
//     res.header("X-Powered-By",' 3.2.1')  
//     res.header("Content-Type", "application/json;charset=utf-8");  
//     next();  
// })

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/static/",express.static(path.join(__dirname, 'static')))


//passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)

const db = require('./config/keys').mongoURI
mongoose.connect(db)
        .then(()=>{
          console.log('MongoDB Connected')
        })
        .catch((error)=>{
          console.log(error)
        })


app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file);
  fs.renameSync(req.file.path, `./static/upload/${req.file.originalname}`)
  res.send(req.file)
})
app.post('/upload', multer({
  dest: 'upload'
}).array('file', 10), (req, res) => {
  const files = req.file
  const fileList = {}
  for (var i in files) {
    var file = files[i]
    fs.renameSync(file.path, `./static/upload/${file.originalname}`)
    file.path = `upload/${file.originalname}`
    fileList.push(file)
  }
  res.send(fileList)
})
app.get('/download', (req, res) => {
  req.query.url ? res.download(`./static/upload/${req.query.url}`) : res.send({
    success: false
  })
})


app.use('/api/users',users)
app.use('/api/items',items)
app.use('/api/get',getinfo)
app.use('/api/query',query)
app.use('/api/letters',letters)

const port = process.env.PORT ||3000
app.listen(port,() => {
console.log(`server running on port ${port}`)
})