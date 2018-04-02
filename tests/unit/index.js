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

describe(`EXAMPLE - 初期状態でこのテストは通ります`, () => {
  it(`#e1() すべてのテーブルを取得する。 __1`, async () => {
    const actual = await target.e1()
    assertDeepEqual(actual, answer.e1)
  })
})

describe(`Chapter 3`, () => {
  it(`#c3p1() すべての行員の行員IDと姓名を取得し、姓、名の優先順位で並べ替える。 __2`, async () => {
    const actual = await target.c3p1()
    assertDeepEqual(actual, answer.c3p1)
  })

  it(`#c3p2() ステータスがACTIVEであり、残高が2,500ドルを超えるすべての口座について、口座ID、顧客ID、残高を取得する。 __3`, async () => {
    const actual = await target.c3p2()
    assertDeepEqual(actual, answer.c3p2)
  })

  it(`#c3p3() accountテーブルから口座を開いた行員のIDを取得するためのクエリを作成する。行員ごとに1行のデータが得られるようにする(account.open_emp_id列を使用する)。 __4`, async () => {
    const actual = await target.c3p3()
    assertDeepEqual(actual, answer.c3p3)
  })
})

describe(`Chapter 4`, () => {
  it(`#c4p3() 2002年に開かれた口座をすべて検索するためのクエリを作成する。 __5`, async () => {
    const actual = await target.c4p3()
    assertDeepEqual(actual, answer.c4p3)
  })

  it(`#c4p4() 法人顧客ではなく、姓の2文字目に"a"が含まれ、"a"の後ろのどこかに"e"が含まれている顧客をすべて検索するためのクエリを作成する。 __6`, async () => {
    const actual = await target.c4p4()
    assertDeepEqual(actual, answer.c4p4)
  })
})

describe(`Chapter 5`, () => {
  it("#c5p2() 法人顧客ではない顧客(customer.cust_type_cd = 'I')の口座ID、FederalID(customer.fed_id), その口座の商品名(product.name)を取得するためのクエリを作成する  __7", async () => {
    const actual = await target.c5p2()
    assertDeepEqual(actual, answer.c5p2)
  })

  it(`#c5p3() 上司が別の部署に所属している行員をすべて検索し、行員のIDと姓名を取得するためのクエリを作成する。 __8`, async () => {
    const actual = await target.c5p3()
    assertDeepEqual(actual, answer.c5p3)
  })
})

describe(`Chapter 6`, () => {
  it(`#c6p3() 個人顧客全員の姓名と行員全員の生命を検索する複合クエリを作成する。ただし、lname列、fname列の順で並べ替える。  __9`, async () => {
    const actual = await target.c6p3()
    assertDeepEqual(actual, answer.c6p3)
  })
})

describe(`Chapter 7`, () => {
  it(`#c7p1() 文字列"Please find the substring in this string"の17文字目から25文字目までの文字列（カラム名は"c7p1"とする）を返すクエリを作成する。  __10`, async () => {
    const actual = await target.c7p1()
    assertDeepEqual(actual, answer.c7p1)
  })

  it(`#c7p2() −25.76823の絶対値と符号(-1, 0, または1)を返すクエリを作成する。また、小数点以下2桁で丸めた値を返す。それぞれのカラム名は下記に従う。  __11`, async () => {
    /* 絶対値を返す ... カラム名("c7p2_a")
     * 符号を返す ... カラム名("c7p2_b")
     * 小数点以下2桁で丸める ... カラム名("c7p2_c")
     */
    const actual = await target.c7p2()
    assertDeepEqual(actual, answer.c7p2)
  })
})

describe(`Chapter 8`, () => {
  it(`#c8p1() accountテーブルの行の数をカウントするクエリを作成する。  __12`, async () => {
    const actual = await target.c8p1()
    assertDeepEqual(actual, answer.c8p1)
  })

  it(`#c8p2() 上記問題(8-1)のクエリを、下記???の部分を埋めて各顧客が開いている口座の数をカウントするものに書き換える。顧客ごとに、顧客IDと口座の数を表示する。ただし顧客IDを昇順で並べ替えておくこと。  __13`, async () => {
    /* SELECT cust_id, COUNT(*)
     * FROM account
     * ???
     */
    const actual = await target.c8p2()
    assertDeepEqual(actual, answer.c8p2)
  })

  it(`#c8p3() 上記問題(8-2)のクエリを、下記???の部分を埋めて口座を２つ以上開いている顧客だけを表示するように書き換える。ただし顧客IDを昇順で並べ替えておくこと。  __14`, async () => {
    /* SELECT cust_id, COUNT(*)
     * FROM account
     * ???
     */
    const actual = await target.c8p3()
    assertDeepEqual(actual, answer.c8p3)
  })
})

describe(`Chapter 9`, () => {
  it(`#c9p1() accountテーブルから口座ID、商品コード、顧客ID、口座の残高を取得するためのクエリを作成する。ただし、下記の要件に従うこと。  __15`, async () => {
    /* このクエリでは、フィルタ条件と、productテーブルから全てのローン口座(product.product_type_cd = 'LOAN')を
     * 検索するための非相関サブクエリを使用する。
     */
    const actual = await target.c9p1()
    assertDeepEqual(actual, answer.c9p1)
  })

  it(`#c9p2() 上記問題(9-1)のクエリを、下記???の部分を埋めてproductテーブルへの相関サブクエリを使って同じ結果を得るものに書き換える。  __16`, async () => {
    /* SELECT a.account_id, a.product_cd, a.cust_id, a.avail_balance
     * FROM account a
     * WHERE EXISTS ( ??? )
     */
    const actual = await target.c9p2()
    assertDeepEqual(actual, answer.c9p2)
  })

  it(`#c9p3() 各行員の経験度を表示するために、以下のクエリをemployeeテーブルに結合する。  __17`, async () => {
    /* SELECT 'trainee' name, '2004-01-01' start_dt, '2005-12-31' end_dt 
     * UNION ALL
     * SELECT 'worker' name, '2002-01-01' start_dt, '2003-12-31' end_dt
     * UNION ALL
     * SELECT 'mentor' name, '2000-01-01' start_dt, '2001-12-31' end_dt
     * 
     * サブクエリは"levels"というエイリアスを持ち、行員ID、姓名、経験度(levels.name)が含まれているものとする。
     * ヒント:employee.start_date列がどの経験度に属するかを判断する不等価条件に基づいて、結合条件を作成する。
     */
    const actual = await target.c9p3()
    assertDeepEqual(actual, answer.c9p3)
  })

  it(`#c9p4() employeeテーブルから行員IDと姓名を取得し、行員が配属されている部署と支店の名前を取得するためのクエリを作成する。ただし、テーブルを結合してはならない。  __18`, async () => {
    const actual = await target.c9p4()
    assertDeepEqual(actual, answer.c9p4)
  })
})

describe(`Chapter 10`, () => {
  it(`#c10p1() すべての商品名とその商品に基づく口座を全て習得するためのクエリを作成する。ただし下記の要件に従うこと。  __19`, async () => {
    /* accountテーブルのproduct_cd列に基づいてproductテーブルをリンクする。
     * その商品の口座が開かれていない場合であっても、すべての商品が含まれるようにする。
     */
    const actual = await target.c10p1()
    assertDeepEqual(actual, answer.c10p1)
  })

  it(`#c10p2() 上記問題(10-1)のクエリを、下記???の部分を埋めて他の外部結合を使用して、同じ結果が得られるように書き換える。(例えば10-1でleft outer joinを使用した場合は、right outer joinを使用する)  __20`, async () => {
    /* SELECT p.product_cd, a.account_id, a.cust_id, a.avail_balance
     * ???
     * ON p.product_cd = a.product_cd;
     */
    const actual = await target.c10p2()
    assertDeepEqual(actual, answer.c10p2)
  })

  it(`#c10p3() accountテーブルを(account.cust_id列に基づいて)individualテーブルとbusinessテーブルに外部結合せよ。ただし下記の要件に従うこと。  __21`, async () => {
    /* 結果セットが口座ごとに1行のデータで構成されるようにする。
     * 結果セットに含まれる列は、account.account_id, account.product_cd, individual.fname, individual.lname, business.nameとする。
     */
    const actual = await target.c10p3()
    assertDeepEqual(actual, answer.c10p3)
  })
})

describe(`Chapter 11`, () => {
  it(`#c11p1() 単純case式を使用している以下のクエリを書き換えて、検索case式を使用して同じ結果が得られるようにする。when節の数は２つにすること。  __22`, async () => {
    /* SELECT emp_id,
     *   CASE title
     *     WHEN 'President' THEN 'Management'
     *     WHEN 'Vice President' THEN 'Management'
     *     WHEN 'Treasurer' THEN 'Management'
     *     WHEN 'Loan Manager' THEN 'Management'
     *     WHEN 'Operations Manager' THEN 'Operations'
     *     WHEN 'Head Teller' THEN 'Operations'
     *     WHEN 'Teller' THEN 'Operations'
     *     ELSE 'Unknown'
     *   END title
     * FROM employee;
     */
    const actual = await target.c11p1()
    assertDeepEqual(actual, answer.c11p1)
  })

  it(`#c11p2() 以下のクエリを書き換えて結果セットに4つの列(支店ごとに１つ)からなる行が１つだけ含まれるようにする。この4つの列には、branch_1 〜 branch_4という名前をつける。  __23`, async () => {
    /* SELECT open_branch_id, COUNT(*)
     * FROM account
     * GROUP BY open_branch_id;
     */
    const actual = await target.c11p2()
    assertDeepEqual(actual, answer.c11p2)
  })

})

