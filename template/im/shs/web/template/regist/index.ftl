[@compress single_line = !systemDevelopment]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-注册</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="loginpage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
	<div class="rows">
		<div class="right-img pull-left"><img src="${base}/resources/images/Registration-banner.jpg?version=${setting.basic.siteVersion}" /></div>
	    <div class="left-form pull-right">
			<form id="registForm" action="${base}/regist/texting_regist" method="post">
		        <ul>
					<li>
			            <p id="flashMessage" class="annotate"></p>
					</li>
					<li>
						<div><label>用户名</label></div>
			            <div class="span-two"><input id="username" type="text" name="username" class="text-nine" placeholder="请输入用户名" /></div>
			            <p class="annotate"></p>
					</li>
					<li>
						<div><label>密码</label></div>
			            <div class="span-two"><input id="password" type="password" name="password" class="text-nine" placeholder="请输入密码" /></div>
			            <p class="annotate"></p>
					</li>
					<li>
						<div><label>确认密码</label></div>
			            <div class="span-two"><input id="rePassword" type="password" name="rePassword" class="text-nine" placeholder="请再次输入密码" /></div>
			            <p class="annotate"></p>
					</li>
					<li>
						<div><label>手机号码</label></div>
			            <div class="span-two"><input id="mobile" type="text" name="mobile" class="text-nine" placeholder="请输入手机号码" /></div>
			            <p class="annotate"></p>
					</li>
					<li>
						<div><label>验证码</label></div>
						<div class="span-two">
							<span>
								<input id="captcha" type="text" name="captcha" class="text-eights pull-left" placeholder="请输入验证码" />
								<input id="captchaButton" type="button" class="btn-two pull-right" value="获取验证码" disableClassName="btn-gray" disablePromptValueSuffix="后重发" />
							</span>
						</div>
						<p class="annotate"></p>
					</li>
					<li>
						<div class="span-two">
							<label>
								<input id="agreement" type="checkbox" name="agreement" value="true" checked="checked" />
								我已阅读并同意《<a href="${base}/regist/agreement" target="_blank" class="color-one">注册协议</a>》</label>
							</div>
						<p class="annotate">&nbsp;</p>
					</li>
					<li>
			            <div class="span-two"><input type="submit" value="立即注册" class="btn-one" /></div>
			            <p class="annotate"></p>
					</li>
		        </ul>
			</form>
		</div>
	</div>
</div>
[#-- Footer 页脚 --]
[#include "/template/include/footer.ftl" /]
[#-- RSA加密 --]
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/jsbn.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/prng4.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rng.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rsa.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/base/base64.min.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
[#-- validate 验证器 --]
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js?version=${setting.basic.siteVersion}"></script>
[#-- jQuery Cookie --]
<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 公共 --]
<script type="text/javascript" src="${base}/resources/js/common.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 注册 --]
<script type="text/javascript">var redirectUrl = "[#if redirectUrl??]${redirectUrl}[#else]${base}[/#if]", modulus = "${modulus}", exponent = "${exponent}";</script>
<script type="text/javascript" src="${base}/resources/js/regist.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]