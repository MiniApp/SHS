[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/article" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>编辑文章[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					内容管理
				</li>
				<li>
					文章管理
				</li>
				<li>
					编辑文章
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${article.id}" method="post">
			[#if articleCategoryId??]
				<input type="hidden" name="articleCategoryId" value="${articleCategoryId}" />
			[/#if]
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="basic_tab" href="#basic" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="seo_tab" href="#seo" data-toggle="tab">页面信息</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
				
					[#-- 基本信息 --]
					<div id="basic" class="tab-pane active" tab-id="basic_tab">
			
						[#-- 文章分类 --]
						<div class="form-group">
							<label for="category" class="col-sm-2 control-label">
								文章分类
							</label>
							<input class="selectSascade articleCategory" type="hidden" name="categoryId" value="${(category.id)!}" treePath="${(category.treePath)!}" />
						</div>
								
						[#-- 别名 --]
						<div class="form-group">
							<label for="alias" class="col-sm-2 control-label">
								<span class="required">*</span>
								别名
							</label>
							<div class="col-sm-4">
								<input id="alias" class="form-control" type="text" name="alias" value="${article.alias}" maxlength="100" />
							</div>
						</div>
						
						[#-- 标题 --]
						<div class="form-group">
							<label for="title" class="col-sm-2 control-label">
								<span class="required">*</span>
								标题
							</label>
							<div class="col-sm-4">
								<input id="title" class="form-control" type="text" name="title" value="${article.title}" maxlength="200" />
							</div>
						</div>
					
						[#-- 作者 --]
						<div class="form-group">
							<label for="author" class="col-sm-2 control-label">
								作者
							</label>
							<div class="col-sm-4">
								<input id="author" class="form-control" type="text" name="author" value="${article.author}" maxlength="20" />
							</div>
						</div>
						
						[#-- 内容 --]
						<div class="form-group">
							<label for="cont" class="col-sm-2 control-label">
								内容
							</label>
							<div class="col-sm-4">
								<textarea id="cont" class="form-control kind-editor" name="cont" cols="10" rows="5">${article.cont}</textarea>
							</div>
						</div>
						
						[#-- 是否发布 --]
						<div class="form-group">
							<label for="published" class="col-sm-2 control-label">
								是否发布
							</label>
							<div class="col-sm-4">
								<select id="published" class="form-control chosen-select" name="published" data-placeholder="&nbsp;">
									<option value="true"[#if article.published] selected="selected"[/#if]>是</option>
									<option value="false"[#if !article.published] selected="selected"[/#if]>否</option>
								</select>
							</div>
						</div>
						
						[#-- 是否置顶 --]
						<div class="form-group">
							<label for="top" class="col-sm-2 control-label">
								是否置顶
							</label>
							<div class="col-sm-4">
								<select id="top" class="form-control chosen-select" name="top" data-placeholder="&nbsp;">
									<option value="true"[#if article.top] selected="selected"[/#if]>是</option>
									<option value="false"[#if !article.top] selected="selected"[/#if]>否</option>
								</select>
							</div>
						</div>
						
						[#-- 排序 --]
						<div class="form-group">
							<label for="order" class="col-sm-2 control-label">
								排序
							</label>
							<div class="col-sm-4">
								<input id="order" class="form-control" type="text" name="order" value="${article.order}" maxlength="9" />
							</div>
						</div>
						
					</div>
					
					[#-- 页面信息 --]
					<div id="seo" class="tab-pane" tab-id="seo_tab">
						[#assign seo = article.seo /]
						[#include "/template/admin/seo/edit.ftl" /]
					</div>
					
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;修&nbsp;改&nbsp;</button>
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}[#if articleCategoryId??]?articleCategoryId=${articleCategoryId}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
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
	[#-- kindeditor 编辑器 --]
	<script type="text/javascript" src="${base}/resources/lib/kindeditor/kindeditor.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/kindeditor/kindeditor.common.min.js"></script>
	[#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
	[#-- article.edit 文章编辑 --]
	<script type="text/javascript">
		var previousAlias = "${article.alias}";
	</script>
	<script type="text/javascript" src="${base}/resources/admin/js/article.edit.min.js"></script>
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