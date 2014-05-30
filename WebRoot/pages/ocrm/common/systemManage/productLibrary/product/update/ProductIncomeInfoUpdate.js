/**
 * 产品收益信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改产品收益信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.update.ProductIncomeInfoUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/update/ProductIncomeInfoUpdate.html",// 页面url地址

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
							'targetAttributeServiceName' : 'productIncomeInfoService',
							'productId' : owner.customerky
						};
						ConnectionUtil
								.ajaxReq( {
									strServId : "productService.getProductAttributeInfo",
									jsonData : DataUtil.encode(jsonData),
									callback : function(data) {
										// 权益登记日
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodRightsRegisterDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodRightsRegisterDateStr
														});
										// 分红发放日
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodMelonCuttingGrantDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodMelonCuttingGrantDateStr
														});
										// 收益计算起始日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodIncomeCounterBeginDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodIncomeCounterBeginDateStr
														});
										// 收益计算中止日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodIncomeCounterEndDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodIncomeCounterEndDateStr
														});
										// 收益率启用日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodIncomeRateStartDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodIncomeRateStartDateStr
														});
										// 设置日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodSettingDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodSettingDateStr
														});
										// 生效起始日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodInureBeginDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodInureBeginDateStr
														});
										// 生效终止日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodInureEndDateStr,
															format : 'Y-m-d',
															value : data.productIncomeInfoBean.prodInureEndDateStr
														});
										DataUtil
												.populateDataForArea(
														data.productIncomeInfoBean,
														owner.ids.productIncomeInfoUpdateContentDiv);// 渲染数据到页面
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
						this
								.create(
										'component.Panel',
										{
											title : '',
											//id : "productIncomeInfoUpdatePanel",
											contentEl : this.ids.productIncomeInfoUpdateContentDiv,
											renderTo : this.ids.productIncomeInfoUpdatePanelDiv,
											hasBackGroundColor : true,
											//height : 375,
											widthPercent : 1,
											heightPercent : 0.87,
											bbar : [ {
												xtype : 'tbfill'
											}, {
												text : '修改',
												tooltip : '修改产品收益信息', // 提示信息
												iconCls : 'save', // 图标CSS
												handler : function() {
													owner.updateIncomeInfo();
												}
											}, '-' ]
										});

					},

					/**
					 * 修改产品收益信息
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					updateIncomeInfo : function() {
						var owner = this;
						var data = DataUtil
								.getDataFromArea(owner.ids.productIncomeInfoUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							// 目标属性服务名称
							var targetServiceJsonData = {
								'targetAttributeServiceName' : 'productIncomeInfoService'
							};
							// 组装属性信息bean
							var beanJsonData = {
								'productIncomeInfoBean' : DataUtil.decode(data)
							};
							var jsonData = ObjectUtil.apply(beanJsonData,
									targetServiceJsonData);
							ConnectionUtil.ajaxReq( {// 发送ajax请求
										strServId : "productService.updateAttribute",
										jsonData : DataUtil.encode(jsonData),
										callback : function(msg) {
											MsgUtil.alert("提示", "产品收益信息修改成功!");
										}
									});
						}
					}

				});