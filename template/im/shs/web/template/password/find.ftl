[@compress single_line = !systemDevelopment]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-忘记密码</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- jQuery Colorbox 弹出层 --]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/colorbox.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="loginpage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
    <div class="rows">
        <div class="left-form pull-left">
            
            [#-- 选择找回方式 --]
            <div class="password_update_one">
                <div class="password_find" style="overflow: hidden;">
                    <a href="#mailFind" class="findMethod passwordFind_btn_email pull-left">通过邮箱地址找回</a>
                    <a href="#textingFind" class="findMethod passwordFind_btn_phone pull-right">通过手机号码找回</a>
                </div>
                <div id="mailFind" class="email_find_zym" style="display:none;">
					<form id="mailFindForm" action="${base}/password/mail_reset" method="post">
	                    <table>
	                        <tr>
	                            <td align="right"><span class="color-three">*</span> 新密码：</td>
	                            <td><input type="password" class="input_text_one" name="password" value="" placeholder="请输入新密码" /></td>
	                            <td class="color-three annotate"></td>
	                        </tr>
	                        <tr>
	                            <td align="right"><span class="color-three">*</span> 确认新密码：</td>
	                            <td><input type="password" class="input_text_one" name="rePassword" placeholder="请再次输入新密码" /></td>
	                            <td class="color-three annotate"></td>
	                        </tr>
	                        <tr>
	                            <td align="right"><span class="color-three">*</span> 邮箱地址：</td>
	                            <td><input type="text" class="input_text_one" name="email" placeholder="请输入邮箱地址" /></td>
	                            <td class="color-three annotate"></td>
	                        </tr>
		                    <tr>
		                        <td align="right"><span class="color-three">*</span> 验证码：</td>
		                        <td>
		                        	<input type="text" class="input_text_two pull-left" name="captcha" placeholder="请输入验证码" />
		                        	<input type="button" value="获取验证码" class="btn-one pull-right sendMailCaptcha" disableClassName="btn-gray" disablePromptValueSuffix="后重发" />
		                        </td>
		                        <td class="color-three annotate"></td>
		                    </tr>
	                        <tr>
	                            <td>&nbsp;</td>
	                            <td><input type="submit" value="提交" class="input_button_email" /></td>
	                            <td>&nbsp;</td>
	                        </tr>
	                    </table>
					</form>
				</div>
                <div id="textingFind" class="email_find_zym" style="display:none;">
					<form id="textingFindForm" action="${base}/password/texting_reset" method="post">
	                    <table>
	                        <tr>
	                            <td align="right"><span class="color-three">*</span> 新密码：</td>
	                            <td><input type="password" class="input_text_one" name="password" value="" placeholder="请输入新密码" /></td>
	                            <td class="color-three annotate"></td>
	                        </tr>
	                        <tr>
	                            <td align="right"><span class="color-three">*</span> 确认新密码：</td>
	                            <td><input type="password" class="input_text_one" name="rePassword" placeholder="请再次输入新密码" /></td>
	                            <td class="color-three annotate"></td>
	                        </tr>
	                        <tr>
	                            <td align="right"><span class="color-three">*</span> 手机号：</td>
	                            <td><input type="text" class="input_text_one" name="mobile" placeholder="请输入绑定的手机号码" /></td>
	                            <td class="color-three annotate"></td>
	                        </tr>
		                    <tr>
		                        <td align="right"><span class="color-three">*</span> 验证码：</td>
		                        <td>
		                        	<input type="text" class="input_text_two pull-left" name="captcha" placeholder="请输入验证码" />
		                        	<input type="button" value="获取验证码" class="btn-one pull-right sendTextingCaptcha" disableClassName="btn-gray" disablePromptValueSuffix="后重发" />
		                        </td>
		                        <td class="color-three annotate"></td>
		                    </tr>
	                        <tr>
	                            <td>&nbsp;</td>
	                            <td><input type="submit" value="提交" class="input_button_email" /></td>
	                            <td>&nbsp;</td>
	                        </tr>
	                    </table>
					</form>
				</div>
                <p class="prompt_p">若您无法使用上述方法找回密码，请联系我们&nbsp;${setting.basic.phone}</p>
            </div>
            
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
[#-- jQuery Colorbox 弹出层 --]
<script type="text/javascript" src="${base}/resources/js/jquery.colorbox.js?version=${setting.basic.siteVersion}"></script>
[#-- password.find 密码找回 --]
<script type="text/javascript">var modulus = "${modulus}", exponent = "${exponent}";</script>
<script type="text/javascript" src="${base}/resources/js/password.find.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 瞬时消息 --]
[@flash_message; flashMessage]
[#if flashMessage??]
<script type="text/javascript">
$().ready(function() {
	$.colorbox({ html: "<div style='color: rgb(0, 125, 181); font-size: 20px; padding: 10px 30px; overflow: hidden; margin: 5px; text-align: center; height: 60px; width: 300px; line-height: 60px;'>${flashMessage}</div>" });
});
</script>
[/#if]
[/@flash_message]
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]