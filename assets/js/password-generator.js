// arranging and configuring DOM
var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var symbolsEl = document.getElementById("symbols");
var numbersEl = document.getElementById("numbers");
var generateEl = document.getElementById("generate");
var clipboardEl = document.getElementById("clipboard");
// special characters array
var specialCharacters = [
    '@',
    '%',
    '+',
    '\\',
    '/',
    "'",
    '!',
    '#',
    '$',
    '^',
    '?',
    ':',
    ',',
    ')',
    '(',
    '}',
    '{',
    ']',
    '[',
    '~',
    '-',
    '_',
    '.'
];
// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];
// Array of uppercase characters to be included in password
var upperCasedCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];
// event listener for using textarea 
clipboard.addEventListener('click', () => {
    var textarea = document.createElement('textarea');
    var password = resultEl.innerText;
    // if password doesn't exist, return nothing 
    if (!password) {
        return;
    }
    // setting value of the text area to password
    textarea.value = password;
    // appending child to DOM
    document.body.appendChild(textarea);
    textarea.select();
    // copying password to clipboard    
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});
// event listener for checked or unchecked boxes
generateEl.addEventListener('click', () => {
    var length = +lengthEl.value;
    var yesLower = lowercaseEl.checked;
    var yesUpper = uppercaseEl.checked;
    var yesSymbol = symbolsEl.checked;
    var yesNumber = numbersEl.checked;
    resultEl.innerText = generatePassword(yesUpper, yesLower, yesNumber, yesSymbol, length);
});
// generate password function passing in 4 type parameters and length parameter
function generatePassword(upper, lower, number, symbol, length) {
    // created empty string
    var generatedPassword = "";
    // loop through all 4 types    
    for (var i = 0; i < length; i++) {
        // if type is checked, add random type to empty string for all 4 types        
        if (upper === true) {
            generatedPassword += getRandomUpper();
        }
        if (lower === true) {
            generatedPassword += getRandomLower();
        }
        if (number === true) {
            generatedPassword += getNumeric();
        }
        if (symbol === true) {
            generatedPassword += getRandomSpecial();
        }
    }
    // create a blank string which i will take generated password and shuffle it
    var shuffledPassword = "";
    // turn generatedPassword into a character array from a string
    generatedPassword = generatedPassword.split('');
    // loop through new character array and randomly choose (length)amount of characters/array items
    while (generatedPassword.length > 0) {
        shuffledPassword += generatedPassword.splice(generatedPassword.length * Math.random() << 0, 1);
    }
    // trim off all unneeded characters    
    var finalPassword = shuffledPassword.slice(0, length);
    // given result    
    return finalPassword;

}
// random lower function
function getRandomLower() {
    return lowerCasedCharacters[Math.floor(Math.random() * lowerCasedCharacters.length)];
}
// random upper function
function getRandomUpper() {
    return upperCasedCharacters[Math.floor(Math.random() * upperCasedCharacters.length)];
}
// random spec char function
function getRandomSpecial() {
    return specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
}
// random numeric function
function getNumeric() {
    return numericCharacters[Math.floor(Math.random() * numericCharacters.length)];
}