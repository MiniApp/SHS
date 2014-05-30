/**
 * 短信结果信息 <p/> 功能描述：
 * <li>查询短信结果列表</li>
 * 
 * @author 蒋敏
 * @since 2013-09-03
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.component.shortMsg.MessageApplyList",
				"base.PageObject",{
			htmlUrl : Constants.CONTEXT_PATH+ "/pages/ocrm/common/component/shortMsg/MessageApplyList.html",// 页面url地址
			/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：蒋敏
			 * @编码日期：2013-09-03
			 * @最后修改日期：
			 */
			initCmp : function() {
				var owner = this;
				//申请发送开始时间
				this.create('component.DateField', {
					renderTo : this.ids.beginDate,
					format : 'Y-m-d'
				});
				//申请发送结束时间
				this.create('component.DateField', {
					renderTo : this.ids.endDate,
					format : 'Y-m-d'
				});
				this.create("component.EnumSelector", {
					category : [ CodeStringDefinition.VIP2_ApproveStat_CATEGORY ],
					renderTo : [ this.ids.applyState ]
				});
				// 创建panel
				this.create('component.Panel', {
					id : this.ids.MessageApplyPanel,
					contentEl : this.ids.MessageApplyCondition,
					hasBackGroundColor : true,
					widthPercent : 0.99,
					renderTo : this.ids.MessageApplyPanel,
					buttons : [ {
						text : '查询',
						iconCls : 'query',
						handler : function() {
							owner.queryMessageApplyList();
						}
					} ]
				});
				this.queryMessageApplyList();// 查询列表

			},
			/**
			 * 查询短信处理结果列表
			 * 
			 * @param
			 * @return
			 * @程序员：蒋敏
			 * @编码日期：2013-09-03
			 * @最后修改日期：
			 */
			 queryMessageApplyList : function() {
				var owner = this;
				/*var hiddens=false; 
				if(DataUtil.getUserInfo().authorityCode==CodeStringDefinition.MANAGER_EMPLOYEE_TYPE_CODE){
					hiddens=true;
				}*/
				var searchParam = DataUtil.getDataFromArea(this.ids.MessageApplyCondition);// 获取页面录入的查询条件
				if (searchParam == Constants.VALIDATION_FAIL){
					return;
				}
				// 清空列表区域
				HtmlUtil.overwrite(this.ids.MessageApplyListPanel, "",false);
				// 创建列表组件
				var grid = this.create('component.DataGrid',{
					renderTo : this.ids.MessageApplyListPanel,
					strServId : 'shortMsgService.queryMessageApplyList',
					jsonData : searchParam,
					mapping : [ 'applyDate','applyState','smsendapplyky','successNumber','lossNumber','conennt'],
					collapsible : false,
					checkbox : false,
					widthPercent : 1,
					heightPercent : 0.85,
					title : '短信处理结果列表',
					columns : [ {
						id : 'applyDate',
						header : "申请发送时间",
						sortable : true,
						dataIndex : 'applyDate',
						widthPercent : 0.2
					}, {
						header : "审批状态",
						sortable : true,
						dataIndex : 'applyState',
						widthPercent : 0.2
					}, {
						header : "推送成功数",
						sortable : true,
						dataIndex : 'successNumber',
						widthPercent : 0.2
					}, {
						header : "推送失败数",
						sortable : true,
						dataIndex : 'lossNumber',
						widthPercent : 0.2
					},{
						header : "短信内容",
						sortable : true,
						dataIndex : 'conennt',
						widthPercent : 0.2
					}  ],
					tbar : [
							{
								text : '详细信息',
								tooltip : '详细信息',
								iconCls : 'group',
								handler : function() {
									if (grid.getSelectRecords().length == 0) {
										MsgUtil.error('操作出错','请选择一条记录查看详细信息');
										return;
									} else if (grid.getSelectRecords().length > 1) {
										MsgUtil.error('操作出错','只能选择一条记录查看详细信息');
										return;
									}
									DataUtil.each(grid.getSelectRecords(),
										function(record) {
											owner.openViewWindow(record);
										})
								}
							}]
				});
			},
			/**
			 * 创建短信处理结果详细信息窗口
			 * 
			 * @程序员：jiangmin
			 * @编码日期：2013-09-03
			 * @最后修改日期：
			 */
			openViewWindow : function(record) {
				var owner = this;
				var win = this.create('component.Window',{
						title : '客户群组详细信息',
						closable : true,
						draggable : true,
						resizable : true,
						width : 900,
						height : 460,
						layout : 'fit',
						modal : true,
						pageObject : this
								.create(
										'crm.pages.ocrm.person.customer.customerGroup.CustomerGroupDetail',// 创建新增页面对象
										{
											id : 'CustomerGroupDetail',
											customergroupky : record
													.get('customergroupky'),
											name :record.get('groupname'),
											desc :record.get('description') 
										})
					});
				win.on('close', function() {
					owner.queryMessageApplyList();// 窗口关闭后刷新列表
					})

			}
			
	});