/**
 * 产品交易限制信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductTradeLimitInfoDetail",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/detail/ProductTradeLimitInfoDetail.html",// 页面url地址
	
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
						var jsonData = {'targetAttributeServiceName':'productTradeLimitInfoService','productId' : owner.customerky};
						ConnectionUtil.ajaxReq( {
							strServId : "productService.getProductAttributeInfo",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
								DataUtil.populateDataForArea(data.productTradeLimitInfoBean,
										owner.ids.productTradeLimitInfoDetailContentDiv);// 渲染数据到页面
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

		//产品功能限制	
//		var compCheckbox = this.create("component.CheckboxRadioField", {
//			renderTo : this.ids.prodFuncLimitDetailDiv,
//			name:'prodFuncLimitList',
//			fieldType:'checkbox',
//			disabled : false,
//			items :[{label : '预约',value : CodeStringDefinition.RESERVATION},
//			        {label : '认购',value : CodeStringDefinition.SUBSCRIBE},
//			        {label : '申购',value : CodeStringDefinition.PURCHASE},
//			        {label : '赎回',value : CodeStringDefinition.REDEMPTION},
//			        {label : '挂单',value : CodeStringDefinition.PENDING_ORDER},
//			        {label : '撤销',value : CodeStringDefinition.REVOCATION},
//			        {label : '质押',value : CodeStringDefinition.PLEDGE},
//			        {label : '非交易过户',value : CodeStringDefinition.NON_TRADING_TRANSFER}],
//			id : 'prodFuncLimitDetailCheckbox',
//			itemClick : function(){
//			
//			}
//		});
	
		// 面板
		this.create('component.Panel',{
			title : '',
			//id : "productTradeLimitInfoDetailPanel",
			contentEl : this.ids.productTradeLimitInfoDetailContentDiv,
			renderTo : this.ids.productTradeLimitInfoDetailPanelDiv,
			hasBackGroundColor : true,
			//height : 420
			widthPercent : 1,
			heightPercent : 1
		});     
		
	}

});