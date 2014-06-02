/**
 * 工作日志页面 <p/> 功能描述：
 * <li>初始化页面数据</li>
 * <li>初始化页面组件</li>
 * <li>生成word文档</li>
 * @author tangyingzhen
 * @since 2012-08-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.workLog.WorkLog",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/workLog/WorkLog.html",
	
							/**
							 * 初始化页面数据
							 * 
							 * @param
							 * @return
							 * @程序员：tangyingzhen
							 * @编码日期：2012-08-18
							 * @最后修改日期：
							 */ 
	initData : function(){
		var owner = this;
		HtmlUtil.getDom(owner.ids.objectId).value = owner.corpersonky;
		HtmlUtil.getDom(owner.ids.employeename).value = owner.name;
	},
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-08-18
	 * @最后修改日期：
	 */ 								
	initCmp:function(){
	    var owner = this;
		//开始时间
		ObjectUtil.create('component.DateField', {
			renderTo : this.ids.begintime,
			format : 'Y-m-d',
			width : 150
		});
		//结束时间
		ObjectUtil.create('component.DateField', {
			renderTo : this.ids.endtime,
			format : 'Y-m-d',
			width : 150
		});
		
		//面板
		this.create('component.Panel', {
			contentEl : this.ids.workLogContentDiv,
			renderTo : this.ids.workLogPanelDiv,
			hasBackGroundColor : true,
			heightPercent : 0.97,
			tbar : [ {
				xtype : 'tbfill'
			}, {
				text : '下载日志',
				tooltip : '下载工作日志文档', // 提示信息
				handler : function() {
					owner.downLoadWord();
				},
				iconCls : 'save' // 图标CSS
			}, '-' ]
		});
    },

    /**
	 * 生成word文档
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-08-18
	 * @最后修改日期：
	 */
	downLoadWord : function() {
		var owner = this;
		var jsonparam = DataUtil.getDataFromArea(owner.ids.workLogContentDiv);
		if (jsonparam != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
			ConnectionUtil.downloadReq({
				strServId : 'workLogService.getDownLoadWorkLog',
				jsonData : jsonparam
			});
			
		}
	}
});
