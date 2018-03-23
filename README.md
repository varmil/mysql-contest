# mysql-contest
Exercises with Node.js and MySQL

### Requirement
* node >= 8.9.1
* docker >= 17.09
* docker-compose >= 1.17.1

### Install
```sh
npm i
docker-compose up -d
```

### run tests
```sh
# basic
docker-compose run --rm mocha npm run test
```
* `--watch` is useful for development
* `--exit` is workaround (the issue of not exiting mocha)

### schema
|  テーブル名  | 定義                                      |
|:------------:|-------------------------------------------|
|    account   | 特定の顧客に開かれている口座              |
|    branch    | 銀行の支店                                |
|   business   | 法人顧客（customer テーブルのサブタイプ） |
|   customer   | 銀行の顧客である個人または法人            |
|  department  | 特定の銀行業務を実装する行員グループ      |
|   employee   | 銀行で働く行員                            |
|  individual  | 個人顧客（customer テーブルのサブタイプ） |
|    officer   | 法人顧客の業務取引を許可されている行員    |
|    product   | 顧客に提供される金融商品                  |
| product_type | 同様の機能を持つ商品のグループ            |
|  transaction | 口座残高に加えられる変更                  |
