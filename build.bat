@echo off&setlocal enabledelayedexpansion
:begin
set "c=*"&set "l=*"
set "w=*"&set "x=*"&set "y=*"&set "z=*"
set /a _length=74-1
set /a _width=5-1
for /l %%k in (1 1 !_length!) do set "str=!str!  "
set "var= "
for /l %%i in (1 1 74) do set "var=!var!%l%"
set var1=!w!!var:~1,-1!!x!
echo !var1!
set "t=                        kingdom web contact and minify                   "
echo !c!!t!!c!
set "t=                        **********合并压缩js**********                   "
echo !c!!t!!c!
set "t=                        **********合并压缩css*********                   "
echo !c!!t!!c!
set "t=                        **********合并压缩filters*****                   "
echo !c!!t!!c!
set "t=                        **********合并压缩services****                   "
echo !c!!t!!c!
set "t=                        **********合并压缩directives**                   "
echo !c!!t!!c!
set var2=!y!!var:~1,-1!!z!
echo !var2!

@echo off
set exec_path=%0
set exec_path=%exec_path:~0,-10%"
set exec_driver=%exec_path:~1,2%
%exec_driver%
cd %exec_path%
cd WebContent\apps\
set "t=."
echo !t!
set "t=."
echo !t!
set "t=."
echo !t!
set "t=******************开始合并压缩filters&services&directives******************"
echo !t!

echo on
call spm build 
@echo off

set "t=******************合并压缩filters&services&directives完成******************"
echo !t!

@echo off
set exec_path=%0
set exec_path=%exec_path:~0,-10%"
set exec_driver=%exec_path:~1,2%
%exec_driver%
cd %exec_path%
cd WebContent\
set "t=."
echo !t!
set "t=."
echo !t!
set "t=."
echo !t!
set "t=*******************************开始合并压缩js&css**************************"
echo !t!

echo on
call gulp
@echo off

set "t=*******************************合并压缩js&css完成**************************"
echo !t!

set exec_path=%0
set exec_path=%exec_path:~0,-10%"
set exec_driver=%exec_path:~1,2%
%exec_driver%
cd %exec_path%
set "t=."
echo !t!
set "t=."
echo !t!
set "t=."
echo !t!
set "t=*****************************开始发布工程**********************************"
echo !t!

echo on
node publish.js
@echo off
set "t=*****************************发布工程完成**********************************"
echo !t!

@echo off
set exec_path=%0
set exec_path=%exec_path:~0,-10%"
set exec_driver=%exec_path:~1,2%
%exec_driver%
cd %exec_path%
cd WebContent\
set "t=."
echo !t!
set "t=."
echo !t!
set "t=."
echo !t!
set "t=*********************开始压缩routers&controllers&images********************"
echo !t!

echo on
call gulp app
@echo off

set "t=*********************压缩routers&controllers&images完成********************"
echo !t!
set "t=."
echo !t!
set "t=."
echo !t!
set "t=."
echo !t!

start .\..\..\publish\kfps_web

@echo off&setlocal enabledelayedexpansion
set "str= "
for /l %%k in (1 1 !_length!) do set "str=!str!  "
set "var= "
for /l %%i in (1 1 74) do set "var=!var!%l%"
set var1=!w!!var:~1,-1!!x!
echo !var1!
set "t=****************************构建发布工程完成*****************************"
echo !c!!t!!c!
set var2=!y!!var:~1,-1!!z!
echo !var2!

pause