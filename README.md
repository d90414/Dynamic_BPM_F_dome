一、开发人员测试

	解压后运行start.bat，打开浏览器输入http://localhost:8080/index.html即可

	端口号默认是“8080”，可以在“server.js”中修改，就在代码第一行

	如果有好几个测试项目，需要运行哪一个，可以打开“server.js”修改，就在代码第二行

二、测试人员发布

1、安装NodeJs和Npm：
	从官网https://nodejs.org/下载安装

2、验证上一步：
	控制台运行node -v和npm -v命令，若显示NodeJs和Npm版本号，可执行下一步，否则回到上一步

3、Npm安装Gulp：
	控制台运行npm install gulp -g命令

4、验证上一步：
	控制台运行gulp -v命令，若显示Gulp版本号，可执行下一步，否则回到上一步

5、Npm安装Spm：
	控制台运行npm install spm -g命令

6、验证上一步：
	控制台运行spm -v命令，若显示Spm版本号，可执行下一步，否则回到上一步

7、构建：
	运行批处理：kfps_web/build.bat

8、发布：
	得到全量包：publish/kfps_web