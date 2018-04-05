# with --silent because npm emit ERR when any tests are failed
docker-compose run --rm mocha npm run --silent tap
# send result
./send-result.sh output.log
