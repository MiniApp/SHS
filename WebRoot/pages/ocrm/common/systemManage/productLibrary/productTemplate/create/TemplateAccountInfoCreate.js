/**
 * 产品核算信息 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存产品核算信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.create.TemplateAccountInfoCreate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/create/TemplateAccountInfoCreate.html",// 页面url地址
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
												var jsonData = {'targetAttributeServiceName':'productAccountInfoService','productId' : owner.parent.parent.productId};
												ConnectionUtil.ajaxReq( {
													strServId : "productService.getProductAttributeInfo",
													jsonData : DataUtil.encode(jsonData),
													callback : function(data) {
														DataUtil.populateDataForArea(data.productAccountInfoBean,
																owner.ids.templateAccountInfoCreateContentDiv);// 渲染数据到页面
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
		/*
		 *核算类型、核算币种、账户开立层次、账户开立标志、资金划拨方式、交割方式、资金划拨模式、资金划拨类型
		 *
		 */
//		this.create(
//				'component.EnumSelector',
//				{
//					category : [ CodeStringDefinition.PRODUCTACCOUNTTYPE_CATEGORY, CodeStringDefinition.CURRENCY_CATEGORY, 
//					             CodeStringDefinition.PRODUCTOPENLEVEL_CATEGORY, CodeStringDefinition.PRODUCTOPENFLAG_CATEGORY, 
//					             CodeStringDefinition.PRODUCTCAPTRANWAY_CATEGORY, CodeStringDefinition.PRODUCTDELWAY_CATEGORY, 
//					             CodeStringDefinition.PRODUCTCAPTRANMODE_CATEGORY, CodeStringDefinition.PRODUCTCAPTRANTYPE_CATEGORY
//					           ],
//					renderTo : [ this.ids.prodcountertypeEnum, this.ids.prodcountercoinEnum,  
//					             this.ids.prodaccountlayoutEnum, this.ids.prodaccountflagEnum, 
//					             this.ids.prodmoneytransfermodeEnum, this.ids.prodpromptmodeEnum, 
//					             this.ids.prodmoneytransferpatternEnum, this.ids.prodmoneytransfertypeEnum
//					           ],
//					id : [ this.ids.prodcountertypeEnum, this.ids.prodcountercoinEnum, 
//					       this.ids.prodaccountlayoutEnum, this.ids.prodaccountflagEnum, 
//					       this.ids.prodmoneytransfermodeEnum, this.ids.prodpromptmodeEnum, 
//					       this.ids.prodmoneytransferpatternEnum, this.ids.prodmoneytransfertypeEnum
//					     ]
//				});
//		
//		//借方账户开立层次
//		this.create('component.EnumSelector',{
//			category : [CodeStringDefinition.PRODUCTOPENLEVEL_CATEGORY],
//			renderTo : [this.ids.prodsdebitaccountlayoutEnum],
//			id : [this.ids.prodsdebitaccountlayoutEnum]
//		});
//		//借方账户标志
//		this.create('component.EnumSelector',{
//			category : [CodeStringDefinition.PRODUCTOPENFLAG_CATEGORY],
//			renderTo : [this.ids.prodsdebitaccountlflagEnum],
//			id : [this.ids.prodsdebitaccountlflagEnum]
//		});
//		//贷方账户开立层次
//		this.create('component.EnumSelector',{
//			category : [CodeStringDefinition.PRODUCTOPENLEVEL_CATEGORY],
//			renderTo : [this.ids.prodslenderaccountlayoutEnum],
//			id : [this.ids.prodslenderaccountlayoutEnum]
//		});
//		//贷方账户标志
//		this.create('component.EnumSelector',{
//			category : [CodeStringDefinition.PRODUCTOPENFLAG_CATEGORY],
//			renderTo : [this.ids.prodslenderaccountflagEnum],
//			id : [this.ids.prodslenderaccountflagEnum]
//		});
			
				
		// 面板		
		this.create('component.Panel',{
			title : '',
			//id : "templateAccountInfoCreatePanel",
			contentEl : this.ids.templateAccountInfoCreateContentDiv,
			renderTo : this.ids.templateAccountInfoCreatePanelDiv,
			//height : 275,
			widthPercent : 1,
			heightPercent : 0.625,
			hasBackGroundColor : true,
	        bbar:[{xtype: 'tbfill'},{
				text : '保存',
				tooltip : '保存产品核算信息', // 提示信息
				iconCls : 'save', // 图标CSS
				handler : function() {
					owner.createAccountInfo();
				}
			}, '-']
		});
	},
	
	/**
	 * 保存产品核算信息
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	createAccountInfo : function() {
		var owner = this;
		HtmlUtil.getDom(owner.ids.productId).value = owner.parent.parent.productId;
		var data = DataUtil.getDataFromArea(owner.ids.templateAccountInfoCreateContentDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			//目标属性服务名称
		 	var targetServiceJsonData = {'targetAttributeServiceName' : 'productAccountInfoService'};
		 	//组装属性信息bean
		    var beanJsonData = {'productAccountInfoBean' : DataUtil.decode(data)};
			var jsonData = ObjectUtil.apply(beanJsonData,targetServiceJsonData);
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productService.updateAttribute",
				jsonData : DataUtil.encode(jsonData),
				callback : function(msg) {
					MsgUtil.alert("提示", "产品核算信息保存成功!");
				}
			});
		}
	}

});