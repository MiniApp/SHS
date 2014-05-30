/**
 * 产品模板管理 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>查询产品模板列表</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.ProductTemplateList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/ProductTemplateList.html",// 页面url地址
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-08-01
				     * @最后修改日期：
				     */
					initCmp : function() {
						var owner = this;
					    this.systemId = DataUtil.getUserInfo().systemId;
						// 查询Panel
						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.productTemplateSearchPanelDiv,
							contentEl : this.ids.productTemplateSearchContentDiv,
							collapsible : true,
							widthPercent : 1,
							heightPercent : 0.31,
							hasBackGroundColor : true,
							buttons : [ {
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.queryProductTemplateList();
								}
							} ]
						});
						//创建起始日期
						ObjectUtil.create('component.DateField', {
							renderTo : this.ids.createBeginDate,
							format : 'Y-m-d',
							width : 200
						});
						//创建终止日期
						ObjectUtil.create('component.DateField', {
							renderTo : this.ids.createEndDate,
							format : 'Y-m-d',
							width : 200
						});
						//产品分类
						this.createProductTypeSelectTree({
							renderTo : this.ids.productTypeTree,
							codeDomId : this.ids.productType,
							width : 200,
							onlyLeafSelect : true
						});
						owner.queryProductTemplateList();
					},
					initEvent : function() {},
					/**
					 * 查询产品列表
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-08-01
				     * @最后修改日期：
				     */
					queryProductTemplateList : function() {
						var owner = this;
						//HtmlUtil.getDom(owner.ids.prodIsTemplate).value = CodeStringDefinition.PRODUCT_IS_TEMPLATE;//是模板产品
						var searchParam = DataUtil
							.getDataFromArea(this.ids.productTemplateSearchContentDiv);// 获取页面录入的查询条件
						if (searchParam == Constants.VALIDATION_FAIL) {
							return;
						}
						var prodIsTemplateObj = {'prodIsTemplate' : CodeStringDefinition.PRODUCT_IS_TEMPLATE};
						var searchParamObj = DataUtil.decode(searchParam);
						var jsonData = ObjectUtil.apply(searchParamObj,prodIsTemplateObj);
						HtmlUtil.overwrite(this.ids.productTemplateListDiv, "", false);		
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.productTemplateListDiv,
											strServId : 'productService.getProductList',
											jsonData : DataUtil.encode(jsonData),
											recordSelected : true,
											widthPercent : 1,
											heightPercent : 0.68,
											mapping : [ 'productidentityky',
													'product_ID',
													'productName',
													'productType',
													'productTypeStr',
													'subProductType',
													'product_Price',
													'master',
													'masterStr',
													'productBrandStr',
													'prodCreateDate',
													'prodCreateDateStr',
													'prodIsPublish',
													'prodIsPublishStr'],
											collapsible : false,
											checkbox : true,
											title : '查询结果',
											columns : [
													{
														header : "模板编号",
														sortable : true,
														dataIndex : 'product_ID',
														//width : 280
														widthPercent : 0.25
													},
													{
														header : "模板名称",
														sortable : true,
														dataIndex : 'productName',
														//width : 280
														widthPercent : 0.25
													},
													{
														header : "产品类型",
														sortable : true,
														dataIndex : 'productTypeStr',
														//width : 280
														widthPercent : 0.25
													},
													{
														header : "创建时间",
														sortable : true,
														dataIndex : 'prodCreateDateStr',
														//width : 279
														widthPercent : 0.25
													}
													],
											tbar : [
													{
														text : '创建模板',
														tooltip : '创建模板信息',
														iconCls : 'add',
														handler : function() {
															var win = owner.createProductIndexWindow({
																name : '创建模板',
																customerky : 'createTemplateProduct',
																widthPercent : 0.99,
																heightPercent : 1,
																width : 1100,
																heigth : 600,
																authority : 'CreateTemplate-'+owner.systemId,
																onTabClose : function(){
																	if(HtmlUtil.getDom(owner.ids.productTemplateListDiv)){
																		var centerPanel = ObjectMgrUtil.get('centerPanel');
																		centerPanel.setActiveTab(centerPanel.getItem(owner.parent.id));
																		owner.queryProductTemplateList();
																	}
																}
															});	
															win.on('close', function() {
																owner.queryProductTemplateList();
															});
														}
													},
													{
														text : '另存为模板',
														tooltip : '另存为模板',
														iconCls : 'add',
														handler : function() {
															if (grid.getSelectRecords().length != 1) {
																MsgUtil.error('操作出错','请选择一条模板进行操作');
																return;
															}
															DataUtil.each(grid.getSelectRecords(),
																	function(record) {
																owner.openProdcutOutdexWin(record);
															});
														}
													},
													{
														text : '修改模板',
														tooltip : '修改模板信息',
														iconCls : 'edit',
														handler : function() {
															if (grid.getSelectRecords().length == 0) {
																MsgUtil.error('操作出错','请选择一条记录进行修改');
																return;
															} else if (grid.getSelectRecords().length > 1) {
																MsgUtil.error('操作出错','只能选择一条记录进行修改');
																return;
															}
															
															DataUtil.each(grid.getSelectRecords(),
																			function(record) {
																				var win = owner.createProductIndexWindow({
																					name : '修改模板',
																					customerky : record.get('product_ID'),
																					widthPercent : 0.99,
																					heightPercent : 1,
																					width : 1100,
																					heigth : 600,
																					authority : 'UpdateTemplate-'+owner.systemId,
																					onTabClose : function(){
																						if(HtmlUtil.getDom(owner.ids.productTemplateListDiv)){
																							var centerPanel = ObjectMgrUtil.get('centerPanel');
																							centerPanel.setActiveTab(centerPanel.getItem(owner.parent.id));
																							owner.queryProductTemplateList();
																						}
																					}
																				});	
																				win.on('close', function() {
																					owner.queryProductTemplateList();
																				});
																			});
														}
													},
													{
														text : '详细信息',
														tooltip : '查看模板详细信息',
														iconCls : 'view',
														handler : function() {
															if (grid.getSelectRecords().length == 0) {
																MsgUtil.error('操作出错','请选择一条记录查看详细信息');
																return;
															} else if (grid.getSelectRecords().length > 1) {
																MsgUtil.error('操作出错','只能选择一条记录查看详细信息');
																return;
															}
															DataUtil.each(grid.getSelectRecords(),
																			function(record) {
																				owner.createProductIndexWindow({
																					name : '查看模板',
																					customerky : record.get('product_ID'),
																					widthPercent : 0.99,
																					heightPercent : 1,
																					width : 1100,
																					heigth : 600,
																					authority : 'DetailTemplate-'+owner.systemId
																				});	
																			});
														}
													},
													{
														text : '删除模板',
														tooltip : '删除模板信息',
														iconCls : 'delete',
														handler : function() {
															var records = grid.getSelectRecords();
															if (records.length == 0) {
																MsgUtil.error('操作出错','请至少选择一条记录');
																return;
															}
															var productIdList = [];
															DataUtil.each(grid.getSelectRecords(),
																	function(record) {
																productIdList.push(record.get('product_ID'));
															});
															MsgUtil.confirm("提示","是否确认删除",
																			function(btn) {
																				if (btn == 'no') {
																					return;
																				}
																				ConnectionUtil
																						.ajaxReq( {
																							strServId : "productService.deleteProductByProductID",
																							jsonData : {
																								strList : productIdList
																							},
																							callback : function(data) {
																								MsgUtil.alert('操作提示','删除成功!');
																								owner.queryProductTemplateList();// 删除成功后刷新列表
																							}
																						});
																			});
														}
													}
													]
										});

			
						},
						/**
						 * 另存为模版窗口
						 */
						openProdcutOutdexWin : function(record) {
							var owner = this;
							var win = this.create('component.Window',{
								title : '另存为模板',
								closable : true,
								draggable : true,
								width : 800,
								height : 200,
								modal : true,
								pageObject : this.create(
										'crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.create.TemplateAddForOutdex', {
											id : 'templateAddForOutdex',
											product_ID : record.data.product_ID
										})
							});
							win.on('close', function() {
								owner.queryProductTemplateList();                    
			});
						}
				});
