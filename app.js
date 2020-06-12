
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Draw Stand
ctx.fillRect(60,440,80,40);

ctx.moveTo(100, 25);
ctx.lineTo(100, 440);
ctx.stroke();

ctx.moveTo(250, 25);
ctx.lineTo(100, 25);
ctx.stroke();

ctx.moveTo(250, 25);
ctx.lineTo(250, 60);
ctx.stroke();


const DrawHangman = {
  drawHead: function(){
    ctx.beginPath();
    ctx.arc(250, 100, 40, 0, 2 * Math.PI);
    ctx.stroke();
  },
  drawBody: function(){
    ctx.moveTo(250, 140);
    ctx.lineTo(250, 340);
    ctx.stroke();
  },
  drawRightArm: function(){
    ctx.moveTo(250, 240);
    ctx.lineTo(300, 140);
    ctx.stroke();
  },
  drawLeftArm: function(){
    ctx.moveTo(250, 240);
    ctx.lineTo(200, 140);
    ctx.stroke();
  },
  drawRightLeg: function(){
    ctx.moveTo(250, 340);
    ctx.lineTo(300, 440);
    ctx.stroke();
  },
  drawLeftLeg: function(){
    ctx.moveTo(250, 340);
    ctx.lineTo(200, 440);
    ctx.stroke();
  }
}

const drawArray = [DrawHangman.drawHead,
                  DrawHangman.drawBody,
                  DrawHangman.drawRightArm,
                  DrawHangman.drawLeftArm,
                  DrawHangman.drawRightLeg,
                  DrawHangman.drawLeftLeg];


const words = ["dolphin", "elephant", "eagle", "tiger", "shark"];

let randomNum = Math.floor(Math.random() * words.length);
console.log(randomNum);

let randomWord = words[randomNum];
let randomWordLength = randomWord.length;

const wordBox = document.getElementById("wordContainer");
const wordBlanks = document.getElementById("wordBlanks");
const lettersGuessedBox = document.getElementById("lettersGuessedBox");
let numWrongGuesses = 0;
const maxWrongGuessesAllowed = 5;

let blanks = []
let incorrectGuesses = [];


for(let i = 0; i < randomWordLength; i++){
  blanks.push("_");
}


wordBox.innerHTML = randomWord;
wordBlanks.innerHTML = blanks.join(" ");

document.addEventListener("keydown", function(e){
  let currentGuess = e.key;
  checkGuess(currentGuess);
  console.log(typeof e.key);
});
//let letters = [];

function checkWin(){
  if(blanks.join("") === randomWord)
  alert("You won!");
}

function checkGuess(currentGuess){


  console.log(randomWord);
  if(randomWord.includes(currentGuess)){
    var wordToArray = randomWord.split("");
    console.log(wordToArray);
    var i = 0;
    while(randomWord.indexOf(currentGuess,i) != -1){
      console.log("hi");
      var currentIndex = randomWord.indexOf(currentGuess, i);
      blanks[currentIndex] = currentGuess;
      i = currentIndex + 1;
    }
    wordBlanks.innerHTML = blanks.join(" ");

    // for(const letter of wordToArray){
    //     if(letter === currentGuess){
    //       console.log(wordToArray.indexOf(letter));
    //       letters.push(letter);
    //       blanks[wordToArray.indexOf(letter)] = letter;
    //       wordBlanks.innerHTML = blanks.join(" ");
    //     }
    //
    // }

    checkWin();
  }else{
    if(numWrongGuesses === maxWrongGuessesAllowed){
      drawArray[numWrongGuesses]();
      alert("You Lose!")
    }else{
      incorrectGuesses.push(currentGuess);
      lettersGuessedBox.innerHTML = incorrectGuesses.join(", ");
      drawArray[numWrongGuesses]();
      numWrongGuesses++;

    }

  }

}
