/**
 * 营销计划发送短信页面 <p/> 功能描述：
 * <li>发送短信</li>
 * 
 * @author jiangmin
 * @since 2013-09-4
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.component.shortMsg.LargeSmsOfDataSendMessage", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH
			+ "/pages/ocrm/common/component/shortMsg/LargeSmsOfDataSendMessage.html",
	/**
	 * 获得营销计划的客户列表
	 * 
	 * @param
	 * @return
	 * @程序员：jiangmin
	 * @编码日期：2013-09-04
	 * @最后修改日期：
	 */
	initData : function() {
		var owner = this;
		owner.customers=[];
		owner.modeltype='';
		owner.msgTypeKy='';
		owner.users=DataUtil.getUserInfo();
		var strServId='';
		if(owner.msgType&&owner.msgType=='markePlan'){
			owner.modeltype=CodeStringDefinition.MSG_TYPE_REMIND_MARKETING,
			strServId='marketingService.getCustomerForSendMSG';
			owner.msgTypeKy=owner.jsdata.corCampaignKy;
		}else if(owner.msgType&&owner.msgType=='themesEvents'){
			owner.modeltype=CodeStringDefinition.MSG_TYPE_REMIND_THEMED_EVENTS,
			strServId='personSalonService.getCustomerForMSG';
			owner.msgTypeKy=owner.jsdata.subjectSalonky;
		}else if(owner.msgType&&owner.msgType=='custGroup'){
			owner.modeltype=CodeStringDefinition.MSG_TYPE_REMIND_LARGE_MSGDATA,
			strServId='customerGroupService.getCustGroupCustInfoForMSG';
			owner.msgTypeKy=owner.jsdata.customergroupky;
		}else if(owner.msgType&&owner.msgType=='searchEngineCust'){
			owner.modeltype=CodeStringDefinition.MSG_TYPE_REMIND_LARGE_MSGDATA,
			strServId='customerSearchEngineService.custInfoSenMsg';
		}
		HtmlUtil.getDom(this.ids.msgName).value=owner.msgName;
		ConnectionUtil.ajaxReq({
			strServId : strServId,
			jsonData : owner.jsdata,
			callback : function(data) {
				if(data){
					person = {
						cusKey :data.cuspersonky,
						name : data.cusname,
						sex : data.sex
					};
					owner.customers.push(person);
				}
			}
		});	
		if(owner.users.authorityCode==CodeStringDefinition.USER_ROLE_CUS_MANAGER){
			var phone=owner.users.findPhone;
			if (phone) {
				phone=owner.users.mobile;
			}
			HtmlUtil.getDom(owner.ids.phones).value= phone;
		}
	},
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：jiangmin
	 * @编码日期：2013-09-04
	 * @最后修改日期：
	 */
	initCmp : function() {
		var owner = this;
		this.create('component.Panel', {
				contentEl : this.ids.createShorMsgContentDiv,
				hasBackGroundColor : true,
				width : 665,
				height:415,
				renderTo : this.ids.createShorMsgDiv,
				buttons : [{
							text : '提交',
							iconCls : 'save',
							handler : function() {
								owner.manualManageLevelApply();
							}
						},{
							text : '关闭',
							iconCls : 'cancel',
							handler : function() {
								owner.parent.close();
							}
						}]
			});
			var now = new Date();
			owner.create('component.DateField', {
					renderTo : owner.ids.sendTime,
					format : 'Y-m-d H:i',
					showTime:true,
					minValue: now
				});
			if(owner.users.authorityCode==CodeStringDefinition.USER_ROLE_ACCOUNT_MANAGER){
				HtmlUtil.getDom(this.ids.phonesTr).style.display = "none";
				HtmlUtil.replaceCls(this.ids.phones,'required', '');
			}
			HtmlUtil.getDom(this.ids.undertakerTr).style.display = '';
			HtmlUtil.getDom(this.ids.selectUndertakerImg).src = Constants.CONTEXT_PATH
					+ "/resources/images/icons/house_go.png";
			HtmlUtil.getDom(this.ids.selectUndertakerImg2).src = Constants.CONTEXT_PATH
					+ "/resources/images/icons/house_go.png";
			HtmlUtil.getDom(this.ids.selectUndertakerLink).onclick = function() {
				owner.createAuditEmployeeSelectWindow({
					title : '选择主管',
					managerNameDomId : owner.ids.undertakerName,
					managerKeyDomId : owner.ids.undertaker,
					roleType:CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE,
					auditOrg :  DataUtil.getUserInfo().orgCode
				});
				
			};

			HtmlUtil.getDom(this.ids.selectUndertakerLink2).onclick = function() {
				var phones=null;
				if(owner.users.authorityCode==CodeStringDefinition.USER_ROLE_CUS_MANAGER){
					phones=HtmlUtil.getDom(owner.ids.phones).value;
					if(DataUtil.isEmpty(phones)){
						MsgUtil.alert('系统提示','请先填写客户经理联系电话');
						return ;
					}
					owner.customers[0].managePhones=phones;
				}
				var win = owner.create('component.Window', {
					title : '选择短信模板',
					closable : true,
					draggable : true,
                    width : 800,
					height : 450,
					modal : true,
					pageObject : owner.create('crm.pages.ocrm.person.saleManage.MessageModelList',//创建新增页面对象
						{
							id : 'messageTemplate',
							customers:owner.customers,
							modeltype:owner.modeltype,
							content : owner.ids.content,										
							descCont:owner.ids.contDesc,
							templateName:owner.ids.templateName
						})
				});
				win.on('close', function() {});	
			};

			HtmlUtil.getDom(this.ids.clearUndertakerLink).onclick = function() {// 清除按钮
				HtmlUtil.getDom(owner.ids.undertakerName).value = "";// 清除已选择的
				HtmlUtil.getDom(owner.ids.undertaker).value = "";
			};
			HtmlUtil.getDom(this.ids.clearUndertakerLink2).onclick = function() {// 短信清除按钮
				HtmlUtil.getDom(owner.ids.content).value = "";// 清除短信；类容templateName
				HtmlUtil.getDom(owner.ids.templateName).value = "";
			};

	},
	/**
	 * 数据组装-然后发送
	 * @param
	 * @return
	 */
	manualManageLevelApply : function(){
		var owner = this;
		var data = DataUtil.getDataFromArea(owner.ids.createShorMsgContentDiv);
		if(Constants.VALIDATION_FAIL != data){
			if(owner.customers&&owner.customers.length>0){
				var dataObj = DataUtil.decode(data);
				var isTemplate=false;
				if(dataObj.templateName){
					isTemplate=true;
				}
				var newData ={
						applycusky :  owner.users.objectId,//申请人主键
						applycusname : owner.users.name,//申请人名称
						msgAppType:owner.msgType,//短信类型
						applayreason : dataObj.applayReason,//申请理由
						employeePhoneNo:dataObj.mobile,//客户经理的电话
						content:dataObj.content,//短信内容(替换以后的)
						descContent:dataObj.contDesc,// 模板的短信内容
						senddt:dataObj.sendTime,// 发送时间
						fromTemplate : isTemplate,//是否使用模板
						nextauditky :dataObj.undertaker,//审批人主键
						nextauditname:dataObj.undertakerName,// 审批人姓名
						msgTypeKy:owner.msgTypeKy,
						engineRstCriteria:owner.jsdata
					};
				ConnectionUtil.ajaxReq({
						strServId : "shortMsgService.createLargeMsgAudit",
						jsonData : newData,
						callback : function() {
							MsgUtil.alert("成功提示", "短信申请成功");
							owner.parent.close();
							if(owner.shortMsgInfoWin){
								owner.shortMsgInfoWin.close();
							}
						}
					});
			}else{
				MsgUtil.error("错误提示", "此活动没有找到参与的客户信息");
				owner.parent.close();
				if(owner.shortMsgInfoWin){
					owner.shortMsgInfoWin.close();
				}
				return;
			}
			
		}
	}
});