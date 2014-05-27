/**
 * AccordionPanel组件 注意： 1：参数items中,对象参数contentEl和pageObject不能同时为空.
 * contentEl为当前html页面中div的id. pageObject为页面对象.
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-07-02
 * @class component.AccordionPanel
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID(必填) config->items: 面板子项(必填) 子项对象参数：title：标题
 *                contentEl：内容div节点ID pageObject：页面对象 config->renderTo:
 *                组件渲染ID(必填) config->collapsible: 是否显示折叠按钮,默认true config->title:
 *                标题 config->width: 组件宽度 config->height: 高度,默认300
 *                config->listeners: 监听事件对象
 * @example this.create( "component.AccordionPanel", { id :
 *          this.ids.creditinfoDiv, widthPercent : 1, heightPercent : 1,
 *          renderTo : this.ids.creditinfoDiv, items : [ this.create(
 *          "component.Panel", { title : '<span height="20" align="left"
 *          style="font-weight: bolder;">贷记卡汇总信息</span>', contentEl :
 *          this.ids.djInfo, pageObject : this.create(
 *          'crm.pages.ocrm.person.customer.cusDetailInfo.cusBaseInfo.cusCredit.CreditDJInfoList', {
 *          id : 'CreditDJInfoList', customerky : this.customerky, authority :
 *          this.authority }) }), this.create( "component.Panel", { title : '<span
 *          height="20" align="left" style="font-weight: bolder;">信用卡汇总信息</span>',
 *          contentEl : this.ids.xyInfo, pageObject : this.create(
 *          'crm.pages.ocrm.person.customer.cusDetailInfo.cusBaseInfo.cusCredit.CreditXYInfoList', {
 *          id : 'CreditXYInfoList', customerky : this.customerky, authority :
 *          this.authority }) }), this.create( "component.Panel", { title : '<span
 *          height="20" align="left" style="font-weight: bolder;">银行贷款汇总信息</span>',
 *          contentEl : this.ids.dkInfo, pageObject : this.create(
 *          'crm.pages.ocrm.person.customer.cusDetailInfo.cusBaseInfo.cusCredit.CreditDKInfoList', {
 *          id : 'CreditDKInfoList', customerky : this.customerky, authority :
 *          this.authority }) }) ] });
 */
Ext.define('component.AccordionPanel', {
	extend : 'base.AbstractComponent',
	alias : 'widget.AccordionPanel',
	type : 'AccordionPanel',
	/**
	 * panel对象数组
	 * 
	 * @type Array
	 */
	items : [],
	/**
	 * 组件渲染ID(必填)
	 * 
	 * @type String
	 */
	renderTo : null,
	region : null,
	split : null,
	collapsible : null,
	/**
	 * 是否显示折叠按钮,默认true
	 * 
	 * @type Boolean
	 */
	collapsible : null,
	/**
	 * 标题
	 * 
	 * @type String
	 */
	title : null,
	/**
	 * 宽度,默认NULL,自适应宽度
	 * 
	 * @type Number
	 */
	width : null,
	/**
	 * 高度,默认300
	 * 
	 * @type Number
	 */
	height : 300,
	/**
	 * 监听事件对象
	 * 
	 * @type Object
	 */
	listeners : {},
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
		if (this.id == 'AbstractComponent') {
			ExceptionUtil.throwFramworkException({
				msg : '参数：id必须传入值!'
			});
		}
	},
	/**
	 * 组件创建前处理
	 * 
	 * @Override
	 * @return {Boolean}
	 */
	beforeBuild : function() {
		var me = this;
		var newItems = [];
		Ext.each(this.items, function(item) {
			if (!item.extObject) {
				ExceptionUtil.throwFramworkException({
					msg : 'AccordionPanel子面板对象不是component.Panel对象,请检查'
				});
			}
			newItems.push(item.extObject);
		});
		this.items = newItems;
	},
	/**
	 * 构建组件
	 * 
	 * @Override
	 */
	build : function() {
		var me = this;
		this.extObject = Ext.create("Ext.panel.Panel", {
			id : this.id,
			title : this.title,
			width : this.width,
			height : this.height,
			collapsible : this.collapsible,
			animCollapse : true,
			renderTo : this.renderTo,
			layout : 'accordion',
			items : this.items,
			region : this.region,
			listeners : this.listeners,
			split : this.split,
			collapsible : this.collapsible
		});
		this.extObject.on('resize', function(item, width, heigth) {
			if (me.items) {
				DataUtil.each(me.items, function(item) {
					if (item.pageObject) {
						DataUtil.each(item.pageObject.componets, function(
								componet) {
							if (componet.widthPercent) {
								componet.setWidth((width - 3)
										* componet.widthPercent);
								if (componet.resetHight) {
									componet.resetHight();
								}
							}
							if (componet.heightPercent) {
								componet.setHeight((heigth - 3)
										* componet.heightPercent);
								if (componet.resetHight) {
									componet.resetHight();
								}
							}
						});
					}
				});
			}
		});

	},
	add : function(item) {
		this.extObject.add(item.extObject);
	},
	addAll : function(items) {
		var extItems = [];
		for ( var i = 0; i < items.length; i++) {
			extItems.push(items[i].extObject);
		}
		this.extObject.add(extItems);
	},
	removeAll : function() {
		this.extObject.removeAll(true);
	},
	/**
	 * 渲染页面对象
	 */
	renderPageObject : function() {
		if (this.pageObject) {
			this.pageObject.render();
		}
	}
});