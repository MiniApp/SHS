/**
 * 
 * 客户调整--分配协办客户经理-选择客户经理
 * 
 * <p/> 功能描述：
 * 
 * <li>选择所辖客户经理</li>
 * 
 * author:zhouyangsen
 * 
 * date:2012-03-01
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.customer.searchEngine.AssistEmployeeAllocation",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/customer/searchEngine/AssistEmployeeAllocation.html",//页面地址
					/**
					 * 初始化頁面組件
					 * @param
					 * @return
					 */
					initCmp : function() {
						var owner = this;
						this.create('component.DateField', {
							renderTo : this.ids.execyteDay,
							format : 'd'
						});
						// 创建panel
						this.create('component.Panel', {
									title : '',
									renderTo : this.ids.employeeSelectDIV,
									contentEl : this.ids.employeeSelectDIVContent,
									collapsible : false,
									widthPercent : 0.98,
									heightPercent : 1,
									hasBackGroundColor : true,	
									buttons : [{
												text : '确定',
												iconCls : 'save',
												handler : function() {
													owner.batchCustomerList(); //查询列表
												}
											}]//buttons 结束
								}//function 结束 
						);//cteate 结束
					},
					/**
					 * 持久化批量数据 batchCustomerListr
					 * @param 
					 * @return
					 */
					batchCustomerList : function() {
						var owner = this;
						var data = DataUtil.getDataFromArea(this.ids.employeeSelectDIVContent);
						
						ConnectionUtil.ajaxReq({
							strServId : "corpCustomerListService.addAllCorprateSearchEngin",
							jsonData : data,
							callback : function() {
									MsgUtil.alert("提示", "新增成功！");
									owner.parent.close();// 关闭窗口
							}
						});
					
			 }
});