[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/storage_plugin/file" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>设置本地文件存储 [#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					插件管理
				</li>
				<li>
					设置本地文件存储
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/setting" method="post">
			<input type="hidden" name="_method" value="put" /> 
			
			[#-- 存储方式名称 --]
			<div class="form-group">
				<label for="storageName" class="col-sm-2 control-label">
					<span class="required">*</span>
					存储方式名称
				</label>
				<div class="col-sm-4">
					<input id="storageName" class="form-control" type="text" name="storageName" value="${plugin.attributes['storageName']}" maxlength="200" />
				</div>
			</div>
			
			[#-- URL前缀 --]
			<div class="form-group">
				<label for="urlPrefix" class="col-sm-2 control-label">
					URL前缀
				</label>
				<div class="col-sm-4">
					<input id="urlPrefix" class="form-control" type="text" name="urlPrefix" value="${plugin.attributes['urlPrefix']}" maxlength="200" />
				</div>
			</div>
		
			[#-- 描述 --]
			<div class="form-group">
				<label for="description" class="col-sm-2 control-label">
					描述
				</label>
				<div class="col-sm-4">
					<textarea id="description" class="form-control" name="description" cols="10" rows="5">${plugin.attributes['description']?html}</textarea>
				</div>
			</div>
			
			[#-- 排序 --]
			<div class="form-group">
				<label for="order" class="col-sm-2 control-label">
					排序
				</label>
				<div class="col-sm-4">
					<input id="order" class="form-control" type="text" name="order" value="${plugin.order}" maxlength="20" />
				</div>
			</div>
						
			[#-- 是否启用 --]
			<div class="form-group">
				<label for="enabled" class="col-sm-2 control-label">
					是否启用
				</label>
				<div class="col-sm-4">
					<select id="enabled" class="form-control chosen-select" name="enabled" data-placeholder="&nbsp;">
						<option value="true"[#if plugin.enabled] selected="selected"[/#if]>是</option>
						<option value="false"[#if !plugin.enabled] selected="selected"[/#if]>否</option>
					</select>
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;提&nbsp;交&nbsp;</button>
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${baseUrl}/storage_plugin'">&nbsp;返&nbsp;回&nbsp;</button>
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
	[#-- file.setting 本地文件存储设置 --]
	<script type="text/javascript" src="${base}/resources/admin/js/file.setting.min.js"></script>
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