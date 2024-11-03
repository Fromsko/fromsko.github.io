---
title: FAS
createTime: 2024/05/28 18:08:00
permalink: /article/n0xhezlz/
---
FA中文函数概述
```lua
FA很贴心的封装了中文函数：
1，进入子页面
用法：进入子页面("子页面名称")
高级用法：进入子页面("子页面名称",{链接=url})
从这里传给子页面的链接，在子页面会直接访问链接并触发网页加载事件

2，加载JS
用法：加载Js([[JavaScript代码]])
列举一些常用的JS代码：
加载Js([[var para = document.createElement("p");]])--代码是用于创建 <p> 元素
加载Js([[var node = document.createTextNode("这是一个新的段落。");]])--为 <p> 元素添加文本节点
加载Js([[para.appendChild(node);]])--将文本节点添加到 <p> 元素中
加载Js([[var element = document.getElementById("div1");]])--查找已存在的元素
加载Js([[element.appendChild(para);]])--添加到已存在的元素中
--[[
上面代码可以简写成：
加载Js([[
var para = document.createElement("p");
var node = document.createTextNode("这是一个新的段落。");
para.appendChild(node);
var element = document.getElementById("div1");
element.appendChild(para);
]])
]]
JS对于网页的增删改查(以下代码起作用的只有<script>框内的代码，前面的是h5网页代码，用做示例)：
增：
--[[
使用了 appendChild() 方法，用于添加新元素到尾部。
需要将新元素添加到开始位置，可以使用 insertBefore() 方法。
<div id="div1">
<p id="p1">这是一个段落。</p>
<p id="p2">这是另外一个段落。</p>
</div>

<script>
var para = document.createElement("p");--创建标签
var node = document.createTextNode("这是一个新的段落。");--创建文本节点
para.appendChild(node);--将文本节点添加至标签

var element = document.getElementById("div1");--寻找网页中id为div1的元素
var child = document.getElementById("p1");--寻找网页中id为p1的元素
element.insertBefore(para, child);--将创建的标签添加至div1下的p1的前面
</script>
]]

删：
--[[
要移除一个元素，你需要知道该元素的父元素。
因为早期的 Internet Explorer 浏览器不支持 node.remove() 方法。
不在意兼容性可以直接用remove()
<div id="div1">
<p id="p1">这是一个段落。</p>
<p id="p2">这是另外一个段落。</p>
</div>

<script>
var parent = document.getElementById("div1");--寻找id为div1的元素
var child = document.getElementById("p1");--寻找id为p1的元素
parent.removeChild(child);--将div1下的p1删除
</script>
]]

改：
--[[
使用 replaceChild() 方法来替换 HTML DOM 中的元素。
<div id="div1">
<p id="p1">这是一个段落。</p>
<p id="p2">这是另外一个段落。</p>
</div>

<script>
var para = document.createElement("p");--创建一个p标签
var node = document.createTextNode("这是一个新的段落。");--创建一个文本节点
para.appendChild(node);--将文本节点添加至p标签

var parent = document.getElementById("div1");--寻找id为div1的标签
var child = document.getElementById("p1");--寻找id为p1的标签
parent.replaceChild(para, child);--将div1下的p1替换成新建的p标签
</script>
]]

查：
--[[
这里不做代码演示，将js的常用获取api一一列举
document.activeElement --返回当前获取焦点元素
document.anchors --返回对文档中所有 Anchor 对象的引用。
document.baseURI --返回文档的绝对基础 URI
document.body --返回文档的body元素
document.cookie --设置或返回与当前文档有关的所有 cookie。
document.doctype --返回与文档相关的文档类型声明 (DTD)。
document.documentElement --返回文档的根节点
document.documentMode --返回用于通过浏览器渲染文档的模式
document.documentURI --设置或返回文档的位置
document.domain --返回当前文档的域名。
document.embeds --返回文档中所有嵌入的内容（embed）集合
document.forms --返回对文档中所有 Form 对象引用
document.getElementsByClassName() --返回文档中所有指定类名的元素集合，作为 NodeList 对象。
document.getElementById() --返回对拥有指定 id 的第一个对象的引用。
document.getElementsByName() --返回带有指定名称的对象集合。
document.getElementsByTagName() --返回带有指定标签名的对象集合。
document.images --返回对文档中所有 Image 对象引用。
ocument.implementation --返回处理该文档的 DOMImplementation 对象。
document.inputEncoding --返回用于文档的编码方式（在解析时）。
document.lastModified --返回文档被最后修改的日期和时间。
document.links --返回对文档中所有 Area 和 Link 对象引用。
document.readyState --返回文档状态 (载入中……)
document.referrer --返回载入当前文档的文档的 URL。
document.scripts --返回页面中所有脚本的集合。
document.title --返回当前文档的标题。
document.URL --返回文档完整的URL
]]
这些都是原生JS语句，使用起来比较繁琐，JS有一个十分强大的库：jQuery
这个用起来就十分的简单，但不是每个网页都加载了这个库，所以使用前需要在网页中注入JS：
加载JS([[
var hm = document.createElement("script");
hm.src = "http://libs.baidu.com/jquery/2.0.0/jquery.min.js";
var s = document.getElementsByTagName("title")[0]; 
s.parentNode.insertBefore(hm, s);
]])
然后就可以使用jQuery库的语句了，下面简单说下它的增删改查API
增：
append和prepend方法：
$("p").append("追加文本"); --在p标签结尾处插入文本
$("p").prepend("在开头追加文本"); --在p标签开头处插入文本
$("body").append(txt1,txt2,txt3); --可以一次性添加多个文本
after和before方法：
$("img").after("在后面添加文本");
$("img").before("在前面添加文本");
$("img").after(txt1,txt2,txt3); 

删：
$("#div1").remove(); --删除ID为div1的元素
$("#div1").empty(); --删除ID为div1的子元素
$("p").remove(".italic"); --删除类名为italic下的所有p元素

改：
$("#test1").text("Hello world!"); --将id为test1的元素文本设置为Hello world!
$("#test2").html("<b>Hello world!</b>"); --将id为test2的元素html设置为<b>Hello world!</b>
$("#test3").attr("href","http://www.baidu.com/"); --将id为test3的元素的href属性值设置为http://www.baidu.com/
$("#test4").attr({
"href" : "http://www.baidu.com/",
"title" : "百度"
}); --可以用json形式赋予多次属性值

查：
$("*") --所有元素
$("#lastname") --id="lastname" 的元素
$(".intro") --class="intro" 的所有元素
$(".intro,.demo") --class 为 "intro" 或 "demo" 的所有元素
$("p") --所有 <p> 元素
$("h1,div,p") --所有 <h1>、<div> 和 <p> 元素
$("p:first") --第一个 <p> 元素
$("p:last") --最后一个 <p> 元素
$("tr:even") --所有偶数 <tr> 元素，索引值从 0 开始，第一个元素是偶数 (0)，第二个元素是奇数 (1)，以此类推。
$("tr:odd") --所有奇数 <tr> 元素，索引值从 0 开始，第一个元素是偶数 (0)，第二个元素是奇数 (1)，以此类推。
$("p:first-child") --属于其父元素的第一个子元素的所有 <p> 元素
$("p:first-of-type") --属于其父元素的第一个 <p> 元素的所有 <p> 元素
$("p:last-child") --属于其父元素的最后一个子元素的所有 <p> 元素
$("p:last-of-type") --属于其父元素的最后一个 <p> 元素的所有 <p> 元素
$("p:nth-child(2)") --属于其父元素的第二个子元素的所有 <p> 元素
$("p:nth-last-child(2)") --属于其父元素的第二个子元素的所有 <p> 元素，从最后一个子元素开始计数
$("p:nth-of-type(2)") --属于其父元素的第二个 <p> 元素的所有 <p> 元素
$("p:nth-last-of-type(2)") --属于其父元素的第二个 <p> 元素的所有 <p> 元素，从最后一个子元素开始计数
$("p:only-child") --属于其父元素的唯一子元素的所有 <p> 元素
$("p:only-of-type") --属于其父元素的特定类型的唯一子元素的所有 <p> 元素
$("div > p") --<div> 元素的直接子元素的所有 <p> 元素
$("div p") --<div> 元素的后代的所有 <p> 元素
$("div + p") --每个 <div> 元素相邻的下一个 <p> 元素
$("div ~ p") --<div> 元素同级的所有 <p> 元素
$("ul li:eq(3)") --列表中的第四个元素（index 值从 0 开始）
$("ul li:gt(3)") --列举 index 大于 3 的元素
$("ul li:lt(3)") --列举 index 小于 3 的元素
$("input:not(:empty)") --所有不为空的输入元素
$(":header") --所有标题元素 <h1>, <h2> ...
$(":animated") --所有动画元素
$(":focus") --当前具有焦点的元素
$(":contains('Hello')") --所有包含文本 "Hello" 的元素
$("div:has(p)") --所有包含有 <p> 元素在其内的 <div> 元素
$(":empty") --所有空元素
$(":parent") --匹配所有含有子元素或者文本的父元素。
$("p:hidden") --所有隐藏的 <p> 元素
$("table:visible") --所有可见的表格
$(":root") --文档的根元素
$("p:lang(de)") --所有 lang 属性值为 "de" 的 <p> 元素
$("[href]") --所有带有 href 属性的元素
$("[href='default.htm']") --所有带有 href 属性且值等于 "default.htm" 的元素
$("[href!='default.htm']") --所有带有 href 属性且值不等于 "default.htm" 的元素
$("[href$='.jpg']") --所有带有 href 属性且值以 ".jpg" 结尾的元素
$("[title|='Tomorrow']") --所有带有 title 属性且值等于 'Tomorrow' 或者以'Tomorrow' 后跟连接符作为开头的字符串
$("[title^='Tom']") --所有带有 title 属性且值以 "Tom" 开头的元素
$("[title~='hello']") --所有带有 title 属性且值包含单词 "hello" 的元素
$("[title*='hello']") --所有带有 title 属性且值包含字符串 "hello" 的元素
$( "input[id][name$='man']" ) --带有 id 属性，并且 name 属性以 man 结尾的输入框
$(":input") --所有 input 元素
$(":text") --所有带有 type="text" 的 input 元素
$(":password") --所有带有 type="password" 的 input 元素
$(":radio") --所有带有 type="radio" 的 input 元素
$(":checkbox") --所有带有 type="checkbox" 的 input 元素
$(":submit") --所有带有 type="submit" 的 input 元素
$(":reset") --所有带有 type="reset" 的 input 元素
$(":button") --所有带有 type="button" 的 input 元素
$(":image") --所有带有 type="image" 的 input 元素
$(":file") --所有带有 type="file" 的 input 元素
$(":enabled") --所有启用的元素
$(":disabled") --所有禁用的元素
$(":selected") --所有选定的下拉列表元素
$(":checked") --所有选中的复选框选项
$( "p:target" ) --选择器将选中ID和URI中一个格式化的标识符相匹配的<p>元素

3，加载网页
加载网页("url")
会在当前界面访问url链接

4，停止加载
停止加载()
注意加括号，FA里少写了，不加括号会报错。

5，刷新网页
刷新网页()
刷新当前网页访问状态
会触发网页加载事件

6，网页前进
网页前进()
加载使用网页后退方法时的网页
单独使用没有效果，需要配合网页后退使用

7，网页后退
网页后退()
访问前一次的访问链接
会触发网页加载事件

8，返回网页顶部
返回网页顶部()
通过JS实现的滚动滚轮至网页最顶部

9，阅读模式
阅读模式()
通过JS实现，更改网页排版等，使其便于阅读

10，显示对话框
对话框()
.设置标题("对话框标题")
.设置消息("对话框消息")
.设置积极按钮("确定",function()
显示消息("点击了确定")--这里是确定按钮点击事件
end)
.设置消极按钮("取消")--这后面也可以设置取消按钮点击事件，仿照确实按钮点击事件
.显示()--显示对话框

11，泡沫对话框
泡沫对话框(301)
.设置标题("标题")
.设置消息([[消息]])
.设置积极按钮("确定",function()
显示消息("点击了确定")
end)
.设置消极按钮("取消")
.显示()
--方法类似对话框，但泡沫对话框只会在初次进入软件时显示

12，弹出消息
弹出消息("消息内容")
在屏幕中显示一段内容，非print，是用Toast实现的，所以参数有限制。

13，退出程序
退出程序()
顾名思义，即退出软件

14，退出页面
退出页面()
退出当前页面，返回上一次的页面，如已在首页，则退出软件。

15，复制文本
复制文本("文本内容")
将文本复制至手机剪切板

16，分享文本
分享文本("文本内容")
弹出手机分享窗口，将文本分享

17，分享链接
分享文本(webView.getUrl())
即分享文本功能，文本为当前网页链接而已

18，发生邮件
发送邮件("邮箱")
顾名思义(我也没用过)

19，联系QQ
联系QQ(1467602180)
弹出QQ咨询窗口，可直接聊天

20，加QQ群
加QQ群(QQ群号)
弹出加群界面

21，页内查找
页内查找("词")
在当前网页寻找关键字，并将其高亮显示
通过JS实现，即寻找匹配关键字并将焦点转移

22，点击元素
点击元素("元素类名")
--即使是被网页控制屏蔽的元素，也可以使用该代码点击
模拟点击网页事件，如网页中的分类按钮，将其屏蔽后，可以自己设置按钮点击显示它

23，下载文件
下载文件("文件链接")
顾名思义
通过http.download方法实现

24，执行Shell
执行Shell("shell命令")
Shell为linux命令行语句，安卓本身也是linux系统，所以支持调用
比如：
执行Shell("rm-r 路径") --删除文件

--小何阐述
FA提供的中文函数十分强大和好用，如果能够灵活运用的话，你的webApp会焕然一新，甚至能做到不需要布局，单凭网页做出优秀的应用。
```

FA部分实用代码概述
```lua
--网页即将加载
if(网页链接:find"关键字(可用正则匹配)")then
停止加载()
进入子页面("游览",{链接=网页链接})
end

--加载本地网页
("file:///android_asset/drawable/index.html")

--如何调用浏览器打开当前页面？
import "android.content.Intent"
import "android.net.Uri"
url="https://www.lanzous.com/b251218"
viewIntent = Intent("android.intent.action.VIEW",Uri.parse(url))
activity.startActivity(viewIntent)
--浏览器打开链接

--收到新标题
设置顶栏标题(webView.title)

--项目点击事件
进入子页面("子页面名",{链接="url",标题="标题名"})

--去头部留白
document.body.style.paddingTop=0--此处用的是JS

--显示或隐藏悬浮按钮
--显示悬浮按钮
fltBtn.setVisibility(View.VISIBLE)
--隐藏悬浮按钮
fltBtn.setVisibility(View.GONE)
--注:fltBtn为悬浮按钮的ID，不需要更改。

--悬浮点击事件
加载Js([[document.getElementsByClassName("apk_topbar_btn")[0].parentElement.onclick()]])

--悬浮选择点击事件
pop=PopupMenu(activity,fltBtn)
menu=pop.Menu
menu.add("选项一").onMenuItemClick=function(a)
进入子页面("子页面名",{链接="url1"..webView.getUrl()})
end
menu.add("选项二").onMenuItemClick=function(a)
进入子页面("子页面名",{链接="url2"..webView.getUrl()})
end
pop.show()

--设置屏幕方向
import "android.content.pm.ActivityInfo"
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
--视频解析播放
加载网页("vip解析url"..webView.getUrl());
--横屏
activity.setRequestedOrientation(0); 
--竖屏
activity.setRequestedOrientation(1); 

--各控件ID
searchEdtTxt 搜索栏
toolbar.parent 顶栏
toolbar 标题栏
titleTvw 顶栏标题
webView 浏览器
fltBtn 悬浮按钮
pager 滑动窗体
popmenu_position 菜单栏
sidebar 侧滑栏显示图标
pgsBar 进度条
sideLvw 侧滑图标
menu_button 菜单图标
menuBtn 侧滑栏图标

//开启和关闭侧滑
--打开侧滑
drawerLayout.openDrawer(3)
--关闭侧滑
drawerLayout.closeDrawer(3) 

--均放在点击事件
--自定义底栏点击事件

index=1--底栏项目序号

bmBarLin.getChildAt(index-1).onClick=function()
--点击事件
end

--自定义标签栏点击事件

local index=1--标签栏项目序号

tabBar.getChildAt(index-1).onClick=function()

--点击事件

end
-- 多页面搜索 --
-- By: QQ3
local urls={"https://www.google.com/search?q=%s","https://m.baidu.com/s?wd=%s","https://m.so.com/s?q=%s","http://cn.bing.com/search?q=%s","http://m.chinaso.com/page/search.htm?keys=%s","https://m.sogou.com/web/searchList.jsp?keyword=%s","https://m.sm.cn/s?q=%s"}
searchEdtTxt.setOnEditorActionListener{
onEditorAction=function(view,action,event)
local text=tostring(view.text)
if text~=nil and text~="" then
searchEdtTxt.setHint(text)
local URLEncodeer=import"java.net.URLEncoder"
for index in pairs(urls) do
if allWebView[index] and urls[index]~=nil and urls[index]~="" then
local url=tostring(urls[index]):format(URLEncoder.encode(text))
if pager.getCurrentItem()+1==index then
task(100,function()allWebView[index].loadUrl(url)end)--解决当前页面无法加载（与默认搜索事件冲突被覆盖）的问题
else
allWebView[index].loadUrl(url)
end
end
end
else
SearchEdtTxt.setHint("")
end
end
}

--[[--小何补充
1，FA的子页面传参问题，因为FA的特殊性，所以一般的传参无法实现
但可以利用FA自带的方法实现传参
例如：]]
参数 = "demo"
进入子页面("测试",{链接="http://www.baidu.com/?参数="..参数})
--然后在测试子页面的网页即将加载事件里停止加载
浏览器对象,网页链接=...--注意这句话很重要，这里是接收参数
停止加载()
参数 = 网页链接:match("参数%=.+")
--这样就成功接收到参数了，这只是个实例，代码不一定能照搬。

2，FA的模板
FA提供了丰富的模板供我们使用：
顶栏模板(提供顶栏(标题栏)，侧滑栏，悬浮按钮)

标签栏模板(提供标签栏(上方的多选项菜单，可以实现多网页或者布局)，顶栏(标题栏)，侧滑栏，悬浮按钮)

底栏模板(提供底栏(下方的多选项菜单，可以设置图标，也可以实现多网页或者多布局)，顶栏(标题栏)，侧滑栏)

纯底栏模板(提供底栏)

空白模板(啥也没有)

其中最适合开发的是顶栏模板，出问题最多的是空白模板(FA的库特殊的问题)
这些模板的自定义性还是很高的，长，宽，高，颜色，图标等都可以自定义

3，FA的库问题
FA的库比较特殊，所以在弄研究开发时，会出现很多莫名其妙的问题
例如bmob cjson库，在FA测试阶段是可以正常使用，但打包安装后就报错提示没有此库
还有FA的CardView组件库很特殊，如果遇到有依赖关系的事件，会出现圆角丢失等情况，导入AndroLua标准库即可解决
所以需要用到的，可以自己去找到库文件导入，也可以联系到我QQ：1467602180，我发给你

4，打包解析错误
仔细检查工程目录，不得出现任何中文字符以及错误文件和无法识别文件
子页面数量到达一定程度也会出现
具体数量看机型而有所不同
```

FusionApp概述
```lua
FusionApp(简称:FA)是一款新概念"网页转应用"的应用。
它可以将网页翻新改造，获得优异至近乎的客户端的体验。它会让你爱上调♂教网页的感觉。

【概念】

它提倡将网页中的组件元素删除，并使用安卓原生组件替代，以此获得良好的交互体验并让整个网页焕然一新，就像真的客户端一样。

相比于一个木函中的"网页转应用"，此物可谓是比之强千百倍。

FusionApp提出UI模板制，您可对照需要转应用的网页，选取合适的UI模板，进行定制。

【灵活动态，简单易用】

FusionApp的UI模板的组件可自由装卸与定制，这使它可以与网页内容充分融合。它可自由的定制应用元素的点击事件，和方方面面的东西，且配置起来也非常简单，任何人都能轻松上手。

【一条龙服务】

为了方便起见与降低门槛，FusionApp资瓷了如下辅助功能:

1.图标仓库

内含一千多矢量的质感图标与扁平图标，它可解决您在配置应用UI时需要用到图标的需求。

2.图标设计器

它可为你设计美观大方的应用图标，且也可方便的从图标仓库中选取素材。

3.包名查错与包名生成

4.应用配色参考

【小何阐述】
FA的出现，使webApp在一段时间里十分流行，简单的打包便可拥有一个属于你自己的应用，这份感觉不言而喻。

FA的核心是网页转应用，并为此提供了网页判断，筛选删除网页元素等功能，且做了良好的可视化，可操作化，使得制作webApp的几乎没有任何难度。

但这同时也是它的局限性，FA如果用于主力开发AndroLua应用的话，就会出现很多小问题和效率的低下。

本篇教程会带领大家体会FA的魅力，和各种便利性。
```

部分布局代码
```lua
--线性布局--
 {
  LinearLayout,--线性布局
  orientation="vertical",--布局方向
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--线性布局结束
 
--帧布局--
 {
  FrameLayout,--帧布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--帧布局结束
 
--相对布局--
 {
  RelativeLayout,--相对布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--相对布局结束
 
--绝对布局--
 {
  AbsoluteLayout,--绝对布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--绝对布局结束
 
--表格布局--
 {
  TableLayout,--表格布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--表格布局结束
 
--纵向滑动控件--
 {
  ScrollView,--纵向滑动控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  overScrollMode=View.OVER_SCROLL_NEVER,--隐藏圆弧阴影
  verticalScrollBarEnabled=false,--隐藏纵向滑条
  {
    LinearLayout,--线性布局
    orientation="vertical",--布局方向
    layout_width="fill",--布局宽度
    layout_height="fill",--布局高度
  },--线性布局结束
},--纵向滑动控件结束
 
--横向滑动控件--
 {
  HorizontalScrollView,--横向滑动控件
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  overScrollMode=View.OVER_SCROLL_NEVER,--隐藏圆弧阴影
  horizontalScrollBarEnabled=false,--隐藏横向滑条
  {
    LinearLayout,--线性布局
    orientation="horizontal",--布局方向
    layout_width="fill",--布局宽度
    layout_height="fill",--布局高度
    gravity="left|center",--重力居左｜置中
  },--线性布局结束
},--横向滑动控件结束
 
--文本框控件--
 {
  TextView,--文本框控件
  text="文本内容",--文本内容
  textSize="15sp",--文本大小
  textColor="#333333",--文本颜色
  --singleLine=true,--禁止换行输入
}, 
--纽扣控件--
 {
  Button,--纽扣控件
  layout_width="wrap",--布局宽度
  layout_height="wrap",--布局高度
  padding="2dp",--布局填充
  text="纽扣名称",--文本内容
}, 
--图片框控件--
 {
  ImageView,--图片框控件
  layout_width="56dp",--布局宽度
  layout_height="25dp",--布局高度
  src="icon.png",--视图路径
}, 
--圆形图片控件--
 {
  CircleImageView,--圆形图片控件
  layout_width="60dp",--布局宽度
  layout_height="60dp",--布局高度
  src="icon.png",--视图路径
}, 
--卡片框控件--
 {
  CardView,--卡片框控件
  layout_width="80dp",--布局宽度
  layout_height="80dp",--布局高度
  cardElevation="2dp",--卡片提升
  cardBackgroundColor="#ffffff",--卡片背景色
  radius="10dp",--圆角半径
},--卡片框控件结束
 
--编辑框控件--
 {
  EditText,--编辑框控件
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  hint="输入内容",--编辑框内容为空时提示
  textSize="15sp",--文本大小
  singleLine=true,--禁止换行输入
  id="edit",--控件ID
}, 
--浏览器控件--
 {
  LuaWebView,--浏览器控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  id="llq",--控件ID
}, 
--视频控件--
 {
  VideoView,--视频控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  id="shiping",--控件ID
}, 
--水平分割线--
 水平分割线={
  TextView,--水平分割线
  layout_width="fill",--布局宽度
  layout_height="1px",--布局高度
  layout_gravity="center",--重力居中
  backgroundColor="#ffbebebe",--背景色
} 
--垂直分割线--
 垂直分割线={
  TextView,--垂直分割线
  layout_width="1px",--布局宽度
  layout_height="fill",--布局高度
  layout_gravity="center",--重力居中
  backgroundColor="#ffbebebe",--背景色
} 
--针角分割线--
 {
  CardView,--针角分割线
  layout_width="190%w",--布局宽度
  layout_height="1px",--布局高度
  layout_gravity="center",--重力居中
  cardBackgroundColor="#FFBEBEBE",--卡片背景色
  cardElevation="0dp",--卡片提升
  radius="200dp",--圆角半径
}, 
--进度条控件--
 {
  ProgressBar,--进度条控件
  layout_width="60dp",--布局宽度
  layout_height="60dp",--布局高度
}, 
--单选控件--
 {
  RadioGroup,--单选控件
  orientation="vertical",--布局方向
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  gravity="left|center",--重力居左｜置中
  {
    RadioButton,--单选按钮控件
    layout_width="fill",--布局宽度
    layout_height="wrap",--布局高度
    text="文本内容",--文本内容
    --checked=true,--是否选中
  },
},--单选控件结束
 
--复选框控件--
 {
  CheckBox,--复选框控件
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  text="文本内容",--文本内容
  checked=true,--是否选中
}, 
--开关控件--
 {
  Switch,--开关控件
  switchMinWidth="50%w",--开关最小宽度
  switchPadding="10%w",--设置开关与文字的空白距离
  text="文本内容",--文本内容
  textSize="16sp",--文本大小
  textColor="#ff0000",--文本颜色
  textOff="开",--设置开关checked的文字
  textOn="关",--设置开关关闭时的文字  
  showText=true,--设置是否显示开关上的文字（API21及以上）
  id="kaig",--控件ID
}, 
--页面视图控件--
 {
  PageView,--页面视图控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  layout_weight="1",--重力分配
  id="huadong",--控件ID
  pages={
    页面名称1,
    页面名称2,
    页面名称3,
  },--页面控件结束
},--页面视图控件结束
 
--列表视图控件--
 {
  ListView,--列表视图控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  dividerHeight="1",--分割线高度
  verticalScrollBarEnabled=false,--隐藏滑条
}, 
--网格控件--
 {
  GridView,--网格控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  gravity="center",--重力居中
  numColumns="3",--设置列数
  overScrollMode="2",--去除滑动圆弧形
  verticalScrollBarEnabled=false,--隐藏滑条
  id="list",--控件ID
}, 
--堆栈视图控件--
 {
  StackView,--堆栈视图控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
}, 
--表面视图控件--
 {
  SurfaceView,--表面视图控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
}, 
--多级列表控件--
 {
  ExpandableListView,--多级列表控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  dividerHeight="0",--去掉分割线，则修改为1
  verticalScrollBarEnabled=false,--隐藏滑条
}, 
--拖动条控件--
 {
  SeekBar,--拖动条控件
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  layout_weight="1",--重力分配
  layout_gravity="center",--重力居中
}, 
--查看视图控件--
 {
  View,--查看视图控件
  layout_width="fill",--布局宽度
  layout_height="1px",--布局高度
}, 
--按钮控件--
 {
  ToggleButton,--按钮控件
  layout_width="40%w",--布局宽度
  layout_height="50dp",--布局高度
}, 
--图片按钮控件--
 {
  ImageButton,--图片按钮控件
  layout_width="50dp",--布局宽度
  layout_height="50dp",--布局高度
  src="icon.png",--视图路径
}, 
--Lua编辑控件--
 {
  LuaEditor,--lua编辑框控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  layout_weight="1",--重力分配
  id="edit",--控件ID
},
```

部分属性代码
```lua
--垂直方向 
 orientation="vertical",--垂直方向 
--水平方向 
 orientation="horizontal",--水平方向 
--布局宽度 
 layout_width="fill",--布局宽度 
--布局高度 
 layout_height="fill",--布局高度 
--权重值分配 
 layout_weight="1",--权重值分配 
--重力属性 
 gravity="center",--顶：top｜中：center｜左：left｜右：right｜底：bottom 
--布局背景 
 background="#ffffffff",--布局背景 
--控件设置ID 
 id="button",--控件ID 
--单击事件 
 onClick=function()--单击事件
end,--单击事件 结束 
--↹布局边距 
 layout_margin="8dp",--布局边距 
--∧布局顶距 
 layout_marginTop="15dp",--布局顶距 
--＜布局左距 
 layout_marginLeft="4%w",--布局左距 
--＞布局右距 
 layout_marginRight="4%w",--布局右距 
--∨布局底距 
 layout_marginBottom="15dp",--布局底距 
--布局填充 
 padding="2dp",--布局填充 
--重力居顶↑置中 
 gravity="top|center",--重力居顶｜置中 
--重力居底↓置中 
 gravity="bottom|center",--重力居底｜置中 
--重力居顶↖置左 
 gravity="top|left",--重力居顶｜置左 
--重力居顶↗置右 
 gravity="top|right",--重力居顶｜置右 
--重力居左←置中 
 gravity="left|center",--重力居左｜置中 
--重力居右→置中 
 gravity="right|center",--重力居右｜置中 
--重力居左↙置底 
 gravity="left|bottom",--重力居左｜置底 
--重力居右↘置底 
 gravity="right|bottom",--重力居右｜置底 
--视图路径 
 src="drawable/icon.png",--视图路径 
--图片颜色 
 colorFilter="#ffffff",--图片颜色 
--图片显示类型 
 scaleType="fitXY",--图片显示类型：centerCrop 
--文本内容 
 text="文本内容",--文本内容 
--文本大小 
 textSize="16sp",--文本大小 
--文本颜色 
 textColor="#ffffff",--文本颜色 
--文本显示类型 
 typeface=Typeface.DEFAULT_BOLD,--文本显示类型 
--文本可选复制 
 textIsSelectable=true,--内容可选复制 
--圆角半径 
 radius="10dp",--圆角半径 
--卡片提升 
 cardElevation="12dp",--卡片提升 
--阴影层次 
 elevation="4dp",--阴影层次 
--卡片背景色 
 cardBackgroundColor="#ffffff",--卡片背景色 
--纽扣背景色 
 backgroundColor="#8EC0E4",--背景色 
--控件显示/隐藏/不可视 
 visibility=8,--不可视4--隐藏8--显示0 
--控件透明度 
 alpha=0.6,--控件透明度 
--开关控件颜色 
 填写控件ID.ThumbDrawable.setColorFilter(PorterDuffColorFilter(0xffff0000,PorterDuff.Mode.SRC_ATOP))--开关控件颜色 
--进度条颜色 
 填写控件ID.IndeterminateDrawable.setColorFilter(PorterDuffColorFilter(0xffff0000,PorterDuff.Mode.SRC_ATOP))--进度条颜色 
--隐藏光标 
 cursorVisible=false,--false隐藏,true则为显示 
--隐藏圆弧阴影 
 overScrollMode=View.OVER_SCROLL_NEVER,--隐藏圆弧阴影 
--输入法｜Enter键 
 imeOptions="actionSearch",--输入法Enter键 
--编辑框｜限制最多输入 
 maxLength="10",--限制最多输入文字 
--编辑框｜只可输入数字 
 inputType="number",--设置只可输入数字 
--编辑框｜禁止换行输入 
 singleLine=true,--禁止换行输入 
--编辑框｜隐藏为*号 
 password=true,--自动隐藏为*号 
--编辑框｜文字过长隐藏 
 ellipsize="end",--文字过长自动隐藏 
--编辑框｜气泡提示 
 error="请输入",--气泡提示 
--编辑框｜为空时显示 
 hint=" 请输入"--内容为空时显示 
--禁止弹出输入法 
 focusableInTouchMode=true,--禁止弹出输入法 
--禁用编辑框 
 focusable=false,--禁用编辑框 
--隐藏纵向滑条 
 verticalScrollBarEnabled=false,--隐藏纵向滑条 
--隐藏横向滑条 
 horizontalScrollBarEnabled=false,--隐藏横向滑条 
--控件是否可使用 
 enabled=false,--是否可使用 
--控件是否可点击 
 focusable=true,--是否可点击 
--调用系统窗口 
 fitsSystemWindows=true,--调用系统窗口
```

禁用动态添加脚本，防止广告加载
```lua
--全局js脚本事件

--网页即将加载事件

加载Js([[/**
* 禁用动态添加脚本，防止广告加载
*
* @param valid bool? true(valid)|false(invalid)|other(off)
* @param rule array 配置允许(valid)|不允许(invalid)的脚本规则：支持regex、string、function
*/
(function(valid, rule) {
if(typeof Element === 'undefined') console.log('IE8以下浏览器无效');
var origin = new RegExp('^' + location.origin),Ele = Element;
each(['appendChild', 'insertBefore', 'insertAfter'], proxy);

function proxy(prop) {
var proxy_obj = Ele.prototype[prop];
Ele.prototype[prop] = function(elem) {
if (!elem.children.length) {
var tag = elem.tagName.toLowerCase();
if (tag == 'script' && isBanScript(elem)) {
console.log('禁用脚本：' + elem.src);
var substitute = document.createElement('script');
substitute.innerHTML = '// 禁用脚本：' + elem.src;
elem = substitute;
}
}
return proxy_obj.apply(this, arguments);
};
}
function isBanScript(script) {
if (origin.test(script.src)) return false;
return valid === each(rule, match);

function match(val) {
var type = typeof val;
if (type === 'string') {
if (script.src == val) return true;
} else if (type === 'function') {
if (val(script)) return true;
} else {
if (val.test(script.src)) return true;
}
return false;
}
}

function each(arr, fn) {
if (arr) {
for (var i = 0, n = arr.length; i < n; i++) {
if (fn.call(arr[i], arr[i], i) === true) return false;
}
}
return true;
}
})(true, []);]])
```

悬浮去除广告
```lua
--放到全局js事件
var d=document;var s=d.createElement('script');s.setAttribute('src', 'https://greasyfork.org/scripts/368754-%E9%80%9A%E7%94%A8%E5%8E%BB%E5%B9%BF%E5%91%8A-%E6%AF%94%E8%BE%83%E6%9A%B4%E5%8A%9B-%E6%85%8E%E7%94%A8-v0-1/code/%E9%80%9A%E7%94%A8%E5%8E%BB%E5%B9%BF%E5%91%8A(%E6%AF%94%E8%BE%83%E6%9A%B4%E5%8A%9B%EF%BC%8C%E6%85%8E%E7%94%A8)V01.user.js');d.head.appendChild(s);
```

<lua>加入收藏代码
```lua
--代码分三部分
--第一部分填入 程序启动事件

--程序启动时会执行的事件


function getAllData(name)
  local data={}
  for d in each(this.getApplicationContext().getSharedPreferences(name,0).getAll().entrySet()) do
    data[d.getKey()]=d.getValue()
  end
  return data
end

function getData(name,key,MzI1NTI3MzI)
  local data=this.getApplicationContext().getSharedPreferences(name,0).getString(key,nil)--325-5273-2
  return data
end

function putData(name,key,value)
  this.getApplicationContext().getSharedPreferences(name,0).edit().putString(key,value).apply()--3255-2732
  return true
end

function removeData(name,key)
  this.getApplicationContext().getSharedPreferences(name,32552732*0).edit().remove(key).apply()--[[3(2)6?5{2}2[7]32]]
  return true
end

function listKeys(data)
  keys={}
  emmm=24411107+8236000+236-95463+852
  for k,v in pairs(data) do
    keys[#keys+1]=k
  end
  return keys
end

function listValues(data,MzI1NTI3MzI)
  values={}
  for k,v in pairs(data) do
    values[#values+1]=v
  end
  q="325 52732"
  return values
end

function adapterData(data,jdpuk)
  adpd={}
  for d in pairs(data) do
    table.insert(adpd,{
      text={
        Text=tostring(data[d]), 
      }, 
    })
  end
  return adpd
end

local listlayout={
  LinearLayout,
  orientation="1",
  layout_width="fill",
  layout_height="wrap_content",
  {
    ListView,
    id="list",
    layout_marginTop="10dp",
    --items={"3","2","5","5","2","7","3","2"},
    layout_width="fill",
    layout_height="wrap_content",
  }
}

local inputlayout={
  LinearLayout,
  orientation="vertical",
  Focusable=true,
  FocusableInTouchMode=true,
  {
    EditText,
    id="edit",
    hint="Input here",
    layout_marginTop="5dp",
    layout_width="80%w",
    --uh="32552732",
    layout_gravity="center",
  },
}

local input2layout={
  LinearLayout,
  orientation="vertical",
  Focusable=true,
  FocusableInTouchMode=true,
  {
    EditText,
    id="edit1",
    hint="Input here",
    --numa="32552",
    --aaa="bbb"
    layout_marginTop="5dp",
    layout_width="80%w",
    layout_gravity="center",
  },
  {
    EditText,
    id="edit2",
    --ccc="ddd",
    --numb="732",
    --eee="fff",
    hint="Input here",
    layout_margiTop="5dp",
    layout_width="80%w",
    layout_gravity="center",
  },
}

function showDataDialog(name,title,jdpuk)

  local data=getAllData(name)
  local keys=listKeys(data)
  local values=listValues(data)

  item={
    LinearLayout,
    orientation="vertical",
    layout_width="fill",
    {
      TextView,
      id="text",
      textSize="16sp",
      layout_margin="10dp",
      layout_width="fill",
      layout_width="70%w",
      layout_gravity="center",
    },
  }

  local adpd=adapterData(values)
  local items=LuaAdapter(this,adpd,item)

  local dlb=对话框()
  dlb.设置标题(title)
  local dl
  if #keys>0 then
    dlb.setView(loadlayout(listlayout))
    list.setDividerHeight(0)
    list.Adapter=items
    list.onItemClick=function(adp,view,position,id)--3255273 2
      webView.loadUrl(keys[id])
      if dl then
        dl.dismiss()
      end
    end
    list.onItemLongClick=function(adp,view,pos,id)--325 52732
      对话框()
      .设置标题(title)
      .setView(loadlayout(input2layout))
      .设置积极按钮("保存",function()--32552732
        if not(edit1.text=="") and not(edit2.text=="") or 3255==2732 then
          removeData(name,keys[id])
          putData(name,edit2.text,edit1.text)--32552732
          if dl then
            dl.dismiss()
            showDataDialog(name,title)
          end
        else
          弹出消息("请填写所有字段")
        end
      end)
      .设置消极按钮("取消")
      .设置中立按钮("删除",function()
        removeData(name,keys[id])
        items.remove(pos)
        table.remove(keys,id)
        table.remove(values,id)
        if #adpd<=0 then
          if dl then
            dl.dismiss()
            showDataDialog(name,title);
          end
        end
      end)
      .显示()
      edit1.setHint("标题")
      edit2.setHint("链接")
      edit1.setText(values[id])
      edit2.setText(keys[id])
      return true
    end
  else
    dlb.设置消息("没有收藏")
  end
  dlb.设置积极按钮("新建收藏",function()addDataDialog(name,"新建收藏")end)
  dl=dlb.show()
end

function addDataDialog(name,title,value,key)--32552732
  对话框()
  .设置标题(title)
  .setView(loadlayout(input2layout))
  .设置积极按钮("保存",function()
    if not(edit1.text=="") and not(edit2.text=="") or 325==52732 then
      if not getData(name,edit2.text) then
        putData(name,edit2.text,edit1.text)
      else
        弹出消息("该链接已存在")
        addDataDialog(name,title,edit1.text,edit2.text)
      end
    else
      弹出消息("请填写所有字段")
      addDataDialog(name,title,edit1.text,edit2.text)
    end
  end)
  .设置消极按钮("取消")
  .显示()
  edit1.setHint("标题")
  edit2.setHint("链接")
  if(value)then
    edit1.setText(value)
  end
  if(key)then
    edit2.setText(key)
  end
end




--第二部分 加入收藏 填入点击事件

addDataDialog("Collection","加入收藏",webView.getTitle(),webView.getUrl())




--第三部分  我的收藏 填入点击事件

showDataDialog("Collection","收藏")
```

常见应用权限
```lua
</application>
    <!-- 修改或删除您的USB存储设备中的内容 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.MOUNT_FORMAT_FILESYSTEMS" />
    <!-- 拥有完全的网络访问权限 -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
    <!-- 查看网络连接 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <!-- 更改网络连接性 -->
    <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
    <!-- 查看WLAN连接 -->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <!-- 连接WLAN网络和断开连接 -->
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <!-- 读取手机状态和身份 -->
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <!-- 读取短信 -->
    <uses-permission android:name="android.permission.READ_SMS" />
    <!-- 接收讯息（短信） -->
    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    <!-- 发送短信 -->
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.WRITE_SMS" />
    <!-- 访问确切位置信息（以 GPS 和网络为依据） -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <!-- 访问大致位置信息（以网络为依据） -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.CHANGE_CONFIGURATION" />
    <!-- 开机启动 -->
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <!-- 控制振动 -->
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RUN_INSTRUMENTATION" />
    <!-- 修改系统设置 -->
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />
    <!-- 检索正在运行的应用 -->
    <uses-permission android:name="android.permission.GET_TASKS" />
    <uses-permission android:name="android.permission.READ_SETTINGS" />
    <!-- 此应用可显示在其他应用上方 -->
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <!-- 防止手机休眠 -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.UPDATE_APP_OPS_STATS" />
    <!-- 安装快捷方式 -->
    <uses-permission android:name="com.android.launcher.permission.INSTALL_SHORTCUT" />
    <!-- 卸载快捷方式 -->
    <uses-permission android:name="com.android.launcher.permission.UNINSTALL_SHORTCUT" />
</manifest>
```

FusionApp小技巧（网上收集整合）
```lua
--常用代码
--网页即将加载
if(网页链接:find"url/.")then
  停止加载()
  进入子页面("游览",{链接=网页链接})
end

--加载本地网页
("file:///android_asset/drawable/index.html")


--如何调用浏览器打开当前页面？
import "android.content.Intent"
import "android.net.Uri"
url="https://www.lanzous.com/b251218"
viewIntent = Intent("android.intent.action.VIEW",Uri.parse(url))
activity.startActivity(viewIntent)
--浏览器打开链接

--收到新标题
设置顶栏标题(webView.title)


--项目点击事件
进入子页面("子页面名",{链接="url",标题="标题名"})


--去头部留白
document.body.style.paddingTop=0

--显示或隐藏悬浮按钮
--显示悬浮按钮
fltBtn.setVisibility(View.VISIBLE)
--隐藏悬浮按钮
fltBtn.setVisibility(View.GONE)
注:fltBtn为悬浮按钮的ID，不需要更改。


--悬浮点击事件
加载Js([[document.getElementsByClassName("apk_topbar_btn")[0].parentElement.onclick()]])

--悬浮选择点击事件
pop=PopupMenu(activity,fltBtn)
menu=pop.Menu
menu.add("选项一").onMenuItemClick=function(a)
进入子页面("子页面名",{链接="url1"..webView.getUrl()})
end
menu.add("选项二").onMenuItemClick=function(a)
进入子页面("子页面名",{链接="url2"..webView.getUrl()})
end
pop.show()


--设置屏幕方向
import "android.content.pm.ActivityInfo"
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);

--视频解析播放
加载网页("vip解析url"..webView.getUrl());
--横屏
activity.setRequestedOrientation(0); 
--竖屏
activity.setRequestedOrientation(1); 

--各控件ID
searchEdtTxt       搜索栏
toolbar.parent        顶栏
toolbar             标题栏
titleTvw            顶栏标题
webView           浏览器
fltBtn              悬浮按钮
 pager             滑动窗体
popmenu_position     菜单栏
sidebar             侧滑栏显示图标
pgsBar             进度条
sideLvw           侧滑图标
menu_button       菜单图标
menuBtn          侧滑栏图标

--开启和关闭侧滑
--打开侧滑
drawerLayout.openDrawer(3)
--关闭侧滑
drawerLayout.closeDrawer(3) 

--均放在点击事件
--自定义底栏点击事件

index=1--底栏项目序号

bmBarLin.getChildAt(index-1).onClick=function()
--点击事件
end

--自定义标签栏点击事件

local index=1--标签栏项目序号

tabBar.getChildAt(index-1).onClick=function()

 --点击事件

end

-- 多页面搜索 --
-- By: QQ3
local urls={"https://www.google.com/search?q=%s","https://m.baidu.com/s?wd=%s","https://m.so.com/s?q=%s","http://cn.bing.com/search?q=%s","http://m.chinaso.com/page/search.htm?keys=%s","https://m.sogou.com/web/searchList.jsp?keyword=%s","https://m.sm.cn/s?q=%s"}
searchEdtTxt.setOnEditorActionListener{
  onEditorAction=function(view,action,event)
    local text=tostring(view.text)
    if text~=nil and text~="" then
      searchEdtTxt.setHint(text)
      local URLEncodeer=import"java.net.URLEncoder"
      for index in pairs(urls) do
        if allWebView[index] and urls[index]~=nil and urls[index]~="" then
          local url=tostring(urls[index]):format(URLEncoder.encode(text))
          if pager.getCurrentItem()+1==index then
            task(100,function()allWebView[index].loadUrl(url)end)--解决当前页面无法加载（与默认搜索事件冲突被覆盖）的问题
          else
            allWebView[index].loadUrl(url)
          end
        end
      end
    else
      SearchEdtTxt.setHint("")
    end
  end
}
```

网络检测
```lua
--程序启动时会执行的事件
--程序启动事件
--网络检测
manager = activity.getSystemService(Context.CONNECTIVITY_SERVICE); 
gprs = manager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState(); 
if tostring(gprs)== "CONNECTED" then
--连接
print("你娃儿流量真多")
--上面括号内容可任意修改或者删除print打印事件
else
connManager = activity.getSystemService(Context.CONNECTIVITY_SERVICE)
mWifi = connManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
if tostring(mWifi):find("none") then
--未连接
print("网络未连接")
--上面括号内容可任意修改(不建议删除)
else
--连接
print("正在使用WIFI网络")
--上面括号内容可任意修改或者删除print打印事件
end
end
--将所有的代码放入程序启动事件里面，复制粘贴会吧，别说你不会.
```

屏蔽元素
```lua
var remove=n=>{n.split(",").forEach(v=>{if(v.indexOf("@ID(")==0){document.getElementById(v.substring(4,v.length-1)).style.display="none"}else{for(let e of document.getElementsByClassName(v))e.style.display="none"}})}remove("这里填要屏蔽的元素用,隔开")
```

屏蔽js自定义UA脚本
```lua
var d=document;var s=d.createElement('script');s.setAttribute('src', ' https://greasyfork.org/scripts/7410-jskillad/code/jsKillAD.user.js');d.head.appendChild(s);
```

去除广告代码复制粘贴放到全局js事件
```lua
document.getElementsByClassName("bottom_fixed")[0].setAttribute("style","display:none")

document.getElementsByClassName("fed-part-layout fed-back-whits")[0].setAttribute("style","display:none")
```

js屏蔽广告代码
```lua
--js脚本屏蔽网页元素
var remove=n=>{n.split(",").forEach(v=>{if(v.indexOf("@ID(")==0){document.getElementById(v.substring(4,v.length-1)).style.display="none"}else{for(let e of document.getElementsByClassName(v))e.style.display="none"}})}
remove("这里填要屏蔽的元素用,隔开")


   function adStyle(code){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(code));
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
}
//去广告
adStyle('#css代码{display:none !important;}');


去网页留白
--常用
document.body.style.paddingTop=0
--强制
document.body.style.marginTop='-20px'


屏蔽网站超链接
document.write('<style>a[href="当前网页"],a[href="主页"],a[href^="要屏蔽超链接"]{display:none;}</style>');
```

x5缓存设置
```lua
--X5最小缓存设置

import "android.app.*"
import "android.os.*"
import "android.widget.*"
import "android.view.*"
import "android.support.*"
import "com.tencent.smtt.sdk.*"
webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
webView.getSettings().setDisplayZoomControls(true);
webView.getSettings().setSupportZoom(true);
webView.getSettings().setDomStorageEnabled(false);
webView.getSettings().setDatabaseEnabled(false);
webView.getSettings().setAppCacheEnabled(false);
webView.getSettings().setUseWideViewPort(true);
webView.getSettings().setAllowFileAccess(true);
webView.getSettings().setBuiltInZoomControls(true);
webView.getSettings().setDisplayZoomControls(true);
webView.getSettings().setLoadWithOverviewMode(true);
webView.getSettings().setLoadsImagesAutomatically(true);
webView.getSettings().setSaveFormData(false);
webView.getSettings().setAllowContentAccess(true);
webView.getSettings().setBlockNetworkImage(false);
webView.getSettings().setAllowFileAccessFromFileURLs(false);
webView.getSettings().setAllowUniversalAccessFromFileURLs(false);
webView.getSettings().setAllowContentAccess(true);
webView.getSettings().setJavaScriptEnabled(true);
webView.getSettings().setSupportMultipleWindows(true);
webView.getSettings().setGeolocationEnabled(true);
webView.getSettings().setDefaultTextEncodingName("UTF-8");
webView.getSettings().setAppCacheMaxSize(Long.MAX_VALUE);
webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);






--X5清理缓存
--程序启动时会执行的事件
local hh={};webView.addJavascriptInterface(hh,'JsInterface');
webView.addJavascriptInterface({},'JsInterface')
appinfo=this.getPackageManager().getApplicationInfo(this.getPackageName(),0)
applabel=this.getPackageManager().getApplicationLabel(appinfo)
function onKeyDown(key,event)
if(key==4)then
webView.clearCache(true)
if(webView.canGoBack())then      
webView.goBack()
else
退出确认=对话框()
.设置标题("提示")
.设置消息("您确定要退出 "..applabel.." 吗?")
退出按钮={
[1]=function()
退出确认
.设置积极按钮("确定",function()
webView.clearCache(true)
执行Shell("rm -rf /sdcard/"..this.packageName)
执行Shell("rm -rf /storage/emulated/0/"..this.packageName)
执行Shell("rm -rf /sdcard/Android/data/"..this.packageName)
执行Shell("rm -rf /storage/emulated/0/Android/data/"..this.packageName)
执行Shell("rm -rf /data/data/"..this.packageName.."/cache")
执行Shell("rm -rf /data/data/"..this.packageName.."/code_cache")
执行Shell("rm -rf /data/data/"..this.packageName.."/app_webview")
执行Shell("rm -rf /data/data/"..this.packageName.."/app_textures")
执行Shell("rm -rf /data/data/"..this.packageName.."/files/data")
执行Shell("rm -rf /data/data/"..this.packageName.."/files/live_log")
退出程序()
end)
.设置中立按钮("清空数据",function() 
对话框()
.设置标题("提示")
.设置消息("清空应用数据后再次运行程序将变得缓慢\n您确定要清空 "..applabel.." 的全部数据吗?")
.设置积极按钮("确定",function()
执行Shell("rm -rf /sdcard/"..this.packageName)
执行Shell("rm -rf /storage/emulated/0/"..this.packageName)
执行Shell("rm -rf /sdcard/Android/data/"..this.packageName)
执行Shell("rm -rf /storage/emulated/0/Android/data/"..this.packageName)
os.execute("pm clear "..this.packageName)
end)
.设置消极按钮("取消")
.显示()
end)
.设置消极按钮("取消")
end}
math.randomseed(tonumber(tostring(os.time()):reverse():sub(1, 6)))
退出按钮[math.random(1,1)]()
退出确认.show()
end
return true
end
end
```

<fusion app>收藏与历史记录
```lua
--第一部分 程序启动时会执行的事件
--程序启动时会执行的事件

--清除缓存
function clr()
  --导入File类
  import "java.io.File"
  --显示多选框
  items={"浏览记录","缓存文件"}
  多选对话框=AlertDialog.Builder(this)
  .setTitle("清除记录")
  --勾选后执行
  .setPositiveButton("确定",function()
    if clearhistory==1 and clearall==1 then
      File(lstads).delete()
      File(lstwebads).delete()
      lst={}
      lstweb={}
      os.execute("pm clear "..activity.getPackageName())
    elseif clearhistory==0 and clearall==1 then
      os.execute("pm clear "..activity.getPackageName())
    elseif clearhistory==1 and clearall==0 then
      File(lstads).delete()
      File(lstwebads).delete()
      lst={}
      lstweb={}
    else return nil
    end
  end)
  --选择事件
  .setMultiChoiceItems(items, nil,{ onClick=function(v,p)
      --清除历史
      if p==0 then clearhistory=1
      end
      --清除缓存
      if p==1 then clearall=1
      end
    end})
  多选对话框.show();
  clearhistory=0
  clearall=0
end


--1.地址
favads="/data/data/"..activity.getPackageName().."/fav.lua"
favwebads="/data/data/"..activity.getPackageName().."/favweb.lua"

--2.序列化
function slz(obj) 
  local lua = "" 
  local t = type(obj) 
  if t == "number" then 
    lua = lua .. obj 
  elseif t == "boolean" then 
    lua = lua .. tostring(obj) 
  elseif t == "string" then 
    lua = lua .. string.format("%q", obj) 
  elseif t == "table" then 
    lua = lua .. "{\n" 
    for k, v in pairs(obj) do 
      lua = lua .. "[" .. slz(k) .. "]=" .. slz(v) .. ",\n" 
    end 
    local metatable = getmetatable(obj) 
    if metatable ~= nil and type(metatable.__index) == "table" then 
      for k, v in pairs(metatable.__index) do 
        lua = lua .. "[" .. slz(k) .. "]=" .. slz(v) .. ",\n" 
      end 
    end 
    lua = lua .. "}" 
  elseif t == "nil" then 
    return nil 
  else 
    error("can not serialize a " .. t .. " type.") 
  end 
  return lua 
end 
function rslz(lua) 
  local t = type(lua) 
  if t == "nil" or lua == "" then 
    return {}
  elseif t == "number" or t == "string" or t == "boolean" then 
    lua = tostring(lua) 
  else 
    error("can not unserialize a " .. t .. " type.") 
  end 
  lua = "return " .. lua 
  local func = loadstring(lua) 
  if func == nil then 
    return nil 
  end 
  return func() 
end

--3.读取收藏文件
function read_fav()
  import "java.io.File"
  File(favads).createNewFile()
  sfav=io.open(favads):read("*a")
  File(favwebads).createNewFile()
  sfavweb=io.open(favwebads):read("*a")
  --转换成table
  fav=rslz(sfav)
  favweb=rslz(sfavweb)
end

--4.存储收藏文件
function save_fav()
  --转换成string
  sfav=slz(fav)
  sfavweb=slz(favweb)
  --保存
  file=io.open(favads,"w+")
  io.output(file)
  io.write(sfav)
  io.flush()
  io.close(file)
  file=io.open(favwebads,"w+")
  io.output(file)
  io.write(sfavweb)
  io.flush()
  io.close(file)
end

--5.收藏夹布局
function favshow()
  favlayout={
    LinearLayout,
    orientation="1",
    gravity="center",
    layout_width="wrap_content",
    layout_height="wrap_content",
    {
      TextView,
      text="",
      gravity="center",
      layout_width="wrap_content",
      textSize="0sp",
      background="#000000",
      layout_height="15dp",},
    {
      TextView,
      text="收藏夹",
      gravity="center",
      layout_width="wrap_content",
      textSize="30sp",
      textStyle="bold",
      layout_height="50dp",},
    {
      ListView,
      id="favlv",
      items=fav,
      layout_width="fill",
      layout_height="wrap_content",
    },
  }
end

--6.收藏夹显示
function show_fav() 
  read_fav()
  favshow()
  fl=AlertDialog.Builder(activity)
  .setView(loadlayout(favlayout))
  .setNegativeButton("取消",DialogInterface.OnClickListener{
    onClick=function()
    end
  })
  .create()
  fl.show()
  favlv.onItemClick=function(l,v,c,b)
    加载网页(favweb[b])
    fl.dismiss()
  end
  favlv.onItemLongClick=function(l,v,c,b)
    od=b
    popwin(od)
    return true
  end
end
--7.收藏夹编辑框布局
function efavshow(e1,e2)
  efavlayout={
    LinearLayout,
    orientation="1",
    Focusable=true,
    FocusableInTouchMode=true,
    {
      EditText,
      id="efav",
      text=e1,
      layout_marginTop="5dp",
      layout_width="80%w",
      layout_gravity="center",
    },
    {
      EditText,
      id="efavweb",
      text=e2,
      layout_margiTop="5dp",
      layout_width="80%w",
      layout_gravity="center",
    },
  }
end

--8.显示编辑框
function show_efav(b)
  read_fav()
  local e1=fav[b]
  local e2=favweb[b]
  efavshow(e1,e2)
  efl=AlertDialog.Builder(activity)
  .setTitle("编辑收藏")
  .setView(loadlayout(efavlayout))
  .setPositiveButton("确认",DialogInterface.OnClickListener{
    onClick=function()
      if (efav.text=="" or efavweb.text=="") then 
        print("请填写完整")
      else
        fav[b]=efav.text
        favweb[b]=efavweb.text
        save_fav()
        print("修改成功")
        efl.dismiss()
        show_fav()
      end
    end})
  .setNegativeButton("取消",DialogInterface.OnClickListener{
    onClick=function() 
      show_fav()
    end})
  .setNeutralButton("删除",DialogInterface.OnClickListener{
    onClick=function()
      对话框()
      .设置消息("确定要删除吗？")
      .设置积极按钮("确定",function()
        table.remove(fav,b)
        table.remove(favweb,b)
        save_fav()
        print("删除成功")
        efl.dismiss()
        show_fav()
      end)
      .设置消极按钮("取消",function()
        show_fav()
      end)
      .显示()
    end})
  .create()
  efl.show()
end

--9.添加收藏
function add_fav()
  read_fav()
  e1=webView.getTitle()
  e2=webView.getUrl()
  local rpt=0
  local nfav=#fav
  for i=1,nfav do
    if favweb[i]==webView.getUrl() then
      rpt=1
      break
    end
  end
  if rpt==1 then 
    print("该网页已在收藏夹")
  else 
    efavshow(e1,e2)
    afl=AlertDialog.Builder(activity)
    .setTitle("添加收藏")
    .setView(loadlayout(efavlayout))
    .setPositiveButton("添加",DialogInterface.OnClickListener{
      onClick=function()
        if (efav.text=="" or efavweb.text=="") then
          print("请填写完整")
        else
          table.insert(fav,1,efav.text)
          table.insert(favweb,1,efavweb.text)
          save_fav()
          print("收藏成功")
          rpt=nil
        end
      end})
    .setNegativeButton("取消",DialogInterface.OnClickListener{
      onClick=function() end})
    .create()
    afl.show()
  end
end

--10.收藏排序
function upfav(b)
  if b~=1 then
    ufav=fav[b]
    ufavweb=favweb[b]
    table.remove(fav,b)
    table.remove(favweb,b)
    table.insert(fav,b-1,ufav)
    table.insert(favweb,b-1,ufavweb)
  end
  save_fav()
  show_fav()
end  
--11.长按弹窗
function popwin(od)
  local win1="向上移动"
  local win2="编辑"
  local win3="向下移动"
  local wina={win1,win2,win3}
  local winb={win2,win3}
  local winc={win1,win2}
  if od==1 then
    win=winb
  elseif od==#fav then
    win=winc
  else
    win=wina
  end
  winlayout={
    LinearLayout,
    orientation="vertical",
    {ListView,
      id="winlv",
      items=win,
      layout_width="fill_parent",
      layout_height="wrap_content",},
  }
  winl=AlertDialog.Builder(activity)
  .setView(loadlayout(winlayout))
  .create()
  winl.show()
  winlv.onItemClick=function(l,v,c,b)
    if win[b]==win1 then
      fl.dismiss()
      upfav(od)
    elseif win[b]==win2 then
      fl.dismiss()
      show_efav(od)
    elseif win[b]==win3 then
      fl.dismiss()
      downfav(od)
    end
    winl.dismiss()
  end
end
function downfav(b)
  if b~=#fav then
    dfav=fav[b]
    dfavweb=favweb[b]
    table.remove(fav,b)
    table.remove(favweb,b)
    table.insert(fav,b+1,dfav)
    table.insert(favweb,b+1,dfavweb)
  end
  save_fav()
  show_fav()
end
--1.历史记录
lstads="/data/data/"..activity.getPackageName().."/lst.lua"
lstwebads="/data/data/"..activity.getPackageName().."/lstweb.lua"
--2.序列化
function slz(obj) 
  local lua = "" 
  local t = type(obj) 
  if t == "number" then 
    lua = lua .. obj 
  elseif t == "boolean" then 
    lua = lua .. tostring(obj) 
  elseif t == "string" then 
    lua = lua .. string.format("%q", obj) 
  elseif t == "table" then 
    lua = lua .. "{\n" 
    for k, v in pairs(obj) do 
      lua = lua .. "[" .. slz(k) .. "]=" .. slz(v) .. ",\n" 
    end 
    local metatable = getmetatable(obj) 
    if metatable ~= nil and type(metatable.__index) == "table" then 
      for k, v in pairs(metatable.__index) do 
        lua = lua .. "[" .. slz(k) .. "]=" .. slz(v) .. ",\n" 
      end 
    end 
    lua = lua .. "}" 
  elseif t == "nil" then 
    return nil 
  else 
    error("can not serialize a " .. t .. " type.") 
  end 
  return lua 
end 
function rslz(lua) 
  local t = type(lua) 
  if t == "nil" or lua == "" then 
    return {}
  elseif t == "number" or t == "string" or t == "boolean" then 
    lua = tostring(lua) 
  else 
    error("can not unserialize a " .. t .. " type.") 
  end 
  lua = "return " .. lua 
  local func = loadstring(lua) 
  if func == nil then 
    return nil 
  end 
  return func() 
end

--3.历史记录框布局
function hstshow()
  hstlayout={
    LinearLayout,
    orientation="1",
    gravity="center",
    layout_width="wrap_content",
    layout_height="wrap_content",
    {
      TextView,
      text="",
      gravity="center",
      layout_width="wrap_content",
      textSize="0sp",
      background="#000000",
      layout_height="15dp",},
    {
      TextView,
      text="历史记录",
      gravity="center",
      layout_width="wrap_content",
      textSize="30sp",
      textStyle="bold",
      layout_height="50dp",},
    {
      ListView,
      id="hlst",
      items=lst,
      layout_width="fill",
      layout_height="wrap_content",
    },
  }
end

--4.读取历史文件
function read_hst()
  import "java.io.File"
  File(lstads).createNewFile()
  slst=io.open(lstads):read("*a")
  File(lstwebads).createNewFile()
  slstweb=io.open(lstwebads):read("*a")
  --转换成table
  lst=rslz(slst)
  lstweb=rslz(slstweb)
end

--5.新网页加入历史记录
function add_hst()
  if string.len(webView.getTitle())<=300 then--粗略过掉无效标题
    newtitle=webView.getTitle()
    newurl=webView.getUrl()
    table.insert(lst,1,newtitle) --标题表添加新标题
    table.insert(lstweb,1,newurl) --网址表添加新网址
  end
end

--6.存储历史文件
function save_hst()
  --转换成string
  slst=slz(lst)
  slstweb=slz(lstweb)
  --保存
  file=io.open(lstads,"w+")
  io.output(file)
  io.write(slst)
  io.flush()
  io.close(file)
  file=io.open(lstwebads,"w+")
  io.output(file)
  io.write(slstweb)
  io.flush()
  io.close(file)
end

--7.显示历史记录框
function show_hst() 
  hstshow()
  local hl=AlertDialog.Builder(activity)
  .setView(loadlayout(hstlayout))
  .setNegativeButton("好",DialogInterface.OnClickListener{
    onClick=function()
    end
  })
  .create()
  hl.show()
  hlst.onItemClick=function(l,v,c,b)
    加载网页(lstweb[b])
    hl.dismiss()
  end
  hlst.onItemLongClick=function(l,v,c,b)
    hl.dismiss()
    对话框()
    .设置消息("是否删除记录？")
    .设置消极按钮("否",function()
      show_hst()
    end)
    .设置积极按钮("是",function()
      table.remove(lst,b)
      table.remove(lstweb,b)
      save_hst()
      show_hst()
    end )
    .显示()
    return true
  end
end




--第二部分浏览器加载新页面并获得新标题时执行的事件

--查看历史记录
read_hst()
--加入历史记录
add_hst()
--存储历




--第三部分可分别填入到点击事件
--打开历史记录
show_hst()
--加入收藏
add_fav()
--打开收藏
show_fav()




--第一部分 可分别填入到点击事件
```

fusionapp之万能去广告UA转换
```lua
print"功能菜单"
items={}
table.insert(items,"去广告UA")
AlertDialog.Builder(this)
.setTitle("功能菜单")
.setItems(items,{onClick=function(l,v)
if items[v+1]=="去广告UA" then
  pop=PopupMenu(activity,view)
  menu=pop.Menu
  menu.add("万能").onMenuItemClick=function()
    webView.settings.setUserAgentString("Mozilla/5.0 Dalvik/2 ( Linux; U; NEM-AL10 Build/HONORNEM-AL10;Youku;7.1.4;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Safari/537.36 (Baidu; P1 6.0) iPhone/7.1 Android/8.0 baiduboxapp/2.7.0.10")
    webView.reload()
  end
  menu.add("安卓").onMenuItemClick=function()
    webView.settings.setUserAgentString("mixiaBrowser/Mozilla/5.0 (Linux; U; Android 7.1.2; zh-cn; Redmi 5 Plus Build/N2G47H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 Mobile Safari/537.36")
    webView.reload()
  end
  menu.add("苹果").onMenuItemClick=function()
    webView.settings.setUserAgentString("Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7")
    webView.reload()
  end
  menu.add("塞班").onMenuItemClick=function()
    webView.settings.setUserAgentString("Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML,like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba")
    webView.reload()
  end
  pop.show()--显示
end
end})
.show()
```

保存和读取文件
```lua
--保存
txtroute="/data/data/"..activity.getPackageName().."/保存名.txt"
import "java.io.File"
File(txtroute).createNewFile()
b="保存内容"-
io.open(txtroute,"w+"):write(b):close()

--读取
txtroute="/data/data/"..activity.getPackageName().."/保存名..txt"
import "java.io.File"
File(txtroute).createNewFile()
nr=io.open(txtroute):read("*a")
弹出消息(nr)
```

<fusion app>历史记录
```lua
--这个代码分三部分
--第一部分 填入收到新标题
--浏览器加载新页面并获得新标题时执行的事件

--接收参数
新标题=...
read_hst()
--加入历史记录
add_hst()
--存储历史文件
save_hst()
-- io.open(lstads,"w+"):write(lsts):close()
-- io.open(lstwebads,"w+"):write(lstwebs):close()




--第二部分 填到程序启动事件
--历史记录代码
lstads="/data/data/"..activity.getPackageName().."/lst.lua"
lstwebads="/data/data/"..activity.getPackageName().."/lstweb.lua"
--2.序列化
function slz(obj) 
  local lua = "" 
  local t = type(obj) 
  if t == "number" then 
    lua = lua .. obj 
  elseif t == "boolean" then 
    lua = lua .. tostring(obj) 
  elseif t == "string" then 
    lua = lua .. string.format("%q", obj) 
  elseif t == "table" then 
    lua = lua .. "{\n" 
    for k, v in pairs(obj) do 
      lua = lua .. "[" .. slz(k) .. "]=" .. slz(v) .. ",\n" 
    end 
    local metatable = getmetatable(obj) 
    if metatable ~= nil and type(metatable.__index) == "table" then 
      for k, v in pairs(metatable.__index) do 
        lua = lua .. "[" .. slz(k) .. "]=" .. slz(v) .. ",\n" 
      end 
    end 
    lua = lua .. "}" 
  elseif t == "nil" then 
    return nil 
  else 
    error("can not serialize a " .. t .. " type.") 
  end 
  return lua 
end 
function rslz(lua) 
  local t = type(lua) 
  if t == "nil" or lua == "" then 
    return {}
  elseif t == "number" or t == "string" or t == "boolean" then 
    lua = tostring(lua) 
  else 
    error("can not unserialize a " .. t .. " type.") 
  end 
  lua = "return " .. lua 
  local func = loadstring(lua) 
  if func == nil then 
    return nil 
  end 
  return func() 
end

--3.历史记录框布局
function hstshow()
  hstlayout={
    LinearLayout,
    orientation="1",
    gravity="center",
    layout_width="wrap_content",
    layout_height="wrap_content",
    {
      TextView,
      text="",
      gravity="center",
      layout_width="wrap_content",
      textSize="0sp",
      background="#000000",
      layout_height="15dp",},
    {
      TextView,
      text="历史记录",
      gravity="center",
      layout_width="wrap_content",
      textSize="30sp",
      textStyle="bold",
      layout_height="50dp",},
    {
      ListView,
      id="hlst",
      items=lst,
      layout_width="fill",
      layout_height="wrap_content",
    },
  }
end


--##功能函数##

--1.读取历史文件
function read_hst()
  import "java.io.File"
  File(lstads).createNewFile()
  slst=io.open(lstads):read("*a")
  File(lstwebads).createNewFile()
  slstweb=io.open(lstwebads):read("*a")
  --转换成table
  lst=rslz(slst)
  lstweb=rslz(slstweb)
end

--2.新网页加入历史记录
function add_hst()
  if string.len(webView.getTitle())<=300 then--粗略过掉无效标题
    newtitle=webView.getTitle()
    newurl=webView.getUrl()
    table.insert(lst,1,newtitle) --标题表添加新标题
    table.insert(lstweb,1,newurl) --网址表添加新网址
  end
end

--3.存储历史文件
function save_hst()
  --转换成string
  slst=slz(lst)
  slstweb=slz(lstweb)
  --保存
  file=io.open(lstads,"w+")
  io.output(file)
  io.write(slst)
  io.flush()
  io.close(file)
  file=io.open(lstwebads,"w+")
  io.output(file)
  io.write(slstweb)
  io.flush()
  io.close(file)
end

--4.显示历史记录框
function show_hst() 
  hstshow()
  local hl=AlertDialog.Builder(activity)
  .setView(loadlayout(hstlayout))
  .setNegativeButton("取消",DialogInterface.OnClickListener{
    onClick=function()
    end
  })
  .create()
  hl.show()
  hlst.onItemClick=function(l,v,c,b)
    加载网页(lstweb[b])
    hl.dismiss()
  end
  hlst.onItemLongClick=function(l,v,c,b)
    hl.dismiss()
    对话框()
    .设置消息("是否删除记录？")
    .设置消极按钮("取消",function()
      show_hst()
    end)
    .设置积极按钮("确定",function()
      table.remove(lst,b)
      table.remove(lstweb,b)
      save_hst()
      show_hst()
    end )
    .显示()
    return true
  end
end



第三部分 填到点击事件
--打开历史记录
show_hst()
```

<js>去悬浮窗广告动态类JS加载广告
```lua
/**
 * 禁用动态添加脚本，防止广告加载
 *
 * @param valid bool? true(valid)|false(invalid)|other(off)
 * @param rule array 配置允许(valid)|不允许(invalid)的脚本规则：支持regex、string、function
 */
(function(valid, rule) {
    if(typeof Element === 'undefined') console.log('IE8以下浏览器无效');
    var origin = new RegExp('^' + location.origin),Ele = Element;
    each(['appendChild', 'insertBefore', 'insertAfter'], proxy);

    function proxy(prop) {
        var proxy_obj = Ele.prototype[prop];
        Ele.prototype[prop] = function(elem) {
            if (!elem.children.length) {
                var tag = elem.tagName.toLowerCase();
                if (tag == 'script' && isBanScript(elem)) {
                    console.log('禁用脚本：' + elem.src);
                    var substitute = document.createElement('script');
                    substitute.innerHTML = '// 禁用脚本：' + elem.src;
                    elem = substitute;
                }
            }
            return proxy_obj.apply(this, arguments);
        };
    }

    function isBanScript(script) {
        if (origin.test(script.src)) return false;
        return valid === each(rule, match);

        function match(val) {
            var type = typeof val;
            if (type === 'string') {
                if (script.src == val) return true;
            } else if (type === 'function') {
                if (val(script)) return true;
            } else {
                if (val.test(script.src)) return true;
            }
            return false;
        }
    }

    function each(arr, fn) {
        if (arr) {
            for (var i = 0, n = arr.length; i < n; i++) {
                if (fn.call(arr[i], arr[i], i) === true) return false;
            }
        }
        return true;
    }
})(true, []);
//表示有效的脚本规则列表
```

去留白~顶白和底白
```lua
代码如下：
放在：网页控制-javascript里

顶白：document.body.style.marginTop='-62px'

底白：document.body.style.marginBottom = '-1008px'

--px前面的数字按着自己的页面调
```

隐藏顶栏+显示顶栏，开关代码
```lua
-按钮点击事件

if dlan==nil then 
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);--隐藏时间
 toolbar.parent.setVisibility(View.GONE)--隐藏顶栏
  dlsj=0
  dlan=0
  弹出消息("隐藏顶栏部件")
  else 
  
  
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);--显示时间 
toolbar.parent.setVisibility(View.VISIBLE)--显示顶栏
  dlsj=nil
  dlan=nil
  弹出消息("显示顶栏部件")
  end
```

对话框样式集合
```lua
--图片: https://images-cdn.shimo.im/3eTwH6QkE0IZ5cTr/null2f926a4003c29b6e.gif
require "import"
import "android.app.*"
import "android.os.*"
import "android.widget.*"
import "android.view.*"
import "layout"
activity.setTitle('AlertDialogStyle By_北巷飘雨')
activity.setContentView(loadlayout(layout))



--需要导入的类
import "android.content.DialogInterface"
import "android.graphics.drawable.BitmapDrawable"

--普通对话框
local 普通对话框=AlertDialog.Builder(this)
.setTitle("普通对话框")
.setMessage("信息")
.setIcon(BitmapDrawable(loadbitmap(activity.getLuaDir().."/warning.png")))
--.setView()
.setPositiveButton("积极",DialogInterface.OnClickListener{
  onClick=function(v)
    --监听
  end
})
.setNeutralButton("中立",nil)
.setNegativeButton("否认",nil)
--普通对话框.show()




--列表对话框
local 列表={"项目1","项目2","项目3"}
local 列表对话框=AlertDialog.Builder(this)
.setTitle("列表对话框")
.setItems(列表,DialogInterface.OnClickListener{
  onClick=function(v,l)
    l=tonumber(l)+1
    print("点击了:"..列表[l])

  end
})
--列表对话框.show();



--单选对话框
单选列表={"单选项目1","单选项目2","单选项目3"}
local 单选对话框=AlertDialog.Builder(this)
.setTitle("列表对话框")
.setSingleChoiceItems(单选列表,-1,DialogInterface.OnClickListener{
  onClick=function(v,l)
    l=tonumber(l)+1
    print("点击了:"..单选列表[l])
  end
})
--单选对话框.show();




--多选对话框
local 多选列表={"多选项目1","多选项目2","多选项目3"}
a="选择了:"
多选对话框=AlertDialog.Builder(this)
.setTitle("多选框")
.setMultiChoiceItems(多选列表, nil,DialogInterface.OnMultiChoiceClickListener{
  onClick=function(v,l)
    l=tonumber(l)+1
    a=a.."\n"..多选列表[l]
  end
})
.setPositiveButton("确定", DialogInterface.OnClickListener{
  onClick=function(v,l)
    print(a)
  end
}) 
--多选对话框.show();



--重要的留在后面



--ProgressDialog__进度条对话框

dialog = ProgressDialog.show(this, "提示", "正在登陆中").hide()
--最简单便捷的方式

dialog2 = ProgressDialog.show(this, "提示", "正在登陆中", false).hide()
--最后一个boolean设置是否是不明确的状态

dialog3 = ProgressDialog.show(this, "提示", "正在登陆中",false, true).hide()
--最后一个boolean设置可以不可以点击取消

dialog4 = ProgressDialog.show(this, "提示", "正在登陆中",false, true, DialogInterface.OnCancelListener{
  onCancel=function()
    print("对话框取消")
  end
}).hide() 
--最后一个参数监听对话框取消，并执行事件




--圆形旋转样式
dialog5= ProgressDialog(this)
dialog5.setProgressStyle(ProgressDialog.STYLE_SPINNER)
dialog5.setTitle("Loading...")
dialog5.setIcon(BitmapDrawable(loadbitmap(activity.getLuaDir().."/loading.png")))
--设置进度条的形式为圆形转动的进度条
dialog5.setMessage("ProgressDialog")
dialog5.setCancelable(true)--设置是否可以通过点击Back键取消
dialog5.setCanceledOnTouchOutside(false)--设置在点击Dialog外是否取消Dialog进度条
dialog5.setOnCancelListener{
  onCancel=function(l)
    print("取消Dialog5")
  end}
--取消对话框监听事件
dialog5.show().hide()




--水平样式_二级进度条
dialog6= ProgressDialog(this)
dialog6.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
--设置进度条的形式为水平进度条
dialog6.setTitle("ProgressDialog_HORIZONTAL")
dialog6.setIcon(BitmapDrawable(loadbitmap(activity.getLuaDir().."/Download.png")))
dialog6.setCancelable(true)--设置是否可以通过点击Back键取消
dialog6.setCanceledOnTouchOutside(false)--设置在点击Dialog外是否取消Dialog进度条
dialog6.setOnCancelListener{
  onCancel=function(l)
    print("取消Dialog6")
  end}
--取消对话框监听事件
dialog6.setMax(100)
--设置最大进度值
dialog6.show().hide()

function 增加(i)
  dialog6.incrementProgressBy(10)
  dialog6.incrementSecondaryProgressBy(10)
  if i=="10" then
    dialog6.dismiss()
    print("加载完成")
  end
  --当进度走完时销毁对话框
end
function 加载()
  require "import"
  for i=1,10 do
    Thread.sleep(300)
    call("增加",tostring(i))
  end
end
--              ！！！
--thread(加载)--测试时别忘记这个！！！
--             ！！！
--二级进度条更新
```

轮播图
```lua
--图片: https://images.smcdn.cn/Hdk7iw2FwS4sgztb/IMG_20200411_064702.jpg
--需要加滑动视图代码~轮播图
--调用方法：线性布局。文本控件


hd2.setOnPageChangeListener(PageView.OnPageChangeListener{
  onPageScrolled=function(a,b,c)
    if c==0 then
      if a==0 then
--文本控件的id↓↓
        top1.setTextColor(0xe3ff00ff)--文本控件id
        top2.setTextColor(0xffffffff)
        top3.setTextColor(0xffffffff)
        top4.setTextColor(0xffffffff)
        top5.setTextColor(0xffffffff)
        task(3000,function()--设置跳转时间
          hd2.showPage(1)
        end)
      elseif a==1 then
        top1.setTextColor(0xffffffff)
        top2.setTextColor(0xe3ff00ff)
        top3.setTextColor(0xffffffff)
        top4.setTextColor(0xffffffff)
        top5.setTextColor(0xffffffff)
        task(3000,function()--设置跳转时间
          hd2.showPage(2)
        end)
      elseif a==2 then
        top1.setTextColor(0xffffffff)
        top2.setTextColor(0xffffffff)
        top3.setTextColor(0xe3ff00ff)
        top4.setTextColor(0xffffffff)
        top5.setTextColor(0xffffffff)
        task(3000,function()--设置跳转时间
          hd2.showPage(3)
        end)
      elseif a==3 then
        top1.setTextColor(0xffffffff)
        top2.setTextColor(0xffffffff)
        top3.setTextColor(0xffffffff)
        top4.setTextColor(0xe3ff00ff)
        top5.setTextColor(0xffffffff)
        task(3000,function()--设置跳转时间
          hd2.showPage(4)
        end)
      elseif a==4 then
        top1.setTextColor(0xffffffff)
        top2.setTextColor(0xffffffff)
        top3.setTextColor(0xffffffff)
        top4.setTextColor(0xffffffff)
        top5.setTextColor(0xe3ff00ff)
        task(3000,function()--设置跳转时间
          hd2.showPage(0)
        end) 
      end
    end
  end})
```

控件圆角V2
```lua
--控件圆角V2
function CircleButton(view,InsideColor,radiu)
  import "android.graphics.drawable.GradientDrawable"
  drawable = GradientDrawable() 
  drawable.setShape(GradientDrawable.RECTANGLE) 
  drawable.setColor(InsideColor)
  drawable.setCornerRadii({radiu,radiu,radiu,radiu,radiu,radiu,radiu,radiu});
  view.setBackgroundDrawable(drawable)
end
 
--调用方法
CircleButton(控件id,0xFFFB8FAF,35)
```

设置Sideslip点击事件|设置波纹颜色
```lua
--设置波纹颜色
颜色=0xfff48FB1--主页
id=控件id①
import "android.content.res.ColorStateList"
local attrsArray = {android.R.attr.selectableItemBackgroundBorderless} 
local typedArray =activity.obtainStyledAttributes(attrsArray) 
ripple=typedArray.getResourceId(0,0) 
aoos=activity.Resources.getDrawable(ripple) 
aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色}))
id.setBackground(aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色})))
--设置Sideslip点击事件
控件id①.onClick=function()
  hd.showPage(0)
end

颜色=0xfff48FB1--专题
id=控件id②
import "android.content.res.ColorStateList"
local attrsArray = {android.R.attr.selectableItemBackgroundBorderless} 
local typedArray =activity.obtainStyledAttributes(attrsArray) 
ripple=typedArray.getResourceId(0,0) 
aoos=activity.Resources.getDrawable(ripple) 
aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色}))
id.setBackground(aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色})))
--设置Sideslip点击事件
控件id②.onClick=function()
  hd.showPage(1)
end

颜色=0xfff48FB1--直播
id=控件id③
import "android.content.res.ColorStateList"
local attrsArray = {android.R.attr.selectableItemBackgroundBorderless} 
local typedArray =activity.obtainStyledAttributes(attrsArray) 
ripple=typedArray.getResourceId(0,0) 
aoos=activity.Resources.getDrawable(ripple) 
aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色}))
id.setBackground(aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色})))
--设置Sideslip点击事件
控件id③.onClick=function()
  hd.showPage(2)
end

颜色=0xfff48FB1--关于我们
id=控件id④
import "android.content.res.ColorStateList"
local attrsArray = {android.R.attr.selectableItemBackgroundBorderless} 
local typedArray =activity.obtainStyledAttributes(attrsArray) 
ripple=typedArray.getResourceId(0,0) 
aoos=activity.Resources.getDrawable(ripple) 
aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色}))
id.setBackground(aoos.setColor(ColorStateList(int[0].class{int{}},int{颜色})))
--设置Sideslip点击事件
控件id④.onClick=function()
  hd.showPage(3)
end
```

设置Sideslip点击事件滑动视图条页面
```lua
--这个加滑动视图代码

{
PageView;--滑动视图
layout_weight="1";--剩余属性
id="hd";
pages={
};
};



--调用方法
--设置Sideslip点击事件
控件id.onClick=function()
  hd.showPage(0)--滑动视图页面
end
--设置Sideslip点击事件
控件id.onClick=function()
  hd.showPage(1)--滑动视图页面
end
--设置Sideslip点击事件
控件id.onClick=function()
  hd.showPage(2)--滑动视图页面
end
```

底栏滑动视图条
```lua
--①需要加滑动视图代码↓↓②文本控件③图片控件

{
PageView;--滑动视图
layout_weight="1";--剩余属性
id="hd";
pages={
};
};




--设置滑动条&字体颜色
appp=activity.getWidth()
local bali=appp/4
hd.setOnPageChangeListener(PageView.OnPageChangeListener{
  onPageScrolled=function(a,b,c)
    dilan.setX(bali*(b+a))
    if c==0 then
      if a==0 then--主页
--文本控件的id↓↓
        a1.setTextColor(0xFF468FFF)--选中字体颜色
        a2.setTextColor(0x9f000000)--未选中字体颜色
        a3.setTextColor(0x9f000000)--未选中字体颜色
        a4.setTextColor(0x9f000000)--未选中字体颜色
        --图片控件的id↓↓图片失效事件
img1.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/U17169e0de04a4250b34288fcf9da3eceF.png"))--选中图片
        img2.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/U305602d55fbe47358a77b1b9f68b2ac4s.png"))--未选中图片
        img3.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Ua09142d003fe418b977ac1049c1496f0O.png"))--未选中图片
        img4.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Uf6e2ebecf7584c78b0848f0492c576fco.png"))--未选中图片

      elseif a==1 then--专题
        a1.setTextColor(0x9f000000)--未选中字体颜色
        a2.setTextColor(0xFF468FFF)--选中字体颜色
        a3.setTextColor(0x9f000000)--未选中字体颜色
        a4.setTextColor(0x9f000000)--未选中字体颜色
        img1.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Uba97cca4260f45cd84a99f01f28cb1aap.png"))--选中图片
        img2.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Ucd85d6d4d0164faca79c1d3c1add90cbD.png"))--未选中图片
        img3.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Ua09142d003fe418b977ac1049c1496f0O.png"))--未选中图片
        img4.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Uf6e2ebecf7584c78b0848f0492c576fco.png"))--未选中图片

      elseif a==2 then--直播
        a1.setTextColor(0x9f000000)--未选中字体颜色
        a2.setTextColor(0x9f000000)--未选中字体颜色
        a3.setTextColor(0xFF468FFF)--选中字体颜色
        a4.setTextColor(0x9f000000)--未选中字体颜色
        img1.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Uba97cca4260f45cd84a99f01f28cb1aap.png"))--选中图片
        img2.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/U305602d55fbe47358a77b1b9f68b2ac4s.png"))--未选中图片
        img3.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/U5e7fc74a30e44863a2586794afba08efp.png"))--未选中图片
        img4.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Uf6e2ebecf7584c78b0848f0492c576fco.png"))--未选中图片
      elseif a==3 then--我的
        a1.setTextColor(0x9f000000)--未选中字体颜色
        a2.setTextColor(0x9f000000)--未选中字体颜色
        a3.setTextColor(0x9f000000)--选中字体颜色
        a4.setTextColor(0xFF468FFF)--未选中字体颜色
        img1.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Uba97cca4260f45cd84a99f01f28cb1aap.png"))--选中图片
        img2.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/U305602d55fbe47358a77b1b9f68b2ac4s.png"))--未选中图片
        img3.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/Ua09142d003fe418b977ac1049c1496f0O.png"))--未选中图片
        img4.setImageBitmap(loadbitmap("https://ae01.alicdn.com/kf/U72467c2c40cc48089e30738b24c4359c8.png"))--未选中图片
      end
    end
  end})
```

布局边框
```lua
function 布局边框(边框粗细,边框颜色,背景颜色,圆角大小)
  import "android.graphics.drawable.GradientDrawable"
  drawable=GradientDrawable()
  drawable.setShape(GradientDrawable.RECTANGLE)
  drawable.setStroke(边框粗细,tonumber(边框颜色))--边框粗细和颜色
  drawable.setColor(tonumber(背景颜色))--背景颜色
  drawable.setCornerRadius(圆角大小)--圆角
  return drawable
end

--调用方法
控件id.BackgroundDrawable=布局边框(0,0x77000000,0xFF7ABD9A,15);
```

设置边框圆角函数
```lua
--设置边框圆角函数
function 卡片(边框厚度,边框颜色,背景颜色,圆角度)
  import "android.graphics.drawable.GradientDrawable"
  drawable=GradientDrawable()
  drawable.setShape(GradientDrawable.RECTANGLE)
  drawable.setStroke(边框厚度,tonumber(边框颜色))--边框厚度和背景颜色
  drawable.setColor(tonumber(背景颜色))--背景颜色
  drawable.setCornerRadius(圆角度)--圆角
  return drawable
end

--调用方法
--分别为:ID,边框厚度,边框颜色,背景颜色,圆角度
控件id.BackgroundDrawable=卡片(1,0x4b000000,0xFFF2F2F2,100);
```

屏蔽网页元素
```lua
浏览器控件id.loadUrl("javascript:function setTop(){document.querySelector("屏蔽的元素").style.display="none";}setTop();");
```

刷新网页
```lua
控件id.reload()--刷新网页
```

设置浏览器标识(UA)
```lua
控件id.getSettings().setUserAgentString('')--设置浏览器标识(UA)
```

加载网页
```lua
控件id.loadUrl('网页链接')--加载网页
```

加载JS代码
```lua
控件id.loadUrl([[JavaScript:JavaScript代码]])--加载JavaScript代码
```

浏览器状态监听
```lua
--状态监听
id.setWebViewClient{
  shouldOverrideUrlLoading=function(view,url)
    --Url即将跳转
  end,
  onPageStarted=function(view,url,favicon)
    --网页加载
  end,
  onPageFinished=function(view,url)
    --网页加载完成
  end}
```

设置Lua编程器框颜色
```lua
--设置Lua编程器框颜色

edit.setBasewordColor(0xFF81F150)

edit.setCommentColor(0xFF81F150)

edit.setKeywordColor(0xFF81F150)

edit.setPanelBackgroundColor(0xff000000)

edit.setPanelTextColor(0xFF81F150)

edit.setSelection(0xFF81F150)

edit.setStringColor(0xFF81F150)

edit.setTextColor(0xFF81F150)

edit.setTextHighlightColor(0xFF81F150)

edit.setUserwordColor(0xFF81F150)
```

设置屏幕方向代码|横屏|竖屏
```lua
--设置屏幕方向代码

import "android.content.pm.ActivityInfo"
--自动感应
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);


--横屏
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
--竖屏
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);


--用户
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER);


--当前activity
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_BEHIND);


--忽略物理感应
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_NOSENSOR);


--未指定，默认值
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
```

FA 让网页再刷新一次
```lua
--Fa 让网页再刷新一次

if webView.url~=记录网址 then
记录网址=webView.url
webView.reload()
print("刷新反馈消息")
end
```

FA 点击网页元素
```lua
--Fa 点击网页元素

加载Js('document.getElementsByClassName("填写元素")[0].click()')
```

FA 网页控制~顶距
```lua
document.body.style.marginTop='-100px'
```

FA 加载网页写文本布局
```lua
加载网页([[javascript:document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">填写你滴内容<br>这个是换行符号<br>这个是换行符号');]])
```

禁用标签栏模板进度条下拉刷新
```lua
--程序启动事件

local i=0
while _G["srLayout"..i] do 
local srLayout=_G["srLayout"..i]  srLayout.setEnabled(false) 
 i=i+1
end
```

Fusion App 严重漏洞封堵代码
```lua
--漏洞封堵代码，请在程序启动事件中填写：

import "android.webkit.WebView"
webView.addJavascriptInterface({},"JsInterface")
```

悬浮按钮居中
```lua
--代码如下:
task(200,function()fltBtn.LayoutParams=fltBtn.LayoutParams.setMargins(0,0,activity.getWidth()/2-fltBtn.getMeasuredWidth()/2,100)end)
--使用task是为了延时，因为执行启动事件中的代码时，悬浮按钮还没有出现...
--100是悬浮按钮与布局底部的距离，如需完全居中，可以修改为activity.getHeight()/2-fltBtn.getMeasuredHeight()/2。（不好看）
```

自定义搜索事件
```lua
--代码如下:
searchEdtTxt.setOnEditorActionListener{
 onEditorAction=function(view,action,event,jdpuk)
  if action==3 and not view.text:find("^$") then--这个判断有点奇怪，但是我不太了解，就这样判断咯，不知道为什么用~=""没有效果
    local loadurl=view.text
    if not loadurl:find(":") then
     loadurl="http://"..loadurl
    end
    task(1,function()加载网页(loadurl)end)--延时是为了等待默认搜索事件执行后再执行
  end
 end
}
```

更改悬浮按钮位置
```lua
--悬浮按钮居中
task(200,function()fltBtn.LayoutParams=fltBtn.LayoutParams.setMargins(0,0,activity.getWidth()/2-fltBtn.getMeasuredWidth()/2,fltBtn.getMeasuredHeight()/2)end)--32552732

--悬浮按钮居左
task(200,function()fltBtn.LayoutParams=fltBtn.LayoutParams.setMargins(0,0,activity.getWidth()-fltBtn.getMeasuredHeight()/2,activity.getHeight()/2-fltBtn.getMeasuredHeight()/2)end)--32552732

--悬浮按钮居右
task(200,function()fltBtn.LayoutParams=fltBtn.LayoutParams.setMargins(0,0,-fltBtn.getMeasuredHeight()/2,activity.getHeight()/2-fltBtn.getMeasuredHeight()/2)end)--32552732

--悬浮按钮居下()
task(200,function()fltBtn.LayoutParams=fltBtn.LayoutParams.setMargins(0,0,activity.getWidth()/2-fltBtn.getMeasuredWidth()/2,-fltBtn.getMeasuredWidth()/2)end)--32552732
```

禁用标签栏模板下拉刷新
```lua
--代码如下:
srLayout0.onRefresh=function()srLayout0.setRefreshing(false)end--可以下拉，但不会刷新，可以自定义下拉事件
srLayout0.setEnabled(false)--直接禁用，无法下拉
--其中srLayout0代表第1个标签栏，第2个为srLayout1，第3个为srLayout2，以此类推

--也可以这样循环设置每一栏
local i=0
while _G["srLayout"..i] do
 local srLayout=_G["srLayout"..i]
 --[[
 srLayout.onRefresh=function()
  srLayout.setRefreshing(false)
 end
 ]]
 srLayout.setEnabled(false)
 i=i+1
end
```

顶栏透明到网页
```lua
--代码如下：

--使WebView置于顶栏下方以支持顶栏透明
local rv=webView.getParent().getParent()
webView.getParent().removeView(webView)
rv.addView(webView,0)
webView.LayoutParams=webView.LayoutParams.setMargins(0,getStatusBarHeight(),0,0)

--添加到启动事件后，将顶栏颜色设置为透明，即可实现透明到网页的效果
```

侧滑页面效果
```lua
--代码如下：

-- 仿酷狗侧滑
-- 原作: Pretend° (dalao)
-- 修改: QQ32552732
-- 修改内容:
-- - 支持 Fusion App 原有布局
-- - 删除原有自定义布局等无用代码
-- - 稍微修改了下效果，符合个人喜好...
-- - 支持右侧栏
-- 注:
-- - 背景图片随便找的
-- - 侧栏颜色修改为 #00000000
-- - 侧栏大小修改为 200dp

--关闭阴影
drawerLayout.setScrimColor(0)

--添加背景
drawerLayout.addView(loadlayout({
 ImageView,
 id="background",
 scaleType="fitXY",
 src="drawable/background.jpg",
}),0)

--获取页面根布局
local lay=drawerLayout.getChildAt(1)

--监听侧滑滑动事件
local pio=this.getWidth()*0.1
drawerLayout.setDrawerListener(DrawerLayout.DrawerListener{
 onDrawerSlide=function(v,i)
  lay.setScaleX(1-i/3.5).setScaleY(1-i/3.5)--页面缩放
  lay.setTranslationX((({0,0,1,0,-1})[v.LayoutParams.gravity])*(i*3.5*pio))--页面位移(其中那段奇怪的表是用于判断位移方向，不过依然仅支持左右侧滑)
  --sidebar.setScaleX(2-i).setScaleY(2-i)--侧滑栏从大到小缩放
  --sidebar.setScaleX(i).setScaleY(i)--侧滑栏从小到大缩放
 end})

--新增右侧侧滑栏
drawerLayout.addView(loadlayout({
 LinearLayout,
 id="sidebar1",
 layout_width="200dp",
 layout_height="fill",
 {
  ListView,
  layout_width="200dp",
  --侧栏布局自己写...
 },
}))
sidebar1.LayoutParams.gravity=5--设置为右侧侧栏

--重写按键监听，以允许通过返回键关闭右侧侧滑
function onKeyDown(key,event)
 if(key==4)then
  if drawerLayout.isDrawerOpen(3) or drawerLayout.isDrawerOpen(5) then
   drawerLayout.closeDrawer(3)
   drawerLayout.closeDrawer(5)
  elseif(webView.canGoBack())then
   webView.goBack()
  else
   this.finish()
  end
  return true
 end
end

--感觉距离应该可以计算，配合侧滑栏宽度什么的
--......
--修改自大佬的仿酷狗侧滑







--大佬给了新一份挤压动画的侧滑，依旧没有兼容FA的布局，再次修改

--代码如下:

-- 侧滑特效
-- 原作: Pretend°
-- 修改: QQ32552732
-- 修改内容: 兼容 Fusion App 原有布局，删除布局代码，修改一些写法，并与侧滑栏宽度对应
-- 注意: 请将对侧滑栏布局的操作放在此代码前，或使用 osb 获得侧滑栏(原 sidebar)的引用
osb=sidebar--留下原侧滑的引用
sbw=sidebar.layoutParams.width--保存侧滑宽度
drawerLayout.scrimColor=0--毁灭侧滑阴影
sidebar.layoutParams.gravity=0--剥夺侧滑身份
page=drawerLayout.getChildAt(0)--获取整个页面
drawerLayout.removeView(page)--修改页面层次
drawerLayout.addView(page)--作用同上
fakesb=loadlayout{LinearLayout,layout_width=sbw,layout_height="fill"}--侧滑替身
drawerLayout.addView(fakesb)--替身加入
fakesb.layoutParams.gravity=3--给予替身侧滑身份
drawerLayout.drawerListener={
 onDrawerSlide=function(v,l)
  page.translationX=l*sbw
  osb.translationX=(l-1)*sbw*0.5--0.5可以任意修改，影响侧滑挤压程度
 end
}
sidebar=fakesb--由替身代替原侧滑执行其它任务
```

有已知不足的主题切换
```lua
--已知不足是什么呢？
--依主题名称进行索引，所以主题必须有名称，而且必须唯一
--只保存了主题名称，没有保存配色等
--以上不足是有意为之（不是为了让它有不足，而是某些其他原因，比如我不想保存太多数据），但您可以自行修改，添加自定义配色等功能，不会很难

--以下代码保存为文件 theme.lua 放置于工程目录下（其实放进启动事件的函数里也没问题，放文件感觉更简洁，不会在启动事件堆一堆东西）：

-- Copyright © QQ32552732 2018
-- QQ: 32552732
-- E-Mail: new-age@outlook.com

-- 您在使用此文件或此文件部分内容时，请务必保留以上内容可见，否则即视为侵权，我将可能进行追究
-- 重申，请务必注意！您在使用此文件或此文件部分内容时，务必保留以上版权信息可见！！！

-- 以下说明仅为提示，无任何效力，不可作为任何您不履行以上义务的理由
-- 例如: 使用 Fusion App 1.1.3 进行打包时对 config.table 的加密，视为以上内容可见，注意仅限 1.1.3 版本
-- 例如: 使用 AndroLua+ 的编译（string.dump），视为以上内容不可见，您需要单独在安装包 assets 目录下，或者在您的应用内创建一个页面用于展示版权内容，且不可进行加密，需要保留入口

if not import then
 require"import"
end

local jdpuk=32552732

local 主题={}



--提示: 搜索栏=顶栏
主题.配色={
 {
  名称="默认",
  侧滑栏背景=config["colors"]["侧滑栏背景"],
  顶栏背景=(function(jdpuk)if config["toolbar"]["启用搜索功能"] and config["toolbar"]["输入栏模式"] then return config["colors"]["搜索栏背景"] else return config["colors"]["顶栏"] end end)(),
  顶栏标题=config["colors"]["顶栏部件"],
  搜索栏提示文字=config["colors"]["搜索栏提示文字"],
  顶栏=config["colors"]["顶栏"],
  底栏=config["colors"]["底栏"],
  悬浮按钮=config["colors"]["悬浮按钮"],
  暗色=false,
 },
 {
  名称="夜间",
  侧滑栏背景="#FF1D1E2A",
  顶栏背景="#FF263238",
  顶栏标题="#FFAAAAAA",
  搜索栏提示文字="#FFAAAAAA",
  顶栏="#FF1D1E2A",
  底栏="#FF1D1E2A",
  悬浮按钮="#FF37474F",
  暗色=true,
 },
}

if not tostring(jdpuk)==string.byte("")..string.byte("")..string.byte("4")..string.char(55).."32" then error() end

function 主题.设置(配色)--325 527 32
 if sidebar and 配色.侧滑栏背景 and 配色.侧滑栏背景~="" and "32552"~="732" then sidebar.setBackgroundColor(tonumber(配色.侧滑栏背景:gsub("^#",""),16)) end--3 25 52 73 2
 if toolbar and 配色.顶栏背景 and 配色.顶栏背景~="" and 325<52732 then toolbar.setBackgroundColor(tonumber(配色.顶栏背景:gsub("^#",""),16)) end-- 32552 732
 if titleTvw and 配色.顶栏标题 and 配色.顶栏标题~="" and "32552732" then titleTvw.setTextColor(tonumber(配色.顶栏标题:gsub("^#",""),16)) end--3 2552732
 if searchEdtTxt and 配色.搜索栏提示文字 and 配色.搜索栏提示文字~="" and 3~=2552732 then searchEdtTxt.setHintTextColor(tonumber(配色.搜索栏提示文字:gsub("^#",""),16)) end--32552732
 if toolbarParent and 配色.顶栏 and 配色.顶栏~="" and 3255~=2732 then toolbarParent.setBackgroundColor(tonumber(配色.顶栏:gsub("^#",""),16)) end-- 32552732
 if bmBar and 配色.底栏 and 配色.底栏~="" and 3255~=2732 then bmBar.setBackgroundColor(tonumber(配色.底栏:gsub("^#",""),16)) end-- 32552732
 if fltBtn and 配色.悬浮按钮 and 配色.悬浮按钮~="" and 32552732 then fltBtn.setCardBackgroundColor(tonumber(配色.悬浮按钮:gsub("^#",""),16)) end-- 32552732
 if 配色.暗色==true then
  if luajava.bindClass("android.os.Build").VERSION.SDK_INT>=21 then--32552732
   activity.setTheme(android.R.style.Theme_Material)
  else
   activity.setTheme(android.R.style.Theme_Holo)
  end
 elseif 配色.暗色==false then
  if luajava.bindClass("android.os.Build").VERSION.SDK_INT>=21 then--32552732
   activity.setTheme(android.R.style.Theme_Material_Light)
  else
   activity.setTheme(android.R.style.Theme_Holo_Light)
  end
 end
end

function 主题.列表()
 local themes={}
 for i,v in pairs(主题.配色) do
  if v and v.名称 then
   themes[v.名称]=i--32552732
  end
 end
 return themes
end

主题.当前="默认"
--[[
function 主题.选择()
 local AlertDialog=import"android.app.AlertDialog"--3255 273 2
 local themes={}
 for i,v in pairs(主题.配色) do
  themes[#themes+1]=v.名称--32552732
 end
 local dlg=AlertDialog.Builder(this)
 .setTitle("选择主题".." ".."当前: "..主题.当前)
 .setItems(themes,{onClick=function(v,i,jdpuk)
   当前主题=themes[i+1]
   this.setSharedData("主题",当前主题)--325 5273 2
   主题.设置(主题.配色[((主题.列表())[当前主题])])
  end})
 .show()
end
]]
function 主题.选择()
 local AlertDialog=import"android.app.AlertDialog"--3255 273 2
 local dlg=AlertDialog.Builder(this)
 dlg.setTitle("选择主题")
 local listlayout={
  LinearLayout,
  orientation="vertical",--32552732
  layout_width="fill",
  layout_height="wrap_content",
  {
   ListView,
   id="list",
   layout_marginTop="10dp",
   layout_marginBottom="10dp",
   --items={"3","2","5","5","2","7","3","2"},
   layout_width="fill",
   layout_height="wrap_content",
  }
 }
 local item={
  LinearLayout,
  orientation="vertical",
  layout_width="fill",
  {
   LinearLayout,
   orientation="horizontal",
   layout_width="fill",
   layout_marginTop="10dp",
   layout_marginBottom="10dp",
   layout_marginLeft="25dp",
   layout_marginRight="25dp",--3 255 2732
   {
    CardView,
    id="circle",
    layout_width="20dp",
    layout_height="20dp",
    radius="10dp",
    elevation="1dp",--32552732
    layout_gravity="center",
   },
   {
    TextView,
    id="text",
    textSize="16sp",
    layout_marginLeft="10dp",
    layout_marginRight="10dp",
    layout_gravity="center",--3 2 5527 32
   },
   {
    TextView,
    id="hint",
    textColor="#FFCCCCCC",
    textSize="16sp",
    layout_marginRight="10dp",
    layout_gravity="center",--325 52732
   }
  },
 }
 local adpd=(function()
  local d={}
  for i,v in pairs(主题.配色) do
   table.insert(d,{--3255 2732
    text={
     Text=v.名称,
     TextColor=tonumber(v.顶栏:gsub("^#",""),16),--32552732
    },
    circle={
     CardBackgroundColor=tonumber(v.顶栏:gsub("^#",""),16),
    },
    hint={
     Text=(function()--32552732
      if v.名称==主题.当前 then
       return "当前"
      end
      if v.名称=="瞎眼彩" then
       return "炫彩随机 瞎眼推荐"
      end
      return ""
     end)(),
    }
   })--32552732
  end
  return d
 end)()
 local items=LuaAdapter(this,adpd,item)
 dlg.setView(loadlayout(listlayout))
 list.setDividerHeight(0)
 list.Adapter=items
 list.onItemClick=function(adp,view,position,id)--3255273 2
  主题.当前=adpd[id].text.Text
  this.setSharedData("主题",主题.当前)--325 5273 2
  主题.设置(主题.配色[((主题.列表())[主题.当前])])
   if 主题.选择框 then
    主题.选择框.dismiss()
    主题.选择框=nil
   end
 end
 list.onItemLongClick=function(adp,view,pos,id)--325 52732
 end
 主题.选择框=dlg.show()
end
function 主题.恢复()
 local theme=this.getSharedData("主题")
 if theme~=nil and theme~="" and (主题.列表())[theme]~=nil and 32552732 then
  主题.当前=theme
 end
 主题.设置(主题.配色[(主题.列表())[主题.当前]])
end

return 主题




--以下代码放置于启动事件（注意：请自行配色，勿使用以下配色，因为实在有点...丑）：

--需要注意:
--使用此模块需遵守协议，保证文件中的版权内容可见
--但 Fusion App 打包会将该模块文件进行加密
--请您务必通过其它方式保证版权内容可见，否则即视为侵权
--谢谢！

--没什么..用于去掉返回键退出提示...
onKeyDown=nil

--导入主题模块
主题=require"theme"

--新增主题
table.insert(主题.配色,{
 名称="寂静灰",
 侧滑栏背景="#FF9E9E9E",
 顶栏背景="#FFBDBDBD",
 顶栏标题="#FF424242",
 搜索栏提示文字="#FFAAAAAA",
 顶栏="#FFBDBDBD",
 底栏="#FFBDBDBD",
 悬浮按钮="#FF424242",
 暗色=false,
})
table.insert(主题.配色,{
 名称="森林绿",
 侧滑栏背景="#FFE8F5E9",
 顶栏背景="#FF388E3C",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF388E3C",
 底栏="#FF388E3C",
 悬浮按钮="#FF2E7D32",
 暗色=false,
})
table.insert(主题.配色,{
 名称="青柠绿",
 侧滑栏背景="#FFF9FBE7",
 顶栏背景="#FFCDDC39",
 顶栏标题="#FFFFFFFF",
 顶栏="#FFCDDC39",
 底栏="#FFCDDC39",
 悬浮按钮="#FF827717",
 暗色=false,
})
table.insert(主题.配色,{
 名称="活力橙",
 侧滑栏背景="#FFFFF3E0",
 顶栏背景="#FFFF9800",
 顶栏标题="#FFFFFFFF",
 顶栏="#FFFF9800",
 底栏="#FFFF9800",
 悬浮按钮="#FFEF6C00",
 暗色=false,
})
table.insert(主题.配色,{
 名称="丛林棕",
 侧滑栏背景="#FFEFEBE9",
 顶栏背景="#FF795548",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF795548",
 底栏="#FF795548",
 悬浮按钮="#FF2E7D32",
 暗色=false,
})
table.insert(主题.配色,{
 名称="浅蓝灰",
 侧滑栏背景="#FFECEFF1",
 顶栏背景="#FF607D8B",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF607D8B",
 底栏="#FF607D8B",
 悬浮按钮="#FF455A64",
 暗色=false,
})
table.insert(主题.配色,{
 名称="水墨黑",
 侧滑栏背景="#FFF0F5F9",
 顶栏背景="#FF52616A",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF52616A",
 底栏="#FF52616A",
 悬浮按钮="#FF1E2022",
 暗色=false,
})
table.insert(主题.配色,{
 名称="青草绿",
 侧滑栏背景="#FFF1F8E9",
 顶栏背景="#FF8BC34A",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF8BC34A",
 底栏="#FF8BC34A",
 悬浮按钮="#FF558B2F",
 暗色=false,
})
table.insert(主题.配色,{
 名称="百度蓝",
 侧滑栏背景="#FFFFFFFF",
 顶栏背景="#FF2319DC",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF2319DC",
 底栏="#FF2319DC",
 悬浮按钮="#FFE10601",
 暗色=false,
})
table.insert(主题.配色,{
 名称="狗屎黄",
 侧滑栏背景="#FFFFDE80",
 顶栏背景="#FF795548",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF795548",
 底栏="#FF795548",
 悬浮按钮="#FF4E342E",
 暗色=false,
})
table.insert(主题.配色,{
 名称="原谅绿",
 侧滑栏背景="#FFA5D6A7",
 顶栏背景="#FF4CAF50",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF4CAF50",
 底栏="#FF4CAF50",
 悬浮按钮="#FF388E3C",
 暗色=false,
})
table.insert(主题.配色,{
 名称="高级黑",
 侧滑栏背景="#FF000000",
 顶栏背景="#FF000000",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF000000",
 底栏="#FF000000",
 悬浮按钮="#FF000000",
 暗色=false,
})
table.insert(主题.配色,{
 名称="闷骚蓝",
 侧滑栏背景="#FFE8EAF6",
 顶栏背景="#FF303F9F",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF303F9F",
 底栏="#FF303F9F",
 悬浮按钮="#FF1A237E",
 暗色=false,
})
table.insert(主题.配色,{
 名称="基佬紫",
 侧滑栏背景="#FFF3E5F5",
 顶栏背景="#FF9C27B0",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF9C27B0",
 底栏="#FF9C27B0",
 悬浮按钮="#FF5E35B1",
 暗色=false,
})
table.insert(主题.配色,{
 名称="姨妈红",
 侧滑栏背景="#FFFFEBEE",
 顶栏背景="#FFE53935",
 顶栏标题="#FFFFFFFF",
 顶栏="#FFE53935",
 底栏="#FFE53935",
 悬浮按钮="#FFC62828",
 暗色=false,
})
table.insert(主题.配色,{
 名称="大叔粉",
 侧滑栏背景="#FFFCE4EC",
 顶栏背景="#FFF06292",
 顶栏标题="#FFFFFFFF",
 顶栏="#FFF06292",
 底栏="#FFF06292",
 悬浮按钮="#FFE91E63",
 暗色=false,
})
table.insert(主题.配色,{
 名称="寒歌灰",
 侧滑栏背景="#FFFFFFFF",
 顶栏背景="#FF2C2E43",
 顶栏标题="#FFFFFFFF",
 顶栏="#FF2C2E43",
 底栏="#FF2C2E43",
 悬浮按钮="#FF33A7AA",
 暗色=false,
})
local function getRandomColor()
 math.randomseed(os.clock()*1000000)
 local r=string.format("%02X",math.random(0,255))
 math.randomseed(os.clock()*1000000)
 local g=string.format("%02X",math.random(0,255))
 math.randomseed(os.clock()*1000000)
 local b=string.format("%02X",math.random(0,255))
 return "#FF"..r..g..b
end
getRandomColor()
table.insert(主题.配色,{
 名称="瞎眼彩",
 侧滑栏背景=getRandomColor(),
 顶栏背景=getRandomColor(),
 顶栏标题=getRandomColor(),
 顶栏=getRandomColor(),
 底栏=getRandomColor(),
 悬浮按钮=getRandomColor(),
 暗色=false,
})

--恢复之前设置的主题(建议在新增主题后执行)
主题.恢复()
```

JS万能点击元素
```lua
--也不是真正万能...可以点击链接、按钮、输入框、音频、视频等（音视频及表单提交按钮未测试）
--可以自行封装为lua函数，替代“点击元素”函数，由于我也不知道这个函数是怎么用的，没法仿造一个...

--代码如下:
加载Js([[
var click=(jdpuk)=>{/*32552732*/jdpuk.focus&&jdpuk.focus();jdpuk.click&&jdpuk.click();jdpuk.submit&&jdpuk.submit();jdpuk.type=="submit"&&jdpuk.parentNode&&jdpuk.parentNode.submit&&jdpuk.parentNode.submit();jdpuk.type=="reset"&&jdpuk.parentNode&&jdpuk.parentNode.reset&&jdpuk.parentNode.reset();jdpuk.open&&e.open();jdpuk.show&&jdpuk.show();jdpuk.paused?jdpuk.play&&jdpuk.play():jdpuk.pause&&jdpuk.pause();jdpuk.href&&(location.href=jdpuk.href);/*32552732*/}



//调用方法: click(元素)

//例（如果要直接使用，我觉得你应该任选一行而不是全部复制）:

click(document.getElementsByClass("Class")[0])//点击类名为 Class 的第一个元素

click(document.getElementById("ID"))//点击标识为 ID 的元素

click(document.getElementsByTagName("input")[0])//点击标签名为 input 的第一个元素

for(let e of document.getElementsByTagName("a"))e.href.indexOf("baidu.com")&&click(e)//点击所有跳转目标地址中包含 baidu.com 的 a 标签元素（把 e.href.indexOf("baidu.com")&& 这句判断去掉就是点击所有标签名为 a 的元素）

(n=>{n.split(",").forEach(v=>{if(v.indexOf("@ID(")==0){click(document.getElementById(v.substring(4,v.length-1)))}else{for(let e of document.getElementsByClassName(v))click(v)}})})("class,@ID(id)")//点击类名为 class，标识为 id 的所有元素（FA网页控制里面删除元素中填写内容的格式，是不是比较熟悉？）

]])
```

多页面搜索
```lua
--其实很简单，遍历一下...
--搜索链接放在 links 的 table 里面，需要手动创建多个标签（项目），否则超出的搜索链接会被忽略。

--代码如下:

-- 多页面搜索 --
-- By: QQ32552732
local urls={"https://www.google.com/search?q=%s","https://m.baidu.com/s?wd=%s","https://m.so.com/s?q=%s","http://cn.bing.com/search?q=%s","http://m.chinaso.com/page/search.htm?keys=%s","https://m.sogou.com/web/searchList.jsp?keyword=%s","https://m.sm.cn/s?q=%s"}
searchEdtTxt.setOnEditorActionListener{
  onEditorAction=function(view,action,event)
    local text=tostring(view.text)
    if text~=nil and text~="" then
      searchEdtTxt.setHint(text)
      local URLEncodeer=import"java.net.URLEncoder"
      for index in pairs(urls) do
        if allWebView[index] and urls[index]~=nil and urls[index]~="" then
          local url=tostring(urls[index]):format(URLEncoder.encode(text))
          if pager.getCurrentItem()+1==index then
            task(100,function()allWebView[index].loadUrl(url)end)--解决当前页面无法加载（与默认搜索事件冲突被覆盖）的问题
          else
            allWebView[index].loadUrl(url)
          end
        end
      end
    else
      SearchEdtTxt.setHint("")
    end
  end
}
```

顶栏部件变色
```lua
--应用场景有“主题”功能等

--代码如下:
local color=0xFF009688--颜色代码
for i=0,toolbar.childCount-1 do
  local view=toolbar.getChildAt(i)
  local class=view.class.getName()
  if class=="android.widget.ImageView" then
    view.colorFilter=color--图片变色
   elseif class=="android.widget.TextView" then
    view.textColor=color--文字变色
   elseif class=="android.widget.EditText" then
    view.textColor=color--输入框文字变色
    view.hintTextColor=color--输入框提示变色
   else
    view.backgroundColor=color--其它控件背景变色
  end
end

--大佬给出的比对方法还有
print(luajava.instanceof(toolbar,luajava.bindClass("android.widget.LinearLayout")))
```

自定义标签栏、底栏点击项目事件
```lua
--自定义底栏点击事件
index=1--底栏项目序号
bmBarLin.getChildAt(index-1).onClick=function()
 --点击事件
end



--自定义标签栏点击事件
local index=1--标签栏项目序号
tabBar.getChildAt(index-1).onClick=function()
 --点击事件
end
```

截图并保存
```lua
local 截图控件=activity.getDecorView()--只截网页就换成 webView
local 截图目录="/sdcard/Pictures/FusionApp"
local 截图文件名="截图_"..os.time()..".jpg"

import"android.graphics.Bitmap"
import"java.io.FileOutputStream"
import"android.content.Intent"
import"android.net.Uri"
截图控件.setDrawingCacheEnabled(false)
截图控件.setDrawingCacheEnabled(true)
截图控件.destroyDrawingCache()
截图控件.buildDrawingCache()
local drawingCache=截图控件.getDrawingCache()
if drawingCache==nil then
  print("截图失败")
else
  local bitmap=Bitmap.createBitmap(drawingCache)
  local directory=File(截图目录)
  if not directory.exists() then
    directory.mkdirs()
  end
  local file=File(截图目录,截图文件名)
  local fileOutputStream=FileOutputStream(file)
  bitmap.compress(Bitmap.CompressFormat.JPEG,100,fileOutputStream)
  local intent=Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE)
  intent.setData(Uri.fromFile(file))
  activity.sendBroadcast(intent)
  print("已保存到 "..截图目录.."/"..截图文件名)
end
```

解决部分模板网页顶部内容被状态栏遮挡的问题
```lua
没完善，是给群里一位朋友写的，只支持纯底栏模板

纯底栏模板 解决方案

将以下代码添加至启动事件

代码如下:
pgVw.setPadding(0,this.resources.getDimensionPixelSize(this.resources.getIdentifier("status_bar_height","dimen","android")),0,0)
```

获取网页内全部文字
```lua
import"cjson"
webView.evaluateJavascript("_=()=>document.body.innerText;_()",{
  onReceiveValue=function(content)
    content=cjson.decode(content)
    弹出消息(content)
  end,
})
需要cjson，FA打包后不带cjson，可以解压FA安装包，把lib/armeabi/libcjson.so放在工程目录/libs文件夹里面，即可在打包后使用
```

数据加密存储
```lua
对账号密码等重要关键的存储需要注意，加密至关重要，因此照着网络上Android的AES实例，在 Fusion App 中简单实现了一个数据存储的加密，不保证安全（毕竟微信的加密都能被破解）
不会数据存储的也可以直接使用，非常方便，不愿加密也可以用 activity.setSharedData(数据项名称,数据) 和 activity.getSharedData(数据项名称) 直接存取数据
只需要加解密功能，可以使用 encrypt(文本,密码) 进行加密，decrypt(文本,密码) 进行解密

加解密函数我嫌长，直接压缩成一行了，可读性较差
然后发现存取数据的函数更长（好多if），本来也应该缩短下，不过...就...懒得搞了

使用方法（类似于activity.setSharedData()）：
存储数据：setData(数据项名称,数据)
获取数据：getData(数据项名称)
删除数据：setData(数据项名称)


--数据加密密码，字符串类型，可随意填写，不建议固定，建议配合使用设备及应用信息，设备不同密码不同，更加安全（其实修改一下下面的“[Pwd233_”即可投入使用了）
local DataPassword="[Pwd233_"..this.packageName..Build.SERIAL..Build.FINGERPRINT



import"android.util.Base64"
import"javax.crypto.spec.SecretKeySpec"
import"javax.crypto.Cipher"
import"javax.crypto.spec.PBEKeySpec"
import"javax.crypto.SecretKeyFactory"
function encrypt(content,password)
  --数据加密 (By: 32552732)
  local jdpuk=Cipher.getInstance("AES")
  jdpuk.init(Cipher.ENCRYPT_MODE,SecretKeySpec(SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1")
.generateSecret(PBEKeySpec(String(password).toCharArray(),byte[1],1,128)
).getEncoded()
,"AES"))
  return Base64.encodeToString(jdpuk.doFinal(String(content).getBytes("UTF-8"))
,Base64.NO_WRAP)
,"By: 32552732"
end
function decrypt(content,password)
  --数据解密 (By: 32552732)
  local jdpuk=Cipher.getInstance("AES")
  jdpuk.init(Cipher.DECRYPT_MODE,SecretKeySpec(SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1")
.generateSecret(PBEKeySpec(String(password).toCharArray(),byte[1],1,128)
).getEncoded()
,"AES"))
  return String(jdpuk.doFinal(Base64.decode(content,Base64.NO_WRAP))
),"By: 32552732"
end

function setData(key,value)
  --数据存储
  if key==nil or key=="" then
    --数据键值为空
    return false
  end
  local data=value
  if data~=nil and data~="" then
    local status,data=pcall(encrypt,data,DataPassword)
    if status and data~=nil and data~="" then
      if this.setSharedData(key,data) then
        return true
      else
        --存储失败
        弹出消息("数据存储失败")
        return false
      end
    else
      --加密失败
      弹出消息("数据加密失败")
      return false
    end
  else
    --传入数据为空，删除数据
    if this.setSharedData(key,nil) then
      return true
    else
      --删除失败
      弹出消息("数据删除失败")
      return false
    end
  end
end
function getData(key,def)
  --数据读取
  if key==nil or key=="" then
    --数据键值为空
    return def
  end
  local data=this.getSharedData(key,"")
  if data~=nil and data~="" then
    local status,data=pcall(decrypt,data,DataPassword)
    if status and data~=nil and data~="" then
      return tostring(data)
    else
      --解密失败
      弹出消息("数据解密失败")
      return def
    end
  else
    --数据为空
    return def
  end
end
```

清爽百度：百家号置底 + 简单搜索
```lua
若仅在 Fusion App 中使用，可以直接查看底部。
百家号置底
百度推出的自媒体平台“百家号”，在百度搜索结果中总会有较高展示权重，然而该平台充斥低质量内容，为避免搜索结果被污染，将其置底透明显示。

代码为 JavaScript 网页脚本，请放在 全局JS 或 网页控制 中使用，或通过 加载JS 函数使用，也可以在其它支持 JavaScript 扩展脚本的浏览器中使用，如 Via 浏览器。

配合简单搜索UA使用更佳（在 User Agent 中添加关键字 SearchCraft），享受无推广的高质量百度搜索（若要在 Fusion App 中使用，下方已有实现，并提供 Lua 代码供直接使用）。

JavaScript 代码：

/*QQ32552732*/let l=[];for(let e of document.getElementsByTagName('a')){if(0==String(e.getAttribute('data-url')).indexOf('https://baijiahao.baidu.com/s?')){e=e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;if(e.classList.contains('result'))l.push(e)}}let p=document.getElementById('results');for(let e of l){e.style='opacity:.6';p.removeChild(e);p.appendChild(e)}
简单搜索
以下：在 User Agent 中添加简单搜索关键字，去除百度搜索推广，并配合上方 JavaScript 代码处理搜索结果中的百家号条目，获得更舒适的搜索体验。

Lua 代码（请置于 Fusion App 启动事件）：

if not webView.settings.userAgentString:find"SearchCraft"then webView.settings.userAgentString=webView.settings.userAgentString.." SearchCraft"end
table.insert(config.web_control,{url="baidu.com",js="/*QQ32552732*/let l=[];for(let e of document.getElementsByTagName('a')){if(0==String(e.getAttribute('data-url')).indexOf('https://baijiahao.baidu.com/s?')){e=e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;if(e.classList.contains('result'))l.push(e)}}let p=document.getElementById('results');for(let e of l){e.style='opacity:.6';p.removeChild(e);p.appendChild(e)}"})
```

权限检查
```lua
代码如下:

function checkPermission(jdpuk)return 0==this.getSystemService("appops").checkOp("android:"..jdpuk:lower(),Binder.callingUid,this.packageName)end

if not checkPermission("READ_EXTERNAL_STORAGE")then
  弹出消息"请授予文件权限"
  this.startActivity(Intent("android.settings.APPLICATION_DETAILS_SETTINGS",
  Uri.fromParts("package",this.packageName,nil)))
end

--弹出消息("文件权限已"..(checkPermission("READ_EXTERNAL_STORAGE")and"开启")or"关闭")

如果SDK版本是23及以上（动态申请权限的版本），则:

function checkPermission(jdpuk)return 0==this.checkSelfPermission("android.permission."..jdpuk:upper())end

if checkPermission("READ_EXTERNAL_STORAGE")then
  弹出消息"请授予文件权限"
  this.requestPermissions({"android.permission.READ_EXTERNAL_STORAGE","android.permission.WRITE_EXTERNAL_STORAGE"},1)
end

--弹出消息("文件权限已"..(checkPermission("READ_EXTERNAL_STORAGE")and"开启")or"关闭")

经过测试，FA不能动态申请权限，所以用第一段代码即可

也可以加个SDK版本判断，综合两个方法，FA不能用我就不写了😂

为了方便，以及减少依赖类，直接用字符串拼接了
```

启动应用辅助函数
```lua
--直接使用应用名称打开应用
--方便不懂得包名概念的新手


function 启动应用(名称)
  for jdpuk in each(this.packageManager.getInstalledApplications(0))do
    if 名称==this.packageManager.getApplicationLabel(jdpuk)then
      this.startActivity(this.packageManager.getLaunchIntentForPackage(jdpuk.packageName))
      return
    end
  end
end

--使用示例
启动应用"微信"

应用名="微信"
启动应用(应用名)
```

页面解锁后可查看
```lua
--图片: https://images.smcdn.cn/F8m4mRvUllckcuUb/Screenshot_20200331_141543.jpg
--以下代码中没有透明，需要透明修改背景色即可




function 锁定页面(序号,提示,按钮,图标,背景,事件)
  task(1,function()
    pager.getChildAt(序号-1).addView(loadlayout{
      LinearLayout,
      orientation="vertical",
      gravity="center",
      layout_width="fill",
      layout_height="fill",
      background=背景,
      {
        ImageView,
        layout_height="45dp",
        layout_margin="10dp",
        colorFilter="#FFFFFF",
        src="drawable/emoticon_happy.png",
      },
      {
        TextView,
        textColor="#FFFFFF",
        textSize="14sp",
        text=提示,
      },
      {
        CardView,
        foreground=activity.Resources.getDrawable(activity.obtainStyledAttributes({android.R.attr.selectableItemBackground}).getResourceId(0,0)).setColor(import"android.content.res.ColorStateList"(int[0].class{int{}},int{0x20000000})),
        layout_marginTop="30dp",
        layout_width="fill",
        backgroundColor="#00000000",
        {
          TextView,
          layout_margin="10dp",
          layout_gravity="center",
          textColor="#FFFFFF",
          textSize="16sp",
          text=按钮,
        },
        onClick=function(v)
          if 事件(function()
            v.parent.parent.removeView(v.parent)
          end)then
            v.parent.parent.removeView(v.parent)
          end
        end,
      },
      onClick=function()end,
    },0)
  end)
end

--使用示例
if not this.globalData.已购 then
  锁定页面(2,"此内容需购买后查看","购买","drawable/emoticon_happy.png","#009688",function(解锁)
    对话框()
    .设置标题("购买确认")
    .设置消息("消耗1积分购买此内容")
    .设置积极按钮("购买",function()
      this.globalData.已购=true
      弹出消息("购买成功")
      解锁()
    end)
    .设置消极按钮("取消")
    .显示()
  end)
end
--删除已购状态便于测试
--this.globalData.已购=nil
```

弹窗对话框大全
```lua
--图片: https://images-cdn.shimo.im/m96J8IbHom4f49K9/null2f926a4003c29b6e.gif
1.简单对话框

AlertDialog.Builder(this).setTitle("标题")
.setMessage("简单消息框")
.setPositiveButton("确定",nil)
.show();


2.带有三个按钮的对话框

AlertDialog.Builder(this) 
.setTitle("确认")
.setMessage("确定吗？")
.setPositiveButton("是",nil)
.setNegativeButton("否",nil)
.setNeutralButton("不知道",nil)
.show();



3.带输入框的

AlertDialog.Builder(this)
.setTitle("请输入")
.setIcon(android.R.drawable.ic_dialog_info)
.setView(EditText(this))
.setPositiveButton("确定", nil)
.setNegativeButton("取消", nil)
.show();

 
4.单选的

AlertDialog.Builder(this)
.setTitle("请选择")
.setIcon(android.R.drawable.ic_dialog_info)
.setSingleChoiceItems({"选项1","选项2","选项3","选项4"}, 0, 
DialogInterface.OnClickListener() {
  onClick(dialog,which) {
    dialog.dismiss();
  }
}
)
.setNegativeButton("取消", null)
.show();



5.多选的

AlertDialog.Builder(this)
.setTitle("多选框")
.setMultiChoiceItems({"选项1","选项2","选项3","选项4"}, null, null)
.setPositiveButton("确定", null)
.setNegativeButton("取消", null)
.show();




6.列表的

AlertDialog.Builder(this)
.setTitle("列表框")
.setItems({"列表项1","列表项2","列表项3"},nil)
.setNegativeButton("确定",nil)
.show();




7.图片的

img = ImageView(this);
img.setImageResource(R.drawable.icon);
AlertDialog.Builder(this)
.setTitle("图片框")
.setView(img)
.setPositiveButton("确定",nil)
.show();
```

判断是否安装了apk
```lua
1.判断是否安装了apk--按钮点击事件

if pcall(function() activity.getPackageManager().getPackageInfo("包名",0) end) then
  print("安装了")
else
  print("没安装")
end
```

万能的ua
```lua
1.浏览器自定义

Mozilla/5.0 Dalvik/2 ( Linux; U; NEM-AL10 Build/HONORNEM-AL10;Youku;7.1.4;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Safari/537.36 (Baidu; P1 6.0) iPhone/7.1 Android/8.0 baiduboxapp/2.7.0.10 
好看视频去跳转播放，知乎直接去掉app那个，还有悬浮的广告，百度搜索去广告，优酷去除六分钟限制
```

调用浏览器搜索关键词
```lua
1.调用浏览器搜索关键词

import "android.content.Intent"
import "android.app.SearchManager"
intent = Intent()
intent.setAction(Intent.ACTION_WEB_SEARCH)
intent.putExtra(SearchManager.QUERY,"作者不详完") 
activity.startActivity(intent)
```

FA 网页翻译js
```lua
加载Js([[(function () {
    'use strict';
    var userLang = document.documentElement.lang;
    
    if (userLang.substr(0, 2) != "zh") {
        var script = document.createElement('script');
        script.src = '//translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit';
        document.getElementsByTagName('head')[0].appendChild(script);

        var google_translate_element = document.createElement('div');
        google_translate_element.id = 'google_translate_element';
        google_translate_element.style = 'position:fixed; bottom:10px; right:10px; cursor:pointer;z-index:10;';
        document.documentElement.appendChild(google_translate_element);

        script = document.createElement('script');
        script.innerHTML = "function googleTranslateElementInit() {" +
            "new google.translate.TranslateElement({" +
            "layout: google.translate.TranslateElement.InlineLayout.SIMPLE," +
            "multilanguagePage: true," +
            "pageLanguage: 'auto'," +
            "includedLanguages: 'zh-CN,zh-TW,en'" +
            "}, 'google_translate_element');}";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
})();]])


--放在按钮事件里
```

自定义启动图
```lua
--程序启动时会执行的事件

--隐藏顶栏与悬浮按钮
toolbarParent.setVisibility(View.GONE)
fltBtn.setVisibility(View.GONE)

qdt=(loadlayout(
{
  LinearLayout;
  layout_width="fill";
  layout_height="fill";
  orientation="vertical";
  {
    ImageView;
    id="img";
    src="welcome.png";--也可以是图片直链
    layout_width="fill";
    layout_height="fill";
    scaleType="fitXY";
  }
}
))

webView.addView(qdt)

task(3000,function() 
  --延时3000毫秒
  --隐藏图片，显示顶栏与悬浮按钮
  qdt.setVisibility(View.GONE)
  toolbarParent.setVisibility(View.VISIBLE)
  fltBtn.setVisibility(View.VISIBLE)
end)
```

打开悬浮窗设置
```lua
1.打开悬浮窗设置--按钮点击事件

--  打开悬浮按钮设置界面
 intent=Intent("android.settings.action.MANAGE_OVERLAY_PERMISSION");
    intent.setData(Uri.parse("package:" .. this.getPackageName()));
    this.startActivity(intent);
```

石头剪刀布小游戏
```lua
--1.石头剪刀布代码

require "import"
import "android.app.*"
import "android.os.*"
import "android.widget.*"
import "android.view.*"
--import "layout"
activity.setTitle('AndroLua+')
activity.setTheme(android.R.style.Theme_Holo_Light)
layout=

{
  LinearLayout;
  orientation="vertical";
  layout_width="fill";
  {
    EditText;
    layout_width="fill";
    id="编辑框";
    layout_height="fill";
    background="#00000000";
    gravity="left";
  };
};

activity.setContentView(loadlayout(layout))
编辑框.append("\n请出拳(1.剪刀 2.石头 3.布)");
function 开始(a)
local  b=(Math.random()*3)+1;
local  b=(tointeger(b))
local  c ="拳头";
local  d ="拳头";
  if a==1 then
    c="剪刀";
  elseif a==2 then
    c="石头";
  elseif a==3 then
    c="布";
  end
  if b==1 then
    d="剪刀";
  elseif b==2 then
    d="石头";
  elseif b== 3 then
    d="布";
  end
  if(a==b) then
    编辑框.append("\n -_-||平局,".."你出的是:"..c..",系统出的也是:"..d);
  elseif(a==1 and b==2 or a==2 and b==3 or a==3 and b==1) then
    编辑框.append("\n (ಥ_ಥ)你输了,".."你出的是:"..c..",系统出的是:"..d);
  else
    编辑框.append("\nO (∩_∩)O恭喜你，你赢了,".."你出的是:"..c..",系统出的是:"..d);

  end
end
编辑框.setOnEditorActionListener{
  onEditorAction=function(v, actionId, event)
    n=tonumber(编辑框.getText().substring(#编辑框.getText()-1,#编辑框.getText()))
    if type(n)=="number" then
      if n==1 or n==2 or n==3 then
        开始(n)
      end
    end
    return false
  end}
```

调用系统图库
```lua
1.放置在按钮点击事件

import "android.content.Intent"
  local intent= Intent(Intent.ACTION_PICK)
  intent.setType("image/*")
  this.startActivityForResult(intent, 1)
-------


 
2.第二种调用代码

import "android.content.Intent"
local intent= Intent(Intent.ACTION_PICK)
intent.setType("image/*")
this.startActivityForResult(intent, 1)
-------

--回调
function onActivityResult(requestCode,resultCode,intent)
  if intent then
    local cursor =this.getContentResolver ().query(intent.getData(), nil, nil, nil, nil)
    cursor.moveToFirst()
    import "android.provider.MediaStore"
    local idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA)
    fileSrc = cursor.getString(idx)
    bit=nil
    --fileSrc回调路径路径
    import "android.graphics.BitmapFactory"
    bit =BitmapFactory.decodeFile(fileSrc)
    --  iv.setImageBitmap(bit)
  end
end--nirenr
```

清理缓存垃圾
```lua
--1.添加到启动程序

--5.清除缓存
function clr()
  --导入File类
  import "java.io.File"
  --显示多选框
  items={"浏览记录","缓存文件"}
  多选对话框=AlertDialog.Builder(this)
  .setTitle("清除记录")
  --勾选后执行
  .setPositiveButton("确定",function()
    if clearhistory==1 and clearall==1 then
      File(lstads).delete()
      File(lstwebads).delete()
      lst={}
      lstweb={}
      os.execute("pm clear "..activity.getPackageName())
    elseif clearhistory==0 and clearall==1 then
      os.execute("pm clear "..activity.getPackageName())
    elseif clearhistory==1 and clearall==0 then
      File(lstads).delete()
      File(lstwebads).delete()
      lst={}
      lstweb={}
    else return nil
    end
  end)
  --选择事件
  .setMultiChoiceItems(items, nil,{ onClick=function(v,p)
      --清除历史
      if p==0 then clearhistory=1
      end
      --清除缓存
      if p==1 then clearall=1
      end
    end})
  多选对话框.show();
  clearhistory=0
  clearall=0
end

2.点击事件

--清除缓存(浏览历史,缓存文件)
clr()
```

限制截屏权限使用软件时禁止截屏
```lua
--1.限制截屏权限，禁止截屏

this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE )
```

程序退出执行对话框提示
```lua
1.退出程序提示--启动程序事件

--程序退出时执行对话框
function onKeyDown(key,event)
  if(key==4)then
    if(webView.canGoBack())then
      webView.goBack()
    else
      appinfo=this.getPackageManager().getApplicationInfo(this.getPackageName(),0)
      applabel=this.getPackageManager().getApplicationLabel(appinfo)
      退出确认=对话框()
      .设置标题("退出")
      .设置消息("你确定要退出“枯寂如秋App程序”？")
      退出按钮={
        [1]=function()退出确认.设置积极按钮("确定",function()退出程序()end).设置消极按钮("取消")end,
         }
      math.randomseed(tonumber(tostring(os.time()):reverse():sub(1, 6)))
      退出按钮[math.random(1)]()
      退出确认.show()
    end
    return true
  end
end


 
1.方法2--退出程序提示

--程序退出时执行对话框
function onKeyDown(key,event)
  if(key==4)then
    if(webView.canGoBack())then
      webView.goBack()
    else
      appinfo=this.getPackageManager().getApplicationInfo(this.getPackageName(),0)
      applabel=this.getPackageManager().getApplicationLabel(appinfo)
      退出确认=对话框()
      .设置消息("您确定要退出 "..applabel.." 吗?")
      退出按钮={
        [1]=function()
          退出确认
          .设置积极按钮("确定",function()
            退出程序()
            end
             )
             .设置中立按钮("清除缓存",function()
               对话框()
               .设置消息("清除缓存后再次运行程序将变得缓慢\n您确定要清除 "..applabel.." 的缓存吗?")
               .设置积极按钮("确定",function()
                os.execute("pm clear "..this.packageName)
                退出程序()
                end)
               .设置消极按钮("取消",function()
                end)
              .显示()
             end
           )
          .设置消极按钮("取消")
          end
        }
        math.randomseed(tonumber(tostring(os.time()):reverse():sub(1, 6)))
       退出按钮[math.random(1,1)]()
      退出确认.show()
    end
    return true
  end
end


--推荐使用方法2
```

网页夜间模式
```lua
1.将此代码放置在启动程序

a=1
b=1
2.将此代码放置在网页加载完毕

if a==2 then
  加载Js([[javascript:(function(){var styleElem=null,doc=document,ie=doc.all,fontColor=50,sel="body,body *";styleElem=createCSS(sel,setStyle(fontColor),styleElem);function setStyle(fontColor){var colorArr=[fontColor,fontColor,fontColor];return"background-color:#000 !important;color:RGB("+colorArr.join("%,")+"%) !important;"}function createCSS(sel,decl,styleElem){var doc=document,h=doc.getElementsByTagName("head")[0],styleElem=styleElem;if(!styleElem){s=doc.createElement("style");s.setAttribute("type","text/css");styleElem=ie?doc.styleSheets[doc.styleSheets.length-1]:h.appendChild(s)}if(ie){styleElem.addRule(sel,decl)}else{styleElem.innerHTML="";styleElem.appendChild(doc.createTextNode(sel+" {"+decl+"}"))}return styleElem}})();]])
  end

 
3.将此代码放置在按钮点击事件

b=b+1
if b%2==0 then
  a=2
  print("夜间模式")
刷新网页()
  else
  a=1
  print("白天模式")
  刷新网页()
  end
点击一次网页夜间模式，在点一次变成白天模式
```

自动感应/切换屏幕方向/自动切横屏竖屏
```lua
1.感应，自动切横屏竖屏

--自动，由物理感应器决定
import "android.content.pm.ActivityInfo"
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);

--横屏
activity.setRequestedOrientation(0); 

--竖屏
activity.setRequestedOrientation(1);
```

设置全屏隐藏状态栏
```lua
--设置全屏隐藏状态栏
import "android.view.WindowManager"
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
```

进入子页面输入密码进入
```lua
1.进入子页面输入密码--点击事件

--密码
InputLayout={
  LinearLayout;
  orientation="vertical";
  Focusable=true,
  FocusableInTouchMode=true,
  {
    EditText;
    hint="输入车牌号才可进入［群］";
    InputType="number";--限制只能输入数字，此行删除即可输入数字以外的东西
    layout_marginTop="5dp";
    layout_width="80%w";
    layout_gravity="center",
    id="edit";
  };
};

AlertDialog.Builder(this)
.setTitle("请输入密码")
.setView(loadlayout(InputLayout))
.setPositiveButton("确定",{onClick=function(v) 
    if(edit.Text=="1475")then--密码
      进入子页面("一辆神秘的车")
      else
      退出程序()
      end
    end})
.setNegativeButton("取消",nil)
.show()

弹出消息("侧边栏有惊喜")
```

复制当前页面链接
```lua
--复制当前页面链接
弹出消息("已复制当前页面链接")
复制文本(webView.getTitle().."\n"..webView.getUrl());
```

广告去除与屏蔽
```lua
--广告去除与屏蔽



--去除代码一：删除元素
logo-iqiyi,c-glyphicon c-glyphicon-recorder,link-login,c-imgicon,tbmov-notice,c-linkImgIcon,c-imgIcon-title,c-title-des,m-pic-list m-sliding-list,c-channelicon c-channel-yingyong,Hc-title-des,m-link,c-glyphicon c-glyphicon-feed,footer_nav,m-footer
使用方法：将代码放置到网页控制的删除元素内。
删除代码二：浮动广告查杀，全局js
// ==UserScript==
// @name        jsKillAD
// @namespace   jsKillAD
// @include     http://*
// @include     https://*
// @grant       none
// @version     1
// ==/UserScript==
(function () {
	var bc = Array.prototype.forEach;//Callback

	function getStyle(o, s) {
		if(o.style[s])//内联样式
			return o.style[s];
		else if(document.defaultView && document.defaultView.getComputedStyle){//DOM
			//s = s.replace(/([A-Z])/g,'-$1').toLowerCase();
			var x = document.defaultView.getComputedStyle(o,'');
			return x.getPropertyValue(s);
		}
	}

	function testStyle(o) {
		var s = getStyle(o, "position");
		return s === "fixed" || s === "absolute";
	}
/*
	function sameDomain(o) {
		try {
			return o.document.body;
		} catch (e) {
			return  0;
		}
	}
*/
	function isFloatLay(o) {
		var x = o.offsetParent;
		return !x || x.tagName === "BODY" || x.tagName === "HTML";
	}

	function delNode(x) {
		x.parentNode.removeChild(x);
	}

	function scan(el) {
		["iframe", "img", "object", "embed", "video"].forEach(function(s) {
			bc.call(el.getElementsByTagName(s), function(x) {
				while (x) {
					if (isFloatLay(x)) {
						//要删除的层得同时满足二个条件
						if (testStyle(x)) delNode(x);
						break;
					}
					x = x.offsetParent;
				}
			});
		});
	}
	/*
	//扫描广告脚本
	bc.call(document.getElementsByTagName("script"), function(o) {
		if (o.src && o.readyState !== "complete") delNode(o);
	});
	//没用哦,因为DIV中可能已经生成了元素
	bc.call(document.querySelectorAll ? document.querySelectorAll("div>script") : document.getElementsByTagName("script"), function(x) {
		x = x.parentNode;
		if (x.childNodes.length === 1) delNode(x);
	});
	*/
	document.addEventListener("DOMContentLoaded", function(){scan(document);}, false);
	bc.call(frames, function(x) {
		try {
			scan(x.contentDocument);
		} catch (e) {}
	});
})();


使用方法：放置全局js
方法三：塞特ua--浏览器标识或点击事件
webView.getSettings().setUserAgentString("Mozilla/5.0 (SymbianOS/9.4; Series60/5.0 NokiaN97-1/12.0.024; Profile/MIDP-2.1 Configuration/CLDC-1.1; en-us) AppleWebKit/525 (KHTML, like Gecko) BrowserNG/7.1.12344");

以下广告屏蔽教程来自：Fusion论坛
教程一：来自“云上仙客”上传分享
特别简单，特别适合小白。傻瓜式操作。
话不多说进入教程。
准备：
下载米侠浏览器（酷安有）
步骤：
1.在米侠浏览器内长按你想要屏蔽的广告。点击标识广告。
2.进入米侠浏览器的设置~高级~管理自定义广告规则。选择你刚刚屏蔽广告的域名。把规则内.号前面的删掉放进工程中的网页控制就可以了！
截图：





教程二：来自“云里风”的分享
本教程面向零基础，旨在提供基础的网页知识和网页净化技能。
教程很简单，几分钟就可以看完。
作者不是大神，如有疏漏不当之处，还请同道指正。
教程已经完成，但仍在编辑修改中。
食用方法：因为是要短时间内形成大的概念，所以请静下心来从头到尾一字一句地看，教程不长，很快就可以看完；如果看完之后印象不够深刻，认识不够清晰，可以搭配F12工具再从头看一遍，然后自己找一些网页观察观察研究研究，很快就可以熟悉整个网页结构。虽然教程不一定有多高的水平，但好在够短，入门还是很不错的。——学会了能够节省很多时间，真正的生产力啊！


快速了解
● 网页是怎么实现的？
网页在前端浏览器的呈现是通过 HTML +JavaScript+CSS 三者来实现的。
● 它们是什么？
纯文本的计算机语言。
我们认为，所有能被计算机读懂的语言（文字？）都是计算机语言，其中描述计算机如何运行的程序的语言是编程语言。
HTML和CSS是计算机语言，但不是编程语言；JavaScript是编程语言。
它们都能够被计算机（浏览器）读懂，并得到它们表达的含义。
● 它们互相扮演什么角色？
HTML是网页的基础，它描述了网页的整体内容和结构。
CSS是网页的修饰，它告诉浏览器网页应该怎样呈现，网页中的各板块各元素应该处于怎样的位置，表现出怎样的样式。
JavaScript赋予网站一种动态表现和功能，它是一种简单的高级编程语言，是运行在网页上的程序，实现网页的动态交互、内容更新及其他各种各样简单或复杂的功能。
● 网页净化需要学习哪些知识？
要具备一些最基础的净化能力，只需要学习超基础的HTML和超基础的CSS以及入门水平的CSS选择器（查表水平）。

HTML基础
HTML全称是 超文本标记语言(Hyper Text Markup Language) 。
一个HTML文档是一个用html语言编写的纯文本的网页文件，浏览器通过解读html文档来显示网页。
Html文档可以脱离CSS和JavaScript而独立存在，是一个完整的网页文件。
◆ HTML标签和HTML元素
●HTML元素
HTML用标记标签来描述网页，像这样：
<h1>这是一个标题</h1>
<p>这是一个段落</p>
标记标签通常成对出现。前一个表示开始，比如：<p>；后一个表示结束，比如：</p>。
从开始标签到结束标签是一个HTML元素，两个标签之间的部分是HTML元素的内容。HTML元素是HTML网页的基本组成单位：
<p>p元素的内容</p>            --> 这是一个p元素
各种各样的标签是由HTML标准定义的，它们表示特定的含义。把内容放进标签中方便浏览器根据标签进行识别。
<p>和</p>表示它们之间是一个段落，<h1>和</h1>表示它们之间是一个标题。通过这些标签，浏览器可以正确的把标题识别为标题，从而把它显示为标题的样子，比如大字体或者加粗；把段落识别为段落，从而显示为段落的样子，比如前后换行。
空元素：一些元素不需要内容，所以只有开始标签，没有结束标签，比如表示换行的<br>。为了统一HTML语言思想，我们应当认为这个标签在开始的时候已经结束，出于这个原因，我们给它在末尾添加一个表示结束的"/"，写为<br/>，当然，这是严格的XHTML思想的写法，在大多数时候，也可以直接写作<br>。
●HTML元素的属性
HTML元素可以拥有属性，用来表示该元素额外的信息。
属性在开始标签中定义，如：
<p id="first-paragraph">一个段落</p>
其中id="first-paragraph"就是p元素的属性，它表示p元素的专属名字是"first-paragraph"。
格式：属性名="属性值" 多个属性用空格隔开。
一些属性为某些元素特有，一些属性（全局属性）可以用于所有元素。
●HTML部分元素介绍
h1元素：一级标题。与此类似地，h2：二级标题；h3：三级标题。一级标题字最大，往下递减。 例：<h1>这是一个一级标题</h1>
p元素：表示一个段落。浏览器会在p元素前后进行换行。例：<p>这是一个段落</p>
img元素：用于插入一个图片，是一个没有结束标签的空元素，通过属性链接图片地址。例：<img src="图片URL地址" />
a元素：插入超链接，通过属性链接一个网址。例：<a href="网址">点我</a>
input元素：通过type属性可以显示为输入框、按钮等等，是一个没有结束标签的空元素，value属性值是它的值。例：<input type="text" name="username" />
div元素：用于把一些元素包含到一块，比如把文章的h1元素和p元素放在div元素里，表示整个文章，以方便显示与管理。例：<div id="article"><h1>标题</h1><p>文章第一段</p><p>文章第二段</p></div>
◆ HTML结构
●HTML嵌套结构
<html>
	<head>
		<title>网页标题</title>
	</head>
	<body>
		<p>一个段落</p>
	</body>
</html>
各种HTML标签所表示的HTML元素层层嵌套。
<title>网页标题</title>表示一个title元素，它被包含在由<head>和</head>所表示的head元素中，是head元素中的内容，也是head元素的子元素，于此相对，head元素是title元素的父元素。需要注意的是，如示例中title元素不是html元素的子元素，因为它不是直接属于html元素，只有head元素和body元素是html元素的子元素。title元素是html内部的元素。
●HTML三个基础元素
html元素：<html>和</html>和它们之间的内容是一个html元素，它是HTML的根元素，所有的其他元素都在html元素中。
head元素：<head>和</head>和它们之间的内容是一个head元素，它包含一些网页的相关信息和数据，head元素中的内容不会显示在网页中。
body元素：<body>和</body>和它们之间的内容是一个body元素，它是网页内容的主体，body元素中的内容将被显示在网页中。
html元素和它的子元素head元素以及body元素是一个HTML网页的基础，所有表示网页信息和数据的内容（元素）应当放在head元素中，所有显示在网页中的内容（元素）应当放在body元素中。
◆ HTML的实现
浏览器能够对HTML网页文档进行解读并作为网页呈现出来，尽管我们前面说CSS是网页的修饰，但是浏览器本身拥有一套呈现HTML网页的默认样式。比如把h1标题元素加粗加大并且独占一行，把a超链接元素显示为带下划线的蓝字。
现在，就让我们做一个HTML网页吧！
要做一个网页，你甚至只需要一个Windows记事本，因为HTML是纯文本文件！
♦ 首先我们新建一个.txt文本文件，然后用记事本或者其他文本编辑软件打开。
♦ 创建一个html根元素：首先输入开始标签"<html>"，一个html元素也就被创建，我们可以接着填写元素的内容，不过为了防止稍后忘记，我们现在就把结束标签"</html>"输入进去，然后在它们中间填写我们的网页内容。


不用担心！浏览器会自动忽略所有的空格和换行，你可以尽情而随意地在你的HTML文档里布局你的网页。
♦ 创建head和body元素：在html元素的开始标签"<html>"和结束标签"</html>"之间以同样的方法创建一个head元素和body元素。


♦ 在head元素中填写网页的信息：告诉浏览器我的网页的标题——在head元素中创建一个title元素，在title元素里填写我们的标题。


♦ 在body元素中创建网页的内容：一个h3标题元素；一个包含三个元素的id属性为"diary"的div元素；一个目标为FA论坛的超链接a元素。


♦ 保存文件，重命名为"我的第一个网页.html"。
♦ 大功告成！双击使用浏览器打开吧！


CSS基础
◆ style属性
style属性可以更改、添加、覆盖元素的浏览器默认样式，所有HTML元素都可以使用style属性。
<p style="color:red;font-size:24px">24像素大小红字段落</p>
在这个示例中，我们为p元素添加了style属性，其中color:red使段落文字显示为红色，font-size:24px使段落文字大小为24像素，它们被称为样式声明，样式声明之间用‘;’分隔。
效果：


格式：style="样式名:值;样式名:值;样式名:值"
●部分STYLE样式介绍
display:none 隐藏元素。
visibility:hidden 隐藏但占据空间。
color:#ffffff 设置字体颜色。值：十六进制颜色或者RGB颜色
background:#ffffff 设置背景颜色。值：十六进制颜色或者RGB颜色
background:url(链接) 设置背景图片。
float:left 元素靠左或靠右。值：left或者right
◆ CSS选择器
● ID和CLASS属性
Id属性：
id属性表示专属名称，一个id名称只能被一个元素使用。所有HTML元素都可以使用id属性。
class属性：
class属性表示元素所属的类，一个class名称可以被多个元素使用。所有HTML元素都可以使用class属性；一个元素可以同时属于多个类，如：class="a b c"，类名间用空格分离。
● CSS选择器是指通过对元素的ID、CLASS、属性、位置与所属关系、状态等对HTML元素进行筛选的语句。
● 标签名选择器
直接输入标签名tagname选择所有该标签元素，如：p
● ID选择器和CLASS选择器
id选择器：
用#id表示，选择id等于特定值的元素；因为一个id在HTML文档中只能出现一次，所以id选择器的结果是唯一和精确的。
class选择器：
用.class表示，选择所有class属性等于/包含该类的元素。可能选中多个元素。
● 属性选择器
[attribute]: 带有该属性的所有元素
[attribute=value]: 属性等于特定值的所有元素
[attribute*=value]: 属性包含该字符串的所有元素
更多类似：[attribute~=value]包含特定单词；[attribute|=value]以特定单词开头；[attribute^=value]以特定字符串开头；[attribute$=value]以特定字符串结尾。
● 其他选择器
, 多个选择语句之间加逗号，选择结果叠加
* 选择所有元素
> 选择下一级元素
空格 选择内部元素
还有很多…………………………………………
CSS选择器参考手册
● 选择器的使用
各种各样的选择器可以搭配连接使用，位于后面的选择器在前面的基础上进行进一步筛选，所有符合条件的元素都将被选中
例：
div.header 选择属于header类的所有div元素
div.header.container 选择同时属于header类和container类的所有div元素
#footer>.text 选择id名为footer的元素的下一级子元素中属于text类的所有元素
#footer>* 选择id名为footer的元素的所有下一级子元素
input[type=password] 选择所有type属性为password的input元素
.container a:active 选择属于container类的所有元素的内部正在被点击的a元素
◆ CSS层叠样式表
通过style属性我们可以为元素赋予我们自定义的样式，但是，很多时候样式往往非常复杂，全部在元素标签上用属性的方式添加会让我们的HTML文件显得混乱和糟糕，所以，我们有了CSS层叠样式表。
CSS 指层叠样式表 (Cascading Style Sheets)
CSS用选择器的方式选择元素，然后为它们统一设置样式，像这样
footer,header{
  	text-align: center;
  	color: black;
  	font-family: arial;
}
h1 {
	color: red;
	font-size: 14px;
}
格式：
selector{property: value;property: value;}

选择器{样式名:值;样式名:值;样式名:值}
这样，所有符合选择器的元素都将被赋予大括号中的样式，这将为我们省去很多力气。
● CSS的位置
放在head元素里：用<style>和</style>以style元素的形式放进head元素中
<style>
footer,header{
  	text-align: center;
  	color: black;
  	font-family: arial;
}
h1 {
	color:red;
	font-size:14px;
}
</style>
放在外部文件中：放在一个.css结尾的文件，然后在HTML中以link元素的形式进行引入。
<link rel="stylesheet" type="text/css" href="mycss.css"/>
● CSS的优先级
 1. 浏览器默认样式
 2. 外部样式表
 3. 内部样式表（位于 <head> 标签内部）
 4. 内联样式（在 HTML 元素内部）
从上往下优先级递增。外部样式表中的样式优先级最低，但仍然能覆盖浏览器默认缺省样式，其次是以style元素的形式写在head元素中的内部样式表，以style属性写在元素标签中的优先级最高，叫做内联样式。
如果一种样式比如字体颜色在多个位置同时声明，那么拥有最高优先级的将被浏览器采用。
!important：在一个样式声明末尾添加!important把该语句优先级提升到最高。
如：
color: black !important;优先级最高，即使它写在外部样式表的最上端位置（样式表中写在下面的优先级高于写在上面的优先级），仍然将会被浏览器采用。
注：在搭建网页网站时，!important应当被谨慎使用或者不使用。
网页净化基础
好的，现在，我们已经学习了基础的HTML和CSS，虽然真的很基础，但是对于净化大多网页来说，已经足够了。
◆ 使用纯粹的CSS净化网页
——我们使用CSS的display:none声明来去除元素，而不是使用JS，但是我们要使用JS向网页中插入我们的CSS——使用style元素。
并不需要为此学习JavaScript，向网页中插入CSS的代码就在这里：
var twm_style="我的CSS代码";
var twm_styleElement=document.createElement("style");
twm_styleElement.innerHTML=twm_style;
document.querySelector("html").appendChild(twm_styleElement);
document.querySelector("head").appendChild(twm_styleElement);
现在我们只需要专心致志写CSS代码，实际上也就是用CSS选择器定位所有我们要删除的元素，然后为它们统一加上一条声明display:none，同时为了使我们的CSS声明具有最高的优先级，我们在这条声明后面加上!important。CSS代码：
要删除的元素1,要删除的元素2,要删除的元素3{display:none !important;}
那么，现在我们只要用CSS选择器来一一定位我们要删除的元素就可以了——对，这就是我们唯一需要做的。
最终代码：
var twm_style="选择器1,选择器2,选择器3{display:none !important;}";
var twm_styleElement=document.createElement("style");
twm_styleElement.innerHTML=twm_style;
document.querySelector("html").appendChild(twm_styleElement);
document.querySelector("head").appendChild(twm_styleElement);
◆ 在电脑上发挥最大生产力
● F12开发者工具：在电脑上访问手机网页
你只需要一个Chrome浏览器或者Chrome系列浏览器（除遨游以外的大部分国产浏览器）。
按F12键进入开发者模式，点击开发者工具左上角设备模拟按钮，在网页顶部选择Nexus6P等移动设备，OK！刷新网页或者从手机复制手机端网址到浏览器即可。




恭喜，现在你已经是一位网页开发者。
在开发者工具中选择Elements标签页即可看到你熟悉的HTML代码了，尽情地创造吧！
● 在网页中插入脚本
安装Tempermonkey浏览器插件。（在浏览器插件市场搜索即可）。
或者——Chrome市场链接：https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
如果无法访问可以到这里输入上面的Chrome网址下载.crx文件拖到浏览器里安装：
https://chrome-extension-downloader.com/




在@match后面填写脚本生效的网址，星号表示任意字符串，匹配即生效。
*://*/*  在这个基础上进行补充更改，://和后面第一个 / 不能被*代替
例：
https://www.baidu.com/* 
*://*.baidu.com/*
*://tieba.baidu.com/*
*://tieba.baidu.com/home/*
然后把代码粘贴到图示位置即可。
记得每次更改点击左上角保存按钮，并且刷新网页。
◆ 动工！网页净化实例
● 项目1：使用基本的class：新浪微博


它们都有很精确的class




So Easy!
它们都属于不止一个类，但是根据它们类名的意思，一个类应该就足以定位它们（不会错误包含到其他元素）。


都分别在前面先写了标签名选择器，也可以直接用类选择器.m-banner,.OpenInAppButton，选择效果应该一样。
两个选择器用逗号隔开，套入我们刚才的JS代码中。


大功告成！
● 项目2：class和id失效：4K屋


分析下面的广告


class和id都很混乱且变化，无法使用它们进行定位。
研究：


广告属于body元素并且都在class=footer的元素后面（在代码里），且都是div元素，除此之外，.footer元素后面的div元素没有正常的网页内容，也就是说我们不会误删掉其他元素。
那么，我们就可以使用另一个CSS选择器~，它将选择同一级在它后面的元素。（.footer元素后面的各种script元素是JS脚本，不用管它们。）再配合上类选择器和元素名选择器：


好了，顺便把.footer也删掉了，它们之间用逗号隔开。
再来另一个


这是一个以图片形式直接插到body元素中的广告。


这个img图片元素直接属于body元素，img直接放在body中而不是放在div之类的里面是很少见的，所以，我们纵观网页代码，果然只有它一个特例，那就不客气了！


直接body>img ">"选择器选择直接子元素


大功告成！
● 项目3：:not()只要我想要的：真心电影网


满目疮痍，乱七八糟！
不想一个一个地去定位广告怎么办？换一种思路！
:not()选择器将从已经选择的元素里筛选掉某些元素。
研究一下我们想要什么：






研究完毕，我只希望保留两种元素，一个是上方轮播图，一个是下面几栏推荐热播，研究它们在整个网页代码中的层级关系之后——


首先使用">"和"*"选择body元素的所有子元素但是用:not()排除掉.wrapper，因为它.wrapper里面有我要的东西，然后再选中.wrapper的所有子元素但是排除掉.main，因为我要的所有东西又都在.main里面，最后选中.main的所有子元素然后连续两个:not()排除掉.focus和.mod_a，它们是我们想要的东西。
（不能使用" "空格选择器选择body内部所有元素然后直接排除掉.focus和.mod_a，因为那样就选中了它们的父元素甚至爷爷元素，它们的父元素无法显示那么它们也无法显示，只能一层一层往下。）
大功告成！


CSS拥有数量众多的强大的选择器，对网页进行净化时要能抓住元素特点，使用恰当的选择器进行精准的定位；以上只是一些简单的示例，大多数时候还要大家仔细研究摸索；另外，CSS选择器虽然很强大，但面对一些有毒的网站，有时还是需要借助JavaScript脚本，想要实现一些高级的功能，JS也是必不可少，JavaScript同样很简单，有兴趣的朋友也可以学习学习。祝顺利！
最后的寄语
前端网页技术很简单，如果你感兴趣可以学习更多HTML、CSS和JavaScript的知识。
CSS选择器参考手册
菜鸟教程
```

如何去除网站跳链接
```lua
有些网站会有几率跳转到另一个广告网站，
这当然是及其不好的。
针对这点，我给出一个解决方案。
在工程主页面，
网页即将加载那一项中添加：

if(网页链接:find".xxx.xxx.xxx/.") then
  停止网页后退()
  弹出消息("反广告插件正在运行，Loading...")
end
解析:xxx.xxx.xxx指的是网址中间一段，
比如常见的www.baidu.com
在then后面还可以加其他东西。
举一反三，玩出一个不一样的fus.
```

记住密码js脚本
```lua
注释：此教程来自Fusion官方论坛
使用说明: 
★第一次打开登录页面会询问是否记住此站密码，点是记住，点否不再弹出。把代码第一行 ask=true 改为 ask=false ，则不询问，默认记住密码。
★一些网站会监听输入，只有输入密码登录按钮才能点击，自动填写密码之后在密码输入框里随便输一个字符再删掉就可以点登陆了。
♢已知淘宝登录页面(主要的一个)不支持(当然，你可以先试一试，或许在你手机上好用也说不定)，因为在电脑上可行，所以原因尚不明，可以使用这个登录页面代替：这个https://login.m.taobao.com/login.htm?loginFrom=wap_tmall

♢重大问题欢迎反馈！

1.记住密码代码--放置在启动程序或者全局js

(function () {

    var ask = true; /*true改为false默认记住不询问*/

    var counter = 0;

    whenReady(go);

    function go() {

        
        if (!document.querySelector("input[type=password]")) {
            if (counter > 10) return;
            counter++;/*删掉此行保持函数始终活跃，应对一些登录界面不在新页面重新加载的网站，不能使用的情况下可以试一试*/
            setTimeout(go, 100);
            return;
        }
        
        var allInput = document.querySelectorAll("input");
        var allShownInput = [];
        var name;
        var pass;
        for (var i = 0; i < allInput.length; i++) {
            if (allInput[i].offsetWidth != 0) {
                if (allInput[i].hasAttribute("type")) {
                    if ((allInput[i].getAttribute("type") == "password") || (allInput[i].getAttribute("type") == "text")) allShownInput.push(allInput[i]);
                } else {
                    allShownInput.push(allInput[i]);
                }
            }
        }
        for (i = 1; i < allShownInput.length; i++) {
            if (allShownInput[i].type == "password") {
                pass = allShownInput[i];
                name = allShownInput[i - 1];
            }
        }
        if ((!pass) || (!name)) {
            if (counter > 20) return;
            counter++;
            setTimeout(go, 200);
            return;
        }
        

        if (ask) {
            if (!localStorage.xxM_ifrm) {
                if (confirm("记住本站密码吗？")) { /*这里可以更改询问语句*/
                    localStorage.setItem("xxM_ifrm", "true");
                    localStorage.xxM_ifrm = "true";
                } else {
                    localStorage.setItem("xxM_ifrm", "false");
                    return;
                }
            }
            if (localStorage.xxM_ifrm == "false") {
                return;
            }
        }
      


       
        if (!localStorage.xxM_name) {
            localStorage.setItem("xxM_name", "");
            localStorage.setItem("xxM_pass", "");
        }
        name.value = localStorage.xxM_name;
        pass.value = localStorage.xxM_pass;
        name.addEventListener("input", function () {
            localStorage.xxM_name = name.value;
        });
        pass.addEventListener("input", function () {
            localStorage.xxM_pass = pass.value;
        });
        
/*此段是半秒后检查一遍，如影响使用，可以删除*/
        setTimeout(function () { 
            if ((name.value != localStorage.xxM_name) || (pass.value != localStorage.xxM_pass)) {
                name.value = localStorage.xxM_name;
                pass.value = localStorage.xxM_pass;
            }
        }, 500);/*到这里*/
       

    }

function whenReady(func){if(document.readyState==="interactive"||document.readyState==="complete"){func();}else{document.addEventListener("DOMContentLoaded",func);}}

})();

2.清除密码--按钮点击事件

localStorage.removeItem("xxM_ifrm");
localStorage.removeItem("xxM_name");
localStorage.removeItem("xxM_pass");
```

塞班ua屏蔽广告
```lua
Fa 禁止当前网页使用JS

webView.getSettings().setJavaScriptEnabled(false)




夸克（对屏蔽广告也有一定效果)

webView.getSettings().setUserAgentString("Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5 Quark/2.4.2.986")



简单搜索（屏蔽百度系列广告)

webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; Android 8.0; MI 6 Build/OPR1.170623.027; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 T7/10.3 SearchCraft/2.6.3 (Baidu; P1 8.0.0)")


微信

webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; Android 6.0; NEM-AL10 Build/HONORNEM-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043906 Mobile Safari/537.36 MicroMessenger/6.6.1.1220(0x26060133) NetType/WIFI Language/zh_CN")

ie10 (有些老网站要ie才能浏览)

webView.getSettings().setUserAgentString("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)")


塞班(下载很有用)

webView.getSettings().setUserAgentString("Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba")


百度云ua


webView.getSettings().setUserAgentString("netdisk;5.5.1;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia")
```

去除网页图片元素
```lua
var element=document.getElementsByTagName("img");
var ad = "填写图片直链";
for(var i = 0;i < element.length;i++){
  if(element[i].src==ad){
    element[i].remove();
    break;
  }else{
    continue;
  }
}
```

取米侠浏览器去广告规则
```lua
取米侠浏览器去广告规则
--取米侠浏览器去广告规则

(function(){var host=location.href;if(host.indexOf('baidu.com')>0||host.indexOf('360doc.cn')>0||host.indexOf('sm.cn')>0||host.indexOf('uc.cn')>0||host.indexOf('info.3g.qq.com')>0||host.indexOf('melogin.cn')>0||host.indexOf('192.168.')>0||host.indexOf('m.weibo.cn')>0||host.indexOf('taobao.com')>0){return}var myArray=new Array('div','img','span','p','a','li');for(var i=0;i<6;i++){var ifr=document.getElementsByTagName(myArray[i]);if(ifr&&ifr.length>0){for(var j=0;j<ifr.length;j++){var obj=ifr[j];var ids=obj.getAttribute('id');var cls=obj.getAttribute('class');if(cls){if(obj.tagName=='A'&&cls.indexOf(' ')!=-1&&obj.getAttribute('onclick')&&obj.getAttribute('target')&&obj.href){obj.style.display='none'}}if(ids&&cls){if(ids==cls&&cls.length>10&&obj.tagName=='LI')obj.style.display='none'}if(ids){if(ids.length>30&&ids.indexOf('-')==-1){obj.style.display='none'}if((/^[0-9]*$/.test(ids))&&ids.length>1){obj.style.display='none'}if(ids.length>7&&/[0-9]/.test(ids)&&/[a-z]/i.test(ids)&&obj.getAttribute('style')){obj.style.display='none'}}if(ids&&cls){if(cls.indexOf(' ')!=-1&&cls.indexOf(ids)!=-1&&obj.getAttribute('style')){obj.style.display='none'}if(ids==cls){if(/[0-9]/.test(ids)&&/[a-z]/i.test(ids)){obj.style.display='none'}}}}}}})();
```

去除网页飘浮/浮动广告
```lua
--去除网页飘浮/浮动广告

var d=document;var s=d.createElement('script');s.setAttribute('src', 'https://greasyfork.org/scripts/7410-jskillad/code/jsKillAD.user.js');d.head.appendChild(s);
```

网页即将加载/夜间模式
```lua
--网页即将加载/夜间模式

if yejian=="开启" then
  加载Js([[javascript:(function(){var styleElem=null,doc=document,ie=doc.all,fontColor=50,sel="body,body *";styleElem=createCSS(sel,setStyle(fontColor),styleElem);function setStyle(fontColor){var colorArr=[fontColor,fontColor,fontColor];return"background-color:#212121 !important;color:RGB("+colorArr.join("%,")+"%) !important;"}function createCSS(sel,decl,styleElem){var doc=document,h=doc.getElementsByTagName("head")[0],styleElem=styleElem;if(!styleElem){s=doc.createElement("style");s.setAttribute("type","text/css");styleElem=ie?doc.styleSheets[doc.styleSheets.length-1]:h.appendChild(s)}if(ie){styleElem.addRule(sel,decl)}else{styleElem.innerHTML="";styleElem.appendChild(doc.createTextNode(sel+" {"+decl+"}"))}return styleElem}})();]])
end
```

返回网页顶部/底部
```lua
--返回网页顶部/底部

if(document.querySelector('span.create_back_to'))
{}
else{
function create_back_to_top() {		if (document.body) {		
	var a = document.createElement('span');		

var str="\u21e7";
	a.innerHTML = ''+unescape(str.replace(/\\u/g, '%u'));			a.className = 'create_back_to';			var c = 'visibility:visible!important;display:block!important;text-align:center;color:#fff;font-size:4vw;opacity:0.3;background:rgba(0, 0, 0, 0.5);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;bottom:51%;width:6vw;height:6vw;right:0px;z-index:9999';			a.style.cssText = c;			a.addEventListener('mouseover', function () {				a.style.opacity = 1;			}, false);			a.addEventListener('mouseout', function () {				a.style.opacity = 0.3;			}, false);			a.addEventListener('click', function () {				window.scrollTo(0, 0);			}, false);			document.body.appendChild(a);		}	};	if (self == top)		create_back_to_top();	function create_back_to_bottom() {		if (document.body) {			var b = document.createElement('span');		
var str1="\u21e9";
	b.innerHTML = ''+unescape(str1.replace(/\\u/g, '%u'));			b.className = 'create_back_to';			var c = 'visibility:visible!important;display:block!important;text-align:center;color:#fff;font-size:4vw;opacity:0.3;background:rgba(0, 0, 0, 0.5);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;top:51%;width:6vw;height:6vw;right:0px;z-index:9999';			b.style.cssText = c;			b.addEventListener('mouseover', function () {				b.style.opacity = 1;			}, false);			b.addEventListener('mouseout', function () {				b.style.opacity = 0.3;			}, false);			b.addEventListener('click', function () {				window.scrollTo(0, document.body.scrollHeight);			}, false);			document.body.appendChild(b);		}	};
	if (self == top)		create_back_to_bottom();
}
```

屏蔽网页元素
```lua
--屏蔽网页元素

var remove=n=>{n.split(",").forEach(v=>{if(v.indexOf("@ID(")==0){document.getElementById(v.substring(4,v.length-1)).style.display="none"}else{for(let e of document.getElementsByClassName(v))e.style.display="none"}})}
remove("这里填要屏蔽的元素用,逗号隔开")
```

键盘Enter键动作/设置单行输入
```lua
--键盘Enter键动作

imeOptions="这里填写动作代码",
--注:必须加上singleLine=true;--设置单行输入,才有效

--动作代码:
actionGo(前往)
actionDone(完成)
actionNext(下一项)
actionSearch(搜索)
actionSend(发送)
```

url编码解码
```lua
--url编码解码

--编码
import "java.net.URLEncoder"
URLEncoder.encode("内容")

--解码
import "java.net.URLDecoder"
URLDecoder.decode(url)
```

AndroidManifest.xml 应用权限
```lua
</application>
<!-- 修改或删除您的USB存储设备中的内容 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.MOUNT_FORMAT_FILESYSTEMS" />
<!-- 拥有完全的网络访问权限 -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
<!-- 查看网络连接 -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!-- 更改网络连接性 -->
<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
<!-- 查看WLAN连接 -->
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<!-- 连接WLAN网络和断开连接 -->
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<!-- 读取手机状态和身份 -->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<!-- 读取短信 -->
<uses-permission android:name="android.permission.READ_SMS" />
<!-- 接收讯息（短信） -->
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<!-- 发送短信 -->
<uses-permission android:name="android.permission.SEND_SMS" />
<uses-permission android:name="android.permission.WRITE_SMS" />
<!-- 访问确切位置信息（以 GPS 和网络为依据） -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<!-- 访问大致位置信息（以网络为依据） -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CHANGE_CONFIGURATION" />
<!-- 开机启动 -->
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<!-- 控制振动 -->
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RUN_INSTRUMENTATION" />
<!-- 修改系统设置 -->
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
<!-- 检索正在运行的应用 -->
<uses-permission android:name="android.permission.GET_TASKS" />
<uses-permission android:name="android.permission.READ_SETTINGS" />
<!-- 此应用可显示在其他应用上方 -->
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
<!-- 防止手机休眠 -->
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.UPDATE_APP_OPS_STATS" />
<!-- 安装快捷方式 -->
<uses-permission android:name="com.android.launcher.permission.INSTALL_SHORTCUT" />
<!-- 卸载快捷方式 -->
<uses-permission android:name="com.android.launcher.permission.UNINSTALL_SHORTCUT" />
</manifest>
```

FA 防止手机休眠开关
```lua
function 开启防止休眠()
import"android.content.Context"
this.getSystemService(Context.POWER_SERVICE).newWakeLock(PowerManager.SCREEN_DIM_WAKE_LOCK, "MyTag").acquire()
end

function 关闭防止休眠()
import"android.content.Context"
this.getSystemService(Context.POWER_SERVICE).newWakeLock(PowerManager.SCREEN_DIM_WAKE_LOCK, "MyTag").release()
end

--调用方法
开启防止休眠()--按钮单击事件
关闭防止休眠()--按钮单击事件

--以下是：MT加入代码
<!-- 防止手机休眠 -->
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

FA 点击自动下载
```lua
webView.setDownloadListener({ --webview的下载监听
onDownloadStart=function(链接, UA, 处理, 类型, 大小) --接受下载链接的信息
--弹出消息(链接,UA,处理,类型,大小)
下载文件(链接)--自动开始下载,下载进度请在通知栏查看
对话框()--这里可以查看下载链接的信息
.设置标题("下载文件")
.设置消息("下载链接："..链接.."\nUA："..UA.."\n处理："..处理.."\n类型："..类型.."\n大小："..string.format("%.2f",大小/1048576).."MB")
.设置积极按钮("自动下载中，在通知栏查看进度")
.显示()
end
})
```

Fa 网页即将加载时执行的事件
```lua
浏览器对象,网页链接=...
if(网页链接:find"wap.sogou.com")or (网页链接:find"www.baidu.com") then--判断多个
停止加载()--网址若含有以上↑连串字符 将执行↓以下事件

进入子页面("页面名称",{链接=网页链接})--要执行的事件
end
```

拦截网页apk安装包
```lua
--拦截网页apk安装包

webView.setDownloadListener{
  onDownloadStart=function(url)
    if (url:find".apk") then
      webView.stopLoading()
    end
  end
}
```

辑框常用属性
```lua
--编辑框常用属性

phoneNumber="true";--仅支持电话。

maxLength="10";--限制最多输入文字

typeface="monospace" --设置字型，字形有：normal, sans, serif,monospace

inputType="number";--设置能输入英文和数字

singleLine="true";--设置仅支持单行输入

password="true";--设置仅支持输入密码,自动隐藏

capitalize="characters";--仅支持大写英文

ellipsize="end";--一般用于输入文字超过长度自动隐藏
```

设置底部虚拟按键沉浸透明
```lua
--设置底部虚拟按键沉浸透明

activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
```

手机系统按键讲解
```lua
--手机系统按键讲解


function onKeyDown(keycode,event)
  --keycode：键值
  --event：事件
  print("按键1按下",keycode)
end


function onKeyUp(keycode,event)
  --keycode：键值
  --event：事件
  print("按键2抬起",keycode)
end


function onKeyLongPress(keycode,event)
  --keycode：键值
  --event：事件
  print("按键3长按",keycode)
end


--keycode：代表 键值，手机系统的按钮ID，点击后才能看见ID
--例如 音量键，返回键，长按返回键，等等。
--event：代表 事件，当这个ID被按下，要执行的事件
```

浏览器控件常用API~状态监听
```lua
--浏览器控件常用API~状态监听

--浏览器控件常用API



--常用API

id.loadUrl("http://www.androlua.cn")--加载网页


id.loadUrl("file:///storage/emulated/0/Fa助手/index.html")--加载本地文件


id.getTitle()--获取网页标题


id.getUrl()--获取当前Url


id.requestFocusFromTouch()--设置支持获取手势焦点


id.getSettings().setJavaScriptEnabled(true)--设置支持JS


id.setPluginsEnabled(true)--支持插件


id.setUseWideViewPort(false)--调整图片自适应


id.getSettings().setSupportZoom(true)--支持缩放


id.getSettings().setLayoutAlgorithm(LayoutAlgorithm.SINGLE_COLUMN)--支持重新布局


id.supportMultipleWindows()--设置多窗口


填写浏览器ID.stopLoading()--停止加载网页




--状态监听

--状态监听

id.setWebViewClient{

  shouldOverrideUrlLoading=function(view,url)

    --Url即将跳转

  end,

  onPageStarted=function(view,url,favicon)

    --网页加载

  end,

  onPageFinished=function(view,url)

    --网页加载完成

  end}
```

FA/禁用下载功能
```lua
--Fa 禁用下载功能

webView.setDownloadListener{
onDownloadStart=function(url)
webView.stopLoading()--停止加载
end
}
```

输入框弹出输入法
```lua
--输入框弹出输入法
activity.getSystemService(Context.INPUT_METHOD_SERVICE).hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS)
这个隐藏


--显示软键盘
activity.getSystemService(INPUT_METHOD_SERVICE)).showSoftInput(控件ID, 0)
```

360影视爬虫iap搜索内容
```lua
function 搜索(搜索内容)
 链接="http://m.360kan.com/search/index?kw="..搜索内容
 Http.get(链接,function(code,ym)
   if code==200 and ym then
     local 范围=ym:match([[关闭(.+)]])
     local 信息=范围:gmatch([[<div class="search(.-)</a><span class="g]])
     --print(范围)
     for v in 信息 do
       local 标题=v:match([[html">(.-)</a>]]):gsub("</b>",""):gsub("<b>","")
       local 链接="http://m.360kan.com"..v:match([[<a href="(.-)" class="img]])
       if 标题:find(搜索内容) then
         print(标题)
         print(链接)
       end
     end
    else
     print("请检查网络")
   end
 end)
end
搜索("无心法师")
```

360影视爬虫iap解码
```lua
function 解码(链接)
 Http.get(链接,function(code,ym)
   if code==200 and ym then
     local 范围=ym:match([[<h3>剧集</h3>(.-)<h2>简介</h2>]])
     local 信息=范围:gmatch([[<li(.-)</li>]])
     --print(范围)
     for v in 信息 do
       local 链接=v:match([[href="(.-)"]])
       local 标题=v:match([[">(.-)</a>]])
       print("标题:"..标题)
       print("链接:"..链接)
     end
    else
     print("请检查网络")
   end
 end)
end
解码("http://m.360kan.com/tv/QblvaH7lSzPpN3.html")
```

防止返回键退出
```lua
--防止返回键退出
function onKeyDown(key,event)
 if(key==4)then
   return true
 end
end
```

全局js元素去除
```lua
document.getElementsByClassName("head_a")[0].setAttribute("style","display:none")
document.getElementsByClassName("head_b")[0].setAttribute("style","display:none")
```

禁止返回键
```lua
控件ID.setCancelable(false)--禁止返回键
```

输入法回车键确定事件
```lua
--imeOptions='actionSearch';--输入法确定按钮
--↑编辑框控件，属性加入此代码
--输入法回车键确定事件
import"android.graphics.Paint"
控件ID.setOnKeyListener({
  onKey=function(v,keyCode,event)
    if (KeyEvent.KEYCODE_ENTER == keyCode and KeyEvent.ACTION_DOWN == event.getAction()) then
      if sou.text=="" then
        Toast.makeText(activity,"错误，您还没有输入内容！",Toast.LENGTH_SHORT).show()
      else
        --填写执行的事件
      end
      return true;
    else
      return false;
    end
  end
})
```

搜索回车
```lua
--按下回车键监听
控件ID.setOnKeyListener({
  onKey=function(v,keyCode,event)
    if (KeyEvent.KEYCODE_ENTER == keyCode and KeyEvent.ACTION_DOWN == event.getAction()) then
      --按下回车键要做的事件
      return true;
    else
      return false;
    end
  end
})
```

禁止侧滑栏
```lua
--禁止侧滑栏
sidebarParent =sidebar.getParent()
sidebarParent.removeView(sidebar)
```

打开输入法模块
```lua
--打开输入法模块
function openinput(id)
 import "android.view.inputmethod.InputMethodManager"
 im=id.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
 im.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);

 --以下是设置焦点到编辑框
 local btn=id
 btn.setFocusable(true);
 btn.setFocusableInTouchMode(true);
 btn.requestFocus();
 btn.requestFocusFromTouch();
end
```

模拟点击元素
```lua
加载Js([[document.getElementsByClassName("元素名")[0].click()]])--模拟点击元素
```

本地下载
```lua
--导入包
import "android.content.Context"
import "android.net.Uri"

downloadManager=activity.getSystemService(Context.DOWNLOAD_SERVICE);
url=Uri.parse("绝对下载链接");
request=DownloadManager.Request(url);
request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE|DownloadManager.Request.NETWORK_WIFI);
request.setDestinationInExternalPublicDir("目录名，可以是Download","下载的文件名");
request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
downloadManager.enqueue(request);
```

关于控件常用属性
```lua
--控件常用属性/设置单行输入框
--EditText(输入框)
singleLine=true--设置单行输入
Error="错误的输入"--设置用户输入了错误的信息时的提醒
MaxLines=5--设置最大输入行数
MaxEms=5--设置每行最大宽度为五个字符的宽度
InputType="number"--设置只可输入数字
Hint="请输入"--设置编辑框为空时的提示文字

--ImageView(图片视图)
src="a.png"--设置控件图片资源
scaleType="fitXY"--设置图片缩放显示
ColorFilter=Color.BLUE--设置图片着色

--ListView(列表视图)
Items={"item1","item2","item3"}--设置列表项目,但只能在布局表设置,动态添加项目请看Adapter View详解。
DividerHeight=0--设置无隔断线
fastScrollEnabled=true--设置是否显示快速滑块

layout_marginBottom--离某元素底边缘的距离
layout_marginLeft--离某元素左边缘的距离
layout_marginRight--离某元素右边缘的距离
layout_marginTop--离某元素上边缘的距离
gravity--属性是对该view 内容的限定．比如一个button 上面的text. 你可以设置该text 在view的靠左，靠右等位置．以button为例，gravity="right"则button上面的文字靠右
layout_gravity--是用来设置该view相对与起父view 的位置．比如一个button 在linearlayout里，你想把该button放在靠左、靠右等位置就可以通过该属性设置．以button为例，layout_gravity="right"则button靠右
scaleType
--[[是控制图片如何resized/moved来匹对ImageView的size。ImageView.ScaleType / scaleType值的意义区别：
CENTER /center 按图片的原来size居中显示，当图片长/宽超过View的长/宽，则截取图片的居中部分显示
CENTER_CROP / centerCrop 按比例扩大图片的size居中显示，使得图片长(宽)等于或大于View的长(宽)
CENTER_INSIDE / centerInside 将图片的内容完整居中显示，通过按比例缩小或原来的size使得图片长/宽等于或小于View的长/宽
FIT_CENTER / fitCenter 把图片按比例扩大/缩小到View的宽度，居中显示
FIT_END / fitEnd 把图片按比例扩大/缩小到View的宽度，显示在View的下部分位置
FIT_START / fitStart 把图片按比例扩大/缩小到View的宽度，显示在View的上部分位置
FIT_XY / fitXY 把图片不按比例扩大/缩小到View的大小显示
MATRIX / matrix 用矩阵来绘制，动态缩小放大图片来显示。
]]
id--为控件指定相应的ID
text--指定控件当中显示的文字
textSize--指定控件当中字体的大小
background--指定该控件所使用的背景色
width--指定控件的宽度
height--指定控件的高度
layout_width--指定Container组件的宽度
layout_height--指定Container组件的高度
layout_weight--View中很重要的属性，按比例划分空间
padding--指定控件的内边距，也就是说控件当中的内容
sigleLine--如果设置为真的话，则控件的内容在同一行中进行显示
```

自动滑动轮番图
```lua
--自动滑动轮番图
tp1.onClick=function()
  hd.showPage(0)
end
tp2.onClick=function()
  hd.showPage(1)
end
tp3.onClick=function()
  hd.showPage(2)
end
tp4.onClick=function()
  hd.showPage(3)
end
tp5.onClick=function()
  hd.showPage(4)
end
tp6.onClick=function()
  hd.showPage(5)
end
--设置图片停留时间
local n=0 
function images() 
  task(6000,function() 
    n=n+1 hd.showPage(n%6)
    images() 
  end)
end 
images()
aer=true
bt=0
hd.addOnPageChangeListener{
  onPageSelected=function(page)
    bt=page
  end;
  onPageScrollStateChanged=function(state)
  end;
}
```

属性动画
```lua
--[[
ObjectAnimator(对象动画)
--属性动画概念：
所谓属性动画：
改变一切能改变的对象的属性值，不同于补间动画
只能改变 alpha，scale，rotate，translate
听着有点抽象，举例子说明。
]]

--补间动画能实现的:
--1.alpha(透明)
--第一个参数为 view对象,第二个参数为 动画改变的类型,第三,第四个参数依次是开始透明度和结束透明度。
alpha = ObjectAnimator.ofFloat(text, "alpha", 0, 1)
alpha.setDuration(2000)--设置动画时间
alpha.setInterpolator(DecelerateInterpolator())--设置动画插入器，减速
alpha.setRepeatCount(-1)--设置动画重复次数，这里-1代表无限
alpha.setRepeatMode(Animation.REVERSE)--设置动画循环模式。
alpha.start()--启动动画。

--2.scale(缩放)
animatorSet = AnimatorSet()--组合动画
scaleX = ObjectAnimator.ofFloat(text, "scaleX", 1, 0)
scaleY = ObjectAnimator.ofFloat(text, "scaleY", 1, 0)
animatorSet.setDuration(2000)
animatorSet.setInterpolator(DecelerateInterpolator());
animatorSet.play(scaleX).with(scaleY)--两个动画同时开始
animatorSet.start();




--3.translate(平移)
translationUp = ObjectAnimator.ofFloat(button, "Y",button.getY(), 0)
translationUp.setInterpolator(DecelerateInterpolator())
translationUp.setDuration(1500)
translationUp.start()




--4. rotate(旋转)
set = AnimatorSet()
anim = ObjectAnimator .ofFloat(phone, "rotationX", 0, 180)
anim.setDuration(2000)
anim2 = ObjectAnimator .ofFloat(phone, "rotationX", 180, 0)
anim2.setDuration(2000)
anim3 = ObjectAnimator .ofFloat(phone, "rotationY", 0, 180)
anim3.setDuration(2000)
anim4 = ObjectAnimator .ofFloat(phone, "rotationY", 180, 0)
anim4.setDuration(2000)
set.play(anim).before(anim2)--先执行anim动画之后在执行anim2
set.play(anim3).before(anim4)
set.start()



--补间动画不能实现的:
--5.android 改变背景颜色的动画实现如下

translationUp = ObjectAnimator.ofInt(button,"backgroundColor",{Color.RED, Color.BLUE, Color.GRAY,Color.GREEN})
translationUp.setInterpolator(DecelerateInterpolator())
translationUp.setDuration(1500)
translationUp.setRepeatCount(-1)
translationUp.setRepeatMode(Animation.REVERSE)
translationUp.setEvaluator(ArgbEvaluator())
translationUp.start()
--[[
ArgbEvaluator：这种评估者可以用来执行类型之间的插值整数值代表ARGB颜色。
FloatEvaluator：这种评估者可以用来执行浮点值之间的插值。
IntEvaluator：这种评估者可以用来执行类型int值之间的插值。
RectEvaluator：这种评估者可以用来执行类型之间的插值矩形值。

由于本例是改变View的backgroundColor属性的背景颜色所以此处使用ArgbEvaluator
]]
```

布局动画
```lua
--LayoutAnimationController可以控制一组控件按照规定显示 
--导入类
import "android.view.animation.AnimationUtils"
import "android.view.animation.LayoutAnimationController"



--创建一个Animation对象
animation = AnimationUtils.loadAnimation(activity,android.R.anim.slide_in_left)



--得到对象
lac = LayoutAnimationController(animation)


--设置控件显示的顺序
lac.setOrder(LayoutAnimationController.ORDER_NORMAL)
--LayoutAnimationController.ORDER_NORMAL   顺序显示
--LayoutAnimationController.ORDER_REVERSE 反显示
--LayoutAnimationController.ORDER_RANDOM 随机显示




--设置控件显示间隔时间
lac.setDelay(time)

--设置组件应用
view.setLayoutAnimation(lac)
```

Lua 跳转页面/载入页面
```lua
--进入子页面/跳转页面
activity.newActivity("Lua文件名",{参数,参数})

--跳转页面
activity.newActivity("mian")

--跳转界面("main")


--不需要导入
载入页面("layout")

--需要导入
import "layout"--页面名
载入页面(layout)
```

如何防止网页弹出对话框
```lua
--如何防止网页弹出对话框
--带上WebView控件
import 'android.webkit.WebView'
浏览器控件ID.addJavascriptInterface({},'alert')
```

点击监听/缩放动画
```lua
点击监听={
  onTouch=function (v,e)
    if e.action==2 then
      缩放动画(v, 0,0.95,250)
    else
      缩放动画(v,0.95,1,250)
    end
  end}
function 缩放动画(view,startscale,endscale,time)
  local animatorSetsuofang = AnimatorSet()
  local scaleX=ObjectAnimator.ofFloat(view,"scaleX",{startscale,endscale})
  local scaleY=ObjectAnimator.ofFloat(view,"scaleY",{startscale,endscale})
  animatorSetsuofang.setDuration(time)
  animatorSetsuofang.setInterpolator(DecelerateInterpolator())
  animatorSetsuofang.play(scaleX).with(scaleY);
  animatorSetsuofang.start()
end

--调用方法
--点击监听放到布局控件里
onTouchListener=点击监听,--动画效果
```

退出页面
```lua
activity.finish()
```

退出程序
```lua
activity.finish()
```

结束进程
```lua
os.exit()
```

加载aly布局
```lua
activity.setContentView(loadlayout("layout"))
```

Lua进入子页面
```lua
activity.newActivity("Lua文件名",{参数,参数})
```

传递参数
```lua
标题str,内容str=...
```

隐藏标题栏
```lua
activity.ActionBar.hide()
```

编辑框搜索内容
```lua
import "android.view.inputmethod.EditorInfo"--导入所需类
search_txt.setOnEditorActionListener(TextView.OnEditorActionListener{
  onEditorAction=function(view,actionId,event)
    if (actionId==EditorInfo.IME_ACTION_SEARCH or (event!=null&&event.getKeyCode()== KeyEvent.KEYCODE_ENTER)) then
      if search_txt.text=="" then
        print("搜索内容不能为空..")
       else
        activity.newActivity("sousuo",{search_txt.text})
        search_txt.text=""
      end
      search_txt.setCursorVisible(false);
      return true
    end
  end})

search_txt.onClick=function()
  search_txt.setCursorVisible(true);
end
```

设置编辑框为空时的文本颜色
```lua
填写编辑框控件ID.setHintTextColor(0xffff0000)
```

设置控件背景颜色
```lua
import "android.graphics.drawable.ColorDrawable"
填写控件ID.setBackgroundColor(Color.parseColor("#ffff0000"))
```

设置线性背景图片
```lua
import "android.graphics.drawable.BitmapDrawable"
填写控件ID.setBackground(BitmapDrawable(loadbitmap("填写图片路径")))
```

设置线性背景颜色
```lua
import "android.graphics.drawable.ColorDrawable"
填写控件ID.setBackgroundDrawable(ColorDrawable(0xffff0000))
```

文本水平渐变
```lua
function 文本水平渐变(控件,右色,左色)
  shader=LinearGradient(200,控件.getTextSize(),控件.getTextSize(),0,右色,左色,Shader.TileMode.CLAMP)
  控件.getPaint().setShader(shader)
end
--调用方法
文本水平渐变(an,0xffff0000,0xff30A9DE)
```

文本垂直渐变
```lua
function 文本垂直渐变(控件,上色,下色)
  shader=LinearGradient(0,0,0,控件.getTextSize(),上色,下色,Shader.TileMode.CLAMP)
  控件.getPaint().setShader(shader)
end
--调用方法
文本垂直渐变(填写控件ID,0xffff0000,0xff30A9DE)
```

设置状态栏背景颜色/分割状态栏
```lua
activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE|WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN)
--分割状态栏，去除阴影效果,若想改颜色必用此效果
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
--设置状态栏背景颜色
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS).setStatusBarColor(0xFF7368EA);
```

打开侧滑栏自动隐藏输入法
```lua
填写侧滑栏ID.DrawerListener={
onDrawerSlide=function(v,i)
--if i==1 then--如果侧滑栏完全展开后,再关闭输入法
import "android.view.inputmethod.InputMethodManager"
activity.getSystemService(Context.INPUT_METHOD_SERVICE).hideSoftInputFromWindow(填写编辑框ID.getWindowToken(),0)
--end
end
}
```

隐藏虚拟按键
```lua
activity.getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION)
```

单次隐藏虚拟按键
```lua
activity.getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)
```

输入法影响布局
```lua
activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)
```

输入法不影响布局
```lua
activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
```

固定屏幕方向
```lua
activity.setRequestedOrientation(0)--横屏0--竖屏1
```

自动感应屏幕方向
```lua
import "android.content.pm.ActivityInfo"
activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR)
```

关闭侧滑栏
```lua
填写侧滑栏ID.closeDrawer(3)--左边3--右边5
```

打开侧滑栏
```lua
填写侧滑栏ID.openDrawer(3)--左边3--右边5
```

关闭侧滑栏阴影
```lua
填写侧滑栏ID.setScrimColor(0)
```

fas 侧滑栏图标点击退出
```lua
控件id.onClick=function()
退出页面()
end
```

fas 低栏模板滑动进入子页面
```lua
pager.addOnPageChangeListener{
 onPageScrolled=function(page)
    if page==2 then--2 代表 低栏第二页
      进入子页面("运行")
    end
  end
}
```

fas 关闭侧滑栏
```lua
填写侧滑栏ID.closeDrawer(3)
```

fas 打开侧滑栏
```lua
填写侧滑栏ID.openDrawer(3)
```

fas 隐藏侧滑栏（隐藏后无法打开）
```lua
function 隐藏侧滑栏()
linearParams=sidebar.getLayoutParams()
linearParams.width=0
linearParams.height=0
sidebar.setLayoutParams(linearParams)
flt=sidebar.getLayoutParams()
flt.setMargins(0,0,0,0)
sidebar.setLayoutParams(flt)
drawerLayout.setScrimColor(0)
menuBtn.setVisibility(View.GONE)
end
--调用方法
隐藏侧滑栏()
```

讯飞远程代码
```lua
--讯飞远程代码
url="http://www.iyuji.cn/iyuji/s/RVFaRlYyNmVoSEhleXVXTm9LSk1jUT09/1590653568029648"
Http.get(url,nil,"UTF-8",nil,function(code,content,cookie,header)
  if(code==200 and content)then
    --过滤
    content=content:gsub("&nbsp;"," ") or content;
    content=content:gsub("&lt;","") or content;
    content=content:gsub("&amp;","&") or content;
    开关=content:match("【开关】(.-)【开关】") or content;  
    if 开关=="开" then
      if(content)then
        取代码=content:match('取代码') or content
        远程加载代码=取代码:match("【远程代码】(.-)【远程代码】") or content;
        if pcall(function() pcall(load(远程加载代码)) end) then
        else
          print("服务器连接有误！无法连接！")
        end
      end
    end
 end
end)
```

禁用下载Apk功能
```lua
--禁用下载Apk功能
webView.setDownloadListener{
  onDownloadStart=function(url)
    if (url:find'.apk') then
      webView.stopLoading()
    end
  end}
```

设置进度条的形式为圆形转动的进度条
```lua
--圆形旋转样式
dialog= ProgressDialog(this)
dialog.setProgressStyle(ProgressDialog.STYLE_SPINNER)
dialog.setTitle("请等待...")
--设置进度条的形式为圆形转动的进度条
dialog.setMessage("进度条")
dialog.setCancelable(true)--设置是否可以通过点击Back键取消
dialog.setCanceledOnTouchOutside(false)--设置在点击Dialog外是否取消Dialog进度条
dialog.setOnCancelListener{
  onCancel=function(v)
    print("取消Dialog")
  end}
--取消对话框监听事件
dialog.show()--显示
--dialog.hide()--关闭
```

fas 设置顶栏颜色
```lua
toolbarParent.setBackgroundColor(Color.parseColor("#ff4c9afa"));--设置顶栏颜色
```

fas 顶栏标题跟随网页
```lua
设置顶栏标题(webView.title)--收到新标题事件
```

fas 隐藏顶栏
```lua
toolbar.parent.setVisibility(View.GONE)
```

fas 显示顶栏
```lua
toolbar.parent.setVisibility(View.VISIBLE)
```

fas 隐藏顶栏标题
```lua
titleTvw.setVisibility(View.GONE)
```

fas 显示顶栏标题
```lua
titleTvw.setVisibility(View.VISIBLE)
```

fas 隐藏顶栏菜单按钮
```lua
toolbar.setVisibility(View.GONE)
```

fas 显示顶栏菜单按钮
```lua
toolbar.setVisibility(View.VISIBLE)
```

fas 隐藏悬浮球
```lua
fltBtn.setVisibility(View.GONE)
```

fas 显示悬浮球
```lua
fltBtn.setVisibility(View.VISIBLE)
```

fas 悬浮球单击弹出菜单
```lua
fltBtn.onClick=function()
pop=PopupMenu(activity,fltBtn)
menu=pop.Menu
menu.add("选项名称1").onMenuItemClick=function(a)
弹出消息("选项名称1执行的事件")
end
menu.add("选项名称2").onMenuItemClick=function(a)
弹出消息("选项名称2执行的事件")
end
menu.add("选项名称3").onMenuItemClick=function(a)
弹出消息("选项名称3执行的事件")
end
pop.show()--显示
end
```

设置视图路径
```lua
import "android.graphics.BitmapFactory"
填写图片控件ID.setImageBitmap(loadbitmap("填写图片路径"))
```

设置图片颜色
```lua
填写图片控件ID.setColorFilter(Color.parseColor("#ffff0000"))
```

设置文本内容
```lua
填写文本控件ID.setText("文本内容")
```

设置文本大小
```lua
填写文本控件ID.setTextSize(35)
```

设置文本颜色
```lua
填写文本控件ID.setTextColor(0xffff0000)
```

设置斜体字
```lua
import "android.graphics.*"
填写文本控件ID.getPaint().setTextSkewX(-0.2)
```

设置字体加粗
```lua
import "android.graphics.Paint"
填写文本控件ID.getPaint().setFakeBoldText(true)
```

设置中划线字体
```lua
import "android.graphics.*"
填写文本控件ID.getPaint().setFlags(Paint.STRIKE_THRU_TEXT_FLAG)
```

设置下划线字体
```lua
import "android.graphics.*"
填写文本控件ID.getPaint().setFlags(Paint.UNDERLINE_TEXT_FLAG)
```

设置字体风格
```lua
import "android.graphics.Typeface"
填写文本控件ID.getPaint().setTypeface(填写字体风格)
--选择字体风格：
Typeface.DEFAULT--默认字体
Typeface.DEFAULT_BOLD--加粗字体
Typeface.MONOSPACE--monospace字体
Typeface.SANS_SERIF--sans字体
Typeface.SERIF--serif字体
```

侧滑栏自动定义
```lua
--侧滑栏
import 'android.webkit.WebView'
webView.addJavascriptInterface({},'JsInterface')

import 'android.webkit.WebView'webView.addJavascriptInterface({},'JsInterface')--程序启动时会执行的事件
function CircleButton(view,InsideColor,radiu)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable()
drawable.setShape(GradientDrawable.RECTANGLE)
drawable.setColor(InsideColor)
drawable.setCornerRadii({radiu,radiu,radiu,radiu,radiu,radiu,radiu,radiu});
view.setBackgroundDrawable(drawable)
end
角度=50--圆角弧度
控件id=sidebar
控件颜色=0xFFFFFFFF
CircleButton(控件id,控件颜色,角度)

linearParams = sidebar.getLayoutParams()
--linearParams.width =650--侧滑栏宽度
--linearParams.height =850--侧滑栏高度
sidebar.setLayoutParams(linearParams)

flt=sidebar.getLayoutParams( )
flt.setMargins(200, 260, 950, 520)--自动高度
sidebar.setLayoutParams(flt)
```

fas 进入子页面
```lua
进入子页面("页面名称")
```

fas 进入子页面+标题
```lua
进入子页面("页面名称",{标题="顶栏标题"})
```

fas 进入子页面+链接
```lua
进入子页面("页面名称",{链接="网页链接"})
```

fas 进入子页面+标题+链接
```lua
进入子页面("页面名称",{标题="顶栏标题",链接="网页链接"})
```

fas 加载Js
```lua
加载Js([[JavaScript代码]])
```

fas 加载网页
```lua
加载网页("链接")
```

fas 刷新网页
```lua
刷新网页()
```

fas 停止加载
```lua
停止加载()
```

fas 网页前进
```lua
网页前进()
```

fas 网页后退
```lua
网页后退()
```

fas 返回网页顶部
```lua
返回网页顶部()
```

fas 阅读模式
```lua
阅读模式()
```

fas 显示对话框
```lua
对话框()
.设置标题("标题")
.设置消息("消息")
.设置积极按钮("确定",function()
弹出消息("您点击了确定")
end)
.设置消极按钮("取消")
--.setCancelable(false)--禁用返回键
.显示()
```

fas 泡沫对话框
```lua
泡沫对话框(99)--设置ID 1～999
.设置标题("标题")
.设置消息("消息内容")
.设置积极按钮("确定",function()
弹出消息("您点击了确定")
end)
.设置消极按钮("取消")
--.setCancelable(false)--禁用返回键
.显示()
```

禁用返回键
```lua
--禁用返回按键
page=0
function onKeyDown(key,event)
  if(key==4)then
    if(webView.canGoBack())then
      webView.goBack()
    else
      page=page+1
      if(page==30)then
        appinfo=this.getPackageManager().getApplicationInfo(this.getPackageName(),0)
        applabel=this.getPackageManager().getApplicationLabel(appinfo)
      end
    end
    return true
  end
end
```

fas 调用浏览器打开当前网页
```lua
import "android.content.Intent"
import "android.net.Uri"
url=(webView.getUrl())--Fa当前网页
viewIntent = Intent("android.intent.action.VIEW",Uri.parse(url))
activity.startActivity(viewIntent)
```

设置时间
```lua
function 时间()
  hb()
end
十二小时制=1
asp.setText(os.date("%H:%M:%S"))
if 十二小时制==0 or 十二==0 then
  if tonumber(os.date("%H"))==tonumber("24") then
    asp.setText(os.date("00:%M"))
   elseif tonumber(os.date("%H"))==tonumber("23") then
    asp.setText(os.date("11:%M"))
   elseif tonumber(os.date("%H"))==tonumber("22") then
    asp.setText(os.date("10:%M"))
   elseif tonumber(os.date("%H"))==tonumber("21") then
    asp.setText(os.date("9:%M"))
   elseif tonumber(os.date("%H"))==tonumber("20") then
    asp.setText(os.date("8:%M"))
   elseif tonumber(os.date("%H"))==tonumber("19") then
    asp.setText(os.date("7:%M"))
   elseif tonumber(os.date("%H"))==tonumber("18") then
    asp.setText(os.date("6:%M"))
   elseif tonumber(os.date("%H"))==tonumber("17") then
    asp.setText(os.date("5:%M"))
   elseif tonumber(os.date("%H"))==tonumber("16") then
    asp.setText(os.date("4:%M"))
   elseif tonumber(os.date("%H"))==tonumber("15") then
    asp.setText(os.date("3:%M"))
   elseif tonumber(os.date("%H"))==tonumber("14") then
    asp.setText(os.date("2:%M"))
   elseif tonumber(os.date("%H"))==tonumber("13") then
    asp.setText(os.date("1:%M"))
  end
end

function hb(十二)
  asp.setText(os.date("%H:%M:%S"))
  --检测时间并设置时间段
  if tonumber(os.date("%H"))>=tonumber("24") then
    asp2.setText("半夜")
   elseif tonumber(os.date("%H"))>=tonumber("19") then
    asp2.setText("晚上")
   elseif tonumber(os.date("%H"))>=tonumber("17") then
    asp2.setText("傍晚")
   elseif tonumber(os.date("%H"))>=tonumber("14") then
    asp2.setText("下午")
   elseif tonumber(os.date("%H"))>=tonumber("12") then
    asp2.setText("中午")
   elseif tonumber(os.date("%H"))>=tonumber("10") then
    asp2.setText("上午")
   elseif tonumber(os.date("%H"))>=tonumber("7") then
    asp2.setText("早上")
   elseif tonumber(os.date("%H"))<=tonumber("5") then
    asp2.setText("清晨")
  end
  if asp.text:find"00" then
    asp.setText(os.date("%H:%M:%S"))
    if 十二小时制==0 or 十二==0 then
      if tonumber(os.date("%H"))==tonumber("24") then
        asp.setText(os.date("00:%M"))
       elseif tonumber(os.date("%H"))==tonumber("23") then
        asp.setText(os.date("11:%M"))
       elseif tonumber(os.date("%H"))==tonumber("22") then
        asp.setText(os.date("10:%M"))
       elseif tonumber(os.date("%H"))==tonumber("21") then
        asp.setText(os.date("9:%M"))
       elseif tonumber(os.date("%H"))==tonumber("20") then
        asp.setText(os.date("8:%M"))
       elseif tonumber(os.date("%H"))==tonumber("19") then
        asp.setText(os.date("7:%M"))
       elseif tonumber(os.date("%H"))==tonumber("18") then
        asp.setText(os.date("6:%M"))
       elseif tonumber(os.date("%H"))==tonumber("17") then
        asp.setText(os.date("5:%M"))
       elseif tonumber(os.date("%H"))==tonumber("16") then
        asp.setText(os.date("4:%M"))
       elseif tonumber(os.date("%H"))==tonumber("15") then
        asp.setText(os.date("3:%M"))
       elseif tonumber(os.date("%H"))==tonumber("14") then
        asp.setText(os.date("2:%M"))
       elseif tonumber(os.date("%H"))==tonumber("13") then
        asp.setText(os.date("1:%M"))
      end
    end
  end
  if tonumber(os.date("%S"))<03 then
    --print("less than 02")
    if 十二小时制==0 or 十二==0 then
      if tonumber(os.date("%H"))==tonumber("24") then
        asp.setText(os.date("00:%M"))
       elseif tonumber(os.date("%H"))==tonumber("23") then
        asp.setText(os.date("11:%M"))
       elseif tonumber(os.date("%H"))==tonumber("22") then
        asp.setText(os.date("10:%M"))
       elseif tonumber(os.date("%H"))==tonumber("21") then
        asp.setText(os.date("9:%M"))
       elseif tonumber(os.date("%H"))==tonumber("20") then
        asp.setText(os.date("8:%M"))
       elseif tonumber(os.date("%H"))==tonumber("19") then
        asp.setText(os.date("7:%M"))
       elseif tonumber(os.date("%H"))==tonumber("18") then
        asp.setText(os.date("6:%M"))
       elseif tonumber(os.date("%H"))==tonumber("17") then
        asp.setText(os.date("5:%M"))
       elseif tonumber(os.date("%H"))==tonumber("16") then
        asp.setText(os.date("4:%M"))
       elseif tonumber(os.date("%H"))==tonumber("15") then
        asp.setText(os.date("3:%M"))
       elseif tonumber(os.date("%H"))==tonumber("14") then
        asp.setText(os.date("2:%M"))
       elseif tonumber(os.date("%H"))==tonumber("13") then
        asp.setText(os.date("1:%M"))
      end
    end
  end
end

function 刷新()
  require "import"
  while true do
    Thread.sleep(100)
    call("时间")
  end
end
thread(刷新)
```

fas 设置顶栏标题
```lua
titleTvw.setText("文本内容")
```

fas 判断顶栏标题
```lua
if titleTvw.Text=="文本内容" then
  --事件
elseif titleTvw.Text=="文本内容" then
  --事件
elseif titleTvw.Text=="文本内容" then
  --事件
else--以上全不符合
  --事件
end
```

fas 网页内关键字查找
```lua
import"java.awt.event.*"
searchEdtTxt.addTextChangedListener{
onTextChanged=function(s)
页内查找(tostring(填写编辑框控件ID.Text))
end
}
```

fas 查看网页源码
```lua
webView.loadUrl("view-source:"..webView.url)
```

fas 空白模板专用
```lua
import "android.support.v7.widget.CardView"
import "android.view.WindowManager"--显示顶栏时间
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
```

fas 取当前网页链接
```lua
webView.getUrl()
```

fas 调用系统浏览器解析视频
```lua
function 浏览器解析(链接)
import "android.content.Intent"
import "android.net.Uri"
activity.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse(链接)))
end
--调用方法
浏览器解析("填写解析接口"..webView.getUrl())
```

赋值对话框单击阴影不消失
```lua
填写赋值ID.setCanceledOnTouchOutside(false)
```

添加背景音乐
```lua
import "android.media.MediaPlayer"
mediaPlayer = MediaPlayer()
mediaPlayer.reset()--初始化参数
--设置播放资源
mediaPlayer.setDataSource("https://pan.cccyun.cc/down.php/d1ab975c254a20759f1f5cccbb389214.mp3")
mediaPlayer.prepare()--开始缓冲资源
--是否循环播放该资源
mediaPlayer.setLooping(true)--循环播放 --单次播放则改为 false
mediaPlayer.isPlaying()--是否在播放
task(1000,function()--延迟一秒
mediaPlayer.start()--播放
end)
--mediaPlayer.pause()--暂停播放
--mediaPlayer.stop()--停止播放
```

后台强制关闭事件
```lua
function onPause()
--后台强制关闭时,执行的事件
end
```

判断是否安装
```lua
if pcall(function() activity.getPackageManager().getPackageInfo("填写包名",0) end) then
print("安装了")
else
print("没安装")
end
```

监听编辑框
```lua
edit.addTextChangedListener({
onTextChanged=function()
print("您正在输入: "..edit.Text)--这里加入其他事件，比如可以判断是否为网址等
end
})
```

手机息屏事件/后台运行事件
```lua
function onStop()
弹出消息("执行的事件")
end
```

读取本地文件
```lua
"file://"..activity.getLuaDir().."/xxx.mp4或mp3或apk或html等等"
```

弹出菜单列表
```lua
pop=PopupMenu(activity,ID)--弹出ID坐标
menu=pop.Menu
menu.add("选项名称1").onMenuItemClick=function(a)
弹出消息("选项名称1执行的事件")
end
menu.add("选项名称2").onMenuItemClick=function(a)
弹出消息("选项名称2执行的事件")
end
menu.add("选项名称3").onMenuItemClick=function(a)
弹出消息("选项名称3执行的事件")
end
pop.show()--显示
```

自定义打印消息坐标
```lua
function print(文本)
  context=activity.getApplicationContext()
  duration=Toast.LENGTH_SHORT
  toast=Toast.makeText(context,文本,duration)
  toast.setGravity(Gravity.TOP,0,300)--Gravity.TOP,1,40)--设置位置
  toast.show()
end
--调用方法
print("垃圾幽灵")
```

渐变色
```lua
--顶栏渐变色
import "android.graphics.drawable.GradientDrawable"
function 渐变(left_jb,right_jb,id)
  drawable = GradientDrawable(GradientDrawable.Orientation.TR_BL,{
    right_jb,
    left_jb,
  });
  id.setBackgroundDrawable(drawable)
end
渐变(0xFF28D1DB,0xFF28D1DB,toolbarParent)
```

编辑框搜索内容
```lua
import "android.view.inputmethod.EditorInfo"--导入所需类
search_txt.setOnEditorActionListener(TextView.OnEditorActionListener{
  onEditorAction=function(view,actionId,event)
    if (actionId==EditorInfo.IME_ACTION_SEARCH or (event!=null&&event.getKeyCode()== KeyEvent.KEYCODE_ENTER)) then
      if search_txt.text=="" then
        print("搜索内容不能为空..")
      else
        activity.newActivity("sousuo",{search_txt.text})
        search_txt.text=""
      end
      search_txt.setCursorVisible(false);
      return true
    end
  end})

search_txt.onClick=function()
  search_txt.setCursorVisible(true);
end
```

设置状态栏背景颜色/分割状态栏
```lua
activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE|WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN)
--分割状态栏，去除阴影效果,若想改颜色必用此效果
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
--设置状态栏背景颜色
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS).setStatusBarColor(0xFF7368EA);
```

标签栏模板
```lua
--程序启动时会执行的事件
toolbar.Visibility=8
function dp2px(dpValue)
  local scale = activity.getResources().getDisplayMetrics().scaledDensity
  return dpValue * scale + 0.5
end
local mheight=activity.getResources().getDimensionPixelSize(luajava.bindClass("com.android.internal.R$dimen")().status_bar_height)
mheight=mheight+dp2px(46)--48就是标签栏高
local linearParams = toolbar.parent.getLayoutParams()
linearParams.height =mheight
toolbar.parent.setLayoutParams(linearParams)
```

上下渐变颜色
```lua
import "android.graphics.drawable.GradientDrawable"
控件ID.setBackgroundDrawable(GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM,{
  0xFFA593E0,0xffffffff,0xffffffff,0xffffffff,
}))--上下渐变颜色，
```

页内查找
```lua
首先你需要写一个输入框
EditText
下面这个是查找功能，输入文字 然后查找
浏览器id.findAllAsync(输入框id.text)

下面这个是查找后的上翻功能，上一个关键词
浏览器id.findNext(false)

下面这个是查找后的下翻功能，下一个关键词
浏览器id.findNext(true)

下面这个是 在输入时后的一个输入框内容监听
文本内容为 当前是第几个查找到的关键词 (position+1)，和页内总共有几个关键词 all
浏览器id.setFindListener{
  onFindResultReceived=function(position,all, b) 
    文本控件id.setText("当前第"..(position+1).."个文件".."总共找到"..all.."个"); 

  end
}

fa的浏览器id为webview 或者首字母大写
其他浏览器id 可自定义写浏览器控件

需要输入文字就自动查找页内文字的 
可以把查找功能的代码 放到 文本控件id.setText的那行的代码的下一行里边
有问题找我1577315441
```

沉浸状态栏
```lua
--这个需要系统SDK21以上才能用
if Build.VERSION.SDK_INT >= 21 then
  activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS).setStatusBarColor(0xff4285f4);
end
--这个需要系统SDK19以上才能用
if Build.VERSION.SDK_INT >= 19 then
  activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
end
```

浏览器控件js
```lua
webView.setLuaWebEvents{
  onPageFinished=function(view,url)
    webView.evaluateJavascript([[JavaScript代码]],nil)
end}
```

隐藏顶部标题栏/隐藏标题栏
```lua
--隐藏顶部标题栏①
--隐藏顶部标题栏
activity.ActionBar.hide()activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

--隐藏标题栏②
--隐藏标题栏
activity.ActionBar.hide()--隐藏标题栏
```

弹出再按一次返回键
```lua
--导包
import "com.tencent.qq.widget.*"
参数=0
function onKeyDown(code,event)
  if string.find(tostring(event),"KEYCODE_BACK") ~= nil then
    if 参数+2 > tonumber(os.time()) then
      MyMenuDialog=MenuDialog(this);
      MyMenuDialog.setTitle("您确定要退出吗？",MenuDialog.setTextColor.DEFAULT);
      MyMenuDialog.setButton("取消",MenuDialog.setTextColor.BLACK);

      MyMenuDialog.addItem("确定",MenuDialog.setTextColor.BLACK,
      {onClick = function()
         -- 结束程序()
         关闭页面()
        end});
      MyMenuDialog.show();
     else
      --Toast.makeText(activity,"再按一次返回键" , Toast.LENGTH_SHORT )
      --  .show()
      参数=tonumber(os.time())
    end
    return true
  end
end
```

再按一次退出程序美化
```lua
--退出
参数=0
function onKeyDown(code,event)
  if string.find(tostring(event),"KEYCODE_BACK") ~= nil then
    if 参数+2 > tonumber(os.time()) then
      退出程序()
     else
      to={
        CardView;
        CardBackgroundColor="#FFffffff";
        elevation="8dp";
        layout_width="95%w";
        layout_height="42dp";
        radius="15";
        id="to";
        {
          TextView;
          textSize="15sp";
          TextColor="#FFa0a0a0";
          layout_width="95%w";
          layout_height="42dp";
          gravity="center";
          text="出错";
          id="texttc";
        };
      }
      local to=Toast.makeText(activity,"内容",Toast.LENGTH_SHORT).setView(loadlayout(to))
      --LENGTH_SHORT     2s
      --LENGTH_LONG      3.5s
      to.setGravity(Gravity.BOTTOM,0,60)
      --Gravity.BOTTOM   底部
      --Gravity.CENTER   中部
      --Gravity.TOP      顶部
      texttc.Text=tostring("再按一次退出程序！")
      to.show()
      参数=tonumber(os.time())
    end
    return true
  end
end
```

防止抓包
```lua
back=false
thread(function()
  while true do
    require "import"
    import "java.net.NetworkInterface"
    import "java.util.Collections"
    import "java.util.Enumeration"
    import "java.util.Iterator"
    local niList = NetworkInterface.getNetworkInterfaces()
    if niList ~= nil then
      local it = Collections.list(niList).iterator()
      while it.hasNext() do
        local intf = it.next()
        if intf.isUp() and intf.getInterfaceAddresses().size() ~= 0 then
          if String("tun0").equals(intf.getName()) or String("ppp0").equals(intf.getName()) then

            activity.finish()
            back = true
          else
            --print("未开启VPN")
            back = false
          end
        end
      end
    end
    Thread.sleep(1000)
  end
end)
```

fas嗅探解析
```lua
function 嗅探视频(解析地址)

  xt= ProgressDialog(this)
  xt.setProgressStyle(ProgressDialog.STYLE_SPINNER)
  --设置进度条的形式为圆形转动的进度条
  xt.setMessage([[正在解析视频中,请稍候...]])
  xt.setCancelable(true)--设置是否可以通过点击Back键取消
  xt.setCanceledOnTouchOutside(false)--设置在点击Dialog外是否取消Dialog进度条    
  xt.show()
  local wl=activity.getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE).getActiveNetworkInfo(); 
  if wl== nil then
    停止加载()
    弹出消息("请检查网络连接..")
  else
    webView2=LuaWebView(activity)
    --设置禁止自动播放视频
    webView2.getSettings().setMediaPlaybackRequiresUserGesture(true);
    webView2.setWebViewClient{
      onLoadResource=function(view,url)
        if (url:find'://qq.adinisp.com(.-)/parse_js.php') or (url:find'://(.-).l.qq.com/') or (url:find'://(.-)51.la/') or (url:find'://(.-)cnzz.com/') or (url:find'://(.-)/kvcollect') or (url:find'://(.-)/js.php') or (url:find'://(.-)/c.php') or (url:find'://(.-)/v.php') then 
        else
          if (url:find'://(.-).mp4') or (url:find'://(.-).m3u8') and (webView2.getUrl()~="about:blank") then
            xt.dismiss()
            视频链接=url :gsub("(.+)?url=","") 
            webView2.stopLoading()
            进入子页面("播放",{链接=视频链接})
            return true;
          end
        end
        return true;
      end}
    webView2.loadUrl(解析地址..webView.getUrl())    --解析地址+当前网页
    xt.setOnCancelListener{
      onCancel=function(l)
        xt.dismiss()
        webView2.stopLoading()
        print("停止嗅探")
      end}
  end
end
```

禁止网页缩放
```lua
--禁止网页缩放
import 'android.webkit.WebView'
local hh={}
webView.addJavascriptInterface(hh,'JsInterface')
--禁止网页缩放
webView.getSettings().setBuiltInZoomControls(false)
webView.getSettings().setSupportZoom(false)
webView.getSettings().setDisplayZoomControls(false)
```

防止网页复制
```lua
--防止网页复制
ti=Ticker()
ti.Period=500
ti.onTick=function() 
  j=activity.getSystemService(Context.CLIPBOARD_SERVICE).getText()--获取剪贴板内容
  if j=="" then
  else
    activity.getSystemService(Context.CLIPBOARD_SERVICE).setText("")
  end
end
ti.start()
```

退出页面/退出程序/结束程序
```lua
--退出页面
activity.finish()

--退出程序
activity.finish()

………………………………
--结束进程
os.exit()

………………………………


结束程序()


…………………………

--关闭对话框

dl.dismiss()关闭对话框
………………………………

--将dl.show赋值
dialog=dl.show()
--在某按钮点击后关闭这个对话框
function zc.onClick()
  dialog.dismiss()
end
```

标题栏菜单按钮
```lua
title={"分享","帮助","皮肤","退出"}
function onCreateOptionsMenu(menu) 
  for k,v in ipairs(title) do 
    if title[v] then 
      local m=menu.addSubMenu(v) 
      for k,v in ipairs(title[v]) do 
        m.add(v) 
      end 
    else 
      local m=menu.add(v) 
      m.setShowAsActionFlags(1) 
    end 
  end 
end 
function onMenuItemSelected(id,title) 
  if y[title.getTitle()] then 
    y[title.getTitle()]() 
  end 
end 

y={}
y["帮助"]=function() 
  --事件
end
```

控件被单击/控件被长按
```lua
--控件被单击
控件ID.setonClickListener{
onClick=function()
  --事件
end
}

--控件被长按
--控件被长按
控件ID.setonLongClickListener{
onLongClick=function()
  --事件
end
}
```

返回键与menu共存
```lua
--显示返回按钮
activity.ActionBar.setDisplayHomeAsUpEnabled(true)

--添加menu
function onCreateOptionsMenu(menu)

  menu.add("嘿嘿") 
  menu.add("哈哈") 

end


function onOptionsItemSelected(z)
  t=z.getTitle()

  if t=="嘿嘿" then
    print("你点击了嘿嘿")
  elseif z=="哈哈" then
    print("你点击了哈哈")
 else
    print("退出程序")
    activity.finish()
  end

end
```

简单列表示列
```lua
--列表布局，把布局代码复制到视图编辑器里可修改，修改好后再把修改好的代码粘贴到下面。从layout=处开始（不包含{）

layout={
  LinearLayout;
  layout_width="-1";
  padding="10dp";
  orientation="vertical";
  {
    TextView;
    id="标题";
  };
  {
    TextView;
    id="内容";
  };
};


adp=LuaAdapter(activity,layout)

--可以详细设置列表id中的内容。标题={方法名=参数}
adp.add{标题={text="我是标题",TextColor=0xff009688},内容="我是内容"}

adp.add{标题="我是标题",内容="我是内容"}
adp.add{标题="我是标题",内容="我是内容"}
adp.add{标题="我是标题",内容="我是内容"}
列表id.Adapter=adp

--列表的点击事件
列表id.onItemClick=function(parent, v, pos,id)
  a=v.Tag.标题.Text
  b=v.Tag.内容.Text

  print(a)
  print(b)

end
```

进度条变音量
```lua
--导入AudioManager类
import "android.content.Context"
import "android.media.AudioManager"


--注意是改变媒体音量
--作者messy
--seekbar为进度条ID


--得到音频管理对象
mAudioManager = activity.getSystemService(Context.AUDIO_SERVICE);

--获取当前音乐音量
mVolume = mAudioManager.getStreamVolume(AudioManager.STREAM_MUSIC); 

--设置为seekbar音量的最大阶数
seekbar.setMax(mAudioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC));

--设置seekbar为当前音量进度 
seekbar.setProgress(mVolume);


--绑定监听
seekbar.setOnSeekBarChangeListener{
  onProgressChanged=function(a,i)
    --拖动seekbar时改变音量
    mAudioManager.setStreamVolume(AudioManager.STREAM_MUSIC, i, 1);--设置1显示音量调节窗口0为隐藏
    px=math.floor(i/mAudioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)*100)
    print("音量:"..px.."%")
  end}
```

自动切换适应主题
```lua
--自动切换适应主题
--载入切换
--根据Android SDK判断是否支持MD主题，否则使用Holo主题
--注意要把代码放到activity.setContentView(loadlayout(layout))上面去。

local sdk = Build.VERSION.SDK_INT
if sdk >= 21 then
  theme=... or android.R.style.Theme_Material_Light
else
  theme=... or android.R.style.Theme_Holo_Light
end
activity.setTheme(theme)



--点击按钮切换
控件id.onClick=function(v)
  local sdk = Build.VERSION.SDK_INT
  if sdk >= 21 then
    if theme==android.R.style.Theme_Material then
      activity.finish()
      activity.newActivity("main",android.R.anim.fade_in,android.R.anim.fade_out,{android.R.style.Theme_Material_Light})
    else
      activity.finish()
      activity.newActivity("main",android.R.anim.fade_in,android.R.anim.fade_out,{android.R.style.Theme_Material})
    end
  else
    if theme==android.R.style.Theme_Holo then
      activity.finish()
      activity.newActivity("main",android.R.anim.fade_in,android.R.anim.fade_out,{android.R.style.Theme_Holo_Light})
    else
      activity.finish()
      activity.newActivity("main",android.R.anim.fade_in,android.R.anim.fade_out,{android.R.style.Theme_Holo})
    end
  end
end
```

关于TBSx5内核
```lua
import "android.graphics.PixelFormat"
import"com.tencent.smtt.sdk.WebViewClient"
--布局表控件 WebView;
--布局表之前导入X5WebView控件
import "com.tencent.smtt.sdk.WebView"



--修复上屏闪烁
activity.getWindow().setFormat(PixelFormat.TRANSLUCENT);
--加载网页
id.loadUrl("http://www.baidu.com/")
webSettings = wv.getSettings();
--支持JS
webSettings.setJavaScriptEnabled(true);
--无广告百度UA
APP_NAME_UA="Mozilla/5.0 (Linux; Android 7.0; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 T7/10.3 SearchCraft/2.6.2 (Baidu; P1 7.0)"
--自定义UA
webSettings.setUserAgentString(webSettings.getUserAgentString()..APP_NAME_UA);
--设置字体大小:100表示正常,120表示文字放大1.2倍
webSettings.setTextZoom(100)

--显示版本
import "com.tencent.smtt.sdk.QbSdk"
tbsVersion = QbSdk.getTbsVersion(this);
TID = QbSdk.getTID();
qBVersion = QbSdk.getMiniQBVersion(this);
print("TBS版本:"..tbsVersion)


--监听事件
id.setWebViewClient(WebViewClient(){

  shouldOverrideUrlLoading=function(view,url)

    view.loadUrl(url)

    return true

  end,

  onReceivedError=function(var1,var2,var3,var4)

    print("网页加载失败")
  return false
  end

})

--与返回键互交
--网页与返回键之间的交互

function onKeyDown(keyCode,event)

  if (keyCode == KeyEvent.KEYCODE_BACK && wv.canGoBack())then

    id.goBack()

    return true

  end

  return false

end

--使用AndLuaJ+9.1
```

关于QQDialog进度条
```lua
import "java.lang.Override"
import "com.tencent.qq.widget.*"
--QQDialog
MyDialog=QQDialog(this);--设置弹窗进出动画
MyDialog.setViewLine(QQDialog.setLineColor.BLUE);--设置顶部线条颜色
MyDialog.setTitle("标题",QQDialog.setColors.DEFAULT);--设置标题文字及颜色
MyDialog.setMessage("这是一个按钮的对话框");--设置弹窗内容
MyDialog.setPositiveButton("确定按钮",QQDialog.setColors.DEFAULT,--设置按钮文字及颜色
{onClick = function()--按钮点击事件
MyDialog.dismiss();--关闭对话框
end});
MyDialog.show();--显示对话框


--QQMenuDialog
MyMenuDialog=MenuDialog(this);--设置弹窗进出动画
MyMenuDialog.setTitle("这是菜单栏的标题",MenuDialog.setTextColor.DEFAULT);--设置标题文字及颜色
MyMenuDialog.setButton("取消",MenuDialog.setTextColor.BLACK);--设置取消按钮文字及颜色
MyMenuDialog.addItem("选项一",MenuDialog.setTextColor.BLACK,--设置选项文字及颜色
{onClick = function()--按钮点击事件
end});
MyMenuDialog.show();--显示弹窗


--QQProgress
QQProgress.showPorgressBar(this, "这是一个进度条",QQProgress.setTheme.DEFAULT);

--QQToast
QQToast.makeText(this, "这是一个提示",QQToast.setBackgroundColors.DEFAULT).show();

--使用AndLuaJ+9.1
```

载入窗口传参/窗口回调事件
```lua
--载入窗口传参
activity.newActivity("窗口名",{参数})



--渐变动画效果的，中间是安卓跳转动画代码
activity.newActivity("窗口名",android.R.anim.fade_in,android.R.anim.fade_out,{参数})



--窗口回调事件
function onActivityResult()
  --事件
end
```

标题栏返回按钮
```lua
--标题栏返回按钮
activity.getActionBar().setDisplayHomeAsUpEnabled(true)
```

震动
```lua
--震动
import "android.content.Context"
--导入包
vibrator = activity.getSystemService(Context.VIBRATOR_SERVICE)
vibrator.vibrate( long{100,800} ,-1)
--{等待时间,振动时间,等待时间,振动时间,…}
--{0,1000,500,1000,500,1000}
--别忘了申明权限
```

设置activity背景颜色
```lua
--设置activity背景颜色
function activity背景颜色(color)
  _window = activity.getWindow();
  _window.setBackgroundDrawable(ColorDrawable(color));
  _wlp = _window.getAttributes();
  _wlp.gravity = Gravity.BOTTOM;
  _wlp.width = WindowManager.LayoutParams.MATCH_PARENT;
  _wlp.height = WindowManager.LayoutParams.MATCH_PARENT;--WRAP_CONTENT
  _window.setAttributes(_wlp);
end
--该函数需设置布局后使用

--调用例子
activity.setContentView(LinearLayout(activity))
activity背景颜色(0xff424242)
```

控件波纹
```lua
--控件波纹
import "android.content.res.ColorStateList"
function 波纹(id,lx,color)
  xpcall(function()
    ripple = activity.obtainStyledAttributes({android.R.attr.selectableItemBackgroundBorderless}).getResourceId(0,0)
    ripples = activity.obtainStyledAttributes({android.R.attr.selectableItemBackground}).getResourceId(0,0)
    for index,content in ipairs(id) do
      if lx=="圆" then
        content.setBackgroundDrawable(activity.Resources.getDrawable(ripple).setColor(ColorStateList(int[0].class{int{}},int{color})))
      end
      if lx=="方" then
        content.setBackgroundDrawable(activity.Resources.getDrawable(ripples).setColor(ColorStateList(int[0].class{int{}},int{color})))
      end
    end
  end,function(e)end)
end
--[[
波纹(id,lx,color)
id：控件id,table
lx：波纹类型,圆或方,string
color 波纹颜色,number

安卓5及以上可用。
该代码需要MD主题。
]]

--调用例子
layout={
  LinearLayout;
  onClick=function()print("FALua编程手册")end;
  layout_width="-1";
  layout_height="-1";
  id="lay";
}
activity.setContentView(loadlayout(layout))
activity.setTheme(android.R.style.Theme_DeviceDefault_Light)
波纹({lay},"圆",0x21000000)
```

高斯模糊
```lua
--高斯模糊
--高斯模糊

import "android.renderscript.Element"
import "android.renderscript.Allocation"
import "android.renderscript.RenderScript"
import "android.graphics.Bitmap"
import "android.renderscript.ScriptIntrinsicBlur"
import "android.graphics.Matrix"

function 高斯模糊(id,tp,radius1,radius2)
  function blur( context, bitmap, blurRadius)
    renderScript = RenderScript.create(context);
    blurScript = ScriptIntrinsicBlur.create(renderScript, Element.U8_4(renderScript));
    inAllocation = Allocation.createFromBitmap(renderScript, bitmap);
    outputBitmap = bitmap;
    outAllocation = Allocation.createTyped(renderScript, inAllocation.getType());
    blurScript.setRadius(blurRadius);
    blurScript.setInput(inAllocation);
    blurScript.forEach(outAllocation);
    outAllocation.copyTo(outputBitmap);
    inAllocation.destroy();
    outAllocation.destroy();
    renderScript.destroy();
    blurScript.destroy();
    return outputBitmap;
  end
  function zoomBitmap(bitmap,scale)
    w = bitmap.getWidth();
    h = bitmap.getHeight();
    matrix = Matrix();
    matrix.postScale(scale, scale);
    bitmap = Bitmap.createBitmap(bitmap, 0, 0, w, h, matrix, true);
    return bitmap;
  end
  function blurAndZoom(context,bitmap,blurRadius,scale)
    return zoomBitmap(blur(context,zoomBitmap(bitmap, 1 / scale), blurRadius), scale);
  end
  id.setImageBitmap(blurAndZoom(activity,tp,radius1,radius2))
end
--[[
高斯模糊(id,tp,radius1,radius2)
radius1 范围：1-25
radius2 范围：1-？(据图片而定太大报错)
]]

--调用例子
img=ImageView(activity)
activity.setContentView(img)

高斯模糊(img,loadbitmap("https://image.uisdc.com/wp-content/uploads/2019/06/uisdc-banner-20190614-2.jpg"),4,2)
```

获取悬浮窗权限
```lua
--获取悬浮窗权限

import "android.net.Uri"
import "android.content.Intent"
import "android.provider.Settings"
function 获取悬浮窗权限()
  intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
  intent.setData(Uri.parse("package:" .. activity.getPackageName()));
  activity.startActivityForResult(intent, 100);
end

--调用示例
获取悬浮窗权限()
```

圆形图片
```lua
--圆形图片
function 圆形图片(bitmap)
  import "android.graphics.PorterDuffXfermode"
  import "android.graphics.Paint"
  import "android.graphics.RectF"
  import "android.graphics.Bitmap"
  import "android.graphics.PorterDuff$Mode"
  import "android.graphics.Rect"
  import "android.graphics.Canvas"
  import "android.util.Config"
  width = bitmap.getWidth()
  output = Bitmap.createBitmap(width, bitmap.getHeight(),Bitmap.Config.ARGB_8888)
  canvas = Canvas(output);
  color = 0xff424242;
  paint = Paint()
  rect = Rect(0, 0, bitmap.getWidth(), bitmap.getHeight());
  rectF = RectF(rect);
  paint.setAntiAlias(true);
  canvas.drawARGB(0, 0, 0, 0);
  paint.setColor(color);
  canvas.drawRoundRect(rectF, width/2, bitmap.getHeight()/2, paint);
  paint.setXfermode(PorterDuffXfermode(Mode.SRC_IN));
  canvas.drawBitmap(bitmap, rect, rect, paint);
  return output;
end

--调用示例
img=ImageView(activity)
activity.setContentView(img)
img.setImageBitmap(圆形图片(loadbitmap("https://image.uisdc.com/wp-content/uploads/2019/06/uisdc-banner-20190614-2.jpg")))
```

视频异形屏的全屏
```lua
function 全屏()
  window = activity.getWindow();
  window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN|View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
  window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
  xpcall(function()
    lp = window.getAttributes();
    lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
    window.setAttributes(lp);
  end,
  function(e)
  end)
end
--使用该代码可能需要隐藏ActionBar

--调用示例
全屏()
```

贝塞尔曲线
```lua
import "com.androlua.LuaDrawable"
import "android.graphics.Path"
import "android.graphics.Paint"

function dp2px(dpValue)
  local scale = activity.getResources().getDisplayMetrics().scaledDensity
  return dpValue * scale + 0.5
end

function px2dp(pxValue)
  local scale = activity.getResources().getDisplayMetrics().scaledDensity
  return pxValue / scale + 0.5
end

function px2sp(pxValue)
  local scale = activity.getResources().getDisplayMetrics().scaledDensity;
  return pxValue / scale + 0.5
end

function sp2px(spValue)
  local scale = activity.getResources().getDisplayMetrics().scaledDensity
  return spValue * scale + 0.5
end

layout={
  RelativeLayout;
  layout_width="-1";
  background=backgroundc;
  layout_height="-1";
  {
    RelativeLayout,
    layout_width="-1",
    layout_height="-1",
    id="llb",
    gravity="bottom";
    {
      RelativeLayout,
      layout_width="fill",
      layout_height="56dp",
      clickable="true",
      id="ll",
      {
        LinearLayout;
        layout_width="-1";
        layout_height="-1";
        gravity="left|center";
        paddingLeft="8dp";
        paddingRight="8dp";
        {
          LinearLayout;
          layout_height="-1";
          layout_width="-2";
          layout_weight="1";
        };
        {
          TextView;
          layout_height="-1";
          layout_width="56dp";
          layout_marginRight="20dp";
          layout_marginLeft="8dp";
          --background=grayc;
        };
      };
    };
  },
  {
    LinearLayout;
    layout_width="-1";
    layout_height="-1";
    orientation="vertical";
    gravity="right|bottom";
    {
      CardView;
      layout_width="56dp",
      layout_height="56dp",
      radius="28dp";
      layout_margin="28dp";
      CardBackgroundColor="0xffffffff";
      elevation="6dp";
      alpha=1;
    };
  };

}

activity.setContentView(loadlayout(layout))

myLuaDrawable=LuaDrawable(function(mCanvas,mPaint,mDrawable)

  mPaint.setColor(0xffffffff)
  mPaint.setAntiAlias(true)
  mPaint.setStrokeWidth(20)
  mPaint.setStyle(Paint.Style.FILL)
  mPaint.setStrokeCap(Paint.Cap.ROUND)

  w=mDrawable.getBounds().right
  h=mDrawable.getBounds().bottom

  mPath=Path()

  mPath.moveTo(w, h);
  mPath.lineTo(0, h);
  mPath.lineTo(0, h-dp2px(56));

  mPath.lineTo(w-dp2px(56+16+16+8), h-dp2px(56));
  mPath.rQuadTo(dp2px(8), dp2px(0),dp2px(8+1), dp2px(8))
  mPath.rCubicTo(dp2px(8-1), dp2px(28+4),dp2px(56-1), dp2px(28+4),dp2px(56+8-2), dp2px(0))
  mPath.rQuadTo(dp2px(1), dp2px(-8),dp2px(8+1), dp2px(-8))
  mPath.rLineTo(w, 0);

  mCanvas.drawColor(0x00000000)
  mCanvas.drawPath(mPath, mPaint);

  mPath.close();
end)

ll.background=myLuaDrawable

myLuaDrawable=LuaDrawable(function(mCanvas,mPaint,mDrawable)

  mPaint.setColor(0x21000000)
  mPaint.setAntiAlias(true)
  mPaint.setStrokeWidth(dp2px(4))
  mPaint.setStyle(Paint.Style.FILL)
  mPaint.setStrokeCap(Paint.Cap.ROUND)

  w=mDrawable.getBounds().right
  h=mDrawable.getBounds().bottom

  mPath=Path()

  mPath.moveTo(w, h);
  mPath.lineTo(0, h);
  mPath.lineTo(0, h-dp2px(56));

  mPath.lineTo(w-dp2px(56+16+16+8), h-dp2px(56));
  mPath.rQuadTo(dp2px(8), dp2px(0),dp2px(8+1), dp2px(8))
  mPath.rCubicTo(dp2px(8-1), dp2px(28+4),dp2px(56-1), dp2px(28+4),dp2px(56+8-2), dp2px(0))
  mPath.rQuadTo(dp2px(1), dp2px(-8),dp2px(8+1), dp2px(-8))
  mPath.rLineTo(w, 0);

  mCanvas.drawColor(0x00000000)
  mPaint.setShadowLayer(dp2px(1), 0, dp2px(-1), 0x70FFFFFF);

  mCanvas.drawPath(mPath, mPaint);

  mPath.close();
end)

llb.background=myLuaDrawable
```

使用系统TTS播报语音
```lua
--使用系统TTS播报语音
import "android.speech.tts.*"

mTextSpeech = TextToSpeech(activity, TextToSpeech.OnInitListener{
  onInit=function(status)
    --如果装载TTS成功
    if (status == TextToSpeech.SUCCESS)
      result = mTextSpeech.setLanguage(Locale.CHINESE);
      --[[LANG_MISSING_DATA-->语言的数据丢失
          LANG_NOT_SUPPORTED-->语言不支持]]
      if (result == TextToSpeech.LANG_MISSING_DATA or result == TextToSpeech.LANG_NOT_SUPPORTED)
        --不支持中文
        print("您的手机不支持中文语音播报功能。");
        result = mTextSpeech.setLanguage(Locale.ENGLISH);
        if (result == TextToSpeech.LANG_MISSING_DATA or result == TextToSpeech.LANG_NOT_SUPPORTED)
          --不支持中文和英文
          print("您的手机不支持语音播报功能。");
         else
          --不支持中文但支持英文
          --语调,1.0默认
          mTextSpeech.setPitch(1);
          --语速,1.0默认
          mTextSpeech.setSpeechRate(1);
          mTextSpeech.speak("hello,MLua Manual.Hello,World!", TextToSpeech.QUEUE_FLUSH, nil);
        end
       else
        --支持中文
        --语调,1.0默认
        mTextSpeech.setPitch(1);
        --语速,1.0默认
        mTextSpeech.setSpeechRate(1);
        mTextSpeech.speak("你好，MLua手册。你好，世界！", TextToSpeech.QUEUE_FLUSH, nil);
      end
    end
  end
});
```

获取控件图片
```lua
--获取控件图片
import "android.graphics.Bitmap"

function 获取控件图片(view)
  local linearParams = view.getLayoutParams()
  local vw=linearParams.width
  local linearParams = view.getLayoutParams()
  local vh=linearParams.height
  view.setDrawingCacheEnabled(true)
  view.layout(0,0,vw,vh)
  return Bitmap.createBitmap(view.getDrawingCache())
end

--调用示例
--布局
layout={
  LinearLayout,
  layout_width="-1",
  layout_height="-1",
  orientation="vertical";
  {
    TextView,
    textSize="14sp";
    layout_width="56dp",
    layout_height="42dp",
    text="TextView1",
    textColor="#FFFFFFFF";
    background="#212121",
    id="tv";
  },
  {
    ImageView,
    layout_width="-1",
    layout_height="-1",
    id="img";
  },
}
--设置布局
activity.setContentView(loadlayout(layout))
--获取tv的图片设置给img
img.setImageBitmap(获取控件图片(tv))
```

获取与设置Cookie
```lua
import "android.webkit.CookieSyncManager"
import "android.webkit.CookieManager"

function 设置Cookie(context,url,content)
  CookieSyncManager.createInstance(context)
  local cookieManager = CookieManager.getInstance()
  cookieManager.setAcceptCookie(true)
  cookieManager.removeSessionCookie()
  cookieManager.removeAllCookie()
  cookieManager.setCookie(url, content)
  CookieSyncManager.getInstance().sync()
end

function 获取Cookie(url)
  local cookieManager = CookieManager.getInstance();
  return cookieManager.getCookie(url);
end

--示例
--获取https://www.baidu.com的cookie并打印
print(获取Cookie("https://www.baidu.com"))
--设置https://www.baidu.com的cookie为This is cookie
设置Cookie(activity,"https://www.baidu.com","This is cookie")
--获取https://www.baidu.com的cookie并打印
print(获取Cookie("https://www.baidu.com"))
```

LuaWebView设置UA
```lua
import "android.webkit.WebSettings"

local webSettings = LuaWebViewID.getSettings();
local newUserAgent = "UA字符串";
webSettings.setUserAgentString(newUserAgent);
```

返回桌面
```lua
import "android.content.Intent"
home=Intent(Intent.ACTION_MAIN);
home.addCategory(Intent.CATEGORY_HOME);
activity.startActivity(home);
```

通知图库更新图片
```lua
--方法1 通过广播
activity.sendBroadcast(Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,Uri.parse("file://"..图片路径)))

--方法2 MediaScannerConnection
import "android.media.MediaScannerConnection"
MediaScannerConnection.scanFile(activity, {File(图片路径).getAbsolutePath()}, nil, nil)
```

自定义Callback
```lua
--自定义Callback
function SentText(text,callback)
  xpcall(function()
    Toast.makeText(activity,text,Toast.LENGTH_SHORT).show()
    callback(true)
  end,function()
    callback(false)
  end)
end

SentText("emmmm",function(is)
  print(is)
end)
```

正则取文件名
```lua
function 取文件名(path)
  return path:match(".+/(.+)$")
end

function 取文件名无后缀(path)
  return path:match(".+/(.+)%..+$")
end

print(取文件名("/com/mukapp/top/muk.lua"))
print(取文件名无后缀("/com/mukapp/top/muk.lua"))
```

设置控件字体
```lua
import "android.graphics.Typeface"
import "java.io.File"

--布局表中调用
function 字体(t)
  return Typeface.createFromFile(File(activity.getLuaDir().."/res/"..t..".ttf"))
end

--栗子:Typeface=字体("Product")

--代码中调用
function 字体设置(id,t)
  id.setTypeface(Typeface.createFromFile(File(activity.getLuaDir().."/res/"..t..".ttf")))
end

--栗子:字体设置(tv,"Product")

--字体需要放在res文件夹下
```

强制结束自身并清除数据
```lua
--强制结束自身并清除数据
os.execute("pm clear "..activity.getPackageName())
```

获取控件高度》》
《《
--获取控件高度
--导入包
import "android.content.Context"

function getwh(view)
  view.measure(View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED),View.MeasureSpec.makeMeasureSpec(0,View.MeasureSpec.UNSPECIFIED));
  height =view.getMeasuredHeight();
  width =view.getMeasuredWidth();
  return width,height
end

--调用方法
print(getwh(控件ID))

】】
《《匹配汉字
```lua
function filter_spec_chars(s)
  local ss = {}
  for k = 1, #s do
    local c = string.byte(s,k)
    if not c then break end
    if (c>=48 and c<=57) or (c>= 65 and c<=90) or (c>=97 and c<=122) then
      if not string.char(c):find("%w") then
        table.insert(ss, string.char(c))
      end
    elseif c>=228 and c<=233 then
      local c1 = string.byte(s,k+1)
      local c2 = string.byte(s,k+2)
      if c1 and c2 then
        local a1,a2,a3,a4 = 128,191,128,191
        if c == 228 then a1 = 184
        elseif c == 233 then a2,a4 = 190,c1 ~= 190 and 191 or 165
        end
        if c1>=a1 and c1<=a2 and c2>=a3 and c2<=a4 then
          k = k + 2
          table.insert(ss, string.char(c,c1,c2))
        end
      end
    end
  end
  return table.concat(ss)
end
print(filter_spec_chars("A1B2汉C3D4字E5F6,,,"))
--来源网络,加了个if过滤掉英文与数字,使其只捕获中文
```

Toast信息提示
```lua
--默认Toast
Toast.makeText(activity, "Toast",Toast.LENGTH_SHORT).show()

--自定义位置Toast
Toast.makeText(activity,"自定义位置Toast", Toast.LENGTH_LONG).setGravity(Gravity.CENTER, 0, 0).show()

--带图片Toast
图片=loadbitmap("/sdcard/a.png")
toast = Toast.makeText(activity,"带图片的Toast", Toast.LENGTH_LONG)
toastView = toast.getView()
imageCodeProject = ImageView(activity)
imageCodeProject.setImageBitmap(图片)
toastView.addView(imageCodeProject, 0)
toast.show()
--自定义布局Toast
布局=loadlayout(layout)
local toast=Toast.makeText(activity,"提示",Toast.LENGTH_SHORT).setView(布局).show()
```

关于输入法影响布局
```lua
--使弹出的输入法不影响布局
activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
--使弹出的输入法影响布局
activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
```

弹出窗口
```lua
--弹出窗口

pop=PopupWindow(activity)--创建PopWindow
pop.setContentView(loadlayout(布局))--设置布局
pop.setWidth(activity.Width*0.3)--设置宽度
pop.setHeight(activity.Width*0.3)--设置高度
pop.setFocusable(true)--设置可获得焦点
window.setTouchable(true)--设置可触摸
--设置点击外部区域是否可以消失
pop.setOutsideTouchable(false)
--显示
pop.showAtLocation(view,0,0,0)
```

popmenu弹出菜单
```lua
--PopupMenu弹出菜单

pop=PopupMenu(activity,view)
menu=pop.Menu
menu.add("项目1").onMenuItemClick=function(a)

end
menu.add("项目2").onMenuItemClick=function(a)

end
pop.show()
```

Lua数据类型
```lua
--Lua是动态类型语言，变量不要类型定义,只需要为变量赋值。 值可以存储在变量中，作为参数传递或结果返回。
--Lua中有8个基本类型分别为：

nil、boolean、number、string、userdata、function、thread和table。

--  我们可以使用type函数测试给定变量或者值的类型：
print(type("Hello world"))
  --string
  print(type(10.4*3))
  --number
  print(type(print))
  --function
  print(type(type))
  --function
  print(type(true))
  --boolean
  print(type(nil))
  --nil
  print(type(type(X)))
  --string
```

关键词
```lua
--以下列出了 Lua 的保留关键字。保留关键字不能作为常量或变量或其他用户自定义标示符：


and break do else elseif end false
for function if in local nil not
  or repeat return then true until while



 --一般约定，以下划线开头连接一串大写字母的名字（比如 _VERSION）被保留用于 Lua 内部全局变量。
```

function函数
```lua
--函数有两个用途
--1.完成指定功能，函数作为调用语句使用
--2.计算并返回值，函数作为赋值语句的表达式使用


--实例1:

function 读取文件(路径)
  文件内容=io.open(路径):read("*a")
  return 文件内容--return用来返回值
end

--实例2:
require "import"
import "android.widget.EditText"
import "android.widget.LinearLayout"
function 编辑框()
  return EditText(activity)
end
layout={
  LinearLayout;
  id="父布局",
  {编辑框,
    id="edit",
    text="文本",
  },
};
activity.setContentView(loadlayout(layout))
--把这段代码放到调试里面去测试
```

for循环/if判断语句
```lua
--for循环

--给定条件进行循环

--输出从1到10
for i=1,10 do
  print(i)
end


--输出从10到1
for i=10,1,-1 do
  print(i)
end

--打印数组a中所有的值
a={"a","b","c","d"}
for index,content in pairs(a) do
  print(content)
end
--if判断语句

--判断值是否为真
a=true
if a then
  print("真")
else
  print("假")
end

--比较值是否相同
a=true
b=false
if a==b then
  print("真")
else
  print("假")
end
```

返回最小化
```lua
--小菜鸟，这个可以挂后台
function onKeyDown(e)
  if e==4 then
    import "android.content.Intent"--记得这个
    intent=Intent();
    intent.setAction("android.intent.action.MAIN");
    intent.addCategory("android.intent.category.HOME");
    activity.startActivity(intent)
  end
end
```

删除文件与文件夹/递归删除文件与文件夹
```lua
--删除文件与文件夹
--使用File类
import "java.io.File"--导入File类
File(文件路径).delete()
--使用os方法
os.remove (filename)
--递归删除文件与文件夹
--使用LuaUtil辅助库
LuaUtil.rmDir(路径)
--使用Shell
os.execute("rm -r "..路径)
```

列表长按事件
```lua
ID.setOnItemLongClickListener(AdapterView.OnItemClickListener{
  onItemLongClick=function(parent, v, pos,id)
    --事件
  end
})
```

列表单击事件
```lua
ID.setOnItemClickListener(AdapterView.OnItemClickListener{
  onItemClick=function(parent, v, pos,id)
    --事件
  end
})
```

安装APK
```lua
import "android.content.*" 
import "android.net.*" 

intent = Intent(Intent.ACTION_VIEW); 
intent.setDataAndType(Uri.parse("file:///sdcard/jc.apk"), "application/vnd.android.package-archive"); 
intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); 
activity.startActivity(intent);
```

布局设置点击水波纹效果
```lua
--5.0或以上可以实现点击水波纹效果
--在布局加入：

style="?android:attr/buttonBarButtonStyle";
```

递归搜索文件
```lua
require "import"

function find(catalog,name)
  local n=0
  local t=os.clock()
  local ret={}
  require "import"
  import "java.io.File" 
  import "java.lang.String"
  function FindFile(catalog,name)
    local name=tostring(name)
    local ls=catalog.listFiles() or File{}
    for 次数=0,#ls-1 do
      --local 目录=tostring(ls[次数])
      local f=ls[次数]
      if f.isDirectory() then--如果是文件夹则继续匹配
        FindFile(f,name)
      else--如果是文件则
        n=n+1
        if n%1000==0 then
          --print(n,os.clock()-t)
        end
        local nm=f.Name
        if string.find(nm,name) then
          --thread(insert,目录)
          table.insert(ret,nm)
          print(nm)
        end
      end
      luajava.clear(f)
    end
  end
  FindFile(catalog,name)
  print("ok",n,#ret)
end

import "java.io.File"

catalog=File("sdcard/")
name=".j?pn?g"
--task(find,catalog,name,print)
thread(find,catalog,name)
```

获取LiveView垂直坐标
```lua
function getScrollY()
  c = ls.getChildAt(0);
  local firstVisiblePosition = ls.getFirstVisiblePosition();
  local top = c.getTop();
  return -top + firstVisiblePosition * c.getHeight() ;
end
```

申请root
```lua
--申请root
--shell命令的方法
os.execute("su")
```

自定义弹窗颜色
```lua
dialog=AlertDialog.Builder(this)
.setTitle("标题")
.setMessage("消息")
.setPositiveButton("积极",{onClick=function(v) print"点击了积极按钮"end})
.setNeutralButton("中立",nil)
.setNegativeButton("否认",nil)
.show()
dialog.create()


--更改消息颜色
message=dialog.findViewById(android.R.id.message)
message.setTextColor(0xff1DA6DD)

--更改Button颜色
import "android.graphics.Color"
dialog.getButton(dialog.BUTTON_POSITIVE).setTextColor(0xff1DA6DD)
dialog.getButton(dialog.BUTTON_NEGATIVE).setTextColor(0xff1DA6DD)
dialog.getButton(dialog.BUTTON_NEUTRAL).setTextColor(0xff1DA6DD)

--更改Title颜色
import "android.text.SpannableString"
import "android.text.style.ForegroundColorSpan"
import "android.text.Spannable"
sp = SpannableString("标题")
sp.setSpan(ForegroundColorSpan(0xff1DA6DD),0,#sp,Spannable.SPAN_EXCLUSIVE_INCLUSIVE)
dialog.setTitle(sp)
```

SO库
```lua
os.rename(old,new)
--重命名文件，old旧，new新。

os.remove(path)
--删除文件，path路径。

os.exit()
--中止当前程序的执行

os.getenv(var)
--返回环境变量

os.time()
--[[返回一个指定时间点的UNIX时间戳，如不带参数调用的话，就返回当前时间点的UNIX时间戳。
参数table字段包括{
year  年份
month  月份(01-12)
day  天(01-31)
hour  时(00-23)
min  分(00-59)
sec  秒(00-59)
isdst  布尔值，true表示夏令时
其中，year、month、day 三个字段是必须的，其它字段默认取 12:00:00
}]]
os.data(format,sec)
--os.data 是os.time 的反函数，它将一个UNIX时间戳转换成可读的字符串形式。
--如果省略第2个参数，默认返回当前时间点的日期。

--为了生成一个日期table，可以使用格式字符串"*t"，例如：

tb = os.date("*t")

for k,v in pairs(tb) do
    print(k,v)
end

输出:
year 	2019
sec 	46
isdst 	false
yday 	173
wday 	7
month 	6
hour 	23
min 	52
day 	22
os.difftime(t2, t1)
--返回从t1到t2的时间跨度值。

os.clock()
--函数os.clock 返回当前CPU时间的秒数，一般可用于计算一段代码的执行时间

--[[· LUA string库详解
· python 标准库之os
· Lua中os库的使用(execute,date,clock,time)
· 『Golang』—— 标准库之 os]]
```

获取视图文本
```lua
function GetAllText(view)
textTable={}
function GetText(Parent)
local number=Parent.getChildCount()
for i=0,number do
local view=Parent.getChildAt(i)
if pcall(function()view.addView(TextView(activity))end) then
GetText(view)
elseif pcall(function()view.getText()end) then
table.insert(textTable,tostring(view.Text))
end
end
end
GetText(view)
return textTable
end

print(table.unpack(GetAllText(Parent)))
```

获取已安装的程序
```lua
function GetAppInfo(包名)
  import "android.content.pm.PackageManager"
  local pm = activity.getPackageManager();
  local 图标 = pm.getApplicationInfo(tostring(包名),0)
  local 图标 = 图标.loadIcon(pm);
  local pkg = activity.getPackageManager().getPackageInfo(包名, 0); 
  local 应用名称 = pkg.applicationInfo.loadLabel(activity.getPackageManager())
  local 版本号 = activity.getPackageManager().getPackageInfo(包名, 0).versionName
  local 最后更新时间 = activity.getPackageManager().getPackageInfo(包名, 0).lastUpdateTime
  local cal = Calendar.getInstance();
  cal.setTimeInMillis(最后更新时间); 
  local 最后更新时间 = cal.getTime().toLocaleString()
  return 包名,版本号,最后更新时间,图标,应用名称
end
```

透明对话框
```lua
local 对话框=AlertDialog.Builder(this)
.setMessage("透明")
.setPositiveButton("确定", null)
.create() 
local window =对话框.getWindow()
local lp =window.getAttributes()
lp.alpha = 0.6
window.setAttributes(lp)
对话框.show()
```

加载框
```lua
dialog= ProgressDialog.show(this,nil, "对话框内容..",false, true).hide()
dialog.show()

--2秒后关闭加载框
task(2000,function()
  dialog.dismiss()
end)
```

X5内核
```lua
--x5内核导入包↓
import "x5init"
import "com.tencent.smtt.export.external.*"
import "com.tencent.smtt.export.external.extension.interfaces.*"
import "com.tencent.tbs.video.interfaces.*"
import "com.tencent.smtt.export.external.proxy.*"
import "com.tencent.smtt.export.external.extension.proxy.*"
import "com.tencent.smtt.export.external.interfaces.ConsoleMessage"
import "com.tencent.smtt.sdk.*"
import "com.x5.WebView.*"
import "java.util.HashMap"
--x5内核导入包↑

--x5内核初始化源码↓
初始化=function()
  require"import"
  import"com.tencent.smtt.sdk.QbSdk"
  QbSdk.initX5Environment(activity,nil)
end
task(初始化,function(a) end)
浏览器设置(id)
--x5内核初始化源码↑

下载X5必须文件↓↓复制放到浏览器下载

https://pan.cccyun.cc/down.php/7c8703672b89cf075c012ac4e1e886fd.zip
```

zip解压
```lua
ZipUtil.unzip("ZIP路径","解压到的路径")

--另一种Java方法
import "java.io.FileOutputStream"
import "java.util.zip.ZipFile"
import "java.io.File"

zipfile = "/sdcard/压缩包.zip"--压缩文件路径和文件名
sdpath = "/sdcard/文件.lua"--解压后路径和文件名
zipfilepath = "内容.lua"--需要解压的文件名

function unzip(zippath , outfilepath , filename)

  local time=os.clock()
  task(function(zippath,outfilepath,filename)
    require "import"
    import "java.util.zip.*"
    import "java.io.*"
    local file = File(zippath)
    local outFile = File(outfilepath)
    local zipFile = ZipFile(file)
    local entry = zipFile.getEntry(filename)
    local input = zipFile.getInputStream(entry)
    local output = FileOutputStream(outFile)
    local byte=byte[entry.getSize()]
    local temp=input.read(byte)
    while temp ~= -1 do
      output.write(byte)
      temp=input.read(byte)
    end
    input.close()
    output.close()
  end,zippath,outfilepath,filename,
  function()
    print("解压完成，耗时 "..os.clock()-time.." s")
  end)

end

unzip(zipfile,sdpath,zipfilepath)
```

取本地时间
```lua
os.date("%Y-%m-%d %H:%M:%S")
```

判断版本
```lua
if 远端 > 本地 then
--如果 远端 >大于 本地 执行的事件
else
--如果远端 <小于 本地 执行的事件
end
```

判断赋值开关
```lua
if kaig==nil then
弹出消息("开启，执行的事件")
kaig=0
else
弹出消息("关闭，执行的事件")
kaig=nil
end
```

折叠列表事件
```lua
--主列表
填写ID.onGroupClick=function(l,v,p,s)
print(v.Text..'主列表')
end
--子列表
填写ID.onChildClick=function(l,v,g,c)
print(v.Text..'子列表')
end
```

加载网页
```lua
填写浏览ID.loadUrl("链接")
```

刷新网页
```lua
填写浏览ID.reload()
```

网页前进
```lua
填写浏览ID.goForward()
```

网页后退
```lua
填写浏览ID.goBack()
```

设置是否支持JS
```lua
浏览ID.getSettings().setJavaScriptEnabled(true)--支持 --false不支持
```

加载JS代码
```lua
填写浏览ID.loadUrl([[javascript:dataBox('填写代码');]])
```

返回网页底部
```lua
加载Js([[javascript:document.getElementsByTagName('BODY')[0].scrollTop=document.getElementsByTagName('BODY')[0].scrollHeight;]])
```

更换转换UA
```lua
填写浏览ID.settings.setUserAgentString('填写UA代码')
```

取当前网页图标
```lua
填写浏览ID.getFavicon()
```

取网页加载进度
```lua
填写浏览ID.getProgress()
```

系统音量调节
```lua
import "android.media.AudioManager"
mAudioManager=activity.getSystemService(Context.AUDIO_SERVICE);
mVolume=mAudioManager.getStreamVolume(AudioManager.STREAM_MUSIC);
mAudioManager.setStreamVolume(AudioManager.STREAM_MUSIC,100,0);--100音量，音量调节窗口隐藏为0，显示则1
```

创建函数事件
```lua
function 填写ID()
end
```

单击事件
```lua
填写ID.onClick=function()
end
```

长按事件
```lua
填写ID.onLongClick=function()
--执行的事件
return true
end
```

延时事件
```lua
task(1000,function()--1000毫秒=1秒
end)
```

触摸事件
```lua
填写ID.onTouch=function()
end
```

输入法回车键确定事件
```lua
imeOptions='actionSearch';--输入法确定按钮
--↑编辑框控件，属性加入此代码
--输入法回车键确定事件
import"android.graphics.Paint"
edit.setOnKeyListener({
onKey=function(v,keyCode,event)
if (KeyEvent.KEYCODE_ENTER == keyCode and KeyEvent.ACTION_DOWN == event.getAction()) then
if edit.text=="" then
Toast.makeText(activity,"错误，您还没有输入内容！",Toast.LENGTH_SHORT).show()
else
--填写执行的事件
end
return true;
else
return false;
end
end
})
```

创建文件夹/文件
```lua
import"java.io.File"
if File("sdcard/测试文件/文本.txt").exists() then
--文件存在事件
else File("/sdcard/测试文件").mkdir()--不存在 则创建
io.open("sdcard/测试文件/文本.txt",'w')
io.open("sdcard/测试文件/文本.txt","w+"):write("网络幽灵"):close()
end
```

读取文件信息
```lua
import"java.io.File"
读取目录=io.open("sdcard/测试文件/文本.txt"):read("*a")
内容=读取目录:match("网络幽灵QQ：(.-)\n")
```

修改文件内容并保存
```lua
import"java.io.File"
io.open("sdcard/测试文件/文本.txt","w+"):write("内容"):close()
```

写入文件
```lua
function 写入文件(路径,内容)
import"java.io.File"
f=File(tostring(File(tostring(路径)).getParentFile())).mkdirs()
io.open(tostring(路径),"w"):write(tostring(内容)):close()
end
--调用方法
写入文件("sdcard/Download/文件名称.txt","文件写入的内容")
```

解压apk内的压缩包
```lua
zip=this.getFilesDir().toString().."/drawable/文件名称.zip"
ZipUtil.unzip(zip,"/storage/emulated/0/")
```

压缩/解压zip
```lua
--压缩成zip：要压缩的文件目录，压缩到文件目录
ZipUtil.zip("sdcard/文件夹名称/文件.apk","/storage/emulated/0/")
--解压zip：要解压的文件目录，解压到文件目录
ZipUtil.unzip("sdcard/文件夹名称/压缩包.zip","/storage/emulated/0/")
```

弹出消息布局
```lua
function 弹出消息(文本)
tcxx={
LinearLayout;--线性布局
orientation='vertical';--布局方向
layout_width='fill';--布局宽度
layout_height='fill';--布局高度
{
CardView;--卡片控件
layout_width='wrap';--卡片宽度
layout_height='wrap';--卡片高度
CardBackgroundColor='#aaeeeeee';--卡片颜色
elevation=0;--阴影属性
radius='19dp';--卡片圆角
{
TextView;
layout_width="wrap";--布局宽度
layout_height="wrap";--布局高度
background="#cc000000";--背景颜色
padding="8dp";--布局填充
textSize="15sp";--文字大小
TextColor="#ffeeeeee";--文字颜色
gravity="center";--布局居中
id="wenzi";--控件ID
};
};
};
local toast=Toast.makeText(activity,"文本",Toast.LENGTH_SHORT).setView(loadlayout(tcxx))
toast.setGravity(Gravity.BOTTOM,0,120)
wenzi.Text=tostring(""..文本.."")
toast.show()
end
--调用方法
弹出消息("文本内容")
```

赋值框关闭事件
```lua
dialog1.OnDismissListener=function()
if dialog1.dismiss() then--如果 赋值框被关闭
--执行事件
if edit.Text ~= "" then--判断 编辑框内容是否为空
弹出消息("有输入反馈")--有内容执行的事件
else--为空执行的事件
弹出消息("没有输入反馈")--没有内容执行的事件
end--判断 结束
end--如果 结束
end--关闭事件 结束
```

缩放动画
```lua
function 缩放动画(控件)
import "android.view.animation.*"
控件.startAnimation(ScaleAnimation(0.0,1.0,0.0,1.0,1,0.5,1,0.5).setDuration(200))
end
--调用方法
缩放动画(填写控件ID)
```

单击缩放动画
```lua
单击缩放={
onTouch=function (v,e)
if e.action==0 then
设置缩放(v,1,0.95,250)
else
设置缩放(v,0.90,1,250)
end
end}
function 设置缩放(view,startscale,endscale,time)
local animatorSetsuofang = AnimatorSet()
local scaleX=ObjectAnimator.ofFloat(view,"scaleX",{startscale,endscale})
local scaleY=ObjectAnimator.ofFloat(view,"scaleY",{startscale,endscale})
animatorSetsuofang.setDuration(time)
animatorSetsuofang.setInterpolator(DecelerateInterpolator())
animatorSetsuofang.play(scaleX).with(scaleY);
animatorSetsuofang.start()
end
--调用方法
填写控件ID.onTouchListener=单击缩放;
```

单击返回键退出
```lua
function onKeyDown(code)
if code==4 then
activity.finish()--退出页面
return true
end
end
```

双击返回键退出
```lua
退出=0
function onKeyDown(code,event)
if string.find(tostring(event),"KEYCODE_BACK") ~= nil then
if 退出+2 > tonumber(os.time()) then
activity.finish()--退出页面
else
Toast.makeText(activity,"双击返回键退出",Toast.LENGTH_SHORT).show()
退出=tonumber(os.time())
end
return true
end
end
```

指定浏览器打开链接
```lua
function 指定浏览器打开(包名,链接)
import"android.os.*"
import"android.widget.*"
import"android.view.*"
import"android.text.*"
import"android.content.*"
intent=Intent("android.intent.action.VIEW")
intent.setPackage(包名)
intent.setData(Uri.parse(链接))
this.startActivity(intent)
end
--调用方法
指定浏览器打开("填写程序包名","填写网页链接")
```

重新启动程序
```lua
if pcall(function() activity.getPackageManager().getPackageInfo("填写程序包名",0) end) then
import "android.content.*"
intent = Intent()
componentName = ComponentName("填写程序包名","com.androlua.Welcome")
intent.setComponent(componentName)
activity.startActivity(intent)
end
```

调用其他程序打开
```lua
function OpenFile(path)
import "android.webkit.MimeTypeMap"
import "android.content.Intent"
import "android.net.Uri"
import "java.io.File"
FileName=tostring(File(path).Name)
ExtensionName=FileName:match("%.(.+)")
Mime=MimeTypeMap.getSingleton().getMimeTypeFromExtension(ExtensionName)
if Mime then
intent = Intent();
intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
intent.setAction(Intent.ACTION_VIEW);
intent.setDataAndType(Uri.fromFile(File(path)), Mime);
activity.startActivity(intent);
else
Toastc("找不到可以用来打开此文件的程序")
end
end
OpenFile("/storage/emulated/0/Download/这是个示例.jpg")
```

调用程序应用商店给予好评
```lua
对话框()
.设置标题("提示")
.设置消息("小哥哥，能不能给伦家一个好评呀~")
.设置积极按钮("点击好评",function()
intent=Intent("android.intent.action.VIEW")
intent.setPackage("com.coolapk.market")--应用商店包名
intent.setData(Uri.parse( "market://details?id=填写你的程序包名"))--id=后面是自己的程序包名
intent.addFlags(intent.FLAG_ACTIVITY_NEW_TASK)
this.startActivity(intent)
弹出消息("感谢支持！")
end)
.设置中立按钮("取消",function()
print("你真无情")
end)
.显示()
```

调用系统创建任务下载
```lua
function 创建下载(直链)
import "android.content.Intent"
import "android.net.Uri"
intent = Intent(Intent.ACTION_VIEW)
intent.setDataAndType(Uri.parse(直链),"audio")
this.startActivity(intent)
end
--调用方法
创建下载("http://pan.cccyun.cc/view.php/fe2db3c644322de831482bf60ca57ef3.png")
```

调用系统播放音乐
```lua
import "android.content.Intent"
import "android.net.Uri"
intent =Intent(Intent.ACTION_VIEW)
uri = Uri.parse("file:///sdcard/Fa助手/填写歌名.mp3")--填写路径或直链
intent.setDataAndType(uri,"audio/mp3")
this.startActivity(intent)
```

调用系统播放视频
```lua
function 系统播放器(直链)
import "android.content.Intent"
import "android.net.Uri"
intent = Intent(Intent.ACTION_VIEW)
intent.setDataAndType(Uri.parse(直链),"video/mp4")
activity.startActivity(intent)
end
--调用方法
系统播放器("填写视频直链")
```

控件圆角
```lua
function 控件圆角(控件,颜色,圆角)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable()
drawable.setShape(GradientDrawable.RECTANGLE)
drawable.setColor(颜色)
drawable.setCornerRadii({圆角,圆角,圆角,圆角,圆角,圆角,圆角,圆角})
控件.setBackgroundDrawable(drawable)
end
--调用方法
控件圆角(填写ID,0xFF6AAFE6,360)
```

自定义圆角
```lua
function 自定义圆角(控件,颜色,圆角1,圆角2,圆角3,圆角4)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable()
drawable.setShape(GradientDrawable.RECTANGLE)
drawable.setColor(颜色)
drawable.setCornerRadii({圆角1,圆角1,圆角2,圆角2,圆角3,圆角3,圆角4,圆角4})
控件.setBackgroundDrawable(drawable)
end
--调用方法
自定义圆角(填写控件ID,0xFF177cb0,360,0,160,0)
```

沉浸状态栏
```lua
if Build.VERSION.SDK_INT >=21 then--系统SDK21以上生效
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS).setStatusBarColor(0xff4285f4)
end
if Build.VERSION.SDK_INT >=19 then--系统SDK19以上生效
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
end
```

状态栏颜色
```lua
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS).setStatusBarColor(0xff4285f4)
```

显示状态栏
```lua
import "android.view.WindowManager"
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
```

隐藏状态栏
```lua
import "android.view.WindowManager"
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
```

设置底部虚拟按键沉浸
```lua
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
```

设置底部导航栏颜色
```lua
activity.getWindow().setNavigationBarColor(Color.parseColor("#ffff0000"))
```

联系QQ号
```lua
function 联系QQ(账号)
  import "android.content.Intent"
  import "android.net.Uri"
  activity.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqwpa://im/chat?chat_type=wpa&uin="..账号)))
end
--调用方法
联系QQ(2975208179)
```

添加QQ群
```lua
function 加QQ群(群号)
  import "android.content.Intent"
  import "android.net.Uri"
  activity.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqapi://card/show_pslcard?src_type=internal&version=1&uin="..群号.."&card_type=group&source=qrcode")))
end
--调用方法
加QQ群(603757221)
```

查看QQ资料
```lua
function 查看QQ资料(账号)
  import "android.content.Intent"
  import "android.net.Uri"
  this.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqapi://card/show_pslcard?uin="..账号)))
end
--调用方法
查看QQ资料(2975208179)
```

隐藏控件
```lua
填写控件ID.setVisibility(View.GONE)
```

显示控件
```lua
填写控件ID.setVisibility(View.VISIBLE)
```

运行lua+txt
```lua
dofile(tostring("/storage/emulated/0/填写文件夹名称/填写文件名.lua"))
```

调用系统浏览器搜索内容
```lua
function 浏览器搜索(文本)
import "android.content.Intent"
import "android.app.SearchManager"
intent = Intent()
intent.setAction(Intent.ACTION_WEB_SEARCH)
intent.putExtra(SearchManager.QUERY,文本)
activity.startActivity(intent)
end
--调用方法
浏览器搜索("马云是谁？")
```

调用系统浏览器打开链接
```lua
function 浏览器打开(链接)
import "android.content.Intent"
import "android.net.Uri"
viewIntent = Intent("android.intent.action.VIEW",Uri.parse(链接))
activity.startActivity(viewIntent)
end
--调用方法
浏览器打开("http://www.lanzou.com/")
```

分享文本内容
```lua
function 分享文本(标题,内容)
intent=Intent(Intent.ACTION_SEND)
intent.setType("text/plain")
intent.putExtra(Intent.EXTRA_SUBJECT,"分享")
intent.putExtra(Intent.EXTRA_TEXT,内容)
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
activity.startActivity(Intent.createChooser(intent,标题))
end
--调用方法
分享文本("填写标题","填写内容")
```

分享文件
```lua
function 分享文件(标题,路径)
import "android.webkit.MimeTypeMap"
import "android.content.Intent"
import "android.net.Uri"
import "java.io.File"
FileName=tostring(File(路径).Name)
ExtensionName=FileName:match("%.(.+)")
Mime=MimeTypeMap.getSingleton().getMimeTypeFromExtension(ExtensionName)
intent=Intent()
intent.setAction(Intent.ACTION_SEND)
intent.setType(Mime)
file=File(路径)
uri=Uri.fromFile(file)
intent.putExtra(Intent.EXTRA_STREAM,uri)
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
activity.startActivity(Intent.createChooser(intent,标题))
end
--调用方法
分享文件("填写标题","/storage/emulated/0/Download/文件名称.apk")
```

复制文本
```lua
import "android.content.*"
activity.getSystemService(Context.CLIPBOARD_SERVICE).setText("填写文本内容")
```

调用系统下载
```lua
function 系统下载(直链,目录,名称)
import "android.content.Context"
import "android.net.Uri"
downloadManager = activity.getSystemService(Context.DOWNLOAD_SERVICE)
request = DownloadManager.Request(Uri.parse(直链))
request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE|DownloadManager.Request.NETWORK_WIFI)
request.setDestinationInExternalPublicDir(目录,名称)
--request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)--是否通知栏显示
downloadManager.enqueue(request)
end
--调用方法
系统下载("填写直链","Download","文件名.apk")
```

删除文件
```lua
os.execute("rm -r sdcard/文件夹名称/文件名.apk")
```

打开系统设置
```lua
import "android.content.Intent"
import "android.provider.Settings"
activity.startActivity(Intent(Settings.ACTION_SETTINGS))
```

打开应用程序
```lua
function 打开程序(包名)
import "android.content.Intent"
import "android.content.pm.PackageManager"
manager = activity.getPackageManager()
open = manager.getLaunchIntentForPackage(包名)
this.startActivity(open)
end
--调用方法
打开程序("填写程序包名")
```

卸载应用程序
```lua
function 卸载程序(包名)
import "android.content.Intent"
import "android.net.Uri"
intent = Intent(Intent.ACTION_DELETE,Uri.parse("package:"..包名))
activity.startActivity(intent)
end
--调用方法
卸载程序("填写程序包名")
```

安装应用程序
```lua
function 安装程序(路径)
import "android.net.*"
import "android.content.*"
intent = Intent(Intent.ACTION_VIEW)
intent.setDataAndType(Uri.parse("file:///sdcard/"..路径),"application/vnd.android.package-archive")
intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
activity.startActivity(intent)
end
--调用方法
安装程序("文件夹名称/文件名.apk")
```

隐藏输入法
```lua
function 隐藏输入法(控件)
import "android.view.inputmethod.InputMethodManager"
activity.getSystemService(Context.INPUT_METHOD_SERVICE).hideSoftInputFromWindow(控件.getWindowToken(),0)
end
--调用方法
隐藏输入法(填写编辑框控件ID)
```

显示输入法
```lua
function 显示输入法(控件)
import "android.view.inputmethod.InputMethodManager"
activity.getSystemService(Context.INPUT_METHOD_SERVICE).showSoftInput(控件,0)
end
--调用方法
显示输入法(填写编辑框控件ID)
```

打开输入法
```lua
function 打开输入法(控件)
import "android.widget.*"
import "android.view.*"
import "android.content.*"
import "android.view.inputmethod.InputMethodManager"
srfa = 控件.getContext().getSystemService(Context.INPUT_METHOD_SERVICE)
srfa.toggleSoftInput(0,InputMethodManager.HIDE_NOT_ALWAYS)
local jiaodian=控件--设置焦点到编辑框
jiaodian.setFocusable(true)
jiaodian.setFocusableInTouchMode(true)
jiaodian.requestFocus()
jiaodian.requestFocusFromTouch()
end
--调用方法
打开输入法(edit)
```

取程序版本信息
```lua
版本名=this.getPackageManager().getApplicationLabel(this.getPackageManager().getApplicationInfo(this.getPackageName(),0))
版本号=tostring(this.getPackageManager().getPackageInfo(this.getPackageName(),((782268899/2/2-8183)/10000-6-231)/9).versionName)
```

隐藏时间
```lua
import "android.view.WindowManager"
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
```

显示时间
```lua
import "android.view.WindowManager"
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
```

暗色主题
```lua
this.setTheme(android.R.style.Theme_Material)
```

亮色主题
```lua
this.setTheme(android.R.style.Theme_Material_Light)
```

光标颜色
```lua
function 光标颜色(控件,颜色)
import "android.graphics.*"
local mEditorField=TextView.getDeclaredField('mEditor')
mEditorField.setAccessible(true)
local mEditor = mEditorField.get(控件)
local field = Editor.getDeclaredField('mCursorDrawable')
field.setAccessible(true)
local mCursorDrawable=field.get(mEditor)
local mccdf = TextView.getDeclaredField('mCursorDrawableRes')
mccdf.setAccessible(true)
local mccd = activity.getResources().getDrawable(mccdf.getInt(控件))
mccd.setColorFilter(PorterDuffColorFilter(颜色,PorterDuff.Mode.SRC_ATOP))
mCursorDrawable[0] = mccd
mCursorDrawable[1] = mccd
end
--调用方法
光标颜色(填写编辑框控件ID,0xffff0000)
```

打开微信扫一扫
```lua
function 微信扫一扫()
import "android.content.Intent"
import "android.content.ComponentName"
intent = Intent()
intent.setComponent(ComponentName("com.tencent.mm","com.tencent.mm.ui.LauncherUI"))
intent.putExtra("LauncherUI.From.Scaner.Shortcut",true)
intent.setFlags(335544320)
intent.setAction("android.intent.action.VIEW")
activity.startActivity(intent)
end
--调用方法
微信扫一扫()
```

打开支付宝扫一扫
```lua
function 支付宝扫一扫()
import "android.net.Uri"
import "android.content.Intent"
intent = Intent(Intent.ACTION_VIEW,Uri.parse("alipayqr://platformapi/startapp?saId=10000007"))
activity.startActivity(intent)
end
--调用方法
支付宝扫一扫()
```

禁用系统截图功能
```lua
this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE)
```

转换数字
```lua
tonumber()
```

转换字符串
```lua
tostring()
```

转换整数
```lua
tointeger()
```

即将加载事件
```lua
function 网页即将加载事件()--函数
if (网页链接:find"com") then--判断链接是否含有
弹出消息("要执行的事件")--事件
end--判断 结束
end--函数 结束
```

收到新标题事件
```lua
function 收到新标题事件()--函数
if (网页链接:find"com") then--判断链接是否含有
弹出消息("要执行的事件")--事件
end--判断 结束
end--函数 结束
```

加载完毕事件
```lua
function 网页加载完毕事件()--函数
if (网页链接:find"com") then--判断链接是否含有
弹出消息("要执行的事件")--事件
end--判断 结束
end--函数 结束
```

文本替换
```lua
文本替换=content:gsub("当前文本1","替换为")
```

文本变量
```lua
文本变量=content:match("【自定义】(.-)【自定义】")
```

判断关键字
```lua
if (网页链接:find("com")) then
--执行的事件
end
```

判断网络链接状态
```lua
if code==200 then--判断网络链接状态
--执行的事件
else
弹出消息("错误，网络链接失败！")--链接失败事件
end--判断网络链接 结束
```

网页截取
```lua
--网页截取
Http.get("网页链接",nil,nil,nil,function(code,content)
if code==200 then--判断网络链接状态

内容=content:match([[前字符(.-)后字符]])--文本变量截取
弹出消息(内容)

else
弹出消息("错误，网络链接失败！")--链接失败事件
end--判断网络链接 结束
end)--网页截取 结束
```

网页ua截取
```lua
--网页截取
local 设置ua={["User-Agent"]="Mozilla/5.0 (Linux; Android 9; STF-AL00 Build/HUAWEISTF-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.99 Mobile Safari/537.36"}
Http.get("网页链接",nil,"UTF-8",设置ua,function(code,content,cookie,header)
if code==200 then--判断网络链接状态

内容=content:match([[前字符(.-)后字符]])--文本变量截取
弹出消息(内容)

else
弹出消息("错误，网络链接失败！")--链接失败事件
end--判断网络链接 结束
end)--网页截取 结束
```

讯飞语记远程
```lua
--讯飞语记远程链接
Http.get("填写讯飞语记链接",nil,nil,nil,function(code,content)
if code==200 then--判断网络链接状态
local 截取范围=content:match([[id="content">
					<p>(.-)</div>
				<div class=]])
local 字符过滤=截取范围:gsub("&lt;","<"):gsub("&gt;",">"):gsub([[&nbsp; ]],""):gsub("&nbsp;",""):gsub("amp;",""):gsub("</p><p>","\n"):gsub("<br/>","")

内容=字符过滤:match([[前字符(.-)后字符]])
弹出消息(内容)

else--网络链接失败事件
弹出消息("错误，网络链接失败！")
end--判断网络链接 结束
end)--讯飞语记远程 结束
```

远程网页控制
```lua
--远程网页控制
Http.get("填写讯飞语记链接",nil,nil,nil,function(code,content)
if code==200 then--判断网络链接
截取范围=content:match([[id="content">
					<p>(.-)</div>
				<div class=]])

网页过滤=截取范围:gsub("&lt;","<"):gsub("&gt;",">"):gsub([[&nbsp; ]],""):gsub("&nbsp;",""):gsub("amp;",""):gsub("</p><p>","\n"):gsub("<br/>","")

config.web_control[1].url=网页过滤:match("【域名】(.-)【域名】")
config.web_control[1].remove_element=网页过滤:match("【元素】(.-)【元素】")
config.web_control[1].js=网页过滤:match("【JS】(.-)【JS】")
config.global_js=网页过滤:match("【全局JS】(.-)【全局JS】")

else--网络链接失败事件
弹出消息("错误，网络链接失败！")
end--判断网络链接 结束
end)--讯飞语记远程 结束
```

程序启动网页控制
```lua
--程序启动网页控制
config.web_control[1].url=([[填写域名]])--网址域名
config.web_control[1].remove_element=([[填写元素]])--删除元素
config.web_control[1].js=([[填写Js代码]])--加载Js
```

浏览器控件
```lua
--浏览器ID.getSettings().setBuiltInZoomControls(false)--不支持缩放
--网页加载事件
浏览器ID.setWebViewClient{
shouldOverrideUrlLoading=function(view,url)
--网页即将加载
end,

onPageStarted=function(view,url,favicon)
--收到新标题
end,

onPageFinished=function(view,url)
--网页加载完毕
end
}

--加载网页
浏览器ID.loadUrl("http://www.baidu.com")
```

进度条颜色
```lua
--进度条颜色
import "android.graphics.drawable.ColorDrawable"
import "android.graphics.PorterDuffColorFilter"
import "android.graphics.PorterDuff"
填写控件ID.IndeterminateDrawable.setColorFilter(PorterDuffColorFilter(0xFFFF0000,PorterDuff.Mode.SRC_ATOP))
```

加载动画
```lua
加载动画=ProgressDialog.show(this,"","正在加载中，请等待...",false,true).hide()
```

设置旋转度
```lua
填写控件ID.setRotation(45)--设置旋转度数
```

禁用返回键
```lua
.setCancelable(false)--禁用返回键
```

重置当前界面
```lua
activity.recreate()--重置当前界面
```

跳转页面视图
```lua
页面视图控件ID.showPage(0)--0第一页,1第二页,以此类推
```

发送邮件
```lua
function 发送邮件(邮箱,标题,内容)
import "android.content.Intent"
i = Intent(Intent.ACTION_SEND)
i.setType("message/rfc822")
i.putExtra(Intent.EXTRA_EMAIL,{邮箱})
i.putExtra(Intent.EXTRA_SUBJECT,标题)
i.putExtra(Intent.EXTRA_TEXT,内容)
activity.startActivity(Intent.createChooser(i,"Choice"))
end
--调用方法
发送邮件("782268899@qq.com","填写标题","填写要发送的内容")
```

反向输入法
```lua
function 反向输入法()
import "android.view.inputmethod.InputMethodManager"
imm = activity.getSystemService(Context.INPUT_METHOD_SERVICE)
imm.toggleSoftInput(0,InputMethodManager.HIDE_NOT_ALWAYS)
end
--调用方法
反向输入法()
```

调用系统应用商店搜索
```lua
function 商店搜索(包名)
import "android.content.Intent"
import "android.net.Uri"
intent = Intent("android.intent.action.VIEW")
intent.setData(Uri.parse("market://details?id="..包名))
this.startActivity(intent)
end
--调用方法
商店搜索("填写程序包名")
```

清除图片缓存数据
```lua
import "android.content.*"
os.execute("rm -rf /sdcard/AndroLua/cache")
```

清除影视缓存数据
```lua
os.execute("rm -rf /data/data/"..this.packageName.."/cache/")
os.execute("rm -rf /data/data/"..this.packageName.."/files/data/")
```

清除全部数据
```lua
os.execute("rm -rf /data/data/"..this.packageName.."/cache/")
os.execute("rm -rf /data/user/0/"..this.packageName.."/cache/")
os.execute("rm -rf /data/data/"..this.packageName.."/files/data/")
os.execute("rm -rf /data/user/0/"..this.packageName.."/files/data/")
os.execute("rm -rf /sdcard/Android/data/"..this.packageName.."/files/VideoCache/main/")
os.execute("rm -rf /storage/emulated/0/Android/data/"..this.packageName.."/files/VideoCache/main/")
os.execute("pm clear "..this.packageName)
```

程序后台运行
```lua
import "android.content.Intent"
intent = Intent()
intent.setAction("android.intent.action.MAIN")
intent.addCategory("android.intent.category.HOME")
activity.startActivity(intent)
```

导入基本函数库
```lua
require "import"
import "android.app.*"
import "android.os.*"
import "android.widget.*"
import "android.view.*"
import "android.support.v7.widget.*"
import "android.support.v4.widget.*"
import "android.graphics.Typeface"
```

运行远程布局
```lua
assert(loadstring(远端布局))()
```
