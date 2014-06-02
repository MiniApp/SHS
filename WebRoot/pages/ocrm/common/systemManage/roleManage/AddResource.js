/**
 * 分配资源页面 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存角色资源</li>
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.roleManage.AddResource", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/roleManage/AddResource.html",// 页面url地址
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	initCmp : function() {
		var owner = this;
		//创建树
		this.resourceControlTree = this.createResourceTree({
			title : '',
			renderTo : this.ids.resoureTreeDiv,
			strServId : 'resourceTreeService.getSubResourceControl',
			paramStr :  this.roleid,
			multiple : true,
			expandAll : true,
			widthPercent : 0.97,
			height : 500,
			nodeClick : function(data) {
				
			}
		});
		//创建面板
		this.create('component.Panel',{
			id : 'addResource',
			title : '资源树',
			autoScroll : false,
			collapsible : true,
			renderTo : this.ids.resourcePanelDiv,
			contentEl : this.ids.resoureTreeDiv, 
			hasBackGroundColor : false,
			widthPercent : 0.97,
			tbar : [{
				text : '权限维护',
				tooltip : '保存分配资源信息', // 提示信息
				handler : function() {
					owner.addResourceControl();
				},
				iconCls : 'save' // 图标CSS
			}]
		});
	},
	

	/**
	 * 保存角色资源
	 * 
	 * @param
	 * @return
	 * @程序员：tangyingzhen
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	addResourceControl : function() {
		var owner = this;
		var nodes = this.resourceControlTree.getCheckedNodes();
		var roleid = this.roleid;
		var checkedNodes = [];
		DataUtil.each(nodes,function(data){
			var node = {};
			node['resourceId'] = data['id'];
			node['roleid'] = roleid;
			checkedNodes.push(node);
		});
		var jsonData = {};
		if(checkedNodes.length == 0){
			MsgUtil.alert("提示","请先选择资源!");
			return ;
		}
		jsonData['resourceControlBeanList'] = checkedNodes;
		jsonData['roleid'] = this.roleid;
		ConnectionUtil.ajaxReq({// 发送ajax请求
			strServId : "resourceTreeService.updateUpIdResourceControl",
			jsonData : DataUtil.encode(jsonData),
			callback : function(msg) {
				MsgUtil.alert("提示", "保存成功!");
				owner.parent.close();// 关闭窗口
			}
		});
	}
});