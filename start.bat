@echo off
echo Starting MongoDB...
start /B "MongoDB" "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"

echo Waiting for MongoDB to start...
timeout /t 5

echo Starting the server...
cd %~dp0
node server.js 