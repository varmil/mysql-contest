/**
 * 回答記述
 * 注1）すべて１クエリで結果が返るようにしなさい。
 * 注2) ORDER BY指定がない場合、プライマリーキーで昇順に並べ替えなさい。
 *      ただし、2つ以上のテーブルを結合する場合はexplainを使用して、結合される順番にキーを指定しなさい。
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
    return await db.query('')
  } catch (error) {
    throw error
  }
}

exports.c3p2 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c3p3 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c4p3 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c4p4 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c5p2 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c5p3 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c6p3 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c7p1 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c7p2 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c8p1 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c8p2 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c8p3 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c9p1 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c9p2 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c9p3 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c9p4 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c10p1 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c10p2 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c10p3 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c11p1 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.c11p2 = async () => {
  try {
    return await db.query(``)
  } catch (error) {
    throw error
  }
}

exports.cexp1 = async () => {
  try {
    return await db.query(`SELECT emp_id, fname, lname FROM employee WHERE DATE_FORMAT(start_date, '%m') = '06' ORDER BY lname ASC`)
  } catch (error) {
    throw error
  }
}

exports.cexp2 = async () => {
  try {
    return await db.query(`SELECT DATE_FORMAT(open_date, '%Y') AS 'Year', AVG(avail_balance) AS 'avail_balance' FROM account GROUP BY DATE_FORMAT(open_date, '%Y') ORDER BY DATE_FORMAT(open_date, '%Y') ASC`)
  } catch (error) {
    throw error
  }
}

exports.cexp3 = async () => {
  try {
    return await db.query(`SELECT account_id, product_cd, cust_id, avail_balance FROM account WHERE avail_balance IN (SELECT MAX(avail_balance) FROM account)`)
  } catch (error) {
    throw error
  }
}

exports.cexp4 = async () => {
  try {
    return await db.query(`SELECT emp_id, fname, lname FROM employee WHERE emp_id IN (SELECT superior_emp_id FROM employee WHERE superior_emp_id IS NOT NULL) AND superior_emp_id IS NULL`)
  } catch (error) {
    throw error
  }
}

exports.cexp5 = async () => {
  try {
    return await db.query(`SELECT emp_id, fname, lname, CASE WHEN sup.num IS NULL THEN 0 ELSE sup.num END AS subordinate_num 
    FROM employee LEFT JOIN (SELECT superior_emp_id, COUNT(*) AS num FROM employee WHERE superior_emp_id IS NOT NULL GROUP BY superior_emp_id) AS sup ON emp_id = sup.superior_emp_id 
    ORDER BY subordinate_num DESC, emp_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.cexp6 = async () => {
  try {
    return await db.query(`SELECT account_id, product.name AS product_name, CONCAT(fname, ' ', lname) AS employee_name, avail_balance 
    FROM account INNER JOIN employee ON open_emp_id = emp_id INNER JOIN product ON account.product_cd = product.product_cd 
    ORDER BY avail_balance DESC LIMIT 3`)
  } catch (error) {
    throw error
  }
}

exports.cexp7 = async () => {
  try {
    return await db.query(`SELECT account.account_id, account.product_cd, product.name AS product_name, c.cust_type_cd, CASE c.cust_type_cd WHEN 'B' THEN c.name WHEN 'I' THEN CONCAT(c.fname, ' ', c.lname) ELSE 0 END AS cust_name, account.avail_balance, ROUND((avail_balance/sum_b)*100, 1) AS percent 
    FROM account INNER JOIN product ON account.product_cd = product.product_cd 
         INNER JOIN (SELECT c0.cust_id, c0.cust_type_cd, c0.name,individual.fname, individual.lname FROM (SELECT customer.cust_id, customer.cust_type_cd, business.name FROM customer LEFT JOIN business ON customer.cust_id = business.cust_id) AS c0 LEFT JOIN individual ON c0.cust_id = individual.cust_id) AS c ON account.cust_id = c.cust_id 
         INNER JOIN (SELECT product_cd, SUM(avail_balance) AS sum_b FROM account GROUP BY product_cd) AS s ON account.product_cd =  s.product_cd 
    ORDER BY account.product_cd, percent DESC, account.account_id ASC`)
  } catch (error) {
    throw error
  }
}
