var request = require('request');
var async = require('async');
var cheerio = require('cheerio');

var qD = function pushDictionary(array_parsed, newArray){
    
    console.log('look at the old array: ' + array_parsed);
    
    var colDictionary = [];
    async.eachSeries(array_parsed, function(value, callback){
    
    var dictionary = new Object;
    dictionary.name = value;
    
    var url3 = 'http://github.com/topics/' + value;
    
    request(url3, function(error, response, body) {
        if (!error && response.statusCode == 200) {
        
        // load `content` into a cheerio object
        var $ = cheerio.load(body);
        var desc = $('.mb-3').find('p').text();
        dictionary.descript = desc;
        console.log(dictionary);
        colDictionary.push(dictionary);
        
        }
        });
        
    newArray.push(colDictionary);
    setTimeout(callback, 2000);
    
    }, function() {
    console.log('is this part working?: ' + colDictionary);
    }
    );
    
};

var test3 = function test3() {
  console.log('scraping descriptions');
};

module.exports.qD = qD;
module.exports.test3 = test3;