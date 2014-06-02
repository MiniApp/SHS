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
				"crm.pages.ocrm.common.systemManage.productLibrary.product.create.ProductIdentifyCreate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/create/ProductIdentifyCreate.html",// 页面url地址
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
						this.setPanleDisabled(true);
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
											category : [ CodeStringDefinition.PRODUCTMANDEPT_CATEGORY, CodeStringDefinition.PRODUCTRUNDEPT_CATEGORY, 
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
									renderTo : this.ids.productSalDeptDiv,
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
									id : 'productSalDeptCheckbox',
									itemClick : function() {

									}
								});
						// 面板
						this.create('component.Panel', {
							title : '',
							//id : "productIdentify",
							contentEl : this.ids.productIdentifyContentDiv,
							renderTo : this.ids.productIdentifyPanelDiv,
							hasBackGroundColor : true,
							//height : 280,
							widthPercent : 1,
							heightPercent : 0.65,
							bbar : [ {
								xtype : 'tbfill'
							}, {
								text : '保存',
								tooltip : '保存产品识别信息', // 提示信息
								handler : function() {
									owner.createIdentify();
								},
								iconCls : 'save' // 图标CSS
							}, '-' ]
						});

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
								.getDataFromArea(owner.ids.productIdentifyContentDiv);// 获取页面输入的信息并自动验证
						var productId = HtmlUtil.getDom(owner.ids.product_ID).value;
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							if(!/^[A-Za-z0-9]/.test(productId)){
								MsgUtil.error("错误提示","产品编号只能由字母或数字组成");
								return;
							}
							ConnectionUtil.ajaxReq( {// 发送ajax请求
										strServId : "productService.createProduct",
										jsonData : data,
										callback : function(msg) {
											owner.parent.parent.productId = productId;
											MsgUtil.alert("提示",
													"产品识别信息保存成功,请继续完善其他参数组信息!");
											owner.setPanleDisabled(false);
										}
									});
						}
					},
					/**
					 * 设置Panel是否可用
					 * 
					 * @param
					 * @return
					 * @程序员：tangyingzhen
					 * @编码日期：2012-07-18
					 * @最后修改日期：
					 */
					setPanleDisabled : function(disable) {
						var me = this;
						DataUtil.each(this.parent.parent.componets, function(
								item) {
							if (item.type == 'Panel') {
								if (me.parent.id != item.id) {
									item.setDisabled(disable);
								} else {
									if (!disable) {
										item.setDisabled(true);
										item.parent.setActiveTab(1);
									}
								}
							}
						});
					}

				});