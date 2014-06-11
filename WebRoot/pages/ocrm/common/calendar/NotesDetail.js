ObjectUtil.define("crm.pages.ocrm.common.calendar.NotesDetail",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/calendar/NotesDetail.html",
			initData : function() {
				var owner = this;
					ConnectionUtil.ajaxReq({
								strServId : calendarUtil.LOAD_FORM_DATA_STRSERVID,
								jsonData : this.scratchpadId,
								callback : function(obj) {
									DataUtil.populateDataForArea(
											obj.scratchpad,
											owner.ids.calendarDivContentDiv);// 渲染数据到页面
								}
							});
			},
			initCmp : function() {
				var owner = this;
				this.create('component.Panel', {
					renderTo : this.ids.calendarDiv,
					contentEl : this.ids.calendarDivContentDiv,
					width : 520,
					height : 200,
					buttons : [{
						text : '关闭',
						iconCls : 'form-cancel',
						handler : function() {
							owner.parent.close();
//							MsgUtil.confirm("提示", "是否确定关闭该提醒？", function(btn) {
//								if (btn == 'yes') {
//									ConnectionUtil.ajaxReq({
//										strServId : calendarUtil.DELETE_FORM_DATA_STRSERVID,
//										jsonData : owner.scratchpadId,
//										callback : function(obj) {
//											MsgUtil.alert("提示", "关闭成功！");
//											owner.parent.refresh();
//											owner.parent.close();
//										}
//									});
//								}
//							});

						}
					}]
				});
			}
		});