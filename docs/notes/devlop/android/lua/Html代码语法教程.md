---
title: Html代码语法教程
createTime: 2024/05/28 18:02:12
permalink: /article/yt1qh8p6/
---
Html
```lua
超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。

你可以使用 HTML 来建立自己的 WEB 站点，HTML 运行在浏览器上，由浏览器来解析。
```

HTML 编辑器
```lua
VS Code
Sublime Text
Adobe Dreamweaver
Microsoft Expression Web
CoffeeCup HTML Editor
```

HTML 元素
```lua
<p> 元素:

<p>这是第一个段落。</p>
这个 <p> 元素定义了 HTML 文档中的一个段落。
这个元素拥有一个开始标签 <p> 以及一个结束标签 </p>.
元素内容是: 这是第一个段落。



<body> 元素:

<body>
<p>这是第一个段落。</p>
</body>
<body> 元素定义了 HTML 文档的主体。
这个元素拥有一个开始标签 <body> 以及一个结束标签 </body>。
元素内容是另一个 HTML 元素（p 元素）。



<html> 元素：

<html>

<body>
<p>这是第一个段落。</p>
</body>

</html>
<html> 元素定义了整个 HTML 文档。
这个元素拥有一个开始标签 <html> ，以及一个结束标签 </html>.
元素内容是另一个 HTML 元素（body 元素）。



HTML 空元素

没有内容的 HTML 元素被称为空元素。空元素是在开始标签中关闭的。
<br> 就是没有关闭标签的空元素（<br> 标签定义换行）。
在 XHTML、XML 以及未来版本的 HTML 中，所有元素都必须被关闭。
在开始标签中添加斜杠，比如 <br />，是关闭空元素的正确方法，HTML、XHTML 和 XML 都接受这种方式。
即使 <br> 在所有浏览器中都是有效的，但使用 <br /> 其实是更长远的保障。



<a href="default.htm">	这是一个链接	</a>
```

HTML 属性
```lua
属性是 HTML 元素提供的附加信息。

HTML 属性
HTML 元素可以设置属性
属性可以在元素中添加附加信息
属性一般描述于开始标签
属性总是以名称/值对的形式出现，比如：name="value"。
属性实例
HTML 链接由 <a> 标签定义。链接的地址在 href 属性中指定：

实例
<a href="http://www.lingchenw.com">这是一个链接</a>


HTML 属性常用引用属性值
属性值应该始终被包括在引号内。

双引号是最常用的，不过使用单引号也没有问题。

Remark提示: 在某些个别的情况下，比如属性值本身就含有双引号，
那么您必须使用单引号，例如：name='John "ShotGun" Nelson'



HTML 属性参考手册
查看完整的HTML属性列表: HTML 标签参考手册。

下面列出了适用于大多数 HTML 元素的属性：

属性	描述
class	为html元素定义一个或多个类名（classname）(类名从样式文件引入)
id	定义元素的唯一id
style	规定元素的行内样式（inline style）
title	描述了元素的额外信息 (作为工具条使用)
```

HTML 标题
```lua
在 HTML 文档中，标题很重要。

HTML 标题
标题（Heading）是通过 <h1> - <h6> 标签进行定义的。

<h1> 定义最大的标题。 <h6> 定义最小的标题。

实例
<h1>这是一个标题。</h1>
<h2>这是一个标题。</h2>
<h3>这是一个标题。</h3>

注释: 浏览器会自动地在标题的前后添加空行。

标题很重要
请确保将 HTML 标题 标签只用于标题。不要仅仅是为了生成粗体或大号的文本而使用标题。

搜索引擎使用标题为您的网页的结构和内容编制索引。

因为用户可以通过标题来快速浏览您的网页，所以用标题来呈现文档结构是很重要的。

应该将 h1 用作主标题（最重要的），其后是 h2（次重要的），再其次是 h3，以此类推。
```

HTML 水平线
```lua
<hr> 标签在 HTML 页面中创建水平线。

hr 元素可用于分隔内容。

实例
<p>这是一个段落。</p>
<hr>
<p>这是一个段落。</p>
<hr>
<p>这是一个段落。</p>
```

HTML 注释
```lua
可以将注释插入 HTML 代码中，这样可以提高其可读性，使代码更易被人理解。浏览器会忽略注释，也不会显示它们。

注释写法如下:

实例
<!-- 这是一个注释 -->

注释: 开始括号之后（左边的括号）需要紧跟一个叹号，结束括号之前（右边的括号）不需要，
合理地使用注释可以对未来的代码编辑工作产生帮助。
```

HTML 段落
```lua
HTML 可以将文档分割为若干段落。

HTML 段落
段落是通过 <p> 标签定义的。

实例
<p>这是一个段落 </p>
<p>这是另一个段落</p>


注意：浏览器会自动地在段落的前后添加空行。（</p> 是块级元素）

不要忘记结束标签
即使忘了使用结束标签，大多数浏览器也会正确地将 HTML 显示出来：

实例
<p>这是一个段落
<p>这是另一个段落


上面的例子在大多数浏览器中都没问题，但不要依赖这种做法。忘记使用结束标签会产生意想不到的结果和错误。

注释: 在未来的 HTML 版本中，不允许省略结束标签。
```

HTML 折行
```lua
如果您希望在不产生一个新段落的情况下进行换行（新行），请使用 <br> 标签：

实例
<p>这个<br>段落<br>演示了分行的效果</p>


<br /> 元素是一个空的 HTML 元素。由于关闭标签没有任何意义，因此它没有结束标签。
```

HTML 文本格式化标签
```lua
<b>	定义粗体文本

<em>	定义着重文字

<i>	定义斜体字

<small>	定义小号字

<strong>	定义加重语气

<sub>	定义下标字

<sup>	定义上标字

<ins>	定义插入字

<del>	定义删除字
```

HTML "计算机输出" 标签
```lua
<code>	定义计算机代码

<kbd>	定义键盘码

<samp>	定义计算机代码样本

<var>	定义变量

<pre>	定义预格式文本
```

HTML 引文, 引用, 及标签定义
```lua
<abbr>	定义缩写

<address>	定义地址

<bdo>	定义文字方向

<blockquote>	定义长的引用

<q>	定义短的引用语

<cite>	定义引用、引证

<dfn>	定义一个定义项目。
```

HTML 超链接（链接）
```lua
HTML使用标签 <a>来设置超文本链接。

超链接可以是一个字，一个词，或者一组词，也可以是一幅图像，
您可以点击这些内容来跳转到新的文档或者当前文档中的某个部分。

当您把鼠标指针移动到网页中的某个链接上时，箭头会变为一只小手。

在标签<a> 中使用了href属性来描述链接的地址。

默认情况下，链接将以以下形式出现在浏览器中：

一个未访问过的链接显示为蓝色字体并带有下划线。
访问过的链接显示为紫色并带有下划线。
点击链接时，链接显示为红色并带有下划线。
注意：如果为这些超链接设置了 CSS 样式，展示样式会根据 CSS 的设定而显示。
```

HTML 链接语法
```lua
链接的 HTML 代码很简单。它类似这样：

<a href="url">链接文本</a>
href 属性描述了链接的目标。.

实例
<a href="https://www.lingchenw.com/">访问凌晨官网</a>

上面这行代码显示为：访问凌晨网络科技团队官网

点击这个超链接会把用户带到官网的首页。

提示: "链接文本" 不必一定是文本。图片或其他 HTML 元素都可以成为链接。
```

HTML 链接 - target 属性
```lua
使用 target 属性，你可以定义被链接的文档在何处显示。

下面的这行会在新窗口打开文档：

实例
<a href="https://www.lingchenw.com/" target="_blank" rel="noopener noreferrer">访问凌晨官网!</a>
```

HTML 链接- id 属性
```lua
id属性可用于创建在一个HTML文档书签标记。

提示: 书签是不以任何特殊的方式显示，在HTML文档中是不显示的，所以对于读者来说是隐藏的。

实例
在HTML文档中插入ID:

<a id="tips">有用的提示部分</a>
在HTML文档中创建一个链接到"有用的提示部分(id="tips"）"：

<a href="#tips">访问有用的提示部分</a>
或者，从另一个页面创建一个链接到"有用的提示部分(id="tips"）"：

<a href="https://www.lingchenw.com/xueyuan.html#tips">
访问有用的提示部分</a>
```

HTML 头部
```lua
<title> - 定义了HTML文档的标题
使用 <title> 标签定义HTML文档的标题

<base> - 定义了所有链接的URL
使用 <base> 定义页面中所有链接默认的链接目标地址。

<meta> - 提供了HTML文档的meta标记
使用 <meta> 元素来描述HTML文档的描述，关键词，作者，字符集等。

HTML <head> 元素
<head> 元素包含了所有的头部标签元素。
在 <head>元素中你可以插入脚本（scripts）, 样式文件（CSS），及各种meta信息。

可以添加在头部区域的元素标签为: <title>, <style>, <meta>, <link>, <script>, <noscript> 和 <base>。




HTML <title> 元素
<title> 标签定义了不同文档的标题。

<title> 在 HTML/XHTML 文档中是必须的。

<title> 元素:

定义了浏览器工具栏的标题
当网页添加到收藏夹时，显示在收藏夹中的标题
显示在搜索引擎结果页面的标题
一个简单的 HTML 文档:

实例
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>文档标题</title>
</head>
 
<body>
文档内容......
</body>
 
</html>




HTML <base> 元素
<base> 标签描述了基本的链接地址/链接目标，该标签作为HTML文档中所有的链接标签的默认链接:

<head>
<base href="http://www.lingchenw.com/images/" target="_blank">
</head>



HTML <link> 元素
<link> 标签定义了文档与外部资源之间的关系。

<link> 标签通常用于链接到样式表:

<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>



HTML <style> 元素
<style> 标签定义了HTML文档的样式文件引用地址.

在<style> 元素中你也可以直接添加样式来渲染 HTML 文档:

<head>
<style type="text/css">
body {background-color:yellow}
p {color:blue}
</style>
</head>



HTML <meta> 元素

meta标签描述了一些基本的元数据。

<meta> 标签提供了元数据.元数据也不显示在页面上，但会被浏览器解析。

META 元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者，和其他元数据。

元数据可以使用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他Web服务。

<meta> 一般放置于 <head> 区域

<meta> 标签- 使用实例
为搜索引擎定义关键词:

<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">
为网页定义描述内容:

<meta name="description" content="免费 Web & 编程 教程">
定义网页作者:

<meta name="author" content="Runoob">
每30秒钟刷新当前页面:

<meta http-equiv="refresh" content="30">



HTML <script> 元素

<script>标签用于加载脚本文件，如： JavaScript。

<script> 元素在以后的章节中会详细描述。




HTML head 元素
标签	描述
<head>	定义了文档的信息
<title>	定义了文档的标题
<base>	定义了页面链接标签的默认链接地址
<link>	定义了一个文档和外部资源之间的关系
<meta>	定义了HTML文档中的元数据
<script>	定义了客户端的脚本文件
<style>	定义了HTML文档的样式文件
```

HTML 样式- CSS
```lua
CSS (Cascading Style Sheets) 用于渲染HTML元素标签的样式。

实例

HTML使用样式
本例演示如何使用添加到 <head> 部分的样式信息对 HTML 进行格式化。

本例演示如何使用样式属性做一个没有下划线的链接。
如何使用 style 属性制作一个没有下划线的链接。

链接到一个外部样式表
本例演示如何 标签链接到一个外部样式表。

如何使用CSS
CSS 是在 HTML 4 开始使用的,是为了更好的渲染HTML元素而引入的.

CSS 可以通过以下方式添加到HTML中:

内联样式- 在HTML元素中使用"style" 属性
内部样式表 -在HTML文档头部 <head> 区域使用<style> 元素 来包含CSS
外部引用 - 使用外部 CSS 文件
最好的方式是通过外部引用CSS文件.

内联样式
当特殊的样式需要应用到个别元素时，就可以使用内联样式。 
使用内联样式的方法是在相关的标签中使用样式属性。样式属性可以包含任何 CSS 属性。
以下实例显示出如何改变段落的颜色和左外边距。

<p style="color:blue;margin-left:20px;">这是一个段落。</p>
```

HTML样式 - 背景颜色
```lua
背景色属性（background-color）定义一个元素的背景颜色：

实例
<body style="background-color:yellow;">
<h2 style="background-color:red;">这是一个标题</h2>
<p style="background-color:green;">这是一个段落。</p>
</body>

早期背景色属性（background-color）是使用 bgcolor 属性定义。
```

HTML样式 - 字体,字体颜色字体大小
```lua
我们可以使用font-family（字体），color（颜色），和font-size（字体大小）属性来定义字体的样式:

实例
<h1 style="font-family:verdana;">一个标题</h1>
<p style="font-family:arial;color:red;font-size:20px;">一个段落。</p>


现在通常使用font-family（字体），color（颜色），
和font-size（字体大小）属性来定义文本样式，而不是使用<font>标签。
```

HTML样式-文本对齐方式
```lua
使用 text-align（文字对齐）属性指定文本的水平与垂直对齐方式：

实例
<h1 style="text-align:center;">居中对齐的标题</h1>
<p>这是一个段落。</p>


文本对齐属性 text-align取代了旧标签 <center> 。
```

内部样式表
```lua
当单个文件需要特别样式时，就可以使用内部样式表。你可以在<head> 部分通过 <style>标签定义内部样式表:

<head>
<style type="text/css">
body {background-color:yellow;}
p {color:blue;}
</style>
</head>
```

外部样式表
```lua
当样式需要被应用到很多页面的时候，外部样式表将是理想的选择。
使用外部样式表，你就可以通过更改一个文件来改变整个站点的外观。

<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

HTML图像-图像标签<img>和源属性Src
```lua
在 HTML 中，图像由<img> 标签定义。

<img> 是空标签，意思是说，它只包含属性，并且没有闭合标签。

要在页面上显示图像，你需要使用源属性（src）。src 指 "source"。源属性的值是图像的 URL 地址。

定义图像的语法是：

<img src="url" alt="some_text">
URL 指存储图像的位置。如果名为 "pulpit.jpg" 的图像位于 www.lingchenw.com 的 images 目录中，
那么其 URL 为 http://www.lingchenw.com/images/pulpit.jpg。

浏览器将图像显示在文档中图像标签出现的地方。如果你将图像标签置于两个段落之间，
那么浏览器会首先显示第一个段落，然后显示图片，最后显示第二段。
```

HTML 图像- Alt属性
```lua
alt 属性用来为图像定义一串预备的可替换的文本。

替换文本属性的值是用户定义的。

<img src="boat.gif" alt="Big Boat">

在浏览器无法载入图像时，替换文本属性告诉读者她们失去的信息。
此时，浏览器将显示这个替代性的文本而不是图像。
为页面上的图像都加上替换文本属性是个好习惯，这样有助于更好的显示信息，
并且对于那些使用纯文本浏览器的人来说是非常有用的。
```

HTML图像-设置图像的高度与宽度
```lua
height（高度） 与 width（宽度）属性用于设置图像的高度与宽度。

属性值默认单位为像素:

<img src="pulpit.jpg" alt="Pulpit rock" width="304" height="228">

提示: 指定图像的高度和宽度是一个很好的习惯。如果图像指定了高度宽度，
页面加载时就会保留指定的尺寸。如果没有指定图片的大小，
加载页面时有可能会破坏HTML页面的整体布局。
```

HTML 表格
```lua
表格由 <table> 标签来定义。每个表格均有若干行（由 <tr> 标签定义），

每行被分割为若干单元格（由 <td> 标签定义）。

字母 td 指表格数据（table data），即数据单元格的内容。

数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等。
```

HTML 表格和边框属性
```lua
如果不定义边框属性，表格将不显示边框。

有时这很有用，但是大多数时候，我们希望显示边框。

使用边框属性来显示一个带有边框的表格：

实例
<table border="1">
    <tr>
        <td>Row 1, cell 1</td>
        <td>Row 1, cell 2</td>
    </tr>
</table>
```

HTML 表格表头
```lua
表格的表头使用 <th> 标签进行定义。

大多数浏览器会把表头显示为粗体居中的文本：

实例
<table border="1">
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
```

HTML 列表
```lua
HTML 支持有序、无序和定义列表:

HTML 列表
有序列表
1.第一个列表项
2.第二个列表项
3.第三个列表项

无序列表
列表项
列表项
列表项
```

HTML无序列表
```lua
无序列表是一个项目的列表，此列项目使用粗体圆点（典型的小黑圆圈）进行标记。

无序列表使用 <ul> 标签

<ul>
<li>Coffee</li>
<li>Milk</li>
</ul>

浏览器显示如下：

Coffee
Milk
```

HTML 有序列表
```lua
同样，有序列表也是一列项目，列表项目使用数字进行标记。 
有序列表始于 <ol> 标签。每个列表项始于 <li> 标签。

列表项使用数字来标记。

<ol>
<li>Coffee</li>
<li>Milk</li>
</ol>

浏览器中显示如下：

1.Coffee
2.Milk
```

HTML 自定义列表
```lua
自定义列表不仅仅是一列项目，而是项目及其注释的组合。

自定义列表以 <dl> 标签开始。每个自定义列表项以 <dt> 开始。
每个自定义列表项的定义以 <dd> 开始。

<dl>
<dt>Coffee</dt>
<dd>- black hot drink</dd>
<dt>Milk</dt>
<dd>- white cold drink</dd>
</dl>

浏览器显示如下：

Coffee
- black hot drink
Milk
- white cold drink
```

HTML <div> 和<span>
```lua
HTML 可以通过 <div> 和 <span>将元素组合起来。
```

HTML 区块元素
```lua
大多数 HTML 元素被定义为块级元素或内联元素。

块级元素在浏览器显示时，通常会以新行来开始（和结束）。

实例: <h1>, <p>, <ul>, <table>
```

HTML 内联元素
```lua
内联元素在显示时通常不会以新行开始。

实例: <b>, <td>, <a>, <img>
```

HTML <div> 元素
```lua
HTML <div> 元素是块级元素，它可用于组合其他 HTML 元素的容器。

<div> 元素没有特定的含义。除此之外，由于它属于块级元素，浏览器会在其前后显示折行。

如果与 CSS 一同使用，<div> 元素可用于对大的内容块设置样式属性。

<div> 元素的另一个常见的用途是文档布局。它取代了使用表格定义布局的老式方法。

使用 <table> 元素进行文档布局不是表格的正确用法。<table> 元素的作用是显示表格化的数据。
```

HTML <span> 元素
```lua
HTML <span> 元素是内联元素，可用作文本的容器

<span> 元素也没有特定的含义。

当与 CSS 一同使用时，<span> 元素可用于为部分文本设置样式属性。
```

HTML 分组标签
```lua
标签	描述
<div>	定义了文档的区域，块级 (block-level)
<span>	用来组合文档中的行内元素， 内联元素(inline)
```

HTML 布局
```lua
网页布局对改善网站的外观非常重要。

请慎重设计您的网页布局。
```

网站布局
```lua
大多数网站会把内容安排到多个列中（就像杂志或报纸那样）。

大多数网站可以使用 <div> 或者 <table> 元素来创建多列。
CSS 用于对元素进行定位，或者为页面创建背景以及色彩丰富的外观。

lamp	虽然我们可以使用HTML table标签来设计出漂亮的布局，
但是table标签是不建议作为布局工具使用的 - 表格不是布局工具。
```

HTML布局-使用<div> 元素
```lua
div 元素是用于分组 HTML 元素的块级元素。

下面的例子使用五个 div 元素来创建多列布局：

实例
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>Fia开发手册(lingchenw.com)</title> 
</head>
<body>
 
<div id="container" style="width:500px">
 
<div id="header" style="background-color:#FFA500;">
<h1 style="margin-bottom:0;">主要的网页标题</h1></div>
 
<div id="menu" style="background-color:#FFD700;height:200px;width:100px;float:left;">
<b>菜单</b><br>
HTML<br>
CSS<br>
JavaScript</div>
 
<div id="content" style="background-color:#EEEEEE;height:200px;width:400px;float:left;">
内容在这里</div>
 
<div id="footer" style="background-color:#FFA500;clear:both;text-align:center;">
版权 ? lingchenw.com</div>
 
</div>
 
</body>
</html>
```

HTML 布局 - 使用表格
```lua
使用 HTML <table> 标签是创建布局的一种简单的方式。

大多数站点可以使用 <div> 或者 <table> 元素来创建多列。
CSS 用于对元素进行定位，或者为页面创建背景以及色彩丰富的外观。

lamp	即使可以使用 HTML 表格来创建漂亮的布局，
但设计表格的目的是呈现表格化数据 - 表格不是布局工具！
下面的例子使用三行两列的表格 - 第一和最后一行使用 colspan 属性来横跨两列：

实例
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>Fia开发手册(lingchenw.com)</title> 
</head>
<body>
 
<table width="500" border="0">
<tr>
<td colspan="2" style="background-color:#FFA500;">
<h1>主要的网页标题</h1>
</td>
</tr>
 
<tr>
<td style="background-color:#FFD700;width:100px;">
<b>菜单</b><br>
HTML<br>
CSS<br>
JavaScript
</td>
<td style="background-color:#eeeeee;height:200px;width:400px;">
内容在这里</td>
</tr>
 
<tr>
<td colspan="2" style="background-color:#FFA500;text-align:center;">
版权 ? lingchenw.com</td>
</tr>
</table>
 
</body>
</html>
```

HTML 表单和输入
```lua
HTML 表单用于收集不同类型的用户输入。
```

HTML 表单
```lua
表单是一个包含表单元素的区域。

表单元素是允许用户在表单中输入内容,比如：文本域(textarea)、
下拉列表、单选框(radio-buttons)、复选框(checkboxes)等等。

表单使用表单标签 <form> 来设置:

<form>
.
input 元素
.
</form>
```

HTML 表单 - 输入元素
```lua
多数情况下被用到的表单标签是输入标签（<input>）。

输入类型是由类型属性（type）定义的。大多数经常被用到的输入类型如下：

文本域（Text Fields）
文本域通过<input type="text"> 标签来设定，当用户要在表单中键入字母、数字等内容时，就会用到文本域。

<form>
First name: <input type="text" name="firstname"><br>
Last name: <input type="text" name="lastname">
</form>
浏览器显示如下：

First name: 

Last name: 

注意:表单本身并不可见。同时，在大多数浏览器中，文本域的默认宽度是 20 个字符。
```

密码字段
```lua
密码字段通过标签<input type="password"> 来定义:

<form>
Password: <input type="password" name="pwd">
</form>
浏览器显示效果如下:

Password: 

注意:密码字段字符不会明文显示，而是以星号或圆点替代。
```

单选按钮（Radio Buttons）
```lua
<input type="radio"> 标签定义了表单单选框选项

<form>
<input type="radio" name="sex" value="male">Male<br>
<input type="radio" name="sex" value="female">Female
</form>
```

复选框（Checkboxes）
```lua
<input type="checkbox"> 定义了复选框. 用户需要从若干给定的选择中选取一个或若干选项。

<form>
<input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
<input type="checkbox" name="vehicle" value="Car">I have a car 
</form>
```

提交按钮(Submit Button)
```lua
<input type="submit"> 定义了提交按钮.

当用户单击确认按钮时，表单的内容会被传送到另一个文件。表单的动作属性定义了目的文件的文件名。
由动作属性定义的这个文件通常会对接收到的输入数据进行相关的处理。:

<form name="input" action="html_form_action.php" method="get">
Username: <input type="text" name="user">
<input type="submit" value="Submit">
</form>
```

HTML 框架
```lua
通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面。


iframe语法:

<iframe src="URL"></iframe>
该URL指向不同的网页。
```

Iframe - 设置高度与宽度
```lua
height 和 width 属性用来定义iframe标签的高度与宽度。

属性默认以像素为单位, 但是你可以指定其按比例显示 (如："80%")。


<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
```

Iframe - 移除边框
```lua
frameborder 属性用于定义iframe表示是否显示边框。

设置属性值为 "0" 移除iframe的边框:

实例
<iframe src="demo_iframe.htm" frameborder="0"></iframe>
```

使用iframe来显示目标链接页面
```lua
iframe可以显示一个目标链接的页面

目标链接的属性必须使用iframe的属性，如下实例:

实例
<iframe src="demo_iframe.htm" name="iframe_a"></iframe>
<p><a href="http://www.lingchenw.com" target="iframe_a">LINGCHENW.COM</a></p>
```

HTML 颜色
```lua
HTML 颜色由红色、绿色、蓝色混合而成。
```

颜色值
```lua
HTML 颜色由一个十六进制符号来定义，这个符号由红色、绿色和蓝色的值组成（RGB）。

每种颜色的最小值是0（十六进制：#00）。最大值是255（十六进制：#FF）。

这个表格给出了由三种颜色混合而成的具体效果：

颜色值

颜色(Color)	颜色十六进制(Color HEX)	颜色RGB(Color RGB)

 #000000	rgb(0,0,0)
 #FF0000	rgb(255,0,0)
 #00FF00	rgb(0,255,0)
 #0000FF	rgb(0,0,255)
 #FFFF00	rgb(255,255,0)
 #00FFFF	rgb(0,255,255)
 #FF00FF	rgb(255,0,255)
 #C0C0C0	rgb(192,192,192)
 #FFFFFF	rgb(255,255,255)
```

1600万种不同颜色
```lua
三种颜色 红，绿，蓝的组合从0到255，一共有1600万种不同颜色(256 x 256 x 256)。

在下面的颜色表中你会看到不同的结果，从0到255的红色，
同时设置绿色和蓝色的值为0,随着红色的值变化，不同的值都显示了不同的颜色。

Red Light	Color HEX	Color RGB
 #000000 	rgb(0,0,0)
 #080000	rgb(8,0,0)
 #100000	rgb(16,0,0)
 #180000	rgb(24,0,0)
 #200000	rgb(32,0,0)
 #280000	rgb(40,0,0)
 #300000	rgb(48,0,0)
 #380000	rgb(56,0,0)
 #400000	rgb(64,0,0)
 #480000	rgb(72,0,0)
 #500000	rgb(80,0,0)
 #580000	rgb(88,0,0)
 #600000	rgb(96,0,0)
 #680000	rgb(104,0,0)
 #700000	rgb(112,0,0)
 #780000	rgb(120,0,0)
 #800000	rgb(128,0,0)
 #880000	rgb(136,0,0)
 #900000	rgb(144,0,0)
 #980000	rgb(152,0,0)
 #A00000	rgb(160,0,0)
 #A80000	rgb(168,0,0)
 #B00000	rgb(176,0,0)
 #B80000	rgb(184,0,0)
 #C00000	rgb(192,0,0)
 #C80000	rgb(200,0,0)
 #D00000	rgb(208,0,0)
 #D80000	rgb(216,0,0)
 #E00000	rgb(224,0,0)
 #E80000	rgb(232,0,0)
 #F00000	rgb(240,0,0)
 #F80000	rgb(248,0,0)
 #FF0000	rgb(255,0,0)
```

灰暗色调
```lua
以下展示了黑色到灰色的渐变

Gray Shades	Color HEX	Color RGB
 #000000 	rgb(0,0,0) 
 #080808 	rgb(8,8,8) 
 #101010 	rgb(16,16,16) 
 #181818 	rgb(24,24,24) 
 #202020 	rgb(32,32,32) 
 #282828 	rgb(40,40,40) 
 #303030 	rgb(48,48,48) 
 #383838 	rgb(56,56,56) 
 #404040 	rgb(64,64,64) 
 #484848 	rgb(72,72,72) 
 #505050 	rgb(80,80,80) 
 #585858 	rgb(88,88,88) 
 #606060 	rgb(96,96,96) 
 #686868 	rgb(104,104,104) 
 #707070 	rgb(112,112,112) 
 #787878 	rgb(120,120,120) 
 #808080 	rgb(128,128,128) 
 #888888 	rgb(136,136,136) 
 #909090 	rgb(144,144,144) 
 #989898 	rgb(152,152,152) 
 #A0A0A0 	rgb(160,160,160) 
 #A8A8A8 	rgb(168,168,168) 
 #B0B0B0 	rgb(176,176,176) 
 #B8B8B8 	rgb(184,184,184) 
 #C0C0C0 	rgb(192,192,192) 
 #C8C8C8 	rgb(200,200,200) 
 #D0D0D0 	rgb(208,208,208) 
 #D8D8D8 	rgb(216,216,216) 
 #E0E0E0 	rgb(224,224,224) 
 #E8E8E8 	rgb(232,232,232) 
 #F0F0F0 	rgb(240,240,240) 
 #F8F8F8 	rgb(248,248,248) 
 #FFFFFF 	rgb(255,255,255)
```

Web安全色
```lua
数年以前，当大多数计算机仅支持 256 种颜色的时候，一系列 216 种 Web 安全色作为 Web 标准被建议使用。
其中的原因是，微软和 Mac 操作系统使用了 40 种不同的保留的固定系统颜色（双方大约各使用 20 种）。

我们不确定如今这么做的意义有多大，因为越来越多的计算机有能力处理数百万种颜色，不过做选择还是你自己。

最初，216 跨平台 web 安全色被用来确保：当计算机使用 256 色调色板时，所有的计算机能够正确地显示所有的颜色。

000000	000033	000066	000099	0000CC	0000FF
003300	003333	003366	003399	0033CC	0033FF
006600	006633	006666	006699	0066CC	0066FF
009900	009933	009966	009999	0099CC	0099FF
00CC00	00CC33	00CC66	00CC99	00CCCC	00CCFF
00FF00	00FF33	00FF66	00FF99	00FFCC	00FFFF
330000	330033	330066	330099	3300CC	3300FF
333300	333333	333366	333399	3333CC	3333FF
336600	336633	336666	336699	3366CC	3366FF
339900	339933	339966	339999	3399CC	3399FF
33CC00	33CC33	33CC66	33CC99	33CCCC	33CCFF
33FF00	33FF33	33FF66	33FF99	33FFCC	33FFFF
660000	660033	660066	660099	6600CC	6600FF
663300	663333	663366	663399	6633CC	6633FF
666600	666633	666666	666699	6666CC	6666FF
669900	669933	669966	669999	6699CC	6699FF
66CC00	66CC33	66CC66	66CC99	66CCCC	66CCFF
66FF00	66FF33	66FF66	66FF99	66FFCC	66FFFF
990000	990033	990066	990099	9900CC	9900FF
993300	993333	993366	993399	9933CC	9933FF
996600	996633	996666	996699	9966CC	9966FF
999900	999933	999966	999999	9999CC	9999FF
99CC00	99CC33	99CC66	99CC99	99CCCC	99CCFF
99FF00	99FF33	99FF66	99FF99	99FFCC	99FFFF
CC0000	CC0033	CC0066	CC0099	CC00CC	CC00FF
CC3300	CC3333	CC3366	CC3399	CC33CC	CC33FF
CC6600	CC6633	CC6666	CC6699	CC66CC	CC66FF
CC9900	CC9933	CC9966	CC9999	CC99CC	CC99FF
CCCC00	CCCC33	CCCC66	CCCC99	CCCCCC	CCCCFF
CCFF00	CCFF33	CCFF66	CCFF99	CCFFCC	CCFFFF
FF0000	FF0033	FF0066	FF0099	FF00CC	FF00FF
FF3300	FF3333	FF3366	FF3399	FF33CC	FF33FF
FF6600	FF6633	FF6666	FF6699	FF66CC	FF66FF
FF9900	FF9933	FF9966	FF9999	FF99CC	FF99FF
FFCC00	FFCC33	FFCC66	FFCC99	FFCCCC	FFCCFF
FFFF00	FFFF33	FFFF66	FFFF99	FFFFCC	FFFFFF
```

HTML 颜色名
```lua
目前所有浏览器都支持以下颜色名。
141个颜色名称是在HTML和CSS颜色规范定义的（17标准颜色，再加124）。下表列出了所有颜色的值，包括十六进制值。

Remark 提示: 17标准颜色：黑色，蓝色，水，紫红色，灰色，绿色，石灰，栗色，海军，橄榄，

橙，紫，红，白，银，蓝绿色，黄色。点击其中一个颜色名称（或一个十六进制值）
就可以查看与不同文字颜色搭配的背景颜色。
```

按颜色名排序
```lua
按十六进制的值排序

单击一个颜色名或者 16 进制值，就可以查看与不同文字颜色搭配的背景颜色。

颜色名	HEX	Color
AliceBlue 	#F0F8FF	 
AntiqueWhite 	#FAEBD7	 
Aqua 	#00FFFF	 
Aquamarine 	#7FFFD4	 
Azure   #F0FFFF	 
Beige 	#F5F5DC	 
Bisque 	#FFE4C4	 
Black 	        #000000	 
BlanchedAlmond 	#FFEBCD	 
Blue 	#0000FF	 
BlueViolet 	#8A2BE2	 
Brown 	#A52A2A	 
BurlyWood 	#DEB887	 
CadetBlue 	#5F9EA0	 
Chartreuse 	#7FFF00	 
Chocolate 	#D2691E	 
Coral 	#FF7F50	 
CornflowerBlue 	#6495ED	 
Cornsilk 	#FFF8DC	 
Crimson 	#DC143C	 
Cyan 	#00FFFF	 
DarkBlue 	#00008B	 
DarkCyan 	#008B8B	 
DarkGoldenRod 	#B8860B	 
DarkGray 	#A9A9A9	 
DarkGreen 	#006400	 
DarkKhaki 	#BDB76B	 
DarkMagenta 	#8B008B	 
DarkOliveGreen 	#556B2F	 
DarkOrange 	#FF8C00	 
DarkOrchid 	#9932CC	 
DarkRed 	#8B0000	 
DarkSalmon 	#E9967A	 
DarkSeaGreen 	#8FBC8F	 
DarkSlateBlue 	#483D8B	 
DarkSlateGray 	#2F4F4F	 
DarkTurquoise 	#00CED1	 
DarkViolet 	#9400D3	 
DeepPink 	#FF1493	 
DeepSkyBlue 	#00BFFF	 
DimGray 	#696969	 
DodgerBlue 	#1E90FF	 
FireBrick 	#B22222	 
FloralWhite 	#FFFAF0	 
ForestGreen 	#228B22	 
Fuchsia 	#FF00FF	 
Gainsboro 	#DCDCDC	 
GhostWhite 	#F8F8FF	 
Gold 	#FFD700	 
GoldenRod 	#DAA520	 
Gray 	#808080	 
Green 	#008000	 
GreenYellow 	#ADFF2F	 
HoneyDew 	#F0FFF0	 
HotPink 	#FF69B4	 
IndianRed  	#CD5C5C	 
Indigo  	#4B0082	 
Ivory 	#FFFFF0	 
Khaki 	#F0E68C	 
Lavender 	#E6E6FA	 
LavenderBlush 	#FFF0F5	 
LawnGreen 	#7CFC00	 
LemonChiffon 	#FFFACD	 
LightBlue 	#ADD8E6	 
LightCoral 	#F08080	 
LightCyan 	#E0FFFF	 
LightGoldenRodYellow 	#FAFAD2	 
LightGray 	#D3D3D3	 
LightGreen 	#90EE90	 
LightPink 	#FFB6C1	 
LightSalmon 	#FFA07A	 
LightSeaGreen 	#20B2AA	 
LightSkyBlue 	#87CEFA	 
LightSlateGray 	#778899	 
LightSteelBlue 	#B0C4DE	 
LightYellow 	#FFFFE0	 
Lime 	#00FF00	 
LimeGreen 	#32CD32	 
Linen 	#FAF0E6	 
Magenta 	#FF00FF	 
Maroon 	#800000	 
MediumAquaMarine 	#66CDAA	 
MediumBlue 	#0000CD	 
MediumOrchid 	#BA55D3	 
MediumPurple 	#9370DB	 
MediumSeaGreen 	#3CB371	 
MediumSlateBlue 	#7B68EE	 
MediumSpringGreen 	#00FA9A	 
MediumTurquoise 	#48D1CC	 
MediumVioletRed 	#C71585	 
MidnightBlue 	#191970	 
MintCream 	#F5FFFA	 
MistyRose 	#FFE4E1	 
Moccasin 	#FFE4B5	 
NavajoWhite 	#FFDEAD	 
Navy 	#000080	 
OldLace 	#FDF5E6	 
Olive 	#808000	 
OliveDrab 	#6B8E23	 
Orange 	#FFA500	 
OrangeRed 	#FF4500	 
Orchid 	#DA70D6	 
PaleGoldenRod 	#EEE8AA	 
PaleGreen 	#98FB98	 
PaleTurquoise 	#AFEEEE	 
PaleVioletRed 	#DB7093	 
PapayaWhip 	#FFEFD5	 
PeachPuff 	#FFDAB9	 
Peru 	#CD853F	 
Pink 	#FFC0CB	 
Plum 	#DDA0DD	 
PowderBlue 	#B0E0E6	 
Purple 	#800080	 
Red 	#FF0000	 
RosyBrown 	#BC8F8F	 
RoyalBlue 	#4169E1	 
SaddleBrown 	#8B4513	 
Salmon 	#FA8072	 
SandyBrown 	#F4A460	 
SeaGreen 	#2E8B57	 
SeaShell 	#FFF5EE	 
Sienna 	#A0522D	 
Silver 	#C0C0C0	 
SkyBlue 	#87CEEB	 
SlateBlue 	#6A5ACD	 
SlateGray 	#708090	 
Snow 	#FFFAFA	 
SpringGreen 	#00FF7F	 
SteelBlue 	#4682B4	 
Tan 	#D2B48C	 
Teal 	#008080	 
Thistle 	#D8BFD8	 
Tomato 	#FF6347	 
Turquoise 	#40E0D0	 
Violet 	#EE82EE	 
Wheat 	#F5DEB3	 
White 	#FFFFFF	 
WhiteSmoke 	#F5F5F5	 
Yellow 	#FFFF00	 
YellowGreen 	#9ACD32
```

HTML 颜色值
```lua
颜色值由十六进制来表示红、绿、蓝（RGB）。

每个颜色的最低值为 0(十六进制为 00)，最高值为 255(十六进制为FF)。

十六进制值的写法为 # 号后跟三个或六个十六进制字符。

三位数表示法为：#RGB，转换为6位数表示为：#RRGGBB。

颜色实例
3位十六进制颜色值	6位十六进制颜色值	RGB
 #000	#000000	rgb(0,0,0)
 #F00	#FF0000	rgb(255,0,0)
 #0F0	#00FF00	rgb(0,255,0)
 #00F	#0000FF	rgb(0,0,255)
 #FF0	#FFFF00	rgb(255,255,0)
 #0FF	#00FFFF	rgb(0,255,255)
 #F0F	#FF00FF	rgb(255,0,255)
 #888	#888888	rgb(136,136,136)
 #FFF	#FFFFFF	rgb(255,255,255)
```

通过十六进制（Hex）的颜色值排序
```lua
查看以颜色名称排序的颜色列表

Color Name	HEX	Color
Black 	#000000	 
Navy 	#000080	 
DarkBlue 	#00008B	 
MediumBlue 	#0000CD	 
Blue 	#0000FF	 
DarkGreen 	#006400	 
Green 	#008000	 
Teal 	#008080	 
DarkCyan 	#008B8B	 
DeepSkyBlue 	#00BFFF	 
DarkTurquoise 	#00CED1	 
MediumSpringGreen 	#00FA9A	 
Lime 	#00FF00	 
SpringGreen 	#00FF7F	 
Aqua 	#00FFFF	 
Cyan 	#00FFFF	 
MidnightBlue 	#191970	 
DodgerBlue 	#1E90FF	 
LightSeaGreen 	#20B2AA	 
ForestGreen 	#228B22	 
SeaGreen 	#2E8B57	 
DarkSlateGray 	#2F4F4F	 
LimeGreen 	#32CD32	 
MediumSeaGreen 	#3CB371	 
Turquoise 	#40E0D0	 
RoyalBlue 	#4169E1	 
SteelBlue 	#4682B4	 
DarkSlateBlue 	#483D8B	 
MediumTurquoise 	#48D1CC	 
Indigo  	#4B0082	 
DarkOliveGreen 	#556B2F	 
CadetBlue 	#5F9EA0	 
CornflowerBlue 	#6495ED	 
MediumAquaMarine 	#66CDAA	 
DimGray 	#696969	 
SlateBlue 	#6A5ACD	 
OliveDrab 	#6B8E23	 
SlateGray 	#708090	 
LightSlateGray 	#778899	 
MediumSlateBlue 	#7B68EE	 
LawnGreen 	#7CFC00	 
Chartreuse 	#7FFF00	 
Aquamarine 	#7FFFD4	 
Maroon 	#800000	 
Purple 	#800080	 
Olive 	#808000	 
Gray 	#808080	 
SkyBlue 	#87CEEB	 
LightSkyBlue 	#87CEFA	 
BlueViolet 	#8A2BE2	 
DarkRed 	#8B0000	 
DarkMagenta 	#8B008B	 
SaddleBrown 	#8B4513	 
DarkSeaGreen 	#8FBC8F	 
LightGreen 	#90EE90	 
MediumPurple 	#9370DB	 
DarkViolet 	#9400D3	 
PaleGreen 	#98FB98	 
DarkOrchid 	#9932CC	 
YellowGreen 	#9ACD32	 
Sienna 	#A0522D	 
Brown 	#A52A2A	 
DarkGray 	#A9A9A9	 
LightBlue 	#ADD8E6	 
GreenYellow 	#ADFF2F	 
PaleTurquoise 	#AFEEEE	 
LightSteelBlue 	#B0C4DE	 
PowderBlue 	#B0E0E6	 
FireBrick 	#B22222	 
DarkGoldenRod 	#B8860B	 
MediumOrchid 	#BA55D3	 
RosyBrown 	#BC8F8F	 
DarkKhaki 	#BDB76B	 
Silver 	#C0C0C0	 
MediumVioletRed 	#C71585	 
IndianRed  	#CD5C5C	 
Peru 	#CD853F	 
Chocolate 	#D2691E	 
Tan 	#D2B48C	 
LightGray 	#D3D3D3	 
Thistle 	#D8BFD8	 
Orchid 	#DA70D6	 
GoldenRod 	#DAA520	 
PaleVioletRed 	#DB7093	 
Crimson 	#DC143C	 
Gainsboro 	#DCDCDC	 
Plum 	#DDA0DD	 
BurlyWood 	#DEB887	 
LightCyan 	#E0FFFF	 
Lavender 	#E6E6FA	 
DarkSalmon 	#E9967A	 
Violet 	#EE82EE	 
PaleGoldenRod 	#EEE8AA	 
LightCoral 	#F08080	 
Khaki 	#F0E68C	 
AliceBlue 	#F0F8FF	 
HoneyDew 	#F0FFF0	 
Azure 	#F0FFFF	 
SandyBrown 	#F4A460	 
Wheat 	#F5DEB3	 
Beige 	#F5F5DC	 
WhiteSmoke 	#F5F5F5	 
MintCream 	#F5FFFA	 
GhostWhite 	#F8F8FF	 
Salmon 	#FA8072	 
AntiqueWhite 	#FAEBD7	 
Linen 	#FAF0E6	 
LightGoldenRodYellow 	#FAFAD2	 
OldLace 	#FDF5E6	 
Red 	#FF0000	 
Fuchsia 	#FF00FF	 
Magenta 	#FF00FF	 
DeepPink 	#FF1493	 
OrangeRed 	#FF4500	 
Tomato 	#FF6347	 
HotPink 	#FF69B4	 
Coral 	#FF7F50	 
DarkOrange 	#FF8C00	 
LightSalmon 	#FFA07A	 
Orange 	#FFA500	 
LightPink 	#FFB6C1	 
Pink 	#FFC0CB	 
Gold 	#FFD700	 
PeachPuff 	#FFDAB9	 
NavajoWhite 	#FFDEAD	 
Moccasin 	#FFE4B5	 
Bisque 	#FFE4C4	 
MistyRose 	#FFE4E1	 
BlanchedAlmond 	#FFEBCD	 
PapayaWhip 	#FFEFD5	 
LavenderBlush 	#FFF0F5	 
SeaShell 	#FFF5EE	 
Cornsilk 	#FFF8DC	 
LemonChiffon 	#FFFACD	 
FloralWhite 	#FFFAF0	 
Snow 	#FFFAFA	 
Yellow 	#FFFF00	 
LightYellow 	#FFFFE0	 
Ivory 	#FFFFF0	 
White 	#FFFFFF
```

HTML 脚本
```lua
JavaScript 使 HTML 页面具有更强的动态和交互性。
```

HTML <script> 标签
```lua
<script> 标签用于定义客户端脚本，比如 JavaScript。

<script> 元素既可包含脚本语句，也可通过 src 属性指向外部脚本文件。

JavaScript 最常用于图片操作、表单验证以及内容动态更新。

下面的脚本会向浏览器输出"Hello World!"：

实例
<script>
document.write("Hello World!");
</script>
```

HTML<noscript> 标签
```lua
<noscript> 标签提供无法使用脚本时的替代内容，比方在浏览器禁用脚本时，或浏览器不支持客户端脚本时。

<noscript>元素可包含普通 HTML 页面的 body 元素中能够找到的所有元素。

只有在浏览器不支持脚本或者禁用脚本时，才会显示 <noscript> 元素中的内容：

实例
<script>
document.write("Hello World!")
</script>
<noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
```

JavaScript体验
```lua
JavaScript实例代码:

JavaScript可以直接在HTML输出:
document.write("<p>这是一个段落。</p>");

尝试一下 ?

JavaScript事件响应:
<button type="button" onclick="myFunction()">点我！</button>

尝试一下 ?

JavaScript处理 HTML 样式:
document.getElementById("demo").style.color="#ff0000";
```

HTML 字符实体
```lua
HTML 中的预留字符必须被替换为字符实体。

一些在键盘上找不到的字符也可以使用字符实体来替换。
```

HTML 实体
```lua
在 HTML 中，某些字符是预留的。

在 HTML 中不能使用小于号（<）和大于号（>），这是因为浏览器会误认为它们是标签。

如果希望正确地显示预留字符，我们必须在 HTML 源代码中使用字符实体（character entities）。 字符实体类似这样：

&entity_name;
或

&#entity_number;
如需显示小于号，我们必须这样写：&lt; 或 &#60; 或 &#060;

Remark提示： 使用实体名而不是数字的好处是，名称易于记忆。不过坏处是，浏览器也许并不支持所有实体名称（对实体数字的支持却很好）。
```

不间断空格(Non-breaking Space)
```lua
HTML 中的常用字符实体是不间断空格(&nbsp;)。

浏览器总是会截短 HTML 页面中的空格。如果您在文本中写 10 个空格，在显示该页面之前，浏览器会删除它们中的 9 个。
如需在页面中增加空格的数量，您需要使用 &nbsp; 字符实体。
```

结合音标符
```lua
发音符号是加到字母上的一个"glyph(字形)"。

一些变音符号, 如 尖音符 (  ?) 和 抑音符 (  ?) 。

变音符号可以出现字母的上面和下面，或者字母里面，或者两个字母间。

变音符号可以与字母、数字字符的组合来使用。

以下是一些实例:

音标符	字符	Construct	输出结果
  ?	a	a&#768;	a?
  ?	a	a&#769;	a?
?	a	a&#770;	a?
  ?	a	a&#771;	a?
  ?	O	O&#768;	O?
  ?	O	O&#769;	O?
?	O	O&#770;	O?
  ?	O	O&#771;	O?
```

HTML字符实体
```lua
实体名称对大小写敏感！


显示结果	描述	实体名称	实体编号
 	空格	&nbsp;	&#160;
<	小于号	&lt;	&#60;
>	大于号	&gt;	&#62;
&	和号	&amp;	&#38;
"	引号	&quot;	&#34;
'	撇号 	&apos; (IE不支持)	&#39;
￠	分	&cent;	&#162;
￡	镑	&pound;	&#163;
￥	人民币/日元	&yen;	&#165;
€	欧元	&euro;	&#8364;
§	小节	&sect;	&#167;
?	版权	&copy;	&#169;
?	注册商标	&reg;	&#174;
?	商标	&trade;	&#8482;
×	乘号	&times;	&#215;
÷	除号	&divide;	&#247;

虽然 html 不区分大小写，但实体字符对大小写敏感。
```

HTML统一资源定位器(Uniform Resource Locators)
```lua
URL 是一个网页地址。

URL可以由字母组成，如"lingchenw.com"，或互联网协议（IP）地址： 192.68.20.50。
大多数人进入网站使用网站域名来访问，
因为 名字比数字更容易记住。
```

URL - 统一资源定位器
```lua
Web浏览器通过URL从Web服务器请求页面。

当您点击 HTML 页面中的某个链接时，对应的 <a> 标签指向万维网上的一个地址。

一个统一资源定位器(URL) 用于定位万维网上的文档。

一个网页地址实例: http://www.lingchenw.com 语法规则:

scheme://host.domain:port/path/filename
说明:

scheme - 定义因特网服务的类型。最常见的类型是 http
host - 定义域主机（http 的默认主机是 www）
domain - 定义因特网域名，比如 lingchenw.com
:port - 定义主机上的端口号（http 的默认端口号是 80）
path - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）。
filename - 定义文档/资源的名称
```

常见的 URL Scheme
```lua
以下是一些URL scheme：

Scheme	访问	用于...
http	超文本传输协议	以 http:// 开头的普通网页。不加密。
https	安全超文本传输协议	安全网页，加密所有信息交换。
ftp	文件传输协议	用于将文件下载或上传至网站。
file	 	您计算机上的文件。
```

URL 字符编码
```lua
URL 只能使用 ASCII 字符集.

来通过因特网进行发送。由于 URL 常常会包含 ASCII 集合之外的字符，URL 必须转换为有效的 ASCII 格式。

URL 编码使用 "%" 其后跟随两位的十六进制数来替换非 ASCII 字符。

URL 不能包含空格。URL 编码通常使用 + 来替换空格。
```

URL 编码实例
```lua
字符	URL 编码
€	%80
￡	%A3
?	%A9
?	%AE
à	%C0
á	%C1
?	%C2
?	%C3
?	%C4
?	%C5
```

HTML 速查列表
```lua
HTML 基本文档

<!DOCTYPE html>
<html>
<head>
<title>文档标题</title>
</head>
<body>
可见文本...
</body>
</html>



基本标签（Basic Tags）

<h1>最大的标题</h1>
<h2> . . . </h2>
<h3> . . . </h3>
<h4> . . . </h4>
<h5> . . . </h5>
<h6>最小的标题</h6>
 
<p>这是一个段落。</p>
<br> （换行）
<hr> （水平线）
<!-- 这是注释 -->



文本格式化（Formatting）
<b>粗体文本</b>
<code>计算机代码</code>
<em>强调文本</em>
<i>斜体文本</i>
<kbd>键盘输入</kbd> 
<pre>预格式化文本</pre>
<small>更小的文本</small>
<strong>重要的文本</strong>
 
<abbr> （缩写）
<address> （联系信息）
<bdo> （文字方向）
<blockquote> （从另一个源引用的部分）
<cite> （工作的名称）
<del> （删除的文本）
<ins> （插入的文本）
<sub> （下标文本）
<sup> （上标文本）



链接（Links）
普通的链接：<a href="http://www.example.com/">链接文本</a>
图像链接： <a href="http://www.example.com/"><img src="URL" alt="替换文本"></a>
邮件链接： <a href="mailto:webmaster@example.com">发送e-mail</a>
书签：
<a id="tips">提示部分</a>
<a href="#tips">跳到提示部分</a>



图片（Images）
<img src="URL" alt="替换文本" height="42" width="42">



样式/区块（Styles/Sections）
<style type="text/css">
h1 {color:red;}
p {color:blue;}
</style>
<div>文档中的块级元素</div>
<span>文档中的内联元素</span>



无序列表
<ul>
    <li>项目</li>
    <li>项目</li>
</ul>



有序列表
<ol>
    <li>第一项</li>
    <li>第二项</li>
</ol>



定义列表
<dl>
  <dt>项目 1</dt>
    <dd>描述项目 1</dd>
  <dt>项目 2</dt>
    <dd>描述项目 2</dd>
</dl>



表格（Tables）
<table border="1">
  <tr>
    <th>表格标题</th>
    <th>表格标题</th>
  </tr>
  <tr>
    <td>表格数据</td>
    <td>表格数据</td>
  </tr>
</table>



框架（Iframe）
<iframe src="demo_iframe.htm"></iframe>



表单（Forms）
<form action="demo_form.php" method="post/get">
<input type="text" name="email" size="40" maxlength="50">
<input type="password">
<input type="checkbox" checked="checked">
<input type="radio" checked="checked">
<input type="submit" value="Send">
<input type="reset">
<input type="hidden">
<select>
<option>苹果</option>
<option selected="selected">香蕉</option>
<option>樱桃</option>
</select>
<textarea name="comment" rows="60" cols="20"></textarea>
 
</form>



实体（Entities）
&lt; 等同于 <
&gt; 等同于 >
&#169; 等同于 ?
```

HTML 总结
```lua
HTML 是一种在 Web 上使用的通用标记语言。HTML 允许你格式化文本，添加图片，
创建链接、输入表单、框架和表格等等，并可将之存为文本文件，浏览器即可读取和显示。

HTML 的关键是标签，其作用是指示将出现的内容。
```

