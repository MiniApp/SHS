/**
 * 产品模板列表 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>查询产品模板列表</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.create.CreateProductFormTemplate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/create/CreateProductFormTemplate.html",// 页面url地址
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

						// 查询Panel
						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.createProductFromTemplatePanelDiv,
							contentEl : this.ids.createProductFromTemplateContentDiv,
							collapsible : true,
							widthPercent : 0.988,
							//height : 130,
							heightPercent : 0.3,
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
						HtmlUtil.getDom(owner.ids.prodIsTemplate).value = CodeStringDefinition.PRODUCT_IS_TEMPLATE;//是模板产品
						var searchParam = DataUtil
							.getDataFromArea(this.ids.createProductFromTemplateContentDiv);// 获取页面录入的查询条件
						if (searchParam == Constants.VALIDATION_FAIL) {
							return;
						}
						HtmlUtil.overwrite(this.ids.createProductFormTemplateListDiv, "", false);		
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.createProductFormTemplateListDiv,
											strServId : 'productService.getProductList',
											jsonData : searchParam,
											widthPercent : 0.988,
											heightPercent : 0.7,
											mapping : [ 'product_ID',
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
														//width : 185
														widthPercent : 0.25
													},
													{
														header : "模板名称",
														sortable : true,
														dataIndex : 'productName',
														//width : 185
														widthPercent : 0.25
													},
													{
														header : "产品类型",
														sortable : true,
														dataIndex : 'productTypeStr',
														//width : 185
														widthPercent : 0.25
													},
													{
														header : "创建时间",
														sortable : true,
														dataIndex : 'prodCreateDateStr',
														//width : 183
														widthPercent : 0.25
													}
													],
											tbar : [
													{
														text : '另存产品',
														tooltip : '另存模板为产品',
														iconCls : 'save',
														handler : function() {
															if (grid.getSelectRecords().length == 0) {
																MsgUtil.error('操作出错','请选择一条记录操作');
																return;
															} else if (grid.getSelectRecords().length > 1) {
																MsgUtil.error('操作出错','只能选择一条记录操作');
																return;
															}
															DataUtil.each(grid.getSelectRecords(),
																	function(record) {
																		owner.openSaveProductWindow(record);
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
																			name : '查看模板详细信息',
																			widthPercent : 0.99,
																			heightPercent : 1,
																			width : 1100,
																			heigth : 600,
																			customerky : record.get('product_ID'),
																			authority : 'DetailTemplate'
																		});	
																	});
														}
													}
													]
										});

			
					},
					
					openSaveProductWindow : function(record) {
						var owner = this;
						// 创建新增窗口
						var window = this.create('component.Window', {
									title : '另存模板为产品',
									closable : true,
									draggable : true,
									resizable : true,
									width : 900,
									height : 350,
									//x : '90',
									//y : '60',
									modal : true,
									pageObject : this.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.create.SaveProductFromTemplate',// 创建新增页面对象
											{
												id : 'SaveProductFromTemplate',
												productId : record.get('product_ID'),
												productName : record.get('productName')
											})
								});
						window.on('close', function() {
							if(owner.parent){
								owner.queryProductTemplateList;
							}
						});		
					}
				});
