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
 *          @example
 *          this.create('component.Button', {
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
Ext.define('component.ToolBar', {
			extend : 'base.AbstractComponent',
			type : 'ToolBar',
			/**
			 * 工具栏中的按钮组件
			 * [{text:'xx',tooltip:'xx',handler:function(){},iconCls:'view'}]
			 * 
			 * @type Array
			 */
			items : null,
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
				if (DataUtil.isEmpty(this.items)) {
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
				this.extObject = ObjectUtil.create("Ext.toolbar.Toolbar", {
							items : this.items,
							layout : {
								overflowHandler : "Menu"
							}
						});
			}
		});