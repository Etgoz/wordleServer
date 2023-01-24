"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const app_1 = require("./app");
describe('GET /wordnum', () => {
    it('should return a new random number', (done) => {
        (0, supertest_1.default)('http://localhost:3001')
            .get('/wordnum')
            .expect(200)
            .expect('Content-Type', /text/)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, chai_1.expect)(200);
            (0, chai_1.expect)(res.text).to.be.a('string');
            const index = Number(res.text);
            (0, chai_1.expect)(index).to.be.a('number');
            (0, chai_1.expect)(index).to.be.within(0, app_1.wordBank.length - 1);
            done();
        });
    });
});
describe(' GET /theword/:wordnum', () => {
    it('should return the word chosen randomly', (done) => {
        (0, supertest_1.default)('http://localhost:3001')
            .get('/theword/0')
            .expect(200)
            .expect('Content-Type', /text/)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, chai_1.expect)(res.text).to.be.a('string');
            (0, chai_1.expect)(res.text).to.equal(app_1.wordBank[0]);
            done();
        });
    });
});
