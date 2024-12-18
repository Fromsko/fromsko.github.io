---
title: imgui 各类组件库
createTime: 2024/09/08 23:23:52
permalink: /article/ule0v0n3/
---
# imgui 各类组件库

## 环境搭建

> opengl 3 默认启动

```cpp
// Dear ImGui: standalone example application for Win32 + OpenGL 3
#include "imgui.h"
#include "imgui_impl_opengl3.h"
#include "imgui_impl_win32.h"
#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#include <windows.h>
#include <GL/GL.h>
#include <tchar.h>

// Data stored per platform window
struct WGL_WindowData { HDC hDC; };

// Data
static HGLRC            g_hRC;
static WGL_WindowData   g_MainWindow;
static int              g_Width;
static int              g_Height;

// Forward declarations of helper functions
bool CreateDeviceWGL(HWND hWnd, WGL_WindowData* data);
void CleanupDeviceWGL(HWND hWnd, WGL_WindowData* data);
void ResetDeviceWGL();
LRESULT WINAPI WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam);

// Main code
int main(int, char**)
{
    // Create application window
    //ImGui_ImplWin32_EnableDpiAwareness();
    WNDCLASSEXW wc = { sizeof(wc), CS_OWNDC, WndProc, 0L, 0L, GetModuleHandle(nullptr), nullptr, nullptr, nullptr, nullptr, L"ImGui Example", nullptr };
    ::RegisterClassExW(&wc);
    HWND hwnd = ::CreateWindowW(wc.lpszClassName, L"Dear ImGui Win32+OpenGL3 Example", WS_OVERLAPPEDWINDOW, 100, 100, 1280, 800, nullptr, nullptr, wc.hInstance, nullptr);

    // Initialize OpenGL
    if (!CreateDeviceWGL(hwnd, &g_MainWindow))
    {
        CleanupDeviceWGL(hwnd, &g_MainWindow);
        ::DestroyWindow(hwnd);
        ::UnregisterClassW(wc.lpszClassName, wc.hInstance);
        return 1;
    }
    wglMakeCurrent(g_MainWindow.hDC, g_hRC);

    // Show the window
    ::ShowWindow(hwnd, SW_SHOWDEFAULT);
    ::UpdateWindow(hwnd);

    // Setup Dear ImGui context
    IMGUI_CHECKVERSION();
    ImGui::CreateContext();
    ImGuiIO& io = ImGui::GetIO(); (void)io;
    io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;   // Enable Keyboard Controls
    io.ConfigFlags |= ImGuiConfigFlags_NavEnableGamepad;    // Enable Gamepad Controls

    // Setup Dear ImGui style
    ImGui::StyleColorsDark();
    //ImGui::StyleColorsClassic();

    // Setup Platform/Renderer backends
    ImGui_ImplWin32_InitForOpenGL(hwnd);
    ImGui_ImplOpenGL3_Init();

    //io.Fonts->AddFontDefault();
    io.Fonts->AddFontFromFileTTF("c:\\Windows\\Fonts\\Deng.ttf", 18.0f);
    io.Fonts->GetGlyphRangesChineseFull();
    //io.Fonts->AddFontFromFileTTF("../../misc/fonts/DroidSans.ttf", 16.0f);
    //io.Fonts->AddFontFromFileTTF("../../misc/fonts/Roboto-Medium.ttf", 16.0f);
    //io.Fonts->AddFontFromFileTTF("../../misc/fonts/Cousine-Regular.ttf", 15.0f);
    //ImFont* font = io.Fonts->AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0f, nullptr, io.Fonts->GetGlyphRangesJapanese());
    //IM_ASSERT(font != nullptr); 

    // Our state
    bool show_demo_window = true;
    bool show_another_window = false;
    ImVec4 clear_color = ImVec4(0.45f, 0.55f, 0.60f, 1.00f);

    // Main loop
    bool done = false;
    while (!done)
    {
        // Poll and handle messages (inputs, window resize, etc.)
        // See the WndProc() function below for our to dispatch events to the Win32 backend.
        MSG msg;
        while (::PeekMessage(&msg, nullptr, 0U, 0U, PM_REMOVE))
        {
            ::TranslateMessage(&msg);
            ::DispatchMessage(&msg);
            if (msg.message == WM_QUIT)
                done = true;
        }
        if (done)
            break;
        if (::IsIconic(hwnd))
        {
            ::Sleep(10);
            continue;
        }

        // Start the Dear ImGui frame
        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplWin32_NewFrame();
        ImGui::NewFrame();

        // 1. Show the big demo window (Most of the sample code is in ImGui::ShowDemoWindow()! You can browse its code to learn more about Dear ImGui!).
        if (show_demo_window)
            ImGui::ShowDemoWindow(&show_demo_window);

        // 2. Show a simple window that we create ourselves. We use a Begin/End pair to create a named window.
        {
            static float f = 0.0f;
            static int counter = 0;

            ImGui::Begin("Hello, world!");                          // Create a window called "Hello, world!" and append into it.

            ImGui::Text("This is some useful text.");               // Display some text (you can use a format strings too)
            ImGui::Checkbox("Demo Window", &show_demo_window);      // Edit bools storing our window open/close state
            ImGui::Checkbox("Another Window", &show_another_window);

            ImGui::SliderFloat("float", &f, 0.0f, 1.0f);            // Edit 1 float using a slider from 0.0f to 1.0f
            ImGui::ColorEdit3("clear color", (float*)&clear_color); // Edit 3 floats representing a color

            if (ImGui::Button("Button"))                            // Buttons return true when clicked (most widgets return true when edited/activated)
                counter++;
            ImGui::SameLine();
            ImGui::Text("counter = %d", counter);

            ImGui::Text("Application average %.3f ms/frame (%.1f FPS)", 1000.0f / io.Framerate, io.Framerate);
            ImGui::End();
        }

        // 3. Show another simple window.
        if (show_another_window)
        {
            ImGui::Begin("Another Window", &show_another_window);   // Pass a pointer to our bool variable (the window will have a closing button that will clear the bool when clicked)
            ImGui::Text("Hello from another window!");
            if (ImGui::Button("Close Me"))
                show_another_window = false;
            ImGui::End();
        }

        // Rendering
        ImGui::Render();
        glViewport(0, 0, g_Width, g_Height);
        glClearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
        glClear(GL_COLOR_BUFFER_BIT);
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());

        // Present
        ::SwapBuffers(g_MainWindow.hDC);
    }

    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplWin32_Shutdown();
    ImGui::DestroyContext();

    CleanupDeviceWGL(hwnd, &g_MainWindow);
    wglDeleteContext(g_hRC);
    ::DestroyWindow(hwnd);
    ::UnregisterClassW(wc.lpszClassName, wc.hInstance);

    return 0;
}

// Helper functions
bool CreateDeviceWGL(HWND hWnd, WGL_WindowData* data)
{
    HDC hDc = ::GetDC(hWnd);
    PIXELFORMATDESCRIPTOR pfd = { 0 };
    pfd.nSize = sizeof(pfd);
    pfd.nVersion = 1;
    pfd.dwFlags = PFD_DRAW_TO_WINDOW | PFD_SUPPORT_OPENGL | PFD_DOUBLEBUFFER;
    pfd.iPixelType = PFD_TYPE_RGBA;
    pfd.cColorBits = 32;

    const int pf = ::ChoosePixelFormat(hDc, &pfd);
    if (pf == 0)
        return false;
    if (::SetPixelFormat(hDc, pf, &pfd) == FALSE)
        return false;
    ::ReleaseDC(hWnd, hDc);

    data->hDC = ::GetDC(hWnd);
    if (!g_hRC)
        g_hRC = wglCreateContext(data->hDC);
    return true;
}

void CleanupDeviceWGL(HWND hWnd, WGL_WindowData* data)
{
    wglMakeCurrent(nullptr, nullptr);
    ::ReleaseDC(hWnd, data->hDC);
}

// Forward declare message handler from imgui_impl_win32.cpp
extern IMGUI_IMPL_API LRESULT ImGui_ImplWin32_WndProcHandler(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam);

// Win32 message handler
// You can read the io.WantCaptureMouse, io.WantCaptureKeyboard flags to tell if dear imgui wants to use your inputs.
// - When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application, or clear/overwrite your copy of the mouse data.
// - When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application, or clear/overwrite your copy of the keyboard data.
// Generally you may always pass all inputs to dear imgui, and hide them from your application based on those two flags.
LRESULT WINAPI WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    if (ImGui_ImplWin32_WndProcHandler(hWnd, msg, wParam, lParam))
        return true;

    switch (msg)
    {
    case WM_SIZE:
        if (wParam != SIZE_MINIMIZED)
        {
            g_Width = LOWORD(lParam);
            g_Height = HIWORD(lParam);
        }
        return 0;
    case WM_SYSCOMMAND:
        if ((wParam & 0xfff0) == SC_KEYMENU) // Disable ALT application menu
            return 0;
        break;
    case WM_DESTROY:
        ::PostQuitMessage(0);
        return 0;
    }
    return ::DefWindowProcW(hWnd, msg, wParam, lParam);
}
```

---

## 实用代码

> 一些有一定参考价值的代码

### 面板菜单栏（1）

> 硬编码实现

```cpp
#include "../include/imgui/imgui.h"
#include "../include/imgui/imgui_internal.h"

// 定义面板状态
enum PanelState
{
    None,
    Authorization,
    Data,
    Customization,
    Features
};

// 定义主题数量
const int THEME_COUNT = 2;
const char *themes[THEME_COUNT] = {"Theme 1", "Theme 2"};

// 全局变量
int curButton = 0;
int curTheme = 0;
char buf[128] = "";
bool opened = true;

// 显示授权窗口
void ShowAuthorizationWindow()
{
    ImGui::BeginChild("AuthorizationWindow", ImVec2(440, 350), false); // 添加边框和背景
    ImGui::SetCursorPos(ImVec2(150, 16));
    ImGui::Text("   Authorization");
    ImGui::SetCursorPos(ImVec2(150, 38));
    ImGui::Text("  Enter your key");
    ImGui::SetCursorPos(ImVec2(19, 60));
    ImGui::InputText("###Key", buf, IM_ARRAYSIZE(buf));
    ImGui::SetCursorPos(ImVec2(125, 95));
    if (ImGui::Button("Sign in", ImVec2(165, 40)))
    {
        // 处理登录逻辑
    }
    ImGui::SetCursorPos(ImVec2(120, 200));
    ImGui::Text("   Subscribe Expire Day");
    ImGui::EndChild();
}

// 显示数据窗口
void ShowDataWindow()
{
    ImGui::BeginChild("DataWindow", ImVec2(440, 388), true); // 添加边框和背景
    ImGui::SetCursorPos(ImVec2(148, 10));
    ImGui::Text("   Welcome User.");
    ImGui::SetCursorPos(ImVec2(150, 28));
    ImGui::Text("     DashBoard:");
    ImGui::GetWindowDrawList()->AddRectFilled(ImVec2(200, 90), ImVec2(518, 206), IM_COL32(255, 0, 0, 40));
    ImGui::SetCursorPos(ImVec2(0, 60));
    ImGui::Text("                    -          Added 1tick doubletap.");
    ImGui::Text("                    -          Added Neverlose resolver.");
    ImGui::Text("                    -          Added Nemesis fakelag.");
    ImGui::Text("                    -          Added gamesense api.");
    ImGui::SetCursorPos(ImVec2(0, 180));
    ImGui::Text("    Cheat: Simplicity External / Game: CS:GO / Version: 1.0");
    ImGui::EndChild();
}

// 显示自定义窗口
void ShowCustomizationWindow()
{
    ImGui::BeginChild("CustomizableWindow", ImVec2(440, 388), true); // 添加边框和背景
    ImGui::SetCursorPos(ImVec2(120, 16));
    ImGui::Text("    Menu Customization");
    ImGui::SetCursorPos(ImVec2(16, 38));
    ImGui::Combo("Menu Theme", &curTheme, themes, THEME_COUNT);
    ImGui::EndChild();
}

// 显示功能窗口
void ShowFeaturesWindow()
{
    ImGui::BeginChild("FeaturesWindow", ImVec2(440, 388), true); // 添加边框和背景
    ImGui::Text("   Features content goes here.");
    ImGui::EndChild();
}

// 显示主窗口
void ShowMainWindow()
{
    ImGui::SetNextWindowSize(ImVec2(450, 350), ImGuiCond_FirstUseEver);
    ImGui::Begin("Simplicity.cc Loader", &opened, ImGuiWindowFlags_NoResize | ImGuiWindowFlags_NoCollapse);

    // TODO: 左侧按钮
    ImGui::BeginChild("TabsBar", ImVec2(150, 350), true); // 添加边框和背景
    if (ImGui::Button("Authorization", ImVec2(130, 42)))
        curButton = 1;
    if (ImGui::Button("Data", ImVec2(130, 42)))
        curButton = 4;
    if (ImGui::Button("Customization", ImVec2(130, 42)))
        curButton = 2;
    if (ImGui::Button("Features", ImVec2(130, 42)))
        curButton = 3;
    ImGui::EndChild();

    // TODO: 右侧内容
    ImGui::SameLine();                                        // 使右侧内容与左侧按钮在同一行
    ImGui::BeginChild("ContentArea", ImVec2(450, 350), true); // 添加边框和背景

    // 自定义背景
    ImGui::GetWindowDrawList()->AddRectFilled(ImGui::GetWindowPos(), ImVec2(ImGui::GetWindowPos().x + 440, ImGui::GetWindowPos().y + 450), IM_COL32(24, 24, 26, 255));

    switch (curButton)
    {
    case 1:
        ShowAuthorizationWindow();
        break;
    case 4:
        ShowDataWindow();
        break;
    case 2:
        ShowCustomizationWindow();
        break;
    case 3:
        ShowFeaturesWindow();
        break;
    default:
        break;
    }

    ImGui::EndChild();
    ImGui::End();
}
```

---

### 面板菜单栏(2)-配置化

> 第二阶段

```cpp
#include "../include/imgui/imgui.h"
#include "../include/imgui/imgui_internal.h"

// 定义面板状态
enum PanelState
{
    None,
    Authorization,
    Data,
    Customization,
    Features
};

// 定义主题数量
const int THEME_COUNT = 2;
const char *themes[THEME_COUNT] = {"Theme 1", "Theme 2"};

// 全局变量
int curButton = 0;
int curTheme = 0;
char buf[128] = "";
bool opened = true;

// 边框配置结构体
struct BorderConfig {
    bool show = false;          // 是否显示边框
    float radius = 0.0f;       // 圆角半径
    ImU32 color = IM_COL32(255, 255, 255, 255); // 边框颜色
};

// 窗口配置结构体
struct WindowConfig {
    ImVec2 mainWindowSize = ImVec2(600, 450);     // 主窗口大小
    ImVec2 tabsSize = ImVec2(150, 450);            // 标签栏大小
    ImVec2 contentSize = ImVec2(450, 450);         // 右侧内容区域大小
    BorderConfig mainBorder;                         // 主窗口边框配置
    BorderConfig tabsBorder;                         // 标签栏边框配置
    BorderConfig contentBorder;                      // 内容区域边框配置
};

// 全局配置
WindowConfig config;

// 绘制带圆角的边框
void DrawRoundedBorder(const ImVec2& pos, const ImVec2& size, float radius, ImU32 color)
{
    ImGui::GetWindowDrawList()->AddRect(pos, ImVec2(pos.x + size.x, pos.y + size.y), color, radius);
}

// 显示授权窗口
void ShowAuthorizationWindow()
{
    ImGui::BeginChild("AuthorizationWindow", ImVec2(440, 350), config.contentBorder.show); // 添加边框和背景
    ImGui::SetCursorPos(ImVec2(150, 16));
    ImGui::Text("   Authorization");
    ImGui::SetCursorPos(ImVec2(150, 38));
    ImGui::Text("  Enter your key");
    ImGui::SetCursorPos(ImVec2(19, 60));
    ImGui::InputText("###Key", buf, IM_ARRAYSIZE(buf));
    ImGui::SetCursorPos(ImVec2(125, 95));
    if (ImGui::Button("Sign in", ImVec2(165, 40)))
    {
        // 处理登录逻辑
    }
    ImGui::SetCursorPos(ImVec2(120, 200));
    ImGui::Text("   Subscribe Expire Day");
    ImGui::EndChild();
}

// 显示数据窗口
void ShowDataWindow()
{
    ImGui::BeginChild("DataWindow", ImVec2(440, 388), config.contentBorder.show); // 添加边框和背景
    ImGui::SetCursorPos(ImVec2(148, 10));
    ImGui::Text("   Welcome User.");
    ImGui::SetCursorPos(ImVec2(150, 28));
    ImGui::Text("     DashBoard:");
    ImGui::GetWindowDrawList()->AddRectFilled(ImVec2(200, 90), ImVec2(518, 206), IM_COL32(255, 0, 0, 40));
    ImGui::SetCursorPos(ImVec2(0, 60));
    ImGui::Text("                    -          Added 1tick doubletap.");
    ImGui::Text("                    -          Added Neverlose resolver.");
    ImGui::Text("                    -          Added Nemesis fakelag.");
    ImGui::Text("                    -          Added gamesense api.");
    ImGui::SetCursorPos(ImVec2(0, 180));
    ImGui::Text("    Cheat: Simplicity External / Game: CS:GO / Version: 1.0");
    ImGui::EndChild();
}

// 显示自定义窗口
void ShowCustomizationWindow()
{
    ImGui::BeginChild("CustomizableWindow", ImVec2(440, 388), config.contentBorder.show); // 添加边框和背景
    ImGui::SetCursorPos(ImVec2(120, 16));
    ImGui::Text("    Menu Customization");
    ImGui::SetCursorPos(ImVec2(16, 38));
    ImGui::Combo("Menu Theme", &curTheme, themes, THEME_COUNT);
    ImGui::EndChild();
}

// 显示功能窗口
void ShowFeaturesWindow()
{
    ImGui::BeginChild("FeaturesWindow", ImVec2(440, 388), config.contentBorder.show); // 添加边框和背景
    ImGui::Text("   Features content goes here.");
    ImGui::EndChild();
}

// 显示主窗口
void ShowMainWindow()
{
    ImGui::SetNextWindowSize(config.mainWindowSize, ImGuiCond_FirstUseEver);
    ImGui::Begin("Simplicity.cc Loader", &opened, ImGuiWindowFlags_NoResize | ImGuiWindowFlags_NoCollapse);

    // 绘制主窗口边框
    if (config.mainBorder.show)
        DrawRoundedBorder(ImGui::GetWindowPos(), config.mainWindowSize, config.mainBorder.radius, config.mainBorder.color);

    // 左侧按钮
    ImGui::BeginChild("TabsBar", config.tabsSize, config.tabsBorder.show); // 添加边框和背景
    // 绘制标签栏边框
    if (config.tabsBorder.show)
        DrawRoundedBorder(ImGui::GetCursorScreenPos(), config.tabsSize, config.tabsBorder.radius, config.tabsBorder.color);

    if (ImGui::Button("Authorization", ImVec2(130, 42))) curButton = 1;
    if (ImGui::Button("Data", ImVec2(130, 42))) curButton = 4;
    if (ImGui::Button("Customization", ImVec2(130, 42))) curButton = 2;
    if (ImGui::Button("Features", ImVec2(130, 42))) curButton = 3;
    ImGui::EndChild();

    ImGui::SameLine(); // 使右侧内容与左侧按钮在同一行
    ImGui::BeginChild("ContentArea", config.contentSize, config.contentBorder.show); // 添加边框和背景

    // 绘制内容区域边框
    if (config.contentBorder.show)
        DrawRoundedBorder(ImGui::GetCursorScreenPos(), config.contentSize, config.contentBorder.radius, config.contentBorder.color);

    // 自定义背景
    ImGui::GetWindowDrawList()->AddRectFilled(ImGui::GetWindowPos(), 
        ImVec2(ImGui::GetWindowPos().x + config.contentSize.x, ImGui::GetWindowPos().y + config.contentSize.y), 
        IM_COL32(24, 24, 26, 255));

    switch (curButton)
    {
    case 1:
        ShowAuthorizationWindow();
        break;
    case 4:
        ShowDataWindow();
        break;
    case 2:
        ShowCustomizationWindow();
        break;
    case 3:
        ShowFeaturesWindow();
        break;
    default:
        break;
    }

    ImGui::EndChild();
    ImGui::End();
}
```

---

### 面板(3)

> 增加圆角和边框细致控制

```cpp
#include <iostream>
#include <cstdlib>
#include "../include/imgui/imgui.h"
#include "../include/imgui/imgui_internal.h"

// 定义面板状态
enum PanelState
{
    None,
    Authorization,
    Data,
    Customization,
    Features
};

// 定义主题数量
const int THEME_COUNT = 2;
const char *themes[THEME_COUNT] = {"Theme 1", "Theme 2"};

// 全局变量
int curButton = 0;
int curTheme = 0;
char buf[128] = "";
bool opened = true;

// 边框配置结构体
struct BorderConfig
{
    bool show = true;                           // 是否显示边框
    float radius = 5.0f;                        // 圆角半径
    ImU32 color = IM_COL32(255, 255, 255, 255); // 边框颜色

    // 默认构造函数
    BorderConfig(bool show = true, float radius = 5.0f, ImU32 color = IM_COL32(255, 255, 255, 255))
        : show(show), radius(radius), color(color) {}
};

// 窗口配置结构体
struct WindowConfig
{
    ImVec2 mainWindowSize = ImVec2(600, 450); // 主窗口大小
    ImVec2 tabsSize = ImVec2(150, 400);       // 标签栏大小
    ImVec2 contentSize = ImVec2(420, 400);    // 调整内容区域大小，减少50像素

    // 直接指定默认值
    BorderConfig mainBorder = {false, 5.0f, IM_COL32(255, 0, 0, 255)};    // 主窗口边框配置
    BorderConfig tabsBorder = {true, 5.0f};                               // 标签栏边框配置
    BorderConfig contentBorder = {false, 5.0f, IM_COL32(0, 0, 255, 255)}; // 内容区域边框配置

    // 默认构造函数
    WindowConfig() {}
};

// 全局配置
WindowConfig config;

// 绘制带圆角的边框
void DrawRoundedBorder(const ImVec2 &pos, const ImVec2 &size, float radius, ImU32 color)
{
    ImGui::GetWindowDrawList()->AddRect(pos, ImVec2(pos.x + size.x, pos.y + size.y), radius);
}

// 显示授权窗口
void ShowAuthorizationWindow()
{
    ImGui::BeginChild("AuthorizationWindow", ImVec2(config.contentSize.x - 20, config.contentSize.y - 20), config.contentBorder.show); // 使用配置的内容区域大小
    ImGui::SetCursorPos(ImVec2(150, 16));
    ImGui::Text("   Authorization");
    ImGui::SetCursorPos(ImVec2(150, 38));
    ImGui::Text("  Enter your key");
    ImGui::SetCursorPos(ImVec2(19, 60));
    ImGui::InputText("###Key", buf, IM_ARRAYSIZE(buf));
    ImGui::SetCursorPos(ImVec2(125, 95));
    if (ImGui::Button("Sign in", ImVec2(165, 40)))
    {
        // 处理登录逻辑
    }
    ImGui::SetCursorPos(ImVec2(120, 200));
    ImGui::Text("   Subscribe Expire Day");
    ImGui::EndChild();
}

// 显示数据窗口
void ShowDataWindow()
{
    ImGui::BeginChild("DataWindow", ImVec2(config.contentSize.x - 20, config.contentSize.y - 20), config.contentBorder.show); // 使用配置的内容区域大小
    ImGui::SetCursorPos(ImVec2(148, 10));
    ImGui::Text("   Welcome User.");
    ImGui::SetCursorPos(ImVec2(150, 28));
    ImGui::Text("     DashBoard:");
    ImGui::GetWindowDrawList()->AddRectFilled(ImVec2(200, 90), ImVec2(518, 206), IM_COL32(255, 0, 0, 40));
    ImGui::SetCursorPos(ImVec2(0, 60));
    ImGui::Text("                    -          Added 1tick doubletap.");
    ImGui::Text("                    -          Added Neverlose resolver.");
    ImGui::Text("                    -          Added Nemesis fakelag.");
    ImGui::Text("                    -          Added gamesense api.");
    ImGui::SetCursorPos(ImVec2(0, 180));
    ImGui::Text("    Cheat: Simplicity External / Game: CS:GO / Version: 1.0");
    ImGui::EndChild();
}

// 显示自定义窗口
void ShowCustomizationWindow()
{
    ImGui::BeginChild("CustomizableWindow", ImVec2(config.contentSize.x - 20, config.contentSize.y - 20), config.contentBorder.show); // 使用配置的内容区域大小
    ImGui::SetCursorPos(ImVec2(120, 16));
    ImGui::Text("    Menu Customization");
    ImGui::SetCursorPos(ImVec2(16, 38));
    ImGui::Combo("Menu Theme", &curTheme, themes, THEME_COUNT);
    ImGui::EndChild();
}

// 显示功能窗口
void ShowFeaturesWindow()
{
    ImGui::BeginChild("FeaturesWindow", ImVec2(config.contentSize.x - 20, config.contentSize.y - 20), config.contentBorder.show); // 使用配置的内容区域大小
    ImGui::Text("   Features content goes here.");
    ImGui::EndChild();
}

// 显示主窗口
void ShowMainWindow()
{
    ImGui::SetNextWindowSize(config.mainWindowSize, ImGuiCond_FirstUseEver);
    ImGui::Begin("Simplicity.cc Loader", &opened, ImGuiWindowFlags_NoResize | ImGuiWindowFlags_NoCollapse);

    // 绘制主窗口边框
    if (config.mainBorder.show)
        DrawRoundedBorder(ImGui::GetWindowPos(), config.mainWindowSize, config.mainBorder.radius, config.mainBorder.color);

    // 左侧按钮
    ImGui::BeginChild("TabsBar", config.tabsSize, config.tabsBorder.show); // 使用配置的标签栏大小
    // 绘制标签栏边框
    if (config.tabsBorder.show)
        DrawRoundedBorder(ImGui::GetCursorScreenPos(), config.tabsSize, config.tabsBorder.radius, config.tabsBorder.color);

    if (ImGui::Button("Authorization", ImVec2(130, 42)))
        curButton = 1;
    if (ImGui::Button("Data", ImVec2(130, 42)))
        curButton = 4;
    if (ImGui::Button("Customization", ImVec2(130, 42)))
        curButton = 2;
    if (ImGui::Button("Features", ImVec2(130, 42)))
        curButton = 3;
    ImGui::EndChild();

    ImGui::SameLine();                                                               // 使右侧内容与左侧按钮在同一行
    ImGui::BeginChild("ContentArea", config.contentSize, config.contentBorder.show); // 使用配置的内容区域大小

    // 绘制内容区域边框
    if (config.contentBorder.show)
        DrawRoundedBorder(ImGui::GetCursorScreenPos(), config.contentSize, config.contentBorder.radius, config.contentBorder.color);

    // 自定义背景
    ImGui::GetWindowDrawList()->AddRectFilled(ImGui::GetWindowPos(),
                                              ImVec2(ImGui::GetWindowPos().x + config.contentSize.x, ImGui::GetWindowPos().y + config.contentSize.y),
                                              IM_COL32(24, 24, 26, 255));

    switch (curButton)
    {
    case 1:
        ShowAuthorizationWindow();
        break;
    case 4:
        ShowDataWindow();
        break;
    case 2:
        ShowCustomizationWindow();
        break;
    case 3:
        ShowFeaturesWindow();
        break;
    default:
        break;
    }

    ImGui::EndChild();
    ImGui::End();
}
```

---

### 面板(4) 工厂模式

```cpp
#include <iostream>
#include <cstdlib>
#include <vector>
#include "../include/imgui/imgui.h"
#include "../include/imgui/imgui_internal.h"

// 定义面板状态
enum PanelState
{
    None,
    Authorization,
    Data,
    Customization,
    Features
};

// 定义主题数量
const int THEME_COUNT = 2;
const char *themes[THEME_COUNT] = {"Theme 1", "Theme 2"};

// 边框配置结构体
struct BorderConfig
{
    bool show = true;
    float radius = 5.0f;
    ImU32 color = IM_COL32(255, 255, 255, 255);
    // 默认构造函数
    BorderConfig() : show(true), radius(5.0f), color(IM_COL32(255, 255, 255, 255)) {}

    // 带参数的构造函数
    BorderConfig(bool show, float radius, ImU32 color) : show(show), radius(radius), color(color) {}
};

// 窗口配置结构体
struct WindowConfig
{
    ImVec2 mainWindowSize = ImVec2(600, 450);
    ImVec2 tabsSize = ImVec2(150, 400);
    ImVec2 contentSize = ImVec2(420, 400);
    BorderConfig mainBorder = {false, 5.0f, IM_COL32(255, 0, 0, 255)};
    BorderConfig tabsBorder = {true, 5.0f, IM_COL32(255, 255, 255, 255)};
    BorderConfig contentBorder = {false, 5.0f, IM_COL32(0, 0, 255, 255)};
};

// 全局变量
int curButton = 0;
int curTheme = 0;
char buf[128] = "";
bool opened = true;
WindowConfig config;

// 功能页面基类
class Panel
{
public:
    virtual ~Panel() {}
    virtual void Render() = 0; // 纯虚函数，派生类需要实现
};

// 授权面板
class AuthorizationPanel : public Panel
{
public:
    void Render() override
    {
        ImGui::BeginChild("AuthorizationWindow", ImVec2(config.contentSize.x - 20, config.contentSize.y - 20), config.contentBorder.show);
        ImGui::SetCursorPos(ImVec2(150, 16));
        ImGui::Text("   Authorization");
        ImGui::SetCursorPos(ImVec2(150, 38));
        ImGui::Text("  Enter your key");
        ImGui::SetCursorPos(ImVec2(19, 60));
        ImGui::InputText("###Key", buf, IM_ARRAYSIZE(buf));
        ImGui::SetCursorPos(ImVec2(125, 95));
        if (ImGui::Button("Sign in", ImVec2(165, 40)))
        {
            // 处理登录逻辑
        }
        ImGui::SetCursorPos(ImVec2(120, 200));
        ImGui::Text("   Subscribe Expire Day");
        ImGui::EndChild();
    }
};

// 数据面板
class DataPanel : public Panel
{
public:
    void Render() override
    {
        ImGui::BeginChild("DataWindow", ImVec2(config.contentSize.x - 20, config.contentSize.y - 20), config.contentBorder.show);
        ImGui::SetCursorPos(ImVec2(148, 10));
        ImGui::Text("   Welcome User.");
        ImGui::SetCursorPos(ImVec2(150, 28));
        ImGui::Text("     DashBoard:");
        ImGui::GetWindowDrawList()->AddRectFilled(ImVec2(200, 90), ImVec2(518, 206), IM_COL32(255, 0, 0, 40));
        ImGui::SetCursorPos(ImVec2(0, 60));
        ImGui::Text("                    -          Added 1tick doubletap.");
        ImGui::Text("                    -          Added Neverlose resolver.");
        ImGui::Text("                    -          Added Nemesis fakelag.");
        ImGui::Text("                    -          Added gamesense api.");
        ImGui::SetCursorPos(ImVec2(0, 180));
        ImGui::Text("    Cheat: Simplicity External / Game: CS:GO / Version: 1.0");
        ImGui::EndChild();
    }
};

// 自定义面板
class CustomizationPanel : public Panel
{
public:
    void Render() override
    {
        ImGui::BeginChild("CustomizableWindow", ImVec2(config.contentSize.x - 20, config.contentSize.y - 20), config.contentBorder.show);
        ImGui::SetCursorPos(ImVec2(120, 16));
        ImGui::Text("    Menu Customization");
        ImGui::SetCursorPos(ImVec2(16, 38));
        ImGui::Combo("Menu Theme", &curTheme, themes, THEME_COUNT);
        ImGui::EndChild();
    }
};

// 功能面板工厂
class PanelFactory
{
public:
    static Panel *CreatePanel(PanelState state)
    {
        switch (state)
        {
        case Authorization:
            return new AuthorizationPanel();
        case Data:
            return new DataPanel();
        case Customization:
            return new CustomizationPanel();
        default:
            return nullptr;
        }
    }
};

// 绘制带圆角的边框
void DrawRoundedBorder(const ImVec2 &pos, const ImVec2 &size, float radius)
{
    ImGui::GetWindowDrawList()->AddRect(pos, ImVec2(pos.x + size.x, pos.y + size.y), radius);
}

// 显示主窗口
void ShowMainWindowTwo()
{
    ImGui::SetNextWindowSize(config.mainWindowSize, ImGuiCond_FirstUseEver);
    ImGui::Begin("Simplicity.cc Loader", &opened, ImGuiWindowFlags_NoResize | ImGuiWindowFlags_NoCollapse);

    // 绘制主窗口边框
    if (config.mainBorder.show)
        DrawRoundedBorder(ImGui::GetWindowPos(), config.mainWindowSize, config.mainBorder.radius);

    // 左侧按钮
    ImGui::BeginChild("TabsBar", config.tabsSize, config.tabsBorder.show);
    // 绘制标签栏边框
    if (config.tabsBorder.show)
        DrawRoundedBorder(ImGui::GetCursorScreenPos(), config.tabsSize, config.tabsBorder.radius);

    if (ImGui::Button("Authorization", ImVec2(130, 42)))
        curButton = Authorization;
    if (ImGui::Button("Data", ImVec2(130, 42)))
        curButton = Data;
    if (ImGui::Button("Customization", ImVec2(130, 42)))
        curButton = Customization;

    ImGui::EndChild();

    ImGui::SameLine();
    ImGui::BeginChild("ContentArea", config.contentSize, config.contentBorder.show);

    // 绘制内容区域边框
    if (config.contentBorder.show)
        DrawRoundedBorder(ImGui::GetCursorScreenPos(), config.contentSize, config.contentBorder.radius);

    // 自定义背景
    ImGui::GetWindowDrawList()->AddRectFilled(ImGui::GetWindowPos(),
                                              ImVec2(ImGui::GetWindowPos().x + config.contentSize.x, ImGui::GetWindowPos().y + config.contentSize.y),
                                              IM_COL32(24, 24, 26, 255));

    // 根据当前按钮渲染对应的面板
    Panel *panel = PanelFactory::CreatePanel(static_cast<PanelState>(curButton));
    if (panel)
    {
        panel->Render();
        delete panel; // 使用完后释放内存
    }

    ImGui::EndChild();
    ImGui::End();
}
```

---

## 文本居中

```cpp
void TextCentered(std::string text) {
    auto windowWidth = ImGui::GetWindowSize().x;
    auto textWidth   = ImGui::CalcTextSize(text.c_str()).x;

    ImGui::SetCursorPosX((windowWidth - textWidth) * 0.5f);
    ImGui::Text(text.c_str());
}
```

---



## `ImGui::SetCursorPos` 

> 用于在 ImGui 窗口内精确定位下一个绘制的元素的位置。它接受一个 `ImVec2(x, y)` 参数，指定窗口内的相对坐标位置，以左上角为原点 `(0, 0)`。

### 使用方式
`ImGui::SetCursorPos(ImVec2(x, y));`  

- **x**：相对于窗口左边的水平偏移。
- **y**：相对于窗口顶部的垂直偏移。

### 示例
假设有以下内容，希望将文字和按钮在窗口内的不同位置渲染：

```cpp
if (ImGui::Begin("Example Window")) {
    // 将光标定位到窗口内 (50, 30) 位置处
    ImGui::SetCursorPos(ImVec2(50, 30));
    ImGui::Text("This text is positioned at (50, 30)");

    // 将光标定位到窗口内 (100, 70) 位置处
    ImGui::SetCursorPos(ImVec2(100, 70));
    if (ImGui::Button("Click Me")) {
        // 按钮点击逻辑
    }

    ImGui::End();
}
```

### 使用 `SetCursorPos` 实现精确布局
可以组合使用 `SetCursorPos` 来控制每个元素的位置，从而实现自由布局。例如，如果希望将一个文本和一个按钮在同一行显示：

```cpp
if (ImGui::Begin("Example Window")) {
    // 定位文本
    ImGui::SetCursorPos(ImVec2(20, 40));
    ImGui::Text("Label:");

    // 定位按钮
    ImGui::SetCursorPos(ImVec2(100, 40));  // 在同一水平线上
    ImGui::Button("Submit");

    ImGui::End();
}
```

### 调整坐标实现动态布局
也可以通过窗口的尺寸、内容大小等动态调整 `SetCursorPos` 的值，以适应窗口大小的变化。例如，通过 `ImGui::GetWindowSize` 获取窗口宽度，可以将元素居中对齐：

```cpp
ImVec2 window_size = ImGui::GetWindowSize();
float centered_x = (window_size.x - button_width) * 0.5f;
float centered_y = (window_size.y - button_height) * 0.5f;

ImGui::SetCursorPos(ImVec2(centered_x, centered_y));
ImGui::Button("Centered Button");
```

通过这种方式，可以将 ImGui 的组件灵活定位在窗口中的指定位置。

---

## 按钮效果

在 ImGui 中，可以使用颜色栈 (`ImGui::PushStyleColor` 和 `ImGui::PopStyleColor`) 来临时修改控件的颜色。通过检测按钮的鼠标状态，我们可以在按钮被悬停时更改颜色，从而实现鼠标悬停时变色的效果。

以下是一个简单的实现示例：

```cpp
#include "imgui.h"

void DrawButtonWithHoverEffect(const char* label) {
    // 设置按钮默认和悬停时的颜色
    ImVec4 defaultColor = ImVec4(0.2f, 0.5f, 0.8f, 1.0f); // 默认颜色
    ImVec4 hoverColor = ImVec4(0.4f, 0.7f, 1.0f, 1.0f);   // 悬停颜色

    // 判断按钮的悬停状态，应用不同的颜色
    if (ImGui::IsItemHovered()) {
        ImGui::PushStyleColor(ImGuiCol_Button, hoverColor);  // 按钮悬停时的颜色
    } else {
        ImGui::PushStyleColor(ImGuiCol_Button, defaultColor); // 按钮默认颜色
    }

    // 绘制按钮
    ImGui::Button(label);

    // 恢复按钮颜色
    ImGui::PopStyleColor();
}
```

### 实现原理
1. **设置颜色**：`defaultColor` 定义按钮的默认颜色，`hoverColor` 定义鼠标悬停时的颜色。
2. **检测悬停状态**：使用 `ImGui::IsItemHovered()` 判断按钮是否被悬停。若为真，使用 `PushStyleColor` 将按钮颜色改为 `hoverColor`。
3. **绘制按钮并恢复颜色**：调用 `ImGui::Button` 绘制按钮。绘制完成后，调用 `PopStyleColor` 恢复按钮的默认颜色。

通过这种方式，可以在不影响其他控件的前提下，为单个按钮实现悬停变色效果。

### 实现的效果

```cpp
#pragma once
#ifndef SK_BUTTON_H
#define SK_BUTTON_H

#include "../ImGui/imgui.h"
#include <functional>
#include <chrono>
#include <thread>

class LoadingButton {
public:
    LoadingButton(const char* label, float loadingDuration = 2.0f)
        : label(label), loadingDuration(loadingDuration), isLoading(false), loadingProgress(0.0f) {}

    // 显示按钮并实现加载效果
    void ShowButton(std::function<void()> onClick, std::function<void()> onComplete) {
        // 如果当前在加载状态，绘制加载条
        if (isLoading) {
            ImGui::ProgressBar(loadingProgress, ImVec2(100.0f, 0.0f));
            UpdateLoading(onComplete);  // 更新加载进度
        }
        else {
            // 绘制按钮并检查点击事件
            if (ImGui::Button(label)) {
                StartLoading(onClick);
            }
        }
    }

private:
    const char* label;
    bool isLoading;
    float loadingDuration;
    float loadingProgress;
    std::chrono::time_point<std::chrono::steady_clock> startTime;

    // 开始加载并调用点击回调
    void StartLoading(std::function<void()> onClick) {
        isLoading = true;
        loadingProgress = 0.0f;
        startTime = std::chrono::steady_clock::now();
        if (onClick) {
            onClick();  // 调用前回调函数
        }
    }

    // 更新加载进度
    void UpdateLoading(std::function<void()> onComplete) {
        auto currentTime = std::chrono::steady_clock::now();
        float elapsedTime = std::chrono::duration<float>(currentTime - startTime).count();
        loadingProgress = elapsedTime / loadingDuration;

        if (loadingProgress >= 1.0f) {
            loadingProgress = 1.0f;
            isLoading = false;
            if (onComplete) {
                onComplete();  // 加载完成后调用回调函数
            }
        }
    }
};

#endif // SK_BUTTON_H
```



```cpp
ImDrawList* draw_list = ImGui::GetWindowDrawList();
ImVec2 p1 = ImVec2(106.977 + ImGui::GetCursorScreenPos().x, 26.357 + ImGui::GetCursorScreenPos().y);
ImVec2 p2 = ImVec2(p1.x + 333.333, p1.y + 229.457);
if (false) {
    draw_list->AddRectFilled(p1, p2, IM_COL32(130, 182, 98, 255), 28.837);
} else {
    draw_list->AddRect(p1, p2, IM_COL32(130, 182, 98, 255), 28.837, 0, 1.0f);
}
```

