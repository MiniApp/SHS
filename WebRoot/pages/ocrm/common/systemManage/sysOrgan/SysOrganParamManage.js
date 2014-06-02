ObjectUtil
		.define("crm.pages.ocrm.common.systemManage.sysOrgan.SysOrganParamManage",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/sysOrgan/SysOrganParamManage.html",// 页面url地址
	/*
	 * 初始化页面数据
	 */
	initData : function() {
		var owner = this;
		// 初始化数据
		ConnectionUtil.ajaxReq( {
			strServId : "sysOrganManageService.getOrganParamInfo",
			callback : function(data) {
				DataUtil.populateDataForArea(data,
						owner.ids.organParamInfo);// 渲染数据到页面
			}
		});
	},
	initCmp : function() {
		var owner = this;
		this.create('component.Panel', {
			renderTo : this.ids.organParamPanel,
			contentEl : this.ids.organParamInfo,
			hasBackGroundColor : true,
			heightPercent:0.12,
			buttons : [{
						text : '保存',
						iconCls : 'save',
						handler : function() {
							owner.editOrganParamInfo();
						}
					}]
		});
	},
	/*
	 * 保存编辑信息
	 * **/
	editOrganParamInfo:function(){
		var owner = this;
		var organLevels=HtmlUtil.getDom(this.ids.organLevels).value;
		if(DataUtil.isEmpty(organLevels)){
			MsgUtil.error('页面验证出错', '机构层级数必须输入');
			return;
		}
		if(organLevels < 2 || organLevels>5){
			MsgUtil.error('页面验证出错', '机构层级数必须在2-5之间');
			return;
		}
		
		var data = DataUtil.getDataFromArea(owner.ids.organParamInfo);// 获取页面输入的信息
		
		ConnectionUtil.ajaxReq( {
			strServId : "sysOrganManageService.editOrganParamInfo",
			jsonData : data,
			callback : function(msg) {
				MsgUtil.alert('操作提示', '数据保存成功');
			}
		});
	}
});