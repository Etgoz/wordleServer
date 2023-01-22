import request from "supertest";
import { expect } from "chai";

let theWord: string;
describe("GET /newWord", () => {
	it("should return a new random word", (done) => {
		request("http://localhost:3001")
			.get("/newWord")
			.expect(200)
			.expect("Content-Type", /text/)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.text).to.be.a("string");
				theWord = res.text;
				done();
			});
	});
});

describe(" GET /word", () => {
	it("should return the word chosen randomly", (done) => {
		request("http://localhost:3001")
			.get("/word")
			.expect(200)
			.expect("Content-Type", /text/)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.text).to.be.a("string");
				expect(res.text).to.equal(theWord);
				done();
			});
	});
});
