/**
 * 系统锁定
 * <li>系统锁定</li>
 * 
 * @author DuanYong
 * @since 2012-09-01
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.individuation.LockSystem",
		"base.PageObject", {
			htmlContent : [
					'<div id="{LockSystemPanelId}">',
					'<div id="{LockSystemPanelContentId}">',
					'<table width="100%" border="0" cellspacing="2" cellpadding="0" class="DisplayTable">',
					'<tr>',
					'<td align="center"><img src="'+ Constants.CONTEXT_PATH + '/resources/images/Lock.png" /></td>',
			        '<td>请记住您输入的锁定密码.<br />只能输入数字和字母,长度小于10位</td>',
					'</tr>',
					'<tr>',
					'<td  align="right">锁定密码:</td>',
			        '<td><input type="password" name="lockPassword" class="required maxLength-10" title="锁定密码" id="{LockSystemPanelContentId_lockPassword}" style="width:160px" /></td>',
					'</tr>',
					'<tr>',
					'<td  align="right">确定密码:</td>',
			        '<td><input type="password" name="repeatLockPassword" class="required maxLength-10" title="确定密码" id="{LockSystemPanelContentId_repeatLockPassword}" style="width:160px" /></td>',
					'</tr>',
					'</table>', '</div>', '</div>'],
			initCmp : function() {
				var owner = this;
				this.create('component.Panel', {
							renderTo : this.ids.LockSystemPanelId,
							contentEl : this.ids.LockSystemPanelContentId,
							collapsible : false,
							widthPercent : 0.97,
							heightPercent : 0.97,
							hasBackGroundColor : true,
							buttons : [{
										text : '锁定',
										iconCls : 'lock',
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
				

			},
			/**
			 * 保存主题样式 先查询原来的配置,在添加新的配置参数
			 */
			save : function() {
				var owner = this;
				if(this.validation()){
					var lockPassword = HtmlUtil.getDom(this.ids.LockSystemPanelContentId_lockPassword).value;
					// 锁定参数
					var lock = {
						'lockSystem' : {
							'sessionId' : window.userObj.sessionId,
							'tryCount' : 0,
							'lockPassword' : lockPassword,
							'state' : 'lock'
						}
					};
					var config = {};
					if (null != window.systemConfig) {
						config = window.systemConfig;
					}
					config = ObjectUtil.apply(config, lock);
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
								owner.parent.close();// 关闭窗口
								owner.create('component.Window', {
									title : '解除系统锁定',
									draggable : true,
									iconCls : 'lock',
									resizable : true,
									width : 300,
									height : 155,
									modal : true,
									pageObject : owner.create('crm.pages.ocrm.common.systemManage.individuation.UnLockSystem',
													{
														id : 'UnLockSystem'
													})
								});
							}
						}
					});
				}
			},
			validation : function() {
				var jsonData = DataUtil.getDataFromArea(this.ids.LockSystemPanelContentId);
				if(jsonData == Constants.VALIDATION_FAIL){
					return false;
				}
				jsonData = DataUtil.decode(jsonData);
				var lockPassword = jsonData.lockPassword;
				var repeatLockPassword = jsonData.repeatLockPassword;
				if (lockPassword != repeatLockPassword) {
					MsgUtil.alert('系统提示', '两次密码输入不一致');
					return false;
				}
	
				if (!/^[A-Za-z0-9]{1,10}$/.test(lockPassword)) {
					MsgUtil.alert('系统提示', '密码只能输入字母和数字');
					return false;
				}
				return true;
			}
		});
