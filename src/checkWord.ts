import { wordBank } from './app';

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

export interface ICheckWord {
  winIndicator: boolean;
  statusArray: string[];
}

function switchFinalLetters(str: string): string {
  const char = str.substring(str.length - 1);
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
export function checkWord(userGuess: string, wordNum: number): ICheckWord {
  const theWord = wordBank[wordNum];
  const statusArray: string[] = [];

  const winIndicator = userGuess === theWord;

  const userGuessNoFinals = switchFinalLetters(userGuess);
  const theWordNoFinals = switchFinalLetters(theWord);

  Array.from(userGuessNoFinals).forEach((char, i) => {
    if (char === theWordNoFinals[i]) {
      statusArray.push('bull');
    } else if (char !== theWordNoFinals[i] && theWordNoFinals.includes(char)) {
      statusArray.push('cow');
    } else {
      statusArray.push('wrong');
    }
  });

  return {
    winIndicator,
    statusArray,
  };
}
