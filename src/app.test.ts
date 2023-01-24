import request from 'supertest';
import { expect } from 'chai';
import { wordBank } from './app';

describe('GET /wordnum', () => {
  it('should return a new random number', (done) => {
    request('http://localhost:3001')
      .get('/wordnum')
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        if (err) return done(err);
        expect(200);
        expect(res.text).to.be.a('string');
        const index = Number(res.text);
        expect(index).to.be.a('number');
        expect(index).to.be.within(0, wordBank.length - 1);
        done();
      });
  });
});

describe(' GET /theword/:wordnum', () => {
  it('should return the word chosen randomly', (done) => {
    request('http://localhost:3001')
      .get('/theword/0')
      .expect(200)
      .expect('Content-Type', /text/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.be.a('string');
        expect(res.text).to.equal(wordBank[0]);
        done();
      });
  });
});
