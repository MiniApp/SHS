if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj) {
		for ( var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	};
};
// 开发期间，放开复制粘贴及系统右键功能
//禁止鼠标右键
//document.oncontextmenu = function() {
//	MsgUtil.alert("系统提示", "系统屏蔽右键菜单");
//	return false;
//};
//document.onkeydown = function(target) {// 屏蔽退回键
//	var keyCode = 0;
//	var evenKey=true;
//	// 兼容IE和Firefox
//	if (window.event) {
//		keyCode = window.event.keyCode;
//		evenKey=window.event.ctrlKey;
//	} else if (target) {
//		keyCode = target.which;
//		evenKey=target.ctrlKey;
//	}
//	var allowedFlag = true;
//	if (keyCode === 8) {
//		// 判断是否在文本框类
//		var activeDoc = document.activeElement || event.currentTarget;
//		if (activeDoc) {
//			var tagName = activeDoc.tagName.toLowerCase();
//			// 是否可编辑属性
//			var editAble = activeDoc.readOnly || activeDoc.disabled;
//			// 当为可编辑的输入框时，允许退回键
//			if (tagName != 'undefined'
//					&& (tagName == 'textarea' || tagName == 'input')
//					&& editAble == false) {
//				allowedFlag = true;
//			} else {
//				allowedFlag = false;
//			}
//		}
//	}else if (evenKey && keyCode== 67) {
//		//屏蔽 Ctrl+n 
//		allowedFlag=false;
//		MsgUtil.alert("系统提示", "系统屏蔽 Ctrl+C复制");
//	}
//	/*else if(evenKey && keyCode==86){
//		allowedFlag=false;
//		MsgUtil.alert("系统提示", "系统屏蔽 Ctrl+V");
//	}*/
//	return allowedFlag;
//};
ObjectUtil
		.define(
				"crm.page.mainPage.MainPage",
				"base.PageObject",
				{
					/*
					 * 初始化页面数据
					 */
					initData : function() {
						var owner = this;
						// 获取系统配置
						owner.sysConfigs = DataUtil.getSystemConfig();
						//获取用户信息
						owner.userInfo=DataUtil.getUserInfo();
					},
					initCmp : function() {
						// 取得当前操作员个性化系统配置参数对象
						var owner = this;
						var headPage = this.create('component.Panel', {
							height : 85,
							region : 'north',
							split : false,
							autoScroll : false,
							hasBackGroundColor : true,
							pageObject : ObjectUtil.create(
									"crm.page.mainPage.HeadPage", {
										id : 'HeadPage',
										user:owner.userInfo
									})
						});
						// 加载定制首页
						var configs={
								id : 'centerPanel',
								region : 'center',
								callback : function(tabPanel) {
									ObjectMgrUtil.register(tabPanel);
								}	
						};
						if(owner.userInfo.roleid!=CodeStringDefinition.ROLE_TYPE_PERSON_SYS_MANAGER_CODE&&
								owner.userInfo.roleid!=CodeStringDefinition.ROLE_TYPE_CORPORATE_SYS_MANAGER_CODE){
							//如果是对公或对私的系统管理员，则不加载首页
							this.loadIndex();
							configs=ObjectUtil.apply(configs,{items : [ this.IndivduationIndex ]});
							configs=ObjectUtil.apply(configs,{activeTab : this.IndivduationIndexId});
						}							
						var tabs = this.create('component.TabPanel', configs);
						var leftPanel = this.create('component.Panel', {
							id : 'leftMenuPanel',
							region : 'west',
							width : 198,
							hasBackGroundColor : true,
							heightPercent : 1,
							autoScroll : true,
							pageObject : ObjectUtil.create(
									"crm.page.mainPage.LeftPage", {
										id : 'LeftPage',
										user:owner.userInfo
									}),
							collapsible : false,
							split : false,
							callback : function(panel) {
								ObjectMgrUtil.register(panel);
							}
						});
						ObjectUtil.create("component.View", {
							items : [ headPage, tabs, leftPanel ]

						});
					},
					initEvent : function() {
						this.lockSystem();
					},
					lockSystem : function() {
						// 如果是当前会话,且被锁定
						if (null != window
								&& null != window.systemConfig
								&& null != window.systemConfig.lockSystem
								&& window.systemConfig.lockSystem.sessionId == window.userObj.sessionId
								&& window.systemConfig.lockSystem.state == 'lock') {
							this.create('component.Window',
											{
												title : '解除系统锁定',
												draggable : true,
												resizable : true,
												iconCls : 'lock',
												width : 300,
												height : 155,
												modal : true,
												pageObject : this
														.create(
																'crm.page.ocrm.common.systemManage.individuation.UnLockSystem',
																{
																	id : 'UnLockSystem'
																})
											});
						}
					},
					/**
					 * 加载首页
					 */
					loadIndex : function() {
						var owner = this;
						var pageClassName = 'crm.page.mainPage.PersonHomePage';
						if(owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_PERSON_BEST_CUST_MANAGER_CODE||
								owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_PERSON_CUST_BUSSINS_MANAGER_CODE||
								owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_PERSON_CUST_MANAGER_CODE){
							pageClassName ='crm.page.mainPage.PersonHomePage';
						}else if(owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_BEST_CUST_MANAGER_CODE||
								owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_CUST_BUSSINS_MANAGER_CODE||
								owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_CUST_MANAGER_CODE){
							pageClassName ='crm.page.mainPage.CorporateHomePage';
						}
						var pageObj = this.create(pageClassName, {
							id : 'indexIndivduation',
							userInfo:owner.userInfo
						});
						this.IndivduationIndexId = 'homePanel';
						this.IndivduationIndex = this.create('component.Panel',
										{
											id : this.IndivduationIndexId,
											title : "<div style='font-size:13px'>首页</div>",
											iconCls : 'icon-tab-home',
											closable : true,
											margin : '8 8 0 8',
											autoScroll : true,
											widthPercent : 1,
											heightPercent : 1,
											hasBackGroundColor : true,
											pageObject : pageObj
										});
					}
				});
