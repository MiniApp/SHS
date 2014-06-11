/**
 * 产品周期信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改产品周期信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.update.TemplatePeriodsInfoUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/update/TemplatePeriodsInfoUpdate.html",// 页面url地址

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
							'productId' : owner.customerky
						};
						ConnectionUtil
								.ajaxReq( {
									strServId : "productService.getProductAttributeInfo",
									jsonData : DataUtil.encode(jsonData),
									callback : function(data) {
										// 起始日期
									ObjectUtil.create('component.DateField', {
										renderTo : owner.ids.prodBeginDateStr,
										format : 'Y-m-d H:i',
										showTime : true,
										value : data.productPeriodsInfoBean.prodBeginDateStr
									});
									// 结束日期
									ObjectUtil.create('component.DateField', {
										renderTo : owner.ids.prodEndDateStr,
										format : 'Y-m-d H:i',
										showTime : true,
										value : data.productPeriodsInfoBean.prodEndDateStr
									});
									
									DataUtil
											.populateDataForArea(
													data.productPeriodsInfoBean,
													owner.ids.templatePeriodsInfoUpdateContentDiv);// 渲染数据到页面
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
											//id : "templatePeriodsInfoUpdatePanel",
											contentEl : this.ids.templatePeriodsInfoUpdateContentDiv,
											renderTo : this.ids.templatePeriodsInfoUpdatePanelDiv,
											hasBackGroundColor : true,
											//height : 210,
											widthPercent : 1,
											heightPercent : 0.49,
											bbar : [ {
												xtype : 'tbfill'
											}, {
												text : '修改',
												tooltip : '修改产品周期信息', // 提示信息
												iconCls : 'save', // 图标CSS
												handler : function() {
													owner.updatePeriodsInfo();
												}
											}, '-' ]
										});
					},
					/**
					 * 修改产品周期信息
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					updatePeriodsInfo : function() {
						var owner = this;
						var data = DataUtil
								.getDataFromArea(owner.ids.templatePeriodsInfoUpdateContentDiv);// 获取页面输入的信息并自动验证
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
											MsgUtil.alert("提示", "产品周期信息修改成功!");
										}
									});
						}
					}

				});