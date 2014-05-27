/**
 * 用户管理界面顶部
 */
// 声名命名空间
ObjectUtil.define("crm.pages.mainPage.HeadPage","base.PageObject",
		{htmlUrl : Constants.CONTEXT_PATH+ "/pages/mainPage/HeadPage.html",
	/*
	 * 初始化页面数据
	 */
	initData : function() {
		var owner = this;
		//初始系统时间对象
		owner.myDate=new Date();
		//获取系统用户菜单
		owner.menus = this.iniUserMenuData(DataUtil.getUserMenu());
	},
	/*
	 * 渲染页面
	 */
	initCmp : function() {
		// 组装第一级菜单
		var owner = this;
		owner.navigMenu = this.create("component.Menu", {
			id : 'mainMenu',
			renderTo : this.ids.menuPanel,
			widthPercent : 1,
			heightPercent : 0.33
		});
		DataUtil.each(owner.menus, function(item) {
			owner.navigMenu.add(item);
		});
		this.initHearderRight();
	},
	mouseMove : function(ev) {
		if (DataUtil.isEmpty(ObjectMgrUtil
				.get('roleAndPasswordManageWin'))) {
			ev = ev || window.event;
			var mousePos = HtmlUtil.mousePosition(ev);
			var roleAndPasswordWin = ObjectMgrUtil
					.get("roleAndPasswordManagerWin");
			if (!DataUtil.isEmpty(roleAndPasswordWin)) {
				var roleAndPasswordWinPos = HtmlUtil
						.getElementPos("roleAndPasswordManagerWin");
				if (mousePos.x < roleAndPasswordWinPos.x
						|| mousePos.x > roleAndPasswordWinPos.x
								+ roleAndPasswordWin.width) {
					roleAndPasswordWin.close();
					ObjectMgrUtil
							.unregister(roleAndPasswordWin);
				}
				if (mousePos.y < roleAndPasswordWinPos.y
						|| mousePos.y > roleAndPasswordWinPos.y
								+ roleAndPasswordWin.height) {
					roleAndPasswordWin.close();
					ObjectMgrUtil
							.unregister(roleAndPasswordWin);
				}
			}
		}
	},
	initHearderRight : function() {
		var owner = this;
		var menu = this.create("component.Menu", {
			id : 'headerMenu',
			renderTo : this.ids.headerOption,
			widthPercent : 0.6,
			heightPercent : 0.3,
			baseCls : 'emptBaseCls'
		});
		menu.add({
			text :  owner.user.orgDesc
					+ "-"
					+ owner.user.roleDesc
					+ "-"+owner.user.name, 
			iconCls : 'header-user',
			scale : 'medium',
			handler : function() {
				if (DataUtil.isEmpty(HtmlUtil
								.getDom('roleAndPasswordManagerWin'))) {
					owner.create('component.Window',{
										id : 'roleAndPasswordManagerWin',
										draggable : false,
										baseCls : "",
										x : HtmlUtil.getElementPos("headerMenu").x,
										y : HtmlUtil.getElementPos("headerMenu").y+ menu.height,
										width : 350,
										height : 280,
										modal : false,
										callback : function(win) {
											ObjectMgrUtil.register(win);
										},
										pageObject : owner.create('crm.pages.mainPage.RoleAndPasswordManager',
												{
													id : 'RoleAndPasswordManager',
													corpersonky : window.userObj.objectId
												})
									   })
							.on('close',function() {
								ObjectMgrUtil.unregister(ObjectMgrUtil.get("roleAndPasswordManagerWin"));
							});
				}

				document.onmousedown = owner.mouseMove;

			}
		});
		menu.add({
			text : this.myDate.toLocaleDateString(),
			iconCls : 'header-time',
			scale : 'medium',
			handler : function() {
				ObjectUtil.create('component.Window',{
					closable : true,
					draggable : true,
					resizable : true,
					width : 980,
					height : 650,
					modal : true,
					pageObject : ObjectUtil.create('crm.pages.ocrm.common.calendar.MaxCalendar',
							{
								id : 'windowMinCalendar'
							})
				});
			}
		});
		menu.add({
			text : '【注销】',
			scale : 'medium',
			handler : function() {
				MsgUtil.confirm('确认', '您确认要退出本系统吗?', function(
						result) {
					if ('yes' === result) {
						location.href = Constants.CONTEXT_PATH
								+ '/ocrmLogout';
					}
				});
			}
		});
	},
	/**
	 * 根据用户系统菜单组装页面的导航菜单
	 * */
	iniUserMenuData : function(recodes) {
		var owner = this;
		var firstMenus = [];
		if(owner.user.roleid!=CodeStringDefinition.ROLE_TYPE_PERSON_SYS_MANAGER_CODE&&
				owner.user.roleid!=CodeStringDefinition.ROLE_TYPE_CORPORATE_SYS_MANAGER_CODE){
			//如果是对公或对私的系统管理员，则不出现首页菜单
			var homeMenu={};
			homeMenu['text'] = "<span id='0' style='font:13px 黑体 Arial;color:yellow;font-weight: bold;margin-left:15px'>"+
			"<img  src='/ocrmweb/resources/images/fenge.gif'></img>首页</span>";
			homeMenu['desc'] = '首页';
			homeMenu['spanId'] = '0';
			homeMenu['id'] = 'homePage_0';
			homeMenu['nameSpace'] = 'crm.pages.mainPage';
			if(owner.user.roleid==CodeStringDefinition.ROLE_TYPE_PERSON_BEST_CUST_MANAGER_CODE||
					owner.user.roleid==CodeStringDefinition.ROLE_TYPE_PERSON_CUST_BUSSINS_MANAGER_CODE||
					owner.user.roleid==CodeStringDefinition.ROLE_TYPE_PERSON_CUST_MANAGER_CODE){
				homeMenu['className'] = 'PersonHomePage';
			}else if(owner.user.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_BEST_CUST_MANAGER_CODE||
					owner.user.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_CUST_BUSSINS_MANAGER_CODE||
					owner.user.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_CUST_MANAGER_CODE){
				homeMenu['className'] = 'CorporateHomePage';
			}
			
			homeMenu['handler'] = owner.onItemClick;
			firstMenus.push(homeMenu);
		}
		
		DataUtil.each(recodes,function(menuItem) {
			var menu = {};
			// 首页配置
			if (menuItem['resourceType'] == CodeStringDefinition.MENU_SOUCE_TYPE_CODE) {
				menu['text'] = "<span id='"+ menuItem['id']+"' style='font:13px 黑体 Arial;color:#DAF6FB;font-weight: bold;margin-left:15px'>"+
				"<img  src='/ocrmweb/resources/images/fenge.gif'></img>"
						+ menuItem['text']
						+ "</span>";
				menu['iconCls'] = menuItem['image'];
				menu['desc'] = menuItem['text'];
				menu['spanId'] = menuItem['id'];
				menu['id'] = menuItem['resourceControlpk']
						+ "" + menuItem['id'];
				menu['nameSpace'] = menuItem['nameSpace'];
				menu['className'] = menuItem['className'];
				if ((!DataUtil.isEmpty(menuItem['nameSpace']))&&
						(!DataUtil.isEmpty(menuItem['className']))) {
					menu['handler'] = owner.onItemClick;
				}
				if (menuItem['resourceControlBeanList'] != null
						&& menuItem['resourceControlBeanList'] != "") {
					menu['chirldMenu']=menuItem['resourceControlBeanList'];
				}
				firstMenus.push(menu);
			}
		}, this);
		return firstMenus;
	},
	/**
	 * 
	 * 第一级菜单点击事件
	 * */
	onItemClick : function(event) {
		var obj=ObjectMgrUtil.get('curenSpan');
		if(obj){
			HtmlUtil.getDom(obj.value).style.color='#DAF6FB';
			ObjectMgrUtil.register({id:'curenSpan',value:event['spanId']});
		}else{
			ObjectMgrUtil.register({id:'curenSpan',value:event['spanId']});
			if((event['spanId']!=null&&event['spanId']!='')&&event['spanId']!='0'){
				if(HtmlUtil.getDom('0')){
					HtmlUtil.getDom('0').style.color='#DAF6FB';
				}
				
			}
		}
		HtmlUtil.getDom(event['spanId']).style.color='yellow';
		var title=event['desc'];
		if((event['spanId']!=null&&event['spanId']!='')&&event['spanId']=='0'){
			title='快捷导航';
			var centerPanel = ObjectMgrUtil.get('centerPanel');
			if (!centerPanel.getItem('homePanel')) {
				if (centerPanel.getCount() > (Constants.TAB_SIZE - 1)) {
					MsgUtil.error('提示', '考虑到系统性能,您打开的tab不能超过10个!');
					return;
				}
				centerPanel.add(ObjectUtil.create('component.Panel', {
						id : 'homePanel',
						title : event['desc'],
						closable : true,
						autoScroll : true,
						hasBackGroundColor : false,
						pageObject : ObjectUtil.create(event['nameSpace']+'.'+event['className'], {
							id : event['id']
						})
				}));
				
			}
			centerPanel.setActiveTab(centerPanel.getItem('homePanel'));
		}else{
			
		}
		ObjectMgrUtil.get('leftMenuPanel').pageObject.initialLeftTree(title,event['chirldMenu']);
			
	}
});
