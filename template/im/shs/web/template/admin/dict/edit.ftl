[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/dict" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>编辑词典[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					内容管理
				</li>
				<li>
					编辑词典
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${dict.id}" method="post">
			
			[#-- 名称 --]
			<div class="form-group">
				<label for="name" class="col-sm-2 control-label">
					<span class="required">*</span>
					名称
				</label>
				<div class="col-sm-4">
					<input id="name" class="form-control" type="text" name="name" value="${dict.name}" maxlength="200" />
				</div>
			</div>
			
			[#-- 标识 --]
			<div class="form-group">
				<label for="ident" class="col-sm-2 control-label">
					<span class="required">*</span>
					标识
				</label>
				<div class="col-sm-4">
					<input id="ident" class="form-control uppercase" type="text" name="ident" value="${dict.ident}" maxlength="200" />
				</div>
			</div>
		
			[#-- 描述 --]
			<div class="form-group">
				<label for="description" class="col-sm-2 control-label">
					描述
				</label>
				<div class="col-sm-4">
					<textarea id="description" class="form-control" name="description" cols="10" rows="5">${dict.description}</textarea>
				</div>
			</div>
			
			[#-- 排序 --]
			<div class="form-group">
				<label for="order" class="col-sm-2 control-label">
					排序
				</label>
				<div class="col-sm-4">
					<input id="order" class="form-control" type="text" name="order" value="${dict.order}" maxlength="9" />
				</div>
			</div>
					
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					[#if dict.builtin]
						<span class="btn btn-danger btn-sm">&nbsp;内置词典不允许修改&nbsp;</span>
					[#else]
						<button class="btn btn-default btn-sm" type="submit">&nbsp;修&nbsp;改&nbsp;</button>
					[/#if]
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}'">&nbsp;返&nbsp;回&nbsp;</button>
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
	[#-- dict.edit 词典编辑 --]
	<script type="text/javascript">
		var previousName = "${dict.name}", previousIdent = "${dict.ident}";
	</script>
	<script type="text/javascript" src="${base}/resources/admin/js/dict.edit.min.js"></script>
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