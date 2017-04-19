const sql = require('./../sql');
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
  let bookId = +req.params.id;

  assert.isString(name, 'name must be string');
  assert.isString(author, 'author must be string');
  assert.isNumber(year, 'year must be number');

  assert.isAtLeast(name.length, 1, 'name must not be empty');
  assert.isAtLeast(author.length, 1, 'author must not be empty');
  assert.isAtMost(year, (new Date()).getFullYear(), 'year cannot be later than current year');

  let sqlQuery = `UPDATE books 
                    SET name = $1, 
                        author = $2, 
                        year = $3
                    WHERE id = $4;`;
  sql(sqlQuery, [name, author, year, bookId])
  .then(result => {
    if (result.rowCount == 0)
      throw new Error('no such bookId');
    res['result'] = {
      'message': 'updated'
    };
    next();
  })
  .catch(err => {
    next(err);
  });
}