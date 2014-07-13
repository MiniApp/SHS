[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/comm_setting" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>通信设置[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
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
					系统管理
				</li>
				<li>
					系统设置
				</li>
				<li>
					通信设置
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post">
			<input type="hidden" name="_method" value="put" />
			
			[#-- 发件人邮箱 --]
			<div class="form-group">
				<label for="smtpFromMail" class="col-sm-2 control-label">
					<span class="required">*</span>
					发件人邮箱
				</label>
				<div class="col-sm-4">
					<input id="smtpFromMail" class="form-control" type="text" name="smtpFromMail" value="${setting.smtpFromMail}" maxlength="200" />
				</div>
			</div>
		
			[#-- SMTP服务器地址 --]
			<div class="form-group">
				<label for="smtpHost" class="col-sm-2 control-label">
					<span class="required">*</span>
					SMTP服务器地址
				</label>
				<div class="col-sm-4">
					<input id="smtpHost" class="form-control" type="text" name="smtpHost" value="${setting.smtpHost}" maxlength="200" />
				</div>
			</div>
		
			[#-- SMTP服务器端口 --]
			<div class="form-group">
				<label for="smtpPort" class="col-sm-2 control-label">
					<span class="required">*</span>
					SMTP服务器端口
				</label>
				<div class="col-sm-4">
					<input id="smtpPort" class="form-control" type="text" name="smtpPort" value="${setting.smtpPort}" maxlength="200" />
				</div>
			</div>
		
			[#-- SMTP用户名 --]
			<div class="form-group">
				<label for="smtpUsername" class="col-sm-2 control-label">
					<span class="required">*</span>
					SMTP用户名
				</label>
				<div class="col-sm-4">
					<input id="smtpUsername" class="form-control" type="text" name="smtpUsername" value="${setting.smtpUsername}" maxlength="200" />
				</div>
			</div>
		
			[#-- SMTP密码 --]
			<div class="form-group">
				<label for="smtpPassword" class="col-sm-2 control-label">
					<span class="required">*</span>
					SMTP密码
				</label>
				<div class="col-sm-4">
					<input id="smtpPassword" class="form-control" type="text" name="smtpPassword" value="${setting.smtpPassword}" maxlength="200" />
				</div>
			</div>
		
			[#-- SMS统一资源定位符 --]
			<div class="form-group">
				<label for="smsURL" class="col-sm-2 control-label">
					<span class="required">*</span>
					SMS统一资源定位符
				</label>
				<div class="col-sm-4">
					<input id="smsURL" class="form-control" type="text" name="smsURL" value="${setting.smsURL}" maxlength="200" />
				</div>
			</div>
		
			[#-- SMS用户名 --]
			<div class="form-group">
				<label for="smsUsername" class="col-sm-2 control-label">
					<span class="required">*</span>
					SMS用户名
				</label>
				<div class="col-sm-4">
					<input id="smsUsername" class="form-control" type="text" name="smsUsername" value="${setting.smsUsername}" maxlength="200" />
				</div>
			</div>
		
			[#-- SMS密码 --]
			<div class="form-group">
				<label for="smsPassword" class="col-sm-2 control-label">
					<span class="required">*</span>
					SMS密码
				</label>
				<div class="col-sm-4">
					<input id="smsPassword" class="form-control" type="text" name="smsPassword" value="${setting.smsPassword}" maxlength="200" />
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;修&nbsp;改&nbsp;</button>
				</div>
			</div>
			
		</form>
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
	[#-- comm.set 通信设置 --]
	<script type="text/javascript" src="${base}/resources/admin/js/comm.setting.min.js"></script>
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