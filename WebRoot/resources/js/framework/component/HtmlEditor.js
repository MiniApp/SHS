/**
 * HtmlEditor组件
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-08-10
 * @class component.HtmlEditor
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object}
 *          @example
 *          this.create("component.HtmlEditor", {
			renderTo : this.ids.articlePanelContentId_editor,
			id :'articleEditorId',
			heightPercent : 0.6,
			widthPercent : 0.85
		});
 */
Ext.define('component.HtmlEditor', {
			extend : 'base.AbstractComponent',
			alias : 'widget.HtmlEditor',
			type : 'HtmlEditor',
			/**
			 * 组件渲染ID(必填)
			 * 
			 * @type String
			 */
			renderTo : '',
			/**
			 * 宽度,默认NULL,自适应宽度
			 * 
			 * @type Number
			 */
			width : 300,
			/**
			 * 高度,默认300
			 * 
			 * @type Number
			 */
			height : 300,
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
				var editor = Ext.create('Ext.form.HtmlEditor', {
							width : this.width,
							height : this.height,
							renderTo : this.renderTo
						});
				this.extObject = editor;
			},
			/**
			 * 取得编辑器的值
			 * @return {}
			 */
			getValue : function(){
				return this.extObject.getValue();
			},
			/**
			 * 设置编辑器的值
			 * @param {} value
			 */
			setValue: function(value) {
				this.extObject.setValue(value);
			}
		});