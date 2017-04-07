var express = require('express')
var router = express.Router()
var config = require('../controller/config')
router.get('/', config.index)
router.get('/name', config.getrouter)
router.get('/name/:id', config.getDataByID)
router.post('/chang', config.edite)
router.post('/save/:id',config.save)
module.exports = router
