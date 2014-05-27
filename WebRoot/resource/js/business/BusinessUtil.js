/**
 * 业务组工具类
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-07-30
 * @class BusinessUtil
 * @static
 */
Ext.define('BusinessUtil', {
			singleton : true,
			alternateClassName : 'BusinessUtil',
			/**
			 * 添加页面对象到主tabpanel中
			 * 
			 * @param {}
			 *            config 已经编码的配置对象
			 * @private
			 */
			newCenterPanel : function(config) {
				// 转码再将JSON格式字符串转换为对象
				config = Ext.decode(unescape(config));
				this.createCenterPanel(config);
			},
			/**
			 * 打开新窗口
			 * 
			 * @param {}
			 *            config 已经编码的配置对象
			 * @private
			 */
			newWindow : function(config) {
				// 转码再将JSON格式字符串转换为对象
				config = Ext.decode(unescape(config));
				this.createWindow(config);
			},
			/**
			 * 添加页面对象到主tabpanel中
			 * 
			 * @param {}
			 *            config配置参数 config -> name:名称 config ->
			 *            width:窗口宽度(newWindow为true时有效) config ->
			 *            height:窗口高度(newWindow为true时有效) config ->
			 *            x:x坐标(newWindow为true时有效) config ->
			 *            y:y坐标(newWindow为true时有效) config -> pageConfig:页面对象配置
			 *            config -> pageConfig -> className:页面对象类名称 config ->
			 *            pageConfig -> config:页面对象类的配置参数,与具体的类相关
			 *            @example
			 *            BusCompUtils.createCenterPanel({
								name : value,
								pageConfig : {
									className : 'ocrm.pages.test.CustomerIndex',
									config : {
										id : 'CustomerIndex',
										customerky : record.data.corpersonky,
										name : value,
										authority : 'User'
									}
								}
							});
			 * @public
			 */
			createCenterPanel : function(config) {
				var centerPanel = ObjectMgrUtil.get('centerPanel');
				if (centerPanel.items.length > (Constants.TAB_SIZE - 1)) {
					ExceptionUtil.throwBusinessException({
								title : '提示信息',
								msg : '考虑到系统性能,您打开的tab不能超过'
										+ Constants.TAB_SIZE + '个!'
							});
				}
				if (!centerPanel.getItem(config.pageConfig.config.id)) {
					centerPanel.add(ObjectUtil.create('component.Panel', {
								id : config.pageConfig.config.id,
								title : config.name,
								closable : true,
								hasBackGroundColor : false,
								margin : '5 5 5 5',
								pageObject : ObjectUtil.create(
										config.pageConfig.className,
										config.pageConfig.config)
							}));
				}
				centerPanel.setActiveTab(centerPanel
						.getItem(config.pageConfig.config.id));
			},
			/**
			 * 创建新窗口
			 * 
			 * @param {}
			 *            config配置参数 config -> name:名称 config -> width:窗口宽度
			 *            config -> height:窗口高度 config -> x:x坐标 config -> y:y坐标
			 *            config -> pageConfig:页面对象配置 config -> pageConfig ->
			 *            className:页面对象类名称 config -> pageConfig ->
			 *            config:页面对象类的配置参数,与具体的类相关
			 * 
			 * @example
			 * var windowConfig = {
								name : '产品详细',
								width : 950,
								pageConfig : {
									className : 'ocrm.pages.product.view.ViewProduct',
									config : {
										id : 'extViewProductInfoWin',
										productId : record.get("productId")
									}
								}
							};
							// 显示
							var win = BusCompUtils.createWindow(windowConfig);
							win.on('close', function() {
										owner.productTemplateList();
									});
			 * 
			 * 
			 * @return {}
			 * @public
			 */
			createWindow : function(config) {
				var win = ObjectUtil.create('component.Window', {
							title : config.name,
							closable : true,
							draggable : true,
							width : config.width || 950,
							height : config.height || 500,
							maximizable : config.maximizable,
							modal : true,
							pageObject : ObjectUtil.create(
									config.pageConfig.className,
									config.pageConfig.config)
						});
				return win;
			},
			/**
			 * 根据参数创建标签面板
			 * 
			 * @param {}
			 *            config config->tabs
			 *            [{id:'itemId',text:'子项描述',className:'子类对象',children:[{id:'itemId',text:'子项描述',className:'子类对象',config:{id:'itemId'}},{id:'itemId',text:'子项描述',active:true,className:'子类对象',config:{id:'itemId'}}]}]
			 *            其中 active 表示激活当前标签 config->id 控件ID
			 *            config->commonConfig 页面类公共配置参数 config->parentObj 父页面对象
			 *            config->renderTo 渲染ID
			 * @return {}
			 */
			createTabPanel : function(config) {
				var tabs = config.tabs;
				/**
				 * 创建面板
				 */
				var items = this.populatePanel(tabs, config, [],
						config.heightPercent || 1);
				var tabpanel = config.parentObj.create("component.TabPanel", {
							id : "Business-tabPanel-MainTabpanel-" + config.id,
							region : 'center',
							widthPercent : config.widthPercent || 0.8,
							heightPercent : config.heightPercent || 1,
							activeTab : this.findActiveId(tabs),
							items : items,
							renderTo : config.renderTo,
							onTabClose : config.onTabClose,
							callback : function(tabPanel) {
							}
						});
				return tabpanel;
			},

			/**
			 * 递归组装标签面板属性
			 * 
			 * @param {}
			 *            tabs 标签数组
			 * @param {}
			 *            config 配置参数
			 * @param {}
			 *            items 存放组装好的标签数组
			 * @return {} 组装好的标签数组
			 */
			populatePanel : function(tabs, config, items, heightPercent) {
				var owner = this;
				/**
				 * 初始化选项卡
				 */
				DataUtil.each(tabs, function(menu) {
							var newTab;
							var activeChildId = "";
							// 存在子项则创建选项卡面板
							if (!DataUtil.isEmpty(menu.children)) {
								activeChildId = owner
										.findActiveId(menu.children);
								var nextHeightPercent = heightPercent - 0.05;
								newTab = config.parentObj.create(
										"component.TabPanel", {
											title : menu.text,
											id : config.id + menu.id,
											widthPercent : config.widthPercent
													|| 0.8,
											heightPercent : heightPercent
													- 0.05,
											activeTab : activeChildId,
											onTabClose : config.onTabClose,
											items : this.populatePanel(
													menu.children, config, [],
													nextHeightPercent),
											iconCls : menu.iconCls || '',
											border : false
										});
							}
							// 不存在子项则直接加载页面
							else {
								var classConfig = menu.classConfig || {};
								// 公共参数配置
								var commonConfig = config.commonConfig || {};
								commonConfig = ObjectUtil.apply(commonConfig, {
											id : menu.id
										});
								classConfig = ObjectUtil.applyIf(classConfig,
										commonConfig);
								newTab = {
									id : config.id + menu.id,
									type : 'Panel',
									title : menu.text,
									parentObj:config.parentObj,
									className:		menu.className,
									classConfig:classConfig
								};
							}
							items.push(newTab);
						}, this);
				return items;
			},
			/**
			 * 在标签数组中查找激活ID
			 * 
			 * @param {}
			 *            tabs 标签数组
			 * @return {} 激活ID
			 */
			findActiveId : function(tabs) {
				var activeId = null;
				DataUtil.each(tabs, function(menu) {
							if (!DataUtil.isEmpty(menu.active)) {
								activeId = menu.id;
							}
						});
				return activeId;
			},
			/**
			 * 快捷导航入菜单点击事件 首页
			 */
			quikNavigMenuClick:function (title,className,ids){
				var pageConfig={
					className:className,
					config:{
						id:ids
					}
				};
				var config={
						name:title,
						pageConfig:pageConfig
				};
				this.createCenterPanel(config);
			},
			/**
			 * 快捷导航入菜单点击事件
			 */
			quikNavigMenuClickForAccordin : function(config) {
				var configObj = DataUtil.decode(unescape(config));
				var pageConfig = {
					 className:configObj.className,
					config : {
						id : configObj.id
					}
				};
				var config = {
					name : configObj.title,
					pageConfig : pageConfig
				};
				this.createCenterPanel(config);
			},
			/**
			 * 3级菜单点击改变样式
			 */
			mouseClik:function(obj){
				var objecs=ObjectMgrUtil.get('trId');
				if(objecs){
					if(HtmlUtil.getDom(objecs.value)){
						HtmlUtil.getDom(objecs.value).style.background='#FFFFFF';
					}					
					ObjectMgrUtil.register({id:'trId',value:obj});
				}else{
					ObjectMgrUtil.register({id:'trId',value:obj});
				}
				HtmlUtil.getDom(obj).style.background="#ececec";
			
			},
			/***
			 * 公告详细页面
			 * 
			 * **/
			gongGaoDetail:function(obj){
				this.createWindow({
					name:'公告详细',
					width : 800,
					height : 300,
					pageConfig:({
						className:'crm.pages.ocrm.corporate.workplatform.noticemanage.NoticeManageDetail',
						config:{
							id : 'noticeDetail',
							wdkey:obj
						}
					})
				});
			},
			/***
			 * 日程安排详细页面
			 * 
			 * **/
			riChengAnPaiDetail:function(obj){
				 this.createWindow({
					name:'日程安排详细',
					width:550,
					height:250,
					pageConfig:({
						className:'crm.pages.ocrm.common.calendar.NotesDetail',
						config:{
							id : 'calendarDetail',
							scratchpadId:obj
						}
					})
				});
			},
			/**
			*替换短信内容
			*/
			tiHuanMsgContent:function(custmoer,data){
			 /**XM--------------------客户姓名
				CW--------------------先生/女士
				NL---------------------年龄
				JG ---------------------客户经理所属机构
				KHJL -----------------客户经理姓名
				KHDJ -----------------客户等级
				PHONE  -----------------客户经理联系电话
				DQRQ ----------------产品到期日期
				CPMC ----------------产品名称
				ZHYE -----------------还款账户余额
				DQJE -------------------到期余额
				YHKA ------------------银行卡号/签约账号
				CQ -----------------------存期**/
				if(custmoer&&data){
					if(custmoer.name){
						data=data.replace('XM',custmoer.name);
					}
					if(custmoer.sex && CodeStringDefinition.SYS_USER_SEX_MAN==custmoer.sex){
						data=data.replace('CW','先生');
					}else if(custmoer.sex && CodeStringDefinition.SYS_USER_SEX_MEN==custmoer.sex){
						data=data.replace('CW','女士');
					}else{
						data=data.replace('CW','先生/女士');
					}
					if(custmoer.age){
						data=data.replace('NL',custmoer.age);
					}
					if(custmoer.prodcName){
						data=data.replace('CPMC',custmoer.prodcName);
					}
					if(custmoer.awokeDate){
						data=data.replace('DQRQ',custmoer.awokeDate);
					}
					if(custmoer.zhangHuYuE){
						data=data.replace('ZHYE',custmoer.zhangHuYuE);
					}
					if(custmoer.levels){
						data=data.replace('KHDJ',custmoer.levels);
					}
					if(custmoer.amt){
						data=data.replace('DQJE',custmoer.amt);
					}
					if(custmoer.acctNumber){
						data=data.replace('YHKA',custmoer.acctNumber);
					}
					if(custmoer.cunQi){
						data=data.replace('CQ',custmoer.cunQi);
					}
					if(custmoer.managePhones){
						data=data.replace('PHONE',custmoer.managePhones);
					}
					data=data.replace('JG',DataUtil.getUserInfo().orgDesc);
					data=data.replace('KHJL',DataUtil.getUserInfo().name);										
				}	
				return data;
		}
			
	});