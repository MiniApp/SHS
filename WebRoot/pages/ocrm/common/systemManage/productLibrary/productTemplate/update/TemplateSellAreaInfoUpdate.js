/**
 * 产品销售范围信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改销售范围基本信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.update.TemplateSellAreaInfoUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/update/TemplateSellAreaInfoUpdate.html",// 页面url地址

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
						var jsonData = {'targetAttributeServiceName':'productSellAreaInfoService','productId' : owner.customerky};
						ConnectionUtil.ajaxReq( {
							strServId : "productService.getProductAttributeInfo",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
								DataUtil.populateDataForArea(data.productSellAreaInfoBean,
										owner.ids.templateSellAreaInfoUpdateContectDiv);// 渲染数据到页面
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
//		//产品销售区域
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTSALEAREA_CATEGORY ],
//					renderTo : [ this.ids.prodSellAreaEnum ],
//					id : [ this.ids.prodSellAreaEnum ]
//				});
//		//销售渠道
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTSALECHAN_CATEGORY ],
//					renderTo : [ this.ids.prodSellChannelEnum ],
//					id : [ this.ids.prodSellChannelEnum ]
//				});
//		//产品发售对象
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTSALEOBJ_CATEGORY ],
//					renderTo : [ this.ids.prodSellTargetEnum ],
//					id : [ this.ids.prodSellTargetEnum ]
//				});
//		//专家指导选择
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.FLAG_CATEGORY ],
//					renderTo : [ this.ids.prodSellGuideEnum ],
//					id : [ this.ids.prodSellGuideEnum ]
//				});

		// 面板
		this.create('component.Panel',{
					title : '',
					//id : "templateSellAreaInfoUpdatePanel",
					contentEl : this.ids.templateSellAreaInfoUpdateContectDiv,
					renderTo : this.ids.templateSellAreaInfoUpdatePanelDiv,
					hasBackGroundColor : true,
					//height : 178,
					widthPercent : 1,
					heightPercent : 0.34,
			        bbar:[{xtype: 'tbfill'},{
						text : '修改',
						tooltip : '修改产品销售范围信息', // 提示信息
						iconCls : 'save', // 图标CSS
						handler : function() {
							owner.updateSellAreaInfo();
						}
					}, '-']
				});
		
	},
	
	/**
	 * 修改销售范围基本信息
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	updateSellAreaInfo : function() {
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.templateSellAreaInfoUpdateContectDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			//目标属性服务名称
		 	var targetServiceJsonData = {'targetAttributeServiceName' : 'productSellAreaInfoService'};
		 	//组装属性信息bean
		    var beanJsonData = {'productSellAreaInfoBean' : DataUtil.decode(data)};
			var jsonData = ObjectUtil.apply(beanJsonData,targetServiceJsonData);
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productService.updateAttribute",
				jsonData : DataUtil.encode(jsonData),
				callback : function(msg) {
					MsgUtil.alert("提示", "产品销售范围信息修改成功!");
				}
			});
		}
	}

});