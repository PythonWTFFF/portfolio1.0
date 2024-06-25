function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter() {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[rand(0, alphabet.length - 1)];
}

function getRandomWord(word) {
    var text = word.innerHTML;
    var finalWord = '';
    
    for (var i = 0; i < text.length; i++) {
        finalWord += text[i] === ' ' ? ' ' : getRandomLetter();
    }
    
    return finalWord;
}

var word = document.querySelector('p');
var interv;
var canChange = false;
var globalCount = 0;
var count = 0;
var INITIAL_WORD = word.innerHTML;
var isGoing = false;

function init() {
    if (isGoing) return;
    
    isGoing = true;
    var randomWord = getRandomWord(word);
    word.innerHTML = randomWord;

    interv = setInterval(function() {
        var finalWord = '';
        for (var x = 0; x < INITIAL_WORD.length; x++) {
            if (x <= count && canChange) {
                finalWord += INITIAL_WORD[x];
            } else {
                finalWord += getRandomLetter();
            }
        }
        word.innerHTML = finalWord;

        if (canChange) {
            count++;
        }
        if (globalCount >= 20) {
            canChange = true;
        }
        if (count >= INITIAL_WORD.length) {
            clearInterval(interv);
            count = 0;
            canChange = false;
            globalCount = 0;
            isGoing = false;
        }
        globalCount++;
    }, 5);
}

word.addEventListener('mouseenter', init);
