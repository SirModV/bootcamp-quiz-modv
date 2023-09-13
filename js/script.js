var startgame = document.getElementById ("startbtn")
var timer = document.getElementById("time")
var mainpage = document.getElementById("hero")
var question = document.querySelector(".questionpage")
var highscores
var sec = 70


// var question = [
//     {question: "what is an array", choice1},
//     {question: "what is an for loop"},
// ]

var starttimerbtn = function(){
    sec--
    document.getElementById("time").innerText = "Time left: " +  sec;
    console.log("hello")
}

var startquiz = () => {
 setInterval(starttimerbtn,1000) 
 question.style.display = "block"
 mainpage.style.display = "none"  

}

startgame.addEventListener("click", startquiz);