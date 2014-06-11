/**
 * 客户经理套餐销售统计 <p/> 功能描述：
 * <li>查询客户经理套餐销售统计信息</li>
 * @author 苏皓
 * @since 2013-03-13
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalSumRm",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealSalSumRm.html",// 页面url地址
					initData : function() {
						
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-13
				     * @最后修改日期：
				     */
					initCmp : function() {
						var owner = this;
						this.tbproproductgroupdetailky;
						
						this.create('component.DateField', {
							renderTo : this.ids.sumMonthYear,
							format : 'Ym',
							special : 'Y'
						});
						
						this.createOrgSelectTree({
							renderTo : owner.ids.nodeTree,
							codeDomId : owner.ids.node,
							width : 350,
							height : 400,
							onlyLeafSelect : false
						});
						
						HtmlUtil.getDom(owner.ids.selectEmployee).onclick = function(){
							owner.createEmployeeSelectWindow({
								title : '选择客户经理',
								type : CodeStringDefinition.RM_EMPLOYEE_TYPE_CODE,
								checkbox : false,
								node : HtmlUtil.getDom(owner.ids.node).value,
								displayDomId : owner.ids.employeeName,
								hiddenDomId : owner.ids.employeeky,
								height : 289
							});
						};
						
						HtmlUtil.getDom(owner.ids.clear).onclick = function(){
							HtmlUtil.getDom(owner.ids.employeeName).value = "";
							HtmlUtil.getDom(owner.ids.employeeky).value = "";
						};
						
						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.productMealSalDetailPanelDiv,
							contentEl : this.ids.productMealSalDetail,
							collapsible : true,
							widthPercent : 0.999,
							height : 110,
							hasBackGroundColor : true,
							buttons : [{
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.productMealSalSumRmList();
								}
							}]
						});
						owner.productMealSalSumRmList();
					},
					/**
					 * 查询客户经理套餐销售统计列表
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-13
				     * @最后修改日期：
				     */
					productMealSalSumRmList : function() {
						var owner = this;
						
						var tbar = null;
						
						var data=DataUtil.decode(DataUtil.getDataFromArea(this.ids.productMealSalDetail));
						var searchParam =ObjectUtil.applyIf(data,DataUtil.decode('{"tbproproductgroupky":"'+owner.tbproproductgroupky+'"}'));//获取页面录入的查询条件
						var newsearch=DataUtil.encode(searchParam);
						
						
						HtmlUtil.overwrite(this.ids.productMealSalDetailList, "", false);	
						var grid = this.create('component.DataGrid',
							{
								renderTo : this.ids.productMealSalDetailList,
								strServId : 'productMealService.getProductMealSalSumRmList',
								jsonData : newsearch,
								widthPercent : 0.999,
								heightPercent : 0.679,
								mapping : [ 'rmName', 'usersNumber', 'sumMonthYear'],
								collapsible : false,
								checkbox : false,
								columns : [
										{
											header : "客户经理",
											sortable : true,
											dataIndex : 'rmName',
											widthPercent : 0.4
										},
										{
											header : "购买套餐客户总数",
											sortable : true,
											dataIndex : 'usersNumber',
											widthPercent : 0.3
										},
										{
											header : "统计年月",
											sortable : true,
											dataIndex : 'sumMonthYear',
											widthPercent : 0.3
										}],
								tbar : [{
											text : '下载',
											tooltip : '下载',
											iconCls : 'usercount',
											handler : function() {
											ConnectionUtil
													.downloadReq({
													strServId : 'productMealService.exportListgetProductMealSalSumRmList',
													jsonData : newsearch
											});
										}
									}  ]
							});
					},
					
					createEmployeeSelectWindow : function(config) {
						config.id = "selectEmployee";
						var win = ObjectUtil.create('component.Window', {
									title : config.title,
									closable : true,
									draggable : true,
									width : config.width || 900,
									height : config.height || 480,
									x : config.x,
									y : config.y,
									modal : true,
									pageObject : ObjectUtil.create(
											"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.SelectEmployee", config)
								});
						return win;
					}
});
