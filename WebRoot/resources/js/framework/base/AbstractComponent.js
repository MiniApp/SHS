/**
 * 框架组件抽象类 定义组件创建的流程,组件的创建主要由以下几步组成 1:将参数拷贝到组件, 2:检查参数合法性, 3:构建组件前处理, 4:构建组件,
 * 5:组件构建完成后处理
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-06-25
 * @class base.AbstractComponent
 * @constructor
 * @param{Object} config
 */
Ext.define('base.AbstractComponent', {
			/**
			 * 组件ID,默认AbstractComponent
			 * 
			 * @type String
			 */
			id : '',
			/**
			 * 组件类型,默认component
			 * 
			 * @type String
			 */
			type : 'component',
			/**
			 * 组件扩展对象,默认当前组件
			 * 
			 * @type
			 */
			extObject : this,
			/**
			 * 回调函数
			 */
			callback : Ext.emptyFn(),
			constructor : function(config) {
				Ext.apply(this, config);
				try {
					if (this.parentObj) {
						if (this.parentObj.componets) {// 将组件注册到组件父对象的组件属性中
							this.parentObj.componets.push(this)
						} else {
							this.parentObj.componets = [this];
						}
						if (this.type != 'Window') {
							// if (Ext.isEmpty(this.region)) {// 为组件自动设置宽度和高度
							// if (Ext.isEmpty(this.widthPercent)) {
							// MsgUtil.error("组件构造错误,",
							// '必须提供参数widthPercent');
							// return;
							// }
							// if (Ext.isEmpty(this.heightPercent)) {
							// MsgUtil.error("组件构造错误",
							// '必须提供参数heightPercent');
							// return;
							// }
							if (this.parentObj.parent
									&& this.parentObj.parent.type == 'Window') {
								if (this.widthPercent) {
									this.width = (this.parentObj.parent.extObject
											.getWidth() - 3)
											* this.widthPercent;
								}
								if (this.heightPercent) {
									this.height = (this.parentObj.parent.extObject
											.getHeight() - 40)
											* this.heightPercent;
								}
							} else {
								if (this.parentObj.parent
										&& this.parentObj.parent.extObject) {
									if (this.widthPercent) {
										this.width = (this.parentObj.parent.extObject
												.getWidth() - 3)
												* this.widthPercent;
									}
									if (this.heightPercent) {
										this.height = (this.parentObj.parent.extObject
												.getHeight() - 3)
												* this.heightPercent;
									}
								}
							}
							// }
						}
					}
					this.checkConfig();
					this.checkPurview();
					this.beforeBuild();
					this.build();
					this.afterBuild();
				} catch (exception) {
					this.handleException(exception);
				}
			},
			/**
			 * 模板方法：检查配置参数,待子类覆盖
			 * 
			 * @template
			 * @protected
			 */
			checkConfig : Ext.emptyFn,
			/**
			 * 模板方法：权限检查,包括按钮权限等在此处理
			 * 
			 * @template
			 * @protected
			 */
			checkPurview : function() {
				var me = this;
				//检查buttons 按钮
				this.buttons = this._filterButons(this.buttons);
				//检查tbar 按钮
				this.tbar = this._filterButons(this.tbar);
				//检查bbar 按钮
				this.bbar = this._filterButons(this.bbar);
			},
			/**
			 * 模板方法：构建组件前处理,待子类覆盖
			 * 
			 * @template
			 * @protected
			 */
			beforeBuild : Ext.emptyFn,
			/**
			 * 模板方法：构建组件,待子类覆盖
			 * 
			 * @template
			 * @protected
			 */
			build : Ext.emptyFn,
			/**
			 * 模板方法：构建组件后处理,先执行回调函数,待子类覆盖后执行之类中afterBuild方法,子类afterBuild必须现在调用this.callParent();
			 * 
			 * @template
			 * @protected
			 */
			afterBuild : function() {
				if (Ext.isFunction(this.callback)) {
					this.callback(this);
				}
			},
			setWidth : function(width) {
				if (this.extObject && this.extObject.setWidth) {
					this.extObject.setWidth(width)
				}
			},
			setHeight : function(height) {
				if (this.extObject && this.extObject.setHeight) {
					this.extObject.setHeight(height);
					if(this.type=='Panel'){
						this.resetHight();
					}
				}
			},
			getHeight : function() {
				if (this.extObject && this.extObject.getHeight) {
					this.extObject.getHeight()
				}
			},
			getWidth : function() {
				if (this.extObject && this.extObject.getWidth) {
					this.extObject.getWidtht()
				}
			},
			getFirstParent : function(parentObj) {
				if (parentObj && parentObj.parent) {
					if (parentObj.parent.parentObj) {
						if (parentObj.parent.type == 'Window') {
							return parentObj.parent;
						}
						return this.getFirstParent(parentObj.parent.parentObj);
					} else {
						return parentObj.parent;
					}
				}
			},
			/**
			 * 异常处理
			 * 
			 * @param {}
			 *            exception
			 * @private
			 */
			handleException : function(exception) {
				MsgUtil
						.error(exception.title || this.type+' 组件构建异常', exception.msg
										|| exception, exception.option
										|| Ext.emptyFn());
			},
			/**
			 * 过滤指定页面原始按钮数组,检查权限,返回新的按钮数组
			 * @param {} originButtons 原始按钮数组
			 * @return {} 
			 * @private
			 */
			_filterButons : function(originButtons){
				var me = this;
				var newBtns = [];
				DataUtil.each(originButtons, function(btn) {
					if(!(btn.id && null == me.parentObj.btnMap.get(btn.id))){//如果定义了显示按钮对象，且与页面控件按钮ID相等,则显示
						newBtns.push(btn);
					}
				});
				return newBtns;
			}
		});