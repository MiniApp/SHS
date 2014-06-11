/**
 * 产品识别信息 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>另存为模板产品识别信息</li>
 * 
 * @author yangminfan
 * @since 2012-12-17
 * 
 */
ObjectUtil.define(
	"crm.pages.ocrm.common.systemManage.productLibrary.productTemplate.create.TemplateAddForOutdex", "base.PageObject", {
		htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/productLibrary/productTemplate/create/TemplateAddForOutdex.html",// 页面url地址
			
		   /**
			* 初始化页面数据
			* 
			* @param
			* @return
			* @程序员：杨民凡
			* @编码日期：2012-12-17
			* @最后修改日期：
			*/
//			initData : function() {
//					var owner = this;
//					HtmlUtil.getDom(this.ids.product_ID).value = this.product_ID;
//			},
			/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：yangminfan
			 * @编码日期：2012-12-17
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
//				this.setPanleDisabled(true);
				// 产品类型
				this.createProductTypeSelectTree( {
					renderTo : this.ids.productTypeTree,
					codeDomId : this.ids.productType,
					width : 200,
					onlyLeafSelect : true
				});

				// 面板
				this.create('component.Panel', {
					//id : "templateIdentify",
					contentEl : this.ids.templateAddForOutdexContentDiv,
					renderTo : this.ids.templateAddForOutdexPanelDiv,
					hasBackGroundColor : true,
					//height : 250,
					widthPercent : 0.98,
					heightPercent : 0.92,
					buttons : [ {
						text : '另存为模板',
						iconCls : 'save',
						handler : function() {
							owner.createIdentify();
						}
					} ]
				});

			},

		   /**
			* 保存产品识别信息
			* 
			* @param
			* @return
			* @程序员：yangminfan
			* @编码日期：2012-07-17
			* @最后修改日期：
			*/
			createIdentify : function() {
				var owner = this;
				HtmlUtil.getDom(owner.ids.prodIsTemplate).value = CodeStringDefinition.PRODUCT_IS_TEMPLATE;//是模板产品
				HtmlUtil.getDom(owner.ids.productOldId).value = this.product_ID;
				var data = DataUtil.getDataFromArea(owner.ids.templateAddForOutdexContentDiv);// 获取页面输入的信息并自动验证
					var productId = HtmlUtil.getDom(owner.ids.product_ID).value;
					if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
						}
					ConnectionUtil.ajaxReq( {// 发送ajax请求
							strServId : "productService.saveAsProduct",
							jsonData : data,
							callback : function(msg) {
								MsgUtil.alert("提示", "模板另存为成功!");
								owner.parent.close();
							}
						});
					}
	});