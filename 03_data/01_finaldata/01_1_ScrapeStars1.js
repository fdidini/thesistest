var fs = require('fs');
var request = require('request');
var async = require('async');
var ql = require('./02_ScrapeLang.js');

ql.test();

var indPaginas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

var repoCollection = [];

async.eachSeries(indPaginas, function(value, callback) {
  var apiRequest = 'https://api.github.com/search/repositories?q=stars%3A%3E%3D1000&page=' + value;
  var urlOpt = {
    url: apiRequest,
    
    headers: {
    'User-Agent': 'mczoloft',
    'login': 'mczoloft',
    'Authorization': 'Basic ' + process.env.GIT_API,
    'password': process.env.GITPWD,
    'accept': 'application/vnd.github.mercy-preview+json'
    }
  };

  request(urlOpt, function(err, resp, body) {
    if (err) {throw err;}
    var resultado = JSON.parse(body);
    console.log(apiRequest);
    var arrayItems = resultado.items;

    arrayItems.forEach(function(element) {

      var individualRepo = new Object;
      individualRepo.name = element.name;
      individualRepo.full_name = element.full_name;
      individualRepo.owner = element.owner.login;
      individualRepo.ownerUrl = element.owner.html_url;
      individualRepo.url = element.html_url;
      individualRepo.size = element.size;
      individualRepo.stars = element.stargazers_count;
      individualRepo.forks = element.forks_count;
      individualRepo.followers = element.subscribers_url.length;
      individualRepo.topics = element.topics;
      individualRepo.languages = element.languages_url;
      individualRepo.description = element.description;
      individualRepo.webpage = element.homepage;
      individualRepo.created_at = element.created_at;
      individualRepo.updated_at = element.updated_at;
      individualRepo.days = Math.round((Date.parse(element.updated_at) - Date.parse(element.created_at))/86400000);
      
      repoCollection.push(individualRepo);
    });
    
  });
  setTimeout(callback, 6000);
  }, function() {
    var select500 = repoCollection.slice(0, 500);
    console.log(select500);
    ql.qL(select500, 'completeStars.json');
});