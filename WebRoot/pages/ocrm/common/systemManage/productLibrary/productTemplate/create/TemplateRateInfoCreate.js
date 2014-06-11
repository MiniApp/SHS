/**
 * 产品费率信息 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存产品费率信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.create.TemplateRateInfoCreate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/create/TemplateRateInfoCreate.html",// 页面url地址
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
						var jsonData = {
							'targetAttributeServiceName' : 'productRateInfoService',
							'productId' : owner.parent.parent.productId
						};
						ConnectionUtil
								.ajaxReq( {
									strServId : "productService.getProductAttributeInfo",
									jsonData : DataUtil.encode(jsonData),
									callback : function(data) {
										DataUtil
												.populateDataForArea(
														data.productRateInfoBean,
														owner.ids.templateRateInfoCreateContentDiv);// 渲染数据到页面
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
						 * 收费类型、收费方式、计算方法、客户等级、差别模式、费用模式、比例基准、业务类型、适用机构
						 */
						// this.create(
						// 'component.EnumSelector',
						// {
						// category : [
						// CodeStringDefinition.PRODUCTCHARGETYPE_CATEGORY,
						// CodeStringDefinition.PRODUCTCHARGEMODE_CATEGORY,
						// CodeStringDefinition.PRODUCTCOUNTWAY_CATEGORY,
						// CodeStringDefinition.CUSTOMER_LEVEL_CATEGORY,
						// CodeStringDefinition.PRODUCTDIFMODE_CATEGORY,
						// CodeStringDefinition.PRODUCTCOSTMODE_CATEGORY,
						// CodeStringDefinition.PRODUCTPROSTAND_CATEGORY,
						// CodeStringDefinition.PRODUCTBUSSTYPE_CATEGORY,
						// CodeStringDefinition.PRODUCTAPPORG_CATEGORY
						// ],
						// renderTo : [ this.ids.prodChargeTypeEnum,
						// this.ids.prodChargeModeEnum,
						// this.ids.prodCounterModeEnum,
						// this.ids.prodCustomerGradeEnum,
						// this.ids.prodContrastModeEnum,
						// this.ids.prodRateModeEnum,
						// this.ids.prodBaseScaleEnum,
						// this.ids.prodOperationTypeEnum,
						// this.ids.prodApplyOrgEnum
						// ],
						// id : [ this.ids.prodChargeTypeEnum,
						// this.ids.prodChargeModeEnum,
						// this.ids.prodCounterModeEnum,
						// this.ids.prodCustomerGradeEnum,
						// this.ids.prodContrastModeEnum,
						// this.ids.prodRateModeEnum,
						// this.ids.prodBaseScaleEnum,
						// this.ids.prodOperationTypeEnum,
						// this.ids.prodApplyOrgEnum
						// ]
						// });
						// 面板
						this
								.create(
										'component.Panel',
										{
											title : '',
											// id :
											// "templateRateInfoCreatePanel",
											contentEl : this.ids.templateRateInfoCreateContentDiv,
											renderTo : this.ids.templateRateInfoCreatePanelDiv,
											hasBackGroundColor : true,
											// height : 295,
											widthPercent : 1,
											heightPercent : 0.68,
											bbar : [ {
												xtype : 'tbfill'
											}, {
												text : '保存',
												tooltip : '保存产品费率信息', // 提示信息
												iconCls : 'save', // 图标CSS
												handler : function() {
													owner.createRateInfo();
												}
											}, '-' ]
										});
					},
					/**
					 * 保存产品费率信息
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createRateInfo : function() {
						var owner = this;
						HtmlUtil.getDom(owner.ids.product_ID).value = owner.parent.parent.productId;
						var data = DataUtil
								.getDataFromArea(owner.ids.templateRateInfoCreateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							// 目标属性服务名称
							var targetServiceJsonData = {
								'targetAttributeServiceName' : 'productRateInfoService'
							};
							// 组装属性信息bean
							var beanJsonData = {
								'productRateInfoBean' : DataUtil.decode(data)
							};
							var jsonData = ObjectUtil.apply(beanJsonData,
									targetServiceJsonData);
							ConnectionUtil.ajaxReq( {// 发送ajax请求
										strServId : "productService.updateAttribute",
										jsonData : DataUtil.encode(jsonData),
										callback : function(msg) {
											MsgUtil.alert("提示", "产品费率信息保存成功!");
										}
									});
						}
					}

				});