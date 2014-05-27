/**
 * UploadPanel组件 生成文件选择输入控件,实现了多个文件输入域的自由增删,并带有文件格式,及文件名长度验证功能
 * 
 * @author DuanYong
 * @version 1.0
 * @since 2012-07-19
 * @class component.UploadPanel
 * @extends base.AbstractComponent
 * @constructor
 * @example this.create('component.UploadPanel', { renderTo :
 *          this.ids.uploadDiv, contentEl : this.ids.uploadContentDiv, multiple :
 *          true, height : 200, contentHeight : 0, strServId :
 *          'accessoryHelper.uploadAccessory', uploadCallBack : function(osbj,
 *          msg) { if (!msg.success) { owner.parent.close();
 *          MsgUtil.error('系统提示', msg.msg); } else { owner.parent.close();
 *          MsgUtil.alert('系统提示', '上传成功!'); } } });
 * 
 */
Ext
		.define(
				'component.UploadPanel',
				{
					extend : 'base.AbstractComponent',
					alias : 'widget.UploadPanel',
					type : 'UploadPanel',
					/**
					 * 组件渲染ID,必填
					 * 
					 * @type String
					 */
					renderTo : '',
					/**
					 * 服务ID,必填
					 * 
					 * @type String
					 */
					strServId : '',
					/**
					 * 附加json数据
					 * 
					 * @type
					 */
					applyJsonData : null,
					/**
					 * 是否自动滚动条,默认false
					 * 
					 * @type Boolean
					 */
					autoScroll : false,
					/**
					 * 是否允许多文件上传,默认false
					 * 
					 * @type Boolean
					 */
					multiple : false,
					/**
					 * 上传控件是否允许为空,默认true
					 * 
					 * @type Boolean
					 */
					allowBlank : true,
					/**
					 * 是否可折叠,默认false
					 * 
					 * @type Boolean
					 */
					collapsible : false,
					/**
					 * 是否可关闭,默认false
					 * 
					 * @type Boolean
					 */
					closable : false,
					/**
					 * 内容渲染到的Dom的id
					 * 
					 * @type String
					 */
					contentEl : '',
					/**
					 * 按钮
					 * 
					 * @type Array
					 */
					buttons : null,

					/**
					 * 监听事件对象
					 * 
					 * @type Object
					 */
					listeners : null,
					/**
					 * 文件输入框的长度，默认400
					 * 
					 * @type Number
					 */
					inputWidth : 360,
					/**
					 * 内容高度
					 * 
					 * @type Number
					 */
					contentHeight : 300,
					/**
					 * 标题
					 * 
					 * @type String
					 */
					title : '',
					/**
					 * 布局中的位置
					 * 
					 * @type String
					 */
					region : '',
					/**
					 * 上传输入框按钮显示文字
					 * 
					 * @type String
					 */
					buttonText : '浏览...',
					/**
					 * 上传输入框名称
					 * 
					 * @type String
					 */
					inputFileName : 'accessoryFileName',
					/**
					 * 允许的上传类型,数组
					 * 
					 * @type Array
					 */
					types : null,
					/**
					 * 允许的文件名称总长度，默认40
					 * 
					 * @type Number
					 */
					maxFileNameLength : 40,
					panelHeight : null,
					/**
					 * 上传回调方法
					 */
					uploadCallBack : Ext.emptyFn(),
					/**
					 * 验证回调方法
					 */
					validateCallBack : null,
					/**
					 * 支持下载,默认false
					 * 
					 * @type Boolean
					 */
					download : false,
					/**
					 * 待上传的文件字符串
					 * 
					 * @type
					 */
					_uploadFiles : null,
					constructor : function(config) {
						Ext.apply(this, config);
						this.callParent();
					},
					/**
					 * 参数校验
					 * 
					 * @Override
					 */
					checkConfig : function() {
						if (Ext.isEmpty(this.renderTo)) {
							ExceptionUtil.throwFramworkException({
								title : '参数错误',
								msg : '参数：renderTo必须传入值!'
							});
						}
					},
					/**
					 * 组件创建前处理
					 * 
					 * @Override
					 */
					beforeBuild : function() {
						var me = this;
						if (!this.types) {
							this.types = [ 'txt', 'pdf', 'doc', 'xls', 'xlsx',
									'docx', 'rar', 'zip', 'ppt', 'pptx','bmp','jpg','jpeg','png' ];
						}
						if (!Ext.isFunction(this.validateCallBack)) {
							this.validateCallBack = function() {
								return true;
							}
						}

						this._uploadFiles = "";
					},
					/**
					 * 构建组件
					 * 
					 * @Override
					 */
					build : function() {
						var me = this;
						// 内容面板
						var contentPanel = Ext.create('Ext.panel.Panel', {
							contentEl : this.contentEl,
							autoDestroy : true,
							title : this.title,
							height : this.contentHeight
						});
						var addConfig = function(id) {
							var id = "uploadField-" + id;
							return {
								xtype : 'fieldcontainer',
								id : id,
								width : me.inputWidth + 70,
								combineErrors : true,
								msgTarget : 'under',
								items : [
										{
											xtype : "filefield",
											name : me.inputFileName,
											fieldLabel : "请选择文件",
											labelWidth : 80,
											width : me.inputWidth - 20,
											msgTarget : "side",// 错误信息的显示
											allowBlank : true,
											buttonText : me.buttonText,
											listeners : {
												change : function() {
													if (!Ext
															.isEmpty(
																	this.value
																			.replace(
																					/\s*/g,
																					""),
																	false)
															&& !me
																	.validate(this.value)) {
														formPanel.remove(Ext
																.getCmp(id));
														formPanel
																.add(addConfig(i++));
													}
												}
											}

										},
										{
											xtype : 'button',
											text : '删除',
											hidden : !me.multiple,
											iconCls : 'delete',
											handler : function() {
												formPanel
														.remove(Ext.getCmp(id));
											}
										} ]
							};
						};
						var i = 0;
						this.tbar = null;
						if (this.multiple) {
							this.tbar = [ {
								text : '添加',
								iconCls : 'form-add',
								handler : function() {
									me.extObject.add(addConfig(i++));
								}
							} ]
						}
						// form面板
						var formPanel = Ext.create('Ext.form.Panel', {
							autoScroll : true,
							height : this.height - this.contentHeight - 50,
							defaults : {
								labelWidth : 89,
								layout : {
									type : 'hbox',
									defaultMargins : {
										top : 0,
										right : 5,
										bottom : 0,
										left : 0
									}
								}
							},
							autoDestroy : true,
							items : [ addConfig(i++) ],
							tbar : this.tbar
						});
						this.populateButtons(formPanel);
						Ext.create("Ext.panel.Panel", {
							id : this.id,
							region : this.region,
							frame : false,
							autoDestroy : true,
							width : this.width,
							height : this.height,
							autoScroll : this.autoScroll,
							collapsible : this.collapsible,
							closable : this.closable,
							renderTo : this.renderTo,
							listeners : this.listeners,
							bodyPadding : 0,
							bbar : this.buttons,
							items : [ contentPanel, formPanel ]

						});
						this.extObject = formPanel;
					},
					/**
					 * 提交数据
					 * 
					 * @param {}
					 *            strServId
					 * @param {}
					 *            jsonData
					 */
					submit : function(strServId, jsonData) {
						var owner = this;
						if (this.extObject.getForm().isValid()) {
							if (!me.allowBlank) {
								var fileDoms = document
										.getElementsByName(me.inputFileName);
								for ( var i = 0; i < fileDoms.length; i++) {
									if (DataUtil.isEmpty(fileDoms[i].value)) {
										MsgUtil.error("错误提示", "请选择文件");
										return;
									}
								}
							}
							ConnectionUtil.uploadReq({
								data : {
									strServId : strServId,
									jsonData : jsonData,
									formPanel : this.extObject,
									renderTo : owner.renderTo
								},
								callback : function(obj, msg) {
									if (owner.uploadCallBack) {
										owner.uploadCallBack(obj, msg);
									}
									me._uploadFiles = "";
								}
							});
						}
					},
					/**
					 * 组装按钮
					 * 
					 * @private
					 */
					populateButtons : function(formPanel) {
						var me = this;
						var newButtons = [ '->' ];
						newButtons
								.push({
									text : '提交',
									iconCls : 'form-save',
									handler : function() {
										if (formPanel.getForm().isValid()) {
											if (!me.allowBlank) {
												var fileDoms = document
														.getElementsByName(me.inputFileName);
												for ( var i = 0; i < fileDoms.length; i++) {
													if (DataUtil
															.isEmpty(fileDoms[i].value)) {
														MsgUtil.error("错误提示",
																"请选择文件");
														return;
													}
												}
											}
											var jsonData = DataUtil
													.getDataFromArea(me.contentEl);
											if (jsonData == Constants.VALIDATION_FAIL) {
												return;
											}
											jsonData = DataUtil
													.decode(jsonData);
											jsonData = ObjectUtil.applyIf(
													jsonData, me.applyJsonData);
											var paramObj = {
												data : {
													strServId : me.strServId,
													renderTo : me.renderTo,
													jsonData : DataUtil
															.encode(jsonData),
													formPanel : formPanel
												},
												callback : function(obj, msg) {
													if (me.uploadCallBack) {
														me.uploadCallBack(obj,
																msg);
													}
													me._uploadFiles = "";
												}
											};
											if (me.download) {
												ConnectionUtil
														.uploadDownReq(paramObj);
											} else {
												ConnectionUtil
														.uploadReq(paramObj);
											}

										}
									}
								});
						DataUtil.each(this.buttons, function(button) {
							var newButton = {};
							newButton.iconCls = button.iconCls;
							newButton.text = button.text;
							newButton.id = button.id;
							newButton.tooltip = button.tooltip;
							newButton.handler = button.handler;
							newButtons.push(newButton);
							newButtons.push('-');
						});

						this.buttons = newButtons;
					},
					/**
					 * 文件格式校验
					 * 
					 * @param {}
					 *            filePath 文件路径 说明：如果指定了文件格式则校验之，否则返回true
					 * @return {Boolean} 是否在文件指定的格式中
					 * @private
					 */
					validate : function(filePath) {
						// 文件名是否重复校验
						if (!this.checkFileName(filePath)) {
							MsgUtil
									.error('错误信息提示', '文件:' + filePath
											+ '您已经选择了');
							return false;
						}
						// 文件名长度校验
						if (!this.checkFileNameLength(filePath)) {
							MsgUtil.error('错误信息提示', '文件名称总长度超过:'
									+ this.maxFileNameLength);
							return false;
						}
						// 文件格式校验
						if (!this.checkFileType(this.getFileType(filePath))) {
							MsgUtil.error('错误信息提示', '文件类型不正确,允许的文件类型为:'
									+ this.types,function(){},450);
							return false;
						}
						if (!this.validateCallBack(filePath)) {
							return false;
						}
						return true;
					},
					/**
					 * 文件名是否重复校验
					 * 
					 * @param {}
					 *            filePath
					 * @return {Boolean}
					 */
					checkFileName : function(filePath) {
						if (this._uploadFiles.indexOf(filePath) != -1) {
							return false;
						} else {
							this._uploadFiles = this._uploadFiles + filePath;
						}
						return true;
					},
					/**
					 * 文件名长度校验 说明：如果指定了文件名长度则校验
					 * 
					 * @return {Boolean} 未超过指定长度 返回TRUE
					 * @private
					 */
					checkFileNameLength : function(filePath) {
						if (this.maxFileNameLength) {
							return this.getFileNameLength(filePath) <= this.maxFileNameLength ? true
									: false
						}
						return true;
					},
					/**
					 * 文件格式校验 说明：如果指定了文件格式则校验之
					 * 
					 * @return {Boolean} 是否在文件指定的格式中,存在返回true
					 * @private
					 */
					checkFileType : function(fileType) {
						if (this.types) {
							var haveType = false;
							for ( var i = 0; i < this.types.length; i++) {
								if (this.types[i].toUpperCase() == fileType
										.toUpperCase()) {
									haveType = true;
									break;
								}
							}
							return haveType;
						}
						return true;
					},
					/**
					 * 取得文件类型 说明：如果文件路径不为空，则返回文件类型，否则返回空
					 * 
					 * @param {}
					 *            filePath 文件路径
					 * @return {String} 文件类型
					 * @private
					 */
					getFileType : function(filePath) {
						if (!Ext.isEmpty(filePath, false)) {
							return filePath.substring(
									filePath.lastIndexOf('.') + 1,
									filePath.length);
						}
						return '';
					},
					/**
					 * 取得文件名长度 说明：如果文件路径不为空，则返回文件长度，否则返0
					 * 
					 * @param {}
					 *            filePath 文件路径
					 * @return {String} 文件类型
					 * @private
					 */
					getFileNameLength : function(filePath) {
						if (!Ext.isEmpty(filePath, false)) {
							return filePath.length - filePath.lastIndexOf("\\")
									- 1;
						}
						return 0;
					}

				});