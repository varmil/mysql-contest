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
    return await db.query('SELECT emp_id, fname, lname FROM employee ORDER BY lname, fname, emp_id ASC')
  } catch (error) {
    throw error
  }
}

exports.c3p2 = async () => {
  try {
    return await db.query(`SELECT account_id, cust_id, avail_balance FROM account WHERE status = 'ACTIVE' AND avail_balance > 2500 ORDER BY account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c3p3 = async () => {
  try {
    return await db.query(`SELECT DISTINCT open_emp_id FROM account`)
  } catch (error) {
    throw error
  }
}

exports.c4p3 = async () => {
  try {
    return await db.query(`SELECT account_id, open_date FROM account WHERE open_date BETWEEN '2002-01-01' AND '2002-12-31' ORDER BY account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c4p4 = async () => {
  try {
    return await db.query(`SELECT cust_id, lname, fname FROM individual WHERE lname LIKE '_a%e%' ORDER BY cust_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c5p2 = async () => {
  try {
    return await db.query(`SELECT a.account_id, c.fed_id, p.name FROM account a INNER JOIN customer c ON a.cust_id = c.cust_id INNER JOIN product p ON a.product_cd = p.product_cd WHERE c.cust_type_cd = 'I' ORDER BY a.account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c5p3 = async () => {
  try {
    return await db.query(`SELECT e.emp_id, e.fname, e.lname FROM employee e INNER JOIN employee mgr ON e.superior_emp_id = mgr.emp_id WHERE e.dept_id != mgr.dept_id ORDER BY e.emp_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c6p3 = async () => {
  try {
    return await db.query(`SELECT fname, lname FROM individual UNION ALL SELECT fname, lname FROM employee ORDER BY lname, fname`)
  } catch (error) {
    throw error
  }
}

exports.c7p1 = async () => {
  try {
    return await db.query(`SELECT SUBSTRING('Please find the substring in this string',17,9) c7p1`)
  } catch (error) {
    throw error
  }
}

exports.c7p2 = async () => {
  try {
    return await db.query(`SELECT ABS(-25.76823) c7p2_a, SIGN(-25.76823) c7p2_b, ROUND(-25.76823, 2) c7p2_c`)
  } catch (error) {
    throw error
  }
}

exports.c8p1 = async () => {
  try {
    return await db.query(`SELECT COUNT(*) from account`)
  } catch (error) {
    throw error
  }
}

exports.c8p2 = async () => {
  try {
    return await db.query(`SELECT cust_id, COUNT(*) FROM account GROUP BY cust_id ORDER BY cust_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c8p3 = async () => {
  try {
    return await db.query(`SELECT cust_id, COUNT(*) FROM account GROUP BY cust_id HAVING COUNT(*) >= 2 ORDER BY cust_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c9p1 = async () => {
  try {
    return await db.query(`SELECT account_id, product_cd, cust_id, avail_balance FROM account WHERE product_cd IN (SELECT product_cd FROM product WHERE product_type_cd = 'LOAN') ORDER BY account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c9p2 = async () => {
  try {
    return await db.query(`SELECT a.account_id, a.product_cd, a.cust_id, a.avail_balance FROM account a WHERE EXISTS (SELECT 1 FROM product p WHERE p.product_cd = a.product_cd AND p.product_type_cd = 'LOAN') ORDER BY a.account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c9p3 = async () => {
  try {
    return await db.query(`SELECT e.emp_id, e.fname, e.lname, levels.name FROM employee e INNER JOIN (SELECT 'trainee' name, '2004-01-01' start_dt, '2005-12-31' end_dt UNION ALL SELECT 'worker' name, '2002-01-01' start_dt, '2003-12-31' end_dt UNION ALL SELECT 'mentor' name, '2000-01-01' start_dt, '2001-12-31' end_dt) levels ON e.start_date BETWEEN levels.start_dt AND levels.end_dt ORDER BY e.emp_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c9p4 = async () => {
  try {
    return await db.query(`SELECT e.emp_id, e.fname, e.lname, (SELECT d.name FROM department d WHERE d.dept_id = e.dept_id) dept_name, (SELECT b.name FROM branch b WHERE b.branch_id = e.assigned_branch_id) branch_name FROM employee e ORDER BY e.emp_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c10p1 = async () => {
  try {
    return await db.query(`SELECT p.product_cd, a.account_id, a.cust_id, a.avail_balance FROM product p LEFT OUTER JOIN account a ON p.product_cd = a.product_cd ORDER BY p.product_cd, a.account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c10p2 = async () => {
  try {
    return await db.query(`SELECT p.product_cd, a.account_id, a.cust_id, a.avail_balance FROM account a RIGHT OUTER JOIN product p ON p.product_cd = a.product_cd ORDER BY p.product_cd, a.account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c10p3 = async () => {
  try {
    return await db.query(`SELECT a.account_id, a.product_cd, i.fname, i.lname, b.name FROM account a LEFT OUTER JOIN business b ON a.cust_id = b.cust_id LEFT OUTER JOIN individual i ON a.cust_id = i.cust_id ORDER BY a.account_id ASC`)
  } catch (error) {
    throw error
  }
}

exports.c11p1 = async () => {
  try {
    return await db.query(`SELECT emp_id, case WHEN title LIKE '%President' OR title = 'Loan Manager' OR title = 'Treasurer' THEN 'Management' WHEN title LIKE '%Teller' OR title = 'Operations Manager' THEN 'Operations' ELSE 'Unknown' END title FROM employee ORDER BY emp_id`)
  } catch (error) {
    throw error
  }
}

exports.c11p2 = async () => {
  try {
    return await db.query(`SELECT SUM(CASE WHEN open_branch_id = 1 THEN 1 ELSE 0 END) branch_1, SUM(CASE WHEN open_branch_id = 2 THEN 1 ELSE 0 END) branch_2, SUM(CASE WHEN open_branch_id = 3 THEN 1 ELSE 0 END) branch_3, SUM(CASE WHEN open_branch_id = 4 THEN 1 ELSE 0 END) branch_4 FROM account`)
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
