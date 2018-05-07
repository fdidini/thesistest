var qD = require('./04_ScrapeDictionaries.js');

qD.test3();

var qT = function queryTopics(array_parsed, file){
  var fs = require('fs');
  var async = require('async');

  var allCompleted = [];

  async.eachSeries(array_parsed, function(value, callback) {

      var finalObj = value;
      var topicsCompleted = [];
      var topicsArray = value.topics;
      
      qD.qD(topicsArray, topicsCompleted);
      finalObj.dictionary = topicsCompleted;
      allCompleted.push(finalObj);
      

      setTimeout(callback, 2000);
    },
    function() {
      fs.writeFile(file, JSON.stringify(allCompleted), function(err) {
        if (err) {
          console.error('error');
        }
        else { console.log('done!') }
      });
    }
  );
};

var test2 = function test2() {
  console.log('hi');
};

module.exports.qT = qT;
module.exports.test2 = test2;