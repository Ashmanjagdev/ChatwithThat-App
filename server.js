const express= require("express");
const dotenv = require("dotenv");

require('dotenv').config();
const app = express();
let bodyParser=require("body-parser");
const mongoose=require('mongoose');
const session = require('express-session');
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
mongoose.set('strictQuery', false);

const cors = require("cors");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
  secret:"There is no secret",
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect('mongodb+srv://ashman:ashmanraju@cluster0.n8apx.mongodb.net/ChatApp');


const userschema= new mongoose.Schema ({
  name: String,
  username:String,
  password: String,
  confirmpassword: String
});

userschema.plugin(passportLocalMongoose);

const User=new mongoose.model("User",userschema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const users=[{}];


var values='';
app.get("/check", (req, res) => {


  if(req.isAuthenticated()){
    var name=req.user.name;
    
    const myJSON = JSON.stringify(name);
      return res.send(myJSON);
  }
  else{
    return res.status(201).json({error:"account not created"});
  }

});

app.post('/signin', (req, res) => {

User.find({username:req.body.username}, (err, items2) => {
  if(items2.length){
    items2.forEach((item) => {

          if (item.username===req.body.username){
       if(item.password!=req.body.password){

         return res.status(391).json({error:"email id already exist"});

       }
       else{
         const user= new User({
           username: req.body.username,
           passwword: req.body.password
         });
         req.login(user,function(err){
           if(err){
             return res.status(390).json({error:"email id already exist"});
           }
           else{

             passport.authenticate("local")(req,res, function(){
             return res.send("200");
             });
           }
         });
       }
        }
      });
}
else{
  return res.status(393).json({error:"Wrong Email address"});
}

  });


});


app.post('/signup', (req, res) => {

  User.find({username:req.body.username}, (err, items2) => {

      if (items2.username) {
         return res.status(393).json({error:"email id already exist"});
        
      }
      else{
        
         if (req.body.password!=req.body.confirmpassword) {
           return res.status(391).json({error:"passwords are not matching"});

         }
        else{
        User.register({username:req.body.username,name:req.body.name,password:req.body.password,confirmpassword:req.body.confirmpassword}, req.body.password,function(err, user){
         if(err){
              return res.status(392).json({error:"email id already exist"});
            }
            else{
                
            passport.authenticate("local")(req,res, function(){
            return res.send("200");
            }); 
        }
        
        });

      }
      }
    });
});

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));
  const path =require("path");

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

app.listen(4000,()=>{
    console.log(`Working`);
});




