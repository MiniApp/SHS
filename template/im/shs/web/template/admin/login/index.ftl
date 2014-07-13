[@compress single_line = !systemDevelopment]
[#-- 启用验证码 --]
[#assign enabledCaptcha = setting.security.captchaScopes?? && setting.security.captchaScopes?seq_contains("adminLogin") /]
[#-- 启用管理员锁定 --]
[#assign enabledAdminLock = setting.security.accountLockScopes?? && setting.security.accountLockScopes?seq_contains("admin") /]
<!DOCTYPE html>
<html lang="en" class="login">
	<head>
		[#-- meta 标签 --]
    	[#include "/admin/include/meta.ftl" /]
		<title>管理中心[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Bootstrap Framework --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/bootstrap/css/bootstrap.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/bootstrap/css/bootstrap.fix.min.css" />
		[#-- 登录页样式 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/admin/css/login.min.css" />
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- 网站图标 --]
		<link type="image/x-icon" rel="shortcut icon" href="${base}/favicon.ico" />
	</head>
	<body>
		[#-- 对话框 --]
		<div class="dialog-box">
			[#-- FORM表单 --]
			<form id="loginForm">
			
				[#-- 标题栏 --]
				<div class="title-bar">
					${setting.basic.siteName}&nbsp;-&nbsp;管理中心
				</div>
				
				[#-- 瞬时消息 --]
				<div id="flashMessage"></div>
				
				<div class="form-groups">
				
					[#-- 用户名 --]
					<div class="form-group">
						<div class="input-group">
							<label for="username" class="input-group-addon input-sm">
								<i class="glyphicon glyphicon-user"></i>
							</label>
							<input id="username" class="form-control input-sm" type="text" name="username" placeholder="用户名" maxlength="20" />
						</div>
					</div>
					
					[#-- 密码 --]
					<div class="form-group">
						<div class="input-group">
							<label for="password" class="input-group-addon input-sm">
								<i class="glyphicon glyphicon-lock"></i>
							</label>
							<input id="password" class="form-control input-sm" type="password" name="password" placeholder="密&nbsp;&nbsp;&nbsp;码" maxlength="20" autocomplete="off" />
						</div>
					</div>
					
					[#-- 启用验证码时 --]
					[#if enabledCaptcha]
						[#-- 验证码 --]
						<div class="form-group">
							<div class="input-group">
								<label for="captcha" class="input-group-addon input-sm">
									<i class="glyphicon glyphicon-barcode"></i>
								</label>
								<input id="captcha" class="form-control input-sm" type="text" name="captcha" placeholder="验证码" maxlength="4" autocomplete="off" />
								<div class="input-group-btn">
									<img id="captchaImage" class="captchaImage" src="${base}/admin/captcha?captchaId=${captchaId}" title="点击更换验证码" alt="点击更换验证码" />
								</div>
							</div>
						</div>
					[/#if]
					
					[#-- 记住用户名 --]
					<div class="form-group">
						<label class="checkbox-inline">
							<input id="remember" type="checkbox" value="true" />
							记住用户名
						</label>
					</div>
					
				</div>
				
				[#-- 表单控件栏 --]
				<div class="control-toolbar clearfix">
					[#-- 登录 --]
					<button class="btn btn-default btn-sm center-block" type="submit">&nbsp;登&nbsp;&nbsp;陆&nbsp;</button>
				</div>
				
			</form>
		
			[#-- 版权信息
			<div class="copyright clearfix">
				<span class="linkform">Copyright 2010-${.now?string("yyyy")} icl-network.com. All rights reserved.</span>
			</div> --]
		
		</div>
		
		[#-- RSA加密 --]
		<script type="text/javascript" src="${base}/resources/lib/tools/rsa/jsbn.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/tools/rsa/prng4.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rng.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rsa.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/tools/base/base64.min.js"></script>
		[#-- jQuery Framework --]
		<script type="text/javascript" src="${base}/resources/jquery/jquery.min.js"></script>
		[#-- Bootstrap Framework --]
		<script type="text/javascript" src="${base}/resources/bootstrap/js/bootstrap.min.js"></script>
		[#-- jQuery Cookie --]
		<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js"></script>
		[#-- validate 验证器 --]
	    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js"></script>
	    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.common.min.js"></script>
    	<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js"></script>
		[#-- 登录 --]
		<script type="text/javascript">
			var modulus = "${modulus}", exponent = "${exponent}"[#-- 启用验证码时 --][#if enabledCaptcha], captchaId = "${captchaId}"[/#if];
		</script>
		<script type="text/javascript" src="${base}/resources/admin/js/login.min.js"></script>
	</body>
</html>
[/@compress]