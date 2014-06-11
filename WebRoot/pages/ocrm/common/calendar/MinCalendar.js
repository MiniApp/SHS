/**
 * 创建日程管理迷你控件
 * 
 * @作 者 李瑞
 * @版 本 1.0
 * @类 ocrm.calendar.minCalendar
 * @扩 展 Ext.util.Observable
 * @构造器
 * @参数 {} config
 * @描 述 日程管理控件实现以下功能：
 * 
 * 
 * /** 实现
 * 
 * @类 ocrm.calendar.minCalendar
 * @扩 展 Ext.util.Observable
 */
ObjectUtil.define("crm.pages.ocrm.common.calendar.MinCalendar",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/calendar/MinCalendar.html",
			initCmp : function() {
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
			 * @作者 李瑞
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
				/**
				 * 调用函数
				 */
				this.loadCalendarData(rData, this.initControl, this);
			},
			/**
			 * 日程数据加载函数
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 * @参数 rData 日期数据
			 */
			loadCalendarData : function(rData, backCallFn, scope) {
				//var owner = this;
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
							submitWaitMessage:false,
							callback : function(data) {
								ObjectUtil.callback(backCallFn,scope,data);
							}
						});
			},
			/**
			 * 初始化控件
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 * @参数 oData 日程数据
			 */
			initControl : function(oData) {
				this.oData = oData;
				/**
				 * 调用按钮栏创建函数
				 */
				this.initCreateToolBar();
				/**
				 * 创建日程控件
				 */
				this.initCalendarControl();
				this.createTbgGrid(this.gridHeight, this.gridWidth);
				// /**
				// * 创建提醒表格控件
				// */
				this.createMsgGrid(this.gridHeight, this.gridWidth);
				//加载个性化系统配置参数
				HtmlUtil.loadSystemStyle();
			},
			/*******************************************************************
			 * 
			 * 创建按钮栏函数<br>
			 * 
			 ******************************************************************/
			initCreateToolBar : function() {
				var owner = this;
				/**
				 * 不为空执行
				 */
				if (!DataUtil.isEmpty(this.parent)) {
					/**
					 * 定义按钮组
					 */
					var arrTool = [{
								id : 'calendar-refresh-tools',
								baseCls : 'calendar-refresh-tools',
								tooltip : '刷新日历',
								handler : function(event, toolEl, panel) {
									/**
									 * 调用刷新函数
									 */
									owner.refreshCalendarHandler();
								}
							}, {
								id : 'calendar-in-tools',
								baseCls : 'calendar-in-tools',
								tooltip : '打开工作计划',
								handler : function(event, toolEl, panel) {
									var maxCalendarWin = owner.create(
											'component.Window', {
												title : '工作计划',
												width : 840,
												height : 583,
												closable : true,
												modal : true,
												buttonAlign : "center",
												autoScroll : true,
												draggable : true,// 拖拽
												pageObject : owner
														.create(
																"crm.pages.ocrm.common.calendar.MaxCalendar",
																{
																	id : 'MaxCalendar'
																}),
												x : 200,
												y : 50
											});
								}
							}];
					this.parent.addTool(arrTool);
				}
			},
			/**
			 * 初始化创建日程控件
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 * @参数 oData 日程数据
			 */
			initCalendarControl : function() {
				/**
				 * 解析便签数据
				 */
				var schedules = DataUtil.isEmpty(this.oData.scratchpads)
						? []
						: this.parseSchedulesData(this.oData.scratchpads);
				/**
				 * 调用函数创建日程控件
				 */
				var calendar = new Calendar(this.ids.calendarDivMin, {
							/**
							 * 设置日程样式
							 */
							size : 'small',
							/**
							 * 函数执行域
							 */
							scope : this,
							style : 'border-left:1px solid #99bbe8;',
							/**
							 * 加载便签数据
							 */
							schedules : schedules,
							/**
							 * 日期选择回调函数
							 */
							afterSelect : this.afterSelectHandler,
							/**
							 * 日期改变回调函数
							 */
							changeCalendar : this.changeCalendarHandler,
							/**
							 * 阴历控件加载
							 */
							lunarCalendar : lunarCalendar.init()
						});
				/**
				 * 
				 */
				this.calendar = calendar;
			},
			/**
			 * 日期选择后的事件函数
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 * @参数 date 所选日期
			 * @参数 calendar 日程控件
			 */
			afterSelectHandler : function(date, calendar) {
				/**
				 * 调用日期改变后的便签和消息表格数据刷新函数
				 */
				calendar.options.scope.refreshLoadGridData(date, calendar);
			},
			/**
			 * 日期改变后的事件函数
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 * @参数 date 新日期
			 * @参数 oldDate 旧日期
			 */
			changeCalendarHandler : function(date, oldDate, calendar) {
				var strSelectDate = calendarUtil.fnDataToString(date);
				if (date.getFullYear() !== oldDate.getFullYear()
						|| date.getMonth() !== oldDate.getMonth()) {
					/**
					 * 阴历赋值
					 */
					this.lunarCalendar = lunarCalendar.init(date.getFullYear(),
							date.getMonth());
				}
				var rData = {
					'strStartDate' : strSelectDate.substring(0, 8) + '01',
					'strEndDate' : strSelectDate.substring(0, 8)
							+ calendarUtil.solarMonth[date.getMonth()]
				};
				/**
				 * 调用函数
				 */
				calendar.options.scope.loadCalendarData(rData,
						calendar.options.scope.addSchedule,
						calendar.options.scope);
			},
			/**
			 * 刷新日期的事件函数
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 * @参数 date 新日期
			 * @参数 oldDate 旧日期
			 */
			refreshCalendarHandler : function() {
				var rData = {
					'strStartDate' : this.strSelectDate.substring(0, 8) + '01',
					'strEndDate' : this.strSelectDate.substring(0, 8)
							+ calendarUtil.solarMonth[calendarUtil
									.fnStringToDate(this.strSelectDate).getMonth()]
				};
				/**
				 * 调用函数
				 */
				this.loadCalendarData(rData, this.addSchedule, this);
			},
			/**
			 * 页面便签添加函数
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 */
			addSchedule : function(oData) {
				/**
				 * 解析便签数据
				 */
				var schedules = DataUtil.isEmpty(oData.scratchpads) ? [] : this
						.parseSchedulesData(oData.scratchpads);
				/**
				 * 调用添加函数在页面中添加新便签
				 */
				this.calendar.addSchedule(schedules);
				/**
				 * 调用函数刷新
				 */
				this.calendar.refresh();
				this.oData = oData;
				/**
				 * 清除表格数据
				 */
				this.cleanGridData();
			},
			/**
			 * 解析并返回便签信息
			 * 
			 * @作者 李瑞
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
								title : tagInfo.strScratchpadTitle
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
			/*******************************************************************
			 * 
			 * 创建便签表格控件函数<br>
			 * 
			 ******************************************************************/
			/**
			 * 创建便签表格函数
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 */
			createTbgGrid : function(oHeight, oWidth) {
				var owner = this;
				/**
				 * 创建表格
				 */
				this.tbgGrid = this.create('component.DataGrid', {
							renderTo : this.ids.tbgDivMin,
							dataType : 'memory',
							mapping : ['strDescription', 'strScratchpadTitle',
									'strBeginTime', 'strBeginDate', 'strEndDate',
									'strEndTime'],
							data : {
								data : this.pickTbgsData()
							},
							checkbox : false,
							collapsible : true,
							multiSelect : false,
							noPaging : true,
							columns : [{
								header : '时间',
								sortable : false,
								dataIndex : 'strBeginTime',
								width : 50,
								renderer : function(value, cellmeta, record) {
									return '<span data-qtip="<b>开始时间</b><br>'
											+ record.data['strBeginDate'] + ' '
											+ value + '<br><b>结束时间</b><br>'
											+ record.data['strEndDate'] + ' '
											+ record.data['strEndTime'] + '">'
											+ value + '</span>';
								}
							}, {
								header : '事项',
								sortable : false,
								dataIndex : 'strScratchpadTitle',
								width : 100,
								renderer : function(value, cellmeta, record) {
									var strColor = '';
									/**
									 * 验证便签开始日期是否为当前选择日期
									 */
									if (calendarUtil.validateDate(
											owner.strSelectDate,
											record.data['strBeginDate']) === true) {
										/**
										 * 如果开始日期是当前选择日期，则设置红色
										 */
										strColor = 'red';
									} else if (calendarUtil.validateDate(
											owner.strSelectDate,
											record.data['strEndDate']) === true) {
										/**
										 * 如果开始日期不是当前选择日期，则设置绿色
										 */
										strColor = 'green';
									} 
//									else {
//										return;
//									}
									/**
									 * 返回格式化后的数据
									 */
									return '<span style="color:' + strColor
											+ ';" data-qtitle="标题：' + value
											+ '" data-qtip="内容：'
											+ record.data['strDescription']
											+ '">' + value + '</span>';
								}
							}],
//							height : oHeight,
							heightPercent:0.28,
							width : oWidth,
							title : '便签'
						});
			},
			/**
			 * 创建消息表格
			 * 
			 * @作者 
			 * @状态 。。。
			 * @公开性 私有
			 */
			createMsgGrid : function(oHeight,oWidth) {
				/**
				 * 创建简单表格
				 */
				this.msgGrid = this.create('component.DataGrid', {
							renderTo : this.ids.msgDivMin,
							dataType : 'memory',
							mapping : ['strAwokemsgtype'],
							data : {
								data : this.pickMsgsData()
							},
							noPaging : true,
							collapsible : true,
							multiSelect : false,
							columns : [{
								header : '重要事项提醒',
								sortable : false,
								dataIndex : 'strAwokemsgtype',
								width : 145,
								renderer : function(value, cellmeta, record) {
									return '<span data-qtip="' + value + '">'
											+ value + '</span>';
								}
							}],
							heightPercent:0.28,
							width : oWidth,
							title : '提醒'
						});
			},
			/**
			 * 清除表格数据函数
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 */
			cleanGridData : function() {
				/**
				 * 刷新便签表格数据
				 */
				this.tbgGrid.loadData(this.pickTbgsData());
				/**
				 * 刷新提醒表格数据
				 */
				this.msgGrid.loadData(this.pickMsgsData());
			},
			/**
			 * 刷新表格数据
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 * @参数 date 选择日期
			 * @参数 calendar 日程控件
			 */
			refreshLoadGridData : function(date, calendar) {
				//alert('开始刷新表格');
				this.strSelectDate = calendarUtil.fnDataToString(date);
				/**
				 * 刷新便签表格数据
				 */
				this.tbgGrid.loadData(this.pickTbgsData());
				/**
				 * 刷新提醒表格数据
				 */
				this.msgGrid.loadData(this.pickMsgsData());
				/**
				 * 调用函数刷新OCRM的数据
				 */
				// this.refreshOcrmGridData(this.strSelectDate);
			},
			/**
			 * 刷新OCRM的数据
			 * 
			 * 拥有权限验证
			 * 
			 * @param {}
			 *            strSelectDate
			 */
			refreshOcrmGridData : function(strSelectDate) {
				try {
					// 判断首页是否是激活状态
					var mainAlive = false;
					var centerPanel = DataUtil.getCmp('centerPanel');
					var activePanel = centerPanel.getActiveTab();
					if (activePanel) {
						// 首页的Id,依赖于菜单配置文件中的Id设置规则，需要注意联动改变
						var activeId = activePanel.getId();
						if (activeId && activeId === 'vipRmWelcome') {
							mainAlive = true;
						}
					}
					// end 判断首页是否激活
					if (!DataUtil.isEmpty(ocrm.Helper.getUserInfo().logonId)
							&& ocrm.Helper.getUserInfo().system === 'CRM') {
						if (ocrm.page.allAwokes && mainAlive) {
							/**
							 * 调用ocrm函数刷新表格数据
							 */
							ocrm.page.allAwokes.allAwokesShow(strSelectDate);
							var extMyEventPanel = DataUtil.getCmp('extMyEventPanel');
							if (extMyEventPanel) {
								/**
								 * 改变提醒表格的标题
								 */
								extMyEventPanel.setTitle('我的事件提醒 '
										+ strSelectDate);
							}
						}
					}
				} catch (e) {
				}
			},
			/**
			 * 提取便签数据
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 */
			pickTbgsData : function(oData) {
				var aryData = [];
				oData = oData || this.oData;
				if (!DataUtil.isEmpty(oData.scratchpads)) {
					var currDate = new Date(this.strSelectDate);
					var tempBeginDate = new Date(this.strSelectDate);
					var tempEndDate = new Date(this.strSelectDate);
					DataUtil.each(oData.scratchpads, function(item, index) {
						tempBeginDate = new Date(item.strBeginDate);
						tempEndDate = new Date(item.strEndDate);
						if (item && (tempBeginDate.getTime() <= currDate.getTime() && currDate.getTime() <= tempEndDate.getTime())) {
							/**
							 * 加载数据
							 */
							aryData.push(item);
						}
					}, this);
					currDate = null;
					tempEndDate = null;
					tempBeginDate = null;
				}
				/**
				 * 返回数据
				 */
				return aryData;
			},
			/**
			 * 提取提醒数据
			 * 
			 * @作者 李瑞
			 * @状态 完成
			 * @公开性 私有
			 */
			pickMsgsData : function(oData) {
				var aryData = [];
				oData = oData || this.oData;
				if (!DataUtil.isEmpty(oData.collectedMsgs)) {
					DataUtil.each(oData.collectedMsgs, function(item, index) {
						if (item) {
							/**
							 * 加载数据
							 */
							aryData.push(item);
						}
					}, this);
				}
				/**
				 * 返回数据
				 */
				return aryData;
			}
		});