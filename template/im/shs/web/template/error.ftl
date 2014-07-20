[@compress single_line = !systemDevelopment]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/include/meta.ftl" /]
<title>${setting.basic.siteName}-错误</title>
[#-- Link 顶部 --]
[#include "/include/link_top.ftl" /]
[#-- Link 底部 --]
[#include "/include/link_bottom.ftl" /]
</head>
<body class="homepage">
<div class="content">可能该服务已经过期，或者您输入的地址有误。您可以继续浏览 <a href="${base}/">${setting.basic.siteName}首页</a></div>
[#-- Script 顶部 --]
[#include "/include/script_top.ftl" /]
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]