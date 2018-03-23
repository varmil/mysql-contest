/**
 * 回答記述
 * 注）すべて１クエリで結果が返るようにしなさい。
 */
const { promisify } = require('util')
const db = require('./database')

exports.e1 = async () => {
  try {
    return await db.query('SHOW TABLES')
  } catch (error) {
    throw error
  }
}

exports.c3p1 = async () => {
  try {
    return await db.query('SELECT emp_id, fname, lname FROM employee ORDER BY lname, fname')
  } catch (error) {
    throw error
  }
}

exports.c3p2 = async () => {
  try {
    return await db.query(`SELECT account_id, cust_id, avail_balance FROM account WHERE status = 'ACTIVE' AND avail_balance > 2500`)
  } catch (error) {
    throw error
  }
}