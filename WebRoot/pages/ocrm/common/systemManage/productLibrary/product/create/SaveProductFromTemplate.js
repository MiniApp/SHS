/**
 * 产品识别信息 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存产品识别信息</li>
 * 
 * @author tangyingzhen
 * @since 2012-08-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.create.SaveProductFromTemplate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/create/SaveProductFromTemplate.html",// 页面url地址
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
						var owner = this;
						HtmlUtil.getDom(owner.ids.productOldId).value = owner.productId;
						HtmlUtil.getDom(owner.ids.productOldName).value = owner.productName;
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
						// 特殊日期
						ObjectUtil.create('component.DateField', {
							renderTo : this.ids.specialDateStr,
							format : 'Y-m-d',
							width : 200
						});
						// 特殊日期起始日
						ObjectUtil.create('component.DateField', {
							renderTo : this.ids.specialStratDateStr,
							format : 'Y-m-d',
							width : 200
						});
						// 特殊日期终止日
						ObjectUtil.create('component.DateField', {
							renderTo : this.ids.specialEndDateStr,
							format : 'Y-m-d',
							width : 200
						});
						// 主办行
						this.createOrgSelectTree( {
							renderTo : this.ids.masterTree,
							codeDomId : this.ids.master,
							width : 200,
							onlyLeafSelect : false
						});
						/*
						 * 产品管理部门、营运管理部门、产品品牌
						 */ 
						this.create('component.EnumSelector',
										{
											category : [ CodeStringDefinition.PRODUCTMANDEPT_CATEGORY, CodeStringDefinition.PRODUCTRUNDEPT_CATEGORY ,
											             CodeStringDefinition.PRODUCTBRAND_CATEGORY
											           ],
											renderTo : [ this.ids.productMngDeptEnum, this.ids.productRunDeptEnum, 
											             this.ids.productBrandEnum
											           ],
											id : [ this.ids.productMngDeptEnum, this.ids.productRunDeptEnum, 
											       this.ids.productBrandEnum
											     ],
											width : 200
										});
					
						// 产品类型
						this.createProductTypeSelectTree( {
							renderTo : this.ids.productTypeTree,
							codeDomId : this.ids.productType,
							width : 200,
							onlyLeafSelect : true
						});
						// 营销管理部门
						var compCheckbox = this.create(
								"component.CheckboxRadioField", {
									renderTo : this.ids.saveProductSalDeptDiv,
									name : 'productSalDeptList',
									fieldType : 'checkbox',
									disabled : false,
									items : [ {
										label : '个人金融部',
										value : CodeStringDefinition.PERSON_FINANCE
									}, {
										label : '公司金融部',
										value : CodeStringDefinition.COMPANY_FINANCE
									}, {
										label : '贸易金融部',
										value : CodeStringDefinition.TRADE_FINANCE
									}, {
										label : '小微企业金融部',
										value : CodeStringDefinition.SMALL_CORP_FINANCE_DEP
									}, {
										label : '金融市场部',
										value : CodeStringDefinition.FINANCIAL_MARKETS_DEP
									} ],
									id : 'saveProductSalDeptDivCheckbox',
									itemClick : function() {

									}
								});

						HtmlUtil.getDom(this.ids.selectproductSubjectImg).src = Constants.CONTEXT_PATH
								+ "/resources/images/icons/house_go.png";
						// 产品所属科目

						// 面板
						this.create('component.Panel', {
							title : '',
							//id : "saveProductFromTemplate",
							contentEl : this.ids.saveProductFromTemplateContentDiv,
							renderTo : this.ids.saveProductFromTemplatePanelDiv,
							hasBackGroundColor : true,
							//height : 300,
							widthPercent : 0.98,
							heightPercent : 0.97,
							bbar : [ {
								xtype : 'tbfill'
							}, {
								text : '另存为产品',
								tooltip : '模板另存为产品', // 提示信息
								handler : function() {
									owner.createIdentify();
								},
								iconCls : 'save' // 图标CSS
							}, '-' ]
						});

					},

					initEvent : function() {
						var owner = this;
						HtmlUtil.getDom(owner.ids.productSubjectSelect).onclick = function() {
							owner.createProductSubjectSelectWindow( {
								title : '选择产品科目',
								checkbox : false,
								displayDomId : owner.ids.prodSubjectStr,
								hiddenDomId : owner.ids.prodSubject
							});
						};
						HtmlUtil.getDom(owner.ids.clearLink).onclick = function() {// 清除按钮
							HtmlUtil.getDom(owner.ids.prodSubject).value = "";// 清除已选择的
							HtmlUtil.getDom(owner.ids.prodSubjectStr).value = "";
						};
					},
					createProductSubjectSelectWindow : function(config) {
						config.id = "selectProductSubject";
						var win = ObjectUtil.create('component.Window', {
							title : config.title,
							closable : true,
							draggable : true,
							width : config.width || 420,
							height : config.height || 450,
							modal : true,
							pageObject : ObjectUtil.create(
									"business.product.ProdSubjectTree", config)
						});
						return win;
					},
					/**
					 * 保存产品识别信息
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					createIdentify : function() {
						var owner = this;
						HtmlUtil.getDom(owner.ids.prodIsTemplate).value = CodeStringDefinition.PRODUCT_NOT_TEMPLATE;//不是模板产品
						var data = DataUtil
								.getDataFromArea(owner.ids.saveProductFromTemplateContentDiv);// 获取页面输入的信息并自动验证
						var productId = HtmlUtil.getDom(owner.ids.product_ID).value;
						var productOldId = HtmlUtil.getDom(owner.ids.productOldId).value;
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							if(!/^[A-Za-z0-9]{15}$/.test(productId)){
								MsgUtil.error("错误提示","产品编号只能由字母和数字组成,长度为15位!");
								return;
							}
							if(productId == productOldId){
								MsgUtil.error("错误提示","产品编号与模板编号重复,请重新输入!");
								return;
							}
							ConnectionUtil.ajaxReq( {// 发送ajax请求
										strServId : "productService.saveAsProduct",
										jsonData : data,
										callback : function(msg) {
											MsgUtil.alert("提示","另存产品成功!");
											owner.parent.close();// 关闭窗口
										}
									});
						}
					}

				});