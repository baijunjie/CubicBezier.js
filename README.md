# CubicBezier

三次贝塞尔曲线求值

#### 安装

```
$ npm install cubic-bezier-object
```

#### 创建一个三次贝塞尔曲线对象

```js
/**
 * 创建一个三次贝塞尔对象
 * 每一个参数为一个表示点的数组[x,y]，或者一个Point对象
 * @param {Array|Point} c1    表示起始点的控制点
 * @param {Array|Point} c2    表示结束点的控制点
 * @param {Array|Point} begin 可选。表示起始点，默认为[0,0]
 * @param {Array|Point} end   可选。表示结束点，默认为[1,1]
 */
var cubicBezier = new CubicBezier([.175, .885], [.32, 1.275]);
```

#### 直接用三次贝塞尔表达式创建

```js
/**
 * 三次贝塞尔表达式创建
 * @param {String}      easing 三次贝塞尔表达式
 * @param {Array|Point} begin  可选。表示起始点，默认为[0,0]
 * @param {Array|Point} end    可选。表示结束点，默认为[1,1]
 */
var cubicBezier = new CubicBezier('cubic-bezier(.175, .885,.32,1.275)');
```

#### 已知y，求x

```js
/**
 * 已知y，求x
 * @param  {number} y 参数表示一个在贝塞尔曲线上Y轴方向的向量，取值在 0.0 - 1.0 之间
 * @return            返回y在贝塞尔曲线上对应的x
 */
cubicBezier.getX(y);
```

#### 已知x，求y

```js
/**
 * 已知x，求y
 * @param  {number} x 参数表示一个在贝塞尔曲线上X轴方向的向量，取值在 0.0 - 1.0 之间
 * @return            返回x在贝塞尔曲线上对应的y
 */
cubicBezier.getY(x);
```

#### 根据时间获取曲线上对应的点

```js
/**
 * 根据时间获取曲线上对应的点
 * @param  {number} t 参数表示一个 0.0 - 1.0 的时间向量
 * @return            返回的结果是该时刻在贝塞尔曲线上的点
 */
cubicBezier.getPoint(t);
```

#### 设置一个新的贝塞尔函数

```js
/**
 * 设置一个新的贝塞尔函数
 * 参数与构造函数相同
 */
cubicBezier.set(c1, c2, begin, end);
```

#### 创建一个Point对象

```js
var point = new CubicBezier.Point(x, y);
```

