# Fa 布局代码

线性布局

```lua
{
  LinearLayout,--线性布局
  orientation="vertical",--布局方向
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--线性布局结束
```

帧布局

```lua
{
  FrameLayout,--帧布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--帧布局结束
```

相对布局

```lua
{
  RelativeLayout,--相对布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--相对布局结束
```

绝对布局

```lua
{
  AbsoluteLayout,--绝对布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--绝对布局结束
```

表格布局

```lua
{
  TableLayout,--表格布局
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},--表格布局结束
```

纵向滑动控件

```lua
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
```

横向滑动控件

```lua
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
```

文本框控件

```lua
{
  TextView,--文本框控件
  text="文本内容",--文本内容
  textSize="15sp",--文本大小
  textColor="#333333",--文本颜色
  --singleLine=true,--禁止换行输入
},
```

纽扣控件

```lua
{
  Button,--纽扣控件
  layout_width="wrap",--布局宽度
  layout_height="wrap",--布局高度
  padding="2dp",--布局填充
  text="纽扣名称",--文本内容
},
```

图片框控件

```lua
{
  ImageView,--图片框控件
  layout_width="56dp",--布局宽度
  layout_height="25dp",--布局高度
  src="icon.png",--视图路径
},
```

圆形图片控件

```lua
{
  CircleImageView,--圆形图片控件
  layout_width="60dp",--布局宽度
  layout_height="60dp",--布局高度
  src="icon.png",--视图路径
},
```

卡片框控件

```lua
{
  CardView,--卡片框控件
  layout_width="80dp",--布局宽度
  layout_height="80dp",--布局高度
  cardElevation="2dp",--卡片提升
  cardBackgroundColor="#ffffff",--卡片背景色
  radius="10dp",--圆角半径
},--卡片框控件结束
```

编辑框控件

```lua
{
  EditText,--编辑框控件
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  hint="输入内容",--编辑框内容为空时提示
  textSize="15sp",--文本大小
  singleLine=true,--禁止换行输入
  id="edit",--控件ID
},
```

浏览器控件

```lua
{
  LuaWebView,--浏览器控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  id="llq",--控件ID
},
```

视频控件

```lua
{
  VideoView,--视频控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  id="shiping",--控件ID
},
```

水平分割线

```lua
水平分割线={
  TextView,--水平分割线
  layout_width="fill",--布局宽度
  layout_height="1px",--布局高度
  layout_gravity="center",--重力居中
  backgroundColor="#ffbebebe",--背景色
}
```

垂直分割线

```lua
垂直分割线={
  TextView,--垂直分割线
  layout_width="1px",--布局宽度
  layout_height="fill",--布局高度
  layout_gravity="center",--重力居中
  backgroundColor="#ffbebebe",--背景色
}
```

针角分割线

```lua
{
  CardView,--针角分割线
  layout_width="190%w",--布局宽度
  layout_height="1px",--布局高度
  layout_gravity="center",--重力居中
  cardBackgroundColor="#FFBEBEBE",--卡片背景色
  cardElevation="0dp",--卡片提升
  radius="200dp",--圆角半径
},
```

进度条控件

```lua
{
  ProgressBar,--进度条控件
  layout_width="60dp",--布局宽度
  layout_height="60dp",--布局高度
},
```

单选控件

```lua
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
```

复选框控件

```lua
{
  CheckBox,--复选框控件
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  text="文本内容",--文本内容
  checked=true,--是否选中
},
```

开关控件

```lua
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
```

页面视图控件

```lua
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
```

列表视图控件

```lua
{
  ListView,--列表视图控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  dividerHeight="1",--分割线高度
  verticalScrollBarEnabled=false,--隐藏滑条
},
```

网格控件

```lua
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
```

堆栈视图控件

```lua
{
  StackView,--堆栈视图控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},
```

表面视图控件

```lua
{
  SurfaceView,--表面视图控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
},
```

多级列表控件

```lua
{
  ExpandableListView,--多级列表控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  dividerHeight="0",--去掉分割线，则修改为1
  verticalScrollBarEnabled=false,--隐藏滑条
},
```

拖动条控件

```lua
{
  SeekBar,--拖动条控件
  layout_width="fill",--布局宽度
  layout_height="wrap",--布局高度
  layout_weight="1",--重力分配
  layout_gravity="center",--重力居中
},
```

查看视图控件

```lua
{
  View,--查看视图控件
  layout_width="fill",--布局宽度
  layout_height="1px",--布局高度
},
```

按钮控件

```lua
{
  ToggleButton,--按钮控件
  layout_width="40%w",--布局宽度
  layout_height="50dp",--布局高度
},
```

图片按钮控件

```lua
{
  ImageButton,--图片按钮控件
  layout_width="50dp",--布局宽度
  layout_height="50dp",--布局高度
  src="icon.png",--视图路径
},
```

Lua 编辑控件

```lua
{
  LuaEditor,--lua编辑框控件
  layout_width="fill",--布局宽度
  layout_height="fill",--布局高度
  layout_weight="1",--重力分配
  id="edit",--控件ID
},
```
