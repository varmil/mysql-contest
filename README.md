# mysql-contest
Exercises with Node.js and MySQL

### Install
```sh
docker-compose up -d
```

### run tests
```sh
# basic
docker-compose run --rm mocha npm run test

# raw command
# use --exit option for workaround of not exit mocha issue
docker-compose run --rm mocha mocha /mocha/tests/unit/index.js -R tap --exit
```
