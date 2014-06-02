/**
 * 
 * 系统管理->参数设置->联系策略列表
 * 
 * <p/> 功能描述：
 * 
 * <li>增加联系策略</li>
 * 
 * 
 * author:蒋敏
 * 
 * date:2013-09-16
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.personParamter.PersonContactPolicyList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/personParamter/PersonContactPolicyList.html",// 页面url地址
					/**
					 * 初始数据
					 * 
					 * @param
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					initData : function() {

					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					initCmp : function() {
						this.querypersonContactPolicyList();
					},
					/**
					 * 初始化事件监听
					 * 
					 * @param
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					initEvent : function() {

					},
					/**
					 * 创建联系策略查询
					 * 
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					querypersonContactPolicyList : function() {
						var owner = this;
						HtmlUtil.overwrite(
								this.ids.personContactPolicyListDisplayDiv, "",
								false);
						//创建列表组件
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.personContactPolicyListDisplayDiv,
											strServId : 'personContactPolicyService.searchContactPolicy',
											jsonData : {},
											mapping : [ 'contacttimes',
													'customerlevel',
													'customerlevelname',
													'phonecontacttimes',
													'contactpolicysubky' ],
											collapsible : false,
											//checkbox : true,
											noPaging : true,

											widthPercent : 1,
											title : '联系策略结果',
											edit : true,
											columns : [
													{
														header : "客户等级名字",
														sortable : true,
														dataIndex : 'customerlevelname',
														widthPercent : 0.33
													},
													{
														header : "面谈联系次数",
														sortable : true,
														dataIndex : 'contacttimes',
														widthPercent : 0.33,
														edit : true
													},
													{
														header : "电话联系次数",
														sortable : true,
														dataIndex : 'phonecontacttimes',
														widthPercent : 0.33,
														edit : true
													} ],
											tbar : [ {
												text : '提交',
												tooltip : '提交',
												iconCls : 'add',
												handler : function() {
													var rows = grid
															.getAllRecords();//得到所有的记录

													var ids = [];
													var reg = /^[0-9]*$/;

													for ( var i = 0; i < rows.length; i++) {

														if ((rows[i]
																.get('contacttimes') + '') != ""
																&& !reg
																		.test(rows[i]
																				.get('contacttimes') + '')) {
															MsgUtil
																	.error(
																			'页面验证出错',
																			'面谈联系次数只能是正整数');
															owner.initCmp();
															owner.initCmp();
															return;
														}
														if ((rows[i]
																.get('contacttimes') + '').length > 2) {
															MsgUtil
																	.error(
																			'页面验证出错',
																			'面谈联系次数的不能超过100');
															return;
														}
														if ((rows[i]
																.get('phonecontacttimes') + '') != ""
																&& !reg
																		.test(rows[i]
																				.get('phonecontacttimes') + '')) {
															MsgUtil
																	.error(
																			'页面验证出错',
																			'电话联系次数只能是正整数');
															owner.initCmp();
															return;
														}
														if ((rows[i]
																.get('phonecontacttimes') + '').length > 2) {
															MsgUtil
																	.error(
																			'页面验证出错',
																			'电话联系次数不能超过100');
															owner.initCmp();
															return;
														}
														ids[i] = {
															contactpolicysubky : rows[i]
																	.get('contactpolicysubky'),
															customerlevel : rows[i]
																	.get('customerlevel'),
															customerlevelname : rows[i]
																	.get('customerlevelname'),
															contacttimes : parseInt(rows[i]
																	.get('contacttimes') + ''),
															phonecontacttimes : parseInt(rows[i]
																	.get('phonecontacttimes') + '')
														};

													}
													var params = {
														'layerList' : ids
													};
													ConnectionUtil
															.ajaxReq( {
																strServId : "personContactPolicyService.insertContactPolicy",
																jsonData : params,
																callback : function(
																		data) {
																	owner.initCmp();
																}
															});
												}
											} ]
										});//grid 结束
					}
				});