[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/log" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>查看日志[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					日志管理
				</li>
				<li>
					查看日志
				</li>
			</ul>
		</div>
			
		[#-- 表单 --]
		<div class="form-horizontal">
		
			[#-- 操作 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					操作
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${log.operation!"-"}</strong>
					</p>
				</div>
			</div>
		
			[#-- 操作员 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					操作员
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${log.operator!"-"}</strong>
					</p>
				</div>
			</div>
		
			[#-- 内容 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					内容
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${log.cont!"-"}</strong>
					</p>
				</div>
			</div>
		
			[#-- 请求参数 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					请求参数
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${(log.param?html)!"-"}</strong>
					</p>
				</div>
			</div>
		
			[#-- IP --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					IP
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${log.ip!"-"}</strong>
					</p>
				</div>
			</div>
		
			[#-- 创建日期 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					创建日期
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${log.createDate?string("yyyy-MM-dd HH:mm:ss")}</strong>
					</p>
				</div>
			</div>
		
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}'">&nbsp;返&nbsp;回&nbsp;</button>
				</div>
			</div>
				
		</div>
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