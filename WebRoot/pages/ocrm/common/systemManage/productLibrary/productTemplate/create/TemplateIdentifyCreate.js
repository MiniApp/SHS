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
				"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.create.TemplateIdentifyCreate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productTemplate/create/TemplateIdentifyCreate.html",// 页面url地址
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
						// 产品类型
						this.createProductTypeSelectTree( {
							renderTo : this.ids.productTypeTree,
							codeDomId : this.ids.productType,
							width : 200,
							onlyLeafSelect : true
						});

						// 面板
						this.create('component.Panel', {
							title : '',
							//id : "templateIdentify",
							contentEl : this.ids.templateIdentifyContentDiv,
							renderTo : this.ids.templateIdentifyPanelDiv,
							hasBackGroundColor : true,
							//height : 250,
							widthPercent : 1,
							heightPercent : 0.22,
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
						HtmlUtil.getDom(owner.ids.prodIsTemplate).value = CodeStringDefinition.PRODUCT_IS_TEMPLATE;//是模板产品
						var data = DataUtil
								.getDataFromArea(owner.ids.templateIdentifyContentDiv);// 获取页面输入的信息并自动验证
						var productId = HtmlUtil.getDom(owner.ids.product_ID).value;
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							if(!/^[A-Za-z0-9]+$/.test(productId)){
								MsgUtil.error("错误提示","模板编号只能由字母和数字组成");
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