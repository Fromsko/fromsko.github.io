# Fa 实例代码

FusionApp 自带的控件 ID

```lua
搜索栏：searchEdtTxt

顶栏：toolbar.parent

标题栏：toolbar

顶栏标题：titleTvw

侧滑栏：drawerLayout

浏览器：webView

悬浮球按钮：fltBtn

滑动窗体：pager

菜单栏：popmenu_position

侧滑栏显示图标：sidebar

进度条：pgsBar

侧滑图标：sideLvw

菜单图标：menu_button

侧滑栏图标：menuBtn
```

Fa 取当前版本号

```lua
当前版本 = this.getPackageManager().getPackageInfo(this.getPackageName(),64).versionName

print(当前版本)
```

禁止手机息屏

```lua
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

--或者
this.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
```

打印消息

```lua
print("文本内容")
```

Toast 消息

```lua
Toast.makeText(activity,"文本内容",Toast.LENGTH_SHORT).show()
```

Fa 检查程序是否含有中文字符

```lua
require "import"
file=luajava.luadir
import "java.io.File"
function fileList(file)
return luajava.astable(File(tostring(file)).listFiles())
end
err={}
import "init"
function nextFile(file)
for k,v in pairs(fileList(file)) do
if File(tostring(v)).isDirectory() then
nextFile(v)
end
if not string.match(tostring(v),".*/(.-)$"):gsub("%p",""):find("^(%w*)$") then
print("文件内有中文"..v)
else
print("扫描完成，未发现中文。")
end
end
end
nextFile(file)
```

Fa 弹出消息

```lua
弹出消息("文本")
```

Fa 进入子页面

```lua
进入子页面("页面名称")
```

Fa 进入子页面+标题

```lua
进入子页面("页面名称",{标题="顶栏标题"})
```

Fa 进入子页面+链接

```lua
进入子页面("页面名称",{链接="网页链接"})
```

Fa 进入子页面+标题+链接

```lua
进入子页面("页面名称",{标题="顶栏标题",链接="网页链接"})
```

Fa 加载 Js

```lua
加载Js([[JavaScript代码]])
```

Fa 加载网页

```lua
加载网页("链接")
```

Fa 刷新网页

```lua
刷新网页()
```

Fa 停止加载

```lua
停止加载()
```

Fa 网页前进

```lua
网页前进()
```

Fa 网页后退

```lua
网页后退()
```

Fa 返回网页顶部

```lua
返回网页顶部()
```

Fa 阅读模式

```lua
阅读模式()
```

Fa 显示对话框

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

Fa 泡沫对话框

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

Fa 退出程序

```lua
退出程序()
```

Fa 退出页面

```lua
退出页面()
```

Fa 复制文本

```lua
复制文本("文本内容")
```

Fa 分享文本

```lua
分享文本("文本内容")
```

Fa 分享链接

```lua
分享文本(webView.getUrl())
```

Fa 发送邮件

```lua
发送邮件("3102429466@qq.com")
```

Fa 联系 QQ

```lua
联系QQ(3102429466)
```

Fa 加 QQ 群

```lua
加QQ群(571664804)
```

Fa 页内查找

```lua
页内查找("填写要查找的文本")
```

Fa 点击元素

```lua
点击元素("元素类名")--即使是被网页控制屏蔽的元素，也可以使用该代码点击
```

Fa 下载文件

```lua
下载文件("填写直链")--文件将保存到手机根目录
```

Fa 执行 Shell

```lua
执行Shell("shell命令")
```

Fa 调用浏览器打开当前网页

```lua
import "android.content.Intent"
import "android.net.Uri"
url=(webView.getUrl())--Fa当前网页
viewIntent = Intent("android.intent.action.VIEW",Uri.parse(url))
activity.startActivity(viewIntent)
```

Fa 侧滑栏图标点击退出

```lua
menuBtn.onClick=function()
退出页面()
end
```

Fa 低栏模板进入子页面

```lua
pager.addOnPageChangeListener{
onPageScrolled=function(page)
if page==2 then--2 代表 低栏第二页
进入子页面("页面名称")
end
end
}
```

Fa 关闭侧滑栏

```lua
drawerLayout.closeDrawer(3)
```

Fa 打开侧滑栏

```lua
drawerLayout.openDrawer(3)
```

Fa 隐藏侧滑栏（隐藏后无法打开）

```lua
linearParams=sidebar.getLayoutParams()
linearParams.width=0
linearParams.height=0
sidebar.setLayoutParams(linearParams)
flt=sidebar.getLayoutParams()
flt.setMargins(0,0,0,0)
sidebar.setLayoutParams(flt)
drawerLayout.setScrimColor(0)
menuBtn.setVisibility(View.GONE)
```

Fa 设置顶栏标题

```lua
设置顶栏标题("填写标题")

--或者:
titleTvw.setText("填写标题")
```

Fa 设置顶栏颜色

```lua
toolbarParent.setBackgroundColor(Color.parseColor("#ff4c9afa"))--设置顶栏颜色
```

Fa 顶栏标题跟随网页

```lua
设置顶栏标题(webView.title)--收到新标题事件
```

Fa 隐藏顶栏

```lua
toolbar.parent.setVisibility(View.GONE)
```

Fa 显示顶栏

```lua
toolbar.parent.setVisibility(View.VISIBLE)
```

Fa 隐藏顶栏标题

```lua
titleTvw.setVisibility(View.GONE)
```

Fa 显示顶栏标题

```lua
titleTvw.setVisibility(View.VISIBLE)
```

Fa 隐藏顶栏菜单按钮

```lua
toolbar.setVisibility(View.GONE)
```

Fa 显示顶栏菜单按钮

```lua
toolbar.setVisibility(View.VISIBLE)
```

Fa 隐藏悬浮球

```lua
fltBtn.setVisibility(View.GONE)
```

Fa 显示悬浮球

```lua
fltBtn.setVisibility(View.VISIBLE)
```

Fa 悬浮球居中

```lua
fltBtn.setVisibility(View.VISIBLE)--显示悬浮球
task(150,function()
  fltBtn.LayoutParams=fltBtn.LayoutParams.setMargins(0,0,
  activity.getWidth()/2-fltBtn.getMeasuredWidth()/2,100)
end)
```

Fa 悬浮球单击弹出菜单

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
pop.show()
end
```

Fa 查看网页源码

```lua
webView.loadUrl("view-source:"..webView.url)
```

Fa 空白模板专用

```lua
import "android.support.v7.widget.CardView"
import "android.view.WindowManager"--显示顶栏时间
activity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
```

Fa 取当前网页链接

```lua
webView.getUrl()
```

Fa 调用浏览器打开解析视频链接

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
import "android.media.MediaPlayer"--导入类
mediaPlayer = MediaPlayer()--赋值
mediaPlayer.reset()--初始化参数
mediaPlayer.setDataSource("https://pan.cccyun.cc/down.php/d1ab975c254a20759f1f5cccbb389214.mp3")--设置播放资源
mediaPlayer.prepare()--开始缓冲资源
mediaPlayer.setLooping(true)--循环true--不循环false
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
弹出消息("执行事件")--后台强制关闭时,执行的事件
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
编辑框ID.addTextChangedListener({
onTextChanged=function()
print("您正在输入:"..编辑框ID.Text)--这里加入事件，例如:判断是否为网址等
end
})
```

手机息屏/后台运行事件

```lua
function onStop()
弹出消息("执行事件")
end
```

读取本地文件路径

```lua
"file://"..activity.getLuaDir().."/xxx.mp4"
```

PopMenu 弹出菜单列表

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
pop.show()
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
print("Fia开发手册")
```

取本地时间

```lua
本地时间 = os.date("%Y-%m-%d %H:%M:%S")--分别为: 年-月-日 时:分:秒

print(本地时间)
```

判断赋值开关

```lua
if kaig==nil then
kaig=0
弹出消息("开启，执行的事件")
else
kaig=nil
弹出消息("关闭，执行的事件")
end
```

加载网页

```lua
浏览器控件ID.loadUrl("网页链接")
```

停止加载网页

```lua
浏览器控件ID.stopLoading()
```

刷新网页

```lua
浏览器控件ID.reload()
```

网页前进

```lua
浏览器控件ID.goForward()
```

网页后退

```lua
浏览器控件ID.goBack()
```

设置是否支持 JS

```lua
浏览器控件ID.getSettings().setJavaScriptEnabled(true)--支持 --false不支持
```

加载 JS 代码

```lua
浏览器控件ID.loadUrl([[javascript:dataBox('填写代码');]])
```

返回网页底部

```lua
加载Js([[javascript:document.getElementsByTagName('BODY')[0].scrollTop=document.getElementsByTagName('BODY')[0].scrollHeight;]])
```

更换转换 UA

```lua
浏览器控件ID.settings.setUserAgentString('填写UA代码')
```

网页图标

```lua
浏览器控件ID.getFavicon()
```

网页加载进度

```lua
浏览器控件ID.getProgress()
```

动画状态监听

```lua
import"android.view.animation.Animation$AnimationListener"
动画.setAnimationListener(AnimationListener{
onAnimationStart=function()
print"动画开始"
end,
onAnimationEnd=function()
print"动画结束"
end,
onAnimationRepeat=function()
print"动画重复"
end
})
```

系统音量调节

```lua
import "android.media.AudioManager"
mAudioManager = activity.getSystemService(Context.AUDIO_SERVICE)
mVolume = mAudioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
mAudioManager.setStreamVolume(AudioManager.STREAM_MUSIC,100,0)--100音量，音量调节窗口:隐藏0｜显示1
```

创建函数事件

```lua
function 填写ID()
--事件
end
```

单击事件

```lua
填写ID.onClick=function()
--事件
end
```

长按事件

```lua
填写ID.onLongClick=function()
--事件
return true
end
```

延时事件

```lua
task(1000,function()--1000毫秒=1秒
--事件
end)
```

触摸事件

```lua
填写ID.onTouch=function()
--事件
end
```

输入法回车键确定事件

```lua
imeOptions="actionSearch",--输入法确定按钮
--↑编辑框控件，属性加入此代码

--输入法回车键确定事件
import"android.graphics.Paint"
编辑框ID.setOnKeyListener({
onKey=function(v,keyCode,event)
if (KeyEvent.KEYCODE_ENTER == keyCode) and (KeyEvent.ACTION_DOWN == event.getAction()) then
if (编辑框ID.text == "") then
Toast.makeText(activity,"错误，内容不能为空！",Toast.LENGTH_SHORT).show()
else
--填写执行的事件
end
return true
else
return false
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
io.open("sdcard/测试文件/文本.txt","w")
io.open("sdcard/测试文件/文本.txt","w+"):write("Fia开发手册"):close()
end
```

读取文件信息

```lua
读取目录 = io.open("sdcard/测试文件/文本.txt"):read("*a")
获得内容 = 读取目录:match("Fia开发手册QQ：(.-)\n")
```

修改文件内容并保存

```lua
io.open("sdcard/测试文件/文本.txt","w+"):write("要保存的内容"):close()
```

写入文件

```lua
function 写入文件(路径,内容)
import"java.io.File"
File(tostring(File(tostring(路径)).getParentFile())).mkdirs()
io.open(tostring(路径),"w"):write(tostring(内容)):close()
end
--调用方法
写入文件("sdcard/Download/文件名称.txt","文件写入的内容")
```

解压 apk 内的压缩包

```lua
zip=this.getFilesDir().toString().."/drawable/文件名称.zip"
ZipUtil.unzip(zip,"/storage/emulated/0/")
```

压缩/解压 zip

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
LinearLayout,--线性布局
orientation="vertical",--布局方向
layout_width="fill",--布局宽度
layout_height="fill",--布局高度
{
CardView,--卡片控件
layout_width="wrap",--卡片宽度
layout_height="wrap",--卡片高度
CardBackgroundColor="#aaeeeeee",--卡片颜色
cardElevation="0dp",--卡片提升
radius="19dp",--卡片圆角
{
TextView,
layout_width="wrap",--布局宽度
layout_height="wrap",--布局高度
background="#cc000000",--背景颜色
padding="8dp",--布局填充
textSize="15sp",--文字大小
TextColor="#ffeeeeee",--文字颜色
gravity="center",--布局居中
id="wenzi",--控件ID
},
},
}
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
end
end
end
```

控件缩放动画

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
animatorSetsuofang.play(scaleX).with(scaleY)
animatorSetsuofang.start()
end
--调用方法
填写控件ID.onTouchListener=单击缩放
```

单击返回键退出

```lua
function onKeyDown(code)
if code==4 then
activity.finish()--退出页面,删除此行则无法退出
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
elseif Build.VERSION.SDK_INT >=19 then--系统SDK19以上生效
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

联系 QQ 号

```lua
function 联系QQ(账号)
import "android.content.Intent"
import "android.net.Uri"
activity.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqwpa://im/chat?chat_type=wpa&uin="..账号)))
end
--调用方法
联系QQ(3102429466)
```

添加 QQ 群

```lua
function 加QQ群(群号)
import "android.content.Intent"
import "android.net.Uri"
activity.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqapi://card/show_pslcard?src_type=internal&version=1&uin="..群号.."&card_type=group&source=qrcode")))
end
--调用方法
加QQ群(571664804)
```

查看 QQ 资料

```lua
function 查看QQ资料(账号)
import "android.content.Intent"
import "android.net.Uri"
this.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqapi://card/show_pslcard?uin="..账号)))
end
--调用方法
查看QQ资料(3102429466)
```

隐藏控件

```lua
填写控件ID.setVisibility(View.GONE)
```

显示控件

```lua
填写控件ID.setVisibility(View.VISIBLE)
```

运行 lua+txt

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

晃动动画

```lua
function 晃动动画(控件,效果)
if 效果=="单" then
ObjectAnimator().ofFloat(控件,"scaleX",{1,.9,1.1,1.2,.8,1.1,.9,1}).start()
.setDuration(600)
elseif 效果=="双" then
ObjectAnimator().ofFloat(控件,"scaleX",{1,.9,1.1,1.2,.8,1.1,.9,1}).start()
ObjectAnimator().ofFloat(控件,"scaleY",{1,.9,1.1,1.2,.8,1.1,.9,1}).start()
.setDuration(1800)
end
end
--调用方法
晃动动画(填写控件ID,"双")--单--双
```

水珠动画

```lua
function 水珠动画(控件,时间)
import "android.animation.ObjectAnimator"
ObjectAnimator().ofFloat(控件,"scaleX",{1,.8,1.3,.9,1}).setDuration(时间).start()
ObjectAnimator().ofFloat(控件,"scaleY",{1,.8,1.3,.9,1}).setDuration(时间).start()
end
--调用方法
水珠动画(填写控件ID,500)
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

调用系统创建新建任务下载

```lua
import "android.content.Intent"
import "android.net.Uri"
local 下载直链="这里填写直链"
viewIntent = Intent("android.intent.action.VIEW",Uri.parse(下载直链))
activity.startActivity(viewIntent)
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
版本号=tostring(this.getPackageManager().getPackageInfo(this.getPackageName(),((3102429466/2/2-8183)/10000-6-231)/9).versionName)
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
发送邮件("3102429466@qq.com","填写标题","填写要发送的内容")
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

颜色渐变

```lua
function 颜色渐变(控件,左色,右色)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable(GradientDrawable.Orientation.TR_BL,{左色,右色,});
控件.setBackgroundDrawable(drawable)
end
--调用方法
颜色渐变(填写控件ID,0xffffe6d1,0xFF1467DF)
```

渐变圆角

```lua
function 渐变圆角(控件,左色,右色,圆角)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable(GradientDrawable.Orientation.TR_BL,{右色,左色});
drawable.setCornerRadii({圆角,圆角,圆角,圆角,圆角,圆角,圆角,圆角});
控件.setBackgroundDrawable(drawable)
end
--调用方法
渐变圆角(填写控件ID,0xffeeeeee,0xffff0000,360)
```

三色渐变

```lua
function 三色渐变(控件,左色,中色,右色,圆角)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable(GradientDrawable.Orientation.TR_BL,{左色,中色,右色});
drawable.setCornerRadii({圆角,圆角,圆角,圆角,圆角,圆角,圆角,圆角});
控件.setBackgroundDrawable(drawable)
end
--调用方法
三色渐变(填写控件ID,0xfff349eb,0xfff9c00c,0xff00b9f1,360)
```

四层渐变

```lua
function 四层渐变(控件,颜色1,颜色2,颜色3,颜色4)
import "android.graphics.drawable.GradientDrawable"
控件.setBackgroundDrawable(GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM,{颜色1,颜色2,颜色3,颜色4,}))
end
--调用方法
四层渐变(填写控件ID,0xFFA593E0,0xff000000,0xffF17F42,0xff9055A2)
```

闪动背景

```lua
function 闪动背景(控件,频率，颜色1,颜色2,颜色3,颜色4)
import "android.animation.ObjectAnimator"
import "android.animation.ArgbEvaluator"
import "android.animation.ValueAnimator"
import "android.graphics.Color"
colorAnim = ObjectAnimator.ofInt(ID,"backgroundColor",{颜色1,颜色2,颜色3,颜色4})
colorAnim.setDuration(频率)
colorAnim.setEvaluator(ArgbEvaluator())
colorAnim.setRepeatCount(ValueAnimator.INFINITE)
colorAnim.setRepeatMode(ValueAnimator.REVERSE)
colorAnim.start()
end
--调用方法
闪动背景(填写控件ID,5000,0xffFF8080,0xff8080FF,0xff80ffff,0xff80ff80)
```

闪动字体

```lua
function 闪动字体(控件,频率,颜色1,颜色2,颜色3,颜色4)
import "android.animation.ObjectAnimator"
import "android.animation.ArgbEvaluator"
import "android.animation.ValueAnimator"
import "android.graphics.Color"
colorAnim = ObjectAnimator.ofInt(控件,"textColor",{颜色1,颜色2,颜色3,颜色4})
colorAnim.setDuration(频率)
colorAnim.setEvaluator(ArgbEvaluator())
colorAnim.setRepeatCount(ValueAnimator.INFINITE)
colorAnim.setRepeatMode(ValueAnimator.REVERSE)
colorAnim.start()
end
--调用方法
闪动字体(填写文本控件ID,5000,0xffFF8080,0xff8080FF,0xff80ffff,0xff80ff80)
```

闪波纹

```lua
function 闪波纹(控件,颜色)
import "android.graphics.drawable.ColorDrawable"
控件.setBackgroundDrawable(ColorDrawable(颜色))
task(10,function()
import "android.graphics.drawable.ColorDrawable"
控件.setBackgroundDrawable(ColorDrawable(0))
end)
end
--调用方法
闪波纹(填写控件ID,0x39000000)
```

波纹特效

```lua
function 波纹(控件,颜色)
import "android.content.res.ColorStateList"
local attrsArray={android.R.attr.selectableItemBackgroundBorderless}
local typedArray=activity.obtainStyledAttributes(attrsArray)
Pretend = activity.Resources.getDrawable(typedArray.getResourceId(0,0))
Pretend.setColor(ColorStateList(int[0].class{int{}},int{颜色}))
控件.setBackground(Pretend.setColor(ColorStateList(int[0].class{int{}},int{颜色})))
end
--调用方法
波纹(填写控件ID,0xffffffff)
```

波纹特效 v2

```lua
function 波纹特效v2(颜色)
import"android.content.res.ColorStateList"
return activity.Resources.getDrawable(activity.obtainStyledAttributes({android.R.attr.selectableItemBackground--[[Borderless]]}).getResourceId(0,0))
.setColor(ColorStateList(int[0]
.class{int{}},int{颜色 or 0x20000000}))
end
--调用方法
填写控件ID.foreground=波纹特效v2(0xffff0000)
```

边框圆角

```lua
function 边框圆角(边宽度,边框色,背景色,圆角度)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable()
drawable.setShape(GradientDrawable.RECTANGLE)
drawable.setStroke(边宽度,tonumber(边框色))
drawable.setColor(tonumber(背景色))
drawable.setCornerRadius(圆角度)
return drawable
end
--调用方法
填写控件ID.BackgroundDrawable=边框圆角(2,0xffff0000,0xffffffff,360);
```

流畅旋转动画

```lua
function 流畅旋转(控件,频率,顺时针,逆时针)
import "android.view.animation.LinearInterpolator"
c = ObjectAnimator()
c.setTarget(控件)
c.setDuration(频率)
c.setRepeatCount(ValueAnimator.INFINITE)
c.setPropertyName("rotation")
c.setFloatValues({顺时针,逆时针})
c.setRepeatMode(ValueAnimator.INFINITE)
c.setInterpolator(LinearInterpolator())
c.start()
end
--调用方法
流畅旋转(填写控件ID,90000,720,0)
```

缓冲旋转动画

```lua
function 缓冲旋转(控件,频率,顺时针,逆时针)
import "android.view.animation.Animation"
import "android.view.animation.RotateAnimation"
rotate = RotateAnimation(顺时针,逆时针,Animation.RELATIVE_TO_SELF,0.5,Animation.RELATIVE_TO_SELF,0.5)
rotate.setDuration(频率)
rotate.setRepeatCount(频率)
控件.startAnimation(rotate)
end
--调用方法
缓冲旋转(填写控件ID,5000,0,360)
```

单次旋转动画

```lua
function 单次旋转(控件,频率,顺时针,逆时针)
import "android.view.animation.Animation"
import "android.view.animation.RotateAnimation"
rotate = RotateAnimation(顺时针,逆时针,Animation.RELATIVE_TO_SELF,0.5,Animation.RELATIVE_TO_SELF,0.5)
rotate.setDuration(频率)
rotate.setRepeatCount(0.5)
控件.startAnimation(rotate)
end
--调用方法
单次旋转(填写控件ID,5000,0,360)
```

闪耀动画

```lua
function 闪耀动画(控件)
sydh = ObjectAnimator.ofFloat(控件,"alpha",{0,1})
sydh.setDuration(2000)--设置动画时间
sydh.setInterpolator(DecelerateInterpolator())--设置动画插值器，减速
sydh.setRepeatCount(-1)--设置动画重复次数，这里-1代表无限
sydh.start()--启动动画
end
--调用方法
闪耀动画(填写控件ID)
```

发送短信

```lua
function 发送短信(号码,内容)
import "android.content.*"
import "android.net.*"
intent = Intent(Intent.ACTION_SENDTO,Uri.parse("smsto:"..号码))
intent.putExtra("sms_body",内容)
intent.setAction("android.intent.action.VIEW")
activity.startActivity(intent)
end
--调用方法
发送短信(15888888888,"今天约吗？")
```

拨打电话

```lua
function 拨打电话(号码)
import "android.content.*"
import "android.net.*"
intent=Intent(Intent.ACTION_CALL,Uri.parse("tel:"..号码))
intent.setAction("android.intent.action.VIEW")
activity.startActivity(intent)
end
--调用方法
拨打电话(10086)
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

加载 aly 布局

```lua
activity.setContentView(loadlayout("layout"))
```

Lua 进入子页面

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

导入基本函数库

```lua
require "import"
import "android.app.*"
import "android.os.*"
import "android.widget.*"
import "android.view.*"
```

揭露动画

```lua
function 揭露动画(view,a,b,c,d,e)
translationUp = ViewAnimationUtils.createCircularReveal(view,a,b,c,d)
translationUp.setInterpolator(DecelerateInterpolator())
translationUp.setDuration(e)
translationUp.start()
end
--调用方法
task(1,function()
揭露动画(填写控件ID,0,0,0,activity.Height,2000)
end)
```

运行代码布局

```lua
assert(loadstring(代码布局))()
```

Fa 禁用下载功能

```lua
webView.setDownloadListener{
onDownloadStart=function(url)
webView.stopLoading()--停止加载
end
}
```

浏览器控件常用 API

```lua
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

手机系统按键讲解

```lua
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

Fa 取当前网页域名及信息

```lua
surl=Uri.parse(webView.url)
url_main=surl.authority--网址域名部分
url_scheme=surl.scheme--http, https, ftp或其他外部应用的scheme
url_path=surl.path--路径
url_query=surl.query--关键词部分
url_frag=surl.fragment
url_host=surl.host--主机
对话框()
.设置标题("网页链接信息")
.设置消息(url_main.."\n"..url_scheme)--如果值为nil连接在一起会报错哦
.设置积极按钮("OK")
.显示()
```

设置底部虚拟按键沉浸透明

```lua
activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
```

设置屏幕方向代码

```lua
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

编辑框常用属性

```lua
phoneNumber="true";--仅支持电话。
maxLength="10";--限制最多输入文字
typeface="monospace" --设置字型，字形有：normal, sans, serif,monospace
inputType="number";--设置能输入英文和数字
singleLine="true";--设置仅支持单行输入
password="true";--设置仅支持输入密码,自动隐藏
capitalize="characters";--仅支持大写英文
ellipsize="end";--一般用于输入文字超过长度自动隐藏
```

设置 Lua 编程器框颜色

```lua
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

拦截网页 apk 安装包

```lua
webView.setDownloadListener{
  onDownloadStart=function(url)
    if (url:find".apk") then
      webView.stopLoading()
    end
  end
}
```

Fa 网页即将加载时执行的事件

```lua
浏览器对象,网页链接=...
if(网页链接:find"wap.sogou.com")or (网页链接:find"www.baidu.com") then--判断多个
停止加载()--网址若含有以上↑连串字符 将执行↓以下事件
进入子页面("页面名称",{链接=网页链接})--要执行的事件
end
```

Fa 让网页再刷新一次

```lua
﻿if webView.url~=记录网址 then
记录网址=webView.url
webView.reload()
print("刷新反馈消息")
end
```

Fa 点击自动下载

```lua
﻿webView.setDownloadListener({ --webview的下载监听
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

Fa 防止手机休眠开关

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

透明颜色代码讲解

```lua
--颜色代码格式分为两种∶
第一种是∶# 开头，然后，后面加8个字符（也可以删除前面的两个ff，后面加6个字符）
第二种是∶0x 开头，然后，后面加8个字符
--所以透明代码，分为四种∶
第一种∶白色透明--不用区分 大小写
#00ffffff--前面的两个零，为透明度，
--如果改成#60ffffff，就会变成白色 半透明
--前面的两个#00～99 数字越高，代表 越不透明
0x00ffffff
第二种∶黑色透明--不用区分 大小写
#00000000--前面的两个零，为透明度，
--如果改成#60000000，就会变成黑色 半透明
--前面的两个0x00～99 数字越高，代表 越不透明
0x00000000

--另外最前面两个 AA到FF 代表从半透明白色到最白色
--顺序是: AA BB CC EE FF
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

url 编码解码

```lua
--编码
import "java.net.URLEncoder"
URLEncoder.encode("内容")

--解码
import "java.net.URLDecoder"
URLDecoder.decode(url)
```

键盘 Enter 键动作

```lua
imeOptions="这里填写动作代码",
--注:必须加上singleLine=true;--设置单行输入,才有效

--动作代码:
actionGo(前往)
actionDone(完成)
actionNext(下一项)
actionSearch(搜索)
actionSend(发送)
```

透明对话框

```lua
local 对话框=AlertDialog.Builder(this)
.setMessage("透明")
.setPositiveButton("确定",null)
.create()
local window = 对话框.getWindow()
local lp = window.getAttributes()
lp.alpha = 0.5
window.setAttributes(lp)
对话框.show()
```

for 显示图片

```lua
完整链接=loadbitmap(tupian)
adp.add{
  tup=完整链接,
  url=tupian,
}
```

部分布局代码

```lua
布局奠定-layout
线性布局-LinearLayout
抽屉布局-DrawerLayout
相对布局-RelativeLayout
绝对布局-AbsoluteLayout
网格布局-GridLayout
表格布局-TableLayout
水波纹布局-RippleLayout
帧布局-FrameLayout
侧滑布局-Sideslip layout
滑动窗体布局-PageLayout
滑动菜单布局-SlidingLayout
设置窗口视图-activity
```

部分控件代码

```lua
Dialog上滑对话框
定时器-Ticker
计时器-Chronometer
日期选择器-DatePicker
数值选择器-NumberPicker
下拉列表-Spinner
折叠列表-ExpandableListView
表格项-TableRow
跑马灯-MarText
滚动文本-MarText
时间文本-TextClock
自动补全文本框-AutoCompleteTextView
滑动视图-PageView
列表视图-ListView
图片控件-ImageView
图片缩放-PhotoView
圆形图片-CirclelmageView
纽扣控件-Button
文本控件-TextView
开关控件-Switch
单选按钮-RadioButton
复选按钮-ToggleButton
复选控件-CheckBox
卡片控件-CardView
搜索控件-SearchView
网格控件-GridView
视频控件-VideoView
进度条-ProgressBar
Pulling刷新-PullingLayout
评分条-RatingBar
拖动条控件-SeekBar
横向滚动-HorizontalScrollView
纵向滚动-ScrollView
编辑框控件-EditText
进度条控件-ProgressBar
浏览器控件-LuaWebView
X5浏览器控件-X5WebView
编辑代码控件-LuaEditor
```

部分属性代码

```lua
布局宽度-layout_width
布局高度-layout_height
布局外距-layout_margin
布局外顶距-layout_marginTop
布局外底距-layout_marginBottom
布局外左距-layout_marginLeft
布局外右距-layout_marginRight
布局内距-padding
布局内顶距-paddingTop
布局内左距-paddingLeft
布局内右距-paddingRight
布局内底距-paddingBottom
布局方向-Orientation
横向布局-horizontal
纵向布局-vertical
重力属性-gravity
剩余属性-layout_weight
```

各种事件

```lua
function main(...)
  --...：newActivity传递过来的参数。
  print("入口函数",...)
end

function onCreate()
  print("窗口创建")
end

function onStart()
  print("活动开始")
end

function onResume()
  print("返回程序")
end

function onPause()
  print("活动暂停")
end

function onStop()
  print("活动停止")
end

function onDestroy()
  print("程序已退出")
end

function onResult(name,...)
  --name：返回的活动名称
  --...：返回的参数
  print("返回活动",name,...)
end

function onCreateOptionsMenu(menu)
  --menu：选项菜单。
  menu.add("菜单")
end

function onOptionsItemSelected(item)
  --item：选中的菜单项
  print(item.Title)
end

function onConfigurationChanged(config)
  --config：配置信息
  print("屏幕方向关闭")
end

function onKeyDown(keycode,event)
  --keycode：键值
  --event：事件
  print("按键按下",keycode)
end

function onKeyUp(keycode,event)
  --keycode：键值
  --event：事件
  print("按键抬起",keycode)
end

function onKeyLongPress(keycode,event)
  --keycode：键值
  --event：事件
  print("按键长按",keycode)
end

function onTouchEvent(event)
  --event：事件
  print("触摸事件",event)
end

--按键与触控
function onKeyDown(code,event)
  print(code event)
end

function onTouchEvent(event)
  print(event)
end

支持onKeyDown,onKeyUp,onKeyLongPress,onTouchEvent
函数必须返布尔值
```

屏蔽网页元素

```lua
var remove=n=>{n.split(",").forEach(v=>{if(v.indexOf("@ID(")==0){document.getElementById(v.substring(4,v.length-1)).style.display="none"}else{for(let e of document.getElementsByClassName(v))e.style.display="none"}})}
remove("这里填要屏蔽的元素用,逗号隔开")
```

记住网页账号密码

```lua
﻿(function () {

   var ask = false; /*true改为false默认记住不询问*/

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
```

网址链接转化为可点击

```lua
var oHead1016 = document.getElementsByTagName('body').item(0); var oScript1016 = document.createElement("script"); oScript1016.type = "text/javascript"; oScript1016.src="https://greasyfork.org/scripts/342-text-to-link/code/Text%20To%20link.user.js"; oHead1016.appendChild( oScript1016);
```

替换或修改网页上的文字内容

```lua
window.onload = function () {
    var t = document.getElementsByTagName('title');
    if (!!t) {
        t = t[0];
        t.innerHTML = t.innerHTML.replace(/百度/g, '快播');
    }
    document.body.innerHTML = document.body.innerHTML.replace(/百度一下/g, '老司机开车');
    document.body.innerHTML = document.body.innerHTML.replace(/马化腾/g, '麻花疼');
    document.body.innerHTML = document.body.innerHTML.replace(/贴吧/g, '水吧');
}
```

返回网页顶部/底部

```lua
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

网页即将加载/夜间模式

```lua
﻿if yejian=="开启" then
  加载Js([[javascript:(function(){var styleElem=null,doc=document,ie=doc.all,fontColor=50,sel="body,body *";styleElem=createCSS(sel,setStyle(fontColor),styleElem);function setStyle(fontColor){var colorArr=[fontColor,fontColor,fontColor];return"background-color:#212121 !important;color:RGB("+colorArr.join("%,")+"%) !important;"}function createCSS(sel,decl,styleElem){var doc=document,h=doc.getElementsByTagName("head")[0],styleElem=styleElem;if(!styleElem){s=doc.createElement("style");s.setAttribute("type","text/css");styleElem=ie?doc.styleSheets[doc.styleSheets.length-1]:h.appendChild(s)}if(ie){styleElem.addRule(sel,decl)}else{styleElem.innerHTML="";styleElem.appendChild(doc.createTextNode(sel+" {"+decl+"}"))}return styleElem}})();]])
end
```

去除网页飘浮/浮动广告

```lua
var d=document;var s=d.createElement('script');s.setAttribute('src', 'https://greasyfork.org/scripts/7410-jskillad/code/jsKillAD.user.js');d.head.appendChild(s);
```

取米侠浏览器去广告规则

```lua
(function(){var host=location.href;if(host.indexOf('baidu.com')>0||host.indexOf('360doc.cn')>0||host.indexOf('sm.cn')>0||host.indexOf('uc.cn')>0||host.indexOf('info.3g.qq.com')>0||host.indexOf('melogin.cn')>0||host.indexOf('192.168.')>0||host.indexOf('m.weibo.cn')>0||host.indexOf('taobao.com')>0){return}var myArray=new Array('div','img','span','p','a','li');for(var i=0;i<6;i++){var ifr=document.getElementsByTagName(myArray[i]);if(ifr&&ifr.length>0){for(var j=0;j<ifr.length;j++){var obj=ifr[j];var ids=obj.getAttribute('id');var cls=obj.getAttribute('class');if(cls){if(obj.tagName=='A'&&cls.indexOf(' ')!=-1&&obj.getAttribute('onclick')&&obj.getAttribute('target')&&obj.href){obj.style.display='none'}}if(ids&&cls){if(ids==cls&&cls.length>10&&obj.tagName=='LI')obj.style.display='none'}if(ids){if(ids.length>30&&ids.indexOf('-')==-1){obj.style.display='none'}if((/^[0-9]*$/.test(ids))&&ids.length>1){obj.style.display='none'}if(ids.length>7&&/[0-9]/.test(ids)&&/[a-z]/i.test(ids)&&obj.getAttribute('style')){obj.style.display='none'}}if(ids&&cls){if(cls.indexOf(' ')!=-1&&cls.indexOf(ids)!=-1&&obj.getAttribute('style')){obj.style.display='none'}if(ids==cls){if(/[0-9]/.test(ids)&&/[a-z]/i.test(ids)){obj.style.display='none'}}}}}}})();
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

Fa 点击网页元素

```lua
加载Js('document.getElementsByClassName("填写元素")[0].click()')
```

Fa 网页控制 ∧ 顶距

```lua
document.body.style.marginTop='-100px'
```

Fa 加载网页写提示消息

```lua
加载网页([[javascript:alert("填写你滴内容");]])
```

Fa 加载网页写文本布局

```lua
加载网页([[javascript:document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">填写你滴内容<br>这个是换行符号<br>这个是换行符号');]])
```

Fa 禁止当前网页使用 JS

```lua
﻿webView.getSettings().setJavaScriptEnabled(false)
```

Fa 电脑模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36")
```

Fa 手机模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; Android 7.1.1; OD105 Build/NMF26F; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043409 Safari/537.36 MicroMessenger/6.5.13.1100 NetType/WIFI Language/zh_CN")
```

Fa 塞班模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba")
```

Fa 微信模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; Android 10; Redmi K20 Pro Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/44940 Mobile Safari/537.36 MMWEBID/5602 MicroMessenger/7.0.7.1500(0x27000730) Process/tools NetType/WIFI Language/zh_CN")
```

Fa 备用模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; U; Android 8.0.0; zh-CN; ONEPLUS A5000 Build/OPR6.170623.013) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.6.4.950 UWS/2.11.0.44 Mobile Safari/537.36 AlipayChannelId/5136 UCBS/2.11.0.44_180123134534 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:WIFI,ws:431|0|2.5062501,ac:sp) AliApp(AP/10.1.15.463) AlipayClient/10.1.15.463 Language/zh-Hans useStatusBar/true")
```

Fa 通用模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; U; Android 6.0; zh-CN; vivo X21 Build/HEXCNFN6003006081S) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 Quark/2.4.3.987 Mobile Safari/537.36")
```

Fa 超级模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 Dalvik/2 ( Linux; U; NEM-AL10 Build/HONORNEM-AL10;Youku;7.1.4;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Safari/537.36 (Baidu; P1 6.0) iPhone/7.1 Android/8.0 baiduboxapp/2.7.0.10")
```

Fa 默认模式 ua

```lua
webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; Android 6.0; vivo X21 Build/HEXCNFN6003006081S; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 T7/10.8 SearchCraft/2.10.1 (Baidu; P1 6.0))")
```

QQ 头像获取接口

```lua
http://blog.guaqb.cn/tool/toux/1.php?qq=填写qq号
```

QQ 头像+昵称接口

```lua
http://blog.guaqb.cn/tool/toux/api.php?qq=填写QQ号
```

Post 提交字符串

```lua
--需导入的DEX请自行将运行助手拆包，在libs文件夹里
--POST提交字符串，除注释外都是固定模板，复制粘贴即可
import 'com.kn.okhttp.*'
import 'okhttp3.*'
mediaType = MediaType.parse('text/x-markdown; charset=utf-8')
requestBody = 'I am Jdqm'--提交字符串
request = Request.Builder()
.url('https://api.github.com/markdown/raw')--请求URL
.post(RequestBody.create(mediaType,requestBody))
.build()
okHttpClient = OkHttpClient()
okHttpClient.newCall(request).enqueue(Callback{
  onFailure = function(call,e)--失败请求
    print(e)
  end,

  onResponse = function(call,response)--请求成功
    headers = response.headers()
    print(headers)--展示返回头部
    print(response.body().string())--展示返回内容
  end
})
```

Post 提交文件

```lua
--需导入的DEX请自行将运行助手拆包，在libs文件夹里
--POST提交文件，除注释外都是固定模板，复制粘贴即可
import 'com.kn.okhttp.*'
import 'okhttp3.*'
mediaType = MediaType.parse("text/x-markdown; charset=utf-8");
okHttpClient = OkHttpClient();
file = File(activity.getLuaDir()..'/init.lua');--提交的文件
request = Request.Builder()
.url("https://api.github.com/markdown/raw")--URL
.post(RequestBody.create(mediaType, file))
.build();
okHttpClient.newCall(request).enqueue(Callback {
  onFailure = function(call, e) --失败
    print(e)
  end,

  onResponse = function(call,response) --成功
    print(response.headers())
    print(response.body().string())
  end
});
```

Post 提交表单

```lua
--需导入的DEX请自行将运行助手拆包，在libs文件夹里
--POST提交表单，除注释外都是固定模板，复制粘贴即可
--该测试网址已挂，自己寻找网址测试
import 'com.kn.okhttp.*'
import 'okhttp3.*'
okHttpClient = OkHttpClient();
requestBody = FormBody.Builder()
.add("search", "Jurassic Park")--提交的表单
.build();
request = Request.Builder()
.url("https://en.wikipedia.org/w/index.php")--URL
.post(requestBody)
.build();

okHttpClient.newCall(request).enqueue(Callback {
  onFailure = function(call, e) --失败
    print(e);
  end,

  onResponse = function(call, response) --成功
    print(response.headers())
    print(response.body().string())
  end
});
```

SM.MS 上传图片

```lua
--需导入的DEX请自行将运行助手拆包，在libs文件夹里
--sm.ms上传，除注释外都是固定模板，复制粘贴即可
import 'com.kn.okhttp.*'
import 'okhttp3.*'
--调用选择图库
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
    fileSrc = cursor.getString(idx)--返回路径
    filename = fileSrc:match('.+%/(.+)')--截取名字

    requestBody = MultipartBody.Builder()
    .setType(MultipartBody.FORM)
    .addFormDataPart('smfile',filename,RequestBody.create(MediaType.parse('multipart/form-data'),File(fileSrc)))--对应表单
    .build()
    request = Request.Builder()
    .header('User-Agent','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36')
    .url('https://sm.ms/api/upload')--URL
    .post(requestBody)
    .build()
    okHttpClient = OkHttpClient()
    okHttpClient.newCall(request).enqueue(Callback{
      onFailure = function(call,e)--失败请求
        print(e)
      end,

      onResponse = function(call,response)--请求成功
        headers = response.headers()
        print(headers)--展示返回头部
        print(response.body().string())--展示返回内容
      end
    })
  end
end--nirenr
```

异步 GET 请求

```lua
--需导入的DEX请自行将运行助手拆包，在libs文件夹里
--异步GET请求，除注释外都是固定模板，复制粘贴即可
import 'com.kn.okhttp.*'
import 'okhttp3.*'
url = 'http://dh.hfybbs.vip'--请求URL
okHttpClient = OkHttpClient()
request = Request.Builder()
.url(url)
.get()
.build()
call = okHttpClient.newCall(request)
call.enqueue(Callback{
  onFailure = function(call,e)--请求失败
    print(e)
  end,

  onResponse = function(call,response)--请求成功
    print(response.body().string())
  end
})
```

关于控件常用属性

```lua
控件常用属性/设置单行输入框
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

属性动画》》

【【
ObjectAnimator(对象动画)
--属性动画概念：
所谓属性动画：
改变一切能改变的对象的属性值，不同于补间动画
只能改变 alpha，scale，rotate，translate
听着有点抽象，举例子说明。

补间动画能实现的:
1.alpha(透明)
--第一个参数为 view 对象,第二个参数为 动画改变的类型,第三,第四个参数依次是开始透明度和结束透明度。
alpha = ObjectAnimator.ofFloat(text, "alpha", 0, 1)
alpha.setDuration(2000)--设置动画时间
alpha.setInterpolator(DecelerateInterpolator())--设置动画插入器，减速
alpha.setRepeatCount(-1)--设置动画重复次数，这里-1 代表无限
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

4. rotate(旋转)
   set = AnimatorSet()
   anim = ObjectAnimator .ofFloat(phone, "rotationX", 0, 180)
   anim.setDuration(2000)
   anim2 = ObjectAnimator .ofFloat(phone, "rotationX", 180, 0)
   anim2.setDuration(2000)
   anim3 = ObjectAnimator .ofFloat(phone, "rotationY", 0, 180)
   anim3.setDuration(2000)
   anim4 = ObjectAnimator .ofFloat(phone, "rotationY", 180, 0)
   anim4.setDuration(2000)
   set.play(anim).before(anim2)--先执行 anim 动画之后在执行 anim2
   set.play(anim3).before(anim4)
   set.start()

补间动画不能实现的:
5.android 改变背景颜色的动画实现如下

translationUp = ObjectAnimator.ofInt(button,"backgroundColor",{Color.RED, Color.BLUE, Color.GRAY,Color.GREEN})
translationUp.setInterpolator(DecelerateInterpolator())
translationUp.setDuration(1500)
translationUp.setRepeatCount(-1)
translationUp.setRepeatMode(Animation.REVERSE)
translationUp.setEvaluator(ArgbEvaluator())
translationUp.start()
--[[
ArgbEvaluator：这种评估者可以用来执行类型之间的插值整数值代表 ARGB 颜色。
FloatEvaluator：这种评估者可以用来执行浮点值之间的插值。
IntEvaluator：这种评估者可以用来执行类型 int 值之间的插值。
RectEvaluator：这种评估者可以用来执行类型之间的插值矩形值。

由于本例是改变 View 的 backgroundColor 属性的背景颜色所以此处使用 ArgbEvaluator
]]
】】

《《布局动画

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

Lua 跳转页面/载入页面》》

【【--进入子页面/跳转页面
activity.newActivity("Lua 文件名",{参数,参数})

--跳转页面
activity.newActivity("mian")

--跳转界面("main")

--不需要导入
载入页面("layout")

--需要导入
import "layout"--页面名
载入页面(layout)】】

《《点击水珠动画

```lua
全屏框架=
--创建布局在这里
{
LinearLayout,--线性布局
orientation='vertical',--方向
layout_width='fill',--宽度
layout_height='fill',--高度
background='#00FFFFFF',--背景颜色或图片路径

{
CardView;--卡片控件
layout_marginTop='80%w';--顶距
layout_gravity='center';--重力
--左:left 右:right 中:center 顶:top 底:bottom
elevation='5dp';--阴影
layout_width='40%w';--宽度
layout_height='50dp';--高度
CardBackgroundColor='#ff1e8ae8';--颜色
radius='8dp';--圆角
id="gg";
{
TextView;--文本控件
gravity='center';--重力
--左:left 右:right 中:center 顶:top 底:bottom
layout_width='fill';--宽度
layout_height='fill';--高度
textColor='#ffffffff';--文字颜色
text='打电话';--显示文字
textSize='16dp';--文字大小
--textIsSelectable=true--长按复制

};
};
};
activity.setContentView(loadlayout(全屏框架))

function 水珠动画(view,time)
  import "android.animation.ObjectAnimator"
  ObjectAnimator().ofFloat(view,"scaleX",{1.2,.8,1.1,.9,1}).setDuration(time).start()
  ObjectAnimator().ofFloat(view,"scaleY",{1.2,.8,1.1,.9,1}).setDuration(time).start()
end

--调用方法
gg.onClick=function()
  水珠动画(gg,300)
end
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

颜色渐变

```lua
function 颜色渐变(控件,左色,右色)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable(GradientDrawable.Orientation.TR_BL,{左色,右色,});
控件.setBackgroundDrawable(drawable)
end
--调用方法
颜色渐变(填写控件ID,0xffffe6d1,0xFF1467DF)
```

渐变圆角

```lua
function 渐变圆角(控件,左色,右色,圆角)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable(GradientDrawable.Orientation.TR_BL,{右色,左色});
drawable.setCornerRadii({圆角,圆角,圆角,圆角,圆角,圆角,圆角,圆角});
控件.setBackgroundDrawable(drawable)
end
--调用方法
渐变圆角(填写控件ID,0xffeeeeee,0xffff0000,360)
```

三色渐变

```lua
function 三色渐变(控件,左色,中色,右色,圆角)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable(GradientDrawable.Orientation.TR_BL,{左色,中色,右色});
drawable.setCornerRadii({圆角,圆角,圆角,圆角,圆角,圆角,圆角,圆角});
控件.setBackgroundDrawable(drawable)
end
--调用方法
三色渐变(填写控件ID,0xfff349eb,0xfff9c00c,0xff00b9f1,360)
```

四层渐变

```lua
function 四层渐变(控件,颜色1,颜色2,颜色3,颜色4)
import "android.graphics.drawable.GradientDrawable"
控件.setBackgroundDrawable(GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM,{颜色1,颜色2,颜色3,颜色4,}))
end
--调用方法
四层渐变(填写控件ID,0xFFA593E0,0xff000000,0xffF17F42,0xff9055A2)
```

闪动背景

```lua
function 闪动背景(控件,频率，颜色1,颜色2,颜色3,颜色4)
import "android.animation.ObjectAnimator"
import "android.animation.ArgbEvaluator"
import "android.animation.ValueAnimator"
import "android.graphics.Color"
colorAnim = ObjectAnimator.ofInt(ID,"backgroundColor",{颜色1,颜色2,颜色3,颜色4})
colorAnim.setDuration(频率)
colorAnim.setEvaluator(ArgbEvaluator())
colorAnim.setRepeatCount(ValueAnimator.INFINITE)
colorAnim.setRepeatMode(ValueAnimator.REVERSE)
colorAnim.start()
end
--调用方法
闪动背景(填写控件ID,5000,0xffFF8080,0xff8080FF,0xff80ffff,0xff80ff80)
```

闪动字体

```lua
function 闪动字体(控件,频率,颜色1,颜色2,颜色3,颜色4)
import "android.animation.ObjectAnimator"
import "android.animation.ArgbEvaluator"
import "android.animation.ValueAnimator"
import "android.graphics.Color"
colorAnim = ObjectAnimator.ofInt(控件,"textColor",{颜色1,颜色2,颜色3,颜色4})
colorAnim.setDuration(频率)
colorAnim.setEvaluator(ArgbEvaluator())
colorAnim.setRepeatCount(ValueAnimator.INFINITE)
colorAnim.setRepeatMode(ValueAnimator.REVERSE)
colorAnim.start()
end
--调用方法
闪动字体(填写文本控件ID,5000,0xffFF8080,0xff8080FF,0xff80ffff,0xff80ff80)
```

闪波纹

```lua
function 闪波纹(控件,颜色)
import "android.graphics.drawable.ColorDrawable"
控件.setBackgroundDrawable(ColorDrawable(颜色))
task(10,function()
import "android.graphics.drawable.ColorDrawable"
控件.setBackgroundDrawable(ColorDrawable(0))
end)
end
--调用方法
闪波纹(填写控件ID,0x39000000)
```

波纹特效

```lua
function 波纹(控件,颜色)
import "android.content.res.ColorStateList"
local attrsArray={android.R.attr.selectableItemBackgroundBorderless}
local typedArray=activity.obtainStyledAttributes(attrsArray)
Pretend = activity.Resources.getDrawable(typedArray.getResourceId(0,0))
Pretend.setColor(ColorStateList(int[0].class{int{}},int{颜色}))
控件.setBackground(Pretend.setColor(ColorStateList(int[0].class{int{}},int{颜色})))
end
--调用方法
波纹(填写控件ID,0xffffffff)
```

波纹特效 v2

```lua
function 波纹特效v2(颜色)
  import"android.content.res.ColorStateList"
  return activity.Resources.getDrawable(activity.obtainStyledAttributes({android.R.attr.selectableItemBackground--[[Borderless]]}).getResourceId(0,0))
  .setColor(ColorStateList(int[0]
  .class{int{}},int{颜色 or 0x20000000}))
end
--调用方法
填写控件ID.foreground=波纹特效v2(0xffff0000)
```

圆角度控件

```lua
--圆角度控件
function CircleButton(view,InsideColor,radiu)
  import "android.graphics.drawable.GradientDrawable"
  drawable = GradientDrawable()
  drawable.setShape(GradientDrawable.RECTANGLE)
  drawable.setColor(InsideColor)
  drawable.setCornerRadii({radiu,radiu,radiu,radiu,radiu,radiu,radiu,radiu});
  view.setBackgroundDrawable(drawable)
end

--调用方法
角度=30
控件id=控件的ID
控件颜色=0xff1e8ae8
CircleButton(控件id,控件颜色,角度)
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
控件ID.BackgroundDrawable=卡片(3,0xdb00ffe6,0xffffff,35);
```

揭露动画

```lua
function 揭露动画(view,a,b,c,d,e)
translationUp = ViewAnimationUtils.createCircularReveal(view,a,b,c,d)
translationUp.setInterpolator(DecelerateInterpolator())
translationUp.setDuration(e)
translationUp.start()
end
--调用方法
task(1,function()
揭露动画(填写控件ID,0,0,0,activity.Height,2000)
end)
```

边框圆角

```lua
function 边框圆角(边宽度,边框色,背景色,圆角度)
import "android.graphics.drawable.GradientDrawable"
drawable = GradientDrawable()
drawable.setShape(GradientDrawable.RECTANGLE)
drawable.setStroke(边宽度,tonumber(边框色))
drawable.setColor(tonumber(背景色))
drawable.setCornerRadius(圆角度)
return drawable
end
--调用方法
填写控件ID.BackgroundDrawable=边框圆角(2,0xffff0000,0xffffffff,360);
```

流畅旋转动画

```lua
function 流畅旋转(控件,频率,顺时针,逆时针)
import "android.view.animation.LinearInterpolator"
c = ObjectAnimator()
c.setTarget(控件)
c.setDuration(频率)
c.setRepeatCount(ValueAnimator.INFINITE)
c.setPropertyName("rotation")
c.setFloatValues({顺时针,逆时针})
c.setRepeatMode(ValueAnimator.INFINITE)
c.setInterpolator(LinearInterpolator())
c.start()
end
--调用方法
流畅旋转(填写控件ID,90000,720,0)
```

缓冲旋转动画

```lua
function 缓冲旋转(控件,频率)
import "android.view.animation.Animation"
import "android.view.animation.RotateAnimation"
rotate = RotateAnimation(0,360,Animation.RELATIVE_TO_SELF,0.5,Animation.RELATIVE_TO_SELF,0.5)
rotate.setDuration(频率)
rotate.setRepeatCount(频率)
控件.startAnimation(rotate)
end
--调用方法
缓冲旋转(填写控件ID,5000)
```

单次旋转动画

```lua
function 单次旋转(控件,频率)
import "android.view.animation.Animation"
import "android.view.animation.RotateAnimation"
rotate = RotateAnimation(0,360,Animation.RELATIVE_TO_SELF,0.5,Animation.RELATIVE_TO_SELF,0.5)
rotate.setDuration(频率)
rotate.setRepeatCount(0.5)
控件.startAnimation(rotate)
end
--调用方法
单次旋转(填写控件ID,5000)
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

圆角度控件

```lua
--圆角度控件
function CircleButton(view,InsideColor,radiu)
  import "android.graphics.drawable.GradientDrawable"
  drawable = GradientDrawable()
  drawable.setShape(GradientDrawable.RECTANGLE)
  drawable.setColor(InsideColor)
  drawable.setCornerRadii({radiu,radiu,radiu,radiu,radiu,radiu,radiu,radiu});
  view.setBackgroundDrawable(drawable)
end

--调用方法
角度=30
控件id=控件的ID
控件颜色=0xff1e8ae8
CircleButton(控件id,控件颜色,角度)
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
控件ID.BackgroundDrawable=卡片(3,0xdb00ffe6,0xffffff,35);
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

浏览器控件 js

```lua
webView.setLuaWebEvents{
  onPageFinished=function(view,url)
    webView.evaluateJavascript([[JavaScript代码]],nil)
end}
```

隐藏顶部标题栏/隐藏标题栏

```lua
隐藏顶部标题栏①
--隐藏顶部标题栏
activity.ActionBar.hide()activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);



隐藏标题栏②
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

fas 嗅探解析

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

返回键与 menu 共存

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
    print(你点击了哈哈")
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

2D 绘图

```lua
--2D绘图
require "import"
import "android.app.*"
import "android.os.*"
import "android.widget.*"
import "android.view.*"
import "android.graphics.*"
activity.setTitle('AndroLua')

paint=Paint()
paint.setARGB(100,0,250,0)
paint.setStrokeWidth(20)
paint.setTextSize(28)

sureface = SurfaceView(activity);
callback=SurfaceHolder_Callback{
  surfaceChanged=function(holder,format,width,height)
  end,
  surfaceCreated=function(holder)
    ca=holder.lockCanvas()
    if (ca~=nil) then
      ca.drawRGB(0,79,90);
      ca.drawRect(0,0,200,300,paint)
    end
    holder.unlockCanvasAndPost(ca)
  end,
  surfaceDestroyed=function(holder)
  end
}
holder=sureface.getHolder()
holder.addCallback(callback)
activity.setContentView(sureface)
```

关于 TBSx5 内核

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

关于 QQDialog

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

设置 activity 背景颜色

```lua
】
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

使用系统 TTS 播报语音

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
        mTextSpeech.speak("你好，Fia开发手册。你好，世界！", TextToSpeech.QUEUE_FLUSH, nil);
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

获取与设置 Cookie

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

LuaWebView 设置 UA

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

》》


《《自定义Callback》》
《《
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

print(取文件名("/com/fia/top/fia.lua"))
print(取文件名无后缀("/com/fia/top/fia.lua"))
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
【
```

获取控件高度

```lua
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
```

匹配汉字

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

Toast 信息提示

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

popmenu 弹出菜单

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

Lua 数据类型

```lua
Lua是动态类型语言，变量不要类型定义,只需要为变量赋值。 值可以存储在变量中，作为参数传递或结果返回。
Lua中有8个基本类型分别为：

nil、boolean、number、string、userdata、function、thread和table。

  我们可以使用type函数测试给定变量或者值的类型：
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
以下列出了 Lua 的保留关键字。保留关键字不能作为常量或变量或其他用户自定义标示符：


and break do else elseif end false
for function if in local nil not
  or repeat return then true until while



 一般约定，以下划线开头连接一串大写字母的名字（比如 _VERSION）被保留用于 Lua 内部全局变量。
```

function 函数

```lua
函数有两个用途
1.完成指定功能，函数作为调用语句使用
2.计算并返回值，函数作为赋值语句的表达式使用


实例1:

function 读取文件(路径)
  文件内容=io.open(路径):read("*a")
  return 文件内容--return用来返回值
end

实例2:
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

for 循环/if 判断语句

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

列表单击事件》》

【【ID.setOnItemClickListener(AdapterView.OnItemClickListener{
onItemClick=function(parent, v, pos,id)
--事件
end
})
】】

《《安装 APK

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

获取 LiveView 垂直坐标

```lua
function getScrollY()
  c = ls.getChildAt(0);
  local firstVisiblePosition = ls.getFirstVisiblePosition();
  local top = c.getTop();
  return -top + firstVisiblePosition * c.getHeight() ;
end
```

申请 root

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

SO 库

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

X5 内核

```lua
{
    X5WebView;--x5浏览器内核控件
    layout_width="",
    layout_height="",
    id="",
  },



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

zip 解压

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

轻破解

```lua
对话框()
.设置消息(dump(config))
.设置积极按钮("确定")
.显示()
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

设置是否支持 JS

```lua
浏览ID.getSettings().setJavaScriptEnabled(true)--支持 --false不支持
```

加载 JS 代码

```lua
填写浏览ID.loadUrl([[javascript:dataBox('填写代码');]])
```

返回网页底部

```lua
加载Js([[javascript:document.getElementsByTagName('BODY')[0].scrollTop=document.getElementsByTagName('BODY')[0].scrollHeight;]])
```

更换转换 UA

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
内容=读取目录:match("凌晨学院：(.-)\n")
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

解压 apk 内的压缩包

```lua
zip=this.getFilesDir().toString().."/drawable/文件名称.zip"
ZipUtil.unzip(zip,"/storage/emulated/0/")
```

压缩/解压 zip

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
创建下载("直链地址")
```

调用系统播放音乐

```lua
import "android.content.Intent"
import "android.net.Uri"
intent =Intent(Intent.ACTION_VIEW)
uri = Uri.parse("file:///sdcard/Fia开发手册/填写歌名.mp3")--填写路径或直链
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

联系 QQ 号

```lua
function 联系QQ(账号)
  import "android.content.Intent"
  import "android.net.Uri"
  activity.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqwpa://im/chat?chat_type=wpa&uin="..账号)))
end
--调用方法
联系QQ(3102429466)
```

添加 QQ 群

```lua
function 加QQ群(群号)
  import "android.content.Intent"
  import "android.net.Uri"
  activity.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqapi://card/show_pslcard?src_type=internal&version=1&uin="..群号.."&card_type=group&source=qrcode")))
end
--调用方法
加QQ群(571664804)
```

查看 QQ 资料

```lua
function 查看QQ资料(账号)
  import "android.content.Intent"
  import "android.net.Uri"
  this.startActivity(Intent(Intent.ACTION_VIEW,Uri.parse("mqqapi://card/show_pslcard?uin="..账号)))
end
--调用方法
查看QQ资料(3102429466)
```

隐藏控件

```lua
填写控件ID.setVisibility(View.GONE)
```

显示控件

```lua
填写控件ID.setVisibility(View.VISIBLE)
```

运行 lua+txt

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
浏览器搜索("Fia开发手册")
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
浏览器打开("http://www.lingchenw.cn/")
```

晃动动画

```lua
function 晃动动画(控件,效果)
  if 效果=="单" then
    ObjectAnimator().ofFloat(控件,"scaleX",{1,.9,1.1,1.2,.8,1.1,.9,1}).start()
    .setDuration(600)
  elseif 效果=="双" then
    ObjectAnimator().ofFloat(控件,"scaleX",{1,.9,1.1,1.2,.8,1.1,.9,1}).start()
    ObjectAnimator().ofFloat(控件,"scaleY",{1,.9,1.1,1.2,.8,1.1,.9,1}).start()
    .setDuration(1800)
  end
end
--调用方法
晃动动画(填写控件ID,"双")--单--双
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

常规框架

```lua
webView.addView(loadlayout(layout))--常规框架
```

全屏框架

```lua
activity.setContentView(loadlayout(layout))--全屏框架
```

窗口框架

```lua
xxx=AlertDialog.Builder(this)
xxx.setView(loadlayout(layout))
--xxx.setCancelable(false)--禁用返回键
xxx=xxx.show()
import "android.graphics.drawable.ColorDrawable"--背景透明
xxx.getWindow().setBackgroundDrawable(ColorDrawable(0x00000000))
--xxx.show()--显示窗口
--xxx.dismiss()--关闭窗口
```

对话框框架

```lua
xxx=AlertDialog.Builder(this)
--xxx.setTitle("标题")--标题
--xxx.setMessage("文本内容")--消息
xxx.setView(loadlayout(layout))--框架
xxx.setPositiveButton("确定",function()--积极按钮
--执行的事件
end)
xxx.setNegativeButton("取消",nil)--消极按钮
xxx.setNeutralButton("其他",nil)--中立按钮
--xxx.setCancelable(false)--禁用返回键
xxx=xxx.show()--显示
--xxx.show()--显示窗口
--xxx.dismiss()--关闭窗口
```

显示对话框窗口

```lua
控件ID.show()--显示窗口
```

关闭对话框窗口

```lua
控件ID.dismiss()--关闭窗口
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

判断关键字》》
《《
if (网页链接:find("com")) then
--执行的事件
end》》

《《判断网络链接状态

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

网页 ua 截取

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
发送邮件("3102429466@qq.com","填写标题","填写要发送的内容")
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

发送短信

```lua
function 发送短信(号码,内容)
import "android.content.*"
import "android.net.*"
intent = Intent(Intent.ACTION_SENDTO,Uri.parse("smsto:"..号码))
intent.putExtra("sms_body",内容)
intent.setAction("android.intent.action.VIEW")
activity.startActivity(intent)
end
--调用方法
发送短信(15888888888,"今天约吗？")
```

拨打电话

```lua
function 拨打电话(号码)
import "android.content.*"
import "android.net.*"
intent=Intent(Intent.ACTION_CALL,Uri.parse("tel:"..号码))
intent.setAction("android.intent.action.VIEW")
activity.startActivity(intent)
end
--调用方法
拨打电话(10086)
```

打印消息

```lua
print("文本内容")
```

提示消息

```lua
function 提示消息(文本)
Toast.makeText(activity,文本,Toast.LENGTH_SHORT).show()
end
--调用方法
提示消息("文本内容")
```

fas 检查程序是否含有中文字符

```lua
require "import"
file=luajava.luadir
import "java.io.File"
function fileList(file)
return luajava.astable(File(tostring(file)).listFiles())
end
err={}
import "init"
function nextFile(file)
for k,v in pairs(fileList(file)) do
if File(tostring(v)).isDirectory() then
nextFile(v)
end
if not string.match(tostring(v),".*/(.-)$"):gsub("%p",""):find("^(%w*)$") then
print("文件内有中文"..v)
else
print("扫描完成，未发现中文。")
end
end
end
nextFile(file)
```
