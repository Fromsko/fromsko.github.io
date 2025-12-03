# style

# 前端好看样式合集

## 玻璃效果盒子

![image-20241025221349835](/images/image-20241025221349835.png)

```scss
@mixin glass-card {
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
  color: rgba(255, 255, 255, 0.75);
}

@mixin center-layout($width: 420px, $height: 300px, $radius: 8px) {
  display: flex;
  width: $width;
  height: $height;
  border-radius: $radius;
  align-items: center;
  justify-content: center;
}

body {
  margin: 0;
  display: flex;
  font-family: Roboto, sans-serif;
  user-select: none;
}

#settings-div {
  width: 400px;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1d1d1d;
}

#workspace-div {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--color1) 50%, var(--color2));
}

.glass {
  @include center-layout($radius: 30px);
  @include glass-card;
}
```
