[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/basic_setting" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>基本设置[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/admin/include/link_top.ftl" /]
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
    	[#include "/admin/include/link_bottom.ftl" /]
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
					基本设置
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post" enctype="multipart/form-data">
			
			[#-- 网站名称 --]
			<div class="form-group">
				<label for="siteName" class="col-sm-2 control-label">
					<span class="required">*</span>
					网站名称
				</label>
				<div class="col-sm-4">
					<input id="siteName" class="form-control" type="text" name="siteName" value="${setting.siteName}" maxlength="200" />
				</div>
			</div>
		
			[#-- 网站网址 --]
			<div class="form-group">
				<label for="siteUrl" class="col-sm-2 control-label">
					<span class="required">*</span>
					网站网址
				</label>
				<div class="col-sm-4">
					<input id="siteUrl" class="form-control" type="text" name="siteUrl" value="${setting.siteUrl}" maxlength="200" />
				</div>
			</div>
		
			[#-- 网站LOGO --]
			<div class="form-group">
				<label for="siteLogo" class="col-sm-2 control-label">
					网站LOGO
				</label>
				<div class="col-sm-4">
					[#if setting.siteLogo??]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${base}${setting.siteLogo}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="siteLogo" type="file" name="siteLogoFile" />
								</span>
								<a href="${base}${setting.siteLogo}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="siteLogo" type="file" name="siteLogoFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
		
			[#-- 联系地址 --]
			<div class="form-group">
				<label for="address" class="col-sm-2 control-label">
					联系地址
				</label>
				<div class="col-sm-4">
					<input id="address" class="form-control" type="text" name="address" value="${setting.address}" maxlength="200" />
				</div>
			</div>
		
			[#-- 联系电话 --]
			<div class="form-group">
				<label for="phone" class="col-sm-2 control-label">
					联系电话
				</label>
				<div class="col-sm-4">
					<input id="phone" class="form-control" type="text" name="phone" value="${setting.phone}" maxlength="200" />
				</div>
			</div>
		
			[#-- 邮政编码 --]
			<div class="form-group">
				<label for="zipCode" class="col-sm-2 control-label">
					邮政编码
				</label>
				<div class="col-sm-4">
					<input id="zipCode" class="form-control" type="text" name="zipCode" value="${setting.zipCode}" maxlength="200" />
				</div>
			</div>
		
			[#-- 邮箱地址 --]
			<div class="form-group">
				<label for="email" class="col-sm-2 control-label">
					邮箱地址
				</label>
				<div class="col-sm-4">
					<input id="email" class="form-control" type="text" name="email" value="${setting.email}" maxlength="200" />
				</div>
			</div>
		
			[#-- 备案编号 --]
			<div class="form-group">
				<label for="certtext" class="col-sm-2 control-label">
					备案编号
				</label>
				<div class="col-sm-4">
					<input id="certtext" class="form-control" type="text" name="certtext" value="${setting.certtext}" maxlength="200" />
				</div>
			</div>
			
			[#-- 网站是否开启 --]
			<div class="form-group">
				<label for="siteEnabled" class="col-sm-2 control-label">
					网站是否开启
				</label>
				<div class="col-sm-4">
					<select id="siteEnabled" class="form-control chosen-select" name="siteEnabled" data-placeholder="&nbsp;">
						<option value="true"[#if setting.siteEnabled] selected="selected"[/#if]>是</option>
						<option value="false"[#if !setting.siteEnabled] selected="selected"[/#if]>否</option>
					</select>
				</div>
			</div>
		
			[#-- 网站版本 --]
			<div class="form-group">
				<label for="siteVersion" class="col-sm-2 control-label">
					<span class="required">*</span>
					网站版本
				</label>
				<div class="col-sm-4">
					<input id="siteVersion" class="form-control" type="text" name="siteVersion" value="${setting.siteVersion}" maxlength="200" />
				</div>
			</div>
		
			[#-- 网站关闭消息 --]
			<div class="form-group">
				<label for="siteCloseMessage" class="col-sm-2 control-label">
					<span class="required">*</span>
					网站关闭消息
				</label>
				<div class="col-sm-4">
					<textarea id="siteCloseMessage" class="form-control" name="siteCloseMessage" cols="10" rows="5">${setting.siteCloseMessage?html}</textarea>
				</div>
			</div>
			
			[#-- Cookie路径 --]
			<div class="form-group">
				<label for="cookiePath" class="col-sm-2 control-label">
					<span class="required">*</span>
					Cookie路径
				</label>
				<div class="col-sm-4">
					<input id="cookiePath" class="form-control" type="text" name="cookiePath" value="${setting.cookiePath}" maxlength="200" />
				</div>
			</div>
		
			[#-- Cookie作用域 --]
			<div class="form-group">
				<label for="cookieDomain" class="col-sm-2 control-label">
					Cookie作用域
				</label>
				<div class="col-sm-4">
					<input id="cookieDomain" class="form-control" type="text" name="cookieDomain" value="${setting.cookieDomain}" maxlength="200" />
				</div>
			</div>
		
			[#-- CNZZ统计是否开启--]
			<div class="form-group">
				<label for="cnzzEnabled" class="col-sm-2 control-label">
					CNZZ统计是否开启
				</label>
				<div class="col-sm-4">
					<select id="cnzzEnabled" class="form-control chosen-select" name="cnzzEnabled" data-placeholder="&nbsp;">
						<option value="true"[#if setting.cnzzEnabled] selected="selected"[/#if]>是</option>
						<option value="false"[#if !setting.cnzzEnabled] selected="selected"[/#if]>否</option>
					</select>
				</div>
			</div>
		
			[#-- CNZZ统计站点ID --]
			<div class="form-group">
				<label for="cnzzSiteId" class="col-sm-2 control-label">
					CNZZ统计站点ID
				</label>
				<div class="col-sm-4">
					<input id="cnzzSiteId" class="form-control" type="text" name="cnzzSiteId" value="${setting.cnzzSiteId}" maxlength="200" />
				</div>
			</div>
		
			[#-- CNZZ统计密码 --]
			<div class="form-group">
				<label for="cnzzPassword" class="col-sm-2 control-label">
					CNZZ统计密码
				</label>
				<div class="col-sm-4">
					<input id="cnzzPassword" class="form-control" type="text" name="cnzzPassword" value="${setting.cnzzPassword}" maxlength="200" />
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
	[#include "/admin/include/script_top.ftl" /]
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
	[#-- basic.set 基本设置 --]
	<script type="text/javascript" src="${base}/resources/admin/js/basic.setting.min.js"></script>
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
	[#include "/admin/include/script_bottom.ftl" /]
</html>
[/@compress]