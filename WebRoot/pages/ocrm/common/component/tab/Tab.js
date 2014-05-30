/**
 * tab标签窗口
 * 
 * 
 * @author DuanYong
 * @since 2012-07-31
 * @class business.tab.Tab
 * @extends base.PageObject 参数： 
 * tabs : [{id:'itemId',text:'子项描述',className:'子类对象',children:[{id:'itemId',text:'子项描述',className:'子类对象',config:{id:'itemId'}},{id:'itemId',text:'子项描述',active:true,className:'子类对象',config:{id:'itemId'}}]}],
 *         active 表示激活当前标签 
 * id : 窗口主键,
 */
ObjectUtil.define("business.tab.Tab", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/component/tab/Tab.html",
			/**
			 * 配置文件
			 */
			initData : function() {
				if (!this.tabs) {
					ExceptionUtil.throwBusinessException({
								msg : '窗口标签项不能为空!'
							});
				}

				if (!this.id) {
					ExceptionUtil.throwBusinessException({
								msg : '页面ID为空!'
							});
				}
			},

			/**
			 * 初始化组件
			 */
			initCmp : function() {
				BusinessUtil.createTabPanel({
					tabs : this.tabs,
					id : this.id,
					widthPercent : this.widthPercent,
					heightPercent : this.heightPercent,
					renderTo : this.ids.tabWindow,
					parentObj : this
				});
			}
		});