
"use strict";
const request = require('request');
const crypto = require('crypto');
const cheerio = require('cheerio');
const cache = require('memory-cache');

module.exports = function($url){
  return new Promise(function(resolve, reject) {
    console.log(cache.get($url))
    if( cache.get($url)) {
      resolve(cache.get($url));
    }
    let options = {
      url:'http://www.flvcd.com/parse.php?format=&kw='+$url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36 QQBrowser/4.2.4763.400'
      }
    };
    request(options, function(er, response,body) {
      if (er){
        reject()
        throw er;
      }
      let links = []
      let $ = cheerio.load(body);
      let linksElem = $('.STYLE4 a');
      linksElem.each(function () {
        let href = $(this).attr('href');
        if(href.match('http://vod.cntv.lxdns.com')){
          links.push(href);
        }
      })
      if(links.length > 0){
        cache.put($url, links);
        resolve(links);
      } else{
        reject();
      }
    })
    
  })
}