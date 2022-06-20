const router = require('express').Router(),
// link with User conteoller
UserController = require('../controllers/user')

//useing get() to access to the function in the controller 
//get() takes two paramters 
// the path 
// name of the controller with the function we want call 
 router.post('/login', UserController.authenticate) 
 router.use(UserController.verifyJwt) // using  with get users for example 
 router.get('/', UserController.index)
 router.get('/:uid', UserController.show)
 router.put('/:uid', UserController.update) 
 router.delete('/:uid/delete', UserController.delete) 
 router.post('/create', UserController.create) //localhost:3000/users/create
 

 module.exports = router