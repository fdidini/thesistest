var rawdata = [];
var rawdata2 = [];
var rawdata3 = [];
var rawdata4 = [];
var rawdata5 = [];
var dictionary1 = [];
var dictionary2 = [];
var dictionary3 = [];
var dictionary4 = [];
var dictionary5 = [];
var wordCount;
var wordCount2;
var wordCount3;
var wordCount4;
var wordCount5;

d3.select('.btnholder')
  .insert('button')
  .attr('type','button')
  .attr('class','btn-btn')
  .text('change status')
  .on('click', function(){
      document.getElementById('viz2').innerHTML = "";
      var dictionary1 = [];
      var dictionary2 = [];
      var rawdata = [];
      var rawdata2 = [];
      var wordCount = 0;
      var wordCount2 = 0;
      DataDictionary('data/completeStars.json', rawdata2, dictionary2, wordCount2, '#viz2', 'center', 1);
  })
;
  
function DataDictionary(selectdata, selectarray, dict, wc, selectdiv, side, group) {
    
    var cutoff;
    
    d3.json(selectdata, function(error, data) {
        if (error) throw error;
        var coef = 1000;

        selectarray.push(data);
        
        // if (selectdata == 'data/cs2.json') {analyze2(selectarray)}
        // else {analyze(selectarray)}
        analyze(selectarray);
        console.log(dict);
        
        var rangef = _.pluck(dict, 'frequency');
        
        var q2 = d3.quantile(rangef, 0.25);
        var q3 = d3.quantile(rangef, 0.5);
        var q4 = d3.quantile(rangef, 0.75);
        
        var cutoff = q2;
        
        // var meanF = d3.mean(rangef);
        // var std = d3.deviation(rangef);
        
        console.log(q2 + ' and ' + q3 + ' and ' + q4);

        var wordDiv= d3.select(selectdiv)
            .attr('class', 'box')
            .selectAll('div')
            // .data(dict)
            .data(dict.filter(function(d) { return d.frequency > cutoff; }))
            .enter()
            .append('div')
            .attr('class', 'words')
            .attr('id', function(d) { return d.word + group})
            // .text(function (d) {return d.word + ' '})
            .text(function(d) { return d.word })
            .style('color', function(d){})
            .style('font-size', function(d) { return d.frequency * coef + 'px' })
            .style('line-height', function(d) {
                if (d.frequency <=  0.004) {return d.frequency * 3 * coef + 'px'}
                else if (0.01 <= d.frequency <=  0.004) {return d.frequency * 2 * coef + 'px'}
                else {return d.frequency * 1 * coef + 'px'}
            })
            .style('padding-right', function(d) {
                if (d.frequency <=  0.004) {return d.frequency * 1.5 * coef + 'px'}
                else if (0.01 <= d.frequency <=  0.004) {return d.frequency * coef + 'px'}
                else {return d.frequency * 0.5 *  coef + 'px'}
            })
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
            // .on('click', handleClick)
            ;
            
            wordDiv
            .exit().remove();
            
            wordDiv
            .enter().merge(wordDiv);
            
    });

    function handleMouseOver(d, i) {

            var rangef = _.pluck(dict, 'frequency');
            console.log(d);
            var q2 = d3.quantile(rangef, 0.25);
            var q3 = d3.quantile(rangef, 0.5);
            var q4 = d3.quantile(rangef, 0.75);

            var cutoff = q2;

            var ourdiv = d3.selectAll('#' + this.id);
            var simplediv = d3.select(this);
            console.log(ourdiv);
            
            
            var originalId = (this.id).replace(group, "");
            console.log(originalId);
            
            var firstCheck;
            var secondCheck;
            
            // console.log(this.id);
            if (dict == dictionary1 || dict == dictionary2) {
                firstCheck = _.findWhere(dictionary1, {word: originalId});
                secondCheck = _.findWhere(dictionary2, {word: originalId});
            } else {
                firstCheck = _.findWhere(dictionary3, {word: originalId});
                secondCheck = _.findWhere(dictionary4, {word: originalId});
            }

            var thirdCheck = [firstCheck, secondCheck];

            if (firstCheck === undefined) {
                if (secondCheck === undefined || secondCheck.frequency < cutoff){
                    callBox(thirdCheck, 0, simplediv);
                } else if (secondCheck.frequency > cutoff) {
                    callBox(secondCheck, 3, simplediv);
                    drawConnectors(simplediv, 3);
                    simplediv
                    .transition()
                    .style('opacity', '1')
                    .style('transform', 'scale(1.5)')
                    .style('z-index', '2')
                    // .style('color', 'green')
                ;
                }

            } 
            else if (secondCheck === undefined) {
                if (firstCheck === undefined || firstCheck.frequency < cutoff){
                    callBox(thirdCheck, 0, simplediv);
                } else if (firstCheck.frequency > cutoff){
                    callBox(firstCheck, 1, simplediv);
                    drawConnectors(simplediv, 1);
                    simplediv
                    .transition()
                    .style('opacity', '1')
                    .style('transform', 'scale(1.5)')
                    .style('z-index', '2')
                    // .style('color', 'green')
                ;
                }
            }
            else {
                if (ourdiv._groups["0"].length < 2){
                    if (ourdiv._groups["0"]["0"].parentElement.offsetLeft === 0) {
                        callBox(firstCheck, 1, simplediv);
                            drawConnectors(simplediv, 1);
                            simplediv
                            .transition()
                            .style('opacity', '2')
                            .style('transform', 'scale(1.5)')
                            .style('z-index', '2')
                            // .style('color', 'green')
                        ;
                    } else {
                        callBox(secondCheck, 3, simplediv);
                            drawConnectors(simplediv, 3);
                            simplediv
                            .transition()
                            .style('opacity', '2')
                            .style('transform', 'scale(1.5)')
                            .style('z-index', '2')
                            // .style('color', 'green')
                        ;
                    }
                }
                else {
                    callBox(thirdCheck, 2, ourdiv);
                        drawConnectors(ourdiv, 2);
                        ourdiv
                        .transition()
                        .style('opacity', '2')
                        .style('transform', 'scale(1.5)')
                        .style('z-index', '2')
                        // .style('color', 'green')
                    ;
                }
            } 

    }

    function callBox(d, n, div){
        $(".toremove").remove();
        
        var baseDiv = d3.select('#base' + group);
        console.log(baseDiv);
        var left = baseDiv.selectAll('.lefttxt');
        var center = baseDiv.selectAll('.centertxt');
        var right = baseDiv.selectAll('.righttxt');
        var leftg = baseDiv.selectAll('.leftgraph').append('svg').attr('class','barCanvas').append('g').attr('class','barGroup');
        var rightg = baseDiv.selectAll('.rightgraph').append('svg').attr('class','barCanvas').append('g').attr('class','barGroup');
        
        if (n===1){
            left.html('Frequency:<br><span class=\'bignumber1\'>'  + round(d.frequency*100, 1) + '%</span><br> on K12');
            center.html(d.word);
            right.html('Frequency:<br><span class=\'bignumber2\'>0%</span><br> on Github');
            leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barBase').attr('width', '100%');;
            leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barReg').attr('x', function(){return (100 - d.frequency*1000) + '%'}).attr('width', function(){return d.frequency*1000 + '%'});
            rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barBase').attr('width', '100%');
            // rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barReg').attr('width', function(){return d[1].frequency*1000 + '%'});
        } else if (n===2) {
            left.html('Frequency:<br><span class=\'bignumber1\'>' + round(d[0].frequency*100, 1) + '%</span><br> on K12');
            center.html(d[0].word);
            right.html('Frequency:<br><span class=\'bignumber2\'>'  + round(d[1].frequency*100, 1) + '%</span><br> on Github');
            leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barBase').attr('width', '100%');;
            leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barReg').attr('x', function(){return (100 - d[0].frequency*1000) + '%'}).attr('width', function(){return d[0].frequency*1000 + '%'});
            rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barBase').attr('width', '100%');;
            rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barReg').attr('width', function(){return d[1].frequency*1000 + '%'});
        } else if (n===3){
            left.html('Frequency:<br><span class=\'bignumber1\'>0%</span><br>on K12');
            center.html(d.word);
            right.html('Frequency:<br><span class=\'bignumber2\'>'  + round(d.frequency*100, 1) + '%</span><br> on Github');
            leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barBase').attr('width', '100%');;
            // leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barReg').attr('x', function(){return (100 - d[0].frequency*1000) + '%'}).attr('width', function(){return d[0].frequency*1000 + '%'});
            rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barBase').attr('width', '100%');;
            rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barReg').attr('width', function(){return d.frequency*1000 + '%'});
        } else if (n===0) {
            left.html('Frequency:<br><span class=\'bignumber1\'>0%</span><br>on K12');
            center.html('- - -');
            right.html('Frequency:<br><span class=\'bignumber2\'>0%</span><br>on Github');
            leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barBase').attr('width', '100%');;
            // leftg.append('rect').attr('fill', 'rgb(249, 162, 96)').attr('class','barReg').attr('x', function(){return (100 - d[0].frequency*1000) + '%'}).attr('width', function(){return d[0].frequency*1000 + '%'});
            rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barBase').attr('width', '100%');;
            // rightg.append('rect').attr('fill', 'rgb(110, 204, 222)').attr('class','barReg').attr('width', function(){return d.frequency*1000 + '%'});
            
        }

    }
    
    function drawConnectors(d, n){
        
        var bigdiv = $(selectdiv);
        var bigoffset = bigdiv.offset();
        
        // console.log((bigdiv.outerWidth())*2);
        
        var now = $(d._groups["0"]["0"]);
        var leftoffset = now.offset();
        
        var other = $(d._groups["0"]["1"]);
        var rightoffset = other.offset();
        
        if (n===1)
        {
        d3.select('body')
            .append('div')
            .attr('class', 'connector')
            .style('top', function(){return leftoffset.top + 'px'})
            .style('left', function(){return leftoffset.left + 'px'})
            .style('width', function(){return (bigdiv.outerWidth() - leftoffset.left) + 'px'})
            .style('height', function(){return ((bigoffset.top + bigdiv.outerHeight()) - leftoffset.top + 20) + 'px'})
            ;
        } else if (n===2)
        {   
            d3.select('body')
                .append('div')
                .attr('class', 'connector')
                .style('top', function(){return leftoffset.top + 'px'})
                .style('left', function(){return leftoffset.left + 'px'})
                .style('width', function(){return (bigdiv.outerWidth() - leftoffset.left) + 'px'})
                .style('height', function(){return ((bigoffset.top + bigdiv.outerHeight()) - leftoffset.top + 20) + 'px'})
                ;
            
            d3.select('body')
                .append('div')
                .attr('class', 'connector2')
                .style('top', function(){return rightoffset.top + 'px'})
                .style('left', function(){return bigdiv.outerWidth() + 'px'})
                .style('width', function(){return (rightoffset.left - bigdiv.outerWidth()) + 'px'})
                .style('height', function(){return ((bigoffset.top + bigdiv.outerHeight()) - rightoffset.top + 20) + 'px'})
                ;
        } else if (n===3) {
            d3.select('body')
                .append('div')
                .attr('class', 'connector2')
                .style('top', function(){return leftoffset.top + 'px'})
                .style('left', function(){return bigdiv.outerWidth() + 'px'})
                .style('width', function(){return (leftoffset.left - bigdiv.outerWidth()) + 'px'})
                .style('height', function(){return ((bigoffset.top + bigdiv.outerHeight()) - leftoffset.top + 20) + 'px'})
                ;
        }
    }

    function handleMouseOut(d, i) {

        var ourdiv = d3.selectAll('#' + this.id);

        ourdiv
        .transition()
        .style('opacity', '0.4')
        .style('color', 'white')
        .style('transform', 'scale(1)')
        ;

        d3.selectAll('.connector, .connector2')
        .style('display', 'none')
        ;

        d3.selectAll('.barCanvas')
        .attr('class', 'toremove')
        ;

    }

    function round(number, precision) {
        var shift = function (number, precision) {
            var numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
            };
        return shift(Math.round(shift(number, +precision)), -precision);
    }
    
    function analyze(data) {
        
        var BagWords = [];
        data.forEach(function(data) {
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                var desc = data[i].topics;
                // for (var j=0; j<desc.length; j++){
                //     var desc2 = desc[j];
                // }
                // console.log(desc);
                desc.forEach(function(dt){
                    // console.log(dt);
                    // for (var j=0; j<dt.length; j++){
                    //     var individualTopic = dt[j];
                    // }
                // console.log(dt);
                BagWords.push(dt);
                });
                // BagWords.push(desc2);
            }
        var longString = BagWords.join(' ');
        // console.log(longString);
        var phrases = longString.replace(/(\ba\b|\bable\b|\babout\b|\bacross\b|\bafter\b|\bal\b|\ball\b|\balmost\b|\balso\b|\bam\b|\bamong\b|\ban\b|\band\b|\bany\b|\bare\b|\bas\b|\bat\b|\bbe\b|\bbecause\b|\bbeen\b|\bbut\b|\bby\b|\bcan\b|\bcannot\b|\bcould\b|\bdear\b|\bdid\b|\bdo\b|\bdoes\b|\beither\b|\belse\b|\bever\b|\bevery\b|\bet\b|\bfor\b|\bfrom\b|\bget\b|\bgot\b|\bhad\b|\bhas\b|\bhave\b|\bhe\b|\bher\b|\bhers\b|\bhim\b|\bhis\b|\bhow\b|\bhowever\b|\bi\b|\bif\b|\bin\b|\binto\b|\bis\b|\bit\b|\bits\b|\bjust\b|\bleast\b|\blet\b|\blike\b|\blikely\b|\bmay\b|\bme\b|\bmight\b|\bmost\b|\bmust\b|\bmy\b|\bneither\b|\bno\b|\bnor\b|\bnot\b|\bof\b|\boff\b|\boften\b|\bon\b|\bonly\b|\bor\b|\bother\b|\bour\b|\bown\b|\bper\b|\brather\b|\bsaid\b|\bsay\b|\bsays\b|\bshe\b|\bshould\b|\bsince\b|\bso\b|\bsome\b|\bthan\b|\bthat\b|\bthe\b|\btheir\b|\bthem\b|\bthen\b|\bthere\b|\bthese\b|\bthey\b|\bthis\b|\btis\b|\bto\b|\btoo\b|\btwas\b|\bus\b|\bwants\b|\bwas\b|\bwe\b|\bwere\b|\bwhat\b|\bwhen\b|\bwhere\b|\bwhich\b|\bwhile\b|\bwho\b|\bwhom\b|\bwhy\b|\bwill\b|\bwith\b|\bwould\b|\byet\b|\byou\b|\byour\b|\bain’t\b|\baren’t\b|\bcan’t\b|\bcould’ve\b|\bcouldn’t\b|\bdidn’t\b|\bdoesn’t\b|\bdon’t\b|\bhasn’t\b|\bhe’d\b|\bhe’ll\b|\bhe’s\b|\bhow’d\b|\bhow’ll\b|\bhow’s\b|\bi’d\b|\bi’ll\b|\bi’m\b|\bi’ve\b|\bisn’t\b|\bit’s\b|\bmight’ve\b|\bmightn’t\b|\bmust’ve\b|\bmustn’t\b|\bshan’t\b|\bshe’d\b|\bshe’ll\b|\bshe’s\b|\bshould’ve\b|\bshouldn’t\b|\bthat’ll\b|\bthat’s\b|\bthere’s\b|\bthey’d\b|\bthey’ll\b|\bthey’re\b|\bthey’ve\b|\bwasn’t\b|\bwe’d\b|\bwe’ll\b|\bwe’re\b|\bweren’t\b|\bwhat’d\b|\bwhat’s\b|\bwhen’d\b|\bwhen’ll\b|\bwhen’s\b|\bwhere’d\b|\bwhere’ll\b|\bwhere’s\b|\bwho’d\b|\bwho’ll\b|\bwho’s\b|\bwhy’d\b|\bwhy’ll\b|\bwhy’s\b|\bwon’t\b|\bwould’ve\b|\bwouldn’t\b|\byou’d\b|\byou’ll\b|\byou’re\b|\byou’ve\b)/gi, '').replace(/[^\w\s]/gi, ''); // The caret (^) character is the negation of the set [...], gi is global and case-insensitive and the safelist in this example is digits, word characters (\w), and whitespace (\s).
        // console.log(phrases);
        var lc = phrases.toLowerCase();
        // console.log(lc);
        var words = lc.split(' ');
        // console.log(words);
        
        // dict = [];
        words.forEach(function(word) {
            wc = dict.filter(function(element) {
                return element.word == word;
            });
            if (wc.length)
                wc[0].count++;
            else
                dict.push({ word: word, count: 1 });
            });
            dict.sort(function(a, b) {
                return b.count - a.count;
            });
            dict.forEach(function(word) {
                return word.frequency = word.count / (dict.length);
                });
            dict.shift();
            console.log(dict);
            // console.log(dict[0].frequency);
            
        });
    }

}

DataDictionary('data/cs2.json', rawdata, dictionary1, wordCount, '#viz1', 'center', 1);
DataDictionary('data/completeForks.json', rawdata2, dictionary2, wordCount2, '#viz2', 'center', 1);

DataDictionary('data/cs2.json', rawdata3, dictionary3, wordCount3, '#viz3', 'center', 2);
DataDictionary('data/dictdescForks.json', rawdata4, dictionary4, wordCount4, '#viz4', 'center', 2);
