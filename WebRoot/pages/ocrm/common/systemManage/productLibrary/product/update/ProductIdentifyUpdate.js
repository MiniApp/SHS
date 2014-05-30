/**
 * 产品识别信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改产品识别信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.update.ProductIdentifyUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/update/ProductIdentifyUpdate.html",// 页面url地址

	/**
	 * 初始化页面数据
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */	
	initData : function() {
		               // 加载并渲染数据
		               var owner = this;						
						var jsonData = {'productId' : owner.productId};
						ConnectionUtil.ajaxReq( {
							strServId : "productManageService.getProductInfoById",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
							//创建部门
							owner.productTypeSelect = owner
												.createProductTypeSelectTree({
													renderTo : owner.ids.productTypeTree,
													codeDomId : owner.ids.productType,
													typeCode : '000000',
													width : 200,
													selectedValue : {
														code : data.prodTypeCode,
														text : data.prodTypeName
													},
													onlyLeafSelect : false,
													listeners : {
														select : function() {
															if (HtmlUtil
																	.getDom(owner.ids.productType).value == '000000') {
																MsgUtil
																		.error(
																				'错误提示',
																				'不能选择根节点');
																owner.productTypeSelect
																		.clear();
															}
														}
													}
												});
							DataUtil.populateDataForArea(data,owner.ids.productIdentifyUpdateContentDiv);// 渲染数据到页面
							}
						});
					},
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */	
	initCmp : function() {
        var owner = this;
//		HtmlUtil.getDom(this.ids.selectEnginLink).onclick = function() {
//					owner.createSearchEnginSelectWindow({
//								title : '选择搜索引擎',
//								checkbox : false,
//						        displayDomId:owner.ids.searchengineName,
//								hiddenDomId:owner.ids.searchengineky
//							});
//				};
        // 面板
		this.create('component.Panel', {
					title : '',
					contentEl : this.ids.productIdentifyUpdateContentDiv,
					renderTo : this.ids.productIdentifyUpdatePanelDiv,
					hasBackGroundColor : true,
					height : 260,
					bbar : [{
								xtype : 'tbfill'
							}, {
								text : '保存',
								tooltip : '保存产品识别信息', // 提示信息
								handler : function() {
									owner.updateIdentify();
								},
								iconCls : 'save' // 图标CSS
							}]
				});
        
	},
//	createProductSubjectSelectWindow : function(config) {
//		config.id = "selectProductSubject";
//		var win = ObjectUtil.create('component.Window', {
//			title : config.title,
//			closable : true,
//			draggable : true,
//			width :  config.width || 420,
//			height : config.height || 450,
//			modal : true,
//			pageObject : ObjectUtil.create(
//					"business.product.ProdSubjectTree",config)
//				});
//		return win;
//	},
	/**
	 * 修改产品识别信息
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	updateIdentify : function(){
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.productIdentifyUpdateContentDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
		 	var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
								product_Id : owner.productId
							});// 组装修改信息将客户主键corpersonky添加的修改信息数据中
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productManageService.updateProductInfo",
				jsonData : newData,
				callback : function(msg) {
					MsgUtil.alert("提示", "产品识别信息修改成功!");
					owner.parent.close();// 关闭窗口
				}
			});
		}
	}

});