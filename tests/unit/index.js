const mysql = require('mysql')
const cp = require('child_process')
const assert = require('assert').strict
const target = require('../../src/index')
const answer = require('./answer')
const env = process.env

// mysql connection string
const DSN = `mysql -h${env.MYSQL_HOSTNAME} -uroot -p${env.MYSQL_ROOT_PASSWORD}`

// compare 2 objects
const assertDeepEqual = (actual, expected) => {
  // RowDataPacket to Pure Object (hacky solution)
  const purifyRowDataPackets = (data) => JSON.parse(JSON.stringify(actual))
  assert.deepEqual(purifyRowDataPackets(actual), expected)
}

// root-level hook (async)
beforeEach((done) => {
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

describe('EXAMPLE - 初期状態でこのテストは通ります', () => {
  it('#e1() すべてのテーブルを取得する。 __1', async () => {
    const actual = await target.e1()
    assertDeepEqual(actual, answer.e1)
  })
})

describe('Chapter 3', () => {
  it('#c3p1() すべての行員の行員IDと姓名を取得し、性、名の優先順位で並べ替える。 __2', async () => {
    const actual = await target.c3p1()
    assertDeepEqual(actual, answer.c3p1)
  })

  it('#c3p2() ステータスがACTIVEであり、残高が2,500ドルを超えるすべての口座について、口座ID、顧客ID、残高を取得する。 __3', async () => {
    const actual = await target.c3p2()
    assertDeepEqual(actual, answer.c3p2)
  })
})