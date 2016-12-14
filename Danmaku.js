/////////////////////////////////////////////////////////////
//
//  弹幕动态脚本
//  Version: 2.0.0
//
//  Author: Ganlv<ganlvtech at qq dot com>
//  Organisation: eeYes.net<https://github.com/eeyes-net>
//
//  LICENSE: Apache 2.0
//
/////////////////////////////////////////////////////////////
/**
 * 弹幕构造器
 * @param div {HTMLDivElement} 弹幕的div元素
 * @param [position=0] {number} 弹幕位置
 * @param [duration=5] {number} 弹幕持续时间（秒）
 * @constructor
 */
function Danmaku(div, position, duration) {
    div.style.opacity = '0';
    div.style.position = 'absolute';
    div.style.textShadow = '#000 0 0 2px';
    div.style.fontWeight = 'bold';
    div.style.fontFamily = '黑体, sans-serif';
    div.style.whiteSpace = 'nowrap';
    this.div = div;
    this.position = position || 0;
    this.duration = duration || 5;
    this.width = NaN;
    this.height = NaN;
    this.time = NaN;
}
/**
 * 弹幕引擎
 * @param wrapper {HTMLDivElement} 容器元素
 * @constructor
 */
function DanmakuPainter(wrapper) {
    this.wrapper = wrapper;
    this.wrapper.style.position = 'relative';
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.left = '0';
    this.container.style.top = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.fontSize = '0.8em';
    this.container.style.overflow = 'hidden';
    this.container.style.pointerEvents = 'none';
    this.resize();
    this.wrapper.appendChild(this.container);
    this.offsets = [0, 0, 0];
    this.danmakus = [];
    setInterval(this.paint.bind(this), 15);
}
/**
 * 调整大小
 */
DanmakuPainter.prototype.resize = function () {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
}
/**
 * 获取当前时间戳
 * @returns {number}
 */
DanmakuPainter.prototype.now = function () {
    return Date.now() / 1000;
};
/**
 * 发射弹幕
 * @param danmaku {Danmaku} 弹幕对象
 * @param [delay=0] {number} 延时发射（秒）
 */
DanmakuPainter.prototype.launch = function (danmaku, delay) {
    danmaku.div.style.left = this.width + 'px';
    this.container.appendChild(danmaku.div);
    danmaku.width = danmaku.div.clientWidth;
    danmaku.height = danmaku.div.clientHeight;
    if (this.offsets[danmaku.position] + danmaku.height > this.height) {
        this.offsets[danmaku.position] = 0;
    }
    switch (danmaku.position) {
        case 0:
            danmaku.div.style.left = this.width + 'px';
            break;
        case 1:
        case 2:
            danmaku.div.style.left = ((this.width - danmaku.width) / 2) + 'px';
            break;
    }
    switch (danmaku.position) {
        case 0:
        case 1:
            danmaku.div.style.top = this.offsets[danmaku.position] + 'px';
            this.offsets[danmaku.position] += danmaku.height;
            break;
        case 2:
            this.offsets[danmaku.position] += danmaku.height;
            danmaku.div.style.top = (this.height - this.offsets[danmaku.position]) + 'px';
            break;
    }
    delay = delay || 0;
    danmaku.time = this.now() + delay;
    this.danmakus.push(danmaku);
};
/**
 * 重绘（即重新定位普通弹幕）
 */
DanmakuPainter.prototype.paint = function () {
    var t = this.now();
    for (var i in this.danmakus) {
        var danmaku = this.danmakus[i];
        var dt = t - danmaku.time;
        if (dt > danmaku.duration) {
            switch (danmaku.position) {
                case 0:
                case 1:
                    if (danmaku.div.offsetTop < this.offsets[danmaku.position]) {
                        this.offsets[danmaku.position] = danmaku.div.offsetTop;
                    }
                    break;
                case 2:
                    var offset = this.height - (danmaku.div.offsetTop + danmaku.div.offsetHeight);
                    if (offset < this.offsets[danmaku.position]) {
                        this.offsets[danmaku.position] = offset;
                    }
                    break;
            }
            this.container.removeChild(danmaku.div);
            this.danmakus.splice(i, 1);
        } else if (dt >= 0) {
            danmaku.div.style.opacity = '';
            switch (danmaku.position) {
                case 0:
                    danmaku.div.style.left = (this.width - dt / danmaku.duration * (this.width + danmaku.width)) + 'px';
                    break;
                case 1:
                case 2:
                    danmaku.div.style.left = ((this.width - danmaku.width) / 2) + 'px';
                    break;
            }
        }
    }
};
