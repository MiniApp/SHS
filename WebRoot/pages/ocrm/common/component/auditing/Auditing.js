/**
 * 审批
 * 
 * @author DuanYong
 * @Since:2012-10-16
 * @Update 2012-10-16
 */
ObjectUtil.define("business.auditing.Auditing", "base.PageObject", {
	htmlContent : [
			'<div id="{AuditingPanelId}">',
			'<div id="{AuditingPanelContentId}">',
			'<table width="100%"  class="DisplayTable">',
			'<input type="hidden" name="taskky" id="{AuditingPanelContentId_taskky}" />',
			'<input type="hidden" name="nextstepname" id="{AuditingPanelContentId_nextstepname}" />',
			'<input type="hidden" name="currstepname" id="{AuditingPanelContentId_currstepname}" />',
			'<input type="hidden" name="assignky" id="{AuditingPanelContentId_assignky}" />',
			'<input type="hidden" name="nextauditky" id="{AuditingPanelContentId_nextauditky}" />',
			'<input type="hidden" name="currauditky" id="{AuditingPanelContentId_currauditky}" />',
			'<input type="hidden" name="currauditname" id="{AuditingPanelContentId_currauditname}" />',
			'<input type="hidden" name="taskdesc" id="{AuditingPanelContentId_taskdesc}" />',
			'<input type="hidden" name="applytype" id="{AuditingPanelContentId_applytype}" />',
			'<input type="hidden" name="taskservername" id="{AuditingPanelContentId_taskservername}" />',
			'<input type="hidden" name="stepmustfinished" id="{AuditingPanelContentId_stepmustfinished}" />',
			'<tr>',
			'<td  align="right" style="width:20%">描述:</td>',
			'<td colspan="3" class="empt"><span id={AuditingPanelContentId_taskdescstr} ></span></td>',
			'</tr>',
			'<tr>',
			'<td  align="right" style="width:20%">申请人:</td>',
			'<td style="width:30%"><input type="text" name="currapplycusname" id="{AuditingPanelContentId_currapplycusname}" readonly="true" style= "border:0px;background:url() no-repeat right top;"/></td>',
			'<td  align="right" style="width:20%">申请时间:</td>',
			'<td style="width:30%"><input type="text" name="currauditcreatedatestr" id="{AuditingPanelContentId_currauditcreatedatestr}" readonly="true" style= "border:0px;background:url() no-repeat right top;"/></td>',
			'</tr>',
			'<tr id="{AuditingPanelContentId_nextAuditTrId}" style="display:">',
			'<td  align="right" >审批人:</td>',
			'<td  colspan="3" class="empt"><input type="text" title="审批人" name="nextauditname" id="{AuditingPanelContentId_nextauditname}" readonly="readonly" /><a id="{AuditingPanelContentId_selectAuditinger}" href="#"><font size="2">请选审批人</font> </a>&nbsp; <a id="{clearLink}" href="#"><font size="2">清除</font> </a></td>',
			'</tr>',
			'<tr>',
			'<td  align="right">审批意见<span style="color:red;">*</span>:</td>',
			'<td  colspan="3" class="empt"><textarea name="currauditdesc" id="{AuditingPanelContentId_currauditdesc}" class="required maxLength-100" title="审批意见" cols="40" rows="5"></textarea></td>',
			'</tr>', '</table>', '</div>', '</div>'],
	initData : function() {
		DataUtil
				.populateDataForArea(this.data, this.ids.AuditingPanelContentId);
		HtmlUtil.getDom(this.ids.AuditingPanelContentId_taskdescstr).innerHTML = this.data.taskdesc;
		if (DataUtil.isEmpty(this.data.nextstepname)) {
			HtmlUtil.getDom(this.ids.AuditingPanelContentId_nextAuditTrId).style.display = 'none';
			HtmlUtil.replaceCls(this.ids.AuditingPanelContentId_nextauditname,
					"required", "");
		}
	},
	initCmp : function() {
		var owner = this;
		var newtbar;
		if (DataUtil.getUserInfo().systemId == CodeStringDefinition.CORPOR_SYSTM_MSGCODE) {
			if ((CodeStringDefinition.CORP_ApproveType_LEVEL == owner.data.applytype)
					&& (!DataUtil.isEmpty(owner.data.nextstepname))) {
				if (DataUtil.getUserInfo().orgLevel == CodeStringDefinition.EMPLOYEE_POSITION_HEAD) {
					HtmlUtil
							.getDom(this.ids.AuditingPanelContentId_nextAuditTrId).style.display = 'none';
					HtmlUtil.replaceCls(
							this.ids.AuditingPanelContentId_nextauditname,
							"required", "");
					newtbar = [{
								text : '查看任务详细',
								iconCls : 'view',
								tooltip : '查看任务详细',
								handler : function() {
									owner.viewDetail();
								}
							}, {
								text : '同意',
								iconCls : 'form-submit',
								tooltip : '审批通过',
								handler : function() {
									owner.agree();
								}
							}, {
								text : '拒绝',
								iconCls : 'form-delete',
								tooltip : '审批拒绝',
								handler : function() {
									owner.refuse();
								}
							}];
				} else {
					var taskInfo = DataUtil.decode(owner.data.taskInfo);
					var hiddenAgree = true;
					if (taskInfo.customerLevel == CodeStringDefinition.CORPORATE_CUSTOMER_GRADE_PROVINCE_IMPORT_CODE
							&& taskInfo.nowLevel != CodeStringDefinition.CORPORATE_CUSTOMER_GRADE_CENTER_IMPORT_CODE
							&& taskInfo.nowLevel != CodeStringDefinition.CORPORATE_CUSTOMER_GRADE_CENTER_ZHANLUE_CODE
							) {
							hiddenAgree = false;
					} 
					if (hiddenAgree) {
						newtbar = [{
									text : '查看任务详细',
									iconCls : 'view',
									tooltip : '查看任务详细',
									handler : function() {
										owner.viewDetail();
									}
								}, {
									text : '同意并上交',
									iconCls : 'form-submit',
									tooltip : '同意并上交',
									handler : function() {
										owner.submit();
									}
								}, {
									text : '拒绝',
									iconCls : 'form-delete',
									tooltip : '审批拒绝',
									handler : function() {
										owner.refuse();
									}
								}];
					} else {
						newtbar = [{
									text : '查看任务详细',
									iconCls : 'view',
									tooltip : '查看任务详细',
									handler : function() {
										owner.viewDetail();
									}
								}, {
									text : '同意',
									iconCls : 'form-submit',
									tooltip : '审批通过',
									handler : function() {
										owner.agree();
									}
								}, {
									text : '拒绝',
									iconCls : 'form-delete',
									tooltip : '审批拒绝',
									handler : function() {
										owner.refuse();
									}
								}];
					}
				}
			} else if ((!DataUtil.isEmpty(owner.data.applytype)
					&& CodeStringDefinition.CORP_ApproveType_LEVEL != owner.data.applytype
					&& CodeStringDefinition.CORP_ApproveType_TRANSFER != owner.data.applytype
					&& CodeStringDefinition.CORP_ApproveType_UP != owner.data.applytype
					&& CodeStringDefinition.CORP_ApproveType_ASSIGN != owner.data.applytype
					&& CodeStringDefinition.CORP_ApproveType_COMBIN != owner.data.applytype && CodeStringDefinition.CORP_ApproveType_RESERV != owner.data.applytype)
					&& (!DataUtil.isEmpty(owner.data.nextstepname))) {

				if (DataUtil.getUserInfo().orgLevel == CodeStringDefinition.EMPLOYEE_POSITION_HEAD) {
					HtmlUtil
							.getDom(this.ids.AuditingPanelContentId_nextAuditTrId).style.display = 'none';
					HtmlUtil.replaceCls(
							this.ids.AuditingPanelContentId_nextauditname,
							"required", "");
					newtbar = [{
								text : '查看任务详细',
								iconCls : 'view',
								tooltip : '查看任务详细',
								handler : function() {
									owner.viewDetail();
								}
							}, {
								text : '同意',
								iconCls : 'form-submit',
								tooltip : '审批通过',
								handler : function() {
									owner.agree();
								}
							}, {
								text : '拒绝',
								iconCls : 'form-delete',
								tooltip : '审批拒绝',
								handler : function() {
									owner.refuse();
								}
							}];
				} else {
					newtbar = [{
								text : '查看任务详细',
								iconCls : 'view',
								tooltip : '查看任务详细',
								handler : function() {
									owner.viewDetail();
								}
							}, {
								text : '同意',
								iconCls : 'form-submit',
								tooltip : '审批通过',
								handler : function() {
									owner.agree();
								}
							}, {
								text : '同意并上交',
								iconCls : 'form-submit',
								tooltip : '同意并上交',
								handler : function() {
									owner.submit();
								}
							}, {
								text : '拒绝',
								iconCls : 'form-delete',
								tooltip : '审批拒绝',
								handler : function() {
									owner.refuse();
								}
							}];
				}
			} else if (CodeStringDefinition.CORP_ApproveType_COMBIN == owner.data.applytype
					&& (!DataUtil.isEmpty(owner.data.nextstepname))) {
				if (DataUtil.getUserInfo().orgLevel == CodeStringDefinition.EMPLOYEE_POSITION_HEAD) {
					HtmlUtil
							.getDom(this.ids.AuditingPanelContentId_nextAuditTrId).style.display = 'none';
					HtmlUtil.replaceCls(
							this.ids.AuditingPanelContentId_nextauditname,
							"required", "");
					newtbar = [{
								text : '查看任务详细',
								iconCls : 'view',
								tooltip : '查看任务详细',
								handler : function() {
									owner.viewDetail();
								}
							}, {
								text : '同意',
								iconCls : 'form-submit',
								tooltip : '审批通过',
								handler : function() {
									owner.agree();
								}
							}, {
								text : '拒绝',
								iconCls : 'form-delete',
								tooltip : '审批拒绝',
								handler : function() {
									owner.refuse();
								}
							}];
				} else {
					newtbar = [{
								text : '查看任务详细',
								iconCls : 'view',
								tooltip : '查看任务详细',
								handler : function() {
									owner.viewDetail();
								}
							}, {
								text : '同意并上交',
								iconCls : 'form-submit',
								tooltip : '同意并上交',
								handler : function() {
									owner.submit();
								}
							}, {
								text : '拒绝',
								iconCls : 'form-delete',
								tooltip : '审批拒绝',
								handler : function() {
									owner.refuse();
								}
							}];
				}
			} else {
				newtbar = [{
							text : '查看任务详细',
							iconCls : 'view',
							tooltip : '查看任务详细',
							handler : function() {
								owner.viewDetail();
							}
						}, {
							text : '同意',
							iconCls : 'form-submit',
							tooltip : '审批通过',
							handler : function() {
								owner.agree();
							}
						}, {
							text : '拒绝',
							iconCls : 'form-delete',
							tooltip : '审批拒绝',
							handler : function() {
								owner.refuse();
							}
						}];
			}
		} else {
			// 客户等级审批
			if ((CodeStringDefinition.VIP2_VipApproveType_LEVEL == owner.data.applytype || CodeStringDefinition.VIP2_VipApproveType_VIPCARD == owner.data.applytype)
					&& (!DataUtil.isEmpty(owner.data.nextstepname))) {
				// 黄金级客户调整支行主管直接审批
				var customerLevel = DataUtil.decode(owner.data.taskInfo).customerLevel;
				var nowLevel = DataUtil.decode(owner.data.taskInfo).nowLevel;
				if (DataUtil.getUserInfo().orgLevel == CodeStringDefinition.EMPLOYEE_POSITION_CITY
						&& customerLevel == CodeStringDefinition.CUSTOMERLEVEL_WGD_MSGCODE && nowLevel ==CodeStringDefinition.CUSTOMERLEVEL_PLATINUM_MSGCODE ) {
					HtmlUtil
							.getDom(this.ids.AuditingPanelContentId_nextAuditTrId).style.display = 'none';
					HtmlUtil.replaceCls(
							this.ids.AuditingPanelContentId_nextauditname,
							"required", "");
					newtbar = [{
								text : '查看任务详细',
								iconCls : 'view',
								tooltip : '查看任务详细',
								handler : function() {
									owner.viewDetail();
								}
							}, {
								text : '同意',
								iconCls : 'form-submit',
								tooltip : '审批通过',
								handler : function() {
									owner.agree();
								}
							}, {
								text : '拒绝',
								iconCls : 'form-delete',
								tooltip : '审批拒绝',
								handler : function() {
									owner.refuse();
								}
							}];
				} else {
					newtbar = [{
								text : '查看任务详细',
								iconCls : 'view',
								tooltip : '查看任务详细',
								handler : function() {
									owner.viewDetail();
								}
							}, {
								text : '同意并上交',
								iconCls : 'form-submit',
								tooltip : '同意并上交',
								handler : function() {
									owner.submit();
								}
							}, {
								text : '拒绝',
								iconCls : 'form-delete',
								tooltip : '审批拒绝',
								handler : function() {
									owner.refuse();
								}
							}];
				}
			} else {
				newtbar = [{
							text : '查看任务详细',
							iconCls : 'view',
							tooltip : '查看任务详细',
							handler : function() {
								owner.viewDetail();
							}
						}, {
							text : '同意',
							iconCls : 'form-submit',
							tooltip : '审批通过',
							handler : function() {
								owner.agree();
							}
						}, {
							text : '拒绝',
							iconCls : 'form-delete',
							tooltip : '审批拒绝',
							handler : function() {
								owner.refuse();
							}
						}];

			}
		}
		HtmlUtil.getDom(this.ids.AuditingPanelContentId_selectAuditinger).onclick = function() {
			var isUnion = false;
			var auditRoleId = owner.data.nextauditroleId;
			if (CodeStringDefinition.VIP2_VipApproveType_LEVEL == owner.data.applytype ||
					CodeStringDefinition.CORP_ApproveType_LEVEL	== 	owner.data.applytype
			) {
//				auditRoleId = CodeStringDefinition.ROLE_TYPE_PERSON_BEST_CUST_MANAGER_CODE; // 对私高级主管
				owner.createAuditEmployeeSelectWindow({
					title : '选择主管',
					managerNameDomId : owner.ids.AuditingPanelContentId_nextauditname,
					managerKeyDomId : owner.ids.AuditingPanelContentId_nextauditky,
					isUnion : isUnion,
					roleType : CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE,
					auditRoleId : auditRoleId,
					isParent : true
				});
			} else {
				owner.createAuditEmployeeSelectWindow({
					title : '选择主管',
					managerNameDomId : owner.ids.AuditingPanelContentId_nextauditname,
					managerKeyDomId : owner.ids.AuditingPanelContentId_nextauditky,
					isUnion : isUnion,
					roleType : CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE,
					auditRoleId : auditRoleId,
					auditOrg : owner.data.nextauditorg
				});
			}
		};
		HtmlUtil.getDom(this.ids.clearLink).onclick = function() {// 清除按钮
			HtmlUtil.getDom(owner.ids.AuditingPanelContentId_nextauditname).value = "";// 清除已选择的
			HtmlUtil.getDom(owner.ids.AuditingPanelContentId_nextauditky).value = "";
		}
		this.create('component.Panel', {
					contentEl : this.ids.AuditingPanelContentId,
					hasBackGroundColor : true,
					widthPercent : 0.98,
					heightPercent : 0.97,
					renderTo : this.ids.AuditingPanelId,
					buttons : newtbar
				});
	},
	submit : function() {
		var owner = this;
		// 如果有下一步，且必须执行到最后一步，且没有选择
		if (DataUtil.isEmpty(HtmlUtil
				.getDom(this.ids.AuditingPanelContentId_nextauditname).value)
				&& !DataUtil.isEmpty(this.data.nextstepname)) {
			MsgUtil.alert("错误提示", "请选择一个审批人!");
		} else if (HtmlUtil.getDom(this.ids.AuditingPanelContentId_nextauditky).value == DataUtil
				.getUserInfo().objectId) {
			MsgUtil.alert("错误提示", "审批人不能选择自己!");
		} else {
			if (owner.validation()) {
				MsgUtil.confirm("确认消息框", "是否确定上交 ?", function(btn, txt) {
					if (btn == "yes") {
						ConnectionUtil.ajaxReq({// 发送ajax请求
							strServId : "auditingTaskControl.agree",
							jsonData : DataUtil
									.getDataFromArea(owner.ids.AuditingPanelContentId),
							callback : function(msg) {
								MsgUtil.alert("提示", "处理[上交]成功!");
								owner.parent.close();// 关闭窗口
							}
						});
					}
				});
			}
		}
	},

	/**
	 * 审批通过
	 */
	agree : function() {
		var owner = this;
		// 如果有下一步，且必须执行到最后一步，且没有选择
		if (DataUtil.isEmpty(HtmlUtil
				.getDom(this.ids.AuditingPanelContentId_nextauditname).value)
				&& !DataUtil.isEmpty(this.data.nextstepname)
				&& CodeStringDefinition.TRUE_AND_FALSE_YES == this.data.stepmustfinished) {
			MsgUtil.alert("错误提示", "请选择一个审批人!");
		} else if (HtmlUtil.getDom(this.ids.AuditingPanelContentId_nextauditky).value == DataUtil
				.getUserInfo().objectId) {
			MsgUtil.alert("错误提示", "审批人不能选择自己!");
		} else {
			if (owner.validation()) {
				MsgUtil.confirm("确认消息框", "是否确定审批通过 ?", function(btn, txt) {
					if (btn == "yes") {
						ConnectionUtil.ajaxReq({// 发送ajax请求
							strServId : "auditingTaskControl.agree",
							jsonData : DataUtil
									.getDataFromArea(owner.ids.AuditingPanelContentId),
							callback : function(msg) {
								MsgUtil.alert("提示", "处理[通过]成功!");
								owner.parent.close();// 关闭窗口
							}
						});
					}
				});
			}
		}
	},
	/**
	 * 审批拒绝
	 */
	refuse : function() {
		var owner = this;
		if (owner.validation()) {
			MsgUtil.confirm("确认消息框", "是否确定审批拒绝 ?", function(btn, txt) {
				if (btn == "yes") {
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "auditingTaskControl.refuse",
						jsonData : DataUtil
								.getDataFromArea(owner.ids.AuditingPanelContentId),
						callback : function(msg) {
							MsgUtil.alert("提示", "处理[拒绝]成功!");
							owner.parent.close();// 关闭窗口
						}
					});
				}
			});
		}
	},
	validation : function() {
		if (Constants.VALIDATION_FAIL == DataUtil
				.getDataFromArea(this.ids.AuditingPanelContentId)) {
			return false;
		}
		return true;
	},
	/**
	 * 查看任务详细
	 */
	viewDetail : function() {
		this.create('component.Window', {
			title : '查看任务详细',
			closable : true,
			draggable : true,
			resizable : true,
			width : 600,
			height : 500,
			modal : true,
			pageObject : this.create('business.auditing.ViewTaskDetail', {
						id : 'ViewTaskDetail',
						taskky : HtmlUtil
								.getDom(this.ids.AuditingPanelContentId_taskky).value
					})
		});
	}
});