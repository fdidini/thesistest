var fakedata = [];
var fakedata2 = [];

var fakedataHold = [
    {
        'type': 'compSci',
        'dict': [{'word': 'hello', 'freq': 0.2}, {'word': 'tree', 'freq': 0.2}, {'word': 'guide', 'freq': 0.6}]
    }, {
        'type': 'Security',
        'dict': [{'word': 'hello', 'freq': 0.1}, {'word': 'car', 'freq': 0.3}, {'word': 'guide', 'freq': 0.6}]
    }
];

var fakeTopicHold = [
    {
        'type': 'React',
        'dict': [{'word': 'hello', 'freq': 0.2}, {'word': 'tree', 'freq': 0.2}, {'word': 'guide', 'freq': 0.6}]
    }, {
        'type': 'JavaScript',
        'dict': [{'word': 'hello', 'freq': 0.1}, {'word': 'tree', 'freq': 0.3}, {'word': 'guide', 'freq': 0.6}]
    }, {
        'type': 'CSS',
        'dict': [{'word': 'car', 'freq': 0.4}, {'word': 'tree', 'freq': 0.1}, {'word': 'guide', 'freq': 0.5}]
    }, {
        'type': 'HTML',
        'dict': [{'word': 'car', 'freq': 0.1}, {'word': 'under', 'freq': 0.1}, {'word': 'guide', 'freq': 0.8}]
    }, {
        'type': 'Awesome',
        'dict': [{'word': 'hello', 'freq': 0.1}, {'word': 'under', 'freq': 0.3}, {'word': 'guide', 'freq': 0.6}]
    } 
];


console.log(fakedataHold[0].dict[0].freq);

var dicts = _.pluck(fakedataHold, 'dict');
var values = _.pluck(dicts[0], 'freq');
// var newvalues = _.map(values, function())
console.log(values);

d3.select('#viz5')
.append('svg')
.attr('width', '99%')
.attr('height', '400px')
.selectAll('.concept')
.data(fakedataHold)
.enter()
.append('rect')
.attr('x', function(d) { for (var i=0; i<d.dict.length; i++) {return d.dict[i].freq * 1000 + 'px'} })
.attr('y', '20px')
.attr('height', '10px')
.attr('width', '50px')
.attr('fill', 'white')
.attr('stroke', 'black')
.attr('opacity', '0.2')
;
