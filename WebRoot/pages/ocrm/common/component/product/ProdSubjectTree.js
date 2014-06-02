/**
 * 产品科目选择页面 <p/> 功能描述：
 * <li>选择产品</li>
 * 
 * @author wanghua
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("business.product.ProdSubjectTree", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH
			+ "/pages/ocrm/common/component/product/ProdSubjectTree.html",
	
	initCmp : function() {
		var owner = this;
		ObjectUtil.create("component.Tree", {
			id : 'questionSubjectTree',
			strServId : 'productSubjectService.getProdSubjectChildrenNodesByParentNode',
			rootText : '产品科目',
			rootId : '000',
			width : 400,
			filter : true,
			onlyLeafSelect : true,
			renderTo : this.ids.productSubjectTreePanelDiv,
			tbar : [{
				text : '关闭',
				tooltip : '关闭窗口', // 提示信息
				iconCls : 'close',
				handler : function() {
					owner.parent.close();
				}
			}],
			nodeClick : function() {
				if(this.leaf=='true'){
					if (DataUtil.isEmpty(HtmlUtil
							.getDom(owner.hiddenDomId).value)) {
							HtmlUtil.getDom(owner.hiddenDomId).value = this.value;
						} else {
							var idVlaueArry = HtmlUtil.getDom(owner.hiddenDomId).value.split(",");
						 	for(var i=0;i<idVlaueArry.length;i++){
						 		if(idVlaueArry[i] == this.value){
						 			return false;
						 			break;
						 		}
						 	}
							HtmlUtil.getDom(owner.hiddenDomId).value = HtmlUtil
								.getDom(owner.hiddenDomId).value
								+ "," + this.value;
						}
						if (DataUtil.isEmpty(HtmlUtil
							.getDom(owner.displayDomId).value)) {
							HtmlUtil.getDom(owner.displayDomId).value = this.text;
						} else {
							HtmlUtil.getDom(owner.displayDomId).value = HtmlUtil
								.getDom(owner.displayDomId).value
								+ ","
								+ this.text;
						}
				}
				
			}
		});
	}
});