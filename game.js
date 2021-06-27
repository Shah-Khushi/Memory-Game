var btncolor=["red","blue","green","yellow"];
var gamepattern=[];
var level=0;
var first=false;
var userClickedPattern = [];
$(document).keypress(function(event){
    if(first===false)
    {
        first=true;
        nextSequence();
    }
        
});

$(".btn").click(function() {

  
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
 
  userClickedPattern.push(userChosenColour);
  checkanswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
    
});
function checkanswer(currentlevel){
    if(userClickedPattern[currentlevel]===gamepattern[currentlevel])
    {
        console.log("success"+currentlevel);
        if (userClickedPattern.length === gamepattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over!  Press any key to restart!");
        first=false;
        level=0;
        gamepattern=[];
        userClickedPattern=[];
    }
}
function nextSequence(){
    userClickedPattern=[];
    var i=Math.floor(Math.random()*4);
    var randomColor=btncolor[i];
    
    $("#level-title").text("Level "+level);
    level++;
    gamepattern.push(randomColor);
    console.log(level);
    animatePress(randomColor);
    playSound(randomColor);
}
function playSound(randomColour){
    
    var audio = new Audio("sounds/" + randomColour + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}
