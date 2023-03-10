import { expect } from 'chai';
import { checkWord } from './checkWord';

describe('checkWord function check', () => {
  it('should return winIndicator and status array for correct word', () => {
    const wordNum = 0;
    const userGuess = 'אלבום';
    const expectedResult = {
      winIndicator: true,
      statusArray: ['bull', 'bull', 'bull', 'bull', 'bull'],
    };
    expect(checkWord(userGuess, wordNum)).to.deep.equal(expectedResult);
  });

  it('should return winIndicator and status array fo incorrect word', () => {
    const wordNum = 0;
    const userGuess = 'פריצה';
    const expectedResult = {
      winIndicator: false,
      statusArray: ['wrong', 'wrong', 'wrong', 'wrong', 'wrong'],
    };
    expect(checkWord(userGuess, wordNum)).to.deep.equal(expectedResult);
  });
});
