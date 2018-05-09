var d3 = require("d3v4");
console.log('hi');

d3.json('SeparatePages/t.json',function (error, data){
    if (error) {throw error}
    
    console.log(data);

})