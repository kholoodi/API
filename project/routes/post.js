const router = require('express').Router(),
// link with User conteoller
PostController = require('../controllers/post')

//useing get() to access to the function in the controller 
//get() takes two paramters 
// the path 
// name of the controller with the function we want call 
 router.get('/', PostController.index)
 router.get('/:pid', PostController.show)
 router.put('/:pid/update', PostController.update) 
 router.delete('/:pid/delete', PostController.delete) 
 router.post('/create', PostController.create)  //localhost:3000/posts/create
 

 module.exports = router