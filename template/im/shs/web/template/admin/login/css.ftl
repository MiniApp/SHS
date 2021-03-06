/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 * 
 * Cascading Style Sheets - Login
 * Version: 3.0
 */
[#-- 启用验证码 --]
[#assign enabledCaptcha = setting.security.captchaScopes?? && setting.security.captchaScopes?seq_contains("adminLogin") /]
html.login .dialog-box {
	background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    bottom: 0;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    height: [#if enabledCaptcha]387px[#else]332px[/#if];
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 350px;
}

html.login .title-bar {
	background-color: #E0E0E0;
    border-bottom: 1px solid #CCCCCC;
    font-size: 15px;
    height: 40px;
    line-height: 35px;
    padding: 0 20px;
}

html.login #flashMessage {
	color: #B94A48;
    height: 28px;
    margin: 10px;
    padding: 3px 14px
}

html.login .form-groups {
	margin: 0 auto;
    width: 70%;
}

html.login .form-groups .form-group {
	height: 55px;
    margin-bottom: 0;
}

html.login .form-group.fieldError .errorMessage {
	font-size: 12px;
}

html.login img.captchaImage {
	border-color: #CCCCCC;
    border-radius: 0 3px 3px 0;
    border-style: solid;
    border-width: 1px 1px 1px 0;
    cursor: pointer;
    height: 28px;
    width: 80px;
}

html.login .control-toolbar {
	background-color: #F7F7F7;
    border-top: 1px solid #E7E7E7;
    padding: 10px 20px;
}

html.login .copyright {
	background-color: #F7F7F7;
    border-top: 1px solid #E7E7E7;
    font-size: 12px;
    padding: 5px 0;
    text-align: center;
}