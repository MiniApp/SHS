/**
 * 套餐管理 <p/> 功能描述：
 * <li>新建套餐信息</li>
 * @author 苏皓
 * @since 2013-03-07
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealAdd",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productMeal/ProductMealAdd.html",// 页面url地址
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
						this.saveSuccess = false;
						this.prdGropName;
						this.tbproproductgroupdetailky;
						
						this.panel = this.create('component.Panel', {
							contentEl : this.ids.productMealAdd,
							hasBackGroundColor : true,
							buttonInPanel:false,
							height : 100,
							renderTo : this.ids.productMealAddPanelDiv,
							buttons : [
							           {
											text : '添加产品',
											id : 'addProduct',
											iconCls : 'add',
											hidden : owner.flag,
											handler : function() {
												owner.addProductForMeal();
											}
							           	}, {
											text : '移除产品',
											id : 'deleteProduct',
											iconCls : 'delete',
											hidden : owner.flag,
											handler : function() {
												owner.deleteProductForMeal(owner.tbproproductgroupdetailky);
											}
								         }, {
											text : '保存套餐',
											iconCls : 'save',
											handler : function() {
												if(CodeStringDefinition.TRUE_AND_FALSE_YES == owner.saveSuccess){
													MsgUtil.alert("提示","已经保存成功,可以向套餐内添加产品！");
												} else {
													owner.saveProductMeal();
												}
											}
									     }]
						});
						//owner.queryProductListForMeal();
					},
					/**
					 * 查询产品列表
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-07
				     * @最后修改日期：
				     */
					queryProductListForMeal : function() {
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
								heightPercent : 0.75,
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
								tbar : tbar,
								itemClick : function() {
									if (grid.getSelectRecords().length > 1) {
										MsgUtil.error('操作出错', '只能选择一条记录进行删除');
										return;
									}
									DataUtil.each(grid.getSelectRecords(), function(
											record) {
										owner.tbproproductgroupdetailky = record.get('tbproproductgroupdetailky');
									});
									
								}
							});
						this.gridinfo = grid;
					},
					/**
					 * 保存套餐
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-07
				     * @最后修改日期：
				     */
					saveProductMeal : function() {
						var owner = this;
						var sumDueTime = HtmlUtil.getDom(owner.ids.sumDueTime).value;
						if (sumDueTime != '' && sumDueTime < 1 || sumDueTime > 180) {
							MsgUtil.error('操作出错', '统计期限范围1-180天，可以为空！');
							return;
						}
						var data = DataUtil.getDataFromArea(owner.ids.productMealAdd);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
										transinfotycjky : this.transinfotycjky
									});
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "productMealService.saveProductMeal",
								jsonData : data,
								callback : function(data) {
									//MsgUtil.alert("提示", "修改成功！");
									if(CodeStringDefinition.TRUE_AND_FALSE_YES == data.saveSuccess){
										owner.tbproproductgroupky = data.tbproproductgroupky;
										owner.saveSuccess = data.saveSuccess;
										owner.prdGropName = data.prdGropName;
										
										HtmlUtil.getDom(owner.ids.prdGropName).disabled = true;
										HtmlUtil.getDom(owner.ids.prdGropFavorable).disabled = true;
										HtmlUtil.getDom(owner.ids.sumDueTime).disabled = true;
										
										owner.panel.extObject.queryById('addProduct').setVisible(true);
										owner.panel.extObject.queryById('deleteProduct').setVisible(true);
										owner.queryProductListForMeal();
										owner.flag = false;
									}
									//owner.parent.close();// 关闭窗口
								}
							});
						}
					},
					/**
					 * 向套餐内添加产品
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-07
				     * @最后修改日期：
				     */
					addProductForMeal : function() {
						var owner = this;
						if(owner.gridinfo.getAllCount()>4){
							MsgUtil.error('限制信息', '1个套餐只能有5个产品！');
							return;
						}
						var win = this.create('component.Window', {
									title : '添加产品',
									closable : true,
									draggable : true,
									resizable : true,
									width : 700,
									height : 159,
									layout : 'fit',
									modal : true,
									pageObject : this.create('crm.pages.ocrm.common.systemManage.productLibrary.productMeal.ProductMealAddForProduct',//创建新增页面对象
											{
												id : 'ProductMealAddForProduct',
												prdGropName : owner.prdGropName,
												tbproproductgroupky : owner.tbproproductgroupky
											})
								});
						win.on('close', function() {
							owner.queryProductListForMeal();// 窗口关闭后刷新列表
							});
					},
					/**
					 * 移除套餐内的产品
					 * 
					 * @param
					 * @return
					 * @程序员：苏皓
					 * @编码日期：2013-03-08
				     * @最后修改日期：
				     */
					deleteProductForMeal : function(key) {
						var owner = this;
						MsgUtil.confirm("提示", "是否确认删除", function(btn) {
							if (btn == 'no') {
								return;
							}
							ConnectionUtil.ajaxReq({
								strServId : "productMealService.deleteProductForMeal",
								jsonData : {
									tbproproductgroupdetailky : key
								},
								callback : function(data) {
									owner.queryProductListForMeal();//删除成功后刷新列表
								}
							});
						});
					}
});
