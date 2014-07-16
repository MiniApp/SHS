<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>${setting.basic.siteName}[#if systemShowPowered] - Powered By ICLNetwork[/#if]</title>
<meta name="author" content="ICLNetwork Team" />
<meta name="copyright" content="ICLNetwork" />
</head>
<body>
	<p>${username}:您好！</p>
	<p>本次绑定邮箱地址的动态密码为：${token.code}[#if token.expiry]（有效时间至：${token.expiry?string("yyyy-MM-dd HH:mm")}）[/#if]</p>
	<p>请妥善管理，勿转告他人。</p>
	<p>${setting.basic.siteName}</p>
	<p>${.now?string("yyyy-MM-dd")}</p>
</body>
</html>