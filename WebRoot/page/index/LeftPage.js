ObjectUtil
		.define(
				"crm.pages.mainPage.LeftPage",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/mainPage/LeftPage.html",
					initData : function() {
						var owner = this;
						if(owner.user.roleid!=CodeStringDefinition.ROLE_TYPE_PERSON_SYS_MANAGER_CODE&&
								owner.user.roleid!=CodeStringDefinition.ROLE_TYPE_CORPORATE_SYS_MANAGER_CODE){
							//如果是对公或对私的系统管理员，则不加载快捷导航菜单
							owner.iniQuikNavigMenu();
						}
					},
					initCmp : function() {
						// 渲染页面
						var owner = this;
					},
					/**
					 * 根据头部的第一集菜单动态组装左边导航菜单树
					 */
					initialLeftTree : function(title, chirldMenu) {
						var owner = this;
						HtmlUtil.overwrite(owner.ids.ocrmLeftMnuePanel, "",false);
						HtmlUtil.setText(HtmlUtil.getDom(owner.ids.titlePanel),
								'<div style="font-weight:800;font-size:large;font-family:Micosoft YaHei!important;">' + title+ '</div>');
						if(chirldMenu!=null&&chirldMenu!=''){
								owner.initTree(owner.AccordionPanel, chirldMenu);
						}else{
							owner.iniQuikNavigMenu();
						}
					},
					initTree : function(panle, chirldMenu) {
						var owner = this;
						var items = [];
						DataUtil.each(chirldMenu,function(menuItem) {
							items.push({id:menuItem['id'],title:menuItem['text'],child:menuItem['resourceControlBeanList']});
						});
						owner.create("component.NewAccordionPanel", {
							id : owner.ids.ocrmLeftMnuePanel,
							renderTo : owner.ids.ocrmLeftMnuePanel,
							items:items
						});
					},
					/*
					 * 动态生成tabl的ContentPanel
					 */
					addTabContentPanel : function(ids, title, className) {
						var centerPanel = ObjectMgrUtil.get('centerPanel');
						if (!centerPanel.getItem(ids + 'panel')) {
							if (centerPanel.getCount() > (Constants.TAB_SIZE - 1)) {
								MsgUtil.error('提示', '考虑到系统性能,您打开的tab不能超过10个!');
								return;
							}
							try {
								var pageObj = ObjectUtil.create(className, {
									id : ids
								});
							} catch (exception) {
								MsgUtil.error("错误提示",
										"加载页面对象失败，请检查菜单配置是否正确,或者会话是否已经超时");
								return;
							}
							centerPanel.add(ObjectUtil.create(
									'component.Panel', {
										id : ids + 'panel',
										title : "<div style='font-size:13px'>"
												+ title + "</div>",
										closable : true,
										autoScroll : true,
										hasBackGroundColor : false,
										pageObject : pageObj

									}));
							centerPanel.setActiveTab(centerPanel.getItem(ids
									+ 'panel'));

						} else {
							centerPanel.setActiveTab(centerPanel.getItem(ids
									+ 'panel'));
						}
				},
				/**
				*初始化快捷导航菜单
				*/
				iniQuikNavigMenu:function(){
					var owner = this;
					if (!DataUtil.isEmpty(owner.AccordionPanel)) {
						HtmlUtil.overwrite(owner.ids.ocrmLeftMnuePanel, "",false);
						owner.AccordionPanel=null;
					} 
					var cons="'快捷配置','crm.pages.ocrm.common.systemManage.navigation.QuikNavigationResourcel','initResourceControl'";
					var defaultLi='<ul style="cursor: hand;">'+ 
					'<li title="快捷配置" class="ocrmLeftMnuePanel" onclick="javascript:BusinessUtil.quikNavigMenuClick('
					+ cons
					+ ')"><img src="/ocrmweb/resources/images/index_01.png"><span>快捷配置</span></li>';
					ConnectionUtil.ajaxReq( {
						strServId : "quikNavigationResourcelService.getQuikNavigations",
						jsonData : {
							corpersonky : owner.user.objectId
						},
						callback : function(datas) {
							if(datas){
								var i=2;
								DataUtil.each(datas, function(data) {
									var cons="'"+data.resourcename+"','"+data.namespace+"."+data.classname+"','"+data.resourceid+"'";
									var name=data.resourcename;
									if(name.length>4){
										name=name.substring(0,4)+'...';
									}
									defaultLi+='<li title="'+data.resourcename+'" class="ocrmLeftMnuePanel" onclick="javascript:BusinessUtil.quikNavigMenuClick('
										+ cons
										+ ')"><img src="/ocrmweb/resources/images/index_0'+i+'.png"><span>'+name+'</span></li>';
									i++;
								});
								defaultLi+='</ul>';
							}
							//如果是对公或对私的系统管理员，则不加载快捷导航菜单
							HtmlUtil.insertHtml(defaultLi, HtmlUtil
									.getDom(owner.ids.ocrmLeftMnuePanel));
						}
					});

				}
	});
