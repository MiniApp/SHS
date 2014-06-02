/**
 * 综合查询引擎选择页面 <p/> 功能描述：
 * <li>选择综合查询引擎</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("business.searchEngine.SelectSearchEngine",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/component/searchEngine/SelectSearchEngine.html",
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
				this.querySearchEngineList();
			},
			/**
			 * 查询综合查询引擎列表，提供选择功能
			 * 
			 * @param
			 * @return
			 * @程序员：wanghua
			 * @编码日期：2012-07-18
			 * @最后修改日期：
			 */
			querySearchEngineList : function() {
				var owner = this;
				var checkbox = false;
				if (this.checkbox) {
					checkbox = this.checkbox;
				}
				var strServId = null;
				if (DataUtil.isEmpty(this.strServId)) {
					strServId = 'searcheEnginSelectService.getSearchEngineList'
				} else {
					strServId = this.strServId;
				}
				var createtorky = null;
				if (this.createtorky) {
					createtorky = this.createtorky;
				} else {
					createtorky = DataUtil.getUserInfo().objectId
				}
				HtmlUtil.overwrite(this.ids.searchEnginListDiv, "", false);
				var grid = this.create('component.DataGrid', {
					// width : (this.width || 900) - 260,
					renderTo : this.ids.searchEnginListDiv,
					strServId : strServId,
					heightPercent : 0.99,
					jsonData : {
						createtorky : createtorky
					},
					mapping : ['objectId', 'name', 'description', 'status',
							'executeStatus', 'statusDesc', 'executeStatusDesc',
							'creatorName'],
					collapsible : false,
					checkbox : checkbox,
					multiSelect : checkbox,
					title : '查询结果',
					columns : [{
								header : "引擎名称",
								sortable : true,
								dataIndex : 'name',
								width : 150
							}, {
								header : "引擎描述",
								sortable : true,
								dataIndex : 'description',
								width : 250
							}, {
								header : "引擎状态",
								sortable : true,
								dataIndex : 'statusDesc',
								width : 100
							}, {
								header : "执行状态",
								sortable : true,
								dataIndex : 'executeStatusDesc',
								width : 83
							}, {
								header : "创建人",
								sortable : true,
								dataIndex : 'creatorName',
								width : 100
							}],
					tbar : [{
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
																MsgUtil
																		.error(
																				"查看出错",
																				"本引擎还没有执行或正在执行中,无法查看到客户搜索结果.");
																return;
															}
															owner
																	.openViewCustomerWindow(grid
																			.getSelectRecords()[0]);
														}
													},{
						text : '确定',
						tooltip : '确定',
						iconCls : 'add',
						handler : function() {
							if (grid.getSelectRecords().length == 0) {
								MsgUtil.error('操作出错', '请先选择记录');
								return;
							}
//							owner
//									.checkSelect(grid.getSelectRecords(),
//											checkbox);
							// HtmlUtil.getDom(owner.displayDomId).value = "";
							// HtmlUtil.getDom(owner.hiddenDomId).value = "";
							if (checkbox) {
								try {
									DataUtil.each(grid.getSelectRecords(),
											function(record) {

												if (DataUtil
														.isEmpty(HtmlUtil
																.getDom(owner.hiddenDomId).value)) {
													HtmlUtil
															.getDom(owner.hiddenDomId).value = record
															.get('objectId');
												} else {
													var values = HtmlUtil
															.getDom(owner.hiddenDomId).value
															.split(',');
													DataUtil.each(values,
															function(value) {
																if (value == record
																		.get('objectId')) {
																	ExceptionUtil
																			.throwBusinessException(
																					{
																						title : '选择错误',
																						msg : '已经选择了:'
																								+ record
																										.get('name')
																					});
																}
															});
													HtmlUtil
															.getDom(owner.hiddenDomId).value = HtmlUtil
															.getDom(owner.hiddenDomId).value
															+ ","
															+ record
																	.get('objectId');
												}
												if (DataUtil
														.isEmpty(HtmlUtil
																.getDom(owner.displayDomId).value)) {
													HtmlUtil
															.getDom(owner.displayDomId).value = record
															.get('name');
												} else {
													HtmlUtil
															.getDom(owner.displayDomId).value = HtmlUtil
															.getDom(owner.displayDomId).value
															+ ","
															+ record
																	.get('name');
												}
											});

								} catch (exception) {
									MsgUtil.error("错误提示", exception);
									return;
								}
							} else {

								HtmlUtil.getDom(owner.displayDomId).value = grid
										.getSelectRecords()[0].get('name');
								HtmlUtil.getDom(owner.hiddenDomId).value = grid
										.getSelectRecords()[0].get('objectId');
							}
							owner.parent.close();
						}
					}]
				});
			},
			/**
			 * 检查选择的搜索引擎状态是否为执行完毕
			 * 
			 * @param records选择的记录，checkbox是否多选
			 * @return
			 * @程序员：wanghua
			 * @编码日期：2012-07-18
			 * @最后修改日期：
			 */
			checkSelect : function(records, checkbox) {
				if (checkbox) {
					DataUtil.each(records, function(record) {
						if (record.get('executeStatus') != CodeStringDefinition.CAMSTATUS_NETBANK_FINISHED_MSGCODE) {// 状态不为执行完毕
							ExceptionUtil.throwBusinessException({
										msg : '只能选择执行完毕的综合查询引擎'
									});
						}
					});
				} else {
					if (records[0].get('executeStatus') != CodeStringDefinition.CAMSTATUS_NETBANK_FINISHED_MSGCODE) {// 状态不为执行完毕
						ExceptionUtil.throwBusinessException({
									msg : '只能选择执行完毕的综合查询引擎'
								});
					}
				}
			},
			/**
			 *查看搜索引擎结果
			 * 
			 * @param 
			 * @return
			 * @程序员：wanghua
			 * @编码日期：2012-07-18
			 * @最后修改日期：
			 */
			openViewCustomerWindow : function(record) {
						var owner = this;
						var win = this
								.create(
										"component.Window",
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
																		.get('objectId')
//																lastQueryTime : record
//																		.get('lastQueryTime')
															})
										});
					}
		});