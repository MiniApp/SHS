/**
 * 套餐管理 <p/> 功能描述：
 * <li>向套餐内添加产品</li>
 * @author 苏皓
 * @since 2013-03-07
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealAddForProduct",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealAddForProduct.html",// 页面url地址
					initData : function() {
						this.button = [{id : 'addProduct'}, {id : 'deleteProduct'}];
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-07
				     * @最后修改日期：
				     */
					initCmp : function() {
						var owner = this;
						this.flag = true;
						HtmlUtil.getDom(owner.ids.prdGropName).value = owner.prdGropName;
						HtmlUtil.getDom(owner.ids.prdGropName).disabled = true;
						this.panel = this.create('component.Panel', {
							contentEl : this.ids.productMealAdd,
							hasBackGroundColor : true,
							buttonInPanel:false,
							height : 120,
							renderTo : this.ids.productMealAddPanelDiv,
							buttons : [
							           {
											text : '保存',
											iconCls : 'save',
											handler : function() {
												owner.saveProductForMeal();
											}
									     }]
						});
						HtmlUtil.getDom(owner.ids.selectProduct).onclick = function() {
							owner.createProductSelectWindow({
								title : '选择产品',
								checkbox : false,
								displayDomId : owner.ids.productName,
								hiddenDomId : owner.ids.productId
							});
						};
					},
					
					/**
					 * 保存向套餐内添加的产品
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-07
				     * @最后修改日期：
				     */
					saveProductForMeal : function() {
						var owner = this;
						
						var data = DataUtil.getDataFromArea(owner.ids.productMealAdd);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
								tbproproductgroupky : owner.tbproproductgroupky
									});
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "productMealService.addProductForMeal",
								jsonData : newData,
								callback : function(data) {
									MsgUtil.alert("提示", "添加成功！");
									owner.parent.close();// 关闭窗口
								}
							});
						}
					}
});
