var express = require('express');
var router = express.Router();

var helpdesk = require('../controller/helpdesk');

router.get('/',helpdesk.index);
router.get('/getList/:id', helpdesk.getIpAddress);
router.get('/groupIp/:id',helpdesk.getGroupByid);
router.post('/edite',helpdesk.UpdateList);
router.post('/compear',helpdesk.checkcompear);

module.exports = router;
