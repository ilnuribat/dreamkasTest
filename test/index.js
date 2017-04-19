//here will be mocha tests
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let assert = require('chai').assert;
let sql = require('./../sql');

chai.use(chaiHttp);

describe('logic tests: ', function() {
  let self = this;
  const md5Password = '5f4dcc3b5aa765d61d8327deb882cf99';
  before(() =>
    chai.request(server)
      .post('/auth')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`login=Ilnur&password=${md5Password}`)
      .then(res => {
        assert.isObject(res.body);
        assert.isTrue(res.body.ok);
        assert.isString(res.body.data.token);
        self['token'] = res.body.data.token;
      }));
  it('create new book', () =>
    chai.request(server)
      .post('/books')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`token=${self.token}&name=test&author=test&year=2016`)
      .then(res => {
        assert.isObject(res.body);
        assert.isTrue(res.body.ok);
        assert.isObject(res.body.data);
        assert.isNumber(res.body.data.bookId);
        self['bookId'] = res.body.data.bookId;
      }));
  it('update book, that was created in previous step', () => 
    chai.request(server)
      .put(`/books/${self.bookId}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`token=${self.token}&name=testUpdated&author=testUpdated&year=2015`)
      .then(res => {
        assert.isObject(res.body);
        assert.isTrue(res.body.ok);
        assert.isObject(res.body.data);
        assert.equal(res.body.data.message, 'updated');
      }));
  it('get by filters updated book', () => 
    chai.request(server)
      .get(`/books?name=testUpdated&author=testUpdated&year=2015`)
      .then(res => {
        assert.isObject(res.body);
        assert.isTrue(res.body.ok);
        assert.isArray(res.body.data);
        assert.equal(res.body.data.length, 1);
      }));
  it('get updated book by id', () => 
    chai.request(server)
      .get(`/books/${self.bookId}`)
      .then(res => {
        assert.isObject(res.body);
        assert.isTrue(res.body.ok);
        assert.isObject(res.body.data);
        assert.isString(res.body.data.name);
        assert.isString(res.body.data.author);
        assert.isNumber(res.body.data.year);
      }));
  it('delete created(updated) book', () =>
    chai.request(server)
      .del(`/books/${self.bookId}?token=${self.token}`)
      .then(res => {
        assert.isObject(res.body);
        assert.isTrue(res.body.ok);
        assert.isObject(res.body.data);
        assert.equal(res.body.data.message, 'deleted');
      }))
})