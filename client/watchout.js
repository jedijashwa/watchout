//var _enemyCount = 10;
var enemy = [];
for(var i=0; i<10; i++){
  enemy.push({distance: 21 + i, inCollison: false});
}

var score = 0;
var highscore = 0;
var collisions = 0;
// start slingin' some d3 
var svg = d3.select(".container").append('svg')
  .attr('width', 800)
  .attr('height', 400);

var background = svg.selectAll('rect').data([0]).enter()
  .append('rect')
  .attr('fill', '#A7A7A9')
  .attr('width', '790px')
  .attr('height', '400px')
  .attr('rx', '10px')
  .attr('ry', '10px')

var enemys = svg.selectAll('circle').data(enemy).enter()
  .append('circle').attr('r', 10)
  .attr('class', 'enemy')
  .attr('cx',400)
  .attr('cy',200)
  .attr('fill', '#453F3C');

var mobility = function(){
  score++;
  if (highscore < score){
    highscore = score;
  }
  d3.select(".current").text("Current score: " + score);
  d3.select(".high").text("High score: " + highscore);
  enemys.transition().duration(1000)
  .attr('cx',function(d){return Math.random()*800})
  .attr('cy',function(d){return Math.random()*400})
  setTimeout(mobility, 1000)
}

var player = svg.selectAll('circle').data(Array(enemy.length+1)).enter()
  .append('circle').attr('r', 10)
  .attr('class', 'player')
  .attr('fill', '#C1EDCC')
  .attr('cx',400)
  .attr('cy',200)
  .call(d3.behavior.drag().on('drag', move));
  
svg.selectAll('circle').data(enemy);

var detect = function(){
  enemys.each(function (d) {
    var x1 = d3.select(this).attr('cx'),
        y1 = d3.select(this).attr('cy'),
        x2 = player.attr('cx'),
        y2 = player.attr('cy');
        
    d.distance = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    if(d.distance <= 20){
      if (!d.inCollision) {
        collisions++;
        d3.select(".collisions").text("Collisions: " + collisions);
        d.inCollision = true;
      }
      score = 0;
      d3.select(".current").text("Current score: " + score);
    } else {
      d.inCollision = false;
    }
  });
  setTimeout(detect, 10);
}


mobility();
setTimeout(detect, 1000);

function move () {
  var target = d3.select(this);
  target.attr('cx', function () {
    return d3.event.dx + parseFloat(target.attr('cx')); })
  target.attr('cy', function () {
    return d3.event.dy + parseFloat(target.attr('cy')); })
}