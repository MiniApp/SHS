/**
 * 信用卡产品基本信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * 
 * @author suxiaoliang
 * @since 2013-03-08
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.detail.ProductCreditcardInfoDetail",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/detail/ProductCreditcardInfoDetail.html",// 页面url地址

	/**
	 * 初始化页面数据
	 * 
	 * @param
	 * @return
	 * @程序员：suxiaoliang
	 * @编码日期：2013-03-08
	 * @最后修改日期：
	 */	
	initData : function() {
						// 加载并渲染数据
						var owner = this;
						var userInfo = DataUtil.getUserInfo();
						if (CodeStringDefinition.POSITION_CENTER_MSGCODE == userInfo.orgLevel
								&& CodeStringDefinition.USER_ROLE_ACCOUNT_MANAGER == userInfo.authorityCode) {
		                    newbtn= [{
								text : '更新',
								iconCls : 'edit',
								tooltip : '更新',
								handler : function() {
									owner.updataBaseInfo();
								}
							}]
									
						};
						var jsonData = {'productId' : owner.productId};
						ConnectionUtil.ajaxReq( {
							strServId : "productManageService.getCreditcardInfoById",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
								DataUtil.populateDataForArea(data,owner.ids.productIdentifyDetailContentDiv);// 渲染数据到页面
							}
						});
					},
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：suxiaoliang
	 * @编码日期：2013-03-08
	 * @最后修改日期：
	 */	
	initCmp : function() {
		var owner = this;
		// 面板
		this.create('component.Panel', {
			
					title : '',
					contentEl : this.ids.productIdentifyDetailContentDiv,
					renderTo : this.ids.productIdentifyDetailPanelDiv,
					height : 260,
					hasBackGroundColor : true,
                    buttons : newbtn
				});
        
	},
	/**
	 * 更新信用卡产品信息窗口
	 * 
	 * @param 
	 * @return
	 * @程序员：suxiaoliang
	 * @编码日期：2013-03-08
	 * @最后修改日期：
	 */
	updataBaseInfo : function() {
		var owner = this;
		var win = owner.create(
										'component.Window',
										{
											title : '信用卡产品信息更新',
											closable : true,
											draggable : true,
											width : 700,
											height : 300,
											modal : false,
											pageObject : owner.create('crm.pages.ocrm.common.systemManage.productLibrary.product.update.ProductCreditcardInfoUpdate',//创建新增页面对象
															{
																id : 'ProductIdentifyUpdata',
																productId : owner.productId
															})
															
										});
				win.on('close', function() {
			owner.initData();
						})
	}
});