# angular-seed-spm

angular-seed用于构建angular项目的模板工程，适用于直接构建ng项目。

本项目是提供了spm支持(即支持commonJs规范)的angular-seed模板，算是示范了一下spm-seajs-angular综合使用，主要包含的部分是：

1.
apps/ spm根目录，用于添加依赖和使用build命令打包模块化的ng模块
/src ng程序的源码目录
/dist 打包后的js代码

过去使用seajs一般要用define.....封装，然后调用，麻烦的一笔。

在调试环境下：

html中引入seajs-wrap，然后用src/app作为入口，直接require其他文件，seajs-wrap会自动帮你封装一层define....，直接使用就好了。

在生产环境下：

html中去除seajs-wrap，然后使用dist下压缩好的js文件即可。（前提是你要spm build一下）

2.
public/
/css
/less 这里是使用gulp进行less文件的自动压缩和修改

压缩的css文件会默认放到css根目录，一般情况下，我们的网站的css文件基本就那么几个（不同的使用import 引入，然后统一打包之后基本就一个吧？）

3.
没有引入http-server的原因比较简单，我使用的是webstorm，直接在html那边点一下chrome图标，默认就已经有http-server功能了，完全没必要再装一个。


## Install (安装)：


### Global Environment
* install nodejs
* install spm （npm install spm -g）

### Install Modules
* cd apps && npm install
* cd ./ && npm install

## Useage (使用):

### apps
*    支持commonJS规范的js应用
*    工作目录为./apps/
*    命令：spm build

### public/css/less
*    支持less自动生成与处理
*    工作目录为./public/css/less/
*    命令：gulp less

### public/css/scss
*    支持scss自动生成与处理
*    工作目录为./public/css/scss/
*    命令：gulp sass

## explain (说明):

### Explain:

* public
    * public           为共有文件目录
    * public/css      样式表文件目录
    * public/images   图像资源目录
    * public/vendors  其他库的资源文件（例如jquery等）
* apps
    * apps            应用目录
    * apps/src        源码目录（未打包）
    * apps/dist       打包后的代码目录
    * apps/spm_module 库文件

## License

The MIT License (MIT)

Copyright (c) 2014 [@Thonatos.Yang](http://github.com/thonatos)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.