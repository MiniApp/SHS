[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/assignment_apply" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>申请转让[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
		[#-- Bootstrap DatetimePicker 日期选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/datepicker/bootstrap.datetimepicker.min.css" />
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
					转让管理
				</li>
				<li>
					转让筹备管理
				</li>
				<li>
					申请转让
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post" enctype="multipart/form-data">
			[#if redirectType??]
				<input type="hidden" name="redirectType" value="${redirectType}" />
			[/#if]
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="assignment_basic_tab" href="#assignment_basic" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="assignment_inquiry_tab" href="#assignment_inquiry" data-toggle="tab">调查信息</a>
					</li>
					<li>
						<a id="assignment_guarantee_tab" href="#assignment_guarantee" data-toggle="tab">担保信息</a>
					</li>
					<li>
						<a id="assignment_risk_control_tab" href="#assignment_risk_control" data-toggle="tab">风控信息</a>
					</li>
					<li>
						<a id="assignment_material_tab" href="#assignment_material" data-toggle="tab">材料信息</a>
					</li>
					<li>
						<a id="prepare_tab" href="#prepare" data-toggle="tab">
							<i class="icon-plus"></i>
							筹备意见
						</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
				
					[#-- 基本信息 --]
					<div id="assignment_basic" class="tab-pane active" tab-id="assignment_basic_tab">
				    	[#include "/admin/assignment_apply/apply/basic.ftl" /]
					</div>
					
					[#-- 调查信息 --]
					<div id="assignment_inquiry" class="tab-pane" tab-id="assignment_inquiry_tab">
				    	[#include "/admin/assignment_apply/apply/inquiry.ftl" /]
					</div>
					
					[#-- 担保信息 --]
					<div id="assignment_guarantee" class="tab-pane" tab-id="assignment_guarantee_tab">
				    	[#include "/admin/assignment_apply/apply/guarantee.ftl" /]
					</div>
					
					[#-- 风控信息 --]
					<div id="assignment_risk_control" class="tab-pane" tab-id="assignment_risk_control_tab">
				    	[#include "/admin/assignment_apply/apply/risk_control.ftl" /]
					</div>
					
					[#-- 材料信息 --]
					<div id="assignment_material" class="tab-pane" tab-id="assignment_material_tab">
				    	[#include "/admin/assignment_apply/apply/material.ftl" /]
					</div>
					
					[#-- 筹备意见 --]
					<div id="prepare" class="tab-pane" tab-id="prepare_tab">
					
						[#-- 筹备状态 --]
						<div class="form-group">
							<label for="inquired" class="col-sm-2 control-label">
								筹备状态
							</label>
							<div class="col-sm-4">
								<select id="inquired" class="form-control chosen-select" name="inquired" data-placeholder="&nbsp;">
									<option value="false">待调查</option>
									<option value="true">待确认</option>
								</select>
							</div>
						</div>
															
						[#-- 筹备意见 --]
						<div class="form-group">
							<label for="opinion" class="col-sm-2 control-label">
								<span class="required">*</span>
								筹备意见
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
    [#-- Bootstrap DatetimePicker 日期选择器 --]
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.zh-CN.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
    [#-- assignment.apply 转让申请 --]
    <script type="text/javascript" src="${base}/resources/admin/js/assignment.apply.min.js"></script>
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