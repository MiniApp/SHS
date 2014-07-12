[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/recharge" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>查看充值[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
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
					资金管理
				</li>
				<li>
					充值管理
				</li>
				<li>
					查看充值
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
						<a id="view_recharge_basic_tab" href="#view_recharge_basic" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="view_payer_tab" href="#view_payer" data-toggle="tab">付款人信息</a>
					</li>
					[#-- 充值日志 --]
					[#if recharge.logs?size gt 0]
						<li>
							<a id="view_recharge_logs_tab" href="#view_recharge_logs" data-toggle="tab">充值日志</a>
						</li>
					[/#if]
					[#if recharge.state != "success"]
						<li class="dropdown">
							<a id="operate_tab" href="#" data-toggle="dropdown" class="dropdown-toggle">
								操作
								<b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
								[#if recharge.state == "auditing"]
									<li>
						        		<a href="${indexUrl}_modif/${recharge.id}?redirectType=view[#if state??]&state=${state}[/#if]">修改</a>
									</li>
									<li>
										<a href="${indexUrl}_audit/${recharge.id}?redirectType=view[#if state??]&state=${state}[/#if]">审核</a>
									</li>
				            	[/#if]
								[#if recharge.state == "transferring"]
									<li>
										<a href="${indexUrl}_transfer/${recharge.id}?redirectType=view[#if state??]&state=${state}[/#if]">转账</a>
									</li>
				            	[/#if]
				            	[#if recharge.state == "auditing" || recharge.state == "transferring"]
				            		<li>
										<a href="${indexUrl}_cancel/${recharge.id}?redirectType=view[#if state??]&state=${state}[/#if]">取消</a>
									</li>
				            	[/#if]
				            	[#if recharge.state == "cancel" || recharge.state == "failure"]
				            		<li>
										<a href="${indexUrl}_remedy/${recharge.id}?redirectType=view[#if state??]&state=${state}[/#if]">补救</a>
									</li>
				            	[/#if]
							</ul>
						</li>
					[/#if]
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
				
					[#-- 基本信息 --]
					<div id="view_recharge_basic" class="tab-pane active" tab-id="view_recharge_basic_tab">
				    	[#include "/template/admin/recharge/view/basic.ftl" /]
					</div>
					
					[#-- 付款人信息 --]
					<div id="view_payer" class="tab-pane" tab-id="view_payer_tab">
						[#assign pers = recharge.member /]
						[#include "/template/admin/pers/view_tab.ftl" /]
					</div>
					
					[#-- 充值日志 --]
					[#if recharge.logs?size gt 0]
						<div id="view_recharge_logs" class="tab-pane" tab-id="view_recharge_logs_tab">
					    	[#include "/template/admin/recharge_log/view_list.ftl" /]
						</div>
					[/#if]
					
				</div>
				
			</div>
							
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}[#if state??]?state=${state}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
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