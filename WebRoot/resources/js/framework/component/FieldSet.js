/**
 * FieldSet组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.FieldSet
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object}
 *          @example
 *          ObjectUtil.create('component.FieldSet', {
					renderTo : this.ids.awokeGridDiv,
					title : '是否提醒',
					checkboxToggle : true,
					collapsed : true,
					items : [tbgGrid],
					listeners : {
						beforecollapse : function(oPanel) {
						},
						beforeexpand : function(oPanel) {
						}
					}
				});
 * 
 */
ObjectUtil.define("component.FieldSet", {
			extend : 'base.AbstractComponent',
			type : 'FieldSet',
			renderTo : null,
			title : null,
			checkboxToggle : true,
			items : null,
			listeners : null,
			collapsed : false,
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
			beforeBuild : function() {
				var newItems = [];
				DataUtil.each(this.items, function(item) {
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
				this.extObject = ObjectUtil.create('Ext.form.FieldSet', {
							id : this.id,
							renderTo : this.renderTo,
							title : this.title,
							contentEl : this.contentEl,
							checkboxToggle : this.checkboxToggle,
							items : this.items,
							listeners : this.listeners
						})
				if (this.collapsed) {
					this.extObject.toggle();
					var input = this.extObject.getEl().query('input');
					if (input) {
						input[0].click();
					}
				}
			},
			collapsed : function() {
				var input = this.extObject.getEl().query('input');
				if (input) {
					input[0].click();
				}
			},
			expand : function() {
				var input = this.extObject.getEl().query('input');
				if (input) {
					input[0].click();
				}
			}
		});
