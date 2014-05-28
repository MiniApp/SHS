/**
 * 系统对公首页
 */
// 声名命名空间
ObjectUtil.define("crm.pages.mainPage.CorporateHomePage","base.PageObject",
		{htmlUrl : Constants.CONTEXT_PATH+ "/pages/mainPage/CorporateHomePage.html",
	/*
	 * 初始化页面数据
	 */
	initData : function() {
		var owner = this;
		owner.dDate = new Date();
		/**
		 * 获取客户经理提醒
		 * */
		if(!owner.userInfo){
			//获取用户信息
			owner.userInfo=DataUtil.getUserInfo();
		}
		this.rmcodeky=owner.userInfo.objectId;
		//获取公告内容
		ConnectionUtil.ajaxReq( {
			strServId : "noticeManageService.getHomePageDisplayList",
			callback : function(datas) {
				if(datas){
					var content='<ul>';
					DataUtil.each(datas, function(data) {
						content +='<li onclick="javascript:BusinessUtil.gongGaoDetail('+data.wdkey+')"><img src="/ocrmweb/resources/images/prompt.gif"><span style="color: #01487E">' +data.validEndDate+'&nbsp;&nbsp;&nbsp;'+data.name+'</span></li><br>';
					});
					content+='</ul>';
					HtmlUtil.insertHtml(content, HtmlUtil.getDom(owner.ids.marqueeDiv));
				}
				
			}
		});	
	},
	/*
	 * 渲染页面
	 */
	initCmp : function() {
		var owner = this;
		/**
		 * 展示公告，日程安排
		 * */
		this.create('component.Panel', {
			title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">公告及安排</div>',
			renderTo : this.ids.reminderAndArrangementDiv,
			contentEl : this.ids.reminderAndArrangeContentDiv,
			collapsible : false,
			widthPercent : 0.9985,
			height : 80,
			margin : '0 0 5 0',
			buttonInPanel : false,
			hasBackGroundColor : true
		});
		
		/**公告、日程安排结束*/
		if(owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_CUST_MANAGER_CODE){
			/**
			 * 展示客户经理角色首页内容
			 * */
			this.create('component.Panel', {
				title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">工作提醒</div>',
				renderTo : this.ids.tixing,
				contentEl : this.ids.tixingshixiang,
				collapsible : false,
				widthPercent : 0.9985,
				height : 90,
				margin : '0 0 10 0',
				buttonInPanel : false,
				hasBackGroundColor : true
			});
			
			HtmlUtil.getDom(owner.ids.tixing).style.display = '';
			HtmlUtil.getDom(owner.ids.bestTiXing).style.display = '';
			// 客户经理 提醒信息
			ConnectionUtil.ajaxReq({
						strServId : "calendarService.getCorpAgencyThingt",
						jsonData : {
							employeeky : this.rmcodeky
						},
						callback : function(data) {
							if (data) {
								DataUtil.populateDataForArea(data,
										owner.ids.tixingshixiang);// 渲染数据到页面
							}

						}
					});
			for (var i = 1; i <= 5; i++) {
				HtmlUtil.getDom('alink' + i).onclick = function() {
					owner.openWindow(this.id);
				};
			};
		
		
		}else if(owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_CUST_BUSSINS_MANAGER_CODE){
			/**
			 * 展示客户经理主管角色首页内容
			 * */
			/**/
			
		}else if(owner.userInfo.roleid==CodeStringDefinition.ROLE_TYPE_CORPORATE_BEST_CUST_MANAGER_CODE){
			/**
			 * 展示 客户经理总管角色首页内容
			 * */

		}
		
	},
	openWindow : function(index) {

		var className = '';
		var title = '';
		if (index == 'alink1') {
			title = '客户调整提醒';
			className = 'crm.pages.ocrm.corporate.customer.remind.CusChange';
		} else if (index == 'alink2') {
			title = '重要日期提醒';
			className = 'crm.pages.ocrm.corporate.customer.remind.ImDateAwoke';
		} else if (index == 'alink3') {
			title = '产品到期提醒';
			className = 'crm.pages.ocrm.corporate.customer.remind.ProductAwoke';
		} else if (index == 'alink4') {
			title = '联系人变动提醒';
			className = 'crm.pages.ocrm.corporate.customer.remind.LinkmanChange';
		} else if (index == 'alink5') {
			title = '账户变动提醒';
			className = 'crm.pages.ocrm.corporate.customer.remind.PsnabundWarn';
		}

		this.create('component.Window', {
					title : title,
					closable : true,
					draggable : true,
					resizable : true,
					width : 950,
					height : 550,
					modal : true,
					pageObject : this.create(className, {
								id : 'window' + index,
								rmcodeky : this.rmcodeky
							})
				});
	
	}
	
});