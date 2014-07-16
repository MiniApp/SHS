[@compress single_line = !systemDevelopment]
[#-- 状态: 账户管理 --]
[#assign state = "account" /]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-账户中心</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- jQuery Colorbox 弹出层 --]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/colorbox.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="userpage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
    <div class="rows">
      	
      	[#-- 边导航 --]
      	[#include "/template/member/include/sidebar.ftl" /]
      	
      	[#-- 内容--]
      	<div class="right-content pull-right">
        	<div class="title size-14">安全中心</div>
            
            <div class="list">
            	<ul>
            		[#-- 昵称 --]
                	<li class="list-li">
                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_A.png?version=${setting.basic.siteVersion}" /></div>
                        <div class="pull-left name">昵称</div>
                        <div class="pull-left status">已设置</div>
                        <div class="pull-left site">${currentMember.username}</div>
                    </li>
                    
                    [#-- 实名认证 --]
                    [#if currentMember.perfectIdentity()]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_B.png?version=${setting.basic.siteVersion}" /></div>
							<div class="pull-left name">实名认证</div>
	                  		<div class="pull-left status">${secrecy("idNo", currentMember.idNo)}</div>
		                    <div class="pull-left site">${secrecy("fullName", currentMember.name)}</div>
	                    </li>
                    [#else]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_B.png?version=${setting.basic.siteVersion}" /></div>
							<div class="pull-left name">实名认证</div>
	                     	<div class="pull-left status">未认证</div>
	                     	<div class="pull-left site"><a id="identity_verification" href="#identity" class="color-one setting setting-no" data-setting-no="马上认证" data-setting-no-cancel="取消认证">马上认证</a></div>
	                    </li>
	                    <div id="identity" class="display-no">
	                    	<form id="identityForm" action="${base}/account/identity" method="post">
	                            <ul class="form">
	                                <li>
	                                    <div class="form-title pull-left">真实姓名：</div>
	                                    <div class="form-content pull-left"><input type="text" name="name" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">身份证号码：</div>
	                                    <div class="form-content pull-left"><input type="text" name="idNo" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">&nbsp;</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="submit" value="提交" class="btn-one" /></div>
	                                        <div class="pull-left margin-left"><input type="button" value="取消" class="btn-one cancel-one" /></div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </form>
	                    </div>
                    [/#if]
                    
                    [#-- 邮箱认证 --]
                  	[#if currentMember.perfectEmail()]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_C.png?version=${setting.basic.siteVersion}" /></div>
	                        <div class="pull-left name">邮箱认证</div>
	                        <div class="pull-left status">已绑定</div>
	                        <div class="pull-left site">${secrecy("email", currentMember.email)}</div>
	                    </li>
                    [#else]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_C.png?version=${setting.basic.siteVersion}" /></div>
	                        <div class="pull-left name">邮箱认证</div>
	                        <div class="pull-left status">未绑定</div>
	                        <div class="pull-left site"><a id="email_binding" href="#email" class="color-one setting setting-no" data-setting-no="立即绑定" data-setting-no-cancel="取消绑定">立即绑定</a></div>
	                    </li>
	                    <div id="email" class="display-no">
	                        <form id="emailForm" action="${base}/account/email" method="post">
	                            <ul class="form">
	                                <li>
	                                    <div class="form-title pull-left">邮箱地址：</div>
	                                    <div class="form-content pull-left"><input type="text" name="email" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">验证码：</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="text" name="captcha" class="text-one" /></div>
	                                    	<div class="pull-left margin-left"><input type="button" class="btn-one pull-right captchaButton" value="获取验证码" disableClassName="btn-gray" disablePromptValueSuffix="后重发" /></div>
	                                    </div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">&nbsp;</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="submit" value="提交" class="btn-one" /></div>
	                                        <div class="pull-left margin-left"><input type="button" value="取消" class="btn-one cancel-two" /></div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </form>
	                    </div>
                    [/#if]
                    
                    [#-- 手机认证 --]
                    [#if currentMember.perfectMobile()]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_D.png?version=${setting.basic.siteVersion}" /></div>
	                        <div class="pull-left name">手机认证</div>
	                        <div class="pull-left status">已绑定</div>
	                        <div class="pull-left site">${secrecy("mobile", currentMember.mobile)}</div>
	                    </li>
                    [#else]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_D.png?version=${setting.basic.siteVersion}" /></div>
	                        <div class="pull-left name">手机认证</div>
	                        <div class="pull-left status">未绑定</div>
	                        <div class="pull-left site"><a id="mobile_binding" href="#mobile" class="color-one setting setting-no" data-setting-no="立即绑定" data-setting-no-cancel="取消绑定">立即绑定</a></div>
	                    </li>
	                    <div id="mobile" class="display-no">
	                        <form id="mobileForm" action="${base}/account/mobile" method="post">
	                            <ul class="form">
	                                <li>
	                                    <div class="form-title pull-left">手机号码：</div>
	                                    <div class="form-content pull-left"><input type="text" name="mobile" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">验证码：</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="text" name="captcha" class="text-one" /></div>
	                                    	<div class="pull-left margin-left"><input type="button" class="btn-one pull-right captchaButton" value="获取验证码" disableClassName="btn-gray" disablePromptValueSuffix="后重发" /></div>
	                                    </div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">&nbsp;</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="submit" value="提交" class="btn-one" /></div>
	                                        <div class="pull-left margin-left"><input type="button" value="取消" class="btn-one cancel-three" /></div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </form>
	                    </div>
                    [/#if]
                    
                    [#-- 支付密码 --]
                    [#if currentMember.perfectPayPassword()]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_E.png?version=${setting.basic.siteVersion}" /></div>
	                        <div class="pull-left name">支付密码</div>
	                        <div class="pull-left status">已设置</div>
	                        <div class="pull-left site">
	                        	<a id="payment_password_modification_setting" href="#payment_password_modification" class="color-one setting setting-yes" data-setting-yes="修改" data-setting-yes-cancel="取消修改" data-setting-toggle="#payment_password_find_setting">修改</a>
	                        	|
	                        	<a id="payment_password_find_setting" href="#payment_password_find" class="color-one setting setting-no" data-setting-no="找回" data-setting-no-cancel="取消找回" data-setting-toggle="#payment_password_modification_setting">找回</a>
	                        </div>
	                    </li>
	                    <div id="payment_password_modification" class="display-no">
	                        <form id="paymentPasswordModifForm" action="${base}/account/pay_password" method="post">
	                            <ul class="form">
	                                <li>
	                                    <div class="form-title pull-left">当前密码：</div>
	                                    <div class="form-content pull-left"><input type="password" name="currentPassword" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">新密码：</div>
	                                    <div class="form-content pull-left"><input type="password" name="password" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">确认密码：</div>
	                                    <div class="form-content pull-left"><input type="password" name="rePassword" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">&nbsp;</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="submit" value="提交" class="btn-one" /></div>
	                                        <div class="pull-left margin-left"><input type="button" value="取消" class="btn-one cancel-five" /></div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </form>
	                    </div>
	                    <div id="payment_password_find" class="display-no">
	                    	<form id="paymentPasswordFindForm" action="${base}/account/pay_password/reset" method="post">
	                            <ul class="form">
	                                <li>
	                                    <div class="form-title pull-left">新密码：</div>
	                                    <div class="form-content pull-left"><input type="password" name="password" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">确认密码：</div>
	                                    <div class="form-content pull-left"><input type="password" name="rePassword" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">短信验证码：</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="text" name="captcha" class="text-one" /></div>
	                                    	<div class="pull-left margin-left"><input type="button" class="btn-one pull-right captchaButton" value="获取验证码" disableClassName="btn-gray" disablePromptValueSuffix="后重发" /></div>
	                                    </div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">&nbsp;</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="submit" value="提交" class="btn-one" /></div>
	                                        <div class="pull-left margin-left"><input type="button" value="取消" class="btn-one cancel-six" /></div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </form>
	                    </div>
                    [#else]
	                    <li class="list-li">
	                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_E.png?version=${setting.basic.siteVersion}" /></div>
	                        <div class="pull-left name">支付密码</div>
	                        <div class="pull-left status">未设置</div>
	                        <div class="pull-left site"><a id="payment_password_setting_setting" href="#payment_password_setting" class="color-one setting setting-no" data-setting-no="立即设置" data-setting-no-cancel="取消设置">立即设置</a></div>
	                    </li>
	                    <div id="payment_password_setting" class="display-no">
	                        <form id="paymentPasswordSettingForm" action="${base}/account/pay_password" method="post">
	                            <ul class="form">
	                                <li>
	                                    <div class="form-title pull-left">支付密码：</div>
	                                    <div class="form-content pull-left"><input type="password" name="password" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">确认密码：</div>
	                                    <div class="form-content pull-left"><input type="password" name="rePassword" class="text-one" /></div>
	                                    <p class="form-remark"></p>
	                                </li>
	                                <li>
	                                    <div class="form-title pull-left">&nbsp;</div>
	                                    <div class="form-content pull-left">
	                                    	<div class="pull-left"><input type="submit" value="提交" class="btn-one" /></div>
	                                        <div class="pull-left margin-left"><input type="button" value="取消" class="btn-one cancel-four" /></div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </form>
	                    </div>
                    [/#if]
                    
                    [#-- 登录密码 --]
                    <li class="list-li">
                    	<div class="pull-left icon"><img src="${base}/resources/images/sacenr_F.png?version=${setting.basic.siteVersion}" /></div>
                        <div class="pull-left name">登录密码</div>
                        <div class="pull-left status">已设置</div>
                        <div class="pull-left site"><a id="login_password_modification" href="#login_password" class="color-one setting setting-yes" data-setting-yes="修改" data-setting-yes-cancel="取消修改">修改</a></div>
                    </li>
                    <div id="login_password" class="display-no">
                    	<form id="loginPasswordModifForm" action="${base}/account/login_password" method="post">
                            <ul class="form">
                                <li>
                                    <div class="form-title pull-left">当前密码密码：</div>
                                    <div class="form-content pull-left"><input type="password" name="currentPassword" class="text-one" /></div>
                                    <p class="form-remark"></p>
                                </li>
                                <li>
                                    <div class="form-title pull-left">新密码：</div>
                                    <div class="form-content pull-left"><input type="password" name="password" class="text-one" /></div>
                                    <p class="form-remark"></p>
                                </li>
                                <li>
                                    <div class="form-title pull-left">确认密码：</div>
                                    <div class="form-content pull-left"><input type="password" name="rePassword" class="text-one" /></div>
                                    <p class="form-remark"></p>
                                </li>
                                <li>
                                    <div class="form-title pull-left">&nbsp;</div>
                                    <div class="form-content pull-left">
                                    	<div class="pull-left"><input type="submit" value="提交" class="btn-one" /></div>
                                        <div class="pull-left margin-left"><input type="button" value="取消" class="btn-one cancel-seven" /></div>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                </ul>
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
<script type="text/javascript">var modulus = "${modulus}", exponent = "${exponent}";</script>
[#-- 身份认证 --]
[#if !currentMember.perfectIdentity()]
	<script type="text/javascript" src="${base}/resources/member/js/identity.min.js?version=${setting.basic.siteVersion}"></script>
[/#if]
[#-- 邮箱认证 --]
[#if !currentMember.perfectEmail()]
	<script type="text/javascript" src="${base}/resources/member/js/email.min.js?version=${setting.basic.siteVersion}"></script>
[/#if]
[#-- 手机认证 --]
[#if !currentMember.perfectMobile()]
	<script type="text/javascript" src="${base}/resources/member/js/mobile.min.js?version=${setting.basic.siteVersion}"></script>
[/#if]
[#-- 支付密码 --]
[#if currentMember.perfectPayPassword()]
	<script type="text/javascript" src="${base}/resources/member/js/pay_password.modif.min.js?version=${setting.basic.siteVersion}"></script>
	<script type="text/javascript" src="${base}/resources/member/js/pay_password.find.min.js?version=${setting.basic.siteVersion}"></script>
[#else]
	<script type="text/javascript" src="${base}/resources/member/js/pay_password.setting.min.js?version=${setting.basic.siteVersion}"></script>
[/#if]
[#-- 登录密码 --]
<script type="text/javascript" src="${base}/resources/member/js/login_password.modif.min.js?version=${setting.basic.siteVersion}"></script>
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