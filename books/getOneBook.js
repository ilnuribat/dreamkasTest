const sql = require('./../sql');

module.exports = (req, res, next) => {
  /**
   * getting one book by id
   * @param {number} id
   */
  let sqlQuery = `SELECT * FROM books WHERE id = $1;`;
  sql(sqlQuery, [+req.params.id])
  .then(result => {
    if (result.rows.length == 0) {
      res.status(404);
      next(new Error('no books found'));
    }
    res['result'] = result.rows[0];
    next();
  })
  .catch(err => {
    next(err);
  })
}