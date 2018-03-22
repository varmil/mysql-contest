const mysql = require('mysql')
const cp = require('child_process')
const assert = require('assert')
const env = process.env

// mysql connection string
const DSN = `mysql -h${env.MYSQL_HOSTNAME} -uroot -p${env.MYSQL_ROOT_PASSWORD}`

// root-level hook (async)
beforeEach((done) => {
  // console.log('      --------------- RESET DB ---------------')

  // drop and re-create database && import initial dataset
  const command = `
    ${DSN} -e '\
    DROP DATABASE IF EXISTS ${env.MYSQL_DATABASE}; \
    CREATE DATABASE IF NOT EXISTS ${env.MYSQL_DATABASE};' && \
    ${DSN} ${env.MYSQL_DATABASE} < /mocha/tests/_data/learning-sql-example.sql`

  // fork a child process
  cp.exec(command, (error, stdout, stderr) => {
    if (error) throw error
    // console.log(`stdout: ${stdout}`)
    // console.log(`stderr: ${stderr}`)
    done()
  })
})

describe('SELECT', () => {
  it('#foobar __1', () => {
    assert.equal([1, 2, 3].indexOf(4), -1)
  })

  it('#barbaz __2', () => {
    assert.equal([1, 2, 3][1], 2)
  })
})