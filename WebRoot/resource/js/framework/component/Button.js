/**
 * Button组件 
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-08-09
 * @class component.Button
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} 
 *                @example
 *                this.create('component.Button', {
					text : '查询',
					renderTo : this.ids.buttonId,
					iconCls : 'query',
					handler : function() {
						if (owner.validation()) {
							owner.getDefaultSearchResultList();
						}
					}
				});
 */
Ext.define('component.Button', {
	extend : 'base.AbstractComponent',
	alias : 'widget.SimpleButton',
	type : 'SimpleButton',
	/**
	 * 子项对象
	 * 
	 * @type Array
	 */
	menu : null,
	/**
	 * 组件渲染ID
	 * 
	 * @type String
	 */
	renderTo : '',
	/**
	 * 标题
	 * 
	 * @type String
	 */
	text : '',
	/**
	 * 按钮样式
	 * @type String
	 */
	iconCls : '',
	/**
	 * 宽度,默认NULL,自适应宽度
	 * 
	 * @type Number
	 */
	width : null,
	/**
	 * 高度,默认35
	 * 
	 * @type Number
	 */
	height : 35,
	/**
	 * 处理事件
	 * @type 
	 */
	handler : null,
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
	var btn = Ext.create('Ext.button.Button', {
          text: this.text,
          renderTo: this.renderTo,
          iconCls : this.iconCls,
          width : this.width,
          height : this.height,
          listeners : this.listeners,
          menu : this.menu,
          handler: this.handler
      });
      btn.getEl().replace(Ext.get(this.renderTo));
      this.extObject = btn;
	}
});