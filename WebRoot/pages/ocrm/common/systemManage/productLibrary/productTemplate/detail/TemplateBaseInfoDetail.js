/**
 * 产品基本信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.detail.TemplateBaseInfoDetail",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/detail/TemplateBaseInfoDetail.html",// 页面url地址

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
										//产品提前中止方
//										var compRadio = owner.create("component.CheckboxRadioField", {
//											renderTo : owner.ids.tmpProdaheadpauseDetailDiv,
//											name:'prodaheadpause',
//											fieldType:'radio',
//											disabled : false,
//									        labelWidth : 100,
//											checkedValue:[data.productBaseInfoBean.prodaheadpause],
//											items :[{label : '银行方',value : CodeStringDefinition.BANK_SIDE},
//											        {label : '客户方',value : CodeStringDefinition.CLIENT_SIDE},
//											        {label : '双方',value : CodeStringDefinition.BOTH_SIDES},
//													{label : '不允许',value : CodeStringDefinition.DOES_NOT_ALLOW}],
//											id : 'tmpProdaheadpauseDetailRadio',
//											itemClick : function(){
//												
//											}
//										});
										DataUtil
												.populateDataForArea(
														data.productBaseInfoBean,
														owner.ids.templateBaseInfoDetailContentDiv);// 渲染数据到页面
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
						//产品分红方式
//						var compCheckbox = this.create("component.CheckboxRadioField", {
//							renderTo : this.ids.tmpProdmeloncuttingmodeDetailDiv,
//							name:'prodmeloncuttingmodeList',
//							fieldType:'checkbox',
//							disabled : false,
//							items :[{label : '现金分红',value : CodeStringDefinition.CASH_DIVIDEND},
//							        {label : '红利再投资',value : CodeStringDefinition.DIVIDEND_REINVESTMENT}],
//							id : 'tmpProdmeloncuttingmodeDetailCheckbox',
//							itemClick : function(){
//								
//							}
//						});
						
						// 面板
						this
								.create(
										'component.Panel',
										{
											title : '',
											//id : "templateBaseInfoDetailPanel",
											contentEl : this.ids.templateBaseInfoDetailContentDiv,
											renderTo : this.ids.templateBaseInfoDetailPanelDiv,
											//height : 560,
											widthPercent : 1,
											heightPercent : 1,
											hasBackGroundColor : true
										});

					}
				});