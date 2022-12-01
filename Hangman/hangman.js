var words = [
    "kittens",
    "tin",
    "attend",
    "free",
    "dirt",
    "descriptive",
    "magenta",
    "salt",
    "hypnotic",
    "influence",
    "pretend",
    "roasted",
    "sincere",
    "pine",
    "cart",
    "pail",
    "trace",
    "houses",
    "little",
    "wreched",
    "supercalifragilisticexpialidocious",
    "bazinga",
    "scadoosh",
    "bumfuzzled",
    "erf",
    "hullaballo",
    "lollygag",
    "bamboozled",
    "inconceivable",
    "cattywampus"
]

let answer = "";
let maxwrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
    let buttonsHtml = "qwertyuiopasdfghjklzxcvbnm".split("").map(letter => 
        `
        <button
        class = "btn btn-lg btn-primary m-2"
        id="` + letter + `"
        onClick="handleGuess('` + letter + `')"
        >
        ` + letter + `
        </button>
        `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHtml;
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_ ")).join('');

    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkWin();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
    }
}

function checkWin() {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "Congratulations! You Win!!";
    }
}

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
    document.getElementById("hangmanImg").src = "./images/H" + mistakes + ".png"
    if (mistakes === maxwrong) {
        document.getElementById("guess").innerHTML = "The correct answer was: "
        document.getElementById("wordSpotlight").innerHTML = answer;
        document.getElementById("keyboard").innerHTML = "Game Over.";
    }
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById("hangmanImg").src = './images/H0.png';
    document.getElementById("guess").innerHTML = "Guess the word:"

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById("maxwrong").innerHTML = maxwrong;


randomWord();
generateButtons();
guessedWord();