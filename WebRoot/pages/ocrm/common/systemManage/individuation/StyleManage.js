/**
 * 系统主题样式管理
 * <li>切换样式</li>
 * 
 * @author DuanYong
 * @since 2012-08-29
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.individuation.StyleManage",
		"base.PageObject", {
			htmlContent : [
					'<div id="{StylePanelId}">',
					'<div id="{StylePanelContentId}">',
					'<table width="100%">',
					'<tr>',
					'<td width="25%" valign="top" id={StyleTreePanelDiv}></td>',
					'<td valign="top">',
					'<input name="themeCode" type="hidden" id="{StylePanelContentId_themeCode}" type="text">',
					'<input name="themeName" type="hidden" id="{StylePanelContentId_themeName}" type="text">',
					'<input name="panelBodyStyle" type="hidden" id="{StylePanelContentId_panelBodyStyle}" type="text">',
					'<input name="headerStyle" type="hidden" id="{StylePanelContentId_headerStyle}" type="text">',
					'<input name="menuStyle" type="hidden" id="{StylePanelContentId_menuStyle}" type="text">',
					'<input name="calendarStyle" type="hidden" id="{StylePanelContentId_calendarStyle}" type="text">',
					'<div id={previewDiv}></div>', '</td>', '</tr>',
					'</table>', '</div>', '</div>'],
			initData : function(){
				if (null != window && null != window.systemConfig
						&& null != window.systemConfig.theme) {
						this.parent.extObject.setTitle(this.parent.title+"->当前主题:<span style='color:red;'>"+window.systemConfig.theme.themeName +"</span>");
				}
			
			},
			initCmp : function() {
				var owner = this;
				this.create("component.SimpleTree", {
					renderTo : this.ids.StyleTreePanelDiv,
					fields : ['themeCode', 'themeName', 'panelBodyStyle',
							'headerStyle', 'menuStyle','calendarStyle'],
					widthPercent : 0.25,
					heightPercent : 0.98,
					children : [{
						id : '01',
						themeCode : CodeStringDefinition.SYSTEM_THEME_CODE_DEFAULT,
						themeName : CodeStringDefinition.SYSTEM_THEME_NAME_DEFAULT,
						panelBodyStyle : CodeStringDefinition.SYSTEM_THEME_PANEL_BODY_STYLE_DEFAULT,
						headerStyle : CodeStringDefinition.SYSTEM_THEME_HEADER_STYLE_DEFAULT,
						menuStyle : CodeStringDefinition.SYSTEM_THEME_MENU_STYLE_DEFAULT,
						calendarStyle : CodeStringDefinition.SYSTEM_THEME_CALENDAR_STYLE_DEFAULT,
						text : CodeStringDefinition.SYSTEM_THEME_NAME_DEFAULT,
						leaf : true
					}, {
						id : '02',
						themeCode : CodeStringDefinition.SYSTEM_THEME_CODE_GRAY,
						themeName : CodeStringDefinition.SYSTEM_THEME_NAME_GRAY,
						panelBodyStyle : CodeStringDefinition.SYSTEM_THEME_PANEL_BODY_STYLE_GRAY,
						headerStyle : CodeStringDefinition.SYSTEM_THEME_HEADER_STYLE_GRAY,
						menuStyle : CodeStringDefinition.SYSTEM_THEME_MENU_STYLE_GRAY,
						calendarStyle : CodeStringDefinition.SYSTEM_THEME_CALENDAR_STYLE_GRAY,
						text : CodeStringDefinition.SYSTEM_THEME_NAME_GRAY,
						leaf : true
					}, {
						id : '03',
						themeCode : CodeStringDefinition.SYSTEM_THEME_CODE_ACCESS,
						themeName : CodeStringDefinition.SYSTEM_THEME_NAME_ACCESS,
						panelBodyStyle : CodeStringDefinition.SYSTEM_THEME_PANEL_BODY_STYLE_ACCESS,
						headerStyle : CodeStringDefinition.SYSTEM_THEME_HEADER_STYLE_ACCESS,
						menuStyle : CodeStringDefinition.SYSTEM_THEME_MENU_STYLE_ACCESS,
						calendarStyle : CodeStringDefinition.SYSTEM_THEME_CALENDAR_STYLE_ACCESS,
						text : CodeStringDefinition.SYSTEM_THEME_NAME_ACCESS,
						leaf : true
					}],
					nodeClick : function() {
						owner.previewStyle(this.data[0]);
					}
				});

				this.create('component.Panel', {
							renderTo : this.ids.StylePanelId,
							contentEl : this.ids.StylePanelContentId,
							collapsible : false,
							widthPercent : 0.98,
							heightPercent : 0.99,
							hasBackGroundColor : true,
							buttons : [{
										text : '保存',
										iconCls : 'save',
										handler : function() {
											owner.save();
										}
									}, {
										text : '关闭',
										iconCls : 'delete',
										handler : function() {
											owner.parent.close();// 关闭窗口
										}
									}]
						});
				if (null != window.systemConfig
						&& null != window.systemConfig.theme
						&& window.systemConfig.theme.themeCode != CodeStringDefinition.SYSTEM_THEME_CODE_DEFAULT) {
					this.previewStyle(window.systemConfig.theme);
				} else {
					this.previewStyle({
						'themeCode' : CodeStringDefinition.SYSTEM_THEME_CODE_DEFAULT,
						'themeName' : CodeStringDefinition.SYSTEM_THEME_NAME_DEFAULT,
						'panelBodyStyle' : CodeStringDefinition.SYSTEM_THEME_PANEL_BODY_STYLE_DEFAULT,
						'headerStyle' : CodeStringDefinition.SYSTEM_THEME_HEADER_STYLE_DEFAULT,
						'menuStyle' : CodeStringDefinition.SYSTEM_THEME_MENU_STYLE_DEFAULT,
						'calendarStyle' : CodeStringDefinition.SYSTEM_THEME_CALENDAR_STYLE_DEFAULT
					});
				}

			},
			/**
			 * 预览样式
			 */
			previewStyle : function(record) {
				HtmlUtil.getDom(this.ids.StylePanelContentId_themeCode).value = record.themeCode;
				HtmlUtil.getDom(this.ids.StylePanelContentId_themeName).value = record.themeName;
				HtmlUtil.getDom(this.ids.StylePanelContentId_panelBodyStyle).value = record.panelBodyStyle;
				HtmlUtil.getDom(this.ids.StylePanelContentId_headerStyle).value = record.headerStyle;
				HtmlUtil.getDom(this.ids.StylePanelContentId_menuStyle).value = record.menuStyle;
				HtmlUtil.getDom(this.ids.StylePanelContentId_calendarStyle).value = record.calendarStyle;
				HtmlUtil.getDom(this.ids.previewDiv).innerHTML = '<img src="'
						+ Constants.CONTEXT_PATH + '/resources/images/themes/'
						+ record.themeCode + '.png" />';
			},
			/**
			 * 保存主题样式 先查询原来的配置,在添加新的配置参数
			 */
			save : function() {
				var owner = this;
				var themeName = HtmlUtil
						.getDom(this.ids.StylePanelContentId_themeName).value;
				var themeCode = HtmlUtil
						.getDom(this.ids.StylePanelContentId_themeCode).value;
				var panelBodyStyle = HtmlUtil
						.getDom(this.ids.StylePanelContentId_panelBodyStyle).value;
				var headerStyle = HtmlUtil
						.getDom(this.ids.StylePanelContentId_headerStyle).value;
				var menuStyle = HtmlUtil
						.getDom(this.ids.StylePanelContentId_menuStyle).value;
				var calendarStyle = HtmlUtil
						.getDom(this.ids.StylePanelContentId_calendarStyle).value;
				// 主题编码,主题名称,panel背景颜色,header样式,menu样式
				var appearance = {
					'appearance' : {
						fontColor : "FFFFFF",
						theme : {
							themeCode : themeCode,
							themeName : themeName,
							panelBodyStyle : panelBodyStyle,
							headerStyle : headerStyle,
							menuStyle : menuStyle,
							calendarStyle : calendarStyle
						},
						taskbarTransparency : "100"
					}
				};
				var config = {};
				if (null != window.systemConfig) {
					config = window.systemConfig;
				}
				config = ObjectUtil.apply(config, appearance);
				var jsonData = {
					'config' : DataUtil.encode(config)
				}
				ConnectionUtil.ajaxReq({// 更新配置
					strServId : "employeeSystemConfigHelper.updateConfig",
					jsonData : DataUtil.encode(jsonData),
					callback : function(msg) {
						if (null != msg) {
							owner.parent.close();// 关闭窗口
							MsgUtil.alert("提示", "数据保存失败");
						} else {
							MsgUtil.confirm("确认消息框",
											"您选择的[<span style='color:red;'>" + themeName + "</span>]主题保存成功,立即应用该主题吗?<br /><br />提示：页面会被刷新,请先确认是否有尚未保存的业务数据,以免丢失!",
											function(btn, txt) {
												if (btn == "no") {
													owner.parent.close();// 关闭窗口
													MsgUtil.alert("提示",
															"请在任何时候按[F5]键刷新页面或者重新登录系统以启用[<span style='color:red;'>"
																	+ themeName
																	+ "</span>]主题!",400);
													return false;
												} else {
													owner.parent.close();// 关闭窗口
													MsgUtil.alert("提示",
															"正在为您应用主题...");
													location.reload();
												}
											},470);
						}
					}
				});

			}
		});
