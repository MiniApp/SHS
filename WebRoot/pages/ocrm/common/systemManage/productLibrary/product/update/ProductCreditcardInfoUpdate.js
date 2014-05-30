/**
 * 信用卡产品基本信息 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>修改产品识别信息</li>
 * 
 * @author suxiaoliang
 * @since 2013-03-08
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.product.update.ProductCreditcardInfoUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/product/update/ProductCreditcardInfoUpdate.html",// 页面url地址

	/**
	 * 初始化页面数据
	 * 
	 * @param
	 * @return
	 * @程序员：suxiaoliang
	 * @编码日期：2013-03-08
	 * @最后修改日期：
	 */	
	initData : function() {
		               // 加载并渲染数据
		               var owner = this;						
						var jsonData = {'productId' : owner.productId};
						ConnectionUtil.ajaxReq( {
							strServId : "productManageService.getCreditcardInfoById",
							jsonData : DataUtil.encode(jsonData),
							callback : function(data) {
								DataUtil.populateDataForArea(data,owner.ids.productIdentifyUpdateContentDiv);// 渲染数据到页面
							}
						});
					},
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：suxiaoliang
	 * @编码日期：2013-03-08
	 * @最后修改日期：
	 */	
	initCmp : function() {
        var owner = this;
        //截止日期
								ObjectUtil.create('component.DateField', {
									renderTo : owner.ids.END_DATE,
									format : 'Y-m-d'
								});
        // 面板
		this.create('component.Panel', {
					title : '',
					contentEl : this.ids.productIdentifyUpdateContentDiv,
					renderTo : this.ids.productIdentifyUpdatePanelDiv,
					hasBackGroundColor : true,
					height : 260,
					bbar : [{
								xtype : 'tbfill'
							}, {
								text : '保存',
								tooltip : '保存产品基本信息', // 提示信息
								handler : function() {
									owner.updateIdentify();
								},
								iconCls : 'save' // 图标CSS
							}]
				});
        
	},

	/**
	 * 修改信用卡产品基本信息
	 * 
	 * @param
	 * @return
	 * @程序员：suxiaoliang
	 * @编码日期：2013-03-08
	 * @最后修改日期：
	 */
	updateIdentify : function(){
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.productIdentifyUpdateContentDiv);// 获取页面输入的信息并自动验证
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
		 	var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
								productId : owner.productId
							});// 组装修改信息将客户主键corpersonky添加的修改信息数据中
			ConnectionUtil.ajaxReq({// 发送ajax请求
				strServId : "productManageService.updateCreditcardInfo",
				jsonData : newData,
				callback : function(msg) {
					MsgUtil.alert("提示", "信用卡产品信息修改成功!");
					owner.parent.close();// 关闭窗口
				}
			});
		}
	}

});