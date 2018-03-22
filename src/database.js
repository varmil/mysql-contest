const { promisify } = require('util')
const mysql = require('mysql')
const conn = mysql.createConnection({
  host: process.env.MYSQL_HOSTNAME,
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

conn.connect(function (error) {
  if (error) throw error
})

exports.query = function (query, data) {
  return promisify(conn.query).bind(conn)(query, [data])
}

exports.beginTransaction = function () {
  return promisify(conn.beginTransaction).bind(conn)()
}

exports.commit = function () {
  return promisify(conn.commit).bind(conn)()
}

exports.rollback = function () {
  return promisify(conn.rollback).bind(conn)()
}
