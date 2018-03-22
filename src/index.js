const { promisify } = require('util')
const db = require('./database')

exports.foo = async function () {
  return await db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results[0].solution)
  })
}