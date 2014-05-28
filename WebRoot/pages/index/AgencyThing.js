ObjectUtil.define(
				"crm.pages.mainPage.AgencyThing",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/mainPage/AgencyThing.html",// 页面地址
							/**
					 * 初始化页面数据
					 * 
					 * @author zhouyangsen
					 * @param
					 * @return
					 * @编码时间 2013-o3-11
					 * @最后修改时间
					 */
					initData : function() {
						var owner = this;
						ConnectionUtil
								.ajaxReq( {
									strServId : "calendarService.getAgencyThingt",
									jsonData : {
										employeeky : this.rmcodeky
									},
									callback : function(data) {
										DataUtil
												.populateDataForArea(
														data,
														owner.ids.agentcustomerSearch);// 渲染数据到页面
									}
								});
					},
					initCmp : function() {

						var owner = this;
						HtmlUtil.getDom(this.ids.willsendmodle1).onclick = function() {
							owner.window1();
						}
						HtmlUtil.getDom(this.ids.willsendmodle2).onclick = function() {
							owner.window2();
						}
						HtmlUtil.getDom(this.ids.willsendmodle3).onclick = function() {
							owner.window3();
						}
						HtmlUtil.getDom(this.ids.willsendmodle4).onclick = function() {
							owner.window4();
						}
						HtmlUtil.getDom(this.ids.willsendmodle5).onclick = function() {
							owner.window5();
						}
						HtmlUtil.getDom(this.ids.willsendmodle6).onclick = function() {
							owner.window6();
						}
						HtmlUtil.getDom(this.ids.willsendmodle7).onclick = function() {
							owner.window7();
						}
						HtmlUtil.getDom(this.ids.willsendmodle8).onclick = function() {
							owner.window8();
						}
					},
					
					window1 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '账户大额变动提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.AbundWarnAwoke',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
					window2 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '客户大额变动提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.CusAbundWarnAwoke',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
					window3 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '风险提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.RiskAwokeManagement',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
					window4 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '客户等级变化提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.CuslevelAwokeManagement',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
					window5 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '重要日期提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerImportDateAwokeList2',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
					window6 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '产品到期提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerImportDateAwokeList3',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
					window7 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '营销提示提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerImportDateAwokeList',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
					window8 : function() {

						var owner = this;
						//选择客户经理
						var win = this
								.create(
										'component.Window',
										{
											title : '客户转移提醒',
											closable : true,
											draggable : true,
											resizable : true,
											width : 900,
											height : 600,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.person.customer.cusAwokeManage.CustomerTransferAwoke',// 创建页面对象
															{
																id : 'zhoubapi',
																rmcodeky : DataUtil
																		.getUserInfo().objectId
															})
										});
						
					},
							});