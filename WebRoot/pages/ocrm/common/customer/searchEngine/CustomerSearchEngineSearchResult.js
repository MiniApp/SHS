ObjectUtil.define("crm.pages.ocrm.common.customer.searchEngine.CustomerSearchEngineSearchResult",
				"base.PageObject",{
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/customer/searchEngine/CustomerSearchEngineSearchResult.html",
			idCounter : 0,// 树id生成计数
			initCmp : function() {
				var owner = this;
				this.selectConditionTree = this.create(
						"component.SimpleTree", {
							renderTo : this.ids.selectTreeDiv,
							children : [],
							rootId : 'normroot',// id不能变，后面要引用到
							rootText : '条件树',
							rootVisible : true,
							collapsible : false,
							title : '条件树',
							widthPercent : 0.2,
							height : 461,
							fields : [ 'id', 'text', 'data' ],
							callback : function(tree) {// 组件渲染完后回调渲染数据
								owner.initConditionTreeData();
							}
						});
				this.create('component.Panel', {
					title : '查询条件',
					contentEl : this.ids.customerSerchContentDiv,
					hasBackGroundColor : true,
					height : 140,
					widthPercent : 0.79,
					renderTo : this.ids.customerSerchDiv,
					buttonInPanel : true,
					buttons : [ {
						text : '查询',
						iconCls : 'query',
						handler : function() {
							owner.queryEngineCustomerResult();
						}
					} ]
				});
				// 获取下拉框数据
				this.create("component.EnumSelector",{
					category : [ CodeStringDefinition.CUSTOMER_LEVEL_CATEGORY
					// ,CodeStringDefinition.APPROVAL_RESULT_STATUS_CATEGORY
					],
					renderTo : [ this.ids.customerLevel
					// ,this.ids.examApprStatus
					],
					id : [ this.ids.customerLevel
					// ,this.ids.examApprStatus
					]
				});
				owner.queryEngineCustomerResult();
			},
			queryEngineCustomerResult : function() {
				var owner = this;

				var searchParam = DataUtil
						.getDataFromArea(owner.ids.customerSerchContentDiv);

				if (searchParam == Constants.VALIDATION_FAIL) {
					return;
				}
				var type = "";
				var tbars = null;

				if (DataUtil.getUserInfo().systemId == CodeStringDefinition.PERSONAL_SYSTM_MSGCODE) {// 当前用户属于对私用户
					type = CodeStringDefinition.PERSON_CUSTOMER_TYPE_CODE;
					var qparam = {
						searchEngineObjectId : this.searchEngineId,
						type : type
					};

					var sendParam = ObjectUtil.applyIf(DataUtil
							.decode(searchParam), qparam);
					sendParam = DataUtil.encode(sendParam);
					// 仅总行级主管允许下载客户列表 
					if (DataUtil.getUserInfo().authorityCode == CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE && DataUtil.getUserInfo().position == CodeStringDefinition.EMPLOYEE_POSITION_HEAD) {
						tbars = [{
									text : '下载客户列表',
									tooltip : '下载客户列表',
									iconCls : 'publish',
									handler : function() {
										var loadparam = ObjectUtil.applyIf(DataUtil.decode(searchParam),qparam);
//										owner.create('component.Window',{
//											title : '交叉审批',
//											closable : true,
//											draggable : true,
//											resizable : true,
//											width : 600,
//											height : 130,
//											modal : true,
//											pageObject : owner.create('business.crossAudit.CrossAudit',{
//													id : 'CrossAudit',
//													callback : function(
//															param) {
//														ConnectionUtil
//														.downloadReq({
//															strServId : 'customerSearchEngineService.saveDownloadInfoAndExportCustomerListForPerson',
//															jsonData : param
//														});
//
//													},
//													callbackParam : loadparam
//												})
//										});
										
										ConnectionUtil.downloadReq({
											strServId : 'customerSearchEngineService.saveDownloadInfoAndExportCustomerListForPerson',
											jsonData : DataUtil.encode(loadparam)
										});
									}
								},
								{
									text : '详细信息',
									tooltip : '详细信息',
									iconCls : 'view',
									handler : function() {
										if (grid.getSelectRecords().length == 0) {
											MsgUtil.error('操作出错',
													'请选择一条记录进行查看');
											return;
										} else if (grid
												.getSelectRecords().length > 1) {
											MsgUtil.error('操作出错',
													'只能选择一条记录进行查看');
											return;
										}

										DataUtil.each(grid.getSelectRecords(),
											function(record) {
												owner.openCustomerDetailInfoWinFromSearchResultWin(record);
											});
										// 暂未修改
									}
								},
								{
									text : '发送短信申请',
									tooltip : '向选中客户发送短信申请',
									iconCls : 'email-go',
									handler : function() {
										var records=grid.getSelectRecords();
										if (records.length == 0) {
											MsgUtil.error('操作出错', '请选择客户');
											return;
										}
										if(records.length>Constants.MSG_MAX_SIZE){
											MsgUtil.error('操作出错', '所选择的记录已经超出短信的最大发送量:'+Constants.MSG_MAX_SIZE);
											return;
										}
										var person;
										var customers = [];
										DataUtil.each(records,function(record) {
												person = {
													cusKey : record.get('corpersonky'),
													name : record.get('personName'),
													sex:record.get('sex'),
													mainphone : record.get('mainPhone')
												};
												customers
														.push(person);

											});
										owner.createMsgWindow(customers);
									}

								},
								{
									text : '全发短信申请',
									tooltip : '向所有客户发送短信申请',
									iconCls : 'application_double',
									handler : function() {
										var cusCount=0;
										ConnectionUtil.ajaxReq({
											strServId : "msgSendSetService.searchMsgSendSet",
											async : false,
											callback : function(msg) {
												cusCount = msg.mostsendnumber;
											}
										});
										if (!DataUtil.isEmpty(cusCount)
												&& grid.getTotalCount() > cusCount) {
											MsgUtil.error("错误提示", "当前选择的客户数:"+ grid.getTotalCount() + ",超过了设置的阈值:"
													+ cusCount);
											return;
										}
										owner.createAllMsgWindow(sendParam);
									}

								}];
					} else {
						tbars = [
								{
									text : '详细信息',
									tooltip : '详细信息',
									iconCls : 'view',
									handler : function() {
										if (grid.getSelectRecords().length == 0) {
											MsgUtil.error('操作出错',
													'请选择一条记录进行查看');
											return;
										} else if (grid
												.getSelectRecords().length > 1) {
											MsgUtil.error('操作出错',
													'只能选择一条记录进行查看');
											return;
										}

										DataUtil.each(grid.getSelectRecords(),
											function(record) {
												owner.openCustomerDetailInfoWinFromSearchResultWin(record);
											});

										// 暂未修改
									}
								},

								{
									text : '发送短信申请',
									tooltip : '向选中客户发送短信申请',
									iconCls : 'email-go',
									handler : function() {
										var records=grid.getSelectRecords();
										if (records.length == 0) {
											MsgUtil.error('操作出错', '请选择客户');
											return;
										}
										if(records.length>Constants.MSG_MAX_SIZE){
											MsgUtil.error('操作出错', '所选择的记录已经超出短信的最大发送量:'+Constants.MSG_MAX_SIZE);
											return;
										}
										var person;
										var customers = [];
										DataUtil.each(records,function(record) {
												person = {
														cusKey : record.get('corpersonky'),
														name : record.get('personName'),
														sex:record.get('sex'),
														mainphone : record.get('mainPhone')
												};
												customers
														.push(person);

											});
										owner.createMsgWindow(customers);
									}

								},
								{
									text : '全发短信申请',
									tooltip : '向所有客户发送短信申请',
									iconCls : 'application_double',
									handler : function() {
										var cusCount=0;
										ConnectionUtil.ajaxReq({
											strServId : "msgSendSetService.searchMsgSendSet",
											async : false,
											callback : function(msg) {
												cusCount = msg.mostsendnumber;
											}
										});
										if (!DataUtil.isEmpty(cusCount)
												&& grid.getTotalCount() > cusCount) {
											MsgUtil.error("错误提示", "当前选择的客户数:"+ grid.getTotalCount() + ",超过了设置的阈值:"
													+ cusCount);
											return;
										}
										owner.createAllMsgWindow(sendParam);
									}

							}];
					}
					person = true;
				} else {// 对公

					// 如果是对公的话，就隐藏客户等级查询条件
					var te = HtmlUtil.getDom(owner.ids.cuslvl);
					te.style.display = 'none';
					var cusflag = HtmlUtil
							.getDom(owner.ids.cusnameflag);
					HtmlUtil.setText(cusflag, '客户名称:');

					type = CodeStringDefinition.COPORATE_CUSTOMER_TYPE_CODE;
					var newSearchParam = ObjectUtil.applyIf(DataUtil
							.decode(searchParam), {
						searchEngineObjectId : owner.searchEngineId,
						type : type
					});
					var qparam = {
						searchEngineObjectId : this.searchEngineId,
						type : type
					};
					if (DataUtil.getUserInfo().authorityCode == CodeStringDefinition.USER_ROLE_CUS_MANAGER) {
						tbars = [
								{
									text : '下载客户列表',
									tooltip : '下载客户列表',
									iconCls : 'publish',
									handler : function() {
										var loadparam = ObjectUtil
												.applyIf(
														DataUtil
																.decode(searchParam),
														qparam);
										owner.create('component.Window',
												{
													title : '交叉审批',
													closable : true,
													draggable : true,
													resizable : true,
													width : 600,
													height : 130,
													modal : true,
													pageObject : owner
															.create(
																	'business.crossAudit.CrossAudit',
																	{
																		id : 'CrossAudit',
																		callback : function(
																				param) {
																			ConnectionUtil
																					.downloadReq({
																						strServId : 'customerSearchEngineService.saveDownloadInfoAndExportCustomerList',
																						jsonData : param
																					});
																		},
																		callbackParam : loadparam
																	})
												});
									}
								},
								{
									text : '详细信息',
									tooltip : '详细信息',
									iconCls : 'view',
									handler : function() {
										if (grid.getSelectRecords().length == 0) {
											MsgUtil.error('操作出错',
													'请选择一条记录进行查看');
											return;
										} else if (grid
												.getSelectRecords().length > 1) {
											MsgUtil.error('操作出错',
													'只能选择一条记录进行查看');
											return;
										}

										DataUtil.each(grid.getSelectRecords(),
											function(record) {
												owner.openCustomerDetailInfoWinFrom(record);
											})

										// 暂未修改
									}
								}
//								,
//								{
//									text : '发送短信申请',
//									tooltip : '向选中客户发送短信申请',
//									iconCls : 'email-go',
//									handler : function() {
//										var records=grid.getSelectRecords();
//										if (records.length == 0) {
//											MsgUtil.error('操作出错', '请选择客户');
//											return;
//										}
//										if(records.length>Constants.MSG_MAX_SIZE){
//											MsgUtil.error('操作出错', '所选择的记录已经超出短信的最大发送量:'+Constants.MSG_MAX_SIZE);
//											return;
//										}
//										var person;
//										var customers = [];
//										DataUtil.each(records,function(record) {
//												person = {
//													cusKey : record.get('corpersonky'),
//													name : record.get('personName'),
//													sex:record.get('sex'),
//													mainphone : record.get('mainphone')
//												};
//												customers.push(person);
//
//											});
//										owner.createMsgWindow(customers);
//									}
//
//								},
//								{
//									text : '全发短信申请',
//									tooltip : '向所有客户发送短信申请',
//									iconCls : 'application_double',
//									handler : function() {
//										var cusCount=0;
//										ConnectionUtil.ajaxReq({
//											strServId : "msgSendSetService.searchMsgSendSet",
//											async : false,
//											callback : function(msg) {
//												cusCount = msg.mostsendnumber;
//											}
//										});
//										if (!DataUtil.isEmpty(cusCount)
//												&& grid.getTotalCount() > cusCount) {
//											MsgUtil.error("错误提示", "当前选择的客户数:"+ grid.getTotalCount() + ",超过了设置的阈值:"
//													+ cusCount);
//											return;
//										}
//										owner.createAllMsgWindow(newSearchParam);
//									}
//
//								} 
								];
					} else if (DataUtil.getUserInfo().authorityCode == CodeStringDefinition.USER_ROLE_ACCOUNT_MANAGER) {
						tbars = [{
									text : '下载客户列表',
									tooltip : '下载客户列表',
									iconCls : 'publish',
									handler : function() {
										var loadparam = ObjectUtil
												.applyIf(
														DataUtil
																.decode(searchParam),
														qparam);
										ConnectionUtil.downloadReq({
												strServId : 'customerSearchEngineService.saveDownloadInfoAndExportCustomerList',
												jsonData : DataUtil.encode(loadparam)
										});
									}
								},
						      {
								text : '详细信息',
								tooltip : '详细信息',
								iconCls : 'view',
								handler : function() {
									if (grid.getSelectRecords().length == 0) {
										MsgUtil
												.error('操作出错',
														'请选择一条记录进行查看');
										return;
									} else if (grid.getSelectRecords().length > 1) {
										MsgUtil.error('操作出错',
												'只能选择一条记录进行查看');
										return;
									}

									DataUtil.each(grid.getSelectRecords(),
										function(record) {
											owner.openCustomerDetailInfoWinFrom(record);
										});// 暂未修改
							 }
							}];
					}

					person = false;
				}

				var newSearchParam1 = ObjectUtil.applyIf(DataUtil
						.decode(searchParam), {
					searchEngineObjectId : owner.searchEngineId,
					type : type
				});

				HtmlUtil.overwrite(
						owner.ids.searchEngineCustomerResultListInfo,
						"", false);
				if (type == CodeStringDefinition.PERSON_CUSTOMER_TYPE_CODE) {
					var grid = this.create('component.DataGrid',{
							renderTo : this.ids.searchEngineCustomerResultListInfo,
							strServId : 'customerSearchEngineService.executeEngineForView',
							jsonData : newSearchParam1,
							recordSelected:true,
							mapping : [ 'corpersonky',
									'emppersontypeenum',
									'personName','mainPhone','sex',
									'personCifno',
									'customerLevel', 'aum',
									'depositBal',
									'yearDeposit', 'dob',
									 'address',
									'nodeName', 'registD',
									'alterDttm' ],
							collapsible : false,
							checkbox : true,
							widthPercent : 0.79,
							heightPercent : 0.72,
							title : '查询结果',
							columns : [
									{
										header : "客户姓名",
										sortable : true,
										dataIndex : 'personName',
										widthPercent : 0.18
									},
									{
										header : "客户号",
										sortable : true,
										dataIndex : 'personCifno',
										widthPercent : 0.09
									},
									{
										header : "所属机构",
										sortable : true,
										dataIndex : 'nodeName',
										widthPercent : 0.20
									},
									{
										header : "客户等级",
										sortable : true,
										dataIndex : 'customerLevel',
										widthPercent : 0.09
									},
									{
										header : "AUM",
										sortable : true,
										dataIndex : 'aum',
										widthPercent : 0.09
									},
									{
										header : "年日均存款",
										sortable : true,
										dataIndex : 'yearDeposit',
										widthPercent : 0.09
									},
									{
										header : "时点存款",
										sortable : true,
										dataIndex : 'depositBal',
										widthPercent : 0.09
									},
									{
										header : "出生日期",
										sortable : true,
										dataIndex : 'dob',
										widthPercent : 0.09
									},
//									{
//										header : "手机号码",
//										sortable : true,
//										dataIndex : 'mainPhone',
//										widthPercent : 0.09
//									},
//									{
//										header : "地址",
//										sortable : true,
//										dataIndex : 'address',
//										widthPercent : 0.09
//									},
									{
										header : "成为我行客户时间",
										sortable : true,
										dataIndex : 'registD',
										widthPercent : 0.11
									} ],
							tbar : tbars
						});
				} else {
					var grid = this.create('component.DataGrid',{
							renderTo : this.ids.searchEngineCustomerResultListInfo,
							strServId : 'customerSearchEngineService.executeEngineForView',
							jsonData : newSearchParam1,
							recordSelected:true,
							mapping : [ 'corpersonky',
									'emppersontypeenum',
									'personName','mainPhone','sex',
									'personCifno',
									'customerLevel', 'aum',
									'depositBal',
									'yearDeposit', 'dob', 'address',
									'nodeName', 'registD',
									'alterDttm','totalBalance','totalAum' ],
							collapsible : false,
							checkbox : true,
							widthPercent : 0.79,
							heightPercent : 0.72,
							title : '查询结果',
							columns : [
									{
										header : "客户姓名",
										sortable : true,
										dataIndex : 'personName',
										width : 180
										,
										renderer : function(
												value,
												metaData,
												record) {
											return owner
													.rendererCorporateCustomerIndexToWindow({
														name : value,
														customerky : record.data.corpersonky,
													 	authority:CodeStringDefinition.OtherRMPort_EMPLOYEE_AUTHORITY
													});
										}
									},
									{
										header : "客户号",
										sortable : true,
										dataIndex : 'personCifno',
										width : 60
									},
									{
										header : "主办机构",
										sortable : true,
										dataIndex : 'nodeName',
										width : 80
									},
									{
										header : "存款年日均",
										sortable : true,
										dataIndex : 'totalAum',
										width : 90
									},
									{
										header : "存款余额",
										sortable : true,
										dataIndex : 'totalBalance',
										width : 90
									},
									{
										header : "是否现有贷客户",
										sortable : true,
										dataIndex : 'registD',
										width : 90
									},
									{
										header : "分配状态",
										sortable : true,
										dataIndex : 'mainPhone',
										width : 90
									} ],
							tbar : tbars
						});
				}

			},
			/**
			 * 客户详细信息页面
			 */
			openCustomerDetailInfoWinFromSearchResultWin : function(record) {
				var owner = this;
				var win = this.create('component.Window', {
					title : record.data.personName,
					closable : true,
					draggable : true,
					width : 1200,
					height : 700,
					modal : true,
					pageObject : this.create(
							'business.customer.CustomerIndex', {
								id : 'groupCusDetailInfoWin',
								customerky : record.data.corpersonky,
								name : record.data.personName,
								authority : 'User',
								type : 'person'
							})
				});
				// win.on('close', function() {
				// owner.queryGroupCustomerList();
				// });
			},
			initConditionTreeData : function() {
				var owner = this;
				ConnectionUtil
					.ajaxReq({
						strServId : "engineService.getEngineConditionInfoById",
						submitWaitMessage : false,
						jsonData : this.searchEngineId,
						callback : function(data) {
							var treeData = [];
							var children = [];
							var i = 0;
							var text = "";
							DataUtil.each(data,function(condition) {
								if (i != 0) {
									text = "（";
									if (condition.logicoperator == CodeStringDefinition.RLATIONA_CODE) {
										text += "并且";
									} else if (condition.logicoperator == CodeStringDefinition.RLATIONB_CODE) {
										text += "或者";
									}
									text += "）";
								}
								if (condition.type == '0') {// 简单条件
									children
											.push(owner
													.bulidSimpleCondtionTreeData(
															condition,
															text));
								} else {// 复合条件
									children
											.push(owner
													.bulidComplexCondtionTreeData(
															condition,
															text));
								}
								i++;
							});
						owner.selectConditionTree.appendChild(children);
						}
					});
			},
			bulidSimpleCondtionTreeData : function(condition, text) {
				var owner = this;
				var child = {};
				child.id = owner.getCommonNodeId();
				child.leaf = true;
				child.data = {
					normid : condition.normid,
					logicoperator : condition.logicoperator,
					caption : condition.caption,
					type : condition.type
				}
				var fields = [];
				var i = 0;
				DataUtil.each(condition.fields, function(field) {
					if (i > 0) {
						text += " （并且） ";
					}
					text += field.text;
					fields.push({
						id : field.id,
						type : field.type,
						value : field.value,
						operator : field.operator
					});
					i++;
				});

				child.text = text;
				child.data.fields = fields;
				return child;
			},
			bulidComplexCondtionTreeData : function(condition, text) {
				var owner = this;
				var child = {};
				child.id = owner.getCommonNodeId();
				child.text = text + '{' + condition.caption + '}';
				child.leaf = false;
				child.data = {
					logicoperator : condition.logicoperator,
					caption : condition.caption,
					type : condition.type
				};
				var childrenNorm = [];
				var i = 0;
				text = "";
				DataUtil.each(condition.childNorm, function(child) {
					if (i > 0) {
						text += " （并且） ";
					}
					childrenNorm.push(owner
							.bulidSimpleCondtionTreeData(child, text));
					i++;
				});
				child.children = childrenNorm;
				return child;
			},
			getOperatorDesc : function(operator) {
				if (operator == 'CUSSEET') {
					return '等于';
				} else if (operator == 'CUSSENET') {
					return '不等于';
				} else if (operator == 'CUSSEGTE') {
					return '大于等于';
				} else if (operator == 'CUSSELTE') {
					return '小于等于';
				}
			},

			getCommonNodeId : function() {
				return "webfx-tree-object-" + this.idCounter++;
			},

			/**
			 * 向选中客户发送短信申请
			 * 
			 * @parama
			 * @return
			 * @程序员：潘飞
			 * @编码日期：2012-10-17
			 * @最后修改日期：
			 */

			createMsgWindow : function(customers) {
				var owner = this;
				// 创建新增窗口
				var win = this.create('component.Window',{
						title : '向选中客户发送短信申请',
						closable : true,
						draggable : true,
						resizable : true,
						hasBackGroundColor : true,
						width : 779,
						height : 280,
						modal : true,
						pageObject : this.create('crm.pages.ocrm.common.component.shortMsg.ManagerSendMessage',// 创建新增页面对象
							{
								id : 'SendMessage',// /////////////
								customers : customers
							})
					});
				win.on('close', function() {
					owner.queryEngineCustomerResult();// 窗口关闭后刷新列表
				});
			},

			/**
			 * 向所有客户发送短信申请
			 * 
			 * @param
			 * @return
			 * @程序员：潘飞
			 * @编码日期：2012-10-17
			 * @最后修改日期：
			 */
			createAllMsgWindow : function(searchData) {
				var owner = this;
				var win = this.create('component.Window',{
						title : '综合查询所有客户发送短信申请',
						closable : true,
						draggable : true,
						resizable : true,
						hasBackGroundColor : true,
						width : 680,
						height : 450,
						pageObject :owner.create('crm.pages.ocrm.common.component.shortMsg.LargeSmsOfDataSendMessage',
							{
								id : 'markeSendMessagePlan',
								corCampaignKy : owner.searchEngineId,
								msgType : 'searchEngineCust',
								msgName:(owner.engineName+'短信申请'),
								jsdata:DataUtil.decode(searchData),
								camptitle:owner.engineName
							})
					});

				win.on('close', function() {
					owner.queryEngineCustomerResult();// 窗口关闭后刷新列表
				});
			},

			/**
			 * 查询对公客户的详细信息
			 * 
			 * @param
			 * @return
			 * @程序员：潘飞
			 * @编码日期：2012-10-17
			 * @最后修改日期：
			 */
			openCustomerDetailInfoWinFrom : function(record){
				var owner = this;
				var emtype = record.data.emppersontypeenum; // 获取权限
				if (emtype == null) {
					MsgUtil.alert("提示", "获取权限为空，不能查看相信信息！");
					return;
				}
				var au;
				if (emtype == CodeStringDefinition.CORP_CUS_MANAGER_TYPE_MAIN_INT) {// 主客户经理
					au = CodeStringDefinition.RMPort_EMPLOYEE_AUTHORITY;
				} else {
					au = CodeStringDefinition.AssistRMPort_EMPLOYEE_AUTHORITY;
				}
				var win = this.create('component.Window', {
					title : record.data.personName,
					closable : true,
					draggable : true,
					width : 900,
					height : 500,
					modal : true,
					pageObject : this.create(
							'business.customer.CustomerIndex', {
								id : 'CusDetailInfoWin',
								customerky : record.data.corpersonky,
								name : record.data.personName,
								authority : au,
								type : 'corporate'
							})
				});
			}
	});