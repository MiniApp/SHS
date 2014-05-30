/**
 * 产品基本信息 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存产品基本信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.create.TemplateBaseInfoCreate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/create/TemplateBaseInfoCreate.html",// 页面url地址
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
							'productId' : owner.parent.parent.productId
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
										// 产品分红方式
										var compCheckbox = owner
												.create(
														"component.CheckboxRadioField",
														{
															renderTo : owner.ids.tmpProdmeloncuttingmodeDiv,
															name : 'prodmeloncuttingmodeList',
															fieldType : 'checkbox',
															disabled : false,
															columns : 1,
															items : [
																	{
																		label : '现金分红',
																		value : CodeStringDefinition.CASH_DIVIDEND
																	},
																	{
																		label : '红利再投资',
																		value : CodeStringDefinition.DIVIDEND_REINVESTMENT
																	} ],
															id : 'tmpProdmeloncuttingmodeUpdateCheckbox',
															itemClick : function() {

															}
														});
										// 产品提前中止方
										var compRadio = owner
												.create(
														"component.CheckboxRadioField",
														{
															renderTo : owner.ids.tmpProdaheadpauseDiv,
															name : 'prodaheadpause',
															fieldType : 'radio',
															disabled : false,
															labelWidth : 100,
															columns : 2,
															checkedValue : [ data.productBaseInfoBean.prodaheadpause ],
															items : [
																	{
																		label : '银行方',
																		value : CodeStringDefinition.BANK_SIDE
																	},
																	{
																		label : '客户方',
																		value : CodeStringDefinition.CLIENT_SIDE
																	},
																	{
																		label : '双方',
																		value : CodeStringDefinition.BOTH_SIDES
																	},
																	{
																		label : '不允许',
																		value : CodeStringDefinition.DOES_NOT_ALLOW
																	} ],
															id : 'tmpProdaheadpauseUpdateRadio',
															itemClick : function() {

															}
														});
										DataUtil
												.populateDataForArea(
														data.productBaseInfoBean,
														owner.ids.templateBaseInfoCreateContentDiv);// 渲染数据到页面
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
						 * 产品模式、产品期限、产品状态、产品募集币种、产品本金兑付方式、产品风险等级、产品流动性
						 * 产品循环标志、收益计算模式、收益特点、收益支付形式、产品投资策略、产品投资标的、产品投资行业
						 * 产品投资区域、所有者、产品是否计税、税率方案
						 */
						// this.create(
						// 'component.EnumSelector',
						// {
						// category : [
						// CodeStringDefinition.PRODUCTMODE_CATEGORY,
						// CodeStringDefinition.PRODUCTTERM_CATEGORY,
						// CodeStringDefinition.PRODUCTSTATE_CATEGORY,
						// CodeStringDefinition.CURRENCY_CATEGORY,
						// CodeStringDefinition.PRODUCTCORCASH_CATEGORY,
						// CodeStringDefinition.PRODUCTRISKLEVL_CATEGORY,
						// CodeStringDefinition.PRODUCTFLUIDTY_CATEGORY,
						// CodeStringDefinition.PRODUCTCYCLEFLAG_CATEGORY,
						// CodeStringDefinition.PRODUCTINCOUNT_CATEGORY,
						// CodeStringDefinition.PRODUCTINTRAIT_CATEGORY,
						// CodeStringDefinition.PRODUCTINPAY_CATEGORY,
						// CodeStringDefinition.PRODUCTINPO_CATEGORY,
						// CodeStringDefinition.PRODUCTINTAR_CATEGORY,
						// CodeStringDefinition.PRODUCTINWAY_CATEGORY,
						// CodeStringDefinition.PRODUCTINAREA_CATEGORY,
						// CodeStringDefinition.PRODUCTOWNERORG_CATEGORY,
						// CodeStringDefinition.FLAG_CATEGORY,
						// CodeStringDefinition.PRODUCTTAXRATE_CATEGORY
						// ],
						// renderTo : [ this.ids.prodmodeEnum,
						// this.ids.prodlimitdateEnum,
						// this.ids.prodstateEnum,
						// this.ids.prodcollectmoneytypeEnum,
						// this.ids.prodcorpuscashmodeEnum,
						// this.ids.prodriskgradeEnum,
						// this.ids.prodfluidityEnum,
						// this.ids.prodcycleflagEnum,
						// this.ids.prodincomecountermodeEnum,
						// this.ids.prodincomespecialtyEnum,
						// this.ids.prodincomepaymodeEnum,
						// this.ids.prodinvestpolicyEnum,
						// this.ids.prodinvestsigntargetEnum,
						// this.ids.prodinvestindustryEnum,
						// this.ids.prodinvestareaEnum, this.ids.prodownerEnum,
						// this.ids.prodiftaxEnum,
						// this.ids.prodtaxrateprojectEnum
						// ],
						// id : [ this.ids.prodmodeEnum,
						// this.ids.prodlimitdateEnum,
						// this.ids.prodstateEnum,
						// this.ids.prodcollectmoneytypeEnum,
						// this.ids.prodcorpuscashmodeEnum,
						// this.ids.prodriskgradeEnum,
						// this.ids.prodfluidityEnum,
						// this.ids.prodcycleflagEnum,
						// this.ids.prodincomecountermodeEnum,
						// this.ids.prodincomespecialtyEnum,
						// this.ids.prodincomepaymodeEnum,
						// this.ids.prodinvestpolicyEnum,
						// this.ids.prodinvestsigntargetEnum,
						// this.ids.prodinvestindustryEnum,
						// this.ids.prodinvestareaEnum, this.ids.prodownerEnum,
						// this.ids.prodiftaxEnum,
						// this.ids.prodtaxrateprojectEnum
						// ]
						// });
						//		
						// //产品兑付币种
						// this.create(
						// 'component.EnumSelector',
						// {
						// category : [ CodeStringDefinition.CURRENCY_CATEGORY
						// ],
						// renderTo : [ this.ids.prodcashmoneytypeEnum ],
						// id : [ this.ids.prodcashmoneytypeEnum ]
						// });
						//	
						// //产品收益兑付方式
						// this.create(
						// 'component.EnumSelector',
						// {
						// category : [
						// CodeStringDefinition.PRODUCTINCASH_CATEGORY ],
						// renderTo : [ this.ids.prodincomecashmodeEnum ],
						// id : [ this.ids.prodincomecashmodeEnum ]
						// });
						//	
						// //收益币种
						// this.create(
						// 'component.EnumSelector',
						// {
						// category : [ CodeStringDefinition.CURRENCY_CATEGORY
						// ],
						// renderTo : [ this.ids.prodincomemoneytypeEnum ],
						// id : [ this.ids.prodincomemoneytypeEnum ]
						// });
						//		
						// // 产品投资起始日
						// ObjectUtil.create('component.DateField', {
						// renderTo : this.ids.prodinvestbegindatestr,
						// format : 'Y-m-d'
						// });
						// // 产品投资终止日
						// ObjectUtil.create('component.DateField', {
						// renderTo : this.ids.prodinvestenddatestr,
						// format : 'Y-m-d'
						// });
						// //产品分红方式
						// var compCheckbox =
						// this.create("component.CheckboxRadioField", {
						// renderTo : this.ids.tmpProdmeloncuttingmodeDiv,
						// name:'prodmeloncuttingmodeList',
						// fieldType:'checkbox',
						// disabled : false,
						// items :[{label : '现金分红',value :
						// CodeStringDefinition.CASH_DIVIDEND},
						// {label : '红利再投资',value :
						// CodeStringDefinition.DIVIDEND_REINVESTMENT}],
						// id : 'tmpProdmeloncuttingmodeCheckbox',
						// itemClick : function(){
						//				
						// }
						// });
						// //产品提前中止方
						// var compRadio =
						// this.create("component.CheckboxRadioField", {
						// renderTo : this.ids.tmpProdaheadpauseDiv,
						// name:'prodaheadpause',
						// fieldType:'radio',
						// disabled : false,
						// labelWidth : 100,
						// //checkedValue:[2],
						// items :[{label : '银行方',value :
						// CodeStringDefinition.BANK_SIDE},
						// {label : '客户方',value :
						// CodeStringDefinition.CLIENT_SIDE},
						// {label : '双方',value :
						// CodeStringDefinition.BOTH_SIDES},
						// {label : '不允许',value :
						// CodeStringDefinition.DOES_NOT_ALLOW}],
						// id : 'tmpProdaheadpauseRadio',
						// itemClick : function(){
						//				
						// }
						// });

						// 面板
						this
								.create(
										'component.Panel',
										{
											title : '',
											// id :
											// "templateBaseInfoCreatePanel",
											contentEl : this.ids.templateBaseInfoCreateContentDiv,
											renderTo : this.ids.templateBaseInfoCreatePanelDiv,
											// height : 560,
											widthPercent : 0.9845,
											heightPercent : 1.36,
											hasBackGroundColor : true,
											bbar : [ {
												xtype : 'tbfill'
											}, {
												text : '保存',
												tooltip : '保存产品基本信息', // 提示信息
												iconCls : 'save', // 图标CSS
												handler : function() {
													owner.createBaseInfo();
												}
											}, '-' ]
										});

					},
					/**
					 * 保存产品基本信息
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createBaseInfo : function() {
						var owner = this;
						HtmlUtil.getDom(owner.ids.productId).value = owner.parent.parent.productId;
						var data = DataUtil
								.getDataFromArea(owner.ids.templateBaseInfoCreateContentDiv);// 获取页面输入的信息并自动验证
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
											MsgUtil.alert("提示", "产品基本信息保存成功!");
										}
									});
						}
					}
				});