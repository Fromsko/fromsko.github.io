# Lua 设计模式

# Lua 设计模式

### 实用

#### `柯里化`

```lua
function curry(func, num_args)
  num_args = num_args or debug.getinfo(func, "u").nparams
  if num_args < 2 then return func end
  local function helper(argtrace, n)
    if n < 1 then
      return func(unpack(flatten(argtrace)))
    else
      return function (...)
        return helper({argtrace, ...}, n - select("#", ...))
      end
    end
  end
  return helper({}, num_args)
end

function flatten(t)
  local ret = {}
  for _, v in ipairs(t) do
    if type(v) == 'table' then
      for _, fv in ipairs(flatten(v)) do
        ret[#ret + 1] = fv
      end
    else
      ret[#ret + 1] = v
    end
  end
  return ret
end
```

#### 命名参数

> Lua 的函数调用 传递实参的时候允许 采用表传递

```lua
rename{old="temp.lua", new="temp1.lua"}

function rename (arg)
    return os.rename(arg.old, arg.new)
end
```

#### 迭代器设计

```lua
-- 迭代器设计
do
    function ListIter(t)
        local i = 0
        local n = #t
        return function()
            i = i + 1
            if i <= n then return t[i] end
        end
    end

    Itmes = { 1, 2, 3, 4, 5 }

    for item in ListIter(Itmes) do
        print(item)
    end
end
```

#### 元表操作

> Lua 的元表操作

**操作重载**

- **加法：**
  - 元表中 `__add` 方法可以重新定义两个表相加的行为。
  - 例如，你可以定义两个表的加法为将两个表的所有元素合并成一个新表。
  - 代码示例：
    ```lua
    local mt = { __add = function(a, b)
        local result = {}
        for k, v in pairs(a) do result[k] = v end
        for k, v in pairs(b) do result[k] = v end
        return result
    end }
    local table1 = { a = 1, b = 2 }
    local table2 = { c = 3, d = 4 }
    setmetatable(table1, mt)
    local combined_table = table1 + table2  -- 会将两个表合并
    print(combined_table.a, combined_table.b, combined_table.c, combined_table.d) -- 输出: 1  2  3  4
    ```
- **乘法：**
  - 元表中 `__mul` 方法可以重新定义表与数字相乘的行为。
  - 例如，你可以定义表与数字相乘为将表中所有元素都乘以该数字。
  - 代码示例：
    ```lua
    local mt = { __mul = function(a, b)
        local result = {}
        for k, v in pairs(a) do result[k] = v * b end
        return result
    end }
    local table1 = { a = 1, b = 2 }
    setmetatable(table1, mt)
    local multiplied_table = table1 * 2 -- 将 table1 中的元素都乘以 2
    print(multiplied_table.a, multiplied_table.b) -- 输出: 2  4
    ```
- **字符串连接：**
  - 元表中 `__concat` 方法可以重新定义表与字符串连接的行为。
  - 例如，你可以定义表与字符串连接为将表中的所有元素以字符串形式连接起来。
  - 代码示例：
    ```lua
    local mt = { __concat = function(a, b)
        local str = ""
        for k, v in pairs(a) do
            str = str .. tostring(v)
        end
        return str .. b
    end }
    local table1 = { 1, 2, 3 }
    setmetatable(table1, mt)
    print(table1 .. "Hello") -- 输出: 123Hello
    ```
- **比较：**
  - 元表中 `__lt`, `__le`, `__eq`, `__ge`, `__gt` 方法可以重新定义表的比较行为。
  - 例如，你可以定义两个表的比较基于它们的某个属性的值。
  - 代码示例：
    ```lua
    local mt = { __lt = function(a, b)
        return a.value < b.value
    end }
    local table1 = { value = 1 }
    local table2 = { value = 2 }
    setmetatable(table1, mt)
    setmetatable(table2, mt)
    print(table1 < table2) -- 输出: true
    ```

**访问控制**

- **只读：**
  - 元表中 `__newindex` 方法可以设置只读属性。
  - 将 `__newindex` 设置为 nil，任何对该表元素的赋值操作都会失败。
  - 代码示例：
    ```lua
    local mt = { __newindex = nil } -- 设置为 nil 表示只读
    local table1 = { a = 1, b = 2 }
    setmetatable(table1, mt)
    table1.a = 3 -- 赋值操作将会失败，不会修改 table1
    print(table1.a) -- 输出: 1
    ```
- **特定访问权限：**
  - 你可以将 `__newindex` 方法设置为一个函数，来控制对表的赋值操作。
  - 在函数中，你可以根据需要设置访问权限。
  - 代码示例：
    ```lua
    local mt = { __newindex = function(t, k, v)
        if k == "secret" then
            error("You don't have access to this data")
        else
            rawset(t, k, v)
        end
    end }
    local table1 = { a = 1, secret = "Hidden Value" }
    setmetatable(table1, mt)
    table1.a = 3 -- 可以修改
    table1.secret = "New Value" -- 会报错
    print(table1.secret) -- 输出: Hidden Value (因为修改失败)
    ```

**自定义索引**

- **使用字符串作为键：**
  - 元表中 `__index` 方法可以重新定义访问表元素的方式。
  - 你可以使用字符串作为键来访问表元素，而不是传统的数字索引。
  - 代码示例：
    ```lua
    local mt = { __index = function(t, k)
        if k == "name" then
            return "John Doe"
        elseif k == "age" then
            return 30
        end
    end }
    local table1 = {}
    setmetatable(table1, mt)
    print(table1.name) -- 输出: John Doe
    print(table1.age) -- 输出: 30
    ```
- **使用函数作为键：**
  - 你可以将函数作为键来访问表元素，这样可以实现更灵活的访问逻辑。
  - 在 `__index` 方法中，你可以根据函数参数来返回不同的值。
  - 代码示例：
    ```lua
    local mt = { __index = function(t, key)
        if type(key) == "function" then
            return key(t)
        else
            return rawget(t, key)
        end
    end }
    local table1 = { name = "John Doe" }
    setmetatable(table1, mt)
    local get_name = function(t)
        return t.name
    end
    print(table1[get_name]) -- 输出: John Doe
    ```

**垃圾回收控制**

- **元表中 **​ **​`__gc`​**​ ** 方法可以用来定义在表被垃圾回收时执行的操作。**
- 例如，你可以使用 `__gc` 方法来释放表所占用的资源，或进行其他必要的清理工作。
- 代码示例：
  ```lua
  local mt = { __gc = function(t)
      print("Table " .. tostring(t) .. " is being garbage collected.")
  end }
  local table1 = { a = 1, b = 2 }
  setmetatable(table1, mt)
  table1 = nil -- 将 table1 设置为 nil，以便触发垃圾回收
  -- 当 Lua 进行垃圾回收时，会执行 __gc 方法，打印信息
  ```

希望这个解释能帮助你更好地理解 Lua 中元表的应用。如果你还有其他问题，请随时提问！

---

#### 全局表载入-1

```lua
-- 创建ktool表
local ktool = {}

-- 系统功能
ktool.System = {
    GetStoragePath = function()
        return Environment.getExternalStorageDirectory().toString()
    end,
    GetScreenWidth = function()
        return activity.getWidth()
    end,
    GetScreenHeight = function()
        return activity.getHeight()
    end,
    GetPackageName = function()
        return activity.getPackageName()
    end,
    GetNowTime = function()
        return os.date("%Y-%m-%d %H:%M:%S")
    end
}

-- 文件操作
ktool.File = {
    FileExists = function(id)
        import ""
        return File(id).exists()
    end
}

-- 控件操作
ktool.View = {
    Nconceal = function(id)
        id.setVisibility(0)
    end,
    Conceal = function(id)
        id.setVisibility(8)
    end,
    RedidView = function(view, InsideColor, radiu)
        local drawable = GradientDrawable()
        drawable.setShape(GradientDrawable.RECTANGLE)
        drawable.setColor(InsideColor)
        drawable.setCornerRadii({ radiu, radiu, radiu, radiu, radiu, radiu, radiu, radiu })
        view.setBackgroundDrawable(drawable)
    end,
    RedidViewTwo = function(view, InsideColor, radiu)
        local drawable = GradientDrawable()
        drawable.setShape(GradientDrawable.RECTANGLE)
        drawable.setColor(InsideColor)
        drawable.setCornerRadii({ radiu, radiu, 0, radiu, 0, radiu, radiu, radiu })
        view.setBackgroundDrawable(drawable)
    end
}

-- 数据缓存
ktool.Cache = {
    SaveCacheData = function(filname, title, str)
        local sp = activity.getSharedPreferences(filname, Context.MODE_PRIVATE)
        local sped = sp.edit()
        sped.putString(title, str)
        sped.commit()
    end,
    GetCacheData = function(filname, title)
        local sp = activity.getSharedPreferences(filname, Context.MODE_PRIVATE)
        return sp.getString(title, "")
    end,
    UseHook = {
        read = function(key)
            return ktool.Cache.GetCacheData("tmp", key)
        end,
        save = function(key, value)
            ktool.Cache.SaveCacheData("tmp", key, value)
        end
    }
}

-- 网络操作
ktool.Network = {
    OpenWIFI = function()
        local wifi = activity.Context.getSystemService(Context.WIFI_SERVICE)
        wifi.setWifiEnabled(true)
    end,
    CloseWIFI = function()
        local wifi = activity.Context.getSystemService(Context.WIFI_SERVICE)
        wifi.setWifiEnabled(false)
    end,
    CloseNetWork = function()
        local wifi = activity.Context.getSystemService(Context.WIFI_SERVICE)
        wifi.disconnect()
    end
}

-- 页面跳转
ktool.Navigation = {
    SkipPage = function(viewPath)
        local skipPath = activity.getLuaDir()
        if not string.find(viewPath, "[.]") then
            skipPath = skipPath .. "/" .. viewPath
        else
            local parts = {}
            for part in string.gmatch(viewPath, "[^%.]+") do
                table.insert(parts, part)
            end
            local newPath = table.concat(parts, "/")
            skipPath = skipPath .. "/" .. newPath
        end
        activity.newActivity(skipPath, android.R.anim.fade_in, android.R.anim.fade_out)
    end,
    GoToPage = function(na)
        activity.newActivity(na)
    end,
    GoToMainPage = function()
        activity.newActivity("main")
    end
}

-- 注册到全局表
_G.ktool = ktool
```

#### 全局表载入-2

```lua
-- 工具模块的实现
local ktool = {
    __beforeMount = false
}
ktool.__index = ktool

-- 单例存储
local instance

function ktool:loadBaseModule()
    require "import"
    import "android.app.*"
    import "android.os.*"
    import 'android.view.*'
    -- 窗口
    import 'android.widget.*'
    import 'android.widget.LinearLayout'
    import 'android.widget.ImageView'
    import 'android.widget.Space'
    -- 动画
    import "android.animation.ObjectAnimator"
    import "android.animation.ArgbEvaluator"
    import "android.view.animation.Animation"
    import "android.view.animation.RotateAnimation"
    import "android.view.animation.AlphaAnimation"
    import "android.view.animation.TranslateAnimation"
    -- 上下文
    import "android.net.Uri"
    import 'android.content.Intent'
    import "android.content.Context"
    import "android.content.res.ColorStateList"
    -- 设计
    import 'android.graphics.*'
    import "android.graphics.RectF"
    import "android.graphics.Paint"
    import 'android.graphics.Typeface'
    import "android.graphics.drawable.Drawable"
    import 'android.graphics.drawable.ClipDrawable'
    import 'android.graphics.drawable.LayerDrawable'
    import "android.graphics.drawable.ShapeDrawable"
    import "android.graphics.drawable.ColorDrawable"
    import "android.graphics.drawable.GradientDrawable"
    import 'android.graphics.drawable.StateListDrawable'
    import "android.graphics.drawable.shapes.RoundRectShape"
    -- 文本输入
    import 'android.text.InputType'
    import "android.text.Spannable"
    import "android.text.SpannableString"
    import "android.text.style.ForegroundColorSpan"
    -- 自定义类库
    import "cjson"

    import "java.io.File"
    import "java.net.URLEncoder"
    import "android.graphics.PixelFormat"
    import "android.content.Context"
    import "android.provider.Settings"
    import "java.io.FileInputStream"
    import "android.graphics.BitmapFactory"
    import "android.graphics.drawable.BitmapDrawable"
end

-- 埋点记录函数
function ktool:trackEvent(event, data)
    local logData = {
        event = event,
        data = data or {}
    }
    print("Tracking event:", logData.event)
    for k, v in pairs(logData.data) do
        print("  ", k, ":", v)
    end
end

function ktool:onBeforeMount(func)
    self.__beforeMount = true
    ktool:trackEvent("onBeforeMount")

    local defaulter = function(...)
        import "layout"
        activity.setTitle('ktool v1.0')
        activity.setContentView(loadlayout("layout"))
    end

    if func ~= nil then
        defaulter = func()
    end

    xpcall(defaulter, function(err)
        VivoNotify("挂载前失败: " .. tostring(err))
    end)
end

-- 挂载
function ktool:onMounted(func)
    if self.__beforeMount then
        func()
        self.__beforeMount = false
        ktool:trackEvent("user mounted")
    else
        self:onBeforeMount()
        func()
        self.__beforeMount = false
        ktool:trackEvent("default mounted")
    end
    ktool:trackEvent("onMounted")
end

-- 创建单例
function ktool:new()
    if not instance then
        instance = setmetatable({}, ktool)
        instance:initModules()
        instance:loadBaseModule()
        self:trackEvent("ktool_instanceCreated")
    end
    return instance
end

-- 初始化各子模块
function ktool:initModules()
    -- 设备管理模块
    self.device = {
        GetStoragePath = function()
            return Environment.getExternalStorageDirectory().toString()
        end,
        GetScreenWidth = function()
            return activity.getWidth()
        end,
        GetScreenHeight = function()
            return activity.getHeight()
        end,
        GetPackageName = function()
            return activity.getPackageName()
        end,
        GetNowTime = function()
            return os.date("%Y-%m-%d %H:%M:%S")
        end,
        -- 设置屏幕旋转为自动旋转模式
        SetAutoRotateMode = function()
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR)
        end,
        -- 设置屏幕旋转为横屏模式
        SetLandscapeMode = function()
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE)
        end,
        -- 设置屏幕旋转为竖屏模式
        SetPortraitMode = function()
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT)
        end,
        -- 请求悬浮窗权限
        RequestOverlayPermission = function()
            local intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
            intent.setData(Uri.parse("package:" .. activity.getPackageName()))
            activity.startActivityForResult(intent, 100)
        end
    }

    -- 网络管理模块
    self.network = {
        -- 打开 WIFI
        OpenWIFI = function()
            local wifi = activity.Context.getSystemService(Context.WIFI_SERVICE)
            wifi.setWifiEnabled(true)
        end,
        -- 关闭 WIFI
        CloseWIFI = function()
            local wifi = activity.Context.getSystemService(Context.WIFI_SERVICE)
            wifi.setWifiEnabled(false)
        end,
        -- 获取 WIFI 昵称
        GetWIFISSID = function()
            return activity.Context.getSystemService(Context.WIFI_SERVICE).getConnectionInfo().getSSID()
        end,
        -- 断开 WIFI
        CloseNetWork = function()
            local wifi = activity.Context.getSystemService(Context.WIFI_SERVICE)
            wifi.disconnect()
        end
    }

    -- 文件与缓存模块
    self.fileCache = {
        -- 文件是否存在
        FileExists = function(id)
            return File(id).exists()
        end,
        -- 存入缓存数据
        SaveCacheData = function(filname, title, str)
            local sp = activity.getSharedPreferences(filname, Context.MODE_PRIVATE)
            local sped = sp.edit()
            sped.putString(title, str)
            sped.commit()
        end,
        -- 获取缓存数据
        GetCacheData = function(filname, title)
            local sp = activity.getSharedPreferences(filname, Context.MODE_PRIVATE)
            return sp.getString(title, "")
        end,
        -- 存储到系统路径 => SaveStoragePathLocal("res", "config.json")
        SaveStoragePathLocal = function(...)
            local args = { ... }
            local saveDir = GetStoragePath()
            if #args ~= 0 then
                for _, value in ipairs(args) do
                    saveDir = saveDir .. "/" .. value
                end
            end
            return saveDir
        end
    }

    -- 页面与视图控制模块
    self.pageView = {
        -- 路径跳转
        SkipPage = function(viewPath)
            local skipPath = activity.getLuaDir()
            if not string.find(viewPath, "[.]") then
                skipPath = skipPath .. "/" .. viewPath
            else
                local parts = {}
                for part in string.gmatch(viewPath, "[^%.]+") do
                    table.insert(parts, part)
                end
                local newPath = table.concat(parts, "/")
                skipPath = skipPath .. "/" .. newPath
            end
            activity.newActivity(skipPath, android.R.anim.fade_in, android.R.anim.fade_out)
        end,
        -- 重载页面
        ResetPage = function()
            activity.recreate()
        end,
        -- 导入主页面
        LoadIndexPage = function(view)
            activity.setContentView(loadlayout(view))
        end,
        -- 显示控件
        Nconceal = function(id)
            id.setVisibility(0)
        end,
        -- 隐藏控件
        Conceal = function(id)
            id.setVisibility(8)
        end,
        -- 删除控件
        RemoveView = function(a, b)
            return (a).removeView(b)
        end,
        -- 布局内插入布局
        LayAddView = function(view, lay)
            view.addView(loadlayout(lay))
        end,
        -- 使弹出的输入法不影响布局
        LayoutNotAffect = function()
            activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)
        end,
        -- 控件圆角
        RadiuView = function(view, InsideColor, radiu)
            local drawable = GradientDrawable()
            drawable.setShape(GradientDrawable.RECTANGLE)
            drawable.setColor(InsideColor)
            drawable.setCornerRadii({ radiu, radiu, radiu, radiu, radiu, radiu, radiu, radiu });
            view.setBackgroundDrawable(drawable)
        end,
        -- 控件圆角 2
        RadiuViewTwo = function(view, InsideColor, radiu)
            local drawable = GradientDrawable()
            drawable.setShape(GradientDrawable.RECTANGLE)
            drawable.setColor(InsideColor)
            drawable.setCornerRadii({ radiu, radiu, 0, radiu, 0, radiu, radiu, radiu });
            view.setBackgroundDrawable(drawable)
        end
    }

    -- 剪贴板模块
    self.clipboard = {
        GetClipboard = function()
            return activity.getSystemService(Context.CLIPBOARD_SERVICE).getText()
        end,
        InputClipboard = function(text)
            activity.getSystemService(Context.CLIPBOARD_SERVICE).setText(text)
        end
    }

    -- 应用管理模块
    self.appManager = {
        -- 打开应用程序
        OpenApp = function(packageName)
            local manager = activity.getPackageManager()
            local open = manager.getLaunchIntentForPackage(packageName)
            activity.startActivity(open)
        end,
        -- 安装程序
        InstallApp = function(packageName)
            local intent = Intent(Intent.ACTION_VIEW)
            intent.setDataAndType(Uri.parse("file://" .. packageName), "application/vnd.android.package-archive")
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            activity.startActivity(intent)
        end,
        -- 卸载应用
        RemoveApp = function(packageName)
            local uri = Uri.parse("package:" .. packageName)
            local intent = Intent(Intent.ACTION_DELETE, uri)
            activity.startActivity(intent)
        end
    }

    -- 其他模块
    self.other = {
        -- 联系QQ
        FollowQQ = function(qqNumber)
            local url = "mqqwpa://im/chat?chat_type=wpa&uin=" .. qqNumber
            activity.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        end,
        -- 加群
        FollowGroup = function(groupNumber)
            local url = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" .. groupNumber ..
                "&card_type=group&source=qrcode"
            activity.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
        end,
        -- 像素转换
        DpToPx = function(dpValue)
            local scale = activity.getResources().getDisplayMetrics().scaledDensity
            return dpValue * scale + 0.5
        end,
        -- 函数将字符串转换为Unicode编码
        StringToUnicode = function(str)
            return URLEncoder.encode(str, "UTF-8")
        end,
        CreateEditTextStyle = function()
            local shape = GradientDrawable()
            shape.setShape(GradientDrawable.RECTANGLE)
            shape.setColor(0xffffffff)

            local focusedShape = GradientDrawable()
            focusedShape.setShape(GradientDrawable.RECTANGLE)
            focusedShape.setColor(0xffffffff)
            focusedShape.setStroke(2, 0xff000000)

            local states = StateListDrawable()
            states.addState({ android.R.attr.state_focused }, focusedShape)
            states.addState({}, shape)

            return states
        end,
        -- 获取图片BitmapDrawable
        GetImageDrawable = function(img_path)
            -- 打开文件输入流 读取图像文件
            local image_stream = FileInputStream(img_path)
            -- 使用BitmapFactory解码图像流 生成Bitmap对象
            local bitmap = BitmapFactory.decodeStream(image_stream)
            -- 使用Bitmap对象创建一个BitmapDrawable对象并返回
            return BitmapDrawable(activity.getResources(), bitmap)
        end
    }
end

-- 设置元表，使得 ktool['module'] 可以直接访问
setmetatable(ktool, {
    __index = function(_, key)
        return ktool:new()[key]
    end
})


-- 悬浮窗
ShowXFC = function(flag)
    flag.count = 1
    wmManager = activity.getSystemService(Context.WINDOW_SERVICE)           --获取窗口管理器
    HasFocus = false                                                        --是否有焦点
    wmParams = WindowManager.LayoutParams()                                 --对象
    if tonumber(Build.VERSION.SDK) >= 26 then
        wmParams.type = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY --安卓8以上悬浮窗打开方式
    else
        wmParams.type = WindowManager.LayoutParams.TYPE_SYSTEM_ALERT        --安卓8以下的悬浮窗打开方式
    end
    wmParams.format = PixelFormat.RGBA_8888                                 --设置背景
    wmParams.flags = WindowManager.LayoutParams().FLAG_NOT_FOCUSABLE        --焦点设置

    wmParams.gravity = Gravity.LEFT| Gravity.TOP                            --重力设置
    wmParams.x = activity.getWidth() / 6
    wmParams.y = activity.getHeight() / 5
    wmParams.width = WindowManager.LayoutParams.WRAP_CONTENT
    wmParams.height = WindowManager.LayoutParams.WRAP_CONTENT

    if Build.VERSION.SDK_INT >= Build.VERSION_CODES.M and ! Settings.canDrawOverlays(this) then
        UpNotify("请授予悬浮窗权限^_^")
        local intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
        intent.setData(Uri.parse("package:" .. activity.getPackageName()));
        activity.startActivityForResult(intent, 100)
        os.exit()
    else
        xfc = loadlayout({
            LinearLayout,
            layout_width = "fill",
            layout_height = "fill",
            {
                CircleImageView,
                src = activity.getLuaDir() .. "/LuaLogo.png",
                layout_width = "50dp",
                layout_height = "50dp",
                id = "Logo",
            },
        })
        cfc = loadlayout({
            LinearLayout,
            orientation = "vertical",
            layout_height = "fill",
            layout_width = "fill",
            id = "Windows",
            {
                CardView,
                layout_gravity = "center",
                layout_width = "230dp",
                layout_height = "170dp",
                backgroundColor = '0xfff0fcff', --背景颜色
                alpha = 0.85,                   --控件透明度
                {
                    FrameLayout,
                    layout_marginTop = "45dp",
                    layout_height = "fill",
                    layout_width = "fill",
                    {
                        TextView,
                        id = "xcfText",
                        textSize = "14sp",
                        layout_gravity = "center",
                    },
                },
                {
                    FrameLayout,
                    layout_height = "40dp",
                    layout_width = "fill",
                    {
                        AbsoluteLayout,
                        layout_gravity = "right",
                        layout_height = "40dp",
                        layout_width = "40dp",
                        {
                            Button,
                            text = "X",
                            id = "Close",
                        },
                    },
                    {
                        AbsoluteLayout,
                        layout_gravity = "center",
                        layout_height = "40dp",
                        layout_width = "80dp",
                        {
                            TextView,
                            text = "电力小助手",
                            gravity = "center",
                            layout_width = "fill",
                            layout_height = "fill",
                        },
                    },
                    {
                        AbsoluteLayout,
                        layout_gravity = "left",
                        layout_height = "40dp",
                        layout_width = "40dp",
                        {
                            Button,
                            text = "—",
                            id = "Min",
                            alpha = 0.7, --控件透明度
                        },
                    },
                },
            },
        }) --cfc
    end

    wmManager.addView(xfc, wmParams)

    function 放大()
        --放大cfc代码
        wmManager.addView(cfc, wmParams)
        wmManager.removeView(xfc)
    end

    function Close.onClick()
        --退出cfc代码
        wmManager.removeView(cfc)
        flag.count = 0
    end

    function Min.onClick()
        --隐藏cfc代码
        wmManager.removeView(cfc)
        wmManager.addView(xfc, wmParams)
    end

    function Logo.OnTouchListener(v, event)
        --这个图标移动代码
        if event.getAction() == MotionEvent.ACTION_DOWN then
            firstX = event.getRawX()
            firstY = event.getRawY()
            wmX = wmParams.x
            wmY = wmParams.y
        elseif event.getAction() == MotionEvent.ACTION_MOVE then
            wmParams.x = wmX + (event.getRawX() - firstX)
            wmParams.y = wmY + (event.getRawY() - firstY)
            wmManager.updateViewLayout(xfc, wmParams)
        elseif event.getAction() == MotionEvent.ACTION_UP then
        end
        return false
    end

    function Logo.onLongClick()
        UpNotify("QQ:1614355756")
    end

    function Logo.onClick()
        放大()
    end

    function Windows.OnTouchListener(v, event) --这个图标移动代码
        if event.getAction() == MotionEvent.ACTION_DOWN then
            firstX = event.getRawX()
            firstY = event.getRawY()
            wmX = wmParams.x
            wmY = wmParams.y
        elseif event.getAction() == MotionEvent.ACTION_MOVE then
            wmParams.x = wmX + (event.getRawX() - firstX)
            wmParams.y = wmY + (event.getRawY() - firstY)
            wmManager.updateViewLayout(cfc, wmParams)
        elseif event.getAction() == MotionEvent.ACTION_UP then
        end
        return false
    end

    function CircleButton(view, InsideColor, radiu)
        import "android.graphics.drawable.GradientDrawable"
        local drawable = GradientDrawable()
        drawable.setShape(GradientDrawable.RECTANGLE)
        drawable.setColor(InsideColor)
        drawable.setCornerRadii({ radiu, radiu, radiu, radiu, radiu, radiu, radiu, radiu });
        view.setBackgroundDrawable(drawable)
    end

    -- CircleButton(Windows, 0xffff461f, 45)
    CircleButton(Close, 0xffff461f, 70)
    CircleButton(Min, 0xff50616d, 20)

    xcfText.setText("暂时未获取到数据^_^")
end

_G.ktool = ktool
_G.ShowXFC = ShowXFC
```
