ObjectUtil.define("crm.pages.ocrm.common.calendar.CalendarDetail",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/calendar/CalendarDetail.html",
			initData : function() {
				var owner=this;
				var aworkInfo = this.create('component.Panel', {
					renderTo : this.ids.aworkInfoDiv,
					contentEl : this.ids.aworkInfoContentDiv,
					height : 100
				});
				var fieldSet = this.create('component.FieldSet', {
					renderTo : this.ids.awokeGridDiv,
					title : '是否提醒',
					checkboxToggle : true,
					collapsed : true,
					width:650,
					items : [aworkInfo],
					listeners : {
						/**
						 * 折叠事件
						 */
						beforecollapse : function(oPanel) {
							aworkInfo.setDisabled(true);
						},
						/**
						 * 展开事件
						 */
						beforeexpand : function(oPanel) {
							aworkInfo.setDisabled(false);
						}
					}
				});
				if (this.scratchpadId) {// 是修改					
					ConnectionUtil.ajaxReq({
						strServId : calendarUtil.LOAD_FORM_DATA_STRSERVID,
						jsonData : this.scratchpadId,
						callback : function(obj) {
							if (!DataUtil.isEmpty(obj)&& !DataUtil.isEmpty(obj.scratchpad)) {
								owner.create('component.DateField', {
											renderTo : owner.ids.strBeginDate,
											format : 'Y-m-d h:i',
											value : obj.scratchpad.strBeginDate,
											showTime : true
										});
								owner.create('component.DateField', {
											renderTo : owner.ids.strEndDate,
											format : 'Y-m-d h:i',
											showTime : true,
											value : obj.scratchpad.strEndDate
										});
								var strAheadType='';
								if(obj.scratchpad&&obj.scratchpad.arrAwoke[0]){
									strAheadType=obj.scratchpad.arrAwoke[0].strAheadType;
								}
								 owner.create("component.Selector", {
									id : owner.ids.strAheadType,
									renderTo : owner.ids.strAheadType,
									jsonData : [{
												code : '1',
												label : '十分钟'
											}, {
												code : '2',
												label : '半小时'
											}, {
												code : '3',
												label : '一小时'
											}],
									selectedValue : strAheadType
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
									if (obj.scratchpad.strScratchpadType !== 2) {
										aworkInfo.setDisabled(false);
									}else {
										aworkInfo.setDisabled(false);
									}
								}
							}
						}
					});
				} 
				
			},
			initCmp : function() {
				var owner = this;	
				this.create('component.Panel', {
					renderTo : this.ids.calendarDiv,
					contentEl :this.ids.calendarDivContentDiv,
					width:620,
					height : 250,
					buttons : [
						{
							text : '关闭',
							iconCls : 'form-cancel',
							handler : function() {
								owner.parent.close();
							}
						}
					]
				});				
			}
	});