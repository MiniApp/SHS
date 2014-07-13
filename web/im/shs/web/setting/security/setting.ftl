[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/security_setting" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>安全设置[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
		[#-- jBreadcrumbs 面包屑 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.fix.min.css" />
		[#-- 有瞬时消息时 --]
		[#if flashMessage != null]
			[#-- HubSpot Messenger 弹框（Alert）组件库 --]
			<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.min.css" />
			<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.theme.future.min.css" />
		[/#if]
		[#-- Link 底部 --]
    	[#include "/template/admin/include/link_bottom.ftl" /]
    </head>
    <body class="contentwrapper">

		[#-- 面包屑 --]
		<div id="jBreadCrumb" class="breadCrumb module">
			<ul>
				<li>
					<a href="${homepageUrl}"></a>
				</li>
				<li>
					系统管理
				</li>
				<li>
					系统设置
				</li>
				<li>
					安全设置
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post">
			<input type="hidden" name="_method" value="put" />
			
			[#-- 注册服务是否开启 --]
			<div class="form-group">
				<label for="registEnabled" class="col-sm-2 control-label">
					注册服务是否开启
				</label>
				<div class="col-sm-4">
					<select id="registEnabled" class="form-control chosen-select" name="registEnabled" data-placeholder="&nbsp;">
						<option value="true"[#if setting.registEnabled] selected="selected"[/#if]>是</option>
						<option value="false"[#if !setting.registEnabled] selected="selected"[/#if]>否</option>
					</select>
				</div>
			</div>
		
			[#-- 用户名最小长度 --]
			<div class="form-group">
				<label for="usernameMinLength" class="col-sm-2 control-label">
					<span class="required">*</span>
					用户名最小长度
				</label>
				<div class="input-group col-sm-4">
					<input id="usernameMinLength" class="form-control" type="text" name="usernameMinLength" value="${setting.usernameMinLength}" maxlength="3" />
					<label class="input-group-addon">位</label>
				</div>
			</div>
		
			[#-- 用户名最大长度 --]
			<div class="form-group">
				<label for="usernameMaxLength" class="col-sm-2 control-label">
					<span class="required">*</span>
					用户名最大长度
				</label>
				<div class="input-group col-sm-4">
					<input id="usernameMaxLength" class="form-control" type="text" name="usernameMaxLength" value="${setting.usernameMaxLength}" maxlength="3" />
					<label class="input-group-addon">位</label>
				</div>
			</div>
			
			[#-- 密码最小长度 --]
			<div class="form-group">
				<label for="passwordMinLength" class="col-sm-2 control-label">
					<span class="required">*</span>
					密码最小长度
				</label>
				<div class="input-group col-sm-4">
					<input id="passwordMinLength" class="form-control" type="text" name="passwordMinLength" value="${setting.passwordMinLength}" maxlength="3" />
					<label class="input-group-addon">位</label>
				</div>
			</div>
			
			[#-- 密码最大长度 --]
			<div class="form-group">
				<label for="passwordMaxLength" class="col-sm-2 control-label">
					<span class="required">*</span>
					密码最大长度
				</label>
				<div class="input-group col-sm-4">
					<input id="passwordMaxLength" class="form-control" type="text" name="passwordMaxLength" value="${setting.passwordMaxLength}" maxlength="3" />
					<label class="input-group-addon">位</label>
				</div>
			</div>
		
			[#-- 登录方式 --]
			<div class="form-group">
				<label for="loginMethods" class="col-sm-2 control-label">
					登录方式
				</label>
				<div class="col-sm-4">
					<select id="loginMethods" class="form-control chosen-select" name="loginMethods" multiple="true" data-placeholder="&nbsp;">
						[#list loginTypes as loginType]
							<option value="${loginType}"[#if setting.loginMethods?? && setting.loginMethods?seq_contains(loginType)] selected="selected"[/#if]>${message("LoginType." + loginType)}</option>
						[/#list]
					</select>
				</div>
			</div>
		
			[#-- 验证码范围 --]
			<div class="form-group">
				<label for="captchaScopes" class="col-sm-2 control-label">
					验证码范围
				</label>
				<div class="col-sm-4">
					<select id="captchaScopes" class="form-control chosen-select" name="captchaScopes" multiple="true" data-placeholder="&nbsp;">
						[#list captchaTypes as captchaType]
							<option value="${captchaType}"[#if setting.captchaScopes?? && setting.captchaScopes?seq_contains(captchaType)] selected="selected"[/#if]>${message("CaptchaType." + captchaType)}</option>
						[/#list]
					</select>
				</div>
			</div>
		
			[#-- 账户锁定范围 --]
			<div class="form-group">
				<label for="accountLockScopes" class="col-sm-2 control-label">
					账户锁定范围
				</label>
				<div class="col-sm-4">
					<select id="accountLockScopes" class="form-control chosen-select" name="accountLockScopes" multiple="true" data-placeholder="&nbsp;">
						[#list accountLockTypes as accountLockType]
							<option value="${accountLockType}"[#if setting.accountLockScopes?? && setting.accountLockScopes?seq_contains(accountLockType)] selected="selected"[/#if]>${message("AccountLockType." + accountLockType)}</option>
						[/#list]
					</select>
				</div>
			</div>
		
			[#-- 账户锁定计数 --]
			<div class="form-group">
				<label for="accountLockCount" class="col-sm-2 control-label">
					<span class="required">*</span>
					账户锁定计数
				</label>
				<div class="col-sm-4">
					<div class="input-group">
						<input id="accountLockCount" class="form-control" type="text" name="accountLockCount" value="${setting.accountLockCount}" maxlength="9" />
						<label class="input-group-addon">次</label>
					</div>
					<span class="help-block">登录失败次数超过设定值账户将被锁定</span>
				</div>
			</div>
		
			[#-- 账户锁定时间 --]
			<div class="form-group">
				<label for="accountLockTime" class="col-sm-2 control-label">
					<span class="required">*</span>
					账户锁定时间
				</label>
				<div class="col-sm-4">
					<div class="input-group">
						<input id="accountLockTime" class="form-control" type="text" name="accountLockTime" value="${setting.accountLockTime}" maxlength="9" />
						<label class="input-group-addon">分钟</label>
					</div>
					<span class="help-block">账户解锁时间，0表示永久锁定</span>
				</div>
			</div>
		
			[#-- 令牌类型 --]
			<div class="form-group">
				<label for="tokenType" class="col-sm-2 control-label">
					令牌类型
				</label>
				<div class="col-sm-4">
					<select id="tokenType" class="form-control chosen-select" name="tokenType" data-placeholder="&nbsp;">
						[#list tokenTypes as tokenType]
							<option value="${tokenType}"[#if setting.tokenType == tokenType] selected="selected"[/#if]>${message("RandomStringType." + tokenType)}</option>
						[/#list]
					</select>
				</div>
			</div>
		
			[#-- 令牌长度 --]
			<div class="form-group">
				<label for="tokenCodeLength" class="col-sm-2 control-label">
					<span class="required">*</span>
					令牌长度
				</label>
				<div class="col-sm-4">
					<div class="input-group">
						<input id="tokenCodeLength" class="form-control" type="text" name="tokenCodeLength" value="${setting.tokenCodeLength}" maxlength="9" />
						<label class="input-group-addon">位</label>
					</div>
				</div>
			</div>
		
			[#-- 令牌到期时间 --]
			<div class="form-group">
				<label for="tokenExpiryTime" class="col-sm-2 control-label">
					<span class="required">*</span>
					令牌到期时间
				</label>
				<div class="col-sm-4">
					<div class="input-group">
						<input id="tokenExpiryTime" class="form-control" type="text" name="tokenExpiryTime" value="${setting.tokenExpiryTime}" maxlength="9" />
						<label class="input-group-addon">分钟</label>
					</div>
				</div>
			</div>
		
			[#-- 令牌重发时间 --]
			<div class="form-group">
				<label for="tokenRetryTime" class="col-sm-2 control-label">
					<span class="required">*</span>
					令牌重发时间
				</label>
				<div class="col-sm-4">
					<div class="input-group">
						<input id="tokenRetryTime" class="form-control" type="text" name="tokenRetryTime" value="${setting.tokenRetryTime}" maxlength="9" />
						<label class="input-group-addon">秒钟</label>
					</div>
				</div>
			</div>
		
			[#-- 货币符号 --]
			<div class="form-group">
				<label for="currencySign" class="col-sm-2 control-label">
					<span class="required">*</span>
					货币符号
				</label>
				<div class="col-sm-4">
					<input id="currencySign" class="form-control" type="text" name="currencySign" value="${setting.currencySign}" maxlength="200" />
				</div>
			</div>
		
			[#-- 货币单位 --]
			<div class="form-group">
				<label for="currencyUnit" class="col-sm-2 control-label">
					<span class="required">*</span>
					货币单位
				</label>
				<div class="col-sm-4">
					<input id="currencyUnit" class="form-control" type="text" name="currencyUnit" value="${setting.currencyUnit}" maxlength="200" />
				</div>
			</div>
		
			[#-- 金额精确位数 --]
			<div class="form-group">
				<label for="amountScale" class="col-sm-2 control-label">
					金额精确位数
				</label>
				<div class="col-sm-4">
					<select id="amountScale" class="form-control chosen-select" name="amountScale" data-placeholder="&nbsp;">
						<option value="0"[#if setting.amountScale == 0] selected="selected"[/#if]>无小数位</option>
						<option value="1"[#if setting.amountScale == 1] selected="selected"[/#if]>1位小数</option>
						<option value="2"[#if setting.amountScale == 2] selected="selected"[/#if]>2位小数</option>
						<option value="3"[#if setting.amountScale == 3] selected="selected"[/#if]>3位小数</option>
					</select>
				</div>
			</div>
		
			[#-- 金额精确方式 --]
			<div class="form-group">
				<label for="amountRoundMethod" class="col-sm-2 control-label">
					金额精确方式
				</label>
				<div class="col-sm-4">
					<select id="amountRoundMethod" class="form-control chosen-select" name="amountRoundMethod" data-placeholder="&nbsp;">
						[#list amountRoundMethods as amountRoundMethod]
							<option value="${amountRoundMethod}"[#if setting.amountRoundMethod == amountRoundMethod] selected="selected"[/#if]>${message("RoundingMode." + amountRoundMethod)}</option>
						[/#list]
					</select>
				</div>
			</div>

			[#-- 上传文件限制 --]
			<div class="form-group">
				<label for="uploadMaxSize" class="col-sm-2 control-label">
					<span class="required">*</span>
					上传文件限制
				</label>
				<div class="col-sm-4">
					<div class="input-group">
						<input id="uploadMaxSize" class="form-control" type="text" name="uploadMaxSize" value="${setting.uploadMaxSize}" maxlength="9" />
						<label class="input-group-addon">MB</label>
					</div>
					<span class="help-block">0表示无限制</span>
				</div>
			</div>
		
			[#-- 上传图片类型 --]
			<div class="form-group">
				<label for="uploadImageExtension" class="col-sm-2 control-label">
					上传图片类型
				</label>
				<div class="col-sm-4">
					<input id="uploadImageExtension" class="form-control" type="text" name="uploadImageExtension" value="${setting.uploadImageExtension}" maxlength="200" />
					<span class="help-block">多个类型以“,”分隔，为空表示不允许上传</span>
				</div>
			</div>
		
			[#-- 上传Flash类型 --]
			<div class="form-group">
				<label for="uploadFlashExtension" class="col-sm-2 control-label">
					上传Flash类型
				</label>
				<div class="col-sm-4">
					<input id="uploadFlashExtension" class="form-control" type="text" name="uploadFlashExtension" value="${setting.uploadFlashExtension}" maxlength="200" />
					<span class="help-block">多个类型以“,”分隔，为空表示不允许上传</span>
				</div>
			</div>
		
			[#-- 上传媒体类型 --]
			<div class="form-group">
				<label for="uploadMediaExtension" class="col-sm-2 control-label">
					上传媒体类型
				</label>
				<div class="col-sm-4">
					<input id="uploadMediaExtension" class="form-control" type="text" name="uploadMediaExtension" value="${setting.uploadMediaExtension}" maxlength="200" />
					<span class="help-block">多个类型以“,”分隔，为空表示不允许上传</span>
				</div>
			</div>
		
			[#-- 上传文件类型 --]
			<div class="form-group">
				<label for="uploadFileExtension" class="col-sm-2 control-label">
					上传文件类型
				</label>
				<div class="col-sm-4">
					<input id="uploadFileExtension" class="form-control" type="text" name="uploadFileExtension" value="${setting.uploadFileExtension}" maxlength="200" />
					<span class="help-block">多个类型以“,”分隔，为空表示不允许上传</span>
				</div>
			</div>
		
			[#-- 上传图片路径 --]
			<div class="form-group">
				<label for="imageUploadPath" class="col-sm-2 control-label">
					<span class="required">*</span>
					上传图片路径
				</label>
				<div class="col-sm-4">
					<input id="imageUploadPath" class="form-control" type="text" name="imageUploadPath" value="${setting.imageUploadPath}" maxlength="200" />
				</div>
			</div>
		
			[#-- 上传Flash路径 --]
			<div class="form-group">
				<label for="flashUploadPath" class="col-sm-2 control-label">
					<span class="required">*</span>
					上传Flash路径
				</label>
				<div class="col-sm-4">
					<input id="flashUploadPath" class="form-control" type="text" name="flashUploadPath" value="${setting.flashUploadPath}" maxlength="200" />
				</div>
			</div>
		
			[#-- 上传媒体路径 --]
			<div class="form-group">
				<label for="mediaUploadPath" class="col-sm-2 control-label">
					<span class="required">*</span>
					上传媒体路径
				</label>
				<div class="col-sm-4">
					<input id="mediaUploadPath" class="form-control" type="text" name="mediaUploadPath" value="${setting.mediaUploadPath}" maxlength="200" />
				</div>
			</div>
		
			[#-- 上传文件路径 --]
			<div class="form-group">
				<label for="fileUploadPath" class="col-sm-2 control-label">
					<span class="required">*</span>
					上传文件路径
				</label>
				<div class="col-sm-4">
					<input id="fileUploadPath" class="form-control" type="text" name="fileUploadPath" value="${setting.fileUploadPath}" maxlength="200" />
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;修&nbsp;改&nbsp;</button>
				</div>
			</div>
			
		</form>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
	[#-- validate 验证器 --]
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.common.min.js"></script>
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
	[#-- security.set 基本设置 --]
	<script type="text/javascript" src="${base}/resources/admin/js/security.setting.min.js"></script>
	[#-- 有瞬时消息时 --]
	[#if flashMessage != null]
	    [#-- HubSpot Messenger 弹框（Alert）组件库 --]
		<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.theme.future.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.common.min.js"></script>
		[#-- 瞬时消息 --]
		<script type="text/javascript">
			$().ready(function() {
				${flashMessage}
			});
		</script>
	[/#if]
	[#-- Script 底部 --]
	[#include "/template/admin/include/script_bottom.ftl" /]
</html>
[/@compress]