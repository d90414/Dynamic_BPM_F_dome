rem file name start.bat
@echo off
set exec_path=%0
set exec_path=%exec_path:~0,-10%"
set exec_driver=%exec_path:~1,2%
%exec_driver%
cd %exec_path%
@echo on
node server.js
pause