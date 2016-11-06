#!/bin/sh

# THIS SCRIPT IS AIMED TO BE RUN BY THE CI SERVICE

lcovfile="./build/coverage/report-lcov/lcov.info"

echo $lcovfile

set -e

if [ -z "$CODECLIMATE_REPO_TOKEN" ];
then
    echo -e "\033[31mCODECLIMATE_REPO_TOKEN not set for test coverage"
    echo -e "Please set the token CODECLIMATE_REPO_TOKEN and run again\033[0m"
    exit 1;
fi

IS_CI_RUN=1 npm test

if [ -f "$lcovfile"  ];
then
    echo -e "\033[32mSENDING CODE COVERAGE TO CODECLIMATE\033[0m"
    codeclimate-test-reporter < $lcovfile
else
    echo -e "\033[31mCANT FIND THE CODE COVERAGE REPORT AT $lcovfile"
    echo -e "ABORTING...\033[0m"
    exit 1;
fi