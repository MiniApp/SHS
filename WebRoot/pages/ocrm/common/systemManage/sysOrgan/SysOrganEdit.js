ObjectUtil
		.define("crm.pages.ocrm.common.systemManage.sysOrgan.SysOrganEdit",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/sysOrgan/SysOrganEdit.html",// 页面url地址
	/*
	 * 初始化页面数据
	 */
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
		this.create('component.Panel', {
			renderTo : this.ids.organAddPanel,
			contentEl : this.ids.rganAddInfo,
			hasBackGroundColor : true,
			heightPercent:0.12,
			buttons : [{
						text : '保存',
						iconCls : 'save',
						handler : function() {
							owner.editOrganInfo();
						}
					}]
		});
		//创建机构树
		if(!owner.organKey){
			owner.OrgSelect=this.createOrgSelectTree({
				renderTo : this.ids.organParentName,
				codeDomId : this.ids.organParentNode,
				width : 160,
				onlyLeafSelect : false,
				belongPageObject : this
			});
		}else{
			HtmlUtil.getDom(owner.ids.organParentName).disabled="disabled";
			HtmlUtil.getDom(this.ids.organParentName).display="block";
			HtmlUtil.getDom(this.ids.organParentNode).display="block";
		}
	},
	/*
	 * 保存编辑信息
	 * **/
	editOrganInfo:function(){
		var owner = this;
		var organName=HtmlUtil.getDom(this.ids.organName).value;
		if(DataUtil.isEmpty(organName)){
			MsgUtil.error('页面验证出错', '机构名称必须输入');
			return;
		}
		if(organName.length>80){
			MsgUtil.error('页面验证出错', '长度不能超过80位, 中文以及中文字符长度占2位');
			return;
		}
		var organCode=HtmlUtil.getDom(this.ids.organCode).value;
		var reg = /^[A-Za-z0-9]*$/;
		if (DataUtil.isEmpty(organCode)) {
			MsgUtil.error('页面验证出错', '机构编码不合法,只能是数字或者数字和字母组成');
			return;
		}
		if (!reg.test(organCode)) {
			MsgUtil.error('页面验证出错', '机构编码不合法,只能是数字或者数字和字母组成');
			return;
		}
		if(organCode.length>12){
			MsgUtil.error('页面验证出错', '机构编码长度不能超过12位');
			return;
		}
		
		var findPostCode = HtmlUtil.getDom(this.ids.findPostCode).value;
		var postReg = /[1-9]\d{5}(?!\d)/;
		if (findPostCode != "" && !postReg.test(findPostCode)) {
			MsgUtil.error('页面验证出错', '邮政编码不合法,请输入正确的邮政编码');
			return;
		}
		
		var organParentNode=HtmlUtil.getDom(this.ids.organParentNode).value;
		if (DataUtil.isEmpty(organParentNode)) {
			MsgUtil.error('页面验证出错', '请选择上级机构');
			return;
		}
		
		var findphone = HtmlUtil.getDom(this.ids.findphone).value;
		var phoneReg = /^([0-9]|[-])*$/;
		if (findphone != "" && !phoneReg.test(findphone)) {
			MsgUtil.error('页面验证出错', '办公电话不合法,只能是数字或者数字和-组成');
			return;
		}
		var faxno = HtmlUtil.getDom(this.ids.faxno).value;
		var faxnoReg = /^([0-9]|[-])*$/;
		if (faxno != "" && !faxnoReg.test(faxno)) {
			MsgUtil.error('页面验证出错', '传真号不合法,只能是数字或者数字和-组成');
			return;
		}
		var data = DataUtil.getDataFromArea(owner.ids.organAddInfo);// 获取页面输入的信息并自动验证
		if(owner.OrgSelect){
			var mark=owner.OrgSelect.getMark();
			if(DataUtil.isEmpty(mark)){
				mark=CodeStringDefinition.EMPLOYEE_POSITION_HEAD;
			}
			data=ObjectUtil.apply(DataUtil.decode(data),{organLevel:mark});
		}
		if(owner.organKey){
			data=ObjectUtil.apply(DataUtil.decode(data),{cororgky:owner.organKey});
		}
		if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			ConnectionUtil.ajaxReq( {
				strServId : "sysOrganManageService.editOrganInfo",
				jsonData : data,
				callback : function(msg) {
//					alert(Ext.encode(msg))
					if(msg.result){
						MsgUtil.alert('操作提示', '数据保存成功');
					}else{
						MsgUtil.error('操作提示', '数据保存失败:'+msg.error);
					}
					owner.parent.close();// 关闭窗口
				}
			});
		}
	}
});