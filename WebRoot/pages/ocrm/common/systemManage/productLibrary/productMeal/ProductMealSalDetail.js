/**
 * 套餐销售明细 <p/> 功能描述：
 * <li>查询套餐详细信息</li>
 * @author 苏皓
 * @since 2013-03-11
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalDetail",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealSalDetail.html",// 页面url地址
					initData : function() {

					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-11
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						this.tbproproductgroupdetailky;
						this.createOrgSelectTree( {
							renderTo : owner.ids.nodeTree,
							codeDomId : owner.ids.node,
							width : 350,
							height : 400,
							onlyLeafSelect : false
						});
						ConnectionUtil
								.ajaxReq( {
									strServId : "productMealService.getProducts",
									jsonData : {
										"tbproproductgroupky" : owner.tbproproductgroupky
									},
									callback : function(data) {
										DataUtil.populateDataForArea(data,
												owner.ids.productMealSalDetail);// 渲染数据到页面
										HtmlUtil
												.getDom(owner.ids.selectEmployee).onclick = function() {
											if (HtmlUtil.getDom(owner.ids.node).value == "") {
												MsgUtil.error('操作出错',
														'请先选择机构再选主办客户经理！');
												return;
											}
											owner
													.createEmployeeSelectWindow( {
														title : '选择客户经理',
														type : CodeStringDefinition.RM_EMPLOYEE_TYPE_CODE,
														checkbox : false,
														node : HtmlUtil
																.getDom(owner.ids.node).value,
														displayDomId : owner.ids.employeeName,
														hiddenDomId : owner.ids.employeeky,
														height : 289
													});
										};

										HtmlUtil.getDom(owner.ids.clear).onclick = function() {
											HtmlUtil
													.getDom(owner.ids.employeeName).value = "";
											HtmlUtil
													.getDom(owner.ids.employeeky).value = "";
										};

										owner
												.create(
														'component.Panel',
														{
															title : '查询条件',
															renderTo : owner.ids.productMealSalDetailPanelDiv,
															contentEl : owner.ids.productMealSalDetail,
															collapsible : true,
															widthPercent : 0.988,
															height : 110,
															hasBackGroundColor : true,
															buttons : [
																	{
																		text : '查询',
																		iconCls : 'query',
																		handler : function() {
																			owner
																					.productMealDetailSalList();
																		}
																	}
																	]
														});
										owner.productMealDetailSalList();
									}
								});

					},
					/**
					 * 查询产品列表
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-06
					 * @最后修改日期：
					 */
					productMealDetailSalList : function() {
						var owner = this;

						var tbar = null;

						var data = DataUtil
								.decode(DataUtil
										.getDataFromArea(this.ids.productMealSalDetail));
						var searchParam = ObjectUtil
								.applyIf(
										data,
										DataUtil
												.decode('{"tbproproductgroupky":"' + owner.tbproproductgroupky + '"}'));//获取页面录入的查询条件
						var newsearch = DataUtil.encode(searchParam);
						var productOneName = searchParam.productOneName;
						var productTwoName = searchParam.productTwoName;
						var productThreeName = searchParam.productThreeName;
						var productFourName = searchParam.productFourName;
						var productFiveName = searchParam.productFiveName;
						HtmlUtil.overwrite(this.ids.productMealSalDetailList,
								"", false);
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.productMealSalDetailList,
											strServId : 'productMealService.getProductMealSalDetailList',
											jsonData : newsearch,
											widthPercent : 0.988,
											heightPercent : 0.725,
											mapping : [ 'cusName', 'rmName',
													'productOne', 'productTwo',
													'productThree',
													'productFour',
													'productFive',
													'tbproproductgroupdetailky' ],
											collapsible : false,
											checkbox : false,
											columns : [ {
												header : " 客户名称",
												sortable : true,
												dataIndex : 'cusName',
												widthPercent : 0.15
											}, {
												header : "主办客户经理",
												sortable : true,
												dataIndex : 'rmName',
												widthPercent : 0.15
											}, {
												header : productOneName,
												sortable : true,
												dataIndex : 'productOne',
												widthPercent : 0.14
											}, {
												header : productTwoName,
												sortable : true,
												dataIndex : 'productTwo',
												widthPercent : 0.14
											}, {
												header : productThreeName,
												sortable : true,
												dataIndex : 'productThree',
												widthPercent : 0.14
											}, {
												header : productFourName,
												sortable : true,
												dataIndex : 'productFour',
												widthPercent : 0.14
											}, {
												header : productFiveName,
												sortable : true,
												dataIndex : 'productFive',
												widthPercent : 0.14
											} ],
											tbar : [{
																	text : '下载',
																	tooltip : '下载',
																	iconCls : 'usercount',
																	handler : function() {
																		ConnectionUtil
																		.downloadReq({
																			strServId : 'productMealService.exportListgetProductMealSalDetailList',
																			jsonData : newsearch
																		});
																	}
																}  ]
										});
					},
					createEmployeeSelectWindow : function(config) {
						config.id = "selectEmployee";
						var win = ObjectUtil
								.create(
										'component.Window',
										{
											title : config.title,
											closable : true,
											draggable : true,
											width : config.width || 900,
											height : config.height || 480,
											x : config.x,
											y : config.y,
											modal : true,
											pageObject : ObjectUtil
													.create(
															"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.SelectEmployee",
															config)
										});
						return win;
					}
				});
