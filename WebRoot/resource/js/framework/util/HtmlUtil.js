/**
 * Html Dom处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class HtmlUtil
 */
ObjectUtil
		.define(
				"HtmlUtil",
				{
					// id的种子
					statics : {
						seed : 0,
						/*
						 * 正则表达式
						 */
						re : /\{([\w-]+)\}/g,
						/*
						 * 在root元素里面插入content
						 */
						insertHtml : function(content, root) {
							Ext.DomHelper
									.insertHtml('beforeEnd', root, content);
						},
						/*
						 * 将domId指定的元素的子元素覆盖为domContent指定的内容
						 */
						overwrite : function(domId, domContent, flag) {
							Ext.DomHelper.overwrite(domId, domContent, flag);
						},
						/*
						 * 获取id
						 */
						genId : function(prefix) {
							return prefix + (++HtmlUtil.seed);
						},
						/*
						 * 将html片段和json对象合并成html @content html模板内容 @owner
						 * pageObject对象
						 */
						compile : function(content, owner) {
							var template = new Ext.Template(content);
							owner.ids = {};// 先清空ids
							while ((result = HtmlUtil.re.exec(template.html)) != null) {
								var id = result[0].substring(1,
										(result[0].length - 1));
								owner.ids[id] = HtmlUtil.genId(owner.id);
							}
							return template.applyTemplate(owner.ids);
						},
						/*
						 * 根据传入的id得到对应的dom元素,和document.getElementById等效
						 */
						getDom : function(id) {
							return Ext.getDom(id);
						},
						/*
						 * 根据传入的name得到对应的dom元素
						 */
						getDomByName : function(name) {
							return document.getElementsByName(name)[0];
						},
						/*
						 * 将对应的dom设置值(spn,td)
						 */
						setText : function(dom, value) {
							Ext.DomHelper.overwrite(dom, "", false);
							Ext.DomHelper.insertHtml('afterbegin', dom, value);
						},

						/**
						 * 替换指定节点样式
						 * 
						 * @param {}
						 *            dom 节点ID
						 * @param {}
						 *            oldStyle 旧样式
						 * @param {}
						 *            newStyle 新样式
						 */
						replaceCls : function(dom, oldStyle, newStyle) {
							var dom = Ext.get(dom);
							if (dom) {
								dom.replaceCls(oldStyle, newStyle);
							}
						},
						/**
						 * 样式替换
						 * 
						 * @param {}
						 *            name
						 * @param {}
						 *            path
						 */
						swapStyleSheet : function(name, path) {
							Ext.util.CSS.swapStyleSheet(name, path);
						},
						/**
						 * 加载个性化系统配置参数
						 */
						loadSystemStyle : function(theme) {
							if (null != theme) {
								this.setSystemStyle(theme);
							} else if (null != window
									&& null != window.systemConfig
									&& null != window.systemConfig.appearance
									&& window.systemConfig.appearance.theme.themeCode != CodeStringDefinition.SYSTEM_THEME_CODE_DEFAULT) {
								this
										.setSystemStyle(window.systemConfig.appearance.theme);
							}

						},
						setSystemStyle : function(theme) {
							// 改变主题样式
							HtmlUtil
									.swapStyleSheet(
											"theme",
											Constants.CONTEXT_PATH
													+ "/js/common/thirdpart/ext-4.1/resources/css/ext-all-"
													+ theme.themeCode + ".css");
							// 改变header背景样式
							HtmlUtil
									.replaceCls(
											'mainPageHeaderDivId',
											CodeStringDefinition.SYSTEM_THEME_HEADER_STYLE_DEFAULT,
											theme.headerStyle);
							// 改变menu背景样式
							HtmlUtil
									.replaceCls(
											'mainMenu',
											CodeStringDefinition.SYSTEM_THEME_MENU_STYLE_DEFAULT,
											theme.menuStyle);
							// 改变日历控件背景样式
							HtmlUtil
									.replaceCls(
											"minCalendarHeaderId",
											CodeStringDefinition.SYSTEM_THEME_CALENDAR_STYLE_DEFAULT,
											theme.calendarStyle);
						},
						/** 获取指定元素的坐标 */
						getElementPos : function(elementId) {
							var ua = navigator.userAgent.toLowerCase();
							var isOpera = (ua.indexOf('opera') != -1);
							var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not
							// opera
							// spoof
							var el = document.getElementById(elementId);
							if (el.parentNode === null
									|| el.style.display == 'none') {
								return false;
							}
							var parent = null;
							var pos = [];
							var box;
							if (el.getBoundingClientRect) // IE
							{
								box = el.getBoundingClientRect();
								var scrollTop = Math.max(
										document.documentElement.scrollTop,
										document.body.scrollTop);
								var scrollLeft = Math.max(
										document.documentElement.scrollLeft,
										document.body.scrollLeft);
								return {
									x : box.left + scrollLeft,
									y : box.top + scrollTop
								};
							} else if (document.getBoxObjectFor) // gecko
							{
								box = document.getBoxObjectFor(el);
								var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth)
										: 0;
								var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth)
										: 0;
								pos = [ box.x - borderLeft, box.y - borderTop ];
							} else // safari & opera
							{
								pos = [ el.offsetLeft, el.offsetTop ];
								parent = el.offsetParent;
								if (parent != el) {
									while (parent) {
										pos[0] += parent.offsetLeft;
										pos[1] += parent.offsetTop;
										parent = parent.offsetParent;
									}
								}
								if (ua.indexOf('opera') != -1
										|| (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
									pos[0] -= document.body.offsetLeft;
									pos[1] -= document.body.offsetTop;
								}
							}
							if (el.parentNode) {
								parent = el.parentNode;
							} else {
								parent = null;
							}
							while (parent && parent.tagName != 'BODY'
									&& parent.tagName != 'HTML') { // account
								// for
								// any scrolled
								// ancestors
								pos[0] -= parent.scrollLeft;
								pos[1] -= parent.scrollTop;
								if (parent.parentNode) {
									parent = parent.parentNode;
								} else {
									parent = null;
								}
							}
							return {
								x : pos[0],
								y : pos[1]
							};
						},
						/** 根据鼠标点击事件获取鼠标点击的坐标 */
						mousePosition : function(ev) {
							if (ev.pageX || ev.pageY) {
								return {
									x : ev.pageX,
									y : ev.pageY
								};
							}
							return {
								x : ev.clientX + document.body.scrollLeft
										- document.body.clientLeft,
								y : ev.clientY + document.body.scrollTop
										- document.body.clientTop
							};
						}

					}
				});