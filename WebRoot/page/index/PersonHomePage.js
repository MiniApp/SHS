/**
 * 系统对私首页
 */
// 声名命名空间
ObjectUtil.define("crm.pages.mainPage.PersonHomePage", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/mainPage/PersonHomePage.html",
	/*
	 * 初始化页面数据
	 */
	initData : function() {
		var owner = this;
		owner.dDate = new Date();
		/**
		 * 获取客户经理提醒
		 */
		if (!owner.userInfo) {
			// 获取用户信息
			owner.userInfo = DataUtil.getUserInfo();
		}
		this.rmcodeky = owner.userInfo.objectId;
		// 获取公告内容
		ConnectionUtil.ajaxReq({
			strServId : "noticeManageService.getHomePageDisplayList",
			callback : function(datas) {
				if (datas) {
					var content = '<span>';
					DataUtil.each(datas, function(data) {
						content += '<a onclick="javascript:BusinessUtil.gongGaoDetail('
								+ data.wdkey
								+ ')"><img src="/ocrmweb/resources/images/prompt.gif"><span style="color: #01487E">'
								+ data.validEndDate
								+ '&nbsp;&nbsp;'
								+ data.name
								+ '</span></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
					});
					content += '</span>';
					HtmlUtil.insertHtml(content, HtmlUtil
									.getDom(owner.ids.marqueeDiv));
				}

			}
		});
		// 获取日程安排
		 owner.initialRiChengAnPai();
		 //加载提醒
		 owner.initTixing();
	},
	/*
	 * 渲染页面
	 */
	initCmp : function() {
		var owner = this;
		/**
		 * 展示公告，日程安排
		 */
		this.create('component.Panel', {
			title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">公告及安排</div>',
			renderTo : this.ids.reminderAndArrangementDiv,
			contentEl : this.ids.reminderAndArrangeContentDiv,
			collapsible : false,
			widthPercent : 0.97,
			height : 70,
			margin : '0 0 10 0',
			buttonInPanel : false,
			hasBackGroundColor : true
		});
		/** 公告、日程安排结束 */
		if (owner.userInfo.roleid == CodeStringDefinition.ROLE_TYPE_PERSON_CUST_MANAGER_CODE) {
			/**
			 * 展示客户经理角色首页内容
			 */
			this.create('component.Panel', {
				title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">工作提醒</div>',
				renderTo : this.ids.tixing,
				contentEl : this.ids.tixingshixiang,
				collapsible : false,
				widthPercent : 0.97,
				height : 100,
				margin : '0 0 10 0',
				buttonInPanel : false,
				hasBackGroundColor : true
			});
			// 循环增加点击链接事件
			for (var i = 0; i <= 8; i++) {
				HtmlUtil.getDom('alink' + i).onclick = function() {
					owner.openWindow(this.id);
				};
			};

			this.create('component.Panel', {
				title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">工作成果</div>',
				renderTo : this.ids.resultOfTheWorkDiv,
				contentEl : this.ids.resultOfTheWorkContentDiv,
				widthPercent : 0.97,
				height : 109,
				margin : '0 0 10 0',
				buttonInPanel : false,
				hasBackGroundColor : true
			});
			// 客户概览情况
			this.create('component.Panel', {
				title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">客户情况概览</div>',
				renderTo : this.ids.customerInfo,
				contentEl : this.ids.customerInfoContentDiv,
				widthPercent : 0.97,
				height : 200,
				margin : '0 0 10 0',
				buttonInPanel : false,
				hasBackGroundColor : true
			});

			this.create('component.Panel', {
				title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">存款排名:金额</div>',
				renderTo : this.ids.chartDepositReportDiv,
				contentEl : this.ids.chartDepositReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.615,
				buttonInPanel : false,
				margin : '0 10 0 0',
				hasBackGroundColor : true
			});
			this.create('component.Panel', {
				title : '<div style="margin-left:8%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">贷款排名:余额</div>',
				renderTo : this.ids.chartCreditReportDiv,
				contentEl : this.ids.chartCreditReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.615,
				buttonInPanel : false,
				margin : '0 10 0 0',
				hasBackGroundColor : true
			});
			// 获取客户经理的 客户存款排名
			ConnectionUtil.ajaxReq({
				strServId : "customerRatingInfoService.getDepositbalRatingList",
				jsonData : {
					rating : 10
				},
				callback : function(data) {
					if (data.totalCount == 0) {
						var content = '<font color="red" size="4">没有客户贷款排名相关的统计数据</font>';
						HtmlUtil.insertHtml(content, HtmlUtil
										.getDom(owner.ids.depositChart));
						return;
					}
					var jsondatas = "[";
					DataUtil.each(data.data, function(dta) {
								var cusName = dta.cusName;
								if (cusName.length > 10) {
									cusName = cusName.substring(0, 10);
								}
								jsondatas = jsondatas + "{name:'" + cusName
										+ "',data:"
										+ dta.depositbal.replace(/,/g, "") / 1
										+ "},";

							});
					if (jsondatas.lastIndexOf(',') != -1) {
						jsondatas = jsondatas.substring(0, jsondatas
										.lastIndexOf(','));
					}
					jsondatas = jsondatas + "]";
					owner.create("component.Chart", {
								chartType : 'column',
								renderTo : owner.ids.depositChart,
								widthPercent : 0.46,
								heightPercent : 0.52,
								margin : '15 0 0 0',
								showLabel : false,
								fields : ['name', 'data'],
								xFields : ['name'],
								yFields : ['data'],
								data : DataUtil.decode(jsondatas)
							});
				}
			});
			// 客户贷款排名
			ConnectionUtil.ajaxReq({
				strServId : "customerRatingInfoService.getLoanbalRatingList",
				jsonData : {
					rating : 10
				},
				callback : function(data) {
					if (DataUtil.isEmpty(data) || data.totalCount == 0) {
						var content = '<font color="red" size="4">没有客户贷款排名相关的统计数据</font>';
						HtmlUtil.insertHtml(content, HtmlUtil
										.getDom(owner.ids.creditChart));
						return;
					}
					var jsondatas = "[";
					DataUtil.each(data.data, function(dta) {
								var cusName = dta.cusName;
								if (cusName.length > 10) {
									cusName = cusName.substring(0, 10);
								}
								jsondatas = jsondatas + "{name:'" + cusName
										+ "',data:"
										+ dta.loanbal.replace(/,/g, "") / 1
										+ "},";

							});
					if (jsondatas.lastIndexOf(',') != -1) {
						jsondatas = jsondatas.substring(0, jsondatas
										.lastIndexOf(','));
					}
					jsondatas = jsondatas + "]";
					owner.create("component.Chart", {
								chartType : 'column',
								renderTo : owner.ids.creditChart,
								widthPercent : 0.46,
								heightPercent : 0.52,
								margin : '15 0 0 0',
								showLabel : false,
								fields : ['name', 'data'],
								xFields : ['name'],
								yFields : ['data'],
								data : DataUtil.decode(jsondatas)
							});
				}
			});

		} else if (owner.userInfo.roleid == CodeStringDefinition.ROLE_TYPE_PERSON_CUST_BUSSINS_MANAGER_CODE) {
			/**
			 * 展示客户经理主管角色首页内容（业务主管）
			 */
			this.create('component.Panel', {
				title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">重要提醒</div>',
				renderTo : this.ids.tixing,
				contentEl : this.ids.tixingshixiang,
				collapsible : false,
				widthPercent : 0.97,
				height : 60,
				margin : '0 0 10 0',
				buttonInPanel : false,
				hasBackGroundColor : true
			});
			// 循环增加点击链接事件
			HtmlUtil.getDom('alink9').onclick = function() {
				owner.openWindow(this.id);
			};
			HtmlUtil.getDom('alink10').onclick = function() {
				owner.openWindow(this.id);
			};

			this.create('component.Panel', {
				title : '<div style="margin-left:2%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="个人客户存款分段统计(客户数)">存款分段统计:人数</div>',
				renderTo : this.ids.chartDepositReportDiv,
				contentEl : this.ids.chartDepositReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				margin : '0 5 10 0',
				hasBackGroundColor : true
			});
			this.create('component.Panel', {
				title : '<div style="margin-left:2%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="个人客户存款分段统计(按存款余额)">存款分段统计:金额(万元)</div>',
				renderTo : this.ids.chartCreditReportDiv,
				contentEl : this.ids.chartCreditReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				margin : '0 0 10 5',
				hasBackGroundColor : true
			});
			this.create('component.Panel', {
				title : '<div style="font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="个人客户金融总资产分段统计(按客户数)">总资产分段统计:人数</div>',
				renderTo : this.ids.chartDepReportDiv,
				contentEl : this.ids.chartDepReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				margin : '0 5 0 0',
				hasBackGroundColor : true
			});
			this.create('component.Panel', {
				title : '<div style="font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="客户金融总资产分段统计(按金融总资)">总资产分段统计:金额</div>',
				renderTo : this.ids.chartCredReportDiv,
				contentEl : this.ids.chartCredReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				margin : '0 0 0 5',
				hasBackGroundColor : true
			});
			var margin = '15 0 0 0';
			var width = 0.45;
			var height = 0.4;
			// 客户分段统计
			owner.custDepStaitChart(margin, width, height);
			// 金融总资产统计
			owner.bankTotalCastChart(margin, width, height);

		} else if (owner.userInfo.roleid == CodeStringDefinition.ROLE_TYPE_PERSON_BEST_CUST_MANAGER_CODE) {
			/**
			 * 展示 客户经理总管角色首页内容(高级主管)
			 */
			this.create('component.Panel', {
				title : '<div style="margin-left:3%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;">重要提醒</div>',
				renderTo : this.ids.tixing,
				contentEl : this.ids.tixingshixiang,
				collapsible : false,
				widthPercent : 0.97,
				height : 60,
				margin : '0 0 10 0',
				buttonInPanel : false,
				hasBackGroundColor : true
			});
			
			// 循环增加点击链接事件
			HtmlUtil.getDom('alink9').onclick = function() {
				owner.openWindow(this.id);
			};
			HtmlUtil.getDom('alink10').onclick = function() {
				owner.openWindow(this.id);
			};
			this.create('component.Panel', {
				title : '<div style="margin-left:2%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="个人客户存款分段统计(按客户数)">存款分段统计:人数</div>',
				renderTo : this.ids.chartDepositReportDiv,
				contentEl : this.ids.chartDepositReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				//margin : '5 5 10 0',
				margin : '0 5 10 0',
				hasBackGroundColor : true
			});
			this.create('component.Panel', {
				title : '<div style="margin-left:2%;font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="个人客户存款分段统计(按存款余额)">存款分段统计:金额(万元)</div>',
				renderTo : this.ids.chartCreditReportDiv,
				contentEl : this.ids.chartCreditReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				//margin : '5 0 10 5',
				margin : '0 0 10 5',
				hasBackGroundColor : true
			});
			this.create('component.Panel', {
				title : '<div style="font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="客户金融总资产分段统计(按客户数)">总资产分段统计:人数</div>',
				renderTo : this.ids.chartDepReportDiv,
				contentEl : this.ids.chartDepReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				//margin : '5 5 0 0',
				margin : '0 5 0 0',
				hasBackGroundColor : true
			});
			this.create('component.Panel', {
				title : '<div style="font-size:13px;font-family: 宋体,Arial;color:#FFFFFF;" title="客户金融总资产分段统计(按金融总资)">总资产分段统计:金额</div>',
				renderTo : this.ids.chartCredReportDiv,
				contentEl : this.ids.chartCredReportContentDiv,
				collapsible : false,
				widthPercent : 0.48,
				heightPercent : 0.5,
				buttonInPanel : false,
				//margin : '5 0 0 5',
				margin : '0 0 0 5',
				hasBackGroundColor : true
			});
			var margin = '15 0 0 0';
			var width = 0.45;
			var height = 0.4;
			// 客户分段统计
			owner.custDepStaitChart(margin, width, height);
			// 金融总资产统计
			owner.bankTotalCastChart(margin, width, height);
		}

	},
	openWindow : function(index) {
		var owner = this;
		var className = '';
		var title = '';
		if (index == 'alink0') {
			title = '客户待办事项提醒';
			className = 'crm.pages.ocrm.person.customer.contactPlan.CusContPlanIndexList';
		} else if (index == 'alink1') {
			title = '账户大额变动提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.AbundWarnAwoke';
		} else if (index == 'alink2') {
			title = '客户大额变动提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.CusAbundWarnAwoke';
		} else if (index == 'alink3') {
			title = '客户转移提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerTransferAwoke';
		} else if (index == 'alink4') {
			title = '客户等级变化提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.CuslevelAwokeManagement';
		} else if (index == 'alink5') {
			title = '重要日期提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerImportDatesToRemindList';
		} else if (index == 'alink6') {
			title = '产品到期提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerProducExpirationReminderList';
		} else if (index == 'alink7') {
			title = '营销提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerMarketingReminderList';
		} else if (index == 'alink8') {
			title = '风险提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.RiskAwokeManagement';
		} else if(index == 'alink9'){
			title = '未完成任务提醒';
			className = 'business.auditing.WaitingAuditingList';
		}else if(index == 'alink10'){
			title = '待办事项提醒';
			className = 'crm.pages.ocrm.person.customer.cusAwokeManage.UnDoTaskForManager';
		};

		var win = this.create('component.Window', {
					title : title,
					closable : true,
					draggable : true,
					resizable : true,
					width : 950,
					height : 550,
					modal : true,
					pageObject : this.create(className, {
								id : 'window' + index,
								rmcodeky : this.rmcodeky,
								flagsign : 1
							})
				});
		win.on('close', function() {
                            owner.initTixing();
                        });
		
	},
	/**
	 * 获取日程安排
	 */
	initialRiChengAnPai:function(){
		var owner = this; 
		// 获取日程安排内容
		/**
		 * 初始化今天日期字符串
		 */

		var rData = {};
		/**
		 * 开始日期
		 */
	
		owner.dDate.setDate(1); 
		rData.strStartDate = calendarUtil.fnDataToString(owner.dDate.dDate);
		
		/**
		 * 结束日期
		 */
		owner.dDate.setDate(calendarUtil.solarMonth[owner.dDate.getMonth()]);
		rData.strEndDate = calendarUtil.fnDataToString(owner.dDate.dDate); 
		var params = rData.strStartDate + ";" + rData.strEndDate + ";" + (DataUtil.isEmpty(rData.strLogonId) == true ? " " : rData.strLogonId);
	 	
		ConnectionUtil.ajaxReq({ 
	 		strServId : calendarUtil.LOAD_CALENDAR_DATA_STRSERVID, 
	 		submitWaitMessage:false,
	 		jsonData : params, 
	 		callback : function(datas) {
	 			if(datas&&datas.scratchpads){ 
	 				var content = '<span>';
                    DataUtil.each(datas.scratchpads, function(data) {
                        content += '<a onclick="javascript:BusinessUtil.riChengAnPaiDetail('
                                + data.strScratchpadId
                                + ')"><img src="/ocrmweb/resources/images/prompt.gif"><span style="color: #01487E">'
                                + data.strCreatedTime
                                + '&nbsp;&nbsp;'
                                + data.strScratchpadTitle
                                + '</span></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                    });
                    content += '</span>';
                    
	 				HtmlUtil.insertHtml(content,HtmlUtil.getDom(owner.ids.riChengAnPaiDiv)); 
	 			}
	 		} 
	 	});
	 },
	 
	/***************************************************************************
	 * 获取客户存款分段统计
	 **************************************************************************/
	custDepStaitChart : function(margin, width, height) {
		var owner = this;
		ConnectionUtil.ajaxReq({
			strServId : "ecifReportsService.getCustDepositStaitisticsChart",
			jsonData : {
				rating : 10
			},
			callback : function(data) {
				if (DataUtil.isEmpty(data)) {
					var content = '<font color="red" size="4">没有客户存款分段的相关的统计数据</font>';
					HtmlUtil.insertHtml(content, HtmlUtil
									.getDom(owner.ids.depositChart));
					HtmlUtil.insertHtml(content, HtmlUtil
									.getDom(owner.ids.creditChart));
					return;
				}
				var jsondts = "[";
				jsondts += "{name:'1万以下',data:"
						+ data.tnk_cnt.replace(/,/g, "") / 1 + "},";
				jsondts += "{name:'1-5万',data:"
						+ data.ftk_cnt.replace(/,/g, "") / 1 + "},";
				jsondts += "{name:'5-10万',data:"
						+ data.ohk_cnt.replace(/,/g, "") / 1 + "},";
				jsondts += "{name:'10-20万',data:"
						+ data.thk_cnt.replace(/,/g, "") / 1 + "},";
				jsondts += "{name:'20-50万',data:"
						+ data.fhk_cnt.replace(/,/g, "") / 1 + "},";
				jsondts += "{name:'50-100万',data:"
						+ data.om_cnt.replace(/,/g, "") / 1 + "},";
				jsondts += "{name:'100万以上',data:"
						+ data.above_cnt.replace(/,/g, "") / 1 + "}";
				jsondts = jsondts + "]";
				owner.create("component.Chart", {
							chartType : 'column',
							renderTo : owner.ids.depositChart,
							widthPercent : width,
							heightPercent : height,
							margin : margin,
							showLabel : false,
							fields : ['name', 'data'],
							xFields : ['name'],
							yFields : ['data'],
							data : DataUtil.decode(jsondts)
						});
				var jsdtas = "[";
				jsdtas += "{name:'1万以下',data:" + data.tnk_amt.replace(/,/g, "")
						/ 1 + "},";
				jsdtas += "{name:'1-5万',data:"
						+ data.ftk_amt.replace(/,/g, "") / 1 + "},";
				jsdtas += "{name:'5-10万',data:"
						+ data.ohk_amt.replace(/,/g, "") / 1 + "},";
				jsdtas += "{name:'10-20万',data:"
						+ data.thk_amt.replace(/,/g, "") / 1 + "},";
				jsdtas += "{name:'20-50万',data:"
						+ data.fhk_amt.replace(/,/g, "") / 1 + "},";
				jsdtas += "{name:'50-100万',data:"
						+ data.om_amt.replace(/,/g, "") / 1 + "},";
				jsdtas += "{name:'100万以上',data:"
						+ data.above_amt.replace(/,/g, "") / 1 + "}";
				jsdtas = jsdtas + "]";
				owner.create("component.Chart", {
							chartType : 'column',
							renderTo : owner.ids.creditChart,
							widthPercent : width,
							heightPercent : height,
							margin : margin,
							showLabel : false,
							fields : ['name', 'data'],
							xFields : ['name'],
							yFields : ['data'],
							data : DataUtil.decode(jsdtas)
						});
			}
		});
	},
	/***************************************************************************
	 * 金融总资产统计
	 **************************************************************************/
	bankTotalCastChart : function(margin, width, height) {
		var owner = this;
		ConnectionUtil.ajaxReq({
			strServId : "ecifReportsService.getBankTotalCastsectChart",
			jsonData : {
				rating : 10
			},
			callback : function(data) {
				if (DataUtil.isEmpty(data)) {
					var content = '<font color="red" size="4">没有金融总资产的相关的统计数据</font>';
					HtmlUtil.insertHtml(content, HtmlUtil
									.getDom(owner.ids.deposChart));
					HtmlUtil.insertHtml(content, HtmlUtil
									.getDom(owner.ids.credChart));
					return;
				}
				var jsondatas = "[";
				jsondatas += "{name:'5万以下',data:"
						+ data.ftk_cnt.replace(/,/g, "") / 1 + "},";
				jsondatas += "{name:'5-20万',data:"
						+ data.thk_cnt.replace(/,/g, "") / 1 + "},";
				jsondatas += "{name:'20-50万',data:"
						+ data.fhk_cnt.replace(/,/g, "") / 1 + "},";
				jsondatas += "{name:'50-100万',data:"
						+ data.om_cnt.replace(/,/g, "") / 1 + "},";
				jsondatas += "{name:'100-200万',data:"
						+ data.tm_cnt.replace(/,/g, "") / 1 + "},";
				jsondatas += "{name:'200-500万',data:"
						+ data.fm_cnt.replace(/,/g, "") / 1 + "},";
				jsondatas += "{name:'500万以上',data:"
						+ data.above_cnt.replace(/,/g, "") / 1 + "}";
				jsondatas = jsondatas + "]";
				owner.create("component.Chart", {
							chartType : 'column',
							renderTo : owner.ids.deposChart,
							widthPercent : width,
							heightPercent : height,
							margin : margin,
							showLabel : false,
							fields : ['name', 'data'],
							xFields : ['name'],
							yFields : ['data'],
							data : DataUtil.decode(jsondatas)
						});
				var jsatas = "[";
				jsatas += "{name:'5万以下',data:" + data.ftk_amt.replace(/,/g, "")
						/ 1 + "},";
				jsatas += "{name:'5-20万',data:"
						+ data.thk_amt.replace(/,/g, "") / 1 + "},";
				jsatas += "{name:'20-50万',data:"
						+ data.fhk_amt.replace(/,/g, "") / 1 + "},";
				jsatas += "{name:'50-100万',data:"
						+ data.om_amt.replace(/,/g, "") / 1 + "},";
				jsatas += "{name:'100-200万',data:"
						+ data.tm_amt.replace(/,/g, "") / 1 + "},";
				jsatas += "{name:'200-500万',data:"
						+ data.fm_amt.replace(/,/g, "") / 1 + "},";
				jsatas += "{name:'500万以上',data:"
						+ data.above_amt.replace(/,/g, "") / 1 + "}";
				jsatas = jsatas + "]";
				owner.create("component.Chart", {
							chartType : 'column',
							renderTo : owner.ids.credChart,
							widthPercent : width,
							heightPercent : height,
							margin : margin,
							showLabel : false,
							fields : ['name', 'data'],
							xFields : ['name'],
							yFields : ['data'],
							data : DataUtil.decode(jsatas)
						});
			}
		});
	},
	/**
	 * 加载提醒
	 */
	initTixing : function(){
		var owner = this;
		if (owner.userInfo.roleid == CodeStringDefinition.ROLE_TYPE_PERSON_CUST_MANAGER_CODE) {
            HtmlUtil.getDom(owner.ids.tixing).style.display = '';
            HtmlUtil.getDom(owner.ids.bestTiXing).style.display = '';
            // 将工作成果 设置为显示
            HtmlUtil.getDom(owner.ids.resultOfTheWorkDiv).style.display = '';
            // 客户经理 提醒信息
            ConnectionUtil.ajaxReq({
                        strServId : "calendarService.getAgencyThingt",
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
            // 获取昨日工作成果
            var month = owner.dDate.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var day = owner.dDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var dateStr = owner.dDate.getFullYear() + '-' + month + '-' + day;
            ConnectionUtil.ajaxReq({
                strServId : "emDailyWorkSumService.findDailyWorkSummaryByEmCriteria",
                jsonData : {
                    corpersonky : DataUtil.getUserInfo().objectId
                },
                callback : function(datas) {
                    if (datas.totalCount <= 0) {
                        return;
                    } else if (datas.totalCount > 1) {
                        MsgUtil.error('系统提示', '数据库存在多条数据，请检查数据的正确性!');
                        return;
                    }
                    var dataes = datas.data[0];
                    DataUtil.populateDataForArea(dataes,
                            owner.ids.tomornerWorks);// 渲染数据到页面
                }
            });
            var date2 = new Date((new Date()).getTime() - 1000 * 60 * 60 * 24
                    * 7);

            var year = date2.getFullYear();
            var month = date2.getMonth() + 1;
            if (month < 10) {
                var month = '0' + month;
            }
            var day = date2.getDate();
            if (day < 10) {
                var day = '0' + day;
            }
            var weekStartStr = year + '-' + month + '-' + day;
            // 获取上周工作成果
            ConnectionUtil.ajaxReq({
                strServId : "emWeekWorkSumService.findWeekWorkSummaryByEmCriteria",
                jsonData : {
                    corpersonky : DataUtil.getUserInfo().objectId,
                    weekStartStr : weekStartStr
                },
                callback : function(datas) {
                    if (datas.totalCount <= 0) {
                        return;
                    } else if (datas.totalCount > 1) {
                        MsgUtil.error('系统提示', '数据库存在多条数据，请检查数据的正确性!');
                        return;
                    }
                    var dataes = datas.data[0];
                    DataUtil.populateDataForArea(dataes,
                            owner.ids.shangyizhouWorks);// 渲染数据到页面
                }
            });
            // 客户经理展示客户概览信息列表
            HtmlUtil.getDom(owner.ids.customerInfo).style.display = 'block';

            ConnectionUtil.ajaxReq({
                        strServId : "customerGroupByLevelService.getInfo",
                        jsonData : {
                            a : 1
                        },
                        callback : function(data) {
                            DataUtil.populateDataForArea(data,
                                    owner.ids.customerInfoContentDiv);// 渲染数据到页面
                        }
                    });

        } else if (owner.userInfo.roleid == CodeStringDefinition.ROLE_TYPE_PERSON_CUST_BUSSINS_MANAGER_CODE || 
        		owner.userInfo.roleid == CodeStringDefinition.ROLE_TYPE_PERSON_BEST_CUST_MANAGER_CODE) {
            // 客户经理主管
            // 将工作提醒 设置为显示
            HtmlUtil.getDom(owner.ids.tixing).style.display = 'block';
            HtmlUtil.getDom(owner.ids.hanventTiXin).style.display = 'block';
            ConnectionUtil.ajaxReq({
                        strServId : "calendarService.getAgencyThingt",
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
        }
	}
});