ObjectUtil
		.define("crm.pages.ocrm.common.systemManage.sysOrgan.SysOrganModifyLevel",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/sysOrgan/SysOrganModifyLevel.html",// 页面url地址


							
	initData : function() {
		var owner = this;
		if(owner.organKey){
			HtmlUtil.getDom(owner.ids.organCode).disabled="disabled";
			ConnectionUtil.ajaxReq( {
				strServId : "sysOrganManageService.getOrganInfo",
				jsonData : {cororgky:owner.organKey},
				callback : function(data) {
					DataUtil.populateDataForArea(data,
							owner.ids.organAddInfo);// 渲染数据到页面
				}
			});
			
		}
	},
	initCmp : function() {
		var owner = this;
		owner.OrgSelect=this.createOrgSelectTree({
			renderTo : this.ids.organParentName,
			codeDomId : this.ids.organParentNode,
			width : 160,
			onlyLeafSelect : false,
			belongPageObject : this
		});
		this.create('component.Panel', {
			renderTo : this.ids.organModifyLevelPanel,
			contentEl : this.ids.organModifyLevelInfo,
			hasBackGroundColor : true,
			heightPercent:0.12,
			buttons : [{
						text : '保存',
						iconCls : 'save',
						handler : function() {
							owner.adjustOrganLevel();
						}
					}]
		});
	},
	adjustOrganLevel:function(){
		owner.parent.close();// 关闭窗口
	}
});