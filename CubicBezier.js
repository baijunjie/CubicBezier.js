
(function(root, factory) {
	'use strict';

	if (typeof module === 'object' && typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		root.CubicBezier = factory();
	}

}(this, function() {

	/**
	 * @author 创建一个三次贝塞尔对象
	 * @exception 每一个参数为一个表示点的数组[x,y]
	 * @param {array} c1 表示起始点的控制点
	 * @param {array} c2 表示结束点的控制点
	 * @param {array} begin 表示起始点，默认为[0,0]
	 * @param {array} end 表示结束点，默认为[1,1]
	 */
	function CubicBezier(c1, c2, begin, end) {
		this.set.apply(this, arguments);
	}

	CubicBezier.prototype = {
		_bezierFunc: function(p, t, targ) {
			return this.begin[p] * Math.pow(1 - t, 3) +
				this.c1[p] * 3 * t * Math.pow(1 - t, 2) +
				this.c2[p] * 3 * (1 - t) * Math.pow(t, 2) +
				this.end[p] * Math.pow(t, 3) -
				targ;
		},

		_deltaBezierFunc: function(p, t, targ) {
			var dt = 1e-8;
			return (this._bezierFunc(p, t, targ) - this._bezierFunc(p, t - dt, targ)) / dt;
		},

		set: function(c1, c2, begin, end) {
			this.c1 = c1 ? new Point(c1[0], c1[1]) : new Point(0, 0);
			this.c2 = c2 ? new Point(c2[0], c2[1]) : new Point(1, 1);
			this.begin = begin ? new Point(begin[0], begin[1]) : new Point(0, 0);
			this.end = end ? new Point(end[0], end[1]) : new Point(1, 1);
		},

		/**
		 * @author 已知y，求x
		 * @param {number} y 参数表示一个在贝塞尔曲线上Y轴方向的向量，取值在 0.0 - 1.0 之间
		 * @return 返回y在贝塞尔曲线上对应的x
		 */
		getX: function(y) {
			var t = .5; //设置t的初值
			for (var i = 0; i < 1000; i++) {
				t = t - this._bezierFunc('y', t, y) / this._deltaBezierFunc('y', t, y);
				if (this._bezierFunc('y', t, y) === 0) break;
			}
			return this._bezierFunc('x', t, 0);
		},

		/**
		 * @author 已知x，求y
		 * @param {number} x 参数表示一个在贝塞尔曲线上X轴方向的向量，取值在 0.0 - 1.0 之间
		 * @return 返回x在贝塞尔曲线上对应的y
		 */
		getY: function(x) {
			var t = .5; //设置t的初值
			for (var i = 0; i < 1000; i++) {
				t = t - this._bezierFunc('x', t, x) / this._deltaBezierFunc('x', t, x);
				if (this._bezierFunc('x', t, x) === 0) break;
			}
			return this._bezierFunc('y', t, 0);
		},

		/**
		 * @author 根据时间获取曲线上对应的点
		 * @param {number} t 参数表示一个 0.0 - 1.0 的时间向量
		 * @return 返回的结果是该时刻在贝塞尔曲线上的点
		 */
		getPoint: function(t) {
			var p = new Point();
			p.x = this._bezierFunc('x', t, 0);
			p.y = this._bezierFunc('y', t, 0);
			return p;
		}
	}

	function Point(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	return CubicBezier;

}));
