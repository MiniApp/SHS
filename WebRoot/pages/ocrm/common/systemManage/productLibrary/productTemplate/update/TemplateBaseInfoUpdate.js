/**
 * 产品基本信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改产品基本信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.update.TemplateBaseInfoUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/update/TemplateBaseInfoUpdate.html",// 页面url地址

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
							'targetAttributeServiceName' : 'productBaseInfoService',
							'productId' : owner.customerky
						};
						ConnectionUtil
								.ajaxReq( {
									strServId : "productService.getProductAttributeInfo",
									jsonData : DataUtil.encode(jsonData),
									callback : function(data) {
										// 产品投资起始日
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodinvestbegindatestr,
															format : 'Y-m-d',
															value : data.productBaseInfoBean.prodinvestbegindatestr
														});
										// 产品投资终止日
										ObjectUtil
												.create(
														'component.DateField',
														{
															renderTo : owner.ids.prodinvestenddatestr,
															format : 'Y-m-d',
															value : data.productBaseInfoBean.prodinvestenddatestr
														});
										//产品分红方式
										var compCheckbox = owner.create("component.CheckboxRadioField", {
											renderTo : owner.ids.tmpProdmeloncuttingmodeUpdateDiv,
											name:'prodmeloncuttingmodeList',
											fieldType:'checkbox',
											disabled : false,
											columns : 1,
											items :[{label : '现金分红',value : CodeStringDefinition.CASH_DIVIDEND},
											        {label : '红利再投资',value : CodeStringDefinition.DIVIDEND_REINVESTMENT}],
											id : 'tmpProdmeloncuttingmodeUpdateCheckbox',
											itemClick : function(){
												
											}
										});
										//产品提前中止方
										var compRadio = owner.create("component.CheckboxRadioField", {
											renderTo : owner.ids.tmpProdaheadpauseUpdateDiv,
											name:'prodaheadpause',
											fieldType:'radio',
											disabled : false,
									        labelWidth : 100,
									        columns : 2,
											checkedValue:[data.productBaseInfoBean.prodaheadpause],
											items :[{label : '银行方',value : CodeStringDefinition.BANK_SIDE},
											        {label : '客户方',value : CodeStringDefinition.CLIENT_SIDE},
											        {label : '双方',value : CodeStringDefinition.BOTH_SIDES},
													{label : '不允许',value : CodeStringDefinition.DOES_NOT_ALLOW}],
											id : 'tmpProdaheadpauseUpdateRadio',
											itemClick : function(){
												
											}
										});
										DataUtil
												.populateDataForArea(
														data.productBaseInfoBean,
														owner.ids.templateBaseInfoUpdateContentDiv);// 渲染数据到页面
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
											//id : "templateBaseInfoUpdatePanel",
											contentEl : this.ids.templateBaseInfoUpdateContentDiv,
											renderTo : this.ids.templateBaseInfoUpdatePanelDiv,
											//height : 560,
											widthPercent : 0.9845,
											heightPercent : 1.36,
											hasBackGroundColor : true,
											bbar : [ {
												xtype : 'tbfill'
											}, {
												text : '修改',
												tooltip : '修改产品基本信息', // 提示信息
												iconCls : 'save', // 图标CSS
												handler : function() {
													owner.updateBaseInfo();
												}
											}, '-' ]
										});

					},
					/**
					 * 修改产品基本信息
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					updateBaseInfo : function() {
						var owner = this;
						var data = DataUtil
								.getDataFromArea(owner.ids.templateBaseInfoUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							// 目标属性服务名称
							var targetServiceJsonData = {
								'targetAttributeServiceName' : 'productBaseInfoService'
							};
							// 组装属性信息bean
							var beanJsonData = {
								'productBaseInfoBean' : DataUtil.decode(data)
							};
							var jsonData = ObjectUtil.apply(beanJsonData,
									targetServiceJsonData);
							ConnectionUtil.ajaxReq( {// 发送ajax请求
										strServId : "productService.updateAttribute",
										jsonData : DataUtil.encode(jsonData),
										callback : function(msg) {
											MsgUtil.alert("提示", "产品基本信息修改成功!");
										}
									});
						}
					}
				});