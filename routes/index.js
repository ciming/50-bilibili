var express = require('express');
var router = express.Router();
var cntv = require('../lib/CNTV');
/* GET home page. */
router.get('/', function(req, res, next) {
  var videoUrl = req.param('url')||'http://tv.cntv.cn/video/C10881/4ec8c6c1bdd941b0b11280769b036e8b';
  var cid = req.param('bili-cid')||'338971';
  
  let task1 = cntv(videoUrl);
  Promise.all([task1])
    .then(function (values) {
      let videoList = values[0].join('|');
      res.render('index', {
        cid: cid,
        videoList: videoList
      });
    })

});

module.exports = router;
