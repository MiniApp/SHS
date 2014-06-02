/**
 * 
 * 系统管理->AUM权重值列表
 * 
 * <p/> 功能描述：
 * 
 *
 * <li>增加AUM权重值</li>
 * 
 * author:蒋敏
 * 
 * date:2013-09-16
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.personParamter.AumwhightList",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/personParamter/AumwhightList.html",// 页面url地址
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
						this.queryAumHeavywhightList();
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
					 * 创建AUM权重参数查询
					 * 
					 * @return
					 * @程序员：蒋敏
					 * @编码日期：2013-09-16
					 * @最后修改日期：
					 */
					queryAumHeavywhightList : function() {
						var owner = this;
						HtmlUtil.overwrite(
								this.ids.aumHeavywhightListDisplayDiv, "",
								false);
						//创建列表组件
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.aumHeavywhightListDisplayDiv,
											strServId : 'aumHeavywhightService.searchAumHeavywhight',
											jsonData : {},
											mapping : [ 'aumheavywhightky',
													'aumheavywhightcode',
													'aumheavywhightname',
													'aumheavywhightvalue' ],
											collapsible : false,
											//checkbox : true,
											noPaging : true,
											heightPercent : 0.98,
											widthPercent : 1,
											title : 'AUM权重值查询结果',
											edit : true,
											columns : [
													{
														header : "AUM权重值名字",
														sortable : true,
														dataIndex : 'aumheavywhightname',
														widthPercent : 0.5
													},
													{
														header : "AUM权重值",
														sortable : true,
														dataIndex : 'aumheavywhightvalue',
														widthPercent : 0.52,
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
													var sumvalue = 0.00;//记录AUM权重值的和
													for ( var i = 0; i < rows.length; i++) {
														var value = parseFloat(rows[i]
																.get('aumheavywhightvalue'));
														sumvalue += value;
														if (owner
																.checknumber(rows[i]
																		.get('aumheavywhightvalue') + '')) {
															owner.initCmp();
															ExceptionUtil
																	.throwBusinessException( {
																		title : '提示信息',
																		msg : 'AUM权重值不合法，请输入一个0到2的数。'
																	});
															
														}
														ids[i] = {
															aumheavywhightky : rows[i]
																	.get('aumheavywhightky'),
															aumheavywhightcode : rows[i]
																	.get('aumheavywhightcode'),
															aumheavywhightname : rows[i]
																	.get('aumheavywhightname'),
															aumheavywhightvalue : parseFloat(rows[i]
																	.get('aumheavywhightvalue'))
														};

													}
													//                                   if(sumvalue!=1&&sumvalue!=(0.9999999999999999)&&sumvalue!=(1.0000000000000002)){
													//               							ExceptionUtil.throwBusinessException({
													//               										title : '提示信息',
													//               										msg : 'AUM权重值之和必须等于1!'
													//               									});
													//                                   }
													var params = {
														'aumheavywhightList' : ids
													};
													ConnectionUtil
															.ajaxReq( {
																strServId : "aumHeavywhightService.insertAumHeavywhight",
																jsonData : params,
																callback : function(
																		data) {
																	owner
																			.initCmp();
																}
															});
												}
											} ]
										});//grid 结束
					},
					checknumber : function(String) {
						var shu  =  Number(String.replace(/\,/g, ""));
						if(isNaN(shu)){
							return true;
						}else{
							if(shu>2||shu<0){
								return true;
							}
						}
						return false;
					}
				});