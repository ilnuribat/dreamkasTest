let sql = require('./../sql');
let assert = require('chai').assert;
let url = require('url');

module.exports = (req, res, next) => {
  /**
   * getting list of books with filters(or not)
   * @param {string} name may be undefined
   * @param {stirng} author may be undefined
   * @param {number} year may be undefined
   */
  let params = url.parse(req.url, true).query;
  let sqlQuery = `SELECT id, name, author, year FROM books WHERE 1=1`; //Хитрый момент 1=1
  let sqlParams = [];

  let name = params['name'];
  let author = params['author'];
  let year = params['year'];

  if (name) {
    assert.isString(name, 'name must be string');
    assert.isAtLeast(name.length, 1, 'name must not be empty');
    sqlParams.push(name);
    sqlQuery += ` AND name = $${sqlParams.length}`;
  }
  if (author) {
    assert.isString(author, 'author must be string');
    assert.isAtLeast(author.length, 1, 'author must not be empty');
    sqlParams.push(author);
    sqlQuery += ` AND author = $${sqlParams.length}`;
  }
  if (year) {
    year -= 0; //str to int, может быть NaN, null и тому прочее гадости
    assert.isNumber(year, 'year must be number');
    assert.isAtMost(year, (new Date()).getFullYear(), 'year cannot be later than current year');
    sqlParams.push(year);
    sqlQuery += ` AND year = $${sqlParams.length}`;
  }

  if (sqlParams.length == 0) 
    throw new Error('please, select at least one condition');

  sqlQuery += ';';
  sql(sqlQuery, sqlParams)
  .then(result => {
    if (result.rows.length == 0)
      throw new Error(`no books found by ${sqlParams.length == 1 ? 'this' : 'these'} condition${sqlParams.length == 1 ? '' : 's'}`);
    res['result'] = result.rows;
    next();
  })
  .catch(err => {
    next(err);
  })
}