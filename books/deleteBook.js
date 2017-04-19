const sql = require('./../sql');

module.exports = (req, res, next) => {
  /**
   * deleting book by id
   * @param {number} id
   */
  let bookId = +req.params.id;
  let sqlQuery = `DELETE FROM books WHERE id = $1;`;
  sql(sqlQuery, [bookId])
  .then(result => {
    if (result.rowCount == 0)
      throw new Error('no such book to delete');
    res['result'] = {
      'message': 'book deleted'
    }
    next();
  })
  .catch(err => {
    next(err);
  });
}