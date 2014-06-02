/**
 * 创建日程管理控件
 * 
 * @作 者 jimes.liao
 * @版 本 1.0
 * @类 crm.pages.ocrm.common.calendar.MaxCalendar
 * @扩 展 base.PageObject
 * @构造器
 * @参数 {} config
 * 
 * @描 述 日程管理控件实现以下功能：
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.calendar.MaxCalendar",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/calendar/MaxCalendar.html",
			initCmp : function() {
				// 客户经理主管选择的客户经理信息,验证权限并设置查看模式（只读还是可修改），暂未改，到时候用参数的形式传入必要信息
				this.hasView = false;// 默认可修改
				this.initCalendarDate();
			},
			/*******************************************************************
			 * 
			 * 创建日程控件函数<br>
			 * 
			 ******************************************************************/
			/**
			 * 初始化日程便签日期数据
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 */
			initCalendarDate : function() {
				var dDate = new Date();
				/**
				 * 初始化今天日期字符串
				 */
				this.strSelectDate = calendarUtil.fnDataToString(dDate);
				var rData = {};
				/**
				 * 开始日期
				 */
				dDate.setDate(1);
				rData.strStartDate = calendarUtil.fnDataToString(dDate);
				/**
				 * 结束日期
				 */
				dDate.setDate(calendarUtil.solarMonth[dDate.getMonth()]);
				rData.strEndDate = calendarUtil.fnDataToString(dDate);
				// if (this.hasView === true && !Ext.isEmpty(this.infoKey)) {
				// //如果为查看模式，并且传入的客户经理编号存在，则当前要展示的日历就为传入的客户经理的日历，暂未改
				// /**
				// *
				// */
				// rData.strLogonId = this.infoKey.employeeid;
				// }
				/**
				 * 调用函数
				 */
				this.loadCalendarData(rData, this.initCalendarControl, this);
			},
			/**
			 * 日程数据加载函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 rData 日期数据
			 */
			loadCalendarData : function(rData, backCallFn, scope) {
				var owner = this;
				/***************************************************************
				 * 调用ocrm ajax数据请求函数
				 * 
				 * @Author jimes.liao
				 * @Date 20100105
				 */
				// 组装数据
				var params = rData.strStartDate
						+ ";"
						+ rData.strEndDate
						+ ";"
						+ (DataUtil.isEmpty(rData.strLogonId) == true
								? " "
								: rData.strLogonId);
				ConnectionUtil.ajaxReq({
							strServId : calendarUtil.LOAD_CALENDAR_DATA_STRSERVID,
							jsonData : params,
							callback : function(data) {
								backCallFn(data, scope);
							}
						});
			},
			/**
			 * 初始化创建日程控件
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 oData 日程数据
			 */
			initCalendarControl : function(oData, scope) {
				/**
				 * 创建按钮栏
				 */
				// this.initCreateToolBar();
				/**
				 * 解析便签数据
				 */
				var schedules = DataUtil.isEmpty(oData.scratchpads)
						? []
						: scope.parseSchedulesData(oData.scratchpads);
				/**
				 * 调用函数创建日程控件
				 */
				var calendar = new Calendar(scope.ids.calendarMainDiv, {
							/**
							 * 函数执行域
							 */
							scope : scope,
							initDate : new Date(),
							/**
							 * 加载便签数据
							 */
							schedules : schedules,
							/**
							 * 阴历数据
							 */
							lunarCalendar : lunarCalendar.init(),
							/**
							 * 重构双击便签事件
							 */
							dblclickSchedule : scope.dblclickScheduleHandler,
							/**
							 * 重构点击日期标题事件
							 */
							clickDateText : scope.clickDateTextHandler,
							/**
							 * 重构双击更多...事件
							 */
							clickMoveScheduleText : scope.clickMoveScheduleTextHandler,
							/**
							 * 重构双击日程日期事件
							 */
							dblclickCalendarDate : scope.dblclickCalendarDateHandler,
							/**
							 * 重构改变日程日期事件
							 */
							changeCalendar : scope.changeCalendarHandler
						});
				scope.calendar = calendar;
				/**
				 * 创建日程结果集控件
				 */
				// this.initScratchpadList();
				// 创建Tab控件
				scope.initTabBar();
			},
			/**
			 * 解析并返回便签信息
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 tagInfos
			 */
			parseSchedulesData : function(tagInfos) {
				if (!DataUtil.isArray(tagInfos)) {
					/**
					 * 如果不为数组则转换成数组
					 */
					tagInfos = [tagInfos];
				}
				/**
				 * 创建临时数组对象
				 */
				var arySchedule = [];
				/**
				 * 循环解析便签数据
				 */
				DataUtil.each(tagInfos, function(tagInfo) {
							/**
							 * 向日历中添加便签信息
							 */
							var schedule = {
								/**
								 * 设置ID
								 */
								id : tagInfo.strScratchpadId,
								description : tagInfo.strDescription,
								title : tagInfo.strScratchpadTitle,
								/**
								 * 默认设置不可编辑
								 */
								edit : false,
								/**
								 * 设置便签类型为消息类型
								 */
								scheduleType : 'schedule',
								/**
								 * 提示格式
								 */
								qtipFormat : '<b>标题：<b>'
										+ tagInfo.strScratchpadTitle
										+ '<br><b>内容：<b/>'
										+ tagInfo.strDescription
							};
							/**
							 * 获取便签开始时间
							 */
							schedule.start = calendarUtil.getScheduleDataTime(
									tagInfo.strBeginDate, tagInfo.strBeginTime);
							/**
							 * 获取便签结束时间
							 */
							schedule.finish = calendarUtil.getScheduleDataTime(
									tagInfo.strEndDate, tagInfo.strEndTime);
							/**
							 * 将解析后的对象加入到临时数组中
							 */
							arySchedule[arySchedule.length] = schedule;
						}, this);
				/**
				 * 返回数组对象
				 */
				return arySchedule;
			},
			/**
			 * 页面便签添加函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 */
			addSchedule : function(tagInfo) {
				/**
				 * 调用函数解析便签数据
				 */
				var schedule = this.parseSchedulesData(tagInfo);
				/**
				 * 调用添加函数在页面中添加新便签
				 */
				this.calendar.addSchedule(schedule);
				/**
				 * 调用函数清除页面中选择对象
				 */
				this.calendar.clearSelected();
			},
			/**
			 * 页面便签全部添加函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 */
			addScheduleAll : function(oData, scope) {
				/**
				 * 解析消息数据
				 */
				// var holidays = Ext.isEmpty(oData.collectedMsgs) ? [] :
				// this.parseAwokesMsgsData(oData.collectedMsgs);
				/**
				 * 解析便签数据
				 */
				var schedules = DataUtil.isEmpty(oData.scratchpads) ? [] : scope
						.parseSchedulesData(oData.scratchpads);
				scope.calendar.clearSchedule();
				/**
				 * 调用添加函数在页面中添加新便签
				 */
				scope.calendar.addSchedule(schedules);
				// this.calendar.clearHoliday();
				/**
				 * 调用添加函数在页面中添加新提醒
				 */
				// this.calendar.addHoliday(holidays);
				/**
				 * 调用函数刷新
				 */
				scope.calendar.refresh();
			},
			/**
			 * 双击便签对象的回调函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 {} schedule 双击便签对象
			 */
			dblclickScheduleHandler : function(schedule) {
				/**
				 * 调用函数维护便签信息
				 */
				this.initUpdateTagService(schedule);
			},
			/**
			 * 日程日期改变的回调函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 {} date 改变前日期
			 * @参数 {} oldDate 改变后日期
			 */
			changeCalendarHandler : function(date, oldDate, calendar) {
				/**
				 * 阴历赋值
				 */
				this.lunarCalendar = lunarCalendar.init(date.getFullYear(),
						date.getMonth());
				var strSelectDate = calendarUtil.fnDataToString(date);
				var rData = {
					'strStartDate' : strSelectDate.substring(0, 8) + '01',
					'strEndDate' : strSelectDate.substring(0, 8)
							+ calendarUtil.solarMonth[date.getMonth()]
				};
				// if (calendar.options.scope.hasView === true
				// && !Ext.isEmpty(calendar.options.scope.infoKey))
				// {//客户经理主管查看客户经理设置
				// /**
				// *
				// */
				// rData.strLogonId = calendar.options.scope.infoKey.employeeid;
				// }
				/**
				 * 调用函数
				 */
				calendar.options.scope.loadCalendarData(rData,
						calendar.options.scope.addScheduleAll,
						calendar.options.scope);
			},
			/**
			 * 点击日期标题函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 {} event 点击事件
			 * @参数 {} date 被点击日期
			 */
			clickDateTextHandler : function(event, date) {
				// try {
				// var infoKey = undefined;
				// try {
				// infoKey =
				// Ext.getCmp("territoryEmployeeListCalendarView").dateResult;
				// } catch (e) {
				// }
				// /**
				// * 调用ocrm2函数刷新表格数据 查看所有的提醒
				// */
				// ocrm.page.allAwokes.allAwokesShow(
				// calendarUtil.fnDataToString(date), infoKey);
				// } catch (e) {
				// }
			},
			/**
			 * 双击更多标题函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 {} event 点击事件
			 * @参数 {} date 被点击日期
			 */
			clickMoveScheduleTextHandler : function(event, date) {
				  /**
				 * 切换日程显示模式
				 */
				 
		        Event.stop(event);
		       
		        this.calendar.date = date;
		        // 切换到日视图
		        var tabMenuCmp = Ext.getCmp('calendarTabtabtab');
		        this.calendar.options.displayType = 'day';
		        tabMenuCmp.setActiveTab('dayType');
		      
		        //this.calendar.options.displayType = 'day';
		        // end
		        //this.calendar.refresh();
		         /**
					 * 设计切换模式为 天
					 */
		        if(!Ext.isEmpty(Ext.getCmp('dayCheckMenu'))){Ext.getCmp('dayCheckMenu').setChecked(true);}
		        /**
				 * 禁用显示天按钮
				 */
		        if(!Ext.isEmpty(DataUtil.getCmp('showDateMenu'))){Ext.getCmp('showDateMenu').setDisabled(true);}
		        
		        try{
		            var infoKey = undefined;
		            try{
		                infoKey = Ext.getCmp("territoryEmployeeListCalendarView").dateResult;
		            }catch(e){}
		            /**
					 * 调用ocrm2函数刷新表格数据
					 */
		           
		            ocrm.page.allAwokes.allAwokesShow(calendarUtil.fnDataToString(date), infoKey);
		        }catch(e){}	
			},
			/**
			 * 双击日程日期函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 {} oCalendar 日程对象
			 */
			dblclickCalendarDateHandler : function(oCalendar) {
				if (this.hasView === false) {
					/**
					 * 获取选中的日期
					 */
					var term = oCalendar.getSelectedTerm();
					if (term) {
						if (oCalendar.options.displayType == 'month') {
							term[0].setHours(12);
							term[1].setHours(14);
						}
					} else {
						MsgUtil.error("提示", "未选中日期，请按住Ctrl键，再选择日期!");
						return;
					}
					/**
					 * 调用创建便签表单函数
					 */
					oCalendar.options.scope.initCreateTagAppend(term);
				}
			},
			/**
			 * 切换模式函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 {} item 便签数据
			 */
			calendarChangeDisplayType : function(item) {
				/**
				 * 调用日历切换函数
				 */
				this.calendar.changeDisplayType(item.value);
			},
			/**
			 * 改变显示哪天函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 {} item 样式数据
			 * @参数 {} checked 标记
			 */
			calendarChangeDisplay : function(item, checked) {
				if (checked) {
					/**
					 * 显示
					 */
					this.calendar.showDayOfWeek(item.value);
				} else {
					/**
					 * 隐藏
					 */
					this.calendar.hideDayOfWeek(item.value);
				}
			},
			/*******************************************************************
			 * 
			 * 创建Tab页控件<br>
			 * 
			 ******************************************************************/
			initTabBar : function() {
				var owner = this;
				/**
				 * 初始化tab控件
				 */
				var tabMenu = this.create("component.TabPanel", {
							id : 'calendarTabtabtab',
							renderTo : this.ids.toolbarDiv,
							items : [this.create("component.Panel", {
												id : 'monthType',
												title : '月视图',
												value : 'month'
											}),
									this.create("component.Panel", {
												id : 'weekType',
												title : '周视图',
												value : 'week'
											}),
									this.create("component.Panel", {
												id : 'dayType',
												title : '日视图',
												value : 'day'
											})],
							activeTab : 0
						});
				tabMenu.on("beforetabchange",
						function(tab, newPanel, oldPanel) {
							if (oldPanel != null
									&& newPanel.value != oldPanel.value) {
								owner.changeDisplayType({
											value : newPanel.value
										});
							}
							return true;
						});
				// end
			},
			/*******************************************************************
			 * 
			 * 创建日程结果集控件<br>
			 * 
			 ******************************************************************/
			initScratchpadList : function() {
				var config = {};
			},
			/**
			 * 新增提醒函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 */
			append : function(btn) {
				/**
				 * 获取选中的日期
				 */
				var term = this.calendar.getSelectedTerm();
				if (!term) {
					/**
					 * 调用创建便签表单函数
					 */
					this.initCreateTagAppend();
					return;
				} else {
					if (this.calendar.options.displayType == 'month') {
						term[0].setHours(00);
						term[1].setHours(23);
					}
					/**
					 * 调用创建便签表单函数
					 */
					this.initCreateTagAppend(term);
				}
			},
			/**
			 * 切换模式函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 * @参数 item 值
			 */
			changeDisplayType : function(item) {
				/**
				 * 调用展示模式函数
				 */
				this.calendarChangeDisplayType(item);
			},
			/**
			 * 改变显示哪天函数
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 */
			changeDisplay : function(item, checked) {
				/**
				 * 调用
				 */
				this.calendarChangeDisplay(item, checked);
			},
			/**
			 * 禁用启用显示天按钮组件
			 * 
			 * @参数 {} sta 禁用启用状态
			 */
			changeShowDateMenuState : function(sta) {
				/**
				 * 禁用显示天按钮
				 */
				if (!DataUtil.isEmpty(DataUtil.getCmp('showDateMenu'))) {
					DataUtil.getCmp('showDateMenu').setDisabled(sta);
				}
			},
			/**
			 * 创建便签新增窗体
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 */
			initCreateTagAppend : function(term) {
				/**
				 * 创建表单承载窗体
				 */
				var win = this.create('component.Window', {
							title : '新增便签信息',
							draggable : true,
							closable : true,
							modal : true,
							buttonAlign : "center",
							width : 665,
							height : 400,
							autoScroll : true,
							pageObject : this
									.create(
											'crm.pages.ocrm.common.calendar.CalendarInfo',
											{
												id : 'CalendarInfo',
												scope : this,
												term : term
											})
						});
			},
			/**
			 * 修改便签表单维护窗体
			 * 
			 * @作者 jimes.liao
			 * @状态 完成
			 * @公开性 私有
			 */
			initUpdateTagService : function(tagInfo) {
				/**
				 * 修改表单承载窗体
				 */
				var win = this.create('component.Window', {
							title : '维护便签信息',
							draggable : true,
							closable : true,
							modal : true,
							buttonAlign : "center",
							width : 665,
							height : 400,
							autoScroll : true,
							pageObject : this
									.create(
											'crm.pages.ocrm.common.calendar.CalendarInfo',
											{
												id : 'CalendarInfo',
												scratchpadId : tagInfo.id,
												scope : this
											})
						});
			}
		});