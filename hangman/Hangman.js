const words = [
  "Apple", "Banana", "Cherry", "Dragonfruit", "Feijoa", "Grapefruit", "Honeyberry", "Jackfruit", "Kiwi", "Lemon", "Batteries", "Headphones", "Tablecloth", "Pencil",
  "Opener", "Clock", "Car", "Cable", "Hairdryer", "Brush", "Poster", "Pain", "Rubber", "Box", "Cow", "Yeti", "Mars", "Zebra", "Quiz", "Terrace", "Zucchini", "Artichoke", "Aubergine", "Broccoli", "Leaf",
  "Rubbish", "Lettuce", "Mouse", "Kohlrabi", "Root", "Radish", "Beetroot", "Pullover", "Mobile", "Key", "Case", "Scarf", "Cap", "Office","Plant"
]

// Generate randomWord
const getRandomWord = () => words[Math.floor(Math.random() * words.length)]
let randomWord = getRandomWord()
console.log(randomWord)

// Pageload create randomWord and set underlines
window.onload = function() {
  const guessedWordElement = document.getElementById("guessedWord")
  guessedWordElement.textContent = guessedWord.join(" ")
}
let guessedWord = randomWord.split("").map((_) => "_")
console.log(guessedWord)

// Enter input with enter key
document.addEventListener("DOMContentLoaded", function() {
  //Input with enter key
  const inputLetterElement = document.getElementById("inputLetter")
  inputLetterElement.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      handleTextInput()
    }
  })

  // Restriction input
  inputLetterElement.addEventListener("input", function() {
    const letter = inputLetterElement.value
    if (!/^[a-zA-Z]$/.test(letter)) {
      const validationMessageElement = document.getElementById("validationMessage")
      validationMessageElement.classList.remove("hidden")
    } else {
      const validationMessageElement = document.getElementById("validationMessage")
      validationMessageElement.classList.add("hidden")
    }
  })
})

// Push buttom check
let numberOfLives = 10
const numberOfLivesElement = document.getElementById("numberOfLives")
numberOfLivesElement.textContent = numberOfLives

function handleTextInput() {
  const inputLetterElement = document.getElementById("inputLetter")
  const letter = inputLetterElement.value
  processLetter(letter)
  inputLetterElement.value = ""
}

/**
 * todo
 * @param letter
 */
//
function handleKeyboardInput(letter) {
  processLetter(letter)
}

function processLetter(letter) {
  if (numberOfLives > 0 && guessedWord.join("").toLowerCase() !== randomWord.toLowerCase()) {

    if (isLetterInWord(letter)) {
      replaceMatchedLetters(randomWord, letter);
    } else {
      numberOfLives = numberOfLives - 1;
      drawHangperson();
      hangPersonSteps = hangPersonSteps + 1;
    }
    numberOfLivesElement.textContent = numberOfLives;
    checkWinLose();
    markGuessedLetter(letter);
  }
}

// checkWinLose, show result winLoseBanner
function checkWinLose() {
  const winLoseBannerElement = document.getElementById("winLoseBanner")
  const winLoseBannerTextElement = document.getElementById("winLoseBanner--text")
  const inputLetter = document.getElementById("inputLetter")

  if (
    guessedWord.join("").toLowerCase() === randomWord.toLowerCase()
  ) {
    winLoseBannerTextElement.textContent = "🥳You won!🥳 The word was \"" + randomWord + "\""
    winLoseBannerElement.classList.remove("hidden")
  } else if (numberOfLives === 0) {
    winLoseBannerTextElement.textContent = "You lost.😞😫😭 The word was \"" + randomWord + "\""
    winLoseBannerElement.classList.remove("hidden")
    inputLetter.disabled = true
  }
}

// Check letterInWord, placeMatchedLetter
function isLetterInWord(letter) {
  return randomWord.toLowerCase().includes(letter.toLowerCase())
}

function replaceMatchedLetters(randomWord, letter) {
  console.log("replaceMatchedLetters")
  const randomWordArray = randomWord.split("")

  for (let i = 0; i < randomWordArray.length; i++) {
    if (randomWordArray[i].toLowerCase() === letter.toLowerCase()) {
      guessedWord[i] = randomWordArray[i]
      const guessedWordElement = document.getElementById("guessedWord")
      guessedWordElement.textContent = guessedWord.join(" ")
    }
  }
}

// Reset button
function newGame() {
  randomWord = getRandomWord()
  console.log(randomWord)

  guessedWord = randomWord.split("").map((_) => "_")

  const guessedWordElement = document.getElementById("guessedWord")
  guessedWordElement.textContent = guessedWord.join(" ")

  const inputLetterElement = document.getElementById("inputLetter")
  inputLetterElement.value = ""

  numberOfLives = 10
  numberOfLivesElement.textContent = numberOfLives

  const winLoseBannerElement = document.getElementById("winLoseBanner")
  winLoseBannerElement.classList.add("hidden")

  const drawHangpersonElement = document.getElementById("drawHangperson")
  const context = drawHangpersonElement.getContext("2d")
  context.clearRect(0, 0, drawHangpersonElement.width, drawHangpersonElement.height)
  hangPersonSteps = 1
  drawStartLineHangperson()

  const keyElements = document.getElementsByClassName("key")
  for (let key of keyElements) {
    key.classList.remove("guessed")
  }

  const inputLetter = document.getElementById("inputLetter")
  inputLetter.disabled = false
}

// Draw start line hangPerson
function drawStartLineHangperson() {
  const drawHangpersonElement = document.getElementById("drawHangperson")
  const context = drawHangpersonElement.getContext("2d")
  context.beginPath()
  context.lineCap = "round"
  context.strokeStyle = "rgb(136,224,239)"
  context.lineWidth = 3
  context.moveTo(50, 0)
  context.lineTo(250, 0)
  context.stroke()
}

// Keyboard
function markGuessedLetter(letter) {
  const keyElement = document.getElementsByClassName("key")
  for (let key of keyElement) {
    if (key.textContent.toLowerCase() === letter.toLowerCase()) {
      key.classList.add("guessed")
    }
  }
}

drawStartLineHangperson()

// Draw hangPerson with canvas
let hangPersonSteps = 1

function drawHangperson() {
  const drawHangpersonElement = document.getElementById("drawHangperson")
  const context = drawHangpersonElement.getContext("2d")

  const strokeStyleWhite = "white"
  const lineWidthSix = "6"
  const lineWidthThree = "3"
  const fillStyleTurquoise = "rgb(20, 74, 82)"
  const lineCapRound = "round"

  switch (hangPersonSteps) {
    case 1:
      // Score:10 // draw vertical line
      context.beginPath()
      context.lineCap = lineCapRound
      context.strokeStyle = "rgb(136,224,239)"
      context.lineWidth = lineWidthThree
      context.moveTo(150, 0)
      context.lineTo(150, 100)
      context.stroke()
      break
    case 2:
      // Score:9 // draw head
      context.fillStyle = "white"
      context.beginPath()
      context.lineWidth = lineWidthThree
      context.arc(150, 125, 30, 0, 2 * Math.PI)
      context.fill()
      break
    case 3:
      // Score:8 // draw body
      context.beginPath()
      context.lineCap = lineCapRound
      context.strokeStyle = strokeStyleWhite
      context.lineWidth = lineWidthSix
      context.moveTo(150, 150)
      context.lineTo(150, 230)
      context.stroke()
      break
    case 4:
      // Score:7 // draw right arm
      context.beginPath()
      context.lineCap = lineCapRound
      context.strokeStyle = strokeStyleWhite
      context.lineWidth = lineWidthSix
      context.moveTo(210, 150)
      context.lineTo(150, 190)
      context.stroke()
      break
    case 5:
      // Score:6 // draw left arm
      context.beginPath()
      context.lineCap = lineCapRound
      context.strokeStyle = strokeStyleWhite
      context.lineWidth = lineWidthSix
      context.moveTo(90, 150)
      context.lineTo(150, 190)
      context.stroke()
      break
    case 6:
      // Score:5 // draw left leg
      context.beginPath()
      context.lineCap = lineCapRound
      context.strokeStyle = strokeStyleWhite
      context.lineWidth = lineWidthSix
      context.moveTo(110, 270)
      context.lineTo(149, 230)
      context.stroke()
      break
    case 7:
      // Score:4 // draw right leg
      context.beginPath()
      context.lineCap = lineCapRound
      context.strokeStyle = strokeStyleWhite
      context.lineWidth = lineWidthSix

  }
}