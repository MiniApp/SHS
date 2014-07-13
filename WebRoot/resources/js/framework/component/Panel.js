/**
 * Panel组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.Panel
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID config->title 标题 config->autoScroll: 是否自动滚动条
 *                config->collapsible: 是否可折叠 config->closable: 是否可关闭
 *                config->height: 组件高度 config->width: 宽度 config->renderTo:
 *                Panel渲染到的Dom的id config->contentEl: Panel内容渲染到的Dom的id
 *                config->buttons: 包含的按钮的配置，按钮包含属性：text: 按钮上显示的文本
 *                iconCls：按钮的图片样式 handler：点击按钮后的回调函数
 * 
 * config->pageObject: 包含的页面对象 config->callback: 组件渲染完成后的回调方法，回调时传入当前panel组件对象
 * config->listeners:监听的事件
 * @example ObjectUtil.create('component.Panel', { contentEl :
 *          this.ids.updateOuterdetail, frame : false, renderTo :
 *          this.ids.updateOuter, buttons : [{ text : '确定', iconCls : 'save',
 *          handler : function() { owner.updateOuterCustomer(); } }],
 *          callback:functio(panel){ alert(panel); } });
 */
ObjectUtil
		.define(
				"component.Panel",
				{
					extend : 'base.AbstractComponent',
					type : 'Panel',
					/**
					 * 标题
					 * 
					 * @type String
					 */
					title : null,
					/**
					 * 布局中的位置
					 * 
					 * @type String
					 */
					region : '',
					/**
					 * 在布局中时是否有分割条,默认为false
					 * 
					 * @type Boolean
					 */
					split : false,
					/**
					 * 背景色
					 * 
					 * @type Boolean
					 */
					hasBackGroundColor : true,
					/**
					 * 是否自动滚动条
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
					 * 高度,默认400
					 * 
					 * @type Number
					 */
					height : null,
					/**
					 * 宽度,默认300
					 * 
					 * @type Number
					 */
					width : null,
					/**
					 * 渲染到的Dom的id
					 * 
					 * @type String
					 */
					renderTo : '',
					/**
					 * 内容渲染到的Dom的id
					 * 
					 * @type String
					 */
					contentEl : '',
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
					 * @type Object
					 */
					pageObject : null,
					/**
					 * 顶部工具栏
					 * 
					 * @type Array
					 */
					tbar : null,
					/**
					 * 底部工具栏
					 * 
					 * @type Array
					 */
					bbar : null,

					/**
					 * 布局方式
					 * 
					 * @type Array
					 */
					layout : null,
					/**
					 * 面板是否被禁用
					 * 
					 * @type Boolean
					 */
					disabled : false,
					/**
					 * 按钮是否包含在面板中
					 * 
					 * @type Boolean
					 */
					buttonInPanel : null,
					margin : null,
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
						//20130411删除所有查询页面中，查询的title“查询条件”，再次对title值判断，若title中含“查询条件”则不产生title---------wuqihui
						if (!Ext.isEmpty(this.title)) {
							if (this.title.indexOf("查询条件") != -1) {
								this.title = null;
							}
						}
						var me = this;
						if (this.buttonInPanel != false) {
							this.buttonInPanel = true;
						}
						if (this.pageObject) {
							this.pageObject.parent = this;
							this.html = this.pageObject.genHtml();
						}
						if (this.autoScroll != false) {
							this.autoScroll = true;
						}
						// 组装顶部工具栏
						var newTbars;
						if (!DataUtil.isEmpty(this.tbar)) {
							newTbars = [ '->' ];
							var i = 0;
							DataUtil.each(this.tbar, function(bar) {
								var newtbar = {};
								newtbar.text = bar.text;
								newtbar.tooltip = bar.tooltip;
								newtbar.id = bar.id;
								newtbar.handler = bar.handler;
								newtbar.hidden = bar.hidden;
								newtbar.iconCls = bar.iconCls;
								newTbars.push(newtbar);
								if (i < me.tbar.length - 1) {
									newTbars.push('-');
								}
								i++;
							});
							this.tbar = newTbars;
						}
						// 组装底部工具栏
						var newBbars;
						if (!DataUtil.isEmpty(this.bbar)
								|| !DataUtil.isEmpty(this.buttons)) {
							newBbars = [ '->' ];
							var i = 0;
							DataUtil.each(this.bbar, function(bar) {
								var newBbar = {};
								newBbar.text = bar.text;
								newBbar.tooltip = bar.tooltip;
								newBbar.handler = bar.handler;
								newBbar.iconCls = bar.iconCls;
								newBbar.hidden = bar.hidden;
								newBbars.push(newBbar);
								if (i < me.bbar.length - 1) {
									newBbars.push('-');
								}
								i++;
							});
							i = 0;
							DataUtil.each(this.buttons, function(button) {
								var newButton = {};
								newButton.iconCls = button.iconCls;
								newButton.text = button.text;
								newButton.id = button.id;
								newButton.tooltip = button.tooltip;
								newButton.hidden = button.hidden;
								newButton.handler = button.handler;
								newBbars.push(newButton);
								if (i < me.buttons.length - 1) {
									newBbars.push('-');
								}
								i++;
							});
							this.bbar = newBbars;
						}

						// 组装事件
						if (this.listeners) {
							if (this.listeners.beforerender) {
								this.oldrender = this.listeners.beforerender;
								this.listeners.beforerender = Ext.Function
										.bind(this.renderPageObject, this);
							} else {
								this.listeners.beforerender = Ext.Function
										.bind(this.renderPageObject, this);
							}
							this.listeners.delay = 1;
						} else {
							this.listeners = {
								beforerender : Ext.Function.bind(
										this.renderPageObject, this),
								delay : 1
							};
						}
						var defaultBodyStyle = CodeStringDefinition.SYSTEM_THEME_PANEL_BODY_STYLE_GRAY;// 背景灰色
						var defaultNoBodyStyle = 'background:#FFFFFF;';// 背景白色
						// 如果个性化主题配置存在,且样式不是默认样式
						if (null != window.systemConfig
								&& null != window.systemConfig.appearance
								&& null != window.systemConfig.appearance.theme
								&& window.systemConfig.appearance.theme.themeCode != CodeStringDefinition.SYSTEM_THEME_CODE_DEFAULT
								&& null != window.systemConfig.appearance.theme.panelBodyStyle) {
							defaultBodyStyle = window.systemConfig.appearance.theme.panelBodyStyle;
							defaultBodyStyle = defaultBodyStyle.split("|")
									.join(";");
							defaultNoBodyStyle = defaultBodyStyle;
						}
						if (this.hasBackGroundColor) {// 当hasBackGroundColor为true，采用下面代码设置背景色
							this.bodyStyle = 'background:#F7F7F7;';
						} else {
							this.bodyStyle = defaultNoBodyStyle;
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
						var config = {
							id : this.id,
							region : this.region,
							title : this.title,
							autoDestroy : true,
							frame : false,
							layout : this.layout,
							autoScroll : this.autoScroll,
							collapsible : false,
							closable : this.closable,
							height : this.height,
							width : this.width,
							hidden : this.hidden,
							renderTo : this.renderTo,
							contentEl : this.contentEl,
							html : this.html,
							split : this.split,
							listeners : this.listeners,
							value : this.value,
							bodyPadding : 0,
							bodyStyle : this.bodyStyle,
							disabled : this.disabled
						};
						if (this.margin != null) {
							config.margin = this.margin;
						}
						if (!DataUtil.isEmpty(this.tbar)) {
							config.tbar = ObjectUtil.create(
									"component.ToolBar", {
										items : this.tbar
									}).extObject;
						}
						if (!DataUtil.isEmpty(this.bbar)) {
							config.bbar = ObjectUtil.create(
									"component.ToolBar", {
										items : this.bbar
									}).extObject;
						}
						this.extObject = Ext.create("Ext.panel.Panel", config);
//						if (this.collapsible) {
//							this.extObject.on('expand', Ext.Function.bind(
//									this.resetHight, this));
//						}
						this.resetHight();
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
																				.setHeight((heigth - 3)
																						* componet.heightPercent);
																		if (componet.resetHight) {
																			componet
																					.resetHight();
																		}
																	}
																});

												if (me.pageObject.reSize) {
													me.pageObject.reSize(width,
															heigth);
												}
											}
										});
					},
					/**
					 * 重置panel高度
					 * 
					 * 私有方法
					 * 
					 */
					resetHight : function() {
						// 当前panel指定了renderTo参数时，设置面板panel高度，将按钮包含进来
					if (!DataUtil.isEmpty(this.renderTo) && this.buttonInPanel) {
						// 如果panel没有renderTo，是作为某个组件的子项时，在此执行该还代码会出错，所以加了判断，另外作为子组件时一般也不用设置button了
						this.extObject.body.setHeight(this.extObject
								.getHeight());

					}
				},
				/**
				 * panel渲染之前，先渲染页面对象 私有方法
				 */
				renderPageObject : function() {
					if (this.oldrender) {
						this.oldrender();
					}
					if (this.pageObject) {
						this.pageObject.render();
						// this.pageObject.doLayout();
				}
			},
			/**
			 * 为组件添加事件
			 * 
			 * @param event:事件类型
			 *            callback回调函数
			 * 
			 */
			on : function(event, callback) {
				this.extObject.on(event, Ext.Function.bind(callback, this));
			},
			/**
			 * 为组件添加工具按钮
			 * 
			 * @param Array
			 * 
			 */
			addTool : function(tools) {
				var newTools = [];
				DataUtil.each(tools, function(tool) {
					var newTool = {};
					newTool.id = tool.id;
					newTool.baseCls = tool.baseCls;
					newTool.handler = tool.handler;
					newTool.tooltip = tool.tooltip;
					newTools.push(newTool);
				});
				this.extObject.addTool(newTools);
			},

			/**
			 * 设置面板是否被禁用
			 * 
			 * @param Boolean
			 * 
			 */
			setDisabled : function(isDisabled) {
				this.extObject.setDisabled(isDisabled);

			},
			/**
			 * 折叠面板
			 * 
			 * @param
			 * 
			 */
			collapse : function() {
				this.extObject.collapse();

			},

			/**
			 * 展开面板
			 * 
			 * @param
			 * 
			 */
			expand : function() {
				this.extObject.expand();

			},

			/**
			 * 设置panel的标题
			 * 
			 * @param
			 * 
			 */
			setTitle : function(title) {

				this.extObject.setTitle(title);

			}
				});
