/**
 * 附件管理公共组件类 对公,对私共用此组件
 * 
 * @author DuanYong
 * @since 2012-07-27
 * @class business.accessory.AccessoryManage
 * @extends base.PageObject 参数： accrelationky:关联关系主键 businessky : 业务主键
 *          businessType ：业务类型 allowUpload:是否允许上传(false:不显示上传按钮),默认true
 *          allowDownload:是否允许下载(false:不显示下载按钮),默认true
 *          allowDelete:是否允许删除(false:不显示删除按钮),默认true
 *          allowDeleteAll:是否允许删除全部(false:只能查看删除上传的),默认true
 *          allowViewAll:是否允许查看全部(false:只能查看自己上传的),默认true,
 *          types : 允许上传的类型,默认['txt', 'pdf', 'doc', 'xls', 'xlsx', 'docx', 'rar',
							'zip', 'ppt']
 * 
 */
ObjectUtil.define("business.accessory.AccessoryManage", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH
			+ "/pages/ocrm/common/component/accessory/AccessoryManage.html",
	initData : function() {
		var owner = this;
		if (!this.accrelationky) {
			if (!this.businessType) {
								MsgUtil.error("错误提示", '业务类型不允许为空!');
								return;
			}
			// 如果是对公商圈分析报告模板,对私服务管理问卷调查,主题活动,财富,商圈
			if (CodeStringDefinition.BUSINESS_TYPE_CORPORATE_BUSGROUP_REPORT_TEMPLATE == this.businessType
					|| CodeStringDefinition.BUSINESS_TYPE_PERSON_SERMANAGE_INQ == this.businessType
					|| CodeStringDefinition.BUSINESS_TYPE_PERSON_SERMANAGE_THEME == this.businessType
					|| CodeStringDefinition.BUSINESS_TYPE_PERSON_SERMANAGE_WEALTH == this.businessType
					|| CodeStringDefinition.BUSINESS_TYPE_PERSON_SERMANAGE_BUSGROUP == this.businessType) {
				this.businessky = 0;
			} else if (!this.businessky) {
								MsgUtil.error("错误提示", '业务主键不允许为空!');
								return;
			}
			var jsonData = {
				businessky : this.businessky,
				businessType : this.businessType
			};
			ConnectionUtil.ajaxReq({
						strServId : "accessoryReationHelper.getAccessoryRelationInfo",
						jsonData : jsonData,
						callback : function(data) {
							owner.accrelationky = data.accrelationky;
						}
					});
		}
		// 权限控制
		this.authority = [this.allowUpload ? true : false, this.allowDownload ? true : false,
				this.allowDelete ? true : false, this.allowDeleteAll ? true : false,
				this.allowViewAll ? true : false];
	},
	initCmp : function() {
		/** ******************************页面控件渲染******************************** */
		this.accessoryList();
		/** ******************************页面按钮定义******************************** */
	},
	initEvent : function() {

	},
	/**
	 * 附件列表
	 */
	accessoryList : function() {
		var owner = this;
		/** ******************************定义页面功能按钮******************************** */
		// 下载按钮
		var btn_download_accessory = {
			text : '下载',
			iconCls : 'download',
			tooltip : '下载附件', // 提示信息
			handler : function() {
				var rows = grid.getSelectRecords();
				if (rows.length < 1) {
									MsgUtil.error("错误提示", '请选择一条记录!');
									return;
				} else if (rows.length > 1) {
									MsgUtil.error("错误提示", '只能选择一条记录!');
									return;
				} else {
					var record = rows[0];
					var jsonData;
					jsonData = {
						"accessoryky" : record.get('accessoryky')
					};
					ConnectionUtil.downloadReq({
								strServId : 'accessoryHelper.export',
								jsonData : DataUtil.encode(jsonData)
							});
				}

			}
		};
		// 上传附件按钮
		var btn_upload_accessory = {
			text : '上传',
			iconCls : 'upload',
			tooltip : '上传附件', // 提示信息
			handler : function() {
				owner.createWin();
			}
		};

		// 删除按钮
		var btn_delete_accessory = {
			text : '删除',
			iconCls : 'delete', // 图标CSS
			tooltip : '删除附件', // 提示信息
			handler : function() {
				var rows = grid.getSelectRecords();
				if (rows.length < 1) {
					ExceptionUtil.throwBusinessException({
								title : '提示信息',
								msg : '请选择一条记录!'
							});
				} else if (rows.length >= 1) {
					var ids = [];
					for (var i = 0; i < rows.length; i++) {
						// 只删除当前操作员上传的附件
						if (!owner.authority[3]) {
							if (DataUtil.getUserInfo().objectId != rows[i]
									.get('creatorky')) {
								ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '没有权限删除附件:'
													+ rows[i].get('name')
										});
							}
						}
						ids[i] = rows[i].get('accessoryky');
					}

					MsgUtil.confirm("确认消息框", "是否确定对选中的行进行删除操作，删除后不能够恢复！",
							function(btn, txt) {
								if (btn == "yes"){
									var params = {
										'accessoryKyList' : ids
									};
									ConnectionUtil.ajaxReq({
										strServId : "accessoryHelper.deleteAccessory",
										jsonData : params,
										callback : function(data) {
											owner.accessoryList();
										}
									});

								}
							});
				}
			}
		};
		var tbar = [{
					xtype : "tbfill"
				}];
		// 允许上传
		if (this.authority[0]) {
			tbar.push(btn_upload_accessory);
		}
		// 允许下载
		if (this.authority[1]) {
			tbar.push(btn_download_accessory);
		}
		// 允许删除
		if (this.authority[2]) {
			tbar.push(btn_delete_accessory);
		}

		/** ******************************定义页面数据显示******************************** */

		// 数据绑定列
		var cm = [{
					header : '附件名称',
					sortable : true,
					width : 180,
					dataIndex : 'name'
				}, {
					header : '发布人',
					sortable : true,
					width : 180,
					dataIndex : 'updateUser'
				}, {
					header : '附件类型',
					sortable : true,
					width : 160,
					dataIndex : 'type'
				}, {
					header : '上传时间',
					sortable : true,
					width : 150,
					dataIndex : 'createDateStr'
				}];

		/** ******************************数据处理******************************** */

		HtmlUtil.overwrite(this.ids.accessoryViewListDiv, "", false);
		var jsonData = {};
		if (this.accrelationky) {
			jsonData = {
				accrelationky : this.accrelationky
			};
		} else {
			jsonData = {
				businessky : this.businessky,
				businessType : this.businessType
			};
		}
		// 只查看当前操作员上传的附件
		if (!this.authority[4]) {
			ObjectUtil.apply(jsonData, {
						creatorky : DataUtil.getUserInfo().objectId
					});
		}

		var grid = this.create('component.DataGrid', {
					strServId : "accessoryReationHelper.getAccessoryList",
					jsonData : jsonData,
					mapping : ['accessoryky', 'updateUser', 'createDateStr',
							'type', 'name', 'path','creatorky'],
					columns : cm,
					heightPercent : 0.98,
					widthPercent : 0.98,
					renderTo : this.ids.accessoryViewListDiv,
					collapsible : false,
					checkbox : true,
					tbar : tbar
				});
	},
	createWin : function() {
		var me = this;
		this.win = this.create('component.Window', {
					title : '上传附件<font color=red>(文件总大小不能超过50M)</font>',
					closable : true,
					draggable : true,
					resizable : true,
					width : 500,
					height : 245,
					modal : true,
					pageObject : this.create('business.accessory.Upload', {
								id : 'accessoryUpload',
								accrelationky : this.accrelationky,
								businessky : this.businessky,
								businessType : this.businessType,
								types : this.types
							})
				});
		this.win.on('close', function() {
					me.accessoryList();// 窗口关闭后刷新列表
				});
	},
	close : function() {
		this.win.close();
	}

});