[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/pers_regist" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>登记个人[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					登记个人
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post">
			[#if redirectType??]
				<input type="hidden" name="redirectType" value="${redirectType}" />
			[/#if]
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="member_tab" href="#member" data-toggle="tab">会员信息</a>
					</li>
					<li>
						<a id="basic_tab" href="#basic" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="family_tab" href="#family" data-toggle="tab">家庭信息</a>
					</li>
					<li>
						<a id="work_tab" href="#work" data-toggle="tab">工作信息</a>
					</li>
					<li>
						<a id="asset_tab" href="#asset" data-toggle="tab">资产信息</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
			
					[#-- 会员信息 --]
					<div id="member" class="tab-pane active" tab-id="member_tab">
				    	[#include "/template/admin/pers_regist/regist/member.ftl" /]
					</div>
			
					[#-- 基本信息 --]
					<div id="basic" class="tab-pane" tab-id="basic_tab">
				    	[#include "/template/admin/pers_regist/regist/basic.ftl" /]
					</div>
			
					[#-- 家庭信息 --]
					<div id="family" class="tab-pane" tab-id="family_tab">
				    	[#include "/template/admin/pers_regist/regist/family.ftl" /]
					</div>
			
					[#-- 工作信息 --]
					<div id="work" class="tab-pane" tab-id="work_tab">
				    	[#include "/template/admin/pers_regist/regist/work.ftl" /]
					</div>
			
					[#-- 资产信息 --]
					<div id="asset" class="tab-pane" tab-id="asset_tab">
				    	[#include "/template/admin/pers_regist/regist/asset.ftl" /]
					</div>
					
				</div>
				
			</div>
												
			[#-- 登记意见 --]
			<div class="form-group">
				<label for="opinion" class="col-sm-2 control-label">
					<span class="required">*</span>
					登记意见
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
						<button class="btn btn-link btn-sm" type="button" onclick="location.href='${baseUrl}/pers'">&nbsp;返&nbsp;回&nbsp;</button>
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
    [#-- jQuery Select For Sascade 级联选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/select/jquery.select.sascade.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- Bootstrap DatetimePicker 日期选择器 --]
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.zh-CN.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.common.min.js"></script>
    [#-- pers.regist 个人登记 --]
    <script type="text/javascript" src="${base}/resources/admin/js/pers.regist.min.js"></script>
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