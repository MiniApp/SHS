/**
 * 
 * 测试列表
 * 
 * <p/> 功能描述：
 * 
 * <li>测试新组件</li>
 * 
 * author:wanghua
 * 
 * date:2012-07-02
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.customer.searchEngine.CustomerSearchEngineList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/customer/searchEngine/CustomerSearchEngineList.html",// 页面url地址
					/**
					 * 初始化数据
					 * 
					 * @param
					 * @return
					 */
					initData : function() {
					},
					/**
					 * 初始化頁面組件
					 * 
					 * @param
					 * @return
					 */
					initCmp : function() {
						var owner = this;
						// 创建panel
						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.searchEngineListInfoPanel,
							contentEl : this.ids.searchEngineListInfoSubArea,
							hasBackGroundColor : true,
							widthPercent : 0.985,
							height : 114,
							buttons : [ {
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.queryEngineList();
								}
							} ]
						});
						this.create("component.EnumSelector", {
							category : [ 'PsnschstatusEnum',
									'ENG_ExecuteStatusEnum' ],
							renderTo : [ this.ids.searchEngineListStatus,
									this.ids.searchEngineListExecuteStatus ],
							id : [ this.ids.searchEngineListStatus,
									this.ids.searchEngineListExecuteStatus ]
						});
						this.queryEngineList();
					},

					/**
					 * 查询列表
					 * 
					 * @param
					 * @return
					 */
					queryEngineList : function() {
						var owner = this;

						var seachParam = DataUtil
								.getDataFromArea(owner.ids.searchEngineListInfoSubArea);

						if (seachParam == Constants.VALIDATION_FAIL) {
							return;
						}

						HtmlUtil.overwrite(this.ids.searchEngineListInfo, "",
								false);

						var bar = null;
						if(DataUtil.getUserInfo().systemId == CodeStringDefinition.CORPOR_SYSTM_MSGCODE){
							bar =[
													{
														text : '查看客户搜索结果',
														tooltip : '查看客户搜索结果',
														iconCls : 'usercount',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}

															var executeStatusDesc = grid
																	.getSelectRecords()[0]
																	.get('executeStatus');
															if (DataUtil
																	.isEmpty(executeStatusDesc)
																	|| executeStatusDesc != CodeStringDefinition.PERSON_FINISHED_EXECUTE_STATUS_SEARCHENGINE_MSGCODE) {
																MsgUtil.error("查看出错",
																				"本引擎还没有执行或正在执行中,无法查看到客户搜索结果.");
																return;
															}
															owner.openViewCustomerWindow(grid
																			.getSelectRecords()[0]);
														}
													},
													{
														text : '请求执行',
														tooltip : '请求执行',
														iconCls : 'cd',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															var exeStatus = grid
																	.getSelectRecords()[0]
																	.get('executeStatus');
															if (engineStatus != CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面验证出错",
																				'引擎当前执行状态不为"已发布"，不允许执行');

																return;
															}
															// 请求执行引擎,条件:执行状态只能为空或者"正常"
															if (DataUtil
																	.isEmpty(exeStatus)) {
																// 执行完毕
																if (exeStatus == CodeStringDefinition.PERSON_FINISHED_EXECUTE_STATUS_SEARCHENGINE_MSGCODE) {

																	MsgUtil.error(
																					"页面验证出错",
																					'引擎当前执行状态为"已完成"，不允许再次加入执行队列，您可以直接查看到搜索结果');

																	return;

																	// 准备执行、正在执行、请求执行
																} else if (exeStatus == CodeStringDefinition.PERSON_READY_EXECUTE_STATUS_SEARCHENGINE_MSGCODE
																		|| exeStatus == CodeStringDefinition.PERSON_REQUEST_EXECUTE_STATUS_SEARCHENGINE_MSGCODE) {

																	MsgUtil.error(
																					"页面验证出错",
																					"该引擎已存在于执行队列中,请稍后查看执行结果");

																	return;
																}
															}
															var type = "";
															if (DataUtil
																	.getUserInfo().systemId == CodeStringDefinition.PERSONAL_SYSTM_MSGCODE) {// 当前用户属于对私用户
																type = CodeStringDefinition.PERSON_CUSTOMER_TYPE_CODE;
															} else {// 对公
																type = CodeStringDefinition.COPORATE_CUSTOMER_TYPE_CODE;
															}
															ConnectionUtil
																	.ajaxReq({
																		strServId : "customerSearchEngineService.engineExecuteEnqueue",
																		jsonData : {
																			searchEngineId : grid
																					.getSelectRecords()[0]
																					.get('personsearchengineky'),
																			type : type
																		},
																		callback : function(
																				data) {
																			MsgUtil
																					.alert(
																							"提示信息",
																							"执行成功,请稍后查看引擎结果.");
																			owner
																					.queryEngineList();
																		}
																	});
														}
													},
													{
														text : '查看明细',
														tooltip : '查看明细',
														iconCls : 'view',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行查看');
																return;
															}

															owner
																	.openViewEngineWindow(grid
																			.getSelectRecords()[0]);
														}
													},
													{
														text : '创建',
														tooltip : '创建',
														iconCls : 'add',
														handler : function() {
															owner
																	.openCreateEngineWindow();
														}
													},
													{
														text : '全量搜索引擎',
														tooltip : '全量搜索引擎',
														iconCls : 'add',
														handler : function() {
															var win = owner.create('component.Window', {
																						title : '日期选择',
																						closable : true,
																						draggable : true,
																						resizable : true,
																						width : 500,
																						height : 120,
																						modal : true,
																						pageObject : owner.create(
																								'crm.pages.ocrm.common.customer.searchEngine.AssistEmployeeAllocation',// 创建页面对象
																								{
																									id : 'AssignCustomerBatch'
																								})
																					});
															win.on('close',function() {
																owner.queryEngineList();	
															});
														}
													},
													{
														text : '定制修改',
														tooltip : '定制修改',
														iconCls : 'edit',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行修改');
																return;
															}
															// 验证状态为 "设计中",方可修改
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus == CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE
																	|| engineStatus == CodeStringDefinition.PERSON_ABATE_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面验证出错",
																				"引擎已经处于发布或废止状态，不允许再做任何修改");

																return;
															}
															owner
																	.openUpdateEngineWindow(grid
																			.getSelectRecords()[0]);

														}
													},
													{
														text : '发布',
														tooltip : '发布',
														iconCls : 'accept',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus == CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面提示",
																				"您已经成功发布该引擎");

																return;
															}
															ConnectionUtil
																	.ajaxReq({
																		strServId : "customerSearchEngineService.publishSearchEngine",
																		jsonData : {
																			searchEngineId : grid
																					.getSelectRecords()[0]
																					.get('personsearchengineky')
																		},
																		callback : function(
																				data) {
																			MsgUtil
																					.alert(
																							"提示信息",
																							"引擎发布成功!");
																			owner
																					.queryEngineList();
																		}
																	});

														}
													},
													{
														text : '废止',
														tooltip : '废止',
														iconCls : 'delete',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus != CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面验证出错",
																				'只有状态为"已发布"的引擎才能执行废止功能');

																return;
															}
															ConnectionUtil
																	.ajaxReq({
																		strServId : "customerSearchEngineService.invalidateSearchEngine",
																		jsonData : {
																			searchEngineId : grid
																					.getSelectRecords()[0]
																					.get('personsearchengineky')
																		},
																		callback : function(
																				data) {
																			MsgUtil
																					.alert(
																							"提示信息",
																							"引擎废止成功!");
																			owner
																					.queryEngineList();
																		}
																	});

														}
													},
													{
														text : '删除',
														tooltip : '删除',
														iconCls : 'cancel',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus == CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面提示",
																				'该引擎已是"已发布"状态,不允许删除.');

																return;
															}
															MsgUtil
																	.confirm(
																			"提示",
																			"确定要删除此引擎吗?",
																			function(
																					btn) {
																				if (btn == 'yes') {

																					ConnectionUtil
																							.ajaxReq({
																								strServId : "customerSearchEngineService.deleteEngine",
																								jsonData : {
																									searchEngineId : grid
																											.getSelectRecords()[0]
																											.get('personsearchengineky')
																								},
																								callback : function(
																										data) {
																									MsgUtil
																											.alert(
																													"提示信息",
																													"引擎删除成功!");
																									owner
																											.queryEngineList();
																								}
																							});
																				}
																			})
														}
													}];
						}else{
							bar = [
													{
														text : '查看客户搜索结果',
														tooltip : '查看客户搜索结果',
														iconCls : 'usercount',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}

															var executeStatusDesc = grid
																	.getSelectRecords()[0]
																	.get('executeStatus');
															if (DataUtil
																	.isEmpty(executeStatusDesc)
																	|| executeStatusDesc != CodeStringDefinition.PERSON_FINISHED_EXECUTE_STATUS_SEARCHENGINE_MSGCODE) {
																MsgUtil.error("查看出错",
																				"本引擎还没有执行或正在执行中,无法查看到客户搜索结果.");
																return;
															}
															owner.openViewCustomerWindow(grid
																			.getSelectRecords()[0]);
														}
													},
													{
														text : '请求执行',
														tooltip : '请求执行',
														iconCls : 'cd',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															var exeStatus = grid
																	.getSelectRecords()[0]
																	.get('executeStatus');
															if (engineStatus != CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面验证出错",
																				'引擎当前执行状态不为"已发布"，不允许执行');

																return;
															}
															// 请求执行引擎,条件:执行状态只能为空或者"正常"
															if (DataUtil
																	.isEmpty(exeStatus)) {
																// 执行完毕
																if (exeStatus == CodeStringDefinition.PERSON_FINISHED_EXECUTE_STATUS_SEARCHENGINE_MSGCODE) {

																	MsgUtil.error(
																					"页面验证出错",
																					'引擎当前执行状态为"已完成"，不允许再次加入执行队列，您可以直接查看到搜索结果');

																	return;

																	// 准备执行、正在执行、请求执行
																} else if (exeStatus == CodeStringDefinition.PERSON_READY_EXECUTE_STATUS_SEARCHENGINE_MSGCODE
																		|| exeStatus == CodeStringDefinition.PERSON_REQUEST_EXECUTE_STATUS_SEARCHENGINE_MSGCODE) {

																	MsgUtil.error(
																					"页面验证出错",
																					"该引擎已存在于执行队列中,请稍后查看执行结果");

																	return;
																}
															}
															var type = "";
															if (DataUtil
																	.getUserInfo().systemId == CodeStringDefinition.PERSONAL_SYSTM_MSGCODE) {// 当前用户属于对私用户
																type = CodeStringDefinition.PERSON_CUSTOMER_TYPE_CODE;
															} else {// 对公
																type = CodeStringDefinition.COPORATE_CUSTOMER_TYPE_CODE;
															}
															ConnectionUtil
																	.ajaxReq({
																		strServId : "customerSearchEngineService.engineExecuteEnqueue",
																		jsonData : {
																			searchEngineId : grid
																					.getSelectRecords()[0]
																					.get('personsearchengineky'),
																			type : type
																		},
																		callback : function(
																				data) {
																			MsgUtil
																					.alert(
																							"提示信息",
																							"执行成功,请稍后查看引擎结果.");
																			owner
																					.queryEngineList();
																		}
																	});
														}
													},
													{
														text : '查看明细',
														tooltip : '查看明细',
														iconCls : 'view',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行查看');
																return;
															}

															owner
																	.openViewEngineWindow(grid
																			.getSelectRecords()[0]);
														}
													},
													{
														text : '创建',
														tooltip : '创建',
														iconCls : 'add',
														handler : function() {
															owner
																	.openCreateEngineWindow();
														}
													},
													{
														text : '定制修改',
														tooltip : '定制修改',
														iconCls : 'edit',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行修改');
																return;
															}
															// 验证状态为 "设计中",方可修改
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus == CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE
																	|| engineStatus == CodeStringDefinition.PERSON_ABATE_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面验证出错",
																				"引擎已经处于发布或废止状态，不允许再做任何修改");

																return;
															}
															owner
																	.openUpdateEngineWindow(grid
																			.getSelectRecords()[0]);

														}
													},
													{
														text : '发布',
														tooltip : '发布',
														iconCls : 'accept',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus == CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面提示",
																				"您已经成功发布该引擎");

																return;
															}
															ConnectionUtil
																	.ajaxReq({
																		strServId : "customerSearchEngineService.publishSearchEngine",
																		jsonData : {
																			searchEngineId : grid
																					.getSelectRecords()[0]
																					.get('personsearchengineky')
																		},
																		callback : function(
																				data) {
																			MsgUtil
																					.alert(
																							"提示信息",
																							"引擎发布成功!");
																			owner
																					.queryEngineList();
																		}
																	});

														}
													},
													{
														text : '废止',
														tooltip : '废止',
														iconCls : 'delete',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus != CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面验证出错",
																				'只有状态为"已发布"的引擎才能执行废止功能');

																return;
															}
															ConnectionUtil
																	.ajaxReq({
																		strServId : "customerSearchEngineService.invalidateSearchEngine",
																		jsonData : {
																			searchEngineId : grid
																					.getSelectRecords()[0]
																					.get('personsearchengineky')
																		},
																		callback : function(
																				data) {
																			MsgUtil
																					.alert(
																							"提示信息",
																							"引擎废止成功!");
																			owner
																					.queryEngineList();
																		}
																	});

														}
													},
													{
														text : '删除',
														tooltip : '删除',
														iconCls : 'cancel',
														handler : function() {
															if (grid
																	.getSelectRecords().length == 0) {
																MsgUtil
																		.error(
																				'操作出错',
																				'请选择一条记录进行操作');
																return;
															}
															var engineStatus = grid
																	.getSelectRecords()[0]
																	.get('status');

															if (engineStatus == CodeStringDefinition.PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE) {

																MsgUtil
																		.error(
																				"页面提示",
																				'该引擎已是"已发布"状态,不允许删除.');

																return;
															}
															MsgUtil
																	.confirm(
																			"提示",
																			"确定要删除此引擎吗?",
																			function(
																					btn) {
																				if (btn == 'yes') {

																					ConnectionUtil
																							.ajaxReq({
																								strServId : "customerSearchEngineService.deleteEngine",
																								jsonData : {
																									searchEngineId : grid
																											.getSelectRecords()[0]
																											.get('personsearchengineky')
																								},
																								callback : function(
																										data) {
																									MsgUtil
																											.alert(
																													"提示信息",
																													"引擎删除成功!");
																									owner
																											.queryEngineList();
																								}
																							});
																				}
																			})
														}
													}];
						}
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.searchEngineListInfo,
											strServId : 'customerSearchEngineService.getMySearchEngineList',
											jsonData : seachParam,
											mapping : [ 'personsearchengineky',
													'name', 'description',
													'status', 'statusDesc',
													'executeStatusDesc',
													'creatorName',
													'lastQueryTime',
													'executeStatusDesc',
													'createDateTime',
													'queueTime',
													'executeStatus','execyteDay' ],
											collapsible : false,
											checkbox : false,
											widthPercent : 0.985,
											heightPercent : 0.815,
											title : '搜索引擎列表',
											columns : [
													{
														header : "引擎名称",
														sortable : true,
														dataIndex : 'name',
														widthPercent : 0.25
													},
													{
														header : "引擎描述",
														sortable : true,
														dataIndex : 'description',
														widthPercent : 0.25
													},
													{
														header : "引擎状态",
														sortable : true,
														dataIndex : 'statusDesc',
														widthPercent : 0.14
													},
													{
														header : "执行状态",
														sortable : true,
														dataIndex : 'executeStatusDesc',
														widthPercent : 0.13
													},
													{
														header : "创建人",
														sortable : true,
														dataIndex : 'creatorName',
														widthPercent : 0.1
													},{
														header : "执行时间",
														sortable : true,
														dataIndex : 'lastQueryTime',
														widthPercent : 0.13
													}],
											tbar : bar
										});
					},
					/**
					 * 打开創建窗口
					 * 
					 * @param
					 * @return
					 */
					openCreateEngineWindow : function() {
						var owner = this;
						var win = this
								.create(
										"component.Window",
										{
											title : '创建引擎',
											closable : true,
											draggable : true,
											width : 900,
											height : 562,
											modal : true,
											pageObject : ObjectUtil
													.create(
															'crm.pages.ocrm.common.customer.searchEngine.CreateCustomerSearchEngine',
															{
																id : 'CreateCustomerSearchEngine'
															})
										});
						win.on('close', function() {
							owner.queryEngineList();
						})
					},
					/**
					 * 打开修改窗口
					 * 
					 * @param
					 * @return
					 */
					openUpdateEngineWindow : function(record) {
						var owner = this;
						var win = this
								.create(
										"component.Window",
										{
											title : '修改引擎',
											closable : true,
											draggable : true,
											width : 900,
											height : 560,
											modal : true,
											pageObject : ObjectUtil
													.create(
															'crm.pages.ocrm.common.customer.searchEngine.UpdateCustomerSearchEngine',
															{
																id : 'UpdateCustomerSearchEngine',
																searchEngineId : record
																		.get('personsearchengineky'),
																eningeStatus : record
																		.get('statusDesc'),
																eningeName : record
																		.get('name'),
																eningeDesc : record
																		.get('description'),
																execyteDay : record
																		.get('execyteDay')
															})
										});
						win.on('close', function() {
							owner.queryEngineList();
						})
					},
					openViewEngineWindow : function(record) {
						var owner = this;
						var win = this
								.create(
										"component.Window",
										{
											title : '引擎明细',
											closable : true,
											draggable : true,
											width : 800,
											height : 500,
											modal : true,
											pageObject : this
													.create(
															'crm.pages.ocrm.common.customer.searchEngine.CustomerSearchEngineDetail',
															{
																id : 'CustomerSearchEngineDetail',
																searchEngineId : record
																		.get('personsearchengineky'),
																eningeStatus : record
																		.get('statusDesc'),
																eningeName : record
																		.get('name'),
																eningeDesc : record
																		.get('description'),
																execyteDay : record
																		.get('execyteDay')
															})
										});
					},
					openViewCustomerWindow : function(record) {
						var owner = this;
						var win = this.create("component.Window",
							{
								title : '客户搜索结果列表',
								closable : true,
								draggable : true,
								width : 1000,
								height : 550,
								modal : true,
								maximizable : true,
								pageObject : ObjectUtil
										.create(
												'crm.pages.ocrm.common.customer.searchEngine.CustomerSearchEngineSearchResult',
												{
													id : 'CustomerSearchEngineSearchResult',
													searchEngineId : record
															.get('personsearchengineky'),
													engineName:record
													.get('name'),
													lastQueryTime : record
															.get('lastQueryTime')
												})
							});
					}

				});