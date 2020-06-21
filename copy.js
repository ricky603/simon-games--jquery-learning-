var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0

var randomChosenColour;
var gamePattern = []
var userClickedPattern = []

function nextSequence() {
  userClickedPattern = []
  var randomNumber = Math.floor(Math.random() * 4)
  randomChosenColour = buttonColours[randomNumber]
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
  soundPlay(randomChosenColour)
  gamePattern.push(randomChosenColour)
  level++
  $("h1").text("level " + level)
}

function soundPlay(colorSound) {
  var sound = new Audio("sounds/" + colorSound + ".mp3")
  sound.play()
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed")
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000)
    }

  } else {
    console.log("wrong")
  }
}

$(document).keydown(function (event) {
  if (event.key !== null) {
    if (level === 0) {
      nextSequence()
    }
  }
})

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor)
  soundPlay(userChosenColor)
  animatePress(userChosenColor)
  setTimeout(function () {
    $("." + userChosenColor).removeClass("pressed")
  }, 100)
  checkAnswer(level)
})