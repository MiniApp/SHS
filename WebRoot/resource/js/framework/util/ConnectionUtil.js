/**
 * ajax请求工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class ConnectionUtil
 */
ObjectUtil
		.define(
				"ConnectionUtil",
				{
					statics : {

						/**
						 * ajax请求方法
						 * 
						 * @param{Object} confg->strServId:要调用的后台服务方法
						 *                confg->jsonData:要传到给后台的json格式的数据
						 *                confg->inDataClass:如果后台服务方法接收的参数为list，需通过该参数指定list中存放的对象的全路径类名
						 *                confg->async:是否同步请求，false同步，true异步,默认为true
						 *                confg->callback 请求成功后回调的方法，传入后台返回的数据对象
						 *                confg->failure 失败后回调的方法，传入失败信息
						 * @example ConnectionUtil.ajaxReq({ strServId :
						 *          "outerCustomerService.deleteOuterCustomer",
						 *          jsonData : records, inDataClass :
						 *          "com.easy.ocrm.beans.customer.PersonCustomerListBean",
						 *          callback : function(data) {
						 *          owner.readyCustomerExternalList(); } });
						 */
						ajaxReq : function(config) {
							// 验证失败
							if (config['jsonData'] == Constants.VALIDATION_FAIL) {
								return;
							}
							var SYSTEM_EXCEPTION = '系统异常';
							var NO_RESPONSE = '无法获得相应内容,可能是请求超时!';
							if (config.async != false) {
								config.async = true;
							}
							if (config.submitWaitMessage != false) {
								config.submitWaitMessage = true;
							}
							if (config['jsonData']
									&& DataUtil.isObject(config['jsonData']))
								config['jsonData'] = Ext
										.encode(config['jsonData']);

							if (config['jsonData']
									&& DataUtil.isArray(config['jsonData']))
								config['jsonData'] = Ext
										.encode(config['jsonData']);
							// 带参数的请求
							if (!DataUtil.isEmpty(config['jsonData'])) {
								if (!config['inDataClass'])
									reqParams = {
										strServId : config['strServId'],
										jsonData : config['jsonData'],
										response : DataUtil
												.isEmpty(config['response']) ? 'json'
												: config['response']
									};
								else
									reqParams = {
										strServId : config['strServId'],
										jsonData : config['jsonData'],
										inDataClass : config['inDataClass'],
										response : DataUtil
												.isEmpty(config['response']) ? 'json'
												: config['response']
									};
							}
							// 不带参数的请求
							else {
								reqParams = {
									strServId : config['strServId'],
									response : DataUtil
											.isEmpty(config['response']) ? 'json'
											: config['response']
								};
							}
							var centerPanel = ObjectMgrUtil.get('centerPanel');
							var activeWindow = Ext.WindowManager.getActive();
							if (config.submitWaitMessage) {
								if (DataUtil.isEmpty(activeWindow)) {
									if (!DataUtil.isEmpty(centerPanel)) {
										Ext.get(
												centerPanel.getActiveTab()
														.getId()).mask(
												"请求中,请稍后...");
									}
								} else {
									if (!DataUtil.isEmpty(activeWindow.body)) {
										activeWindow.body.mask("请求中,请稍后...");
									}
								}
							}
							Ext.Ajax
									.request({
										disableCaching : true,
										url : Constants.AJAX_ACTION,
										params : reqParams,
										async : config.async,// false同步，true异步
										timeout : Constants.REQ_TIMEOUT,
										method : 'POST',
										success : function(xhr) {
											if (xhr.responseText
													.indexOf("请重新登录") != -1) {
												MsgUtil
														.error(
																"错误提示",
																"您的会话已经超时,或由于相同用户登录而被踢下线，请重新登录",
																function() {
																	location.href = Constants.CONTEXT_PATH
																			+ '/pages/ocrmLogin.html';
																});
												return;
											}
											if (config.submitWaitMessage) {
												if (DataUtil
														.isEmpty(activeWindow)) {
													if (!DataUtil
															.isEmpty(centerPanel)) {
														Ext
																.get(
																		centerPanel
																				.getActiveTab()
																				.getId())
																.unmask();
													}
												} else {
													if (!DataUtil
															.isEmpty(activeWindow.body)) {
														activeWindow.body
																.unmask();
													}
												}
											}
											if (xhr
													.getResponseHeader('C-Result-Status')
													&& xhr
															.getResponseHeader('C-Result-Status') != 600) {
												if (config['failure']) {
													config['failure']
															(xhr.responseText);
													return;
												}
												if (xhr
														.getResponseHeader('C-Result-Status') == 603) {
													MsgUtil.error("系统异常",
															xhr.responseText);
												} else if (xhr
														.getResponseHeader('C-Result-Status') == 602)
													MsgUtil.error("系统异常",
															xhr.responseText);

											} else {
												if (!DataUtil
														.isEmpty(config['callback'])) {
													if (xhr.responseText) {
														if (config['response'] == 'text') {
															config['callback']
																	(xhr.responseText);
														} else {
															config['callback']
																	(DataUtil
																			.decode(xhr.responseText));
														}
													} else
														config['callback']();
												}
											}
										},
										failure : function(xhr) {
											if (xhr.responseText&&xhr.responseText
													.indexOf("请重新登录") != -1) {
												MsgUtil
														.error(
																"错误提示",
																"您的会话已经超时,或由于相同用户登录而被踢下线，请重新登录",
																function() {
																	location.href = Constants.CONTEXT_PATH
																			+ '/pages/ocrmLogin.html';
																});
												return;
											}
											if (config.submitWaitMessage) {
												if (DataUtil
														.isEmpty(activeWindow)) {
													if (!DataUtil
															.isEmpty(centerPanel)) {
														Ext
																.get(
																		centerPanel
																				.getActiveTab()
																				.getId())
																.unmask();
													}
												} else {
													activeWindow.body.unmask();
												}
											}
											if (xhr.responseText) {
												MsgUtil.error(SYSTEM_EXCEPTION,
														NO_RESPONSE);
											} else {
												MsgUtil.error(SYSTEM_EXCEPTION,
														NO_RESPONSE);
											}
											if (config['failure']) {
												config['failure']
														(xhr.responseText);
											}
										}
									});
						},
						/**
						 * 根据url路径发送ajax请求方法
						 * 
						 * @param{Object} confg->url:请求路径
						 *                confg->async:是否同步请求，false同步，true异步,默认为true
						 *                confg->callback 请求成功后回调的方法，传入后台返回的数据对象
						 *                confg->failure 失败后回调的方法，传入失败信息
						 * @example ConnectionUtil.urlRequest({ url :
						 *          this.htmlUrl, async : false, callback :
						 *          function(responseText) { htmlContent =
						 *          responseText; }, failure : function(xhr) {
						 *          MsgUtil.error("错误提示", "加载页面失败") } });
						 */
						urlRequest : function(config) {
							if (config.async != false) {// 默认为异步
								config.async = true;
							}
							Ext.Ajax.request({
								disableCaching : true,
								url : config.url,
								async : config.async,
								timeout : Constants.REQ_TIMEOUT,
								success : function(xhr) {
									if (!DataUtil.isEmpty(config['callback'])) {
										if (xhr.responseText)
											config['callback']
													(xhr.responseText);
										else
											config['callback']();
									}
								},
								failure : function(xhr) {
									if (config['failure']) {
										config['failure'](xhr.responseText);
									}
								}
							});
						},
						/**
						 * 上传请求 callback:操作成功后的回调函数(必填) data:DataObject(必填)
						 * strServId：服务ID jsonData ：表单数据 formPanel ：表单对象
						 * //当有附件时，以上传附件的请求传递数据 ConnectionUtil.uploadReq( { data : {
						 * strServId : 'trackingItemService.create', jsonData :
						 * DataUtil.getDataFromArea(this.ids.panelContentId),
						 * formPanel : owner.uploadPanel,
						 * renderTo:owner.renderTo }, callback :
						 * function(obj,msg) { if (null != msg) {
						 * MsgUtil.error('系统提示', msg); } else { owner.cancel();
						 * MsgUtil.error('系统提示', '添加跟踪事项信息成功!'); } } });
						 */
						uploadReq : function(config) {
							if (config['data'].jsonData == Constants.VALIDATION_FAIL) {
								return;
							}
							var params = "strServId="
									+ config['data'].strServId
									+ "&response=text&uploadData="
									+ config['data'].jsonData;
							MsgUtil.mask(config['data'].renderTo, "数据提交中...");
							config['data'].formPanel
									.getForm()
									.submit(
											{
												url : Constants.UPLOAD_ACTION
														+ "?" + params,
												// params : params,
												method : 'POST',
												success : function(form, action) {
													MsgUtil
															.unmask(config['data'].renderTo);
													if (DataUtil
															.isEmpty(action.result.bizSuccess)) {// 从业务返回
														config['callback']
																(
																		action.result.obj,
																		action.result);
													} else {// 从框架返回
														config['callback']
																(
																		action.result.obj,
																		{
																			success : action.result.bizSuccess,
																			msg : action.result.msg
																		});
													}
												},
												failure : function(form, action) {
													MsgUtil
															.unmask(config['data'].renderTo);
													config['callback'](
															action.result.obj,
															action.result);
												}
											})
						},
						/**
						 * 下载请求
						 * 
						 * @param {}
						 *            config config->strServId 下载服务ID
						 *            config->jsonData JSON参数
						 * @example ConnectionUtil.downloadReq({ strServId :
						 *          'dicManagerService.export', jsonData :
						 *          DataUtil.getDataFromArea(this.ids.QuestionManagerRightContentSearchPanelDiv)
						 *          });
						 * 
						 */
						downloadReq : function(config) {
							if (!config) {
								ExceptionUtil.throwBusinessException({
									title : '提示信息',
									msg : '未传入配置参数'
								});
							} else if (Ext.isEmpty(config.strServId)) {
								ExceptionUtil.throwBusinessException({
									title : '提示信息',
									msg : '配置参数:strServId不能为空'
								});
							} else if (Ext.isEmpty(config.jsonData)) {
								ExceptionUtil.throwBusinessException({
									title : '提示信息',
									msg : '配置参数:jsonData不能为空'
								});
							}
							var downloadFrame = HtmlUtil
									.getDom('downloadIframe');
							if (!downloadFrame) {
								downloadFrame = Ext.DomHelper
										.append(Ext.getBody(),
												'<iframe width="0" height="0" frameborder="0" id="downloadIframe"></iframe>');
							}
							downloadFrame.src = Constants.AJAX_ACTION
									+ "?strServId=" + config.strServId
									+ "&response=download&jsonData="
									+ config.jsonData;
						},
						/**
						 * 报表请求
						 */
						reportReq : function(config) {
							if (!config) {
								ExceptionUtil.throwBusinessException({
									title : '提示信息',
									msg : '未传入配置参数'
								});
							} else if (Ext.isEmpty(config.frameId)) {
								ExceptionUtil.throwBusinessException({
									title : '提示信息',
									msg : '配置参数:frameId不能为空'
								});
							} else if (Ext.isEmpty(config.jsonData)) {
								ExceptionUtil.throwBusinessException({
									title : '提示信息',
									msg : '配置参数:jsonData不能为空'
								});
							}
							var reportFrame = HtmlUtil.getDom(config.frameId);
							if (!DataUtil.isObject(config.jsonData)) {
								config.jsonData = DataUtil
										.decode(config.jsonData);
							}
							var paramStrArray = [];
							for ( var key in config.jsonData) {
								paramStrArray.push(key + "="
										+ config.jsonData[key]);
							}
							reportFrame.src = Constants.REPORT_ACTION + "?"
									+ paramStrArray.join('&')

						},
						/**
						 * 上传请求 callback:操作成功后的回调函数(必填) data:DataObject(必填)
						 * strServId：服务ID jsonData ：表单数据 formPanel ：表单对象
						 * //当有附件时，以上传附件的请求传递数据 ConnectionUtil.uploadReq( { data : {
						 * strServId : 'trackingItemService.create', jsonData :
						 * DataUtil.getDataFromArea(this.ids.panelContentId),
						 * formPanel : owner.uploadPanel,
						 * renderTo:owner.renderTo }, callback :
						 * function(obj,msg) { if (null != msg) {
						 * MsgUtil.error('系统提示', msg); } else { owner.cancel();
						 * MsgUtil.error('系统提示', '添加跟踪事项信息成功!'); } } });
						 */
						uploadDownReq : function(config) {
							if (config['data'].jsonData == Constants.VALIDATION_FAIL) {
								return;
							}
							var params = "strServId="
									+ config['data'].strServId
									+ "&response=jsonDownload&uploadData="
									+ config['data'].jsonData;
							MsgUtil.mask(config['data'].renderTo, "请求中,请稍后...");
							config['data'].formPanel
									.getForm()
									.submit(
											{
												url : Constants.UPLOAD_ACTION
														+ "?" + params,
												method : 'POST',
												success : function(form, action) {
													if (DataUtil
															.isEmpty(action.result.bizSuccess)) {// 从业务返回
														config['callback']
																(
																		action.result.obj,
																		action.result);
													} else {// 从框架返回
														config['callback']
																(
																		action.result.obj,
																		{
																			success : action.result.bizSuccess,
																			msg : action.result.msg
																		});
													}
												},
												failure : function(form, action) {
													config['callback'](
															action.result.obj,
															action.result);
												}
											});
							MsgUtil.unmask(config['data'].renderTo);
						}
					}
				});