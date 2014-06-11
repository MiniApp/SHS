/**
 * 产品费率信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.detail.TemplateRateInfoDetail",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/detail/TemplateRateInfoDetail.html",// 页面url地址
	
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
						var jsonData = {'targetAttributeServiceName':'productRateInfoService','productId' : owner.customerky};
						ConnectionUtil.ajaxReq( {
							strServId : "productService.getProductAttributeInfo",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
								DataUtil.populateDataForArea(data.productRateInfoBean,
										owner.ids.templateRateInfoDetailContentDiv);// 渲染数据到页面
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
		this.create('component.Panel',{
			title : '',
			//id : "productRateInfoDetailPanel",
			contentEl : this.ids.templateRateInfoDetailContentDiv,
			renderTo : this.ids.templateRateInfoDetailPanelDiv,
			hasBackGroundColor : true,
			//height : 255
			widthPercent : 1,
			heightPercent : 1
		});
	}

});