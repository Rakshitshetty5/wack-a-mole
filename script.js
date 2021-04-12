var mole = document.createElement('img')
mole.setAttribute('src','images/mole-svgrepo-com.svg')
mole.setAttribute('alt','Mole')
mole.setAttribute('class','mole')
// <!-- <img src="mole-svgrepo-com.svg" alt="mole" class="mole"> -->


var points = 0
var previousRandomHoleId;
var timeInterval;
var timeLimit;
var timeLeft = 30
var forTimeLeft

function displayHighestScore(){
    if(localStorage.getItem("highestscore")){
        if(localStorage.getItem("highestscore") < points){
            localStorage.setItem("highestscore", points);
        }
    }else{
        localStorage.setItem("highestscore", points);
    }
    
    document.getElementById('highest').innerHTML = "Best Score: " + localStorage.getItem("highestscore")
    
}
displayHighestScore()

function gameOver(){
    var audio = new Audio('sounds/over.wav');
    audio.play();

    displayHighestScore()

    document.getElementById('timer').style.display = "none"


    points = 0
    document.getElementById('holes').style.display = "none"
    document.getElementById('start').style.display = "block"
    document.getElementById('start').innerHTML = "Play Again"
    document.getElementById('header').style.display = "flex"
    document.getElementById('highest').style.display = "block"

    clearInterval(timeInterval)
    clearTimeout(timeLimit)
}

function wack(e){
    // if mole is present add point then change mole position
    // if mole is not present change mole position

    var audio = new Audio('sounds/kill.mp3');
    audio.play();

    if(e.childNodes[0]){
        points += 1
    }else{
        points -= 1
    }
    document.getElementById('points').innerHTML = "Points: " + points
    if(points < 0){
       gameOver()
    }
    changePosition()
}

function changePosition(){
    var holes_arr = document.querySelectorAll('.hole');
    var noOfHoles = holes_arr.length
    if(previousRandomHoleId >= 0 ){
        holes_arr[previousRandomHoleId].style.boxShadow = "none"

    }

    var randomHoleId = Math.floor(Math.random()*noOfHoles)
    previousRandomHoleId = randomHoleId
    holes_arr[randomHoleId].appendChild(mole)
    holes_arr[randomHoleId].style.boxShadow = "0.5rem 0.5rem 0.5rem rgb(0, 0, 0.1)"

}

function start(){
    timeLeft = 30
    forTimeLeft = setInterval(updateTimeLeft,1000)
    document.getElementById('points').innerHTML = "Points: " + points
    document.getElementById('holes').style.display = "flex"
    document.getElementById('points').style.display = "block"
    document.getElementById('start').style.display = "none"
    document.getElementById('header').style.display = "none"
    document.getElementById('highest').style.display = "none"
    document.getElementById('timer').style.display = "block"


    timeInterval = setInterval(changePosition, 2000)
    timeLimit = setTimeout(gameOver, 30000)
}

function updateTimeLeft(){
    timeLeft--;
    document.getElementById('timer').innerHTML = timeLeft
    if(timeLeft <= 10){
        document.getElementById('timer').style.color = "red"
    }
    if(timeLeft === 0){
        clearInterval(forTimeLeft)
    }
}




