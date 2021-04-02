# 删除所有不在白名单中的 url

由于安全扫描，总是检测出代码中带有 url，风险极高。虽然只是一些日志链接，但是安扫系统就是不给过。

所以用这个插件，清楚包中指定的 url。

遍历相关目录和资源文件，依据资料类型（如字符串、颜色、数组、菜单、图片、视频等）、标识、内容等属性，分析出URL信息。

## 用法

```
$ yarn add umi-plugin-remove-all-url
```
配置中的关键字会被保留，如配置 'w3.org' 表示所有带 'w3.org' 都会被保留，包括
```
  'http://www.w3.org/1999/xlink',
  'http://www.w3.org/XML/1998/namespace',
  'http://www.w3.org/1999/xlink',
  'http://www.w3.org/1999/xhtml',
  'http://www.w3.org/1998/Math/MathML',
  'http://www.w3.org/2000/svg',
  'http://www.w3.org/2000/svg',
  'http://www.w3.org/1998/Math/MathML',
  'http://www.w3.org/1999/xhtml',
  'http://www.w3.org/1999/xhtml',
  'http://www.w3.org/2000/svg',
  'http://www.w3.org/1999/xhtml'
```

> 注意，默认保留 'w3.org'
```
export default {
  removeUrlWhitelist: ['keywords'],
};
```

> 以下配置不推荐使用

还有一些奇怪的字符串会被识别成不安全。你可以通过配置 removeSomeThing 来移除他们
比如说 elliptic@6.5.4 是一个邮箱的，这种奇怪的结论。
```
export default {
  removeSomeThing: ['elliptic@6.5.4'],
};
```