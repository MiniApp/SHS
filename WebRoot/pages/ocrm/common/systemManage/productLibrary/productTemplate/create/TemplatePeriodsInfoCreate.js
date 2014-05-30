/**
 * 产品周期信息 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存产品周期信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.create.TemplatePeriodsInfoCreate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/create/TemplatePeriodsInfoCreate.html",// 页面url地址
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
							'targetAttributeServiceName' : 'productPeriodsInfoService',
							'productId' : owner.parent.parent.productId
						};
						ConnectionUtil
								.ajaxReq( {
									strServId : "productService.getProductAttributeInfo",
									jsonData : DataUtil.encode(jsonData),
									callback : function(data) {
										// 起始日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodBeginDateStr,
															format : 'Y-m-d H:i',
															showTime : true,
															value : data.productPeriodsInfoBean.prodBeginDateStr
														});
										// 结束日期
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodEndDateStr,
															format : 'Y-m-d H:i',
															showTime : true,
															value : data.productPeriodsInfoBean.prodEndDateStr
														});

										DataUtil
												.populateDataForArea(
														data.productPeriodsInfoBean,
														owner.ids.templatePeriodsInfoCreateContentDiv);// 渲染数据到页面
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
						 * 周期类型、循环类型、循环单位
						 */
						// this.create(
						// 'component.EnumSelector',
						// {
						// category : [
						// CodeStringDefinition.PRODUCTCYCLETYPE_CATEGORY,
						// CodeStringDefinition.PRODUCTCIRTYPE_CATEGORY,
						// CodeStringDefinition.PRODUCTCIRUNIT_CATEGORY
						// ],
						// renderTo : [ this.ids.prodPeriodsTypeEnum,
						// this.ids.prodCycleTypeEnum,
						// this.ids.prodCycleUnitEnum
						// ],
						// id : [ this.ids.prodPeriodsTypeEnum,
						// this.ids.prodCycleTypeEnum,
						// this.ids.prodCycleUnitEnum
						// ]
						// });
						//		
						// //执行期循环单位
						// this.create('component.EnumSelector',{
						// category :
						// [CodeStringDefinition.PRODUCTCIRUNIT_CATEGORY],
						// renderTo : [this.ids.prodDoingCycleUnitEnum],
						// id : [this.ids.prodDoingCycleUnitEnum]
						// });
						//		
						// // 起始日期
						// ObjectUtil.create('component.DateField', {
						// renderTo : this.ids.prodBeginDateStr,
						// format : 'Y-m-d H:i',
						// showTime : true
						// });
						// // 结束日期
						// ObjectUtil.create('component.DateField', {
						// renderTo : this.ids.prodEndDateStr,
						// format : 'Y-m-d H:i',
						// showTime : true
						// });

						// 面板
						this
								.create(
										'component.Panel',
										{
											title : '',
											// id :
											// "templatePeriodsInfoCreatePanel",
											contentEl : this.ids.templatePeriodsInfoCreateContentDiv,
											renderTo : this.ids.templatePeriodsInfoCreatePanelDiv,
											hasBackGroundColor : true,
											// height : 210,
											widthPercent : 1,
											heightPercent : 0.49,
											bbar : [ {
												xtype : 'tbfill'
											}, {
												text : '保存',
												tooltip : '保存产品周期信息', // 提示信息
												iconCls : 'save', // 图标CSS
												handler : function() {
													owner.createPeriodsInfo();
												}
											}, '-' ]
										});
					},
					/**
					 * 保存产品周期信息
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createPeriodsInfo : function() {
						var owner = this;
						HtmlUtil.getDom(owner.ids.product_ID).value = owner.parent.parent.productId;
						var data = DataUtil
								.getDataFromArea(owner.ids.templatePeriodsInfoCreateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							// 目标属性服务名称
							var targetServiceJsonData = {
								'targetAttributeServiceName' : 'productPeriodsInfoService'
							};
							// 组装属性信息bean
							var beanJsonData = {
								'productPeriodsInfoBean' : DataUtil
										.decode(data)
							};
							var jsonData = ObjectUtil.apply(beanJsonData,
									targetServiceJsonData);
							ConnectionUtil.ajaxReq( {// 发送ajax请求
										strServId : "productService.updateAttribute",
										jsonData : DataUtil.encode(jsonData),
										callback : function(msg) {
											MsgUtil.alert("提示", "产品周期信息保存成功!");
										}
									});
						}
					}

				});