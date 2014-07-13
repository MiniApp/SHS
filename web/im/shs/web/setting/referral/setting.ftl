[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/referral_setting" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>推荐设置[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					推荐设置
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post">
			<input type="hidden" name="_method" value="put" />
			
			[#-- 提成是否启用 --]
			<div class="form-group">
				<label for="enabled" class="col-sm-2 control-label">
					提成是否启用
				</label>
				<div class="col-sm-4">
					<select id="enabled" class="form-control chosen-select" name="enabled" data-placeholder="&nbsp;">
						<option value="true"[#if setting.enabled] selected="selected"[/#if]>是</option>
						<option value="false"[#if !setting.enabled] selected="selected"[/#if]>否</option>
					</select>
				</div>
			</div>
			
			[#-- 提成费率 --]
			<div class="form-group">
				<label for="feeRate" class="col-sm-2 control-label">
					<span class="required">*</span>
					提成费率
				</label>
				<div class="input-group col-sm-4">
					<input id="feeRate" class="form-control" type="text" name="feeRate" value="${setting.feeRate}" maxlength="3" />
					<label class="input-group-addon">%</label>
				</div>
			</div>
			
			[#-- 提成结算时间 --]
			<div class="form-group">
				<label for="paymentTime" class="col-sm-2 control-label">
					<span class="required">*</span>
					提成提成结算时间
				</label>
				<div class="input-group col-sm-4">
					<input id="paymentTime" class="form-control" type="text" name="paymentTime" value="${setting.paymentTime}" maxlength="3" />
					<label class="input-group-addon">天</label>
				</div>
			</div>
			
			[#-- 提成有效时间 --]
			<div class="form-group">
				<label for="expiryTime" class="col-sm-2 control-label">
					<span class="required">*</span>
					提成有效时间
				</label>
				<div class="input-group col-sm-4">
					<input id="expiryTime" class="form-control" type="text" name="expiryTime" value="${setting.expiryTime}" maxlength="3" />
					<label class="input-group-addon">天</label>
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
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
	[#-- referral.set 推荐设置 --]
	<script type="text/javascript" src="${base}/resources/admin/js/referral.setting.min.js"></script>
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