# Fa 爬虫教程

DOM 查找网页分类实战

```lua
--导入jsoup库
import'org.jsoup.*'
--定义链接
url = 'http://dh.hfybbs.vip/cn/index.html'
--这里使用Http方法先获取到网页源码再解析。
--因为jsoup自带的connect方法是同步加载，会影响程序加载速度
Http.get(url,function(code,content)
  if code==200 then--判断网站状态
    doc = Jsoup.parse(content)--使用jsoup解析网页
    classification = doc.getElementsByClass('text-gray')--查找到所有class为text-gray的网页元素
    classification = luajava.astable(classification)--将其转换成table表
    for k,v in pairs(classification) do--循环打印输出
      print(v.text())
    end
  else
    print('无法访问')
  end
end)
```

jsoup 概述

```lua
此篇教程必须最新版盒子才能正常运行！
jsoup概述：
jsoup是java里的一个普遍使用的html解析器，其的逻辑简单，语法容易，且功能强大。
(此篇教程我不会再用中文变量，中文太别扭。。。。。。)

但androlua中并没有自带这个模块，我们需要将其导入
dex库下载链接：http://47.107.34.109:8000/d/c8f7ecb09db940de9725/
使用方法：工程目录下创建libs目录，将jsoup开头的dex文件放入,在程序开头加入 import'org.jsoup.*'即可

jsoup API：
从String解析文档
html = "<html><head><title>First parse</title></head>"
+ "<body><p>Parsed HTML into a doc.</p></body></html>"
doc = Jsoup.parse(html)

解析一个网页碎片
html = "<div><p>Lorem ipsum.</p>"
doc = Jsoup.parseBodyFragment(html)
body = doc.body()

从URL加载文档
doc = Jsoup.connect("http://example.com/").get()
title = doc.title()

高级url请求
doc = Jsoup.connect("http://example.com")
.data("query", "Java")
.userAgent("Mozilla")
.cookie("auth", "token")
.timeout(3000)
.post()

从文件加载文档
input = new File("/tmp/input.html")
doc = Jsoup.parse(input, "UTF-8", "http://example.com/")

使用DOM方法导航文档
寻找元素
getElementById(String id)
getElementsByTag(String tag)
getElementsByClass(String className)
getElementsByAttribute(String key) （及相关方法）
元素的兄弟姐妹：siblingElements()，firstElementSibling()，lastElementSibling()，nextElementSibling()，previousElementSibling()
图：parent()，children()，child(int index)
元素数据
attr(String key)获取和attr(String key, String value)设置属性
attributes() 获得所有属性
id()，className()和classNames()
text()获取和text(String value)设置文本内容
html()获取和html(String value)设置内部HTML内容
outerHtml() 获取外部HTML值
data()获取数据内容（例如script和style标签）
tag() 和 tagName()
处理HTML和文本
append(String html)， prepend(String html)
appendText(String text)， prependText(String text)
appendElement(String tagName)， prependElement(String tagName)
html(String value)

使用selector-syntax查找元素
选择器概述
tagname：按标签查找元素，例如 a
ns|tag：在命名空间中按标记fb|name查找<fb:name>元素，例如查找元素
#id：按ID查找元素，例如 #logo
.class：按类名查找元素，例如 .masthead
[attribute]：具有属性的元素，例如 [href]
[^attr]：具有属性名称前缀的[^data-]元素，例如查找具有HTML5数据集属性的元素
[attr=value]：具有属性值的元素，例如[width=500]（也是可引用的[data-name='launch sequence']）
[attr^=value]，[attr$=value]，[attr*=value]：用与启动属性，以结束，或包含所述的值，例如元素[href*=/path/]
[attr~=regex]：具有与正则表达式匹配的属性值的元素; 例如img[src~=(?i)\.(png|jpe?g)]
*：所有元素，例如 *
选择器组合
el#id：具有ID的元素，例如 div#logo
el.class：带有类的元素，例如 div.masthead
el[attr]：具有属性的元素，例如 a[href]
任何组合，例如 a[href].highlight
ancestor child：从祖先下降的子元素，例如在类“body”的块下的任何位置.body p查找p元素
parent > child：直接从父级下降的子元素，例如div.content > p查找p元素; 并body > *找到body标签的直接子节点
siblingA + siblingB：找到兄弟B元素之后紧接着兄弟A，例如 div.head + div
siblingA ~ siblingX：找到兄弟A前面的兄弟X元素，例如 h1 ~ p
el, el, el：对多个选择器进行分组，找到与任何选择器匹配的唯一元素; 例如div.masthead, div.logo
伪选择器
:lt(n)：找到其兄弟索引（即它在DOM树中相对于其父节点的位置）小于的元素n; 例如td:lt(3)
:gt(n)：查找兄弟索引大于的元素n; 例如div p:gt(2)
:eq(n)：查找兄弟索引等于的元素n; 例如form input:eq(1)
:has(selector)：查找包含与选择器匹配的元素的元素; 例如div:has(p)
:not(selector)：查找与选择器不匹配的元素; 例如div:not(.logo)
:contains(text)：查找包含给定文本的元素。搜索不区分大小写; 例如p:contains(jsoup)
:containsOwn(text)：查找直接包含给定文本的元素
:matches(regex)：查找文本与指定正则表达式匹配的元素; 例如div:matches((?i)login)
:matchesOwn(regex)：查找自己的文本与指定正则表达式匹配的元素
注意，上面的索引伪选择器是基于0的，即第一个元素是索引0，第二个元素是1

从元素中提取属性，文本和HTML
要获取属性的值，请使用该Node.attr(String key)方法
对于元素（及其组合子元素）上的文本，请使用 Element.text()
对于HTML，使用Element.html()或Node.outerHtml()
上述方法是元素数据访问方法的核心。还有其他人：
Element.id()
Element.tagName()
Element.className() 和 Element.hasClass(String className)
所有这些访问器方法都有相应的setter方法来更改数据。

设置属性值
使用属性setter方法Element.attr(String key, String value)，和Elements.attr(String key, String value)。
如果需要修改class元素的属性，请使用Element.addClass(String className)和Element.removeClass(String className)方法。

设置元素的HTML
div = doc.select("div").first()
div.html("<p>lorem ipsum</p>")
div.prepend("<p>First</p>")
div.append("<p>Last</p>")

Element span = doc.select("span").first()
span.wrap("<li><a href='http://example.com/'></a></li>")

设置元素的文本内容
Element div = doc.select("div").first()
div.text("five > four")
div.prepend("First ")
div.append(" Last")
```

jsoup 爬取网页标题实战

```lua
--导入jsoup库
import'org.jsoup.*'
--定义链接
url = 'http://dh.hfybbs.vip'
--这里使用Http方法先获取到网页源码再解析。
--因为jsoup自带的connect方法是同步加载，会影响程序加载速度
Http.get(url,function(code,content)
  if code==200 then--判断网站状态
    doc = Jsoup.parse(content)--使用jsoup解析网页
    print(doc.title())--使用jsoup方法获取到网页标题
  else
    print('无法访问')
  end
end)
```

String 基础概述

```lua
爬虫，这是一个大学问，厉害的爬虫可以用同一个网站的相同数据，
做出更突出的效果，可以将杂乱无章的数据，处理成系统的，分类好的数据来进行复用。
当然，这些都是厉害的，工程量十分大的，而我们只需要简单的处理页面数据就可以了。
首先熟悉下Lua的字符串操作
字符串由一对双引号或单引号来表示。

string1 = "this is string1"
string2 = 'this is string2'

在对一个数字字符串上进行算术操作时，Lua 会尝试将这个数字字符串转成一个数字，字符串连接使用的是 ..如：

print("a" .. 'b')
--输出(ab)
print(157 .. 428)
--输出(157428)

使用 # 来计算字符串的长度，放在字符串前面，如下实例：

len = "www.androlua.com"
print(#len)
--输出(16)

字符串的截取操作：
strings="左中右"

--取字符串左边
左=strings:match("(.+)中")


--取字符串中间
中=strings:match("左(.-)右")


--取字符串右边
右=strings:match("中(.+)")

--替换
string.gsub(原字符串,替换的字符串,替换成的字符串)

--匹配子串位置
起始位置,结束位置=string.find(字符串,子串)


--按位置捕获字符串
string.sub(字符串,子串起始位置,子串结束位置)

需要一提得是，Lua中使用\来进行转义，例如：
\n 换行(LF) ，将当前位置移到下一行开头
\r 回车(CR) ，将当前位置移到本行开头
\t 水平制表(HT) （跳到下一个TAB位置）
\\ 代表一个反斜线字符\
\' 代表一个单引号（撇号）字符
\" 代表一个双引号字符
\0 空字符(NULL)

Lua中字符串操作api：
string.upper(argument) 字符串全部转为大写字母。
string.lower(argument) 字符串全部转为小写字母。
string.gsub(mainString,findString,replaceString,num) 在字符串中替换,mainString为要替换的字符串， findString 为被替换的字符，replaceString 要替换的字符，num 替换次数（可以忽略，则全部替换）
string.find (str, substr, [init, [end]]) 在一个指定的目标字符串中搜索指定的内容(第三个参数为索引),返回其具体位置。不存在则返回 nil。
string.reverse(arg) 字符串反转
string.format(...) 返回一个类似printf的格式化字符串
string.char(arg) 和 string.byte(arg[,int]) char 将整型数字转成字符并连接， byte 转换字符为整数值(可以指定某个字符，默认第一个字符)。
string.len(arg) 计算字符串长度。
string.rep(string, n) 返回字符串string的n个拷贝
.. 链接两个字符串
string.gmatch(str, pattern) 回一个迭代器函数，每一次调用这个函数，返回一个在字符串 str 找到的下一个符合 pattern 描述的子串。如果参数 pattern 描述的字符串没有找到，迭代函数返回nil。
string.match(str, pattern, init) string.match()只寻找源字串str中的第一个配对. 参数init可选, 指定搜寻过程的起点, 默认为1。
在成功配对时, 函数将返回配对表达式中的所有捕获结果; 如果没有设置捕获标记, 则返回整个配对字符串. 当没有成功的配对时, 返回nil。

其中string.format()有以下转义码：
%c - 接受一个数字, 并将其转化为ASCII码表中对应的字符
%d, %i - 接受一个数字并将其转化为有符号的整数格式
%o - 接受一个数字并将其转化为八进制数格式
%u - 接受一个数字并将其转化为无符号整数格式
%x - 接受一个数字并将其转化为十六进制数格式, 使用小写字母
%X - 接受一个数字并将其转化为十六进制数格式, 使用大写字母
%e - 接受一个数字并将其转化为科学记数法格式, 使用小写字母e
%E - 接受一个数字并将其转化为科学记数法格式, 使用大写字母E
%f - 接受一个数字并将其转化为浮点数格式
%g(%G) - 接受一个数字并将其转化为%e(%E, 对应%G)及%f中较短的一种格式
%q - 接受一个字符串并将其转化为可安全被Lua编译器读入的格式
%s - 接受一个字符串并按照给定的参数格式化该字符串

Lua的匹配模式：
.(点): 与任何字符配对
%a: 与任何字母配对
%c: 与任何控制符配对(例如\n)
%d: 与任何数字配对
%l: 与任何小写字母配对
%p: 与任何标点(punctuation)配对
%s: 与空白字符配对
%u: 与任何大写字母配对
%w: 与任何字母/数字配对
%x: 与任何十六进制数配对
%z: 与任何代表0的字符配对
%x(此处x是非字母非数字字符): 与字符x配对. 主要用来处理表达式中有功能的字符(^$()%.[]*+-?)的配对问题, 例如%%与%配对
[数个字符类]: 与任何[]中包含的字符类配对. 例如[%w_]与任何字母/数字, 或下划线符号(_)配对
[^数个字符类]: 与任何不包含在[]中的字符类配对. 例如[^%s]与任何非空白字符配对
单个字符类匹配该类别中任意单个字符；
单个字符类跟一个 '*'， 将匹配零或多个该类的字符。 这个条目总是匹配尽可能长的串；
单个字符类跟一个 '+'， 将匹配一或更多个该类的字符。 这个条目总是匹配尽可能长的串；
单个字符类跟一个 '-'， 将匹配零或更多个该类的字符。 和 '*' 不同， 这个条目总是匹配尽可能短的串；
单个字符类跟一个 '?'， 将匹配零或一个该类的字符。 只要有可能，它会匹配一个；
%n， 这里的 n 可以从 1 到 9； 这个条目匹配一个等于 n 号捕获物（后面有描述）的子串。
%bxy， 这里的 x 和 y 是两个明确的字符； 这个条目匹配以 x 开始 y 结束， 且其中 x 和 y 保持 平衡 的字符串。 意思是，如果从左到右读这个字符串，对每次读到一个 x 就 +1 ，读到一个 y 就 -1， 最终结束处的那个 y 是第一个记数到 0 的 y。 举个例子，条目 %b() 可以匹配到括号平衡的表达式。
%f[set]， 指 边境模式； 这个条目会匹配到一个位于 set 内某个字符之前的一个空串， 且这个位置的前一个字符不属于 set 。 集合 set 的含义如前面所述。 匹配出的那个空串之开始和结束点的计算就看成该处有个字符 '\0' 一样。

常用正则(Lua中需要将\换成%)：
非负整数：^\d+$
正整数：^[0-9]*[1-9][0-9]*$
非正整数：^((-\d+)|(0+))$
负整数：^-[0-9]*[1-9][0-9]*$
整数：^-?\d+$
非负浮点数：^\d+(\.\d+)?$
正浮点数 : ^((0-9)+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)$
非正浮点数：^((-\d+\.\d+)?)|(0+(\.0+)?))$
负浮点数：^(-((正浮点数正则式)))$
英文字符串：^[A-Za-z]+$
英文大写串：^[A-Z]+$
英文小写串：^[a-z]+$
英文字符数字串：^[A-Za-z0-9]+$
英数字加下划线串：^\w+$
E-mail地址：^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$
URL：^[a-zA-Z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\s*)?$
或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$
邮政编码：^[1-9]\d{5}$
中文：^[\u0391-\uFFE5]+$
电话号码：^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$
手机号码：^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$
双字节字符(包括汉字在内)：^\x00-\xff
匹配首尾空格：(^\s*)|(\s*$)（像vbscript那样的trim函数）
匹配HTML标记：<(.*)>.*<\/\1>|<(.*) \/>
匹配空行：\n[\s| ]*\r
提取信息中的网络链接：(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
提取信息中的邮件地址：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
提取信息中的图片链接：(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
提取信息中的IP地址：(\d+)\.(\d+)\.(\d+)\.(\d+)
提取信息中的中国手机号码：(86)*0*13\d{9}
提取信息中的中国固定电话号码：(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}
提取信息中的中国电话号码（包括移动和固定电话）：(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}
提取信息中的中国邮政编码：[1-9]{1}(\d+){5}
提取信息中的浮点数（即小数）：(-?\d*)\.?\d+
提取信息中的任何数字 ：(-?\d*)(\.\d+)?
IP：(\d+)\.(\d+)\.(\d+)\.(\d+)
电话区号：/^0\d{2,3}$/
腾讯QQ号：^[1-9]*[1-9][0-9]*$
帐号(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
中文、英文、数字及下划线：^[\u4e00-\u9fa5_a-zA-Z0-9]+$
匹配中文字符的正则表达式： [\u4e00-\u9fa5]
匹配双字节字符(包括汉字在内)：[^\x00-\xff]
匹配空行的正则表达式：\n[\s| ]*\r
匹配HTML标记的正则表达式：/<(.*)>.*<\/\1>|<(.*) \/>/
sql语句：^(select|drop|delete|create|update|insert).*$
匹配首尾空格的正则表达式：(^\s*)|(\s*$)
匹配Email地址的正则表达式：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
```

抓取 aj ax 数据实战

```lua
--首先创建一个布局，为教程提供良好的可视化
--导入cjson包
import'cjson'
shamrock=
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或者图片路径)
  {
    ScrollView;--纵向滚动
    layout_width='fill';--宽
    layout_height='fill';--高
    {
      LinearLayout;--线性布局
      Orientation='vertical';--布局方向
      layout_width='fill';--布局宽度
      layout_height='fill';--布局高度
      background='';--布局背景颜色(或者图片路径)
      gravity='center';--设置居中
      {
        TextView;--文本控件
        id='文本';--绑定ID
        layout_margin='5%w';--布局外边距
        layout_width='wrap';--文本宽度
        layout_height='wrap';--文本高度
        Gravity='center';--重力属性
        textColor='#000000';--文本颜色
        text='爬取内容中';--显示的文本
        textSize='18sp';--文本大小
      };
    };
  };
};
activity.setContentView(loadlayout(shamrock))--将布局添加至窗口
--设置需要爬取的网站，可以随意更换
--这个链接是百度热搜的接口
url = 'https://www.anyknew.com/api/v1/sites/baidu'

--使用Http访问该网站，获取网页源码
Http.get(url,nil,'utf8',nil,function(状态码,网页源码)
  --判断返回状态码，确定网站的正常运行
  if 状态码 ==200 then
    --使用cjson库将获取到的json数据table化
    数据 = cjson.decode(网页源码)
    --取出需要的数据
    数据列表 = 数据.data.site.subs[1].items
    --定义一个空文本用于显示数据
    标题 = ''
    --遍历爬取到的数据
    for k,v in pairs(数据列表) do
      --将数据逐个取出，累加进字符串进行显示
      标题 =标题.. string.format('标题%d：%s',k,v.title)..'\n'
    end
    --设置文本显示，显示爬取效果
    文本.setText(标题)
  else
    文本.setText('获取内容失败')
  end
end)
```

爬取论坛实战

```lua
--创建一个布局，为教程提供良好的可视化
--做一个爬虫，前期的分析网页工作需要做好
--明确目标，明白只需要哪些数据，以及如何处理数据
shamrock=
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或者图片路径)
  {
    ScrollView;--纵向滚动
    layout_width='fill';--宽
    layout_height='fill';--高
    {
      TextView;--文本控件
      id='显示文本';--绑定ID
      layout_width='fill';--文本宽度
      layout_height='fill';--文本高度
      Gravity='center';--重力属性
      textColor='#000000';--文本颜色
      text='爬取中...';--显示的文本
      textSize='16sp';--文本大小
    };
  };
};
activity.setContentView(loadlayout(shamrock))--将布局添加至窗口

url="论坛网址"--论坛网址
--HTTP请求网页源码
Http.get(url,nil,'utf8',nil,function(状态码,网页源码)
  --判断网站的访问情况
  if 状态码 == 200 then
    --获取到帖子标题数据
    帖子标题迭代器 = 网页源码:gmatch('<a href="thread.-htm">(.-)</a>')
    --创建帖子标题表
    帖子标题 = {}
    --遍历帖子标题数据，将数据存入表
    for i in 帖子标题迭代器 do
      table.insert(帖子标题,i)
    end
    --获取帖子链接数据
    帖子链接迭代器 = 网页源码:gmatch('<a href="(thread.-htm)">.-</a>')
    --创建帖子链接表
    帖子链接 = {}
    --遍历帖子链接数据，将其存入表
    for i in 帖子链接迭代器 do
      table.insert(帖子链接,i)
    end
    --定义一个空字符串，后面将数据展示到布局
    爬取内容 = ''
    --遍历所有数据
    for i=1,#帖子标题 do
      --累加字符串，使显示效果良好
      爬取内容 = 爬取内容..string.format('帖子标题：%s\n帖子链接：论坛网址/%s\n',帖子标题[i],帖子链接[i])
    end
    --将数据显示
    显示文本.setText(爬取内容)
  else
    显示文本.setText('网站无法访问')
  end
end)
```

爬取 ip 与地理位置实战

```lua
--创建布局，显示爬取效果
shamrock=
--布局请写在这里
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或者图片路径)
  Gravity="center";--设置居中
  {
    TextView;--文本控件
    id="显示文本";--绑定id
    layout_width='wrap';--文本宽度
    layout_height='wrap';--文本高度
    Gravity='center';--重力属性
    textColor='#000000';--文本颜色
    text='正在查询中';--显示的文本
    textSize='16sp';--文本大小
  };
};
activity.setContentView(loadlayout(shamrock))--将布局添加至窗口
url="https://ip.cn/"--设置爬取链接
--设置爬取请求头
header={
  ["User-Agent"]= "Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
}
--请求网页源码
Http.get(url,nil,"utf8",header,function(状态码,网页源码)
  --判断网站状态
  if 状态码==200 then
    --根据网页，分析出筛选规则
    ip地址=网页源码:match('您现在的 IP：<code>(.-)</code>')
    地理位置=网页源码:match('所在地理位置：<code>(.-)</code>')
    --设置文本进行显示
    文本=string.format("您现在的 IP：%s\n您所在地理位置：%s",ip地址,地理位置)
    显示文本.setText(文本)
  else
    显示文本.setText("网站无法访问")
  end
end)
```

爬取必应壁纸实战

```lua
--创建布局，用于显示爬取的图片
--由于考虑到学习成本的问题，所以我没有用适配器写图片展示
--用了较简单的循环添加布局
--提示:图片爬虫显示较吃性能，所以本教程可能导致程序闪退。
--由于网站和循环布局原因，所以爬取会比较慢，请耐心等待。
shamrock=
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或者图片路径)
  {
    ScrollView;--纵向滚动
    layout_width='fill';--宽
    layout_height='fill';--高
    {
      LinearLayout;--线性布局
      id="壁纸";--绑定ID
      Orientation='vertical';--布局方向
      layout_width='fill';--布局宽度
      layout_height='fill';--布局高度
      background='';--布局背景颜色(或者图片路径)
    };
  };
};
activity.setContentView(loadlayout(shamrock))--将布局添加至窗口
--创建等待窗口提示
dialog3 = ProgressDialog.show(this, "提示", "正在爬取中",false, false)
--将等待窗口美化(设置圆角)
import "android.graphics.drawable.GradientDrawable"
local radiu=25
dialog3.getWindow().setBackgroundDrawable(GradientDrawable().setCornerRadii({radiu,radiu,radiu,radiu,radiu,radiu,radiu,radiu}).setColor(0xffffffff))
--定义爬取链接
url="https://bing.ioliu.cn/"
--Http请求源码
Http.get(url,nil,"utf8",nil,function(状态码,网页源码)
  --等待窗口隐藏
  dialog3.hide()
  --判断状态码，确认网站可访问
  if 状态码==200 then
    --筛选图片链接数据
    图片链接迭代器=网页源码:gmatch('src="(https://h1.ioliu.cn/bing/.-jpg)"')
    --创建图片链接表，用于存储抓取到的图片链接
    图片链接={}
    --迭代抓取到的图片链接
    for i in 图片链接迭代器 do
      --将图片链接存入表中
      table.insert(图片链接,i)
    end
    --遍历图片链接表
    for k,v in pairs(图片链接) do
      --创建布局，用于显示每一张图片
      单张壁纸={
        LinearLayout;--线性布局
        Orientation='vertical';--布局方向
        layout_width='fill';--布局宽度
        layout_height='50%w';--布局高度
        background='';--布局背景颜色(或者图片路径)
        Gravity="center";
        {
          CardView;--卡片控件
          layout_margin='10';--卡片边距
          layout_gravity='center';--重力属性
          Elevation='0';--阴影属性
          layout_width='fill';--卡片宽度
          layout_height='fill';--卡片高度
          radius='20';--卡片圆角
          CardBackgroundColor='';--卡片背景颜色
          {
            ImageView;--图片控件
            id="图片";
            src="";--图片路径
            layout_width='fill';--图片宽度
            layout_height='fill';--图片高度
            layout_gravity='center';--重力属性
          };
        };
      };
      --将布局添加至主布局
      壁纸.addView(loadlayout(单张壁纸))
      --设置在线图片显示
      图片.setImageBitmap(LuaBitmap.getHttpBitmap(v))
    end
  else
    print("无法访问")
  end
end)
```

爬取网页分类实战

```lua
--首先创建一个布局，为教程提供良好的可视化
shamrock=
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或者图片路径)
  Gravity='center';--设置居中
  {
    TextView;--文本控件
    id='文本';--绑定ID
    layout_margin='5%w';--布局外边距
    layout_width='wrap';--文本宽度
    layout_height='wrap';--文本高度
    Gravity='center';--重力属性
    textColor='#000000';--文本颜色
    text='爬取内容中';--显示的文本
    textSize='18sp';--文本大小
  };
};
activity.setContentView(loadlayout(shamrock))
--设置需要爬取的网站，可以随意更换
url = 'http://dh.hfybbs.vip/cn/index.html'

--使用Http访问该网站，获取网页源码
Http.get(url,nil,'utf8',nil,function(状态码,网页源码)
  --判断返回状态码，确定网站的正常运行
  if 状态码 ==200 then
    --分析网页源码，使用gmatch筛选出所有符合条件的内容，gamtch返回的是迭代器
    网页框架 = 网页源码:gmatch('<ul.->(.-)</ul>')
    --定义一个空表，用来存储获取的网页数据
    网页框架表 = {}
    --将gmatch函数返回的迭代器进行遍历，取出数据，然后存进网页框架表表
    for i in 网页框架 do
      --判断是否可以筛选需要爬取的内容，可以才存放进网页框架表
      if i:match('<span.->(.-)</span>') then
        table.insert(网页框架表,i:match('<span.->(.-)</span>'))
      end
    end
    --定义一个空字符串，用于显示效果
    显示文本 = ''
    --遍历表，将爬取到的数据取出
    for k,v in pairs(网页框架表) do
      --累加文本，将表内数据形成可视化
      显示文本=显示文本..'\n'..string.format('分类%d：%s',k,v)
    end
    --设置文本显示，显示爬取效果
    文本.setText(显示文本)
  else
    文本.setText('获取内容失败')
  end
end)
```

翻页爬取论坛实战

```lua
--创建布局，用于显示爬取效果
--翻页爬取的思路是：
--获取网页的翻页所有链接，然后循环请求爬取
shamrock=
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或者图片路径)
  {
    ScrollView;--纵向滚动
    layout_width='fill';--宽
    layout_height='fill';--高
    {
      TextView;--文本控件
      id='显示文本';--绑定ID
      layout_width='fill';--文本宽度
      layout_height='fill';--文本高度
      Gravity='center';--重力属性
      textColor='#000000';--文本颜色
      text='正在爬取中';--显示的文本
      textSize='16sp';--文本大小
    };
  };
};
activity.setContentView(loadlayout(shamrock))--将布局添加至窗口
--定义爬取翻页链接的网址
url = 'https://yum5.cn'
--请求链接
Http.get(url,nil,'utf8',nil,function(状态码,网页源码)
  --判断网站状态
  if 状态码 == 200 then
    --获取所有页数链接
    页数迭代器 = 网页源码:gmatch('<a href="index.-htm" class="page.-">(.-)</a>')
    --新建表，存放爬取数据
    页数={}
    --迭代页数迭代器，将数据存入表
    for i in 页数迭代器 do
      --这里筛选数字，因为部分数据是杂乱的
      if i:find('%d') then
        table.insert(页数,i:match('(%d.*)'))
      end
    end
    --获取到页数
    末尾页数 = tointeger(页数[#页数])
    --新建表，存放帖子标题
    帖子标题 = {}
    --循环页数
    for i=1,末尾页数 do
      --将页数拼接进链接
      url = 'https://yum5.cn/index-'..i..'.htm'
      --请求网页
      Http.get(url,nil,'utf8',nil,function(状态码,网页源码)
        --判断网站状态
        if 状态码 == 200 then
          --显示当前爬取页数
          table.insert(帖子标题,'第'..i..'页:\n\n')
          --爬取帖子标题信息
          帖子标题迭代器 = 网页源码:gmatch('<a href="thread.-htm">(.-)</a>')
          --迭代帖子标题迭代器，将数据存入表
          for v in 帖子标题迭代器 do
            table.insert(帖子标题,v)
          end
          --定义空文本，用于显示数据
          文本=''
          --遍历表，取出数据
          for k,v in pairs(帖子标题) do
            --将数据文本累加
            文本=文本..k..'：'..v..'\n'
          end
          --展示数据
          显示文本.setText(文本)
        else
          显示文本.setText('无法访问')
        end
      end)
    end
  else
    显示文本.setText('无法访问')
  end
end)
```

获取网页标题实战

```lua
--首先创建一个布局，为教程提供良好的可视化
shamrock=
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或者图片路径)
  Gravity='center';--设置居中
  {
    TextView;--文本控件
    id='文本';--绑定ID
    layout_margin='5%w';--布局外边距
    layout_width='wrap';--文本宽度
    layout_height='wrap';--文本高度
    Gravity='center';--重力属性
    textColor='#000000';--文本颜色
    text='查询网站标题中';--显示的文本
    textSize='18sp';--文本大小
  };
};
activity.setContentView(loadlayout(shamrock))
--设置需要爬取的网站，可以随意更换
url = 'http://dh.hfybbs.vip'

--使用Http访问该网站，获取网页源码
Http.get(url,nil,'utf8',nil,function(状态码,网页源码)
  --判断返回状态码，确定网站的正常运行
  if 状态码 ==200 then
    --分析网页结构，发现标题在title标签内，所以进行截取
    title = 网页源码:match('<title>(.-)</title>')
    --将截取到的标题设置至文本显示
    文本.setText(title)
  else
    文本.setText('该网站无法访问')
  end
end)
```

讯飞远程更新实战

```lua
--[[
很多同学似乎还不会远程更新，其实所谓讯飞远程更新也就是爬虫的
一种运用方式，结合前面所学和查看下面的链接的网页结构
你就能写出属于你的远程更新。
]]
SorrowClover=--随便写的一个布局，没有任何意义。
{
  LinearLayout;--线性布局
  Orientation='vertical';--布局方向
  layout_width='fill';--布局宽度
  layout_height='fill';--布局高度
  background='#ffffff';--布局背景颜色(或图片路径)
};
activity.setContentView(loadlayout(SorrowClover))--显示布局
--定义一个你的讯飞远程链接
--可以复制到浏览器看看网页结构
url="讯飞链接"
--使用http获取网页源码
Http.get(url,nil,"utf8",nil,function(code,content)
  --判断网页状态
  if code==200 then
    --获取当前应用包名
    包名=activity.getPackageName()
    --利用包名获取到当前版本号
    当前版本=tonumber(activity.getPackageManager().getPackageInfo(包名, 0).versionName)
    --获取远程更新版本号
    更新版本=tonumber(content:match("【版本】(.-)【版本】"))
    --比较版本号
    if 更新版本 > 当前版本 then
      --制作对话框，显示更新提示
      更新说明=content:match("【更新说明】(.-)【更新说明】")
      更新链接=content:match("【更新链接】(.-)【更新链接】")
      AlertDialog.Builder(this)
      .setTitle("你有新版本更新")
      .setMessage(更新说明)
      .setPositiveButton("更新",{onClick=function(v)
          import "android.content.Intent"
          import "android.net.Uri"
          url=更新链接
          viewIntent = Intent("android.intent.action.VIEW",Uri.parse(url))
          activity.startActivity(viewIntent)
        end})
      .setNegativeButton("取消",nil)
      .show()
      --判断正版软件
    elseif 更新版本 < 当前版本 then
      更新链接=content:match("【更新链接】(.-)【更新链接】")
      AlertDialog.Builder(this)
      .setTitle("公告")
      .setMessage("软件已出新版本，请更新后使用")
      .setPositiveButton("下载更新",{onClick=function(v)
          import "android.content.Intent"
          import "android.net.Uri"
          url=更新链接
          viewIntent = Intent("android.intent.action.VIEW",Uri.parse(url))
          activity.startActivity(viewIntent)
        end})
      .setNegativeButton("取消",nil)
      .show()
    else
      print("已是最新版本")
    end
  else
    print("检测更新失败")
  end
end)
```
