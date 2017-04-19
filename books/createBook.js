let sql = require('./../sql');
let assert = require('chai').assert;

module.exports = (req, res, next) => {
  /**
   * creating new book
   * @param {string} name not empty
   * @param {string} author not empty
   * @param {number} year < (new Date()).getFullYear();
   */
  res['result'] = {'name': 'new book name'};
  let name = req.body['name'];
  let author = req.body['author'];
  let year = +req.body['year'];

  assert.isString(name, 'name must be string');
  assert.isString(author, 'author must be string');
  assert.isNumber(year, 'year must be number');

  assert.isAtLeast(name.length, 1, 'name must not be empty');
  assert.isAtLeast(author.length, 1, 'author must not be empty');
  assert.isAtMost(year, (new Date()).getFullYear(), 'year cannot be later than current year');

  let sqlQuery = `INSERT INTO books(name, author, year) VALUES($1, $2, $3) RETURNING id;`;
  sql(sqlQuery, [name, author, year])
  .then(result => {
    console.log(result);
    let bookId = result.rows[0].id;
    res['result'] = {bookId};
    next();
  })
  .catch(err => {
    next(err);
  });
}