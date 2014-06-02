/**
 * 机构套餐销售统计 <p/> 功能描述：
 * <li>查询机构套餐销售统计</li>
 * @author 苏皓
 * @since 2013-03-13
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalSumNode",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealSalSumNode.html",// 页面url地址
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
						
						this.createOrgSelectTree({
							renderTo : owner.ids.nodeTree,
							codeDomId : owner.ids.node,
							width : 350,
							height : 400,
							onlyLeafSelect : false
						});
						
						this.create('component.DateField', {
							renderTo : this.ids.sumMonthYear,
							format : 'Ym',
							special : 'Y'
						});
						
						this.create('component.Panel', {
							title : '查询条件',
							renderTo : this.ids.productMealSalDetailPanelDiv,
							contentEl : this.ids.productMealSalDetail,
							collapsible : true,
							widthPercent : 0.9999,
							height : 110,
							hasBackGroundColor : true,
							buttons : [{
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.productMealSalSumNodeList();
								}
							}]
						});
						owner.productMealSalSumNodeList();
					},
					/**
					 * 机构套餐销售统计列表
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-13
				     * @最后修改日期：
				     */
					productMealSalSumNodeList : function() {
						var owner = this;
						
						var tbar = null;
						
						var data=DataUtil.decode(DataUtil.getDataFromArea(this.ids.productMealSalDetail));
						var searchParam =ObjectUtil.applyIf(data,DataUtil.decode('{"tbproproductgroupky":"'+owner.tbproproductgroupky+'"}'));//获取页面录入的查询条件
						var newsearch=DataUtil.encode(searchParam);
						
						
						HtmlUtil.overwrite(this.ids.productMealSalDetailList, "", false);	
						var grid = this.create('component.DataGrid',
							{
								renderTo : this.ids.productMealSalDetailList,
								strServId : 'productMealService.getProductMealSalSumNodeList',
								jsonData : newsearch,
								widthPercent : 0.9999,
								heightPercent : 0.679,
								mapping : [ 'orgName', 'usersNumber', 'sumMonthYear'],
								collapsible : false,
								checkbox : false,
								columns : [
										{
											header : "机构名称",
											sortable : true,
											dataIndex : 'orgName',
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
																			strServId : 'productMealService.exportListgetProductMealSalSumNodeList',
																			jsonData : newsearch
																		});
																	}
																}  ]
							});
					}
});
