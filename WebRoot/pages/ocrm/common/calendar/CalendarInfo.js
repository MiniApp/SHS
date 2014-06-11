ObjectUtil.define("crm.pages.ocrm.common.calendar.CalendarInfo",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/calendar/CalendarInfo.html",
			initCmp : function() {
				var owner = this;
				var buttons = [{
					text : '确定',
					iconCls : 'form-confirm',
					handler : function() {
						owner.updateCalendarInfo();
					}
				},{
					text : '取消',
					iconCls : 'form-cancel',
					handler : function() {
						owner.parent.close();
					}
				}];
	
				if (this.scratchpadId!=null) {// 是修改
					buttons.push( {
						text : '删除',
						iconCls : 'form-delete',
						handler : function() {
							owner.deleteCaleandar();
						}
					});
				}
				this.create('component.Panel', {
					renderTo : this.ids.calendarDiv,
					contentEl :this.ids.calendarDivContentDiv,
					width:640,
					height : 350,
					buttons : buttons
				});
				
				if (this.scratchpadId) {// 是修改					
					ConnectionUtil.ajaxReq({
						strServId : calendarUtil.LOAD_FORM_DATA_STRSERVID,
						jsonData : this.scratchpadId,
						callback : function(obj) {
							if (!DataUtil.isEmpty(obj)
									&& !DataUtil.isEmpty(obj.scratchpad)) {
								owner.create('component.DateField', {
											renderTo : owner.ids.strBeginDate,
											format : 'Y-m-d H:i',
											value : obj.scratchpad.strBeginDate,
											showTime : true
										});
								owner.create('component.DateField', {
											renderTo : owner.ids.strEndDate,
											format : 'Y-m-d H:i',
											showTime : true,
											value : obj.scratchpad.strEndDate
										});
								/**
								 * 返回值不为空，则为表单赋值
								 */
								DataUtil.populateDataForArea(obj.scratchpad,
										owner.ids.calendarDivContentDiv);// 渲染数据到页面
								
								if (!DataUtil.isEmpty(obj.scratchpad.arrAwoke)) {
									var data = obj.scratchpad.arrAwoke;
									/**
									 * 返回值不为空
									 */
									DataUtil.populateDataForArea(data[0],owner.ids.aworkInfoContentDiv);// 渲染数据到页面
								}
							}
						}
					});
				} else {// 是新增
                    
                    HtmlUtil.getDom(owner.ids.strScratchpadType).value='1';
					owner.create('component.DateField', {
								renderTo : owner.ids.strBeginDate,
								format : 'Y-m-d H:i',
								showTime : true,
								value : DataUtil.isEmpty(owner.term)
										? calendarUtil.fnDataToString()
										: calendarUtil
												.fnDataToString(owner.term[0])
							});
					owner.create('component.DateField', {
								format : 'Y-m-d H:i',
								renderTo : owner.ids.strEndDate,
								showTime : true,
								value : DataUtil.isEmpty(owner.term)
										? calendarUtil.fnDataToString()
										: calendarUtil
												.fnDataToString(owner.term[1])
							});
				}
			},
			updateCalendarInfo : function() {
				var owner = this;
				var scType=HtmlUtil.getDom(owner.ids.strScratchpadType).value;
				if((!DataUtil.isEmpty(scType))&&scType=='1'){
					HtmlUtil.replaceCls(owner.ids.strAwokeTitle,"required", "");
					HtmlUtil.replaceCls(owner.ids.strAheadType,"required", "");
				}
				var data = DataUtil
						.getDataFromArea(owner.ids.calendarDivContentDiv);
				if (data != Constants.VALIDATION_FAIL) {
					var newData = DataUtil.decode(data);
					if (new Date(newData.strBeginDate.replace(/-/g, '/')) > new Date(newData.strEndDate
							.replace(/-/g, '/'))) {
						/**
						 * 开始日期不得大于结束日期
						 */
						MsgUtil.error("验证错误", '开始日期不得大于结束日期');
						return false;
					}
					if ('2' == scType) {
						var record = DataUtil.getDataFromArea(owner.ids.aworkInfoContentDiv);
						if (record != Constants.VALIDATION_FAIL) {
							if (DataUtil.isEmpty(record)) {
									newData.strScratchpadType = '1';
							} else {
								newData.arrAwoke = [DataUtil.decode(record)];
							}
						}
					}
					ConnectionUtil.ajaxReq({
								strServId : calendarUtil.SAVE_FORM_DATA_STRSERVID,
								jsonData : newData,
								callback : function(obj) {
									MsgUtil.alert("提示", "便签信息保存成功！");
									owner.parent.close();// 关闭窗口
									if (DataUtil.decode(data).strScratchpadId) {
										/**
										 * 调用函数删除日程中的便签
										 */
										owner.scope.calendar
												.removeSchedule(
														DataUtil.decode(data).strScratchpadId,
														true);
									}
									if (!DataUtil.isEmpty(obj.scratchpad)) {
										/**
										 * 调用页面便签添加函数
										 */
										owner.scope.addSchedule(obj.scratchpad);
									}
								}
							});
				}
			},
			deleteCaleandar : function() {
				var owner = this;
				MsgUtil.confirm("提示", "是否确认删除", function(btn) {
					if (btn == 'yes') {
						/**
						 * 获取数据值
						 */
						var strScratchpadId = HtmlUtil
								.getDom(owner.ids.strScratchpadId).value;
						ConnectionUtil.ajaxReq({
									strServId : calendarUtil.DELETE_FORM_DATA_STRSERVID,
									jsonData : strScratchpadId,
									callback : function(obj) {
										MsgUtil.alert("提示", "便签信息删除成功！");
										owner.parent.close();// 关闭窗口
										owner.scope.calendar.removeSchedule(
												strScratchpadId, true);
									}
								});
					}
					
				});

			}

	});