/**
 * View组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.View
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config->width: 组件ID config->format 格式 config->value: 默认值
 *                config->renderTo: 渲染到的Dom的id config->disabled:是否禁用
 *                @example
 * 
 * 
 * var view = ObjectUtil.create("component.View", {
					items : [panle, tabpanl, tree]
				});
 */
Ext.define("component.View", {
			extend : 'base.AbstractComponent',
			type : 'View',

			constructor : function(config) {
				Ext.apply(this, config);
				this.callParent();
			},
			/**
			 * 要添加到view中的子组件配置
			 * 
			 * @type Array
			 */
			items : null,
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
				var newItems = [];
				var haserror = false;
				DataUtil.each(this.items, function(item) {
							newItems.push(item.extObject);
						});
				if (haserror) {
					return false;
				}
				this.items = newItems;
				return true;
			},
			/**
			 * 构建组件
			 * 
			 * @Override
			 */
			build : function() {
				this.extObject = Ext.create("Ext.container.Viewport", {
							layout : 'border',// 布局采用border
							id:this.id,
							enableTabScroll : true,// 滚动
							defaultType : 'panel',
							items : this.items
						});
			}
		});
