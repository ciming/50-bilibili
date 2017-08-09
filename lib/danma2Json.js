const fetch = require('node-fetch');
const parser = require('xml2json');
const cache = require('memory-cache');

module.exports = function($cid, callback){
  return fetch('http://comment.bilibili.com/'+ $cid +'.xml')
    .then(function(res) {
      return res.text()
    }).then(function(body) {
      let data ={
        maxlimit: 0,
        danmu: []
      }
      let json = JSON.parse(parser.toJson(body));
      data.maxlimit = json.i.maxlimit;
      json.i.d.forEach(function (item) {
        let danmu = {};
        let danmuInfo = item.p.split(',');
        danmu.text = item.$t;
        danmu.stime = Number(danmuInfo[0]);
        danmu.mode = Number(danmuInfo[1]);
        danmu.size = Number(danmuInfo[2]);
        danmu.color = colorParse(danmuInfo[3]);
        data.danmu.push(danmu)
      })
      return data;

    });
}

function colorParse(color) {
  let colorCode = Number(color);
  return '0x' + colorCode.toString(16)
}