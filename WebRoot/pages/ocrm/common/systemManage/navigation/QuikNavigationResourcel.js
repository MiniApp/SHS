/**
 * 菜单自定义页面 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>保存选择的资源</li>
 * 
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.navigation.QuikNavigationResourcel",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/navigation/QuikNavigationResourcel.html",// 页面url地址
		/*
		 * 初始化页面数据
		 */
		initData : function() {
			var owner = this;
			ConnectionUtil.ajaxReq( {
				strServId : "quikNavigationResourcelService.getQuikNavigations",
				jsonData : {},
				callback : function(datas) {
					var cheMenusName='';
					var checkedIds='';
					var coefficientky=0;
					if(datas){
						DataUtil.each(datas, function(data) {
							coefficientky=data.coefficientky;
							checkedIds+=data.resourceid+',';
							cheMenusName+=''+'\n'+data.resourcename+'\n';
						});
						//如果是对公或对私的系统管理员，则不加载快捷导航菜单
						HtmlUtil.getDom(owner.ids.coefficientky).value=coefficientky;
						HtmlUtil.getDom(owner.ids.resourceids).value=checkedIds; 
						HtmlUtil.getDom(owner.ids.checkedResoure).value=cheMenusName; 
					}
					
				}
			});
			owner.chirldMenu=[];
			DataUtil.each(DataUtil.getUserMenu(),function(menu){
				var item={};
				item.id=menu.id;
				item.text=menu.resourceName;				
				if(!DataUtil.isEmpty(menu.resourceControlBeanList)){
					item.leaf=false;
					item.cls='feeds-node';
					item.children=owner.populateNaviChild(menu);
				}else{
					item.cls='feed';
					item.icon=Constants.CONTEXT_PATH+'/resources/images/icons/table_go.png';
					item.leaf=true;
				}	
				owner.chirldMenu.push(item);
			});
			
		},/**
		 * 初始化页面组件
		 * @param
		 * @return
		 * @程序员：冉辉
		 * @编码日期：2013-04-17
		 * @最后修改日期：
		 */
		initCmp : function() {
			var owner = this;
			owner.checkedMenu='';
			owner.cheMenu='';			
			this.create('component.Panel',{
				title : '快捷导航列表',
				renderTo : this.ids.initCheckedResoureDiv,
				contentEl : this.ids.checkedResoureDiv,
				collapsible : false,
				margin : '0 0 0 10',
				widthPercent : 0.495,
				heightPercent : 0.97,
				hasBackGroundColor : true,
				buttons : [ {
					text : '保存',
					iconCls : 'save',
					handler : function() {
						owner.addResourceControl();
					}
				},{
					text : '清除',
					iconCls : 'delete',
					handler : function() {
						owner.delResourceControl();
					}
				} ]
			});
			// 创建树
			this.initResourceTree = this.create("component.SimpleTree", {
				renderTo : this.ids.initResoureTreeDiv,
				children : owner.chirldMenu,
				rootId : 'usResource',// id不能变，后面要引用到
				rootText : '条件树',
				fields : ['id', 'text', 'data'],
				expandAll : false,
				margin : '10 10 10 10',
				widthPercent : 0.455,
				heightPercent : 0.98,
				nodeClick : function() {
					var data=this.data[0];
					if(data.leaf!=true){
						return;
					}
					if(DataUtil.isEmpty(owner.checkedMenu)){					
						var checkedMenu=HtmlUtil.getDom(owner.ids.resourceids).value;
						var cheMenu=HtmlUtil.getDom(owner.ids.checkedResoure).value;
						if(!DataUtil.isEmpty(checkedMenu)){
							owner.checkedMenu=checkedMenu;
							owner.cheMenu=cheMenu;
						}
					}
					if(owner.checkedMenu.indexOf(data.id)!=-1){
						MsgUtil.alert('系统提示','您已经选择了它，不能再次选择了.....');
						return;
					}else{
						if((owner.checkedMenu.split(',').length-1)>=10){
							MsgUtil.alert('系统提示','快捷导航只能配置10个，且包含10个');
							return;
						}
						owner.checkedMenu+=data.id+',';
						owner.cheMenu+=''+'\n'+data.text+'\n';
						HtmlUtil.getDom(owner.ids.checkedResoure).value=owner.cheMenu; 
						owner.index++;
					}
				}
			});		

		},
		/**
		 * 保存选择的资源
		 * 
		 * @param
		 * @return
		 * @程序员：冉辉
		 * @编码日期：2013-04-17
		 * @最后修改日期：
		 */
		addResourceControl : function() {
			var owner = this;
			var cientky=HtmlUtil.getDom(owner.ids.coefficientky).value;
			if(DataUtil.isEmpty(cientky)){
				if(DataUtil.isEmpty(owner.checkedMenu)){
					MsgUtil.alert('系统提示','请选择需要配置的快捷导航');
					return;
				}
				
			}
			HtmlUtil.getDom(owner.ids.resourceids).value=owner.checkedMenu;
			if(owner.checkedMenu.lastIndexOf(',')!=-1){
				owner.checkedMenu=owner.checkedMenu.substring(0, owner.checkedMenu.lastIndexOf(','));
			}
			if(owner.checkedMenu.split(',').length>10){
				MsgUtil.alert('系统提示','快捷导航只能配置10个，且包含10个');
				return;
			}
			var jsonData = {};
			if(!DataUtil.isEmpty(cientky)){
				jsonData['coefficientky'] = cientky;
			}
			jsonData['resourceids'] = owner.checkedMenu;
			//获取公告内容
			ConnectionUtil.ajaxReq( {
				strServId : "quikNavigationResourcelService.editQuikNavigations",
				jsonData : DataUtil.encode(jsonData),
				callback : function(msg) {
					if(msg.flag=='true'){
						ObjectMgrUtil.get('leftMenuPanel').pageObject.initialLeftTree('快捷导航',null);
						MsgUtil.alert("提示", "保存成功!");
						HtmlUtil.getDom(owner.ids.coefficientky).value=msg.coefficientky;
						owner.checkedMenu='';
					}else{
						MsgUtil.alert("提示", msg.error);
					}
					
				}
			});	
			
		},
		/**
		 * 清除快捷导航配置
		 * 
		 * @param
		 * @return
		 * @程序员：冉辉
		 * @编码日期：2013-04-17
		 * @最后修改日期：
		 */
		delResourceControl : function() {
			var owner = this;
			var cientky=HtmlUtil.getDom(owner.ids.coefficientky).value;
			var jsonData = {};
			if(!DataUtil.isEmpty(cientky)){
				jsonData['coefficientky'] = cientky;
			}
			ConnectionUtil.ajaxReq( {
				strServId : "quikNavigationResourcelService.deleteQuikNavigations",
				jsonData : DataUtil.encode(jsonData),
				callback : function(msg) {
					if(msg.flag=='true'){
						MsgUtil.alert("提示", "清除成功!");
					}
					ObjectMgrUtil.get('leftMenuPanel').pageObject.initialLeftTree('快捷导航',null);
					HtmlUtil.getDom(owner.ids.resourceids).value='';
					HtmlUtil.getDom(owner.ids.coefficientky).value='';
					HtmlUtil.getDom(owner.ids.checkedResoure).value='';
					owner.checkedMenu='';
					owner.cheMenu='';
				}
			});	
		},
		/**
		 * 
		 * 
		 * */
		populateNaviChild:function(menus){
			var owner = this;
			var childrens=[];
			DataUtil.each(menus.resourceControlBeanList,function(menu){
				var item={};
				item.id=menu.id;
				item.text=menu.resourceName;
				if(!DataUtil.isEmpty(menu.resourceControlBeanList)){
					item.leaf=false;
					item.children=owner.populateNaviChild(menu);
					item.cls='feeds-node';
					item.children=owner.populateNaviChild(menu);
				}else{
					item.cls='feed';
					item.icon=Constants.CONTEXT_PATH+'/resources/images/icons/table_go.png';
					item.leaf=true;
				}
				childrens.push(item);				
			});
			return childrens;
			//DataUtil.apply(menus,{children:childrens});
		}
});