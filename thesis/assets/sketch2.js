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

function DataDictionary2(selectdata, selectarray, dict, wc, selectdiv, side) {

        selectarray = [];
        
        d3.text(selectdata, function(error, data) {
        if (error) throw error;
        var coef = 1500;
        var halfcoef = coef / 2.4
        
        selectarray.push(data);
        analyze2(selectarray);

        var wordDiv= d3.select(selectdiv)
            .attr('class', 'box')
            .selectAll('div')
            // .data(dict)
            .data(dict.filter(function(d) { return d.frequency >= .005; }))
            .enter()
            .append('div')
            .attr('class', 'words')
            .attr('id', function(d) { return d.word })
            // .style('align-items', side)
            // .text(function (d) {return d.word + ' '})
            .text(function(d) { return d.word })
            .style('font-size', function(d) { return d.frequency * coef + 'px' })
            .style('line-height', function(d) { return d.frequency * coef + 'px' })
            .style('border-bottom', function (d) {
                var ourdiv = d3.selectAll('#' + this.id);
                if (ourdiv._groups["0"].length == 2) {return '1px solid'} else {return '0px'}})
            // .style('padding', function (d) {return d.frequency*halfcoef + 'px'})
            .style('padding-right', function(d) { return d.frequency * halfcoef + 'px' })
            // .style('border-radius', function (d){return (d.count*coef)/10 + 'px'})
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
        console.log(this.id + ' appears ' + d.frequency + ' over the document');
        var ourdiv = d3.selectAll('#' + this.id);
        console.log(ourdiv._groups["0"].length);
        callBox(d, 2, ourdiv);
        
        if (ourdiv._groups["0"].length == 2){
            // d3.select(this.parentNode)
            //     .style('background-color', function(){
            //         if (this.id ='#viz1') {return 'yellow'}
            //         else {return 'pink'}
            //     })
            // ;
            ourdiv
                .transition()
                .style('opacity', '1')
                .style('transform', 'scale(1.5)')
                .style('color', 'black')
            ;
        }
        else {
            // d3.select(this.parentNode)
            //     .style('background-color', function(){
            //         if (this.id ='#viz1') {return 'red'}
            //         else {return 'green'}
            //     })
            // ;
            ourdiv
                .transition()
                .style('opacity', '1')
                .style('transform', 'scale(1.5)')
            ;
        }
    }
    
    function handleMouseOut(d, i) {
        console.log('bye');
        console.log(this.id + ' appears ' + d.frequency + ' over the document');
        
        var ourdiv = d3.selectAll('#' + this.id);
        
        ourdiv
        .transition()
        .style('opacity', '0.4')
        .style('color', 'white')
        .style('transform', 'scale(1)')
        ;
        
        // d3
        // .select(this.parentNode)
        // .style('background-color', 'initial')
        // ;

        // ourdiv
        // .append('div')
        // .attr('class', 'littlenumber')
        // .append('text')
        // .text(d.count)
        // .style('font-size', '10px')
        ;

    }

    // function handleClick(d, i){
    //     console.log(this.id + ' appears ' + d.frequency + ' over the document');

    //     var ourdiv = d3.selectAll('#' + this.id);

    //     ourdiv
    //         .transition()
    //         .style('opacity', '1')
    //         .style('color', 'black')
    //     // .style('transform', 'scale(1.1)')
    //     // .style('box-shadow', '1px 1px 1px yellow')
    //     ;
    
    
        // ourdiv
        // .append('div')
        // .attr('class', 'littlenumber')
        // .append('text')
        // .text(d.count)
        // .style('font-size', '10px')
        // ;

    // }

    function analyze(data) {
        var BagWords = [];
        data.forEach(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var desc = data[i].description;
                // for (var j=0; j<desc.length; j++){
                //     var desc2 = desc[j];
                // }
                // console.log(desc);
                BagWords.push(desc);
                // BagWords.push(desc2);
            }
        var longString = BagWords.join(' ');
        console.log(longString);
        var phrases = longString.replace(/(\ba\b|\bable\b|\babout\b|\bacross\b|\bafter\b|\bal\b|\ball\b|\balmost\b|\balso\b|\bam\b|\bamong\b|\ban\b|\band\b|\bany\b|\bare\b|\bas\b|\bat\b|\bbe\b|\bbecause\b|\bbeen\b|\bbut\b|\bby\b|\bcan\b|\bcannot\b|\bcould\b|\bdear\b|\bdid\b|\bdo\b|\bdoes\b|\beither\b|\belse\b|\bever\b|\bevery\b|\bet\b|\bfor\b|\bfrom\b|\bget\b|\bgot\b|\bhad\b|\bhas\b|\bhave\b|\bhe\b|\bher\b|\bhers\b|\bhim\b|\bhis\b|\bhow\b|\bhowever\b|\bi\b|\bif\b|\bin\b|\binto\b|\bis\b|\bit\b|\bits\b|\bjust\b|\bleast\b|\blet\b|\blike\b|\blikely\b|\bmay\b|\bme\b|\bmight\b|\bmost\b|\bmust\b|\bmy\b|\bneither\b|\bno\b|\bnor\b|\bnot\b|\bof\b|\boff\b|\boften\b|\bon\b|\bonly\b|\bor\b|\bother\b|\bour\b|\bown\b|\bper\b|\brather\b|\bsaid\b|\bsay\b|\bsays\b|\bshe\b|\bshould\b|\bsince\b|\bso\b|\bsome\b|\bthan\b|\bthat\b|\bthe\b|\btheir\b|\bthem\b|\bthen\b|\bthere\b|\bthese\b|\bthey\b|\bthis\b|\btis\b|\bto\b|\btoo\b|\btwas\b|\bus\b|\bwants\b|\bwas\b|\bwe\b|\bwere\b|\bwhat\b|\bwhen\b|\bwhere\b|\bwhich\b|\bwhile\b|\bwho\b|\bwhom\b|\bwhy\b|\bwill\b|\bwith\b|\bwould\b|\byet\b|\byou\b|\byour\b|\bain’t\b|\baren’t\b|\bcan’t\b|\bcould’ve\b|\bcouldn’t\b|\bdidn’t\b|\bdoesn’t\b|\bdon’t\b|\bhasn’t\b|\bhe’d\b|\bhe’ll\b|\bhe’s\b|\bhow’d\b|\bhow’ll\b|\bhow’s\b|\bi’d\b|\bi’ll\b|\bi’m\b|\bi’ve\b|\bisn’t\b|\bit’s\b|\bmight’ve\b|\bmightn’t\b|\bmust’ve\b|\bmustn’t\b|\bshan’t\b|\bshe’d\b|\bshe’ll\b|\bshe’s\b|\bshould’ve\b|\bshouldn’t\b|\bthat’ll\b|\bthat’s\b|\bthere’s\b|\bthey’d\b|\bthey’ll\b|\bthey’re\b|\bthey’ve\b|\bwasn’t\b|\bwe’d\b|\bwe’ll\b|\bwe’re\b|\bweren’t\b|\bwhat’d\b|\bwhat’s\b|\bwhen’d\b|\bwhen’ll\b|\bwhen’s\b|\bwhere’d\b|\bwhere’ll\b|\bwhere’s\b|\bwho’d\b|\bwho’ll\b|\bwho’s\b|\bwhy’d\b|\bwhy’ll\b|\bwhy’s\b|\bwon’t\b|\bwould’ve\b|\bwouldn’t\b|\byou’d\b|\byou’ll\b|\byou’re\b|\byou’ve\b|\d{1,4})/gi, '').replace(/[^\w\s]/gi, ''); // The caret (^) character is the negation of the set [...], gi is global and case-insensitive and the safelist in this example is digits, word characters (\w), and whitespace (\s).
        console.log(phrases);
        var lc = phrases.toLowerCase();
        console.log(lc);
        var words = lc.split(' ');
        console.log(words);
        
        dict = [];
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
            console.log(dict[0].frequency);
            
        });
    }
    
    function analyze2(data) {
    
      data.forEach(function(phrases){
        // console.log(phrases);
        // RegEx https://regexr.com/
        phrases = phrases.replace(/(\ba\b|\bable\b|\babout\b|\bacross\b|\bafter\b|\bal\b|\ball\b|\balmost\b|\balso\b|\bam\b|\bamong\b|\ban\b|\band\b|\bany\b|\bare\b|\bas\b|\bat\b|\bbe\b|\bbecause\b|\bbeen\b|\bbut\b|\bby\b|\bcan\b|\bcannot\b|\bcould\b|\bdear\b|\bdid\b|\bdo\b|\bdoes\b|\beither\b|\belse\b|\bever\b|\bevery\b|\bet\b|\bfor\b|\bfrom\b|\bget\b|\bgot\b|\bhad\b|\bhas\b|\bhave\b|\bhe\b|\bher\b|\bhers\b|\bhim\b|\bhis\b|\bhow\b|\bhowever\b|\bi\b|\bif\b|\bin\b|\binto\b|\bis\b|\bit\b|\bits\b|\bjust\b|\bleast\b|\blet\b|\blike\b|\blikely\b|\bmay\b|\bme\b|\bmight\b|\bmost\b|\bmust\b|\bmy\b|\bneither\b|\bno\b|\bnor\b|\bnot\b|\bof\b|\boff\b|\boften\b|\bon\b|\bonly\b|\bor\b|\bother\b|\bour\b|\bown\b|\bper\b|\brather\b|\bsaid\b|\bsay\b|\bsays\b|\bshe\b|\bshould\b|\bsince\b|\bso\b|\bsome\b|\bthan\b|\bthat\b|\bthe\b|\btheir\b|\bthem\b|\bthen\b|\bthere\b|\bthese\b|\bthey\b|\bthis\b|\btis\b|\bto\b|\btoo\b|\btwas\b|\bus\b|\bwants\b|\bwas\b|\bwe\b|\bwere\b|\bwhat\b|\bwhen\b|\bwhere\b|\bwhich\b|\bwhile\b|\bwho\b|\bwhom\b|\bwhy\b|\bwill\b|\bwith\b|\bwould\b|\byet\b|\byou\b|\byour\b|\bain’t\b|\baren’t\b|\bcan’t\b|\bcould’ve\b|\bcouldn’t\b|\bdidn’t\b|\bdoesn’t\b|\bdon’t\b|\bhasn’t\b|\bhe’d\b|\bhe’ll\b|\bhe’s\b|\bhow’d\b|\bhow’ll\b|\bhow’s\b|\bi’d\b|\bi’ll\b|\bi’m\b|\bi’ve\b|\bisn’t\b|\bit’s\b|\bmight’ve\b|\bmightn’t\b|\bmust’ve\b|\bmustn’t\b|\bshan’t\b|\bshe’d\b|\bshe’ll\b|\bshe’s\b|\bshould’ve\b|\bshouldn’t\b|\bthat’ll\b|\bthat’s\b|\bthere’s\b|\bthey’d\b|\bthey’ll\b|\bthey’re\b|\bthey’ve\b|\bwasn’t\b|\bwe’d\b|\bwe’ll\b|\bwe’re\b|\bweren’t\b|\bwhat’d\b|\bwhat’s\b|\bwhen’d\b|\bwhen’ll\b|\bwhen’s\b|\bwhere’d\b|\bwhere’ll\b|\bwhere’s\b|\bwho’d\b|\bwho’ll\b|\bwho’s\b|\bwhy’d\b|\bwhy’ll\b|\bwhy’s\b|\bwon’t\b|\bwould’ve\b|\bwouldn’t\b|\byou’d\b|\byou’ll\b|\byou’re\b|\byou’ve\b|\d{1,4})/gi, '').replace(/[^\w\s]/gi, '');  // The caret (^) character is the negation of the set [...], gi is global and case-insensitive and the safelist in this example is digits, word characters (\w), and whitespace (\s).
        var words = phrases.split(' ');
        
        words.forEach(function(word) {
    
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            wc = dict.filter(function(element) {
                return element.word == word;
            })
            
            if (wc.length)
                wc[0].count++;
            else
                dict.push({word: word, count: 1});
        });
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        dict.sort(function(a, b) {
            return b.count - a.count;
        });
        dict.forEach(function(word){
            return word.frequency = word.count/(dict.length);
        });
        dict.shift();
        console.log(dict[0].frequency);
    });
    
    }
    
    function round(number, precision) {
        var shift = function (number, precision) {
            var numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
            };
        return shift(Math.round(shift(number, +precision)), -precision);
    }
    
    function groupDict(dict){
        // dict.forEach{z
        var plusone = dict.map((n) => n.dict);  

    }
    
    function callBox(d, n, div){
        
        console.log(d);
        if (n===2){
        console.log(div._groups[0][1]);
        console.log(d);
            
        var base =  d3.select('#base1')
        .html('<p>' + d.word + ': ' + round(d.frequency*100, 1) + '% times</p>')
        .append('div')
        ;
        
        d3.selectAll('.extra')
        .data()
            
        } else {
            
        var base =  d3.select('#base1')
        .html('<p>' + d.word + ': ' + round(d.frequency*100, 1) + '% times</p>')
        .append('div')
        ;
        }

    }
}

function DataDictionary(selectdata, selectarray, dict, wc, selectdiv, side) {

        selectarray = [];
        
        d3.json(selectdata, function(error, data) {
        if (error) throw error;
        var coef = 1500;
        var halfcoef = coef / 2.4
        
        selectarray.push(data);
        analyze(selectarray);

        var wordDiv= d3.select(selectdiv)
            .attr('class', 'box')
            .selectAll('div')
            // .data(dict)
            .data(dict.filter(function(d) { return d.frequency >= .005; }))
            .enter()
            .append('div')
            .attr('class', 'words')
            .attr('id', function(d) { return d.word })
            // .style('align-items', side)
            // .text(function (d) {return d.word + ' '})
            .text(function(d) { return d.word })
            .style('font-size', function(d) { return d.frequency * coef + 'px' })
            .style('line-height', function(d) { return d.frequency * coef + 'px' })
            .style('border-bottom', function (d) {
                var ourdiv = d3.selectAll('#' + this.id);
                if (ourdiv._groups["0"].length == 2) {return '1px solid'} else {return '0px'}})
            // .style('padding', function (d) {return d.frequency*halfcoef + 'px'})
            .style('padding-right', function(d) { return d.frequency * halfcoef + 'px' })
            // .style('border-radius', function (d){return (d.count*coef)/10 + 'px'})
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
        console.log(this.id + ' appears ' + d.frequency + ' over the document');
        var ourdiv = d3.selectAll('#' + this.id);
        console.log(ourdiv._groups["0"].length);
        callBox(d, 2, ourdiv);
        
        if (ourdiv._groups["0"].length == 2){
            // d3.select(this.parentNode)
            //     .style('background-color', function(){
            //         if (this.id ='#viz1') {return 'yellow'}
            //         else {return 'pink'}
            //     })
            // ;
            ourdiv
                .transition()
                .style('opacity', '1')
                .style('transform', 'scale(1.5)')
                .style('color', 'black')
            ;
        }
        else {
            // d3.select(this.parentNode)
            //     .style('background-color', function(){
            //         if (this.id ='#viz1') {return 'red'}
            //         else {return 'green'}
            //     })
            // ;
            ourdiv
                .transition()
                .style('opacity', '1')
                .style('transform', 'scale(1.5)')
            ;
        }
    }
    
    function handleMouseOut(d, i) {
        console.log('bye');
        console.log(this.id + ' appears ' + d.frequency + ' over the document');
        
        var ourdiv = d3.selectAll('#' + this.id);
        
        ourdiv
        .transition()
        .style('opacity', '0.4')
        .style('color', 'white')
        .style('transform', 'scale(1)')
        ;
        
        // d3
        // .select(this.parentNode)
        // .style('background-color', 'initial')
        // ;

        // ourdiv
        // .append('div')
        // .attr('class', 'littlenumber')
        // .append('text')
        // .text(d.count)
        // .style('font-size', '10px')
        ;

    }

    // function handleClick(d, i){
    //     console.log(this.id + ' appears ' + d.frequency + ' over the document');

    //     var ourdiv = d3.selectAll('#' + this.id);

    //     ourdiv
    //         .transition()
    //         .style('opacity', '1')
    //         .style('color', 'black')
    //     // .style('transform', 'scale(1.1)')
    //     // .style('box-shadow', '1px 1px 1px yellow')
    //     ;
    
    
        // ourdiv
        // .append('div')
        // .attr('class', 'littlenumber')
        // .append('text')
        // .text(d.count)
        // .style('font-size', '10px')
        // ;

    // }

    function analyze(data) {
        var BagWords = [];
        data.forEach(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var desc = data[i].description;
                // for (var j=0; j<desc.length; j++){
                //     var desc2 = desc[j];
                // }
                // console.log(desc);
                BagWords.push(desc);
                // BagWords.push(desc2);
            }
        var longString = BagWords.join(' ');
        console.log(longString);
        var phrases = longString.replace(/(\ba\b|\bable\b|\babout\b|\bacross\b|\bafter\b|\bal\b|\ball\b|\balmost\b|\balso\b|\bam\b|\bamong\b|\ban\b|\band\b|\bany\b|\bare\b|\bas\b|\bat\b|\bbe\b|\bbecause\b|\bbeen\b|\bbut\b|\bby\b|\bcan\b|\bcannot\b|\bcould\b|\bdear\b|\bdid\b|\bdo\b|\bdoes\b|\beither\b|\belse\b|\bever\b|\bevery\b|\bet\b|\bfor\b|\bfrom\b|\bget\b|\bgot\b|\bhad\b|\bhas\b|\bhave\b|\bhe\b|\bher\b|\bhers\b|\bhim\b|\bhis\b|\bhow\b|\bhowever\b|\bi\b|\bif\b|\bin\b|\binto\b|\bis\b|\bit\b|\bits\b|\bjust\b|\bleast\b|\blet\b|\blike\b|\blikely\b|\bmay\b|\bme\b|\bmight\b|\bmost\b|\bmust\b|\bmy\b|\bneither\b|\bno\b|\bnor\b|\bnot\b|\bof\b|\boff\b|\boften\b|\bon\b|\bonly\b|\bor\b|\bother\b|\bour\b|\bown\b|\bper\b|\brather\b|\bsaid\b|\bsay\b|\bsays\b|\bshe\b|\bshould\b|\bsince\b|\bso\b|\bsome\b|\bthan\b|\bthat\b|\bthe\b|\btheir\b|\bthem\b|\bthen\b|\bthere\b|\bthese\b|\bthey\b|\bthis\b|\btis\b|\bto\b|\btoo\b|\btwas\b|\bus\b|\bwants\b|\bwas\b|\bwe\b|\bwere\b|\bwhat\b|\bwhen\b|\bwhere\b|\bwhich\b|\bwhile\b|\bwho\b|\bwhom\b|\bwhy\b|\bwill\b|\bwith\b|\bwould\b|\byet\b|\byou\b|\byour\b|\bain’t\b|\baren’t\b|\bcan’t\b|\bcould’ve\b|\bcouldn’t\b|\bdidn’t\b|\bdoesn’t\b|\bdon’t\b|\bhasn’t\b|\bhe’d\b|\bhe’ll\b|\bhe’s\b|\bhow’d\b|\bhow’ll\b|\bhow’s\b|\bi’d\b|\bi’ll\b|\bi’m\b|\bi’ve\b|\bisn’t\b|\bit’s\b|\bmight’ve\b|\bmightn’t\b|\bmust’ve\b|\bmustn’t\b|\bshan’t\b|\bshe’d\b|\bshe’ll\b|\bshe’s\b|\bshould’ve\b|\bshouldn’t\b|\bthat’ll\b|\bthat’s\b|\bthere’s\b|\bthey’d\b|\bthey’ll\b|\bthey’re\b|\bthey’ve\b|\bwasn’t\b|\bwe’d\b|\bwe’ll\b|\bwe’re\b|\bweren’t\b|\bwhat’d\b|\bwhat’s\b|\bwhen’d\b|\bwhen’ll\b|\bwhen’s\b|\bwhere’d\b|\bwhere’ll\b|\bwhere’s\b|\bwho’d\b|\bwho’ll\b|\bwho’s\b|\bwhy’d\b|\bwhy’ll\b|\bwhy’s\b|\bwon’t\b|\bwould’ve\b|\bwouldn’t\b|\byou’d\b|\byou’ll\b|\byou’re\b|\byou’ve\b|\d{1,4})/gi, '').replace(/[^\w\s]/gi, ''); // The caret (^) character is the negation of the set [...], gi is global and case-insensitive and the safelist in this example is digits, word characters (\w), and whitespace (\s).
        console.log(phrases);
        var lc = phrases.toLowerCase();
        console.log(lc);
        var words = lc.split(' ');
        console.log(words);
        
        dict = [];
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
            console.log(dict[0].frequency);
            
        });
    }
    
    function analyze2(data) {
    
      data.forEach(function(phrases){
        // console.log(phrases);
        // RegEx https://regexr.com/
        phrases = phrases.replace(/(\ba\b|\bable\b|\babout\b|\bacross\b|\bafter\b|\bal\b|\ball\b|\balmost\b|\balso\b|\bam\b|\bamong\b|\ban\b|\band\b|\bany\b|\bare\b|\bas\b|\bat\b|\bbe\b|\bbecause\b|\bbeen\b|\bbut\b|\bby\b|\bcan\b|\bcannot\b|\bcould\b|\bdear\b|\bdid\b|\bdo\b|\bdoes\b|\beither\b|\belse\b|\bever\b|\bevery\b|\bet\b|\bfor\b|\bfrom\b|\bget\b|\bgot\b|\bhad\b|\bhas\b|\bhave\b|\bhe\b|\bher\b|\bhers\b|\bhim\b|\bhis\b|\bhow\b|\bhowever\b|\bi\b|\bif\b|\bin\b|\binto\b|\bis\b|\bit\b|\bits\b|\bjust\b|\bleast\b|\blet\b|\blike\b|\blikely\b|\bmay\b|\bme\b|\bmight\b|\bmost\b|\bmust\b|\bmy\b|\bneither\b|\bno\b|\bnor\b|\bnot\b|\bof\b|\boff\b|\boften\b|\bon\b|\bonly\b|\bor\b|\bother\b|\bour\b|\bown\b|\bper\b|\brather\b|\bsaid\b|\bsay\b|\bsays\b|\bshe\b|\bshould\b|\bsince\b|\bso\b|\bsome\b|\bthan\b|\bthat\b|\bthe\b|\btheir\b|\bthem\b|\bthen\b|\bthere\b|\bthese\b|\bthey\b|\bthis\b|\btis\b|\bto\b|\btoo\b|\btwas\b|\bus\b|\bwants\b|\bwas\b|\bwe\b|\bwere\b|\bwhat\b|\bwhen\b|\bwhere\b|\bwhich\b|\bwhile\b|\bwho\b|\bwhom\b|\bwhy\b|\bwill\b|\bwith\b|\bwould\b|\byet\b|\byou\b|\byour\b|\bain’t\b|\baren’t\b|\bcan’t\b|\bcould’ve\b|\bcouldn’t\b|\bdidn’t\b|\bdoesn’t\b|\bdon’t\b|\bhasn’t\b|\bhe’d\b|\bhe’ll\b|\bhe’s\b|\bhow’d\b|\bhow’ll\b|\bhow’s\b|\bi’d\b|\bi’ll\b|\bi’m\b|\bi’ve\b|\bisn’t\b|\bit’s\b|\bmight’ve\b|\bmightn’t\b|\bmust’ve\b|\bmustn’t\b|\bshan’t\b|\bshe’d\b|\bshe’ll\b|\bshe’s\b|\bshould’ve\b|\bshouldn’t\b|\bthat’ll\b|\bthat’s\b|\bthere’s\b|\bthey’d\b|\bthey’ll\b|\bthey’re\b|\bthey’ve\b|\bwasn’t\b|\bwe’d\b|\bwe’ll\b|\bwe’re\b|\bweren’t\b|\bwhat’d\b|\bwhat’s\b|\bwhen’d\b|\bwhen’ll\b|\bwhen’s\b|\bwhere’d\b|\bwhere’ll\b|\bwhere’s\b|\bwho’d\b|\bwho’ll\b|\bwho’s\b|\bwhy’d\b|\bwhy’ll\b|\bwhy’s\b|\bwon’t\b|\bwould’ve\b|\bwouldn’t\b|\byou’d\b|\byou’ll\b|\byou’re\b|\byou’ve\b|\d{1,4})/gi, '').replace(/[^\w\s]/gi, '');  // The caret (^) character is the negation of the set [...], gi is global and case-insensitive and the safelist in this example is digits, word characters (\w), and whitespace (\s).
        var words = phrases.split(' ');
        
        words.forEach(function(word) {
    
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            wc = dict.filter(function(element) {
                return element.word == word;
            })
            
            if (wc.length)
                wc[0].count++;
            else
                dict.push({word: word, count: 1});
        });
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        dict.sort(function(a, b) {
            return b.count - a.count;
        });
        dict.forEach(function(word){
            return word.frequency = word.count/(dict.length);
        });
        dict.shift();
        console.log(dict[0].frequency);
    });
    
    }
    
    function round(number, precision) {
        var shift = function (number, precision) {
            var numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
            };
        return shift(Math.round(shift(number, +precision)), -precision);
    }
    
    function groupDict(dict){
        // dict.forEach{z
        var plusone = dict.map((n) => n.dict);  

    }
    
    function callBox(d, n, div){
        
        console.log(d);
        if (n===2){
        console.log(div._groups[0][1]);
        console.log(d);
            
        var base =  d3.select('#base1')
        .html('<p>' + d.word + ': ' + round(d.frequency*100, 1) + '% times</p>')
        .append('div')
        ;
        
        d3.selectAll('.extra')
        .data()
            
        } else {
            
        var base =  d3.select('#base1')
        .html('<p>' + d.word + ': ' + round(d.frequency*100, 1) + '% times</p>')
        .append('div')
        ;
        }

    }
}

d3.select('.btnholder')
  .insert('button')
  .attr('type','button')
  .attr('class','btn-btn')
  .text('change status')
  .on('click', function(){
      document.getElementById('viz1').innerHTML = "";
      DataDictionary('data/completeFork1.json', rawdata, dictionary1, wordCount, '#viz1', 'flex-end');
  })
  ;

// DataDictionary2('data/cs_test.txt', rawdata, dictionary1, wordCount, '#viz1', 'flex-start');
DataDictionary('data/completeStars.json', rawdata, dictionary1, wordCount, '#viz1', 'flex-start');
DataDictionary('data/completeFork1.json', rawdata2, dictionary2, wordCount2, '#viz2', 'flex-end');
DataDictionary('data/completeStars.json', rawdata3, dictionary3, wordCount3, '#viz3', 'flex-start');
DataDictionary('data/completeFork1.json', rawdata4, dictionary4, wordCount4, '#viz4', 'flex-end');



// var g = d3.select('#viz2')
// .append('svg')
// .attr('width', '99%')
// .attr('height', '99%')
// .selectAll('g.second')
// .data([{'word':'hello', 'count':20},{'word':'nothing', 'count':40}])
// .enter()
// .append('g')
// ;

// var text2 = g
// .append('text')
// .text(function (d) {if (d.count >=5) return d.word + ' '})
// .attr('x', '50%')
// .attr('y', '50%')
// .style('font-size', function (d) {return d.count*0.8 + 'px'})
// ;

// // g
// // .append('rect')
// // .text(function (d) {if (d.count >=5) return d.word + ' '})
// // .attr('x', '50%')
// // .attr('y', '50%')
// // .style('font-size', function (d) {return d.count*0.8 + 'px'})
// // ;

// var bbox = text2.node().getBBox();


//     g.append("rect")
//     .attr("x", bbox.x)
//     .attr("y", bbox.y)
//     .attr("width", bbox.width)
//     .attr("height", bbox.height)
//     .style("fill", "#ccc")
//     .style("fill-opacity", ".3")
//     .style("stroke", "#666")
//     .style("stroke-width", "1.5px")
//     ;
