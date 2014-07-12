[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/bank" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>编辑银行[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					内容管理
				</li>
				<li>
					编辑银行
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${bank.id}" method="post" enctype="multipart/form-data">
					
			[#-- 名称 --]
			<div class="form-group">
				<label for="name" class="col-sm-2 control-label">
					<span class="required">*</span>
					名称
				</label>
				<div class="col-sm-4">
					<input id="name" class="form-control" type="text" name="name" value="${bank.name}" maxlength="200" />
				</div>
			</div>
			
			[#-- 代码 --]
			<div class="form-group">
				<label for="code" class="col-sm-2 control-label">
					<span class="required">*</span>
					代码
				</label>
				<div class="col-sm-4">
					<input id="code" class="form-control" type="text" name="code" value="${bank.code}" maxlength="20" />
				</div>
			</div>
					
			[#-- LOGO --]
			<div class="form-group">
				<label for="logo" class="col-sm-2 control-label">
					LOGO
				</label>
				<div class="col-sm-4">
					[#if bank.logo??]
						<div class="input-group input-file">
							<input class="form-control file-name" value="${base}${bank.logo}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="logo" class="ignore" type="file" name="logoFile" />
								</span>
								<a href="${base}${bank.logo}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="logo" class="ignore" type="file" name="logoFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
						
			[#-- 是否为支付银行 --]
			<div class="form-group">
				<label for="payable" class="col-sm-2 control-label">
					是否为支付银行
				</label>
				<div class="col-sm-4">
					<select id="payable" class="form-control chosen-select" name="payable" data-placeholder="&nbsp;">
						<option value="true"[#if bank.payable] selected="selected"[/#if]>是</option>
						<option value="false"[#if !bank.payable] selected="selected"[/#if]>否</option>
					</select>
				</div>
			</div>
			
			[#-- 排序 --]
			<div class="form-group">
				<label for="order" class="col-sm-2 control-label">
					排序
				</label>
				<div class="col-sm-4">
					<input id="order" class="form-control" type="text" name="order" value="${bank.order}" maxlength="9" />
				</div>
			</div>
					
			[#-- 描述 --]
			<div class="form-group">
				<label for="description" class="col-sm-2 control-label">
					描述
				</label>
				<div class="col-sm-4">
					<textarea id="description" class="form-control" name="description" cols="10" rows="5">${bank.description}</textarea>
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;修&nbsp;改&nbsp;</button>
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
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
	[#-- bank.edit 银行编辑 --]
	<script type="text/javascript">
		var previousCode = "${bank.code}", previousName = "${bank.name}";
	</script>
	<script type="text/javascript" src="${base}/resources/admin/js/bank.edit.min.js"></script>
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