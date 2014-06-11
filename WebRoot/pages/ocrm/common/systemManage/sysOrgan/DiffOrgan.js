/**
 * 
 * 
 * <p/> ： 差异机构列表
 * <li>/li>
 * author:wuqihui
 * date:20130607
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.sysOrgan.DiffOrgan",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/sysOrgan/DiffOrgan.html",//页面地址
					/**
					 * 初始化頁面組件
					 * @param
					 * @return
					 */
					initCmp : function() {
						var owner = this;
						this.querySignList();
					},
					/**
					 * 查询列表方法 querySignList
					 * @param 
					 * @return
					 */
					querySignList : function() {
						var owner = this;
						// 清空列表区域
						HtmlUtil.overwrite(
								this.ids.riskAssessmentHistListContentDiv, "",
								false);
						//创建列表组建
						var grid = this
								.create(
										'component.DataGrid',
										{
											renderTo : this.ids.riskAssessmentHistListContentDiv,
											strServId : 'sysOrganManageService.getDiffOrgan',
											jsonData : {},
											noPaging : true,
											widthPercent : 1,
											heightPercent : 0.98,
											mapping : [ 'ensureType','createDatestr'],
											collapsible : false,
											checkbox : false,
											columns : [ {
												header : "差异机构号",
												sortable : true,
												dataIndex : 'ensureType',
												widthPercent : 0.3
											},{
												header : "日期",
												sortable : true,
												dataIndex : 'createDatestr',
												widthPercent : 0.3
											}]
										});
					}//完成查询方法		
				});