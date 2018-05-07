var qT = require('./03_ScrapeTopics.js');

qT.test2();


var qL = function queryLanguages(array_parsed, file){
  var fs = require('fs');
  var request = require('request');
  var async = require('async');
  
  console.log(array_parsed[0]);

  var reposCompleted = [];
  async.eachSeries(array_parsed, function(value, callback) {
    var langURL = value.languages;
    console.log(langURL);
    var url2 = {
        url: langURL,
        
        headers: {
        'User-Agent': 'mczoloft',
        'login': 'mczoloft',
        'Authorization': 'Basic ' + process.env.GIT_API,
        'password': process.env.GITPWD,
        'accept': 'application/vnd.github.mercy-preview+json'
        },
    };
    
    request(url2, function(err, resp, body) {
      if (err) {throw err;}
      value.completeLanguages = JSON.parse(body);
      console.log(value.completeLanguages);
      reposCompleted.push(value);
    });
    setTimeout(callback, 2000);
    }, function() {
      console.log(reposCompleted);
      qT.qT(reposCompleted, file);
  });

  
};

var test = function test(){
  console.log('hi');
};

module.exports.qL = qL;
module.exports.test = test;