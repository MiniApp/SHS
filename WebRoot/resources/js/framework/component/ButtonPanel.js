/**
 * ButtonPanel组件 
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-08-09
 * @class component.ButtonPanel
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} 
 *                @example
 *                this.buttons = [{xtype : 'button',
						handler : ObjectUtil.bind(owner.myArticle,owner),
						text : '我的文章'
					}, {
						xtype : 'button',
						handler : ObjectUtil.bind(owner.myDoc,owner),
						text : '我的文档'
					}]
               this.create("component.ButtonPanel", {
					renderTo : this.ids.IndexRightButtonGroupDiv,
					hasBackGroundColor : false,
					widthPercent : 1,
					heightPercent : 1,
					items : this.buttons
				});
 */
Ext.define('component.ButtonPanel', {
	extend : 'base.AbstractComponent',
	alias : 'widget.ButtonPanel',
	type : 'ButtonPanel',
	/**
	 * 面板子项(必填) 子项对象参数：title：标题 contentEl：内容节点ID pageObject：页面对象
	 * 
	 * @type Array
	 */
	items : [],
	/**
	 * 组件渲染ID(必填)
	 * 
	 * @type String
	 */
	renderTo : '',
	/**
	 * 是否显示折叠按钮,默认false
	 * 
	 * @type Boolean
	 */
	collapsible : false,
	/**
	 * 标题
	 * 
	 * @type String
	 */
	title : '',
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
		if (Ext.isEmpty(this.renderTo)) {
			ExceptionUtil.throwFramworkException({
						msg : '参数：renderTo必须传入值!'
					});
		}
		if (this.items.length <= 0) {
			ExceptionUtil.throwFramworkException({
						msg : '参数：items必须传入值!'
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
					layout : {
						type : 'vbox',
						padding : '5',
						align : 'stretch'
					},
					items : this.items,
					listeners : this.listeners
				});
	}
});