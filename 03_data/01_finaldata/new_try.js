var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
var fs = require('fs');

var collection = [ ];
var collection2 = [ ];

var obj = JSON.parse(fs.readFileSync('SeparatePages/completeForks.json', 'utf8'));

function isWhiteSpace(char) {
  return " \t\n".includes(char);
}

function isPunct(char) {
  return ";:.,?!-'\"(){}".includes(char);
}

function compress(string) {
    return string
      .split(" ")
      .filter(char => !isWhiteSpace(char) && !isPunct(char))
      .join(", ");
};


async.eachSeries(obj, function(value, callback) {
        var Dict = new Object;
        Dict.Name = value.name;
        var topics = JSON.stringify(value.topics);
        var realTopics = JSON.parse(topics);
        Dict.Topics = realTopics;
        collection.push(Dict);
    
    setTimeout(callback, 10);
    }, function() {
            // console.log(collection);
            
                function execute(element, callback){
                    
                    async.eachSeries(JSON.stringify(element), function(value2, callback2) {
                        console.log(JSON.stringify(element));
                        // value2.DescTopics = new Array();
                        var completed = new Object;
                        completed.Name = value2;
                        completed.descript = new Array();
                        
                        var url3 = 'http://github.com/topics/' + value2;
                        request(url3, function(error, response, body) {
                            if (!error && response.statusCode == 200) {
                            // console.log(url3);
                            // load `content` into a cheerio object
                            var $ = cheerio.load(body);
                            var desc = $('.mb-3').find('p').text();
                            var values = desc;
                            completed.descript.push(compress(values));
                            }
                        });
                        console.log(completed);
                        collection2.push(completed);
                        setTimeout(callback2, 5000);
                        
                        }, function(){
                            console.log('hold on...');
                    });
                    
                    callback();

                }
                    
                collection.forEach(function(element){
                    execute(element.Topics, CB2);
                });

                function CB2(){
                    console.log('done scraping!');
                    fs.writeFileSync(('SeparatePages/dict.json'), collection2);
                }

});

