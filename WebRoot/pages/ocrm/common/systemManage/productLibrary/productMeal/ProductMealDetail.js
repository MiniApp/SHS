/**
 * 套餐管理 <p/> 功能描述：
 * <li>查询套餐详细信息</li>
 * @author 苏皓
 * @since 2013-03-06
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealDetail",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealDetail.html",// 页面url地址
					initData : function() {
						
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-06
				     * @最后修改日期：
				     */
					initCmp : function() {
						var owner = this;
						// 加载并渲染数据
						ConnectionUtil.ajaxReq({
									strServId : "productMealService.getProductMealDetail",
									jsonData : {
										tbproproductgroupky : this.tbproproductgroupky
									},
									callback : function(data) {
										DataUtil
												.populateDataForArea(
														data,
														owner.ids.productMealDetail);// 渲染数据到页面
									}
								});
						owner.productMealDetailList();
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
					productMealDetailList : function() {
						var owner = this;
						
						var tbar = null;
						
						var jsonData = {"tbproproductgroupky" : owner.tbproproductgroupky};
						HtmlUtil.overwrite(this.ids.productMealDetailList, "", false);	
						var grid = this.create('component.DataGrid',
							{
								renderTo : this.ids.productMealDetailList,
								strServId : 'productMealService.getProductMealDetailList',
								jsonData : jsonData,
								widthPercent : 0.988,
								heightPercent : 0.9,
								mapping : [ 'productName', 'productcode',
								            'limitmoney', 'tbproproductgroupdetailky'],
								collapsible : false,
								checkbox : false,
								columns : [
										{
											header : "产品名称",
											sortable : true,
											dataIndex : 'productName',
											widthPercent : 0.39
										},
										{
											header : "产品编号",
											sortable : true,
											dataIndex : 'productcode',
											widthPercent : 0.3
										},
										{
											header : "金额大于等于",
											sortable : true,
											dataIndex : 'limitmoney',
											widthPercent : 0.3
										}],
								tbar : tbar
							});
					}
});
