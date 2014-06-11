/**
 * 产品交易限制信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改产品交易限制信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.update.ProductTradeLimitInfoUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/update/ProductTradeLimitInfoUpdate.html",// 页面url地址
	
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
								//产品功能限制	
								var compCheckbox = owner.create("component.CheckboxRadioField", {
									renderTo : owner.ids.prodFuncLimitUpdateDiv,
									name:'prodFuncLimitList',
									fieldType:'checkbox',
									disabled : false,
									items :[{label : '预约',value : CodeStringDefinition.RESERVATION},
								        {label : '认购',value : CodeStringDefinition.SUBSCRIBE},
								        {label : '申购',value : CodeStringDefinition.PURCHASE},
								        {label : '赎回',value : CodeStringDefinition.REDEMPTION},
								        {label : '挂单',value : CodeStringDefinition.PENDING_ORDER},
								        {label : '撤销',value : CodeStringDefinition.REVOCATION},
								        {label : '质押',value : CodeStringDefinition.PLEDGE},
								        {label : '非交易过户',value : CodeStringDefinition.NON_TRADING_TRANSFER}],
								        id : 'prodFuncLimitUpdateCheckbox',
									itemClick : function(){
								
									}
								});
								DataUtil.populateDataForArea(data.productTradeLimitInfoBean,
										owner.ids.productTradeLimitInfoUpdateContentDiv);// 渲染数据到页面
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
//		//额度管理模式
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTCREDITMAN_CATEGORY ],
//					renderTo : [ this.ids.prodLimitManageModeEnum ],
//					id : [ this.ids.prodLimitManageModeEnum ]
//				});
//		//是否允许超额度销售
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.FLAG_CATEGORY ],
//					renderTo : [ this.ids.prodIfOverLimitSellEnum ],
//					id : [ this.ids.prodIfOverLimitSellEnum ]
//				});
//		//募集资金是否计息
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.FLAG_CATEGORY ],
//					renderTo : [ this.ids.prodIfCollectMoneyAccrualEnum ],
//					id : [ this.ids.prodIfCollectMoneyAccrualEnum ]
//				});
//		//产品开放类型
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTOPENTYPE_CATEGORY ],
//					renderTo : [ this.ids.prodOpenTypeEnum ],
//					id : [ this.ids.prodOpenTypeEnum ]
//				});
//		//申购控制方式
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTAPPCON_CATEGORY ],
//					renderTo : [ this.ids.prodBuyControlModeEnum ],
//					id : [ this.ids.prodBuyControlModeEnum ]
//				});
		
	
		// 面板
		this.create('component.Panel',{
			title : '',
			//id : "productTradeLimitInfoUpdatePanel",
			contentEl : this.ids.productTradeLimitInfoUpdateContentDiv,
			renderTo : this.ids.productTradeLimitInfoUpdatePanelDiv,
			hasBackGroundColor : true,
			//height : 500,
			widthPercent : 0.9845,
			heightPercent : 1.25,
	        bbar:[{xtype: 'tbfill'},{
				text : '修改',
				tooltip : '修改产品交易限制信息', // 提示信息
				iconCls : 'save', // 图标CSS
				handler : function() {
					owner.updateTradeLimitInfo();
				}
			}, '-']
		});     
		
	},
	
	/**
	 * 修改产品交易限制信息
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	updateTradeLimitInfo : function() {
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.productTradeLimitInfoUpdateContentDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			//目标属性服务名称
		 	var targetServiceJsonData = {'targetAttributeServiceName' : 'productTradeLimitInfoService'};
		 	//组装属性信息bean
		    var beanJsonData = {'productTradeLimitInfoBean' : DataUtil.decode(data)};
			var jsonData = ObjectUtil.apply(beanJsonData,targetServiceJsonData);
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productService.updateAttribute",
				jsonData : DataUtil.encode(jsonData),
				callback : function(msg) {
					MsgUtil.alert("提示", "产品交易限制信息修改成功!");
				}
			});
		}
	}

});