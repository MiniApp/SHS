[@compress single_line = !systemDevelopment]
[#-- shiro --]
[#assign shiro=JspTaglibs["/WEB-INF/tld/shiro.tld"] /]
[#-- 公共参数 --]
[#include "/admin/include/param_common.ftl" /]
<!DOCTYPE html>
<html lang="en" class="menu">
	<head>
		[#-- meta 标签 --]
    	[#include "/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>管理中心[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/admin/include/link_top.ftl" /]
		[#-- menu 菜单 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/admin/css/menu.min.css" />
		[#-- hint 提示 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/hint/hint.min.css" />
		[#-- 有瞬时消息时 --]
		[#if flashMessage != null]
			[#-- HubSpot Messenger 弹框（Alert）组件库 --]
			<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.min.css" />
			<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.theme.future.min.css" />
		[/#if]
		[#-- Link 底部 --]
    	[#include "/admin/include/link_bottom.ftl" /]
    </head>
    <body>
		[#-- 页眉 --]
    	[#include "/admin/include/header.ftl" /]
		[#-- 边导航 --]
    	[#include "/admin/include/sidebar.ftl" /]
		[#-- iframe --]
		<iframe id="iframe" class="iframe" name="iframe" src="${base}/admin/admin" frameborder="0"></iframe>
		[#-- Script 顶部 --]
    	[#include "/admin/include/script_top.ftl" /]
		[#-- slimScroll 滚动条 --]
		<script type="text/javascript" src="${base}/resources/lib/slimScroll/jquery.slimscroll.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/slimScroll/jquery.slimscroll.common.min.js"></script>
		[#-- menu 菜单 --]
		<script type="text/javascript" src="${base}/resources/admin/js/menu.min.js"></script>
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
    	[#include "/admin/include/script_bottom.ftl" /]
	</body>
</html>
[/@compress]