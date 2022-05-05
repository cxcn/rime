> 原文: <https://github.com/osfans/trime/wiki/trimer小知识(1)---Yaml文件开头注释是什么意思？>  
> 更新时间：2017/12/24

编辑小狼毫的方案及配置项文件时，通常会看到这样文件开头：

```yaml
# wubi86_double_key.yaml
# vim: set sw=2 sts=2 et:
# encoding: utf-8

schema:
  schema_id: wubi86_double_key
  name: "五笔86双键版"
....
```

那么开头的注释有什么含义呢？

## 第一行详解

第一行比较简单，一般要放文件名，或者其他注释，不要放正式内容。为了防止加了 Bom 的 utf-8 文件无法解析。
具体原因见, [ Rime 输入方案设计书](RimeWithSchemata.md)

> 鑑於一些文本編輯器會爲 UTF-8 編碼的文件添加 BOM 標記，爲防止誤將該字符混入文中， 莫要從文件的第一行開始正文，而請在該行行首以 # 記號起一行註釋

因为默认的文件存储格式是 utf-8,而 utf-8 又分带 bom 和不带 bom 两种格式。
带 bom 会在开头添加几个字节，方便程序判断一个文本是否为 utf-8 编码。

如果你是程序员，要编写程序读写 utf-8,还可以看看这里的 bom 详解：　[UTF8 最好不要带 BOM，附许多经典评论](http://www.cnblogs.com/findumars/p/3620078.html)

## 第二行详解

**正式开始最重要的一行，就是第二行**

`# vim: set sw=2 sts=2 et: `

这是什么意思呢？

这一行有个学名叫 modeline，是 vim 专用的。
用 vim 打开这个文件时，会自动运行该命令，设置好阅读和编辑该文件的一些参数

[StackOverflow 上关于 modeline 的解释](http://stackoverflow.com/questions/7119824/what-is-vims-feature-name-for-this-vimsw-4ts-4et)

命令的具体含义，参看下面的解答



```
"vim中每个命令都是简写和全拼两种模式，后面列出命令的全拼，大家就知道什么意思了
set sw=2  "sw即shiftwidth,设置自动缩进 2 个空格
set sts=2 "即设置 softtabstop 为 2. 输入 tab 后就跳了 2 格
set et   "设置expandtab,即将tab扩展为空格,如果要取消这个选项，为　:set noet
" vim的开头命令，都是在前面加no表取消
```

命令之间是通过空格或者":"分隔的，最后那个":"起分隔作用，表示设置结束

所以，总结一下就是，编辑 yaml 文件的具体环境为：

- 自动缩进为 2
- tab 键缩进相当于 2 个空格
- 将 tab 键自动扩展为空格

当然，也可以把上面的命令写在\_vimrc 中，作为全局设置。
这样，打开编辑其他的，没有带 modeline 的文件时，也可以使用统一的设置。

## 更多的 vim 设置

vim 中还有一些其他的缩进相关的设置也列在这里

```
set tabstop=4 "实际的 tab 即为 4 个空格, 而不是缺省的 8 个

# 设置自动的缩进风格
set ai "设置自动缩进
set cindent "设置使用 C/C++ 语言的自动缩进方式
```

关于 Vim 的 tabstop,softtabstop 的区分，以及与 shiftwidth，expandtab 组合使用的具体含义。参见下面的帖子

[vim 中 tabstop、shiftwidth、softtabstop 以及 expandtab 的关系](http://blog.csdn.net/chenxiang6891/article/details/41348073)
