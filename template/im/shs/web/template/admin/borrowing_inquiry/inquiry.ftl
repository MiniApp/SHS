[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/borrowing_inquiry" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>调查借款[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
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
					借款管理
				</li>
				<li>
					借款筹备管理
				</li>
				<li>
					调查借款
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${id}" method="post" enctype="multipart/form-data">
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="borrowing_basic_tab" href="#borrowing_basic" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="borrowing_inquiry_tab" href="#borrowing_inquiry" data-toggle="tab">调查信息</a>
					</li>
					<li>
						<a id="borrowing_guarantee_tab" href="#borrowing_guarantee" data-toggle="tab">担保信息</a>
					</li>
					<li>
						<a id="borrowing_risk_control_tab" href="#borrowing_risk_control" data-toggle="tab">风控信息</a>
					</li>
					<li>
						<a id="borrowing_material_tab" href="#borrowing_material" data-toggle="tab">材料信息</a>
					</li>
					[#-- 存在借款意见时 --]
					[#if borrowing.opinions?size gt 0]
						<li>
							<a id="borrowing_opinions_tab" href="#borrowing_opinions" data-toggle="tab">日志信息</a>
						</li>
					[/#if]
					<li>
						<a id="borrower_tab" href="#borrower" data-toggle="tab">借款人信息</a>
					</li>
					<li>
						<a id="inquiry_tab" href="#inquiry" data-toggle="tab">
							<i class="icon-shield"></i>
							调查意见
						</a>
					</li>
					<li>
						<a id="prev_step_tab" href="${indexUrl}">
							<i class="icon-mail-reply-all"></i>
							返回
						</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
					
					[#-- 基本信息 --]
					<div id="borrowing_basic" class="tab-pane active" tab-id="borrowing_basic_tab">
				    	[#include "/admin/borrowing_inquiry/inquiry/basic.ftl" /]
					</div>
					
					[#-- 借款调查 --]
					<div id="borrowing_inquiry" class="tab-pane" tab-id="borrowing_inquiry_tab">
				    	[#include "/admin/borrowing_inquiry/inquiry/inquiry.ftl" /]
					</div>
					
					[#-- 借款担保 --]
					<div id="borrowing_guarantee" class="tab-pane" tab-id="borrowing_guarantee_tab">
				    	[#include "/admin/borrowing_inquiry/inquiry/guarantee.ftl" /]
					</div>
					
					[#-- 借款风控 --]
					<div id="borrowing_risk_control" class="tab-pane" tab-id="borrowing_risk_control_tab">
				    	[#include "/admin/borrowing_inquiry/inquiry/risk_control.ftl" /]
					</div>
					
					[#-- 借款材料 --]
					<div id="borrowing_material" class="tab-pane" tab-id="borrowing_material_tab">
				    	[#include "/admin/borrowing_inquiry/inquiry/material.ftl" /]
					</div>
					
					[#-- 存在借款意见时 --]
					[#if borrowing.opinions?size gt 0]
						[#-- 日志信息 --]
						<div id="borrowing_opinions" class="tab-pane" tab-id="borrowing_opinions_tab">
							[#assign opinions = borrowing.opinions /]
					    	[#include "/admin/borrowing_opinion/view_list.ftl" /]
						</div>
					[/#if]
				
					[#-- 借款人信息 --]
					<div id="borrower" class="tab-pane" tab-id="borrower_tab">
						[#assign pers = borrower /]
						[#include "/admin/pers/view_tab.ftl" /]
					</div>
					
					[#-- 调查意见 --]
					<div id="inquiry" class="tab-pane" tab-id="inquiry_tab">
						
						[#-- 调查状态 --]
						<div class="form-group">
							<label for="state" class="col-sm-2 control-label">
								调查状态
							</label>
							<div class="col-sm-4">
								<select id="state" class="form-control chosen-select" name="state" data-placeholder="&nbsp;">
									<option value="wait">待继续调查</option>
									<option value="success">调查已通过</option>
									<option value="failure">调查未通过</option>
								</select>
							</div>
						</div>
															
						[#-- 调查意见 --]
						<div class="form-group">
							<label for="opinion" class="col-sm-2 control-label">
								<span class="required">*</span>
								调查意见
							</label>
							<div class="col-sm-4">
								<textarea id="opinion" class="form-control" name="opinion" cols="10" rows="5"></textarea>
							</div>
						</div>
			
					</div>
					
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;提&nbsp;交&nbsp;</button>
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}'">&nbsp;返&nbsp;回&nbsp;</button>
				</div>
			</div>
			
		</form>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/admin/include/script_top.ftl" /]
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
	[#-- borrowing.inquiry 借款调查 --]
    <script type="text/javascript">
    	var materialIndex = ${(borrowing.materials?size)!"0"};
	</script>
	<script type="text/javascript" src="${base}/resources/admin/js/borrowing.inquiry.min.js"></script>
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