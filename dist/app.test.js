"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
let theWord;
describe("GET /newWord", () => {
    it("should return a new random word", (done) => {
        (0, supertest_1.default)("http://localhost:3001")
            .get("/newWord")
            .expect(200)
            .expect("Content-Type", /text/)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, chai_1.expect)(res.text).to.be.a("string");
            theWord = res.text;
            done();
        });
    });
});
describe(" GET /word", () => {
    it("should return the word chosen randomly", (done) => {
        (0, supertest_1.default)("http://localhost:3001")
            .get("/word")
            .expect(200)
            .expect("Content-Type", /text/)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, chai_1.expect)(res.text).to.be.a("string");
            (0, chai_1.expect)(res.text).to.equal(theWord);
            done();
        });
    });
});
