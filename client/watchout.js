// start slingin' some d3 
var svg = d3.select(".container").append('svg')
  .attr('width', 800)
  .attr('height', 400);

var circles = svg.selectAll('circle').data(Array(1000)).enter()
  .append('circle').attr('r', 10)
  .attr('class', 'enemy')
  .attr('cx',400)
  .attr('cy',200)

var mobility = function(){
  circles.transition().duration(1000)
  .attr('cx',function(d){return Math.random()*800})
  .attr('cy',function(d){return Math.random()*400})
  setTimeout(mobility, 100)
}

mobility();
