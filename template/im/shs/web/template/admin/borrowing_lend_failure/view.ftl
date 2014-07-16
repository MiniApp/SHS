[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/borrowing_lend_failure" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>查看出借已失败的借款[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- Font Awesome Icon 图标 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/font-awesome/css/font-awesome.min.css">
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
					借款管理
				</li>
				<li>
					借款失败管理
				</li>
				<li>
					查看出借已失败的借款
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<div class="form-horizontal">
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="borrowing_tab" href="#borrowing" data-toggle="tab">借款信息</a>
					</li>
					<li>
						<a id="borrower_tab" href="#borrower" data-toggle="tab">借款人信息</a>
					</li>
					[#-- 投资信息 --]
					[#include "/template/admin/borrowing/view_investment_tab.ftl" /]
					<li>
						<a id="prev_step_tab" href="${indexUrl}">
							<i class="icon-mail-reply-all"></i>
							返回
						</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
					
					[#-- 借款信息 --]
					<div id="borrowing" class="tab-pane active" tab-id="borrowing_tab">
						[#include "/template/admin/borrowing/view_tab.ftl" /]
					</div>
					
					[#-- 借款人信息 --]
					<div id="borrower" class="tab-pane" tab-id="borrower_tab">
						[#assign pers = borrower /]
						[#include "/template/admin/pers/view_tab.ftl" /]
					</div>
					
					[#-- 投资信息 --]
					[#include "/template/admin/borrowing/view_investment_tab_pane.ftl" /]
					
				</div>
			</div>

		</div>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
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