#!/bin/sh

# スクリプトの絶対パス
script_dir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)

# テストの結果ファイルのパス
result_file="${script_dir}/$1"

# 設定ファイルの読み込み
source "${script_dir}/conf.txt"

# 結果ファイルの送信
if [ -e $result_file ]; then
    # 結果の読み込み
    result=$(<${result_file})

    # for debug
    # url="http://localhost:5000"
    url="http://yonno.cygames.jp:8081/users/$USERNAME/contest/mysql"

    # サーバーへのPUT (curl -f で失敗時に検出できるように)
    curl -X PUT --data-binary "@${result_file}" -f $url
    if [ $? = 0 ]; then
        echo "[send ok] $url"
    else
        echo "[send failed] status:$?, url:$url"
        exit 1
    fi
else
    echo "${result_file} does not exists. Please run the tests first"
    exit 1
fi
