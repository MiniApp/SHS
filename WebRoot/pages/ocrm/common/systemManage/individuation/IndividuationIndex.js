/**
 * 首页定制页面 <p/> 功能描述：
 * <li>保存选择的功能</li>
 * @author DuanYong
 * @since 2012-09-06
 * 
 */
ObjectUtil.define(
		"crm.pages.ocrm.common.systemManage.individuation.IndividuationIndex",
		"base.PageObject", {
			htmlContent : ['<div id="{initResoureControlTreeDiv}"></div>'],
			initData : function() {
				//页面按钮权限配置
				this.button = [{id:'saveIndexBtn'}];
				if (null != window && null != window.systemConfig
						&& null != window.systemConfig.myIndex) {
						this.parent.extObject.setTitle(this.parent.title+"->当前配置:<span style='color:red;'>"+window.systemConfig.myIndex.text +"</span>");
				}
			},
			initCmp : function() {
				var owner = this;
				// 创建树
				this.initResourceControlTree = this.create("component.SimpleTree", {
							renderTo : this.ids.initResoureControlTreeDiv,
							children : this.translateMenu(),
							expandAll : true,
							fields :['resourceControlpk'],
							rootText : '系统功能树',
							widthPercent : 0.985,
							heightPercent : 0.97,
							tbar : [{
								text : '保存定制',
								iconCls : 'save',
								disabled : true,
								id : 'saveIndexBtn',
								handler : function() {
									owner.saveFunction();
								}
							}],
							nodeClick : function() {
								if(!this.leaf[0]){
									owner.initResourceControlTree.extObject.queryById('saveIndexBtn').setDisabled(true);
								}else{
									owner.initResourceControlTree.extObject.queryById('saveIndexBtn').setDisabled(false);
								}
							}
						});
				
			},
			/**
			 * 转换菜单
			 * @return {}
			 */
			translateMenu : function(){
				var me = this;
				var newMenus = [];
				var menus = DataUtil.getUserMenu();
				DataUtil.each(menus, function(menuItem) {
					menuItem = me.filterMenu(menuItem);
					menuItem = me.translateChildMenu(menuItem, menuItem.resourceControlBeanList);
					newMenus.push(menuItem);
				});
				return newMenus;
			},
			/**
			 * 递归转换子菜单
			 * @param {} item
			 * @param {} items
			 * @return {}
			 */
			translateChildMenu : function(item, items){
				var me = this;
				
				DataUtil.each(items, function(childItem) {
							if (childItem.resourceControlBeanList) {
								me.translateChildMenu(childItem,childItem.resourceControlBeanList);
							}
						});
				var newItems = [];
				DataUtil.each(items, function(childItem) {
							newItems.push(me.filterMenu(childItem));
						});
				item = ObjectUtil.apply(item, {
							'children' : newItems
						});
				return item;
			},
			/**
			 * 过滤菜单
			 * @param {} item
			 * @return {}
			 */
			filterMenu : function(item){
				var newItem = {};
//				if(item['id'] != '36'){
					for (var it in item){
						if(it != 'checked'){
							newItem[it] = item[it];
						}
					}
//				}else{
//					newItem = item;
//				}
				
				return newItem;
			}
			,
			/**
			 * 保存选择的功能
			 */
			saveFunction : function() {
				var owner = this;
				var nodes = this.initResourceControlTree.getSelectedNodes();
				
				if (nodes.length == 0) {
					MsgUtil.alert("提示", "请选择一个功能!");
					return;
				}
				// 首页定制参数
				var myIndex = {
					'myIndex' : {
						'id' : nodes[0].resourceControlpk + nodes[0].id,
						'text' : nodes[0].text,
						'className' : nodes[0].nameSpace+"."+nodes[0].className
					}
				};
				var menuName = nodes[0].text;
				
				var config = {};
				if (null != window.systemConfig) {
					config = window.systemConfig;
				}
				config = ObjectUtil.apply(config, myIndex);
				var jsonData = {
					'config' : DataUtil.encode(config)
				}
				ConnectionUtil.ajaxReq({// 更新配置
					strServId : "employeeSystemConfigHelper.updateConfig",
					jsonData : DataUtil.encode(jsonData),
					callback : function(msg) {
						if (null != msg) {
							owner.parent.close();// 关闭窗口
							MsgUtil.alert("提示", "首页定制失败");
						} else {
							MsgUtil
									.confirm(
											"确认消息框",
											"您将功能[<span style='color:red;'>"
													+ menuName
													+ "</span>]定制为首页显示,已经保存成功,立即应用该定制吗?<br><br>提示：页面会被刷新,请先确认是否有尚未保存的业务数据,以免丢失!",
											function(btn, txt) {
												if (btn == "no") {
													owner.parent.close();// 关闭窗口
													MsgUtil.alert("提示",
															"请在任何时候按[F5]键刷新页面或者重新登录系统以启用[<span style='color:red;'>"
																	+ menuName
																	+ "</span>]定制首页!",400);
													return false;
												} else {
													owner.parent.close();// 关闭窗口
													MsgUtil.alert("提示",
															"正在为您应用定制首页...");
													location.reload();
												}
											},470);

						}
					}
				});

			}
		});