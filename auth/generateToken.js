const sql = require('./../sql');
const uuidV4 = require('uuid/v4');

module.exports = (userId) => {
  let sqlQuery = `INSERT INTO tokens(userId, token) VALUES($1, $2);`;
  const newUUID = uuidV4();
  return sql(sqlQuery, [userId, newUUID])
  .then(result => {
    return newUUID;
  });
};