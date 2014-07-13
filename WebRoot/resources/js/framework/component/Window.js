/**
 * Window组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.Window
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID config->title 标题 config->autoScroll: 是否自动滚动条
 *                config->collapsible: 是否可折叠 config->closable: 是否可关闭
 *                config->height: 组件高度 config->x: 窗口相对于屏幕的水平位置 config->y::
 *                窗口相对于屏幕的垂直位置 config->width: 宽度 config->modal: 是否是模态窗口
 *                config->buttons: 包含的按钮的配置，按钮包含属性：text: 按钮上显示的文本
 *                iconCls：按钮的图片样式 handler：点击按钮后的回调函数
 * 
 * config->pageObject: 包含的页面对象 config->callback: 组件渲染完成后的回调方法，回调时传入当前panel组件对象
 * config->listeners:监听的事件 config->buttonAlign:按钮的对齐方式
 * config->autoScroll:是否自动展示滚动条 config->draggable:窗口是否可以拖动
 * @example var win = ObjectUtil.create('component.Window', { title : '修改行外客户',
 *          closable : true, draggable : true, width : 600, height : 245, x :
 *          '80', y : '60', modal : true, pageObject : ObjectUtil.create(
 *          'ocrm.pages.test.OuterCustomerUpdate', { id : 'OuterCustomerUpdate',
 *          corpersonky : record.get('corpersonky') }) });
 */
ObjectUtil
		.define(
				"component.Window",
				{
					extend : 'base.AbstractComponent',
					type : 'Window',
					/**
					 * 标题
					 * 
					 * @type String
					 */
					title : '',
					/**
					 * 窗口相对于屏幕的水平位置
					 * 
					 * @type Number
					 */
					x : null,
					/**
					 * 窗口相对于屏幕的垂直位置
					 * 
					 * @type Number
					 */
					y : null,
					/**
					 * 是否自动滚动条,默认false
					 * 
					 * @type Boolean
					 */
					autoScroll : null,
					/**
					 * 是否可折叠,默认false
					 * 
					 * @type Boolean
					 */
					collapsible : false,
					/**
					 * 是否可关闭,默认false
					 * 
					 * @type Boolean
					 */
					closable : false,
					/**
					 * 高度
					 * 
					 * @type Number
					 */
					height : null,
					/**
					 * 宽度
					 * 
					 * @type Number
					 */
					width : null,
					/**
					 * 是否是模态窗口
					 * 
					 * @type Boolean
					 */
					modal : true,
					/**
					 * 按钮的对齐方式
					 * 
					 * @type String
					 */
					buttonAlign : null,
					/**
					 * 窗口是否可以拖动
					 * 
					 * @type Boolean
					 */
					draggable : false,
					/**
					 * 按钮
					 * 
					 * @type Array
					 */
					buttons : null,

					/**
					 * 监听事件对象
					 * 
					 * @type Object
					 */
					listeners : null,
					/**
					 * 页面对象
					 * 
					 * @type Array
					 */
					pageObject : null,
					baseCls : null,
					isRenderd : null,
					constructor : function(config) {
						Ext.apply(this, config);
						this.callParent();
					},
					/**
					 * 参数校验
					 * 
					 * @Override
					 * @return {Boolean}
					 */
					checkConfig : function() {
						return true;
					},
					/**
					 * 组件创建前处理
					 * 
					 * @Override
					 */
					beforeBuild : function() {
						var me = this;
						if (this.pageObject) {
							this.pageObject.parent = this;
							this.html = this.pageObject.genHtml();
						}
						var newButtons;
						if (!DataUtil.isEmpty(this.buttons)) {
							newButtons = [ '->' ];
							var i = 0;
							DataUtil.each(this.buttons, function(button) {
								var newButton = {};
								newButton.iconCls = button.iconCls;
								newButton.text = button.text;
								newButton.id = button.id;
								newButton.handler = button.handler;
								newButtons.push(newButton);
								if (i < me.buttons.length - 1) {
									newButtons.push('-');
								}
								i++;
							});
							this.buttons = newButtons;
						}

						// 组装事件

						if (this.listeners) {
							if (this.listeners.show) {
								this.oldrender = this.listeners.show;
								this.listeners.show = Ext.Function.bind(
										this.renderPageObject, this);
							} else {
								this.listeners.show = Ext.Function.bind(
										this.renderPageObject, this);
							}
							this.listeners.delay = 10;
						} else {
							this.listeners = {
								show : Ext.Function.bind(this.renderPageObject,
										this),
								delay : 10
							}
						}
						if (this.autoScroll != false) {
							this.autoScroll = true;
						}
						return true;
					},
					/**
					 * 构建组件
					 * 
					 * @Override
					 */
					build : function() {
						var me = this;
						var winConf = {
							id : this.id,
							title : this.title,
							resizable : false,
							collapsible : this.collapsible,
							closable : this.closable,
							height : this.height,
							iconCls : this.iconCls || 'view',
							width : this.width,
							closeAction : 'destroy',
							hideMode : 'offsets',
							constrain : true,// 设置为true让窗口不能拖出浏览器范围
							minimizable : this.minimizable,
							maximizable : this.maximizable,
							animCollapse : this.animCollapse,
//							animateTarget : Ext.getDom("windowCloseId")
//									|| Ext.getBody(),
							html : this.html,
							listeners : this.listeners,
							x : DataUtil.isEmpty(this.x) ? (document.body.clientWidth - this.width) / 2
									: this.x,
							y : DataUtil.isEmpty(this.y) ? (document.body.clientHeight - this.height) / 2
									: this.y,
							// border : this.border,
							modal : this.modal,
							buttonAlign : this.buttonAlign,
							autoScroll : this.autoScroll,
							autoDestroy : true,
							draggable : this.draggable
						};
						if (!DataUtil.isEmpty(this.buttons)) {
							winConf.buttons = this.buttons;
						}
						if (this.baseCls != null) {
							if (this.baseCls == "") {
								winConf.baseCls = "";
							} else {
								winConf.baseCls = this.baseCls;
							}
						}

						this.extObject = Ext.create("Ext.window.Window",
								winConf);
						this.extObject.show();
						this.extObject
								.on(
										'resize',
										function(item, width, heigth) {
											if (me.pageObject) {
												DataUtil
														.each(
																me.pageObject.componets,
																function(
																		componet) {
																	if (componet.widthPercent) {
																		componet
																				.setWidth((width - 3)
																						* componet.widthPercent);
																		if (componet.resetHight) {
																			componet
																					.resetHight();
																		}
																	}
																	if (componet.heightPercent) {
																		componet
																				.setHeight((heigth - 40)
																						* componet.heightPercent);
																		if (componet.resetHight) {
																			componet
																					.resetHight();
																		}
																	}
																});
											}
										});

					},
					/**
					 * 窗口渲染之前，先渲染页面对象 私有方法
					 */
					renderPageObject : function() {
						if (this.isRenderd != true) {
							if (this.oldrender) {
								this.oldrender();
							}
							if (this.pageObject) {
								this.pageObject.render();
							}
							this.isRenderd = true;
						}
					},
					/**
					 * 关闭窗口
					 * 
					 */
					close : function() {
						this.extObject.close();
					},
					/**
					 * 事件注册
					 * 
					 * @param event:事件类型
					 *            callback回调方法
					 * 
					 */
					on : function(event, callback) {
						this.extObject.on(event, callback);
					}
				});