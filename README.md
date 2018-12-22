基于san和san作者的JSEC启发，所以有了这

本项目原是想简单对JSEC做一下模块化就行，但是阅读后发现JSEC也有挺多判断不合理的地方，做了一些BUG的修复

比如case
```js
if (a) else if (b) {} else {c = 1}
```
在jesc下面会报错

文法方面参考 
[mozilla](https://www-archive.mozilla.org/js/language/grammar14.html)和
[tc39](https://tc39.github.io/ecma262/#sec-ecmascript-language-expressions)， 所以个别地方实现和JESC略有不同

分文件后，不用全局变量控制，引用san的work思想

正则和除号比较难区分，jesc这块判断的略微粗糙，于是参考的esprima的实现方式

但是esprima的实现目前也是有问题的
比如case
```js
if ((a) /bb/
```
无法将 /bb/ 为正则识别处理，这里已经修复了这个问题，有空再给esprima提个pr吧

### TODO
- 打包
- 单测
- 等等




