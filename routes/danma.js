var express = require('express');
var router = express.Router();
var danma2json = require('../lib/danma2Json')

/* GET users listing. */
router.get('/:cid', function(req, res, next) {
  if(!req.params.cid) {
    res.status(404)
      .send('Not found');
    return false;
  }
  let $cid = req.params.cid;
  danma2json($cid)
    .then(function (json) {
      console.log(json);
      res.render('danma', {
        json: JSON.stringify(json.danmu)
      });
    })

});

module.exports = router;
