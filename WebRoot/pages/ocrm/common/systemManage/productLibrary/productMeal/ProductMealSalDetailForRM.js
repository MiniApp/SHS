/**
 * 套餐销售明细 <p/> 功能描述：
 * <li>查询套餐详细信息</li>
 * @author 苏皓
 * @since 2013-03-11
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalDetailForRM",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealSalDetailForRM.html",// 页面url地址
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
						
						owner.productMealDetailSalList();
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
						
						var tbar = [{
							text : '下载',
							iconCls : 'download',
							handler : function() {
								var jsonData = {"tbproproductgroupky" : owner.tbproproductgroupky};
								ConnectionUtil.downloadReq({
									strServId : 'productMealService.exportList',
									jsonData : DataUtil.encode(jsonData)
								});
							}
						}];
						
						var data=DataUtil.decode(DataUtil.getDataFromArea(this.ids.productMealSalDetail));
						var searchParam =ObjectUtil.applyIf(data,DataUtil.decode('{"tbproproductgroupky":"'+owner.tbproproductgroupky+'"}'));//获取页面录入的查询条件
						var newsearch=DataUtil.encode(searchParam);
						
						
						HtmlUtil.overwrite(this.ids.productMealSalDetailList, "", false);	
						var grid = this.create('component.DataGrid',
							{
								renderTo : this.ids.productMealSalDetailList,
								strServId : 'productMealService.getProductMealSalDetailList',
								jsonData : newsearch,
								widthPercent : 0.988,
								heightPercent : 0.97,
								mapping : [ 'cusName', 'rmName',
								            'productOne', 'productTwo', 
								            'productThree', 'productFour', 
								            'productFive', 'tbproproductgroupdetailky'],
								collapsible : false,
								checkbox : false,
								columns : [
										{
											header : " 客户名称",
											sortable : true,
											dataIndex : 'cusName',
											widthPercent : 0.15
										},
										{
											header : "主办客户经理",
											sortable : true,
											dataIndex : 'rmName',
											widthPercent : 0.15
										},
										{
											header : "产品1",
											sortable : true,
											dataIndex : 'productOne',
											widthPercent : 0.14
										},
										{
											header : "产品2",
											sortable : true,
											dataIndex : 'productTwo',
											widthPercent : 0.14
										},
										{
											header : "产品3",
											sortable : true,
											dataIndex : 'productThree',
											widthPercent : 0.14
										},
										{
											header : "产品4",
											sortable : true,
											dataIndex : 'productFour',
											widthPercent : 0.14
										},
										{
											header : "产品5",
											sortable : true,
											dataIndex : 'productFive',
											widthPercent : 0.14
										}],
								tbar : tbar
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
