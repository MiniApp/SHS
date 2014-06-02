/**
 * 解除系统锁定
 * <li>UnLockSystem</li>
 * 
 * @author DuanYong
 * @since 2012-09-01
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.individuation.UnLockSystem",
		"base.PageObject", {
			htmlContent : [
					'<div id="{UnLockSystemPanelId}">',
					'<div id="{UnLockSystemPanelContentId}">',
					'<table width="100%" border="0" cellspacing="2" cellpadding="0" class="DisplayTable">',
					'<tr>',
					'<td align="center"><img src="'+ Constants.CONTEXT_PATH + '/resources/images/rest.png" /></td>',
			        '<td>系统正在运行,且被锁定.<br />请输入解锁密码,解除锁定!</td>',
					'</tr>',
					'<tr>',
					'<td  align="right">解锁密码:</td>',
			        '<td><input type="password" name="lockPassword" class="required maxLength-10" title="解锁密码" id="{UnLockSystemPanelContentId_lockPassword}" style="width:160px" /></td>',
					'</tr>',
					'<tr>',
					'<td  align="right"></td>',
			        '<td><span id="{UnLockSystemPanelContentId_errorMsg}"></span></td>',
					'</tr>',
					'</table>', '</div>', '</div>'],
			initData : function(){
				if(window.systemConfig.lockSystem.tryCount > 0){
					this.errorMsg("你还可以重试:"+(CodeStringDefinition.SYSTEM_UNLOCK_TRY_COUNT-window.systemConfig.lockSystem.tryCount)+"次");
				}
			},
			initCmp : function() {
				var owner = this;
				this.create('component.Panel', {
							renderTo : this.ids.UnLockSystemPanelId,
							contentEl : this.ids.UnLockSystemPanelContentId,
							collapsible : false,
							widthPercent : 0.97,
							heightPercent : 0.97,
							hasBackGroundColor : true,
							buttons : [{
										text : '解除锁定',
										iconCls : 'unLock',
										handler : function() {
											owner.unLockSystem();
										}
									}, {
										text : '退出系统',
										iconCls : 'logout',
										handler : function() {
											owner.logout();
										}
									}]
						});
				

			},
			/**
			 * 解除系统锁定
			 */
			unLockSystem: function() {
				var owner = this;
				if(this.validation()){
					var lockPassword = HtmlUtil.getDom(this.ids.UnLockSystemPanelContentId_lockPassword).value;
					if(lockPassword == window.systemConfig.lockSystem.lockPassword){
						this.unLock({
									'lockSystem' : {
										'sessionId' : window.userObj.sessionId,
										'tryCount' : 0,
										'lockPassword' : '',
										'state' : 'unLock'
									}
								}, true);
					}else{
						if(window.systemConfig.lockSystem.tryCount >= CodeStringDefinition.SYSTEM_UNLOCK_TRY_COUNT - 1){
							owner.logout();
						}else{
						    var tyrCount = parseInt(window.systemConfig.lockSystem.tryCount) + 1;
						    var errorUnLock = {
										'lockSystem' : {
											'sessionId' : window.userObj.sessionId,
											'tryCount' : tyrCount,
											'lockPassword' : window.systemConfig.lockSystem.lockPassword,
											'state' : 'lock'
										}
									};
							this.unLock(errorUnLock, false);
							window.systemConfig = ObjectUtil.apply(window.systemConfig,errorUnLock);
							this.errorMsg("你还可以重试:"+(CodeStringDefinition.SYSTEM_UNLOCK_TRY_COUNT-tyrCount)+"次");
						}
					}
				}
			},
			unLock : function(unLock, success) {
				var owner = this;
				var config = {};
				if (null != window.systemConfig) {
					config = window.systemConfig;
				}
				config = ObjectUtil.apply(config, unLock);
				var jsonData = {
					'config' : DataUtil.encode(config)
				}
				ConnectionUtil.ajaxReq({// 更新配置
					strServId : "employeeSystemConfigHelper.updateConfig",
					jsonData : DataUtil.encode(jsonData),
					callback : function(msg) {
						if (null != msg) {
							MsgUtil.alert("提示", "系统解锁失败!");
						} else {
							if (success) {
								owner.parent.close();// 关闭窗口
							}
						}
					}
				});
			},
			/**
			 * 退出系统
			 */
			logout : function() {
				this.unLock({
							'lockSystem' : {
								'sessionId' : window.userObj.sessionId,
								'tryCount' : 0,
								'lockPassword' : '',
								'state' : 'unLock'
							}
						}, true);
				location.href = Constants.CONTEXT_PATH + '/pages/ocrmLogin.html';
			},
			validation : function() {
				var jsonData = DataUtil.getDataFromArea(this.ids.UnLockSystemPanelContentId);
				if(jsonData == Constants.VALIDATION_FAIL){
					return false;
				}
				jsonData = DataUtil.decode(jsonData);
				var lockPassword = jsonData.lockPassword;
				
				if (!/^[A-Za-z0-9]{1,10}$/.test(lockPassword)) {
					MsgUtil.alert('系统提示', '解锁密码只能输入字母和数字');
					return false;
				}
				
				return true;
			},
			/**
			 * 错误信息
			 * @param {} msg
			 */
			errorMsg : function(msg){
				HtmlUtil.getDom(this.ids.UnLockSystemPanelContentId_errorMsg).innerHTML = msg;
			}
		});
