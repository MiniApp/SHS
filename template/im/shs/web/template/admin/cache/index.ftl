[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/cache" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>缓存管理[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
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
					缓存管理
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<div class="form-horizontal">
			
			[#-- 缓存数 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					缓存数
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${cacheSize}</strong>
					</p>
				</div>
			</div>
			
			[#-- 内存总量 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					内存总量
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>
							[#if totalMemory?? && maxMemory??]
								${(totalMemory + maxMemory)?string("0.##")}MB
							[#else]
								-
							[/#if]
						</strong>
					</p>
				</div>
			</div>
			
			[#-- 可用内存 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					可用内存
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>
							[#if maxMemory?? && totalMemory?? && freeMemory??]
								${(maxMemory - totalMemory + freeMemory)?string("0.##")}MB
							[#else]
								-
							[/#if]
						</strong>
					</p>
				</div>
			</div>
			
			[#-- 缓存文件路径 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					缓存文件路径
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${diskStorePath}</strong>
					</p>
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="button" onclick="location.href='${indexUrl}/clear'">&nbsp;清&nbsp;除&nbsp;</button>
				</div>
			</div>
			
		</form>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
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