[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/borrowing_repayment_record" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>还款借款[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					借款管理
				</li>
				<li>
					借款维护管理
				</li>
				<li>
					还款借款
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
					[#-- 出借信息 --]
					[#include "/template/admin/borrowing/view_lending_tab.ftl" /]
					[#-- 还款信息 --]
					[#include "/template/admin/borrowing/view_repayment_tab.ftl" /]
					[#-- 回收信息 --]
					[#include "/template/admin/borrowing/view_recovery_tab.ftl" /]
					<li>
						<a id="repay_tab" href="#repay" data-toggle="tab">
							<i class="icon-jpy"></i>
							还款意见
						</a>
					</li>
					<li>
						<a id="prev_step_tab" href="${indexUrl}?[#if currentRepayment?? && currentBorrowing??]repayment=${currentRepayment}[#elseif currentBorrowing??]borrowing=${currentBorrowing}[/#if]">
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
					
					[#-- 出借信息 --]
					[#include "/template/admin/borrowing/view_lending_tab_pane.ftl" /]
					
					[#-- 还款信息 --]
					[#include "/template/admin/borrowing/view_repayment_tab_pane.ftl" /]
					
					[#-- 回收信息 --]
					[#include "/template/admin/borrowing/view_recovery_tab_pane.ftl" /]
					
					[#-- 还款意见 --]
					<div id="repay" class="tab-pane" tab-id="repay_tab">
						[#include "/template/admin/borrowing_repayment_record/repay_tab_pane.ftl" /]
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
    [#-- borrowing.repay 借款还款 --]
	<script type="text/javascript" src="${base}/resources/admin/js/borrowing.repay.min.js"></script>
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