//link conroller with it's model
const { json } = require("express")
const passport = require("passport")
const jsonwebtoken = require('jsonwebtoken')
const User = require("../models/user")

module.exports = {
    // index function return all users info 
    index:(req,res)=> {
        User.find({}) //if true do then else do catch
        .then(users => {
            res.json(users)
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
    //Show info  spsific user
    show:(req,res)=> {
        let userId = req.params.uid
        User.findById (userId) //if true do then else do catch
        .then(user => {
            res.json({user})
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
    //update 
    update:(req,res)=> {
        let userId = req.params.uid
        let userInfo = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
        User.findByIdAndUpdate (userId, {$set: userInfo}) //if true do then else do catch
        .then(user => {
            res.json({message: "User information has been updated"})
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
    delete:(req,res)=> {
        let userId = req.params.uid
        User.findByIdAndRemove (userId) //if true do then else do catch
        .then(() => {
            res.json({message: "User is deleted"})
        })
        .catch(error=> {
            res.json({error: error})
        })
    },
     //Add a new user 
     create:(req, res)=>{
        let newUser = new User ({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
        User.register (newUser, req.body.password, (error, user)=>{
            if(user){
                res.json({message: "User is inserted"})
            }
            else{
                res.json({error: error})
            }
        })

    },
    //login or  create Token
    authenticate: (req, res, next)=>{
        passport.authenticate(`local`, (error,  user)=>{
            if(user){
                let signedToken = jsonwebtoken.sign(
                    {
                    data: user._id, //get user info
                    //concel token after 1 day of ceated 
                    exp: new Date().setDate(new Date().getDate() + 1)
                   },`Lacorbi86`); //  "Lacorbi86" is a key word for create token 
                res.json({
                    success: true,
                    token: signedToken
                });
            }
            else{
                res.json({
                    success: false,
                    message: 'Could not authenticate user'
                });
            }
        }) (req, res, next);
    },
    //verify Token to louck API all requests under it need toke to work 
    verifyJwt: (req, res, next)=>{
        let token  = req.body.token
        if(token){
            jsonwebtoken.verify(token, `Lacorbi86`, (error, payload)=>{
                if(payload) // payload is user id that save in sign() method  
                {
                    User.findById(payload.data).then(user=>{
                        if(user){
                            next() //if you find the user move to the next function 
                        }
                        else{
                            json.send({ error: error}) // if you don't find the user  return error as json 
                        }
                    })

                }
                else // if there some error in verify mthod 
                {
                    res.json({message: "No user account found", error: true})
                }
            })
            next()
        }
        else // if user doesn't send token 
        {
            res.json({error: "Please Provide a token"})

        }
    }



}
