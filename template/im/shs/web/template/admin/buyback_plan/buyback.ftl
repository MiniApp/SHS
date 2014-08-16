[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/buyback_plan" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>回购回购计划[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- Font Awesome Icon 图标 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/font-awesome/css/font-awesome.min.css">
		[#-- jBreadcrumbs 面包屑 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.fix.min.css" />
		[#-- hint 提示 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/hint/hint.min.css" />
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
					转让管理
				</li>
				<li>
					回购回购计划
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
						<a id="assignment_tab" href="#assignment" data-toggle="tab">转让信息</a>
					</li>
					<li>
						<a id="assignor_tab" href="#assignor" data-toggle="tab">转让人信息</a>
					</li>
					[#-- 投资信息 --]
					[#include "/template/admin/assignment/view_investment_tab.ftl" /]
					[#-- 受让信息 --]
					[#include "/template/admin/assignment/view_assignation_tab.ftl" /]
					[#-- 回购信息 --]
					[#include "/template/admin/assignment/view_buyback_tab.ftl" /]
					[#-- 回收信息 --]
					[#include "/template/admin/assignment/view_recovery_tab.ftl" /]
					<li>
						<a id="buyback_tab" href="#buyback" data-toggle="tab">
							<i class="icon-jpy"></i>
							回购意见
						</a>
					</li>
					<li>
						<a id="prev_step_tab" href="${indexUrl}?[#if currentBuyback?? && currentAssignment??]buyback=${currentBuyback}[#elseif currentAssignment??]assignment=${currentAssignment}[/#if]">
							<i class="icon-mail-reply-all"></i>
							返回
						</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
					
					[#-- 转让信息 --]
					<div id="assignment" class="tab-pane active" tab-id="assignment_tab">
						[#include "/template/admin/assignment/view_tab.ftl" /]
					</div>
					
					[#-- 转让人信息 --]
					<div id="assignor" class="tab-pane" tab-id="assignor_tab">
						[#assign pers = assignor /]
						[#include "/template/admin/pers/view_tab.ftl" /]
					</div>
					
					[#-- 投资信息 --]
					[#include "/template/admin/assignment/view_investment_tab_pane.ftl" /]
					
					[#-- 受让信息 --]
					[#include "/template/admin/assignment/view_assignation_tab_pane.ftl" /]
					
					[#-- 回购信息 --]
					[#include "/template/admin/assignment/view_buyback_tab_pane.ftl" /]
					
					[#-- 回收信息 --]
					[#include "/template/admin/assignment/view_recovery_tab_pane.ftl" /]
					
					[#-- 回购意见 --]
					<div id="buyback" class="tab-pane" tab-id="buyback_tab">
						[#include "/template/admin/buyback_plan/buyback_tab_pane.ftl" /]
					</div>
					
				</div>
			</div>

		</div>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
	[#-- validate 验证器 --]
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
    [#-- buyback_plan.buyback 回购计划回购 --]
	<script type="text/javascript" src="${base}/resources/admin/js/buyback_plan.buyback.min.js"></script>
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