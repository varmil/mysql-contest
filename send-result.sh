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

    # サーバーへのPUT (curl -f で失敗時に検出できるように)
    url="http://yonno.cygames.jp:8081/users/$USERNAME/contest/mysql"
    curl -X PUT -d "result=$result" -f $url
    if [ $? = 0 ]; then
        echo "[send ok] $url"
    else
        echo "[send failed] status:$?, url:$url"
    fi
else
    echo "${result_file} does not exists. Please run the tests first"
fi
