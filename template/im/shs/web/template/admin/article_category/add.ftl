[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/article_category" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>添加文章分类[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
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
					添加文章分类
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/create" method="post">
			[#if parent??]
				<input type="hidden" name="parentId" value="${parent.id}" />
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
			
						[#-- 上级文章分类 --]
						[#if parent??]
							<div class="form-group">
								<label for="parent" class="col-sm-2 control-label">
									上级文章分类
								</label>
								<div class="col-sm-4">
									<p class="form-control-static">
										<strong>${parent}</strong>
									</p>
								</div>
							</div>
						[/#if]
						
						[#-- 名称 --]
						<div class="form-group">
							<label for="name" class="col-sm-2 control-label">
								<span class="required">*</span>
								名称
							</label>
							<div class="col-sm-4">
								<input id="name" class="form-control" type="text" name="name" maxlength="200" />
							</div>
						</div>
								
						[#-- 别名 --]
						<div class="form-group">
							<label for="alias" class="col-sm-2 control-label">
								<span class="required">*</span>
								别名
							</label>
							<div class="col-sm-4">
								<input id="alias" class="form-control" type="text" name="alias" maxlength="100" />
							</div>
						</div>
						
						[#-- 模板 --]
						<div class="form-group">
							<label for="templateId" class="col-sm-2 control-label">
								<span class="required">*</span>
								模板
							</label>
							<div class="col-sm-4">
								<input id="templateId" class="form-control" type="text" name="template" maxlength="200" />
							</div>
						</div>
					
						[#-- 描述 --]
						<div class="form-group">
							<label for="description" class="col-sm-2 control-label">
								描述
							</label>
							<div class="col-sm-4">
								<textarea id="description" class="form-control" name="description" cols="10" rows="5"></textarea>
							</div>
						</div>
						
						[#-- 排序 --]
						<div class="form-group">
							<label for="order" class="col-sm-2 control-label">
								排序
							</label>
							<div class="col-sm-4">
								<input id="order" class="form-control" type="text" name="order" maxlength="9" />
							</div>
						</div>
						
					</div>
					
					[#-- 页面信息 --]
					<div id="seo" class="tab-pane" tab-id="seo_tab">
						[#include "/template/admin/seo/add.ftl" /]
					</div>
					
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;创&nbsp;建&nbsp;</button>
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}[#if parent??]?parentId=${parent.id}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
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
	[#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
	[#-- article.category.add 文章分类添加 --]
	[#if parent??]
		<script type="text/javascript">
			var parentId = "${parent.id}";
		</script>
	[/#if]
	<script type="text/javascript" src="${base}/resources/admin/js/article.category.add.min.js"></script>
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