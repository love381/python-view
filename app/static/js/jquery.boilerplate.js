/*
 *  jquery-boilerplate - v4.1.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// 这个分号的作用是防止和其他jquery插件合并时，别人不规范的jquery插件忘记使用分号结束
//影响到我们当前的插件，导致无法运行的问题。
;( function( $, window, document, undefined ) {

	"use strict";

	// undefined作为形参的目的是因为在es3中undefined是可以被修改的
    //比如我们可以声明var undefined = 123,这样就影响到了undefined值的判断，幸运的是在es5中,undefined不能被修改了。
    // window和document本身是全局变量，在这个地方作为形参的目的是因为js执行是从里到外查找变量的（作用域），把它们作为局部变量传进来，就避免了去外层查找，提高了效率。
    // 声明默认属性对象
		var pluginName = "easySlider",
			defaults = {
				slideSpeed: 500, //图片切换速度
				paginationSpacing: "15px",//分页圆点标记的间隙
				paginationDiameter: "12px",//分页原点的直径
				paginationPositionFromBottom: "20px",//分页圆点到轮播图底部的距离
				controlsClass: ".controls",//左右控制按钮的class名称
				slidesClass: ".slides",//轮播图的class名称
				paginationClass: ".pagination"//分页圆点导航按钮的class名称
			};

		// 构造函数
		function Plugin (element, options) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			//将默认属性对象和传递的参数对象合并到第一个空对象中
			this.settings = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		//为了避免和原型对象Plugin.prototype的冲突，这地方采用继承原型对象的方法
		$.extend( Plugin.prototype, {
			init: function() {
				//在这里放置初始化逻辑，您已经可以通过实例访问DOM元素和选项，例如this。
				// 这个元素。设置您可以添加更多的函数，如下面的函数，并像下面的示例那样调用它
				this.setProperties();
				this.positionPagination();
				this.slideParameters.setCurrentSlideNumber.call(this, 1);
				this.events.clickRight.call(this);
				this.events.clickLeft.call(this);
				this.events.clickPage.call(this);
			},						
			events: {
				clickRight: function() {      //右点击
							var _this = this;
							$(this.settings.controlsClass+" "+"li:last-child").click(
								function() {
									if (_this.slideParameters.getCurrentSlideNumber.call(_this) === _this.slideParameters.getNumberOfSlides.call(_this)) {
										//go to first slide, when slideshow has reached max distance当幻灯片放映达到最大距离时，转到第一张图片
										$(_this.settings.slidesClass).animate({right: "0%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, 1);
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									} else {
										//go to next slide下一张图片片
										$(_this.settings.slidesClass).animate({right: "+=100%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, _this.slideParameters.getCurrentSlideNumber.call(_this)+1);
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									}
								});
				},
				clickLeft: 	function() {   //左点击
							var _this = this;
							$(this.settings.controlsClass + " " + "li:first-child").click(	
								function() {
									if (_this.slideParameters.getCurrentSlideNumber.call(_this) === 1) {
										//go to first slide, when slideshow has reached max distance
										$(_this.settings.slidesClass).animate({right: (_this.slideParameters.getMaxSlidePercentage.call(_this)-100).toString()+"%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, _this.slideParameters.getNumberOfSlides.call(_this));
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									} else {
										//go to next slide
										$(_this.settings.slidesClass).animate({right: "-=100%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, _this.slideParameters.getCurrentSlideNumber.call(_this)-1);
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									}
								});
				},
				clickPage: function() {
							var _this = this;
							$(this.settings.paginationClass + " " + "li").click(
								function() {
									var currentSlideNumber = $(this).index()+1;
									$(_this.settings.slidesClass).animate({right: ((currentSlideNumber-1)*100).toString()+"%"}, 500);
									_this.paginate(currentSlideNumber);
								});
				}
			},
			paginate: function(currentSlideNumber) {
				var i;
				var total = this.slideParameters.getNumberOfSlides.call(this);
				for (i=1; i<=total; i++) {
					$(this._defaults.paginationClass + " " + "li:nth-child"+ "(" + i.toString() + ")").removeClass("active");
				}
				$(this._defaults.paginationClass + " " + "li:nth-child"+ "(" + currentSlideNumber.toString() + ")").addClass("active");
				this.slideParameters.setCurrentSlideNumber.call(this, currentSlideNumber);
			},
			positionPagination: function() {
				var numberOfSlides = this.slideParameters.getNumberOfSlides.call(this);
				var marginLeft = -(numberOfSlides*(this.convertStringToInteger(this.settings.paginationDiameter)) + (numberOfSlides-1)*(this.convertStringToInteger(this.settings.paginationSpacing)))/2;
				
				$(this.settings.paginationClass).css("margin-left", marginLeft);
			},
			slideParameters: {
				setCurrentSlideNumber: function(currentSlideNumber) {
					this.currentSlideNumber = currentSlideNumber;
				},
				getCurrentSlideNumber: function() {
					return this.currentSlideNumber;
				},
				getNumberOfSlides: function() {
					return $(this._defaults.slidesClass).children().length;
				},
				getSlideWidth: function() {
					return $(this._defaults.slidesClass + " " + "li").width();
				},
				getMaxSlideDistance: function() {
					return ((this.getNumberOfSlides()-1)*this.getSlideWidth());
				},
				getMaxSlidePercentage: function() {
					return this.slideParameters.getNumberOfSlides.call(this)*100;
				},
			},
			convertStringToInteger: function(string) {
				return parseInt((string).replace(/[^0-9.]/g, ""));
			},
			setProperties: function() {
				$("#slider").css({
					"position": "relative",
					"overflow": "hidden"
					});
				$(this.settings.slidesClass).css({
					"position": "relative",
					"width": this.slideParameters.getMaxSlidePercentage.call(this).toString()+"%"
					});
				$(this.settings.controlsClass).css({
					"cursor": "pointer"
					});
				$(this.settings.controlsClass+" "+"li").css({
					"position": "absolute"
					});
				$(this.settings.slidesClass+" "+"li").css({
					"width": 100/this.slideParameters.getNumberOfSlides.call(this).toString()+"%",
					"float": "left"
					});
				$(this.settings.paginationClass).css({
					"position": "relative",
					"left": "50%",
					"bottom": this.settings.paginationPositionFromBottom
					});
				$(this.settings.paginationClass+" "+"li").css({
					"margin-right": this.settings.paginationSpacing,
					"float": "left",
					"cursor": "pointer",
					"width": this.settings.paginationDiameter,
					"height": this.settings.paginationDiameter,
					"border-radius": "9999px"
					});
			}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		//对构造函数的一个轻量级封装，防止产生多个实例
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
