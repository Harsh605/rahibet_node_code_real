// import controllers review, products
const websocketController = require('../controllers/websocketController')
// router
const router = require('express').Router()
// sockets routers
router.get('/socket', websocketController.socketTest)

module.exports = router