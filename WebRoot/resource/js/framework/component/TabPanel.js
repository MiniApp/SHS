/**
 * TabPanel组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.TabPanel
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID config->items
 *                要添加的tabpanel中的选项卡的配置对象，定义选项卡配置时必须提供componentClassName属性，通过该属性来确定子选项卡的类型并创建子选项卡
 *                config->activeTab: 当前要激活的选项卡的id或选项卡序号 config->renderTo:
 *                渲染到的Dom的id
 *                @example
 *                ObjectUtil.create("component.TabPanel", {
			id : 'centerPanel',
			region : 'center',
			items : [{
				componentType : 'panel',
				id : 'vipManagerWelcome',
				title : '首页',
				closable : true,
				frame : false,
				pageObject : ObjectUtil.create('ocrm.pages.common.WelcomPage',
						{
							id : 'WelcomPage'
						})
			}],
			activeTab : 'vipManagerWelcome',
			callback : function(tabPanel) {
			}
		});
 */
ObjectUtil.define("component.TabPanel", {
	extend : 'base.AbstractComponent',
	type : 'TabPanel',

	/**
	 * 当前要激活的选项卡的id
	 * 
	 * @type String
	 */
	activeTab : null,

	/**
	 * 要添加的tabpanel中的选项卡的配置对象
	 * 
	 * @type Array
	 */
	items : null,

	/**
	 * tabpanel中的所有组件对象
	 * 
	 * @type Array
	 */
	componets : null,

	/**
	 * 渲染到的Dom的id
	 * 
	 * @type String
	 */
	renderTo : null,

	/**
	 * 在布局中的方位
	 * 
	 * @type String
	 */
	region : '',
	/**
	 * 标题
	 * 
	 * @type String
	 */
	title : '',
	/**
	 * tab标签位置
	 * 
	 * @type String
	 */
	tabPosition : '',
	/**
	 * 标签关闭响应事件
	 */
	onTabClose : Ext.emptyFn(),
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
		if (DataUtil.isEmpty(this.activeTab) && !DataUtil.isEmpty(this.items)) {
			this.activeTab = this.items[0].id;// 默认激活第0个
		}

		this.activeCount = 0;// 初始化激活选择卡，被激活次数
		var newItems = [];
		if (!this.componets) {
			this.componets = [];
		}
		DataUtil.each(this.items, function(item) {
					item.parent = me;
					if (item.type == 'Panel' && null == item.extObject) {
						var p = Ext.create('Ext.panel.Panel', {
									id : item.id,
									title : item.title,
									height : me.height,
									width : me.width,
									html : "<div id='" + item.id
											+ "ContentDiv'></div>"
								});
						if (item.id.indexOf(me.activeTab) != -1) {
							me.activeTab = item.id;
							me.activeItem = item;// 初始化要激活的选择对象
						}
						item.extObject = p;
						item.setDisabled = function(disable) {
							p.setDisabled(disable);
						}
						newItems.push(p);
					} else {
						newItems.push(item.extObject);
						item.id = item.extObject.id;
					}
					me.componets.push(item);
				});
		this.items = newItems;
		return true;
	},
	/**
	 * 构建组件
	 * 
	 * @Override
	 */
	build : function() {
		var me = this;
		this.extObject = ObjectUtil.create("Ext.tab.Panel", {
					renderTo : this.renderTo,
					id : this.id,
					region : this.region,
					title : this.title,
					width : this.width,
					height : this.height,
					border : false,
					tabPosition : this.tabPosition,
					defaults : {
						autoScroll : true,
						bodyPadding : 0
					},
					tabBar:{
						height:25,
						defaults:{
							height:22
						}
					},
					items : this.items,
					activeTab : this.activeTab,
					listeners : {
						"remove" : function(ct, panel) {
							if (me.onTabClose) {
								if (panel.id == me.onTabClose.onTabClosePanelId) {
									if (Ext
											.isFunction(me.onTabClose.onTabCloseFun)) {
										Ext.Function
												.bind(
														me.onTabClose.onTabCloseFun,
														me)();
									}
								}
							}
						},
						"afterlayout" : function() {
							if (me.id != 'centerPanel') {
								if (me.activeItem && me.activeCount == 0) {// 当激活选择存在时，兼容以前而加的判断
									me.reloadPageObject(me.activeItem);
									me.activeCount = me.activeCount + 1;
								}
							}
						},
						"tabchange" : function(cur, card, previous) {
							if (me.id != 'centerPanel') {
								me.reloadActivedTab(me.componets, card, me);
							}
							return true;
						}
						
					}
				});
	}
	,
	/**
	 * 私有方法 刷新当前激活的页面
	 * 
	 */
	reloadActivedTab : function(componets, activedTab, curObj) {
		var me = this;
		DataUtil.each(componets, function(componet) {
					if (componet.id == activedTab.id) {
						if (componet.type == 'Panel') {
//							curObj.getItem(componet.id).setIconCls('tab-curr-yellow');
							if (!DataUtil.isEmpty(curObj.activeTab)
									&& curObj.activeTab == componet.id
									&& curObj.activeCount == 1) {// 初始化时激活的选项卡应为在
								// afterrender
								// 事件中已经渲染了，所有在tabchange
								// 事件中忽略改选项卡的第一次渲染
								curObj.activeCount = curObj.activeCount + 1;
								return;
							}
							if (HtmlUtil.getDom(componet.id + "ContentDiv")) {// 为了兼容以前，加判断，如果是以前的方式，该dom就不存在
								me.reloadPageObject(componet);
							}
						} else if (componet.type == 'TabPanel') {// 当类型是TabPanel的时候，对TabPanel的子选项页要做刷新
							//curObj.getItem(componet.id).setIconCls('tab-curr-red');
							me.reloadActivedTab(componet.componets, componet
											.getActiveTab(), componet);
                          
						}
					}else{
						curObj.getItem(componet.id).setIconCls('');
					}
				})
	},

	/**
	 * 私有方法 重新创建并渲染页面对象
	 * 
	 */
	reloadPageObject : function(componet) {
		var pageObj = componet.parentObj.create(componet.className,
				componet.classConfig);
		componet.pageObject = pageObj;
		componet.pageObject.parent = {
			id : componet.id,
			extObject : componet.extObject,
			parent : this
		};
		componet.extObject.on('resize', function(pa, width, heigth) {
			if (pageObj) {
				DataUtil.each(pageObj.componets, function(componet1) {
					if (componet1.widthPercent) {
						componet1
								.setWidth((width - 3) * componet1.widthPercent);
						if (componet1.resetHight) {
							componet1.resetHight();
						}
					}
					if (componet1.heightPercent) {
						componet1.setHeight((heigth - 3)
								* componet1.heightPercent);
						if (componet1.resetHight) {
							componet1.resetHight();
						}
					}
				});

				if (pageObj.reSize) {
					pageObj.reSize(width, heigth);
				}
			}
		});
		HtmlUtil.getDom(componet.id + "ContentDiv").innerHTML = pageObj
				.genHtml();
		pageObj.render();
	},
	/**
	 * 获取TabPanel中的子选项卡总数
	 * 
	 */
	getCount : function() {
		return this.extObject.items.length;
	},
	/**
	 * 激活指定的选项卡
	 * 
	 * @param item:要激活的选项卡id
	 * 
	 */
	setActiveTab : function(item) {
		this.extObject.setActiveTab(item);
	},
	/**
	 * 获取激活的选项卡
	 * 
	 * 
	 */
	getActiveTab : function() {
		return this.extObject.getActiveTab();
	},
	/**
	 * 添加选项卡对象到TabPanel
	 * 
	 * @param item:新选项卡的组件对象
	 * 
	 */
	add : function(item) {
		item.parent = this;
		this.extObject.add(item.extObject);
		item.id = item.extObject.id;
		this.componets.push(item);
	},
	/**
	 * 获取指定的选项卡对象
	 * 
	 * @param item:要获取的选项卡的id
	 * 
	 */
	getItem : function(item) {
		return this.extObject.getComponent(item);
	},
	/**
	 * 为组件添加事件
	 * 
	 * @param event:事件类型
	 *            callback回调函数
	 * 
	 */
	on : function(event, callback) {
		this.extObject.on(event, callback);
	}
});