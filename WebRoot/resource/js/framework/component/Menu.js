/**
 * Menu组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.Menu
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->id: 组件ID config->height 高度 config->width: 宽度
 *                config->renderTo: 渲染到的Dom的id
 *                @example
 *                ObjectUtil.create("component.Menu", {
					id : 'mainMenu',
					renderTo : this.ids.menuPanel,
					height : 30,
					width : window.screen.width - 10
				});
 */

ObjectUtil.define("component.Menu", {
			extend : 'base.AbstractComponent',
			type : 'Menu',
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
				if (Ext.isEmpty(this.renderTo)) {
					Ext.MessageBox.show({
								title : '参数错误',
								msg : '参数：renderTo必须传入值!',
								buttons : Ext.MessageBox.OK
							});
					return false;
				}
				return true;
			},
			/**
			 * 组件创建前处理
			 * 
			 * @Override
			 */
			beforeBuild : function() {
				return true;
			},
			/**
			 * 构建组件
			 * 
			 * @Override
			 */
			build : function() {
				this.extObject = ObjectUtil.create("Ext.toolbar.Toolbar", {
							id : this.id,
							height : this.height,
							width : this.width,
							items : this.items,
							baseCls : this.baseCls
									|| 'ocrm-toolbar-gray x-small-editor',
							layout : {
								overflowHandler : "Menu"
							}
						});
				this.extObject.render(this.renderTo);
			},
			/**
			 * 添加子菜单
			 * 
			 * @param item:子菜单配置对象
			 * 
			 */
			add : function(item) {
				this.extObject.add(item);
			}
		});
