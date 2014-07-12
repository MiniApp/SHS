[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/member_regist" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>注册会员[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
		[#-- Bootstrap DatetimePicker 日期选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/datepicker/bootstrap.datetimepicker.min.css" />
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
					会员管理
				</li>
				<li>
					注册会员
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post">
			[#if redirectType??]
				<input type="hidden" name="redirectType" value="${redirectType}" />
			[/#if]
			
			[#-- 用户名 --]
			<div class="form-group">
				<label for="username" class="col-sm-2 control-label">
					<span class="required">*</span>
					用户名
				</label>
				<div class="col-sm-4">
					<input id="username" class="form-control" type="text" name="username" maxlength="20" autocomplete="off" />
				</div>
			</div>
					
			[#-- 密码 --]
			<div class="form-group">
				<label for="password" class="col-sm-2 control-label">
					<span class="required">*</span>
					密码
				</label>
				<div class="col-sm-4">
					<input id="password" class="form-control" type="password" name="password" maxlength="20" autocomplete="off" />
				</div>
			</div>
			
			[#-- 确认密码 --]
			<div class="form-group">
				<label for="rePassword" class="col-sm-2 control-label">
					<span class="required">*</span>
					确认密码
				</label>
				<div class="col-sm-4">
					<input id="rePassword" class="form-control" type="password" name="rePassword" maxlength="20" autocomplete="off" />
				</div>
			</div>
			
			[#-- 姓名 --]
			<div class="form-group">
				<label for="name" class="col-sm-2 control-label">
					姓名
				</label>
				<div class="col-sm-4">
					<input id="name" class="form-control" type="text" name="name" maxlength="200" />
				</div>
			</div>
			
			[#-- 身份证号码 --]
			<div class="form-group">
				<label for="idNo" class="col-sm-2 control-label">
					身份证号码
				</label>
				<div class="col-sm-4">
					<input id="idNo" class="form-control" type="text" name="idNo" maxlength="200" />
				</div>
			</div>

			[#-- 性别 --]
			<div class="form-group">
				<label for="gender" class="col-sm-2 control-label">
					性别
				</label>
				<div class="col-sm-4">
					<select id="gender" class="form-control chosen-select" name="gender" data-placeholder="&nbsp;">
						<option value="">-</option>
						[#list genders as gender]
							<option value="${gender}">${message("Gender." + gender)}</option>
						[/#list]
					</select>
				</div>
			</div>
			
			[#-- 出生日期 --]
			<div class="form-group">
				<label for="birth" class="col-sm-2 control-label">
					出生日期
				</label>
				<div class="col-sm-4">
					<input id="birth" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="birth" />
				</div>
			</div>
			
			[#-- 邮箱地址 --]
			<div class="form-group">
				<label for="email" class="col-sm-2 control-label">
					邮箱地址
				</label>
				<div class="col-sm-4">
					<input id="email" class="form-control" type="text" name="email" maxlength="200" />
				</div>
			</div>
			
			[#-- 手机号码 --]
			<div class="form-group">
				<label for="mobile" class="col-sm-2 control-label">
					手机号码
				</label>
				<div class="col-sm-4">
					<input id="mobile" class="form-control" type="text" name="mobile" maxlength="200" />
				</div>
			</div>
						
			[#-- 是否启用 --]
			<div class="form-group">
				<label for="enabled" class="col-sm-2 control-label">
					是否启用
				</label>
				<div class="col-sm-4">
					<select id="enabled" class="form-control chosen-select" name="enabled" data-placeholder="&nbsp;">
						<option value="true">是</option>
						<option value="false">否</option>
					</select>
				</div>
			</div>
												
			[#-- 注册意见 --]
			<div class="form-group">
				<label for="opinion" class="col-sm-2 control-label">
					<span class="required">*</span>
					注册意见
				</label>
				<div class="col-sm-4">
					<textarea id="opinion" class="form-control" name="opinion" cols="10" rows="5"></textarea>
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;注&nbsp;册&nbsp;</button>
					[#if redirectType == "list"]
						<button class="btn btn-link btn-sm" type="button" onclick="location.href='${baseUrl}/member'">&nbsp;返&nbsp;回&nbsp;</button>
					[/#if]
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
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- Bootstrap DatetimePicker 日期选择器 --]
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.zh-CN.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.common.min.js"></script>
    [#-- member.regist 会员注册 --]
    <script type="text/javascript" src="${base}/resources/admin/js/member.regist.min.js"></script>
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