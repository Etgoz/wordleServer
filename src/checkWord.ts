import { theWord } from "./app";

export interface IGussedLetters {
	bull: string[];
	cow: string[];
	wrong: string[];
}

export interface IRefMatrix {
	content: string;
	status: string;
	//status: empty / wrong / cow / bull
}

function switchFinalLetters(str: string): string {
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

export interface ICheckWord {
	winIndicator: boolean;
	activeGame: boolean;
	matrixRowNumber: number;
	matrixRowContent: IRefMatrix[];
	guessedLetters: IGussedLetters;
}

/**
 * check if the user's guess matches the secret word
 *
 * @param userGuess
 * @param curRow
 * @param guessedLetters
 * @returns
 */
export function checkWord(
	userGuess: IRefMatrix[],
	curRow: number,
	guessedLetters: IGussedLetters
): ICheckWord {
	const checkedRow = [...userGuess];
	const guessed = { ...guessedLetters };

	for (let i = 0; i < 5; i++) {
		const checkedLetter = switchFinalLetters(checkedRow[i].content);
		const theWordCurLetter = switchFinalLetters(theWord[i]);
		const theWordNoFinals = switchFinalLetters(theWord);
		if (checkedLetter === theWordCurLetter) {
			checkedRow[i].status = "bull";
			guessed.bull.push(checkedLetter);
		} else if (theWordNoFinals.includes(checkedLetter)) {
			checkedRow[i].status = "cow";
			guessed.cow.push(checkedLetter);
		} else {
			checkedRow[i].status = "wrong";
			guessed.wrong.push(checkedLetter);
		}
	}
	let guessString = "";
	for (let i = 0; i < 5; i++) {
		guessString += checkedRow[i].content;
	}
	if (guessString === theWord) {
		console.log("success");
		return {
			winIndicator: true,
			activeGame: false,
			matrixRowNumber: curRow,
			matrixRowContent: checkedRow,
			guessedLetters: guessed,
		};
	} else if (curRow === 5 && guessString !== theWord) {
		console.log("fail");
		return {
			winIndicator: false,
			activeGame: false,
			matrixRowNumber: curRow,
			matrixRowContent: checkedRow,
			guessedLetters: guessed,
		};
	} else {
		return {
			winIndicator: false,
			activeGame: true,
			matrixRowNumber: curRow,
			matrixRowContent: checkedRow,
			guessedLetters: guessed,
		};
	}
}
