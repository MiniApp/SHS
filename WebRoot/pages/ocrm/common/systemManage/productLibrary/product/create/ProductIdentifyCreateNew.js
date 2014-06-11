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
				"crm.pages.ocrm.common.systemManage.productLibrary.product.create.ProductIdentifyCreateNew",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/create/ProductIdentifyCreateNew.html",// 页面url地址

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
		               // 产品类型
		               ObjectUtil.create(
								'component.EnumSelector', {
									category : [CodeStringDefinition.PRODUCTTYPE_CATEGORY],
									renderTo : [owner.ids.productTypeEnum],
									id : [this.ids.productTypeEnum]
								});
						
						//创建部门
						owner.productTypeSelect = owner
											.createProductTypeSelectTree({
												renderTo : owner.ids.productTypeTree,
												codeDomId : owner.ids.productType,
												typeCode : '000000',
												width : 200,
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
		
        // 面板
		this.create('component.Panel', {
					title : '',
					contentEl : this.ids.productIdentifyCreateContentDiv,
					renderTo : this.ids.productIdentifyCreatePanelDiv,
					hasBackGroundColor : true,
					height : 260,
					bbar : [{
								xtype : 'tbfill'
							}, {
								text : '保存',
								tooltip : '保存产品识别信息', // 提示信息
								handler : function() {
									owner.CreateIdentify();
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
	CreateIdentify : function(){
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.productIdentifyCreateContentDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
		 	
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productManageService.createProductInfo",
				jsonData : data,
				callback : function(msg) {
					MsgUtil.alert("提示", "产品识别信息创建成功!");
					owner.parent.close();// 关闭窗口
				}
			});
		}
	}

});