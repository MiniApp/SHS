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
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.update.TemplateIdentifyUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/update/TemplateIdentifyUpdate.html",// 页面url地址

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
						var jsonData = {'targetAttributeServiceName':'productIdentifyService','productId' : owner.customerky};
						ConnectionUtil.ajaxReq( {
							strServId : "productService.getProductAttributeInfo",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
								//产品类型
								owner.createProductTypeSelectTree({
									renderTo : owner.ids.productTypeTree,
									codeDomId : owner.ids.productType,
									width : 200,
									onlyLeafSelect : true,
									selectedValue : {code:data.productBean.productType,text:data.productBean.productTypeStr}
								});
								DataUtil.populateDataForArea(data.productBean,
										owner.ids.templateIdentifyUpdateContentDiv);// 渲染数据到页面
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
					//id : "templateIdentifyUpdate",
					contentEl : this.ids.templateIdentifyUpdateContentDiv,
					renderTo : this.ids.templateIdentifyUpdatePanelDiv,
					hasBackGroundColor : true,
					//height : 250,
					widthPercent : 1,
					heightPercent : 0.22,
					bbar : [{
								xtype : 'tbfill'
							}, {
								text : '修改',
								tooltip : '修改产品识别信息', // 提示信息
								handler : function() {
									owner.updateIdentify();
								},
								iconCls : 'save' // 图标CSS
							}, '-']
				});
        
	},
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
		var data = DataUtil.getDataFromArea(owner.ids.templateIdentifyUpdateContentDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			//目标属性服务名称
		 	var targetServiceJsonData = {'targetAttributeServiceName' : 'productIdentifyService'};
		 	//组装属性信息bean
		    var beanJsonData = {'productBean' : DataUtil.decode(data)};
		    var jsonData = ObjectUtil.apply(beanJsonData,targetServiceJsonData);
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productService.updateAttribute",
				jsonData : DataUtil.encode(jsonData),
				callback : function(msg) {
					MsgUtil.alert("提示", "产品识别信息修改成功!");
				}
			});
		}
	}

});