let sql = require('./../sql');
let assert = require('chai').assert;
let validate = require('uuid-validate');
let url = require('url');

module.exports = (req, res, next) => {
  /**
   * checking auth, getting id of user
   * @param {string} token uuidv4
   */
  //Если обработчик был до проверки авторизации, то тут делать нечего
  if (res.result) {
    next();
    return;
  }
  let token;
	if (req.method === 'GET' || req.method === 'DELETE')
		token = url.parse(req.url, true).query['token'];
	else 
		token = req.body['token'];
  assert.isString(token, 'token must be string');
  assert.isTrue(validate(token), 'token must be in uuidV4 format');

  let sqlQuery = `SELECT userId FROM tokens WHERE token = $1`;
  sql(sqlQuery, [token])
  .then(result => {
    if (result.rows.length == 0) {
      res.status(403);
      throw new Error('authoriztion needed');
    }
    req['userId'] = result.rows[0].userId;
    next();
  })
  .catch(err => {
    next(err);
  });
}