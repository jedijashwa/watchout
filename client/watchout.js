//var _enemyCount = 10;
var enemy = [];
for(var i=0; i<10; i++){
  enemy.push(i);
}

var score = 0;
var highscore = 0;
// start slingin' some d3 
var svg = d3.select(".container").append('svg')
  .attr('width', 800)
  .attr('height', 400);

var enemys = svg.selectAll('circle').data(enemy).enter()
  .append('circle').attr('r', 10)
  .attr('class', 'enemy')
  .attr('cx',400)
  .attr('cy',200);

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
  .attr('fill', 'blue')
  .attr('cx',400)
  .attr('cy',200)

var detect = function(){
  enemys.each(function (d) { 
    var x1 = d3.select(this).attr('cx'),
        y1 = d3.select(this).attr('cy'),
        x2 = player.attr('cx'),
        y2 = player.attr('cy');
    
    var distance = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    if(distance<20){
      score = 0;
      d3.select(".current").text("Current score: " + score);
    }
  });
  setTimeout(detect, 10);
}


mobility();
detect();