//package.json
//server
//.env// third party npm i dotenv 
// it is used to hide the details like mongodb string for security purposes
// 0 independence modole
// npm i express
// npm i mongoose
// connect mongodb
//npm i nodemon
// .env
// port
//mongodb uri
// config
//    index.js
     //require('dotenv').config()
     // module.exports ={
     //     PORT:process.env.PORT,
      //     MONGODB_URI: process.env.MONGODB_URI
     // }
//  IMPORT index.js in sever     

const express=require('express');
const app = express();
let {PORT, MONGODB_URI}=require('./config/index.js');
const{engine}=require('express-handlebars')
const schema =require('./schema/schema');
const bodyParser = require('body-parser');
const routing = require('./router/router');
const mongoose = require('mongoose');
app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.use(express.urlencoded({extended:true}))

             // or
// const {connect} = require('mongoose');
// let connection = await connect(MONGODB_URI)
//

let connectdb=async()=>{
    // let connection = await mongoose.connect(MONGODB_URI)
    // console.log('Connected to MongoDB');
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));
  


}

connectdb()
app.get('/',  (req, res)=>{
    res.render('home',{tittle:'Home Page'})

})
app.get('/home',  (req, res)=>{
    res.render('home',{tittle:'Home Page'})

})
app.use('/api',routing)//static path

app.listen(PORT,err=>{
    if(err) console.log('Error:',err);
    else console.log('Server running on port 5000');
})