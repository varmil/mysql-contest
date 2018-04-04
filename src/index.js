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
