let express = require('express')
let mongoose = require('mongoose'),

app = express()
//للجلسة 
const expressSession = require('express-session') //middle where to taking & giving information in session
const cookieParser = require('cookie-parser')// مكتبة لإدراة الجلسة ومتابعة المستخدم 
const passport = require('passport')//  مكتبة لتسهيل عملية المصادقة للمستخدم  

const User = require('./models/user')
//const { route } = require('./routes/index')

/*app.get('/', (req, res)=>{
    res.json({message: "Hello, World"})
})*/

/*for conect  to database */
const router = require('./routes/index')
//const { Passport } = require('passport')

/***first using "promises" feature to ensure the code implement correctly or catch the error 
 * global to use for any file in project 4
 * */
mongoose.Promise = global.Promise

/**then useing connect() which is takes  4 paramters  and define the URL that consist of : 
 * 1- type of database "mongodb"
 * 2-The host "localhost"
 * 3- The port "27017"
 * 4- The name of database "blogs"
 * To run atfer connent type " node app" */

mongoose.connect('mongodb://localhost:27017/blogs',{
   useUnifiedTopology:true, //*
    useNewUrlParser:true
})

mongoose.set('useNewUrlParser', true);//*
mongoose.set('useFindAndModify', false);//*
mongoose.set('useCreateIndex',true);//*


app.use(express.json())

app.use(cookieParser('myblog')) //myblogs is secret word 
//تاخذ خصاءص الجلسة ثم تحفظ بياناتها
app.use(expressSession({
    secret: 'myblog',
    saveUninitialized: true, //svae session info in the database for it 
    resave:true, //resave session data after end session 
    cookie: {maxAge: 6000}//6 seconds (time foe save session)
}))

//passport setting
app.use(passport.initialize()) //given defoult values to passport 
app.use(passport.session())//passport is using session 

passport.use(User.createStrategy())// away to user do sing in /out
passport.serializeUser(User.serializeUser())//save user info in session 
passport.deserializeUser(User.deserializeUser())// delete user info after end the  session 
/**
 * then insert the libiers
 * npm i express-session
 * npm i passport
 * npm i cookie-parser
 * npm i passport-local-mongoose
 * 
 */

app.use('/', router)

app.listen(3000 , ()=>{
    console.log('express has started!')
})

//localhost:3000/