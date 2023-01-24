"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const checkWord_1 = require("./checkWord");
describe('checkWord function check', () => {
    it('should return winIndicator and status array for correct word', () => {
        const wordNum = 0;
        const userGuess = 'אלבום';
        const expectedResult = {
            winIndicator: true,
            statusArray: ['bull', 'bull', 'bull', 'bull', 'bull'],
        };
        (0, chai_1.expect)((0, checkWord_1.checkWord)(userGuess, wordNum)).to.deep.equal(expectedResult);
    });
    it('should return winIndicator and status array fo incorrect word', () => {
        const wordNum = 0;
        const userGuess = 'פריצה';
        const expectedResult = {
            winIndicator: false,
            statusArray: ['wrong', 'wrong', 'wrong', 'wrong', 'wrong'],
        };
        (0, chai_1.expect)((0, checkWord_1.checkWord)(userGuess, wordNum)).to.deep.equal(expectedResult);
    });
});
