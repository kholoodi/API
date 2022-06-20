//index router to transmission  to more than one router 
const router = require('express').Router(),
UserRouters = require('./user'),
PostRouters = require('./post')


// for path request 
router.use('/users', UserRouters)
router.use('/posts', PostRouters)
module.exports = router