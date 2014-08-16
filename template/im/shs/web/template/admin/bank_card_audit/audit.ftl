[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/bank_card_audit" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>审核银行卡[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
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
					资金管理
				</li>
				<li>
					银行卡管理
				</li>
				<li>
					审核银行卡
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
						<a id="view_bank_card_basic_tab" href="#view_bank_card_basic" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="view_cardholder_tab" href="#view_cardholder" data-toggle="tab">持卡人信息</a>
					</li>
					[#-- 银行卡日志 --]
					[#if bankCard.logs?size gt 0]
						<li>
							<a id="view_bank_card_logs_tab" href="#view_bank_card_logs" data-toggle="tab">银行卡日志</a>
						</li>
					[/#if]
					<li>
						<a id="audit_tab" href="#audit" data-toggle="tab">银行卡审核</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
				
					[#-- 基本信息 --]
					<div id="view_bank_card_basic" class="tab-pane active" tab-id="view_bank_card_basic_tab">
				    	[#include "/template/admin/bank_card/view/basic.ftl" /]
					</div>
					
					[#-- 持卡人信息 --]
					<div id="view_cardholder" class="tab-pane" tab-id="view_cardholder_tab">
						[#assign pers = bankCard.cardholder /]
						[#include "/template/admin/pers/view_tab.ftl" /]
					</div>
					
					[#-- 银行卡日志 --]
					[#if bankCard.logs?size gt 0]
						<div id="view_bank_card_logs" class="tab-pane" tab-id="view_bank_card_logs_tab">
					    	[#include "/template/admin/bank_card_log/view_list.ftl" /]
						</div>
					[/#if]
					
					[#-- 银行卡审核 --]
					<div id="audit" class="tab-pane" tab-id="audit_tab">
				    	[#-- 表单 --]
						<form id="inputForm" action="${indexUrl}/${id}" method="post">
							[#if redirectType??]
								<input type="hidden" name="redirectType" value="${redirectType}" />
							[/#if]
							[#if state??]
								<input type="hidden" name="state" value="${state}" />
							[/#if]
							
							[#-- 审核状态 --]
							<div class="form-group">
								<label for="approved" class="col-sm-2 control-label">
									审核状态
								</label>
								<div class="col-sm-4">
									<select id="approved" class="form-control chosen-select" name="approved" data-placeholder="&nbsp;">
										<option value="true">通过</option>
										<option value="false">不通过</option>
									</select>
								</div>
							</div>
												
							[#-- 审核意见 --]
							<div class="form-group">
								<label for="opinion" class="col-sm-2 control-label">
									<span class="required">*</span>
									审核意见
								</label>
								<div class="col-sm-4">
									<textarea id="opinion" class="form-control" name="opinion" cols="10" rows="5"></textarea>
								</div>
							</div>
							
							[#-- 表单按钮 --]
							<div class="form-group">
								<div class="col-sm-offset-2 col-sm-4">
									<button class="btn btn-default btn-sm" type="submit">&nbsp;提&nbsp;交&nbsp;</button>
									[#if redirectType == "list"]
										<button class="btn btn-link btn-sm" type="button" onclick="location.href='${baseUrl}/bank_card[#if state??]?state=${state}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
									[#elseif redirectType == "view"]
										<button class="btn btn-link btn-sm" type="button" onclick="location.href='${baseUrl}/bank_card/${bankCard.id}[#if state??]?state=${state}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
									[#else]
										<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}'">&nbsp;返&nbsp;回&nbsp;</button>
									[/#if]
								</div>
							</div>
							
						</form>
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
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
	[#-- bank_card.audit 银行卡审核 --]
	<script type="text/javascript" src="${base}/resources/admin/js/bank_card.audit.min.js"></script>
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