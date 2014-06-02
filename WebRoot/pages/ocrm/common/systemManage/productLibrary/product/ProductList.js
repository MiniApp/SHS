/**
 * 产品管理 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>查询产品列表</li>
 * <li>创建产品窗口</li>
 * <li>修改产品窗口</li>
 * <li>产品详细信息窗口</li>
 * <li>删除产品</li>
 * <li>发布产品</li>
 * <li>从模板创建产品</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.ProductList",
				"base.PageObject", {
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/ProductList.html",// 页面url地址
					initData : function() {
						var owner = this;
						// 产品状态
						this.prodispublish = ObjectUtil.create(
								'component.EnumSelector', {
									category : [CodeStringDefinition.PRODUCT_CONVENTION_STATE_ENUM],
									renderTo : [owner.ids.prodispublish],
									id : [this.ids.prodispublish]
								});
						// 产品类型
						this.productType = ObjectUtil.create(
								'component.EnumSelector', {
									category : [CodeStringDefinition.PRODUCTTYPE_CATEGORY],
									renderTo : [owner.ids.productType],
									id : [this.ids.productType]
								});
						// 创建起始日期
						ObjectUtil.create('component.DateField', {
									renderTo : this.ids.createBeginDate,
									format : 'Y-m-d'

								});
						// 创建终止日期
						ObjectUtil.create('component.DateField', {
									renderTo : this.ids.createEndDate,
									format : 'Y-m-d'
								});

						var btnArray = [];
						var userInfo = DataUtil.getUserInfo();
						this.systemId = userInfo.systemId;
						if (CodeStringDefinition.POSITION_CENTER_MSGCODE == userInfo.orgLevel
								&& CodeStringDefinition.USER_ROLE_ACCOUNT_MANAGER == userInfo.authorityCode) {
							this.flag = true;
						}
						if (this.flag) {// 总行级主管权限
							btnArray = [{
										id : "createProductFromTemplateBtnId"
									},// 从模板创建
									{
										id : "createProductBtnId"
									},// 创建
									{
										id : "updateProductBtnId"
									},// 修改
									{
										id : "viewProductBtnId"
									},// 查看
									{
										id : "deleteProductBtnId"
									},// 删除
									{
										id : "publishProductBtnId"
									},// 发布
									{
										id : "accessoryProductBtnId"
									}];// 附件
						} else {// 非总行级主管权限
							btnArray = [{
										id : "viewProductBtnId"
									},// 展示
									{
										id : "accessoryProductBtnId"
									}];// 附件
						}
						this.button = btnArray;
					},
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

						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.productSearchPanelDiv,
							contentEl : this.ids.productSearchContentDiv,
							collapsible : true,
							widthPercent : 1,
//							heightPercent : 0.34,
							hasBackGroundColor : true,
							buttons : [{
										text : '查询',
										iconCls : 'query',
										handler : function() {
											owner.queryProductList();
										}
									}, {
										text : '重置',
										iconCls : 'form-reset',
										handler : function() {

											HtmlUtil
													.getDom(owner.ids.productid).value = "";// 清除已选择的
											HtmlUtil
													.getDom(owner.ids.productName).value = "";
											HtmlUtil.overwrite(
													owner.ids.createBeginDate,
													"", false);
											HtmlUtil.overwrite(
													owner.ids.createEndDate,
													"", false);

											ObjectUtil.create(
													'component.DateField', {
														renderTo : owner.ids.createBeginDate,
														format : 'Y-m-d'

													});
											// 创建终止日期
											ObjectUtil.create(
													'component.DateField', {
														renderTo : owner.ids.createEndDate,
														format : 'Y-m-d'
													});
													owner.prodispublish.setValue(owner.ids.prodispublish,"unselectCode");
													owner.productType.setValue(owner.ids.productType,"unselectCode");

										}
									}]
						});

						owner.queryProductList();
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
					queryProductList : function() {
						var owner = this;
						// HtmlUtil.getDom(owner.ids.prodIsTemplate).value =
						// CodeStringDefinition.PRODUCT_NOT_TEMPLATE;//不是模板产品
						var searchParam = DataUtil
								.getDataFromArea(this.ids.productSearchContentDiv);// 获取页面录入的查询条件
						if (searchParam == Constants.VALIDATION_FAIL) {
							return;
						}
						var prodIsTemplateObj = {
							'prodIsTemplate' : CodeStringDefinition.PRODUCT_NOT_TEMPLATE
						};
						var searchParamObj = DataUtil.decode(searchParam);
						var jsonData = ObjectUtil.apply(searchParamObj,
								prodIsTemplateObj);
						HtmlUtil.overwrite(this.ids.productListDiv, "", false);
						var grid = this.create('component.DataGrid', {
							renderTo : this.ids.productListDiv,
							strServId : 'productService.getProductList',
							jsonData : searchParam,
							widthPercent : 1,
							heightPercent : 0.8,
							mapping : ['product_ID', 'productName',
									'productType', 'productTypeStr',
									'product_Price', 'prodCreateDate',
									'prodCreateDateStr', 'prodIsPublish',
									'prodIsPublishStr', 'prodCreatorNode','proFinStateStr'],
							collapsible : false,
							checkbox : true,
							title : '查询结果',
							columns : [{
										header : "产品编号",
										sortable : true,
										dataIndex : 'product_ID',
										widthPercent : 0.15
									}, {
										header : "产品名称",
										sortable : true,
										dataIndex : 'productName',
										widthPercent : 0.15
									}, {
										header : "产品类型",
										sortable : true,
										dataIndex : 'productTypeStr',
										widthPercent : 0.13
									}, {
										header : "产品价格",
										sortable : true,
										dataIndex : 'product_Price',
										widthPercent : 0.11
									},
//									{
//										header : "创建部门",
//										sortable : true,
//										dataIndex : 'prodCreatorNode',
//										widthPercent : 0.17
//									},
									{
										header : "创建时间",
										sortable : true,
										dataIndex : 'prodCreateDateStr',
										widthPercent : 0.13
									}, {
										header : "产品发布状态",
										sortable : true,
										dataIndex : 'prodIsPublishStr',
										widthPercent : 0.13
									}, {
										header : "理财产品状态",
										sortable : true,
										dataIndex : 'proFinStateStr',
										widthPercent : 0.13
									}],
							tbar : [
									// {
									// text : '从模板创建',
									// id : 'createProductFromTemplateBtnId',
									// tooltip : '从模板创建产品信息',
									// iconCls : 'add',
									// handler : function() {
									// owner.openCreateFromTemplateWindow();
									// }
									// },
//									 {
//									 text : '创建产品',
//									 tooltip : '创建产品信息',
//									 id : 'createProductBtnId',
//									 iconCls : 'add',
//									 handler : function() {
//									 var win =
//									 owner.createProductIndexWindow({
//									 name : '创建产品',
//									 customerky : 'createProduct',
//									 widthPercent : 0.99,
//									 heightPercent : 1,
//									 width : 1100,
//									 heigth : 600,
//									 authority : 'Create-'+owner.systemId,
//									 onTabClose : function(){
//									 if(HtmlUtil.getDom(owner.ids.productListDiv)){
//									 var centerPanel =
//									 ObjectMgrUtil.get('centerPanel');
//									 centerPanel.setActiveTab(centerPanel.getItem(owner.parent.id));
//									 owner.queryProductList();
//									 }
//									 }
//									 });
//									 win.on('close', function() {
//									 owner.queryProductList();
//									 });
//									 }
//									 },
									{
									 text : '创建产品',
									 tooltip : '创建产品信息',
									 id : 'createProductBtnId',
									 iconCls : 'add',
									 handler : function() {
										 owner.createProductIdentifyWindow()
									 }
									 },
									// {
									// text : '修改产品',
									// id : 'updateProductBtnId',
									// tooltip : '修改产品信息',
									// iconCls : 'edit',
									// handler : function() {
									// if (grid.getSelectRecords().length == 0)
									// {
									// MsgUtil.error('操作出错','请选择一条记录进行修改');
									// return;
									// } else if (grid.getSelectRecords().length
									// > 1) {
									// MsgUtil.error('操作出错','只能选择一条记录进行修改');
									// return;
									// }
									//															
									// DataUtil.each(grid.getSelectRecords(),
									// function(record) {
									// if(CodeStringDefinition.PRODUCT_PUBLISH_STATE_IS_PUBLISH
									// == record.get('prodIsPublish')){
									// MsgUtil.error('操作出错','产品'+record.get('productName')+'已发布,不允许修改!');
									// return;
									// }
									// var win =
									// owner.createProductIndexWindow({
									// name : '修改产品',
									// customerky : record.get('product_ID'),
									// widthPercent : 0.99,
									// heightPercent : 1,
									// width : 1100,
									// heigth : 600,
									// authority : 'Update-'+owner.systemId,
									// onTabClose : function(){
									// if(HtmlUtil.getDom(owner.ids.productListDiv)){
									// var centerPanel =
									// ObjectMgrUtil.get('centerPanel');
									// centerPanel.setActiveTab(centerPanel.getItem(owner.parent.id));
									// owner.queryProductList();
									// }
									// }
									// });
									// win.on('close', function() {
									// owner.queryProductList();
									// });
									// });
									// }
									// },
									{
								text : '产品识别信息',
								id : 'viewProductBtnId',
								tooltip : '查看产品详细信息',
								iconCls : 'view',
								handler : function() {
									if (grid.getSelectRecords().length == 0) {
										MsgUtil.error('操作出错', '请选择一条记录查看详细信息');
										return;
									} else if (grid.getSelectRecords().length > 1) {
										MsgUtil.error('操作出错', '只能选择一条记录查看详细信息');
										return;
									}
									DataUtil.each(grid.getSelectRecords(),
											function(record) {
												owner.openViewWindow(record);

												// var owner = this;
											// owner.createProductIndexWindow({
											// name : '查看产品',
											// customerky :
											// record.get('product_ID'),
											// widthPercent : 0.99,
											// heightPercent : 1,
											// width : 1100,
											// heigth : 600,
											// authority :
											// 'Detail-'+owner.systemId
											// });
										});
								}
							}
									// ,{
									// text : '删除产品',
									// id : 'deleteProductBtnId',
									// tooltip : '删除产品信息',
									// iconCls : 'delete',
									// handler : function() {
									// var records = grid.getSelectRecords();
									// if (records.length == 0) {
									// MsgUtil.error('操作出错','请至少选择一条记录');
									// return;
									// }
									// var productIdList = [];
									// for(var i = 0; i < records.length; i++){
									// if(CodeStringDefinition.PRODUCT_PUBLISH_STATE_IS_PUBLISH
									// == records[i].get('prodIsPublish')){
									// MsgUtil.error('操作出错','产品'+records[i].get('productName')+'已发布,不允许删除!');
									// return;
									// }
									// productIdList.push(records[i].get('product_ID'));
									// }
									// MsgUtil.confirm("提示","是否确认删除",
									// function(btn) {
									// if (btn == 'yes') {
									//																					
									//																				
									// ConnectionUtil
									// .ajaxReq( {
									// strServId :
									// "productService.deleteProductByProductID",
									// jsonData : {
									// strList : productIdList
									// },
									// callback : function(data) {
									// MsgUtil.alert('操作提示','删除成功!');
									// owner.queryProductList();// 删除成功后刷新列表
									// }
									// });
									// }
									// });
									// }
									// },
									// {
									// text : '发布产品',
									// id : 'publishProductBtnId',
									// tooltip : '发布产品',
									// iconCls : 'accept',
									// handler : function() {
									// var records = grid.getSelectRecords();
									// if (records.length == 0) {
									// MsgUtil.error('操作出错','请至少选择一条记录');
									// return;
									// }
									// var productIdList = [];
									// for(var i = 0; i < records.length; i++){
									// if(CodeStringDefinition.PRODUCT_PUBLISH_STATE_IS_PUBLISH
									// == records[i].get('prodIsPublish')){
									// MsgUtil.error('操作出错','产品'+records[i].get('productName')+'已发布过!');
									// return;
									// }
									// productIdList.push(records[i].get('product_ID'));
									// }
									// MsgUtil
									// .confirm(
									// "提示",
									// "是否确认发布产品",
									// function(
									// btn) {
									// if (btn == 'yes') {
									//																					
									//																				
									// ConnectionUtil
									// .ajaxReq( {
									// strServId :
									// "productService.publishProductByProductID",
									// jsonData : {
									// strList : productIdList
									// },
									// callback : function(data) {
									// MsgUtil.alert('操作提示','发布产品成功!');
									// owner.queryProductList();// 删除成功后刷新列表
									// }
									// });
									// }
									// });
									// }
									// }
							, {
								text : '附件管理',
								id : 'accessoryProductBtnId',
								tooltip : '附件管理',
								iconCls : 'edit',
								handler : function() {
									if (grid.getSelectRecords().length == 0) {
										MsgUtil.error('操作出错', '请选择一条记录进行操作');
										return;
									} else if (grid.getSelectRecords().length > 1) {
										MsgUtil.error('操作出错', '只能选择一条记录进行操作');
										return;
									}
									owner.createAccessoryManageWindow({
										title : grid.getSelectRecords()[0]
												.get('productName'),
										businessky : grid.getSelectRecords()[0]
												.get('product_ID'),
										businessType : CodeStringDefinition.BUSINESS_TYPE_COMMON_PRODUCT,
										allowUpload : owner.flag,
										allowDownload : true,
										allowDelete : owner.flag,
										allowDeleteAll : owner.flag,
										allowViewAll : true
									});
								}
							}]
						});

					},

					/**
					 * 创建详细信息窗口
					 * 
					 * @param record
					 *            选择的列表记录
					 * @return
					 * @程序员：周杨森
					 * @编码日期：2012-10-08
					 * @最后修改日期：
					 */
					openViewWindow : function(record) {
						var owner = this;
						var win = owner.create('component.Window', {
							title : '产品识别信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 300,
							modal : false,
							pageObject : owner
									.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductIdentifyDetail',// 创建新增页面对象
											{
												id : 'ProductIdentifyDetail',
												customerky : record
														.get('product_ID'),
												productType : record
														.get('productType')
											})
						});

					},
					
					createProductIdentifyWindow:function(){
						var owner = this;
						var win = owner.create('component.Window', {
							title : '创建产品识别信息',
							closable : true,
							draggable : true,
							width : 700,
							height : 300,
							modal : false,
							pageObject : owner.create(
											'crm.pages.ocrm.common.systemManage.productLibrary.product.create.ProductIdentifyCreateNew',// 创建新增页面对象
											{
												id : 'ProductIdentifyCreate'
											}
							)
						});
						win.on('close', function() {
							 owner.queryProductList();
						});
					}
					
					
					// /**
					// * 从模板创建产品
					// *
					// * @param
					// * @return
					// * @程序员：tangyingzhen
					// * @编码日期：2012-08-01
					// * @最后修改日期：
					// */
					// openCreateFromTemplateWindow : function() {
					// var owner = this;
					// // 创建新增窗口
					// var win = this.create('component.Window', {
					// id : 'createProductFormTemplateWindow',
					// title : '从模板创建产品',
					// closable : true,
					// draggable : true,
					// resizable : true,
					// width : 900,
					// height : 500,
					// //x : '90',
					// //y : '60',
					// modal : true,
					// pageObject : this.create(
					// 'crm.pages.ocrm.common.systemManage.productLibrary.product.create.CreateProductFormTemplate',//
					// 创建新增页面对象
					// {
					// id : 'CreateProductFormTemplate'
					// })
					// });
					// win.on('close', function() {
					// owner.queryProductList();
					// });
					// }
				});
