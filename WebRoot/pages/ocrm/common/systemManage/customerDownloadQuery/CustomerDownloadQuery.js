/**
 * 
 * 系统管理->短信模板列表
 * 
 * <p/> 功能描述：
 * 
 * <li>输入查询条件查询</li>
 * <li>查询当前短信模板列表</li>
 * 
 * 
 * author:朱凯
 * 
 * date:2012-10-17
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.customerDownloadQuery.CustomerDownloadQuery",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/customerDownloadQuery/CustomerDownloadQuery.html",// 页面url地址

					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-10-17
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						// 创建panel
						this.create('component.Panel', {
							renderTo : this.ids.downloadDiv,
							contentEl : this.ids.downloadSearchDiv,
							widthPercent : 1,
							margin : '0 0 5 0',
							height : 60,
							hasBackGroundColor : true,
							buttons : [ {
								text : '查询',
								iconCls : 'query',
								handler : function() {
									owner.queryDownLoadList(); // 查询列表
								}
							} ]
						});
						this.create('component.DateField', {
							renderTo : this.ids.opeartTime,
							format : 'Y-m-d'
						});
						owner.queryDownLoadList();
					},

					/**
					 * 查询当前短信模板列表
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-10-17
					 * @最后修改日期：
					 */
					queryDownLoadList : function() {

						var searchParam = DataUtil
								.getDataFromArea(this.ids.downloadSearchDiv);
						if (searchParam != Constants.VALIDATION_FAIL) {//
							HtmlUtil.overwrite(this.ids.downloadListDisplayDiv,
									"", false);
							// 创建列表组件
							var grid = this
									.create(
											'component.DataGrid',
											{
												renderTo : this.ids.downloadListDisplayDiv,
												strServId : 'customerDownloadInfoService.getCustomerDownloadInfoList',
												jsonData : searchParam,
												mapping : [ 'opearName',
														'authorizedName',
														'downCusSum',
														'downType',
														'opeartTime' ],
												collapsible : false,
												widthPercent : 1,
												heightPercent : 0.85,
												checkbox : true,
												title : '查询结果',
												columns : [
														{
															header : "下载/打印人",
															sortable : true,
															dataIndex : 'opearName',
															widthPercent : 0.15
														},
														{
															header : "下载/打印类型",
															sortable : true,
															dataIndex : 'downType',
															widthPercent : 0.15
														},
														{
															header : "下载/打印时间",
															sortable : true,
															dataIndex : 'opeartTime',
															widthPercent : 0.15
														},
														{
															header : "审批人",
															sortable : true,
															dataIndex : 'authorizedName',
															widthPercent : 0.15
														},
														{
															header : "下载客户数",
															sortable : true,
															dataIndex : 'downCusSum',
															widthPercent : 0.15
														} ]

											});// grid 结束
						}

					}
				});