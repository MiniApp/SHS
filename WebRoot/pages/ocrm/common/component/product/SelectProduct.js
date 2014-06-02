/**
 * 产品选择页面 <p/> 功能描述：
 * <li>选择产品</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("business.product.SelectProduct", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH
			+ "/pages/ocrm/common/component/product/SelectProduct.html",
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：wanghua
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	initCmp : function() {
		var owner = this;
		this.createProductTypeTree({
					renderTo : this.ids.productTypeTree,
					title : "产品分类树",
					widthPercent : 0.3,
					heightPercent : 0.99,
					nodeClick : function(data) {
						owner.queryProductList(data.value[0]);
					}
				});
	},
	/**
	 * 查询产品列表，提供选择功能
	 * 
	 * @param productTypeCode
	 *            产品类别编码
	 * @return
	 * @程序员：wanghua
	 * @编码日期：2012-07-18
	 * @最后修改日期：
	 */
	queryProductList : function(productTypeCode) {
		var owner = this;
		var checkbox = false;
		if (this.checkbox) {
			checkbox = this.checkbox;
		}
		var strServId = null;
		if (DataUtil.isEmpty(this.strServId)) {
			strServId = 'productTreeService.getDetailProduct'
		} else {
			strServId = this.strServId;
		}
		HtmlUtil.overwrite(this.ids.productList, "", false);
		var grid = this.create('component.DataGrid', {
			widthPercent : 0.68,
			heightPercent : 0.99,
			renderTo : this.ids.productList,
			strServId : strServId,
			jsonData : {
				prodTypeCode : productTypeCode
			},
			mapping : ['productId', 'productName', 'productPrice'],
			collapsible : false,
			checkbox : checkbox,
			multiSelect : checkbox,
			title : '查询结果',
			columns : [{
						header : "产品名称",
						sortable : true,
						dataIndex : 'productName',
						width : 200
					}, {
						header : "产品价格",
						sortable : true,
						dataIndex : 'productPrice',
						width : 100
					}, {
						header : "产品主键",
						sortable : true,
						dataIndex : 'productId',
						width : 130
					}],
			tbar : [{
				text : '确定',
				tooltip : '确定',
				iconCls : 'add',
				handler : function() {
					if (grid.getSelectRecords().length == 0) {
						MsgUtil.error('操作出错', '请先选择记录');
						return;
					}
					// HtmlUtil.getDom(owner.displayDomId).value = "";
					// HtmlUtil.getDom(owner.hiddenDomId).value = "";
					if (checkbox) {
						try {
							DataUtil.each(grid.getSelectRecords(), function(
									record) {
								if (DataUtil.isEmpty(HtmlUtil
										.getDom(owner.hiddenDomId).value)) {
									HtmlUtil.getDom(owner.hiddenDomId).value = record
											.get('productId');
								} else {
									var values = HtmlUtil
											.getDom(owner.hiddenDomId).value
											.split(',');
									DataUtil.each(values, function(value) {
										if (value == record.get('productId')) {
											ExceptionUtil
													.throwBusinessException({
														title : '选择错误',
														msg : '已经选择了:'
																+ record
																		.get('productName')
													});
										}
									});
									HtmlUtil.getDom(owner.hiddenDomId).value = HtmlUtil
											.getDom(owner.hiddenDomId).value
											+ "," + record.get('productId');
								}
								if (DataUtil.isEmpty(HtmlUtil
										.getDom(owner.displayDomId).value)) {
									HtmlUtil.getDom(owner.displayDomId).value = record
											.get('productName');
								} else {
									HtmlUtil.getDom(owner.displayDomId).value = HtmlUtil
											.getDom(owner.displayDomId).value
											+ "," + record.get('productName');
								}
							});

						} catch (exception) {
							return;
						}
					} else {
						HtmlUtil.getDom(owner.displayDomId).value = grid
								.getSelectRecords()[0].get('productName');
						HtmlUtil.getDom(owner.hiddenDomId).value = grid
								.getSelectRecords()[0].get('productId');
					}
					owner.parent.close();
				}
			}]
		});
	}
});