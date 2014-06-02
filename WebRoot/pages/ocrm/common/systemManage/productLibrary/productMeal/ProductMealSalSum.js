/**
 * 套餐销售统计 <p/> 功能描述：
 * <li>套餐销售统计信息</li>
 * @author 苏皓
 * @since 2013-03-12
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalSum",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealSalSum.html",// 页面url地址
					initData : function() {
						
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-12
				     * @最后修改日期：
				     */
					initCmp : function() {
						var owner = this;
						this.nodePageObj = this.create(
								"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalSumNode",
								{
									id : 'ProductMealSalSumNode',
									tbproproductgroupky : owner.tbproproductgroupky
								});
						this.rmPageObj = this.create(
								"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealSalSumRm",
								{
									id : 'ProductMealSalSumRm',
									tbproproductgroupky : owner.tbproproductgroupky
								});
						
						this.nodePanel = this.create('component.Panel', {
							id : 'NodePanel',
							title : '机构套餐销售统计',
							hasBackGroundColor : true,
							widthPercent : 0.63,
							heightPercent : 0.939,
							disabled : false,
							pageObject : this.nodePageObj
						});
						this.rmPanel = this.create('component.Panel', {
							id : 'RmPanel',
							title : '客户经理套餐销售统计',
							hasBackGroundColor : true,
							widthPercent : 0.63,
							heightPercent : 0.939,
							disabled : false,
							pageObject : this.rmPageObj
						});
						
						
						this.productMealSalSumTabPanel = this
						.create(
								'component.TabPanel',
								{
									renderTo : this.ids.productMealSalSumPanel,
									widthPercent : 0.988,
									items : [this.nodePanel,this.rmPanel],
									activeTab : 'NodePanel'

								});
					}
});
