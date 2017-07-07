var express = require('express');
var router = express.Router();
var User = require("../schemas/user").User;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/" , function (req , res) { 
var adduser = new User({
    name : req.body.name,
    password : req.body.password, 
    url : req.body.url
});
adduser.save(function(err){   
    if (err) {
        console.log(err);
    }
});
 })
module.exports = router;
