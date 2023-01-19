"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWord = void 0;
const app_1 = require("./app");
function switchFinalLetters(str) {
    let char = str.substring(str.length - 1);
    let replaceLetter = "";
    if ("ךםןץף".includes(char)) {
        switch (char) {
            case "ך":
                replaceLetter = "כ";
                break;
            case "ם":
                replaceLetter = "מ";
                break;
            case "ן":
                replaceLetter = "נ";
                break;
            case "ף":
                replaceLetter = "פ";
                break;
            case "ץ":
                replaceLetter = "צ";
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
function checkWord(userGuess, curRow, guessedLetters) {
    const checkedRow = [...userGuess];
    const guessed = Object.assign({}, guessedLetters);
    for (let i = 0; i < 5; i++) {
        const checkedLetter = switchFinalLetters(checkedRow[i].content);
        const theWordCurLetter = switchFinalLetters(app_1.theWord[i]);
        const theWordNoFinals = switchFinalLetters(app_1.theWord);
        if (checkedLetter === theWordCurLetter) {
            checkedRow[i].status = "bull";
            guessed.bull.push(checkedLetter);
        }
        else if (theWordNoFinals.includes(checkedLetter)) {
            checkedRow[i].status = "cow";
            guessed.cow.push(checkedLetter);
        }
        else {
            checkedRow[i].status = "wrong";
            guessed.wrong.push(checkedLetter);
        }
    }
    let guessString = "";
    for (let i = 0; i < 5; i++) {
        guessString += checkedRow[i].content;
    }
    if (guessString === app_1.theWord) {
        console.log("success");
        return {
            winIndicator: true,
            activeGame: false,
            matrixRowNumber: curRow,
            matrixRowContent: checkedRow,
            guessedLetters: guessed,
        };
    }
    else if (curRow === 5 && guessString !== app_1.theWord) {
        console.log("fail");
        return {
            winIndicator: false,
            activeGame: false,
            matrixRowNumber: curRow,
            matrixRowContent: checkedRow,
            guessedLetters: guessed,
        };
    }
    else {
        return {
            winIndicator: false,
            activeGame: true,
            matrixRowNumber: curRow,
            matrixRowContent: checkedRow,
            guessedLetters: guessed,
        };
    }
}
exports.checkWord = checkWord;
