const mysql = require('mysql')
const cp = require('child_process')
const assert = require('assert')
const target = require('../../src/index')
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

  cp.exec(command, (error, stdout, stderr) => {
    if (error) throw error
    done()
  })
})

describe('SELECT', () => {
  describe('CHILD DESC', () => {
    it('#foobar __1', async () => {
      await target.foo()
      assert.equal([1, 2, 3].indexOf(4), -1)
    })

    it('#barbaz __2', () => {
      assert.equal([1, 2, 3][1], 2)
    })
  })
})