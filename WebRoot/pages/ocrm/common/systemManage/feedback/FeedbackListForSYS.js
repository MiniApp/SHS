ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.feedback.FeedbackListForSYS",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/feedback/FeedbackListForSYS.html",//页面地址
					/**
					 * 初始化頁面組件
					 * @param
					 * @return
					 */
					initCmp : function() {
						var owner = this;
						this.queryMemberList();
					},
					/**
					 * 查询列表方法 queryMemberrList
					 * @param 
					 * @return
					 */
					queryMemberList : function() {
						var owner = this;
						// 清空列表区域
						HtmlUtil.overwrite(this.ids.memberlist, "", false);
						//创建列表组建
						var newbar = [{
							text : '查看附件',
							tooltip : '查看附件',
							iconCls : 'box',
							handler : function() {
								if (grid.getSelectRecords().length == 0) {
									MsgUtil.error('操作出错', '请选择一条记录进行操作');
									return;
								} else if (grid.getSelectRecords().length > 1) {
									MsgUtil.error('操作出错', '只能选择一条记录进行操作');
									return;
								}
								owner.openAnalysisReportWindow(grid
										.getSelectRecords()[0]
										.get('feedbackky'));
							}
						},
									{
										text : '内容详细',
										tooltip : '内容详细',
										iconCls : 'edit',
										handler : function() {
											if (grid.getSelectRecords().length == 0) {
												MsgUtil.error('操作出错',
														'请选择一条记录进行查看');
												return;
											} else if (grid.getSelectRecords().length > 1) {
												MsgUtil.error('操作出错',
														'只能选择一条记录进行查看');
												return;
											}
											DataUtil
													.each(
															grid
																	.getSelectRecords(),
															function(record) {
																owner
																		.openModifWindow(record);
															})
										}
									}]
						var grid = this.create('component.DataGrid', {
							renderTo : this.ids.memberlist,
							strServId : 'feedbackService.getFeedbackList',
							jsonData : {},
							mapping : [ 'feedbackky', 'corpersonky', 'content',
									'funcmodel', 'type', 'title','feeduser', 'filepath' ],
							collapsible : false,
							noPaging : true,
							widthPercent : 1,
							//											height : 365,
							checkbox : true,
							columns : [ {
								id : 'title',
								header : "标题",
								widthPercent : 0.1,
								sortable : true,
								dataIndex : 'title'
							}, {
								id : 'type',
								header : "类型",
								widthPercent : 0.1,
								sortable : true,
								dataIndex : 'type'
							},{
								id : 'feeduser',
								header : "反馈人",
								widthPercent : 0.1,
								sortable : true,
								dataIndex : 'feeduser'
							},{
										header : "涉及功能模块",
										widthPercent : 0.1,
										dataIndex : 'funcmodel'
									}, {
										header : "内容",
										widthPercent : 0.6,
										dataIndex : 'content'
									} ],
							tbar : newbar
						});
					},
					/**
					 * 模板管理
					 * 
					 * @param
					 * @return
					 * @编码日期：2012-08-21
					 * @程序员：zhouyanhua
					 */
					openAnalysisReportWindow : function(report) {
						this.createAccessoryManageWindow( {
									title : "添加附件",
									businessky : report,
									businessType : CodeStringDefinition.BUSINESS_TYPE_COM_FEEDBACK,
									allowUpload : true,
									allowDownload : true,
									allowDelete : true,
									allowDeleteAll : true,
									allowViewAll : true
								});
					},/**
					 * 创建新增窗口
					 * 
					 * @param
					 * @return
					 * @程序员：wuqihui
					 * @编码日期：2012-07-25
					 * @最后修改日期：
					 */
					openCreateWindow : function() {
						var owner = this;
						// 创建新增窗口
					var win = this
							.create(
									'component.Window',
									{
										title : '新增反馈意见',
										closable : true,
										draggable : true,
										resizable : true,
										layout : 'fit',
										height : 260,
										width : 800,
										modal : true,
										pageObject : this
												.create(
														'crm.pages.ocrm.common.systemManage.feedback.FeedbackCreate',// 创建新增页面对象
														{
															id : 'CustomerNoteInfoAdd'
														})
									});
					win.on('close', function() {
						owner.queryMemberList();// 窗口关闭后刷新列表
						})
				},
				/**
				 * 创建修改窗口
				 * 
				 * @param
				 * @return
				 * @程序员：wuqihui
				 * @编码日期：2013-06-20
				 * @最后修改日期：
				 */
				openModifWindow : function(record) {
					var owner = this;
					// 创建修改 窗口
					var win = this
							.create(
									'component.Window',
									{
										title : '内容详细',
										closable : true,
										draggable : true,
										resizable : true,
										layout : 'fit',
										height : 210,
										width : 600,
										modal : true,
										pageObject : this
												.create(
														'crm.pages.ocrm.common.systemManage.feedback.FeedbackContent',// 创建修改页面对象
														{
															id : 'CustomerNoteInfoModif',
															content : record
																	.get('content')
														})
									});
				}
				});