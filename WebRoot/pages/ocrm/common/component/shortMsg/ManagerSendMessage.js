/**
 * 短信发送页面页面 <p/> 功能描述：
 * <li>短信发送</li>
 * 
 * @author 蒋敏
 * @since 2013-09-02
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.component.shortMsg.ManagerSendMessage",
				"base.PageObject",{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/component/shortMsg/ManagerSendMessage.html",

		initData : function() {
			var owner = this;
			var cusCount = null;
			owner.user=DataUtil.getUserInfo();
			HtmlUtil.getDom(this.ids.selectUndertakerImg).src = Constants.CONTEXT_PATH
			+ "/resources/images/icons/house_go.png";
			HtmlUtil.getDom(this.ids.selectUndertakerImg2).src = Constants.CONTEXT_PATH
			+ "/resources/images/icons/house_go.png";
			if(owner.customers.length==1){
				HtmlUtil.getDom(this.ids.name).value = this.customers[0].name;
				HtmlUtil.getDom(this.ids.mainphone).value = this.customers[0].mainphone;
				var phone=DataUtil.getUserInfo().findPhone;
				if (phone != "") {
					phone=DataUtil.getUserInfo().mobile;
				}
				HtmlUtil.replaceCls(this.ids.undertaker,"required", "");
				HtmlUtil.getDom(this.ids.mobile).value = phone;
			}
			if (owner.customers.length > 1) {
				HtmlUtil.getDom(this.ids.nameTr).style.display = "none";
				HtmlUtil.getDom(this.ids.mainphoneTr).style.display = "none";
				HtmlUtil.getDom(this.ids.undertakerTr).style.display = "";
			}
			
			if(owner.user.authorityCode==CodeStringDefinition.USER_ROLE_ACCOUNT_MANAGER){
				var object=HtmlUtil.getDom(this.ids.phonesTr);
				HtmlUtil.replaceCls(this.ids.mobile,"required", "");
				object.style.display = "none";
			}
			
		},
		/**
		 * 初始化页面组件
		 * 
		 * @param
		 * @return
		 * @程序员：蒋敏
		 * @编码日期：2013-09-23
		 * @最后修改日期：
		 */
		initCmp : function() {
			var owner = this;
			owner.isFromTemplate = false;
			this.create('component.Panel', {
				renderTo : this.ids.createShorMsgDiv,
				contentEl : this.ids.createShorMsgContentDiv,
				hasBackGroundColor : true,
				heightPercent:0.98,
				widthPercent:0.98,
				buttons : [{
							text : '立即发送',
							iconCls : 'save',
							handler : function() {
								owner.manualManageLevelApply(owner.isFromTemplate, true);
							}
						},{
							text : '预约发送',
							iconCls : 'save',
							handler : function() {
								owner.manualManageLevelApply(owner.isFromTemplate, false);
							}
						},{
							text : '关闭',
							iconCls : 'cancel',
							handler : function() {
								owner.parent.close();
							}
						}]
			});
			var minValue = new Date();
			owner.create('component.DateField', {
				renderTo : owner.ids.sendTime,
				format : 'Y-m-d H:i:s',
				minValue : minValue,
				showTime : true
			});
			HtmlUtil.getDom(this.ids.selectUndertakerLink).onclick = function() {
				owner.createAuditEmployeeSelectWindow({
					title : '选择主管',
					managerNameDomId : owner.ids.undertakerName,
					managerKeyDomId : owner.ids.undertaker,
					roleType:CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE,
					auditOrg :  DataUtil.getUserInfo().orgCode
				});
				
			};
			HtmlUtil.getDom(this.ids.selectmsgmodle).onclick = function() {
				var phone='';
				if(owner.user.authorityCode!=CodeStringDefinition.USER_ROLE_ACCOUNT_MANAGER){
					phone=HtmlUtil.getDom(owner.ids.mobile).value;
					if(DataUtil.isEmpty(phone)){
						MsgUtil.alert('系统提示','请先填写客户经理联系方式');
						return ;
					}
					owner.customers[0].managePhones=phone;
				}
				var win = owner.create('component.Window',{
					title : '选择短信模板',
					closable : true,
					draggable : true,
					resizable : true,
					autoScroll : true,
		            width : 800,
					height : 350,
					modal : true,
					pageObject : owner.create('crm.pages.ocrm.person.saleManage.MessageModelList',//crm.pages.ocrm.person.customer.myCustomer.MsgModelList
						{
							id : 'MsgModelList',
							modeltype:owner.modeltype,
							customers:owner.customers,
							content : owner.ids.content,										
							descCont:owner.ids.descCont,
							templateName:owner.ids.templateName
						})
				});
				owner.isFromTemplate = true,
				HtmlUtil.getDom(owner.ids.content).disabled = true,
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
		 * 
		 * @param
		 * @return
		 */
		manualManageLevelApply : function(isFromTemplate, isSendNow) {
			var owner = this;
			var data = DataUtil.getDataFromArea(owner.ids.createShorMsgContentDiv);
			if (Constants.VALIDATION_FAIL != data) {
				var inputDataObj = DataUtil.decode(data);
				var cuskyList = [];
				for ( var i = 0; i < owner.customers.length; i++) {	
					cuskyList.push(owner.customers[i].cusKey);
				}
				var awokeList=[];
				if(owner.awokeType){
					for ( var i = 0; i < owner.psnAwokes.length; i++) {	
						var keys={key:owner.psnAwokes[i].awokekey};
						awokeList.push(keys);
					}
				}							
				if (!isSendNow) {
					if (DataUtil.isEmpty(inputDataObj.sendTime)) {
						MsgUtil.error("错误提示", "预约发送必须选择预约发送时间！");
						return;
					}
				}
				if (owner.customers.length==1) {
					var newData = {
						fromTemplate : isFromTemplate,
						sendMessageBaseInfoBean : {
							cusky:owner.customers[0].cusKey,
							cusPhoneNo :inputDataObj.mainphone,
							employeePhoneNo :inputDataObj.mobile,
							employeeky : owner.user.objectId,
							content : inputDataObj.content,// 短信内容
							cuskylist : cuskyList,// 客户主键
							senddt : inputDataObj.sendTime
							// 发送时间
						},
						applayreason:inputDataObj.applayReason//申请理由
					};
					ConnectionUtil.ajaxReq({
						strServId : "shortMsgService.sendNoAuditMsg",
						jsonData : newData,
						callback : function(msg) {
							if(msg.flag=='true'){
								MsgUtil.alert("提示", "发送成功！");
								if(owner.awokeType){
									ConnectionUtil.ajaxReq( {
										strServId : "customerAwokeInfoService.deleteCustomerAwokeAfterContactPlan",
										jsonData : {
											awokeList : awokeList,
											awoketype : owner.awokeType
										},
										callback: function(){
											owner.parent.close();// 关闭窗口
											/*if (owner.navSendMsg) {
												owner.parentObj.close();// 关闭窗口
											};*/
										}
									});
								}else{
									owner.parent.close();// 关闭窗口
								}										
							}else{
								MsgUtil.alert("提示", msg.error);
							}
						}
					});
				}else {
					var targetInfo = {};
					var cuskyList = [];
					var sendMsgTaskList=[];
					for(var i=0;i<this.customers.length;i++){
						var countData=inputDataObj.descCont;//短信模板的原始内容
						countData=BusinessUtil.tiHuanMsgContent(owner.customers[i],countData);
						 targetInfo = DataUtil.encode({
							'发送内容': countData , 
							'预约发送时间': inputDataObj.sendTime
						});
						var info={name:owner.customers[i].name,businessky :owner.customers[i].cusKey,info : escape(targetInfo),applytype: CodeStringDefinition.VIP2_VipApproveType_MSG};
						cuskyList.push(owner.customers[i].cusKey);
						sendMsgTaskList.push(info);
					}
					var newData ={
							applycusky : owner.user.objectId,
							applycusname : owner.user.name,
							applayreason : inputDataObj.applayReason,
							fromTemplate : isFromTemplate,
							sendMessageBaseInfoBean : { 
								desc :inputDataObj.content,// 短信内容（已替换以后的内容(多个时候只有一个被替换)
								cusPhoneNo : owner.cusPhoneNo,
								employeePhoneNo:inputDataObj.mobile,
								employeeky : owner.user.objectId, 
								content  : inputDataObj.content,// 短信内容（已替换以后的内容(多个时候只有一个被替换)
								cuskylist:cuskyList,// 客户主键
								senddt:owner.sendTime// 发送时间
							},
							sendMessageTaskTargetInfoList  : sendMsgTaskList,// 审批类型
							nextauditky :inputDataObj.undertaker,// 接收者主键
							nextauditname:inputDataObj.undertakerName// 接收者姓名
						};
					ConnectionUtil.ajaxReq({
							strServId : "shortMsgService.createShortMsgAudit",
							jsonData : newData,
							callback : function() {
								if(owner.awokeType){
									MsgUtil.alert("成功提示", "短信申请成功");
									ConnectionUtil.ajaxReq( {
										strServId : "customerAwokeInfoService.deleteCustomerAwokeAfterContactPlan",
										jsonData : {
											awokeList : awokeList,
											awoketype : owner.awokeType
										},
										callback: function(){
											owner.parent.close();// 关闭窗口
											/*if (owner.navSendMsg) {
												owner.parentObj.close();// 关闭窗口
											};*/
										}
									});
								}else{
									MsgUtil.alert("提示", msg.error);
									owner.parent.close();// 关闭窗口
								}
							}
						});
					}
				}
			}
	});