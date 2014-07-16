[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/account" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>查看账户[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/admin/include/link_top.ftl" /]
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
    	[#include "/admin/include/link_bottom.ftl" /]
    </head>
    <body class="contentwrapper">

		[#-- 面包屑 --]
		<div id="jBreadCrumb" class="breadCrumb module">
			<ul>
				<li>
					<a href="${homepageUrl}"></a>
				</li>
				<li>
					资金管理
				</li>
				<li>
					账户管理
				</li>
				<li>
					查看账户
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
						<a id="view_account_basic_tab" href="#view_account_basic" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="view_account_tab" href="#view_account" data-toggle="tab">账户人信息</a>
					</li>
					<li class="dropdown">
						<a id="operate_tab" href="#" data-toggle="dropdown" class="dropdown-toggle">
							操作
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li>
								<a href="${baseUrl}/account_recharge/${account.id}?redirectType=view">充值</a>
							</li>
							<li>
								<a href="${baseUrl}/account_charge/${account.id}?redirectType=view">扣费</a>
							</li>
						</ul>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
			
					[#-- 基本信息 --]
					<div id="view_account_basic" class="tab-pane active" tab-id="view_account_basic_tab">
				    	[#include "/admin/account/view/basic.ftl" /]
					</div>
			
					[#-- 账户人信息 --]
					<div id="view_account" class="tab-pane" tab-id="view_account_tab">
				    	[#assign pers = account /]
				    	[#include "/admin/pers/view_tab.ftl" /]
					</div>
			
				</div>
				
			</div>
							
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}'">&nbsp;返&nbsp;回&nbsp;</button>
				</div>
			</div>
			
		</div>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/admin/include/script_top.ftl" /]
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
	[#include "/admin/include/script_bottom.ftl" /]
</html>
[/@compress]