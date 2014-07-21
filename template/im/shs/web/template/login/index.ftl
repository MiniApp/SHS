[@compress single_line = !systemDevelopment]
[#-- 启用验证码 --]
[#assign enabledCaptcha = (setting.security.captchaScopes?? && setting.security.captchaScopes?seq_contains("login")) /]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/include/meta.ftl" /]
<title>${setting.basic.siteName}-登录</title>
[#-- Link 顶部 --]
[#include "/include/link_top.ftl" /]
[#-- Link 底部 --]
[#include "/include/link_bottom.ftl" /]
</head>
<body class="loginpage">
[#-- 页眉 --]
[#include "/include/header.ftl" /]
<div class="content content-signin">
	<div class="rows">
		<div class="sig-form pull-right">
			<form id="loginForm" action="${base}/login" method="post">
				<ul>
					<li>
			            <p id="flashMessage" class="annotate"></p>
					</li>
		        	<li>
		        		<div><label>用户名</label></div>
			            <div class="span-two"><input id="username" type="text" name="username" class="text-seven" placeholder="请输入用户名/邮箱地址/手机号码" /></div>
			            <p class="annotate"></p>
					</li>
					<li>
						<div><label>密码</label></div>
			            <div class="span-two"><input id="password" type="password" name="password" class="text-seven" placeholder="请输入密码" /></div>
			            <p class="annotate"></p>
		        	</li>
		        	[#if enabledCaptcha]
			        	<li>
			        		<div><label>验证码</label></div>
				          	<div class="span-two"><span><input id="captcha" type="text" name="captcha" class="text-eight" placeholder="请输入验证码" /></span>&nbsp;<span><img id="captchaImage" src="${base}/captcha?captchaId=${captchaId}" title="点击更换验证码" /></span></div>
				            <p class="annotate"></p>
			        	</li>
		        	[/#if]
		        	<li>
			          	<div class="span-two"><label class="pull-left"><input id="remember" type="checkbox" name="remember" value="true" />记住用户名</label><label class="pull-right"><a href="${base}/password/find" target="_blank" class="color-five">忘记密码？</a></label></div>
		        	</li>
		        	<li>
			          	<div class="span-two"><span><input type="submit" value="登录" class="btn-one pull-left" /></span>&nbsp;&nbsp;</div>
			            <p class="annotate"></p>
		        	</li>
				</ul>
			</form>
		</div>
	</div>
</div>
[#-- Footer 页脚 --]
[#include "/include/footer.ftl" /]
[#-- RSA加密 --]
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/jsbn.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/prng4.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rng.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rsa.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/base/base64.min.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 顶部 --]
[#include "/include/script_top.ftl" /]
[#-- validate 验证器 --]
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js?version=${setting.basic.siteVersion}"></script>
[#-- jQuery Cookie --]
<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 公共 --]
<script type="text/javascript" src="${base}/resources/js/common.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 登录 --]
<script type="text/javascript">var redirectUrl = "[#if redirectUrl??]${redirectUrl}[#else]${base}[/#if]", modulus = "${modulus}", exponent = "${exponent}"[#-- 启用验证码时 --][#if enabledCaptcha], captchaId="${captchaId}"[/#if];</script>
<script type="text/javascript" src="${base}/resources/js/login.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]