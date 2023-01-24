"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWord = void 0;
const app_1 = require("./app");
function switchFinalLetters(str) {
    let char = str.substring(str.length - 1);
    let replaceLetter = '';
    if ('ךםןץף'.includes(char)) {
        switch (char) {
            case 'ך':
                replaceLetter = 'כ';
                break;
            case 'ם':
                replaceLetter = 'מ';
                break;
            case 'ן':
                replaceLetter = 'נ';
                break;
            case 'ף':
                replaceLetter = 'פ';
                break;
            case 'ץ':
                replaceLetter = 'צ';
                break;
        }
        const newStr = str.replace(char, replaceLetter);
        return newStr;
    }
    return str;
}
/**
 * check if the user's guess matches the secret word
 *
 * @param userGuess
 * @param curRow
 * @param guessedLetters
 * @returns
 */
function checkWord(userGuess, wordNum) {
    const theWord = app_1.wordBank[wordNum];
    const statusArray = [];
    const winIndicator = userGuess === theWord;
    const userGuessNoFinals = switchFinalLetters(userGuess);
    const theWordNoFinals = switchFinalLetters(theWord);
    Array.from(userGuessNoFinals).forEach((char, i) => {
        if (char === theWordNoFinals[i]) {
            statusArray.push('bull');
        }
        else if (char !== theWordNoFinals[i] && theWordNoFinals.includes(char)) {
            statusArray.push('cow');
        }
        else {
            statusArray.push('wrong');
        }
    });
    return {
        winIndicator,
        statusArray,
    };
}
exports.checkWord = checkWord;
