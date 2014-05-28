/**
 * 当前操作员所有角色列表 执行角色切换,设置默认登录角色，修改用户密码
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("crm.pages.mainPage.RoleAndPasswordManager",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/mainPage/RoleAndPasswordManager.html",// 页面url地址
			/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：wanghua
			 * @编码日期：2012-07-18
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
				var title = "密码管理";
				if (DataUtil.getUserInfo().roleCount > 1) {
					title = '角色管理';
				}
				this.create('component.Panel', {
					title : title,
					renderTo : this.ids.roleAndPsswordManagerDiv,
					contentEl : this.ids.roleAndPsswordManagerContentDiv,
					hasBackGroundColor : true,
					width : 345,
					height : 280,
					pageObject : owner.create(
							'crm.pages.mainPage.RoleAndPassworUpdate', {
								id : 'RoleAndPassworUpdate',
								corpersonky : this.corpersonky
							})
				});
			}
		});