/**
 * 产品费率信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改产品费率信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.update.TemplateRateInfoUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/update/TemplateRateInfoUpdate.html",// 页面url地址
	
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
										owner.ids.templateRateInfoUpdateContentDiv);// 渲染数据到页面
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
//		//收费类型
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTCHARGETYPE_CATEGORY ],
//					renderTo : [ this.ids.prodChargeTypeEnum ],
//					id : [ this.ids.prodChargeTypeEnum ]
//				});
//		//收费方式
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTCHARGEMODE_CATEGORY ],
//					renderTo : [ this.ids.prodChargeModeEnum ],
//					id : [ this.ids.prodChargeModeEnum ]
//				});
//		//计算方法
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTCOUNTWAY_CATEGORY ],
//					renderTo : [ this.ids.prodCounterModeEnum ],
//					id : [ this.ids.prodCounterModeEnum ]
//				});
//		//客户等级
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.CUSTOMER_LEVEL_CATEGORY ],
//					renderTo : [ this.ids.prodCustomerGradeEnum ],
//					id : [ this.ids.prodCustomerGradeEnum ]
//				});
//		//差别模式
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTDIFMODE_CATEGORY ],
//					renderTo : [ this.ids.prodContrastModeEnum ],
//					id : [ this.ids.prodContrastModeEnum ]
//				});
//		//费用模式
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTCOSTMODE_CATEGORY ],
//					renderTo : [ this.ids.prodRateModeEnum ],
//					id : [ this.ids.prodRateModeEnum ]
//				});
//		//比例基准
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTPROSTAND_CATEGORY ],
//					renderTo : [ this.ids.prodBaseScaleEnum ],
//					id : [ this.ids.prodBaseScaleEnum ]
//				});
//		//业务类型
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTBUSSTYPE_CATEGORY ],
//					renderTo : [ this.ids.prodOperationTypeEnum ],
//					id : [ this.ids.prodOperationTypeEnum ]
//				});
//		//适用机构
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTAPPORG_CATEGORY ],
//					renderTo : [ this.ids.prodApplyOrgEnum ],
//					id : [ this.ids.prodApplyOrgEnum ]
//				});
//	
		// 面板
		this.create('component.Panel',{
			title : '',
			//id : "templateRateInfoUpdatePanel",
			contentEl : this.ids.templateRateInfoUpdateContentDiv,
			renderTo : this.ids.templateRateInfoUpdatePanelDiv,
			hasBackGroundColor : true,
			//height : 295,
			widthPercent : 1,
			heightPercent : 0.68,
	        bbar:[{xtype: 'tbfill'},{
				text : '修改',
				tooltip : '修改产品费率信息', // 提示信息
				iconCls : 'save', // 图标CSS
				handler : function() {
					owner.updateRateInfo();
				}
			}, '-']
		});
	},
	/**
	 * 修改产品费率信息
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	updateRateInfo : function() {
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.templateRateInfoUpdateContentDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			//目标属性服务名称
		 	var targetServiceJsonData = {'targetAttributeServiceName' : 'productRateInfoService'};
		 	//组装属性信息bean
		    var beanJsonData = {'productRateInfoBean' : DataUtil.decode(data)};
			var jsonData = ObjectUtil.apply(beanJsonData,targetServiceJsonData);
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productService.updateAttribute",
				jsonData : DataUtil.encode(jsonData),
				callback : function(msg) {
					MsgUtil.alert("提示", "产品费率信息修改成功!");
				}
			});
		}
	}

});