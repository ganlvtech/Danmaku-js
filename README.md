# Danmaku.js

## 使用

### 示例
```html
<div id="wrapper" style="font-size: 20px; width: 100%; height:100%;"></div>
<script src="Danmaku.js"></script>
<script>
    // 新建画板
    var danmakuPainter = new DanmakuPainter(document.getElementById('wrapper'));
    // 窗口调整大小的时候调整大小
    (window.onresize = function () {
        document.body.style.height = window.innerHeight + 'px';
        danmakuPainter.resize.bind(danmakuPainter)();
    })();

    // 新建div
    var div = document.createElement('div');
    // 设置文字
    div.textContent = 'Hello world!';
    // 设置文字颜色
    div.style.color = 'blue';
    // 新建顶端的（代码为1）时长为5秒弹幕并立即发射
    danmakuPainter.launch(new Danmaku(div, 1, 5), 0);
</script>
```

### 说明

* 发射语句`danmakuPainter.launch(new Danmaku(div, position, duration), delay);`中的四个参数说明

| 参数 | 说明 | 取值 |
| --- | --- | --- |
| div | div元素 | HTMLDivElement |
| position | 弹幕位置 | 0: 普通, 1: 顶端, 2: 底端 |
| duration | 弹幕时长 | 正实数，以秒为单位 |
| delay | 延迟发射 | 实数，以秒为单位，正数表示延时发射，负数同理 |

* 只要被div包围即可，内容可以是任何类型，可以是图片、文本等

## Author

Ganlv

## LICENSE

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
