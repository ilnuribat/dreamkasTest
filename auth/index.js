let assert = require('chai').assert;
let sql = require('../sql');
let generateToken = require('./generateToken');

module.exports = (req, res, next) => {
  //getting from post request login and password
  /**
   * @param {string} login
   * @param {string} password in MD5
   */
  const login = req.body['login'];
  const password = req.body['password'];
  assert.isString(login, 'login is not string');
  assert.isString(password, 'password is not string');
  const loginLength = 5;
  assert.isAtLeast(login.length, loginLength, `login must be at least ${loginLength} words`);
  assert.equal(password.length, 32, 'wrong format of password, must be in MD5');

  let sqlQuery = `SELECT id FROM users 
                    WHERE login = $1 AND MD5(CONCAT($2::TEXT, salt)) = password;`;
  sql(sqlQuery, [login, password])
    .then(result => {
      if (result.rows.length == 0)
        throw new Error('Wrong login or password');
      return generateToken(result.rows[0].id)
    })
    .then(token => {
      res['result'] = {token};
      next();
    })
    .catch(err => {
      next(err);
    });
}