/**
 * 附件关联关系管理公共组件类 系统管理员使用
 * 
 * @author DuanYong
 * @since 2012-08-3
 * @class business.accessory.AccessoryReationManage
 * @extends base.PageObject
 * 
 */
ObjectUtil.define("business.accessory.AccessoryReationManage",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/component/accessory/AccessoryReationManage.html",
			initData : function() {

			},
			initCmp : function() {
				var me = this;
				/** ******************************页面控件渲染******************************** */
				this.create("component.EnumSelector", {
							category : [CodeStringDefinition.BUSINESSTYPE_CATEGORY],
							renderTo : [this.ids.businessType],
							width : 200,
							id : [this.ids.businessType]
						});
				this.create('component.Panel', {
							renderTo : this.ids.accessoryReationDiv,
							contentEl : this.ids.accessoryReationContentDiv,
							widthPercent : 0.98,
							height : 65,
							hasBackGroundColor : true,
							buttons : [{
										text : '查询',
										iconCls : 'query',
										handler : function() {
											me.accessoryReatonList();
										}
									}]
						});
				this.accessoryReatonList();
				/** ******************************页面按钮定义******************************** */
			},
			initEvent : function() {

			},
			/**
			 * 附件列表
			 */
			accessoryReatonList : function() {
				var owner = this;
				/** ******************************定义页面功能按钮******************************** */

				// 附件关联关系管理
				var btn_accessoryReation_manage = {
					text : '附件关联关系管理',
					iconCls : 'saveas',
					tooltip : '附件关联关系管理', // 提示信息
					handler : function() {
						if (grid.getSelectRecords().length == 0) {
							MsgUtil.error('操作出错', '请选择一条记录');
							return;
						} else if (grid.getSelectRecords().length > 1) {
							MsgUtil.error('操作出错', '只能选择一条记录');
							return;
						}
						owner.createAccessoryManageWindow({
							title : grid.getSelectRecords()[0]
									.get('businessTypeStr'),
							accrelationky : grid.getSelectRecords()[0]
									.get('accrelationky'),
							allowUpload : true,
							allowDownload : true,
							allowDelete : true,
							allowDeleteAll : true,
							allowViewAll : true
						}).on('close', function() {
									owner.accessoryReatonList();// 窗口关闭后刷新列表
								});
					}
				};

				// 删除关联关系按钮
				var btn_accessoryReation_delete = {
					text : '删除关联关系',
					iconCls : 'delete', // 图标CSS
					tooltip : '删除关联关系', // 提示信息
					handler : function() {
						var rows = grid.getSelectRecords();
						if (rows.length < 1) {
							ExceptionUtil.throwBusinessException({
										title : '提示信息',
										msg : '请选择一条记录!'
									});
						} else if (rows.length >= 1) {
							MsgUtil.confirm("确认消息框",
									"此操作会永久删除附件关联关系及附件,确定删除?", function(btn,
											txt) {
										if (btn == "yes"){
											var ids = [];
											for (var i = 0; i < rows.length; i++) {
												ids[i] = rows[i]
														.get('accrelationky');
											}
											var params = {
												'accrelationKyList' : ids
											};
											ConnectionUtil.ajaxReq({
												strServId : "accessoryReationHelper.delete",
												jsonData : params,
												callback : function(data) {
													owner.accessoryReatonList();
												}
											});

										}
									});
						}
					}
				};
				/** ******************************定义页面数据显示******************************** */

				// 数据绑定列
				var cm = [{
							header : '关联主键',
							sortable : true,
							width : 60,
							dataIndex : 'accrelationky'
						}, {
							header : '业务主键',
							sortable : true,
							width : 60,
							dataIndex : 'businessky'
						}, {
							header : '业务类型',
							sortable : true,
							width : 280,
							dataIndex : 'businessTypeStr'
						}, {
							header : '上传时间',
							sortable : true,
							width : 80,
							dataIndex : 'createDateStr'
						}];

				/** ******************************数据处理******************************** */

				HtmlUtil.overwrite(this.ids.accessoryReationViewListDiv, "",
						false);
				var jsonData = DataUtil
						.getDataFromArea(this.ids.accessoryReationContentDiv);

				var grid = this.create('component.DataGrid', {
					strServId : "accessoryReationHelper.getAccessoryRelationList",
					jsonData : jsonData,
					mapping : ['accrelationky', 'businessky', 'businessType',
							'creatorky', 'organCode', 'createDateStr',
							'accDesc', 'businessTypeStr'],
					columns : cm,
					heightPercent : 0.8,
					widthPercent : 0.98,
					renderTo : this.ids.accessoryReationViewListDiv,
					collapsible : false,
					checkbox : true,
					tbar : [{
								xtype : "tbfill"
							}, btn_accessoryReation_manage,
							btn_accessoryReation_delete]
				});
			}

		});