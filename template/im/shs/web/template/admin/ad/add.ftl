[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/ad" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>添加广告[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					内容管理
				</li>
				<li>
					广告管理
				</li>
				<li>
					添加广告
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/create" method="post" enctype="multipart/form-data">
			[#if adPositionId??]
				<input type="hidden" name="adPositionId" value="${adPositionId}" />
			[/#if]
			
			[#-- 广告位 --]
			<div class="form-group">
				<label for="position" class="col-sm-2 control-label">
					广告位
				</label>
				<div class="col-sm-4">
					<select id="position" class="form-control chosen-select" name="positionId" data-placeholder="&nbsp;">
						[#list adPositions as adPosition]
							<option value="${adPosition.id}"[#if adPosition.id == adPositionId] selected="selected"[/#if]>${adPosition.name} [${adPosition.width} × ${adPosition.height}]</option>
						[/#list]
					</select>
				</div>
			</div>
		
			[#-- 类型 --]
			<div class="form-group">
				<label for="type" class="col-sm-2 control-label">
					类型
				</label>
				<div class="col-sm-4">
					<select id="type" class="form-control chosen-select" name="type" data-placeholder="&nbsp;">
						[#list types as type]
							<option value="${type}">${message("AdType." + type)}</option>
						[/#list]
					</select>
				</div>
			</div>
			
			[#-- 标题 --]
			<div class="form-group">
				<label for="title" class="col-sm-2 control-label">
					<span class="required">*</span>
					标题
				</label>
				<div class="col-sm-4">
					<input id="title" class="form-control" type="text" name="title" maxlength="200" />
				</div>
			</div>
					
			[#-- 图片 --]
			<div class="form-group collapse">
				<label for="image" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片
				</label>
				<div class="col-sm-4">
					<div class="input-group input-file">
							<input class="form-control file-name" />
						<span class="input-group-btn">
							<span class="btn btn-default btn-file">
								选择图片
								<input id="image" class="ignore" type="file" name="imageFile" />
							</span>
						</span>
					</div>
				</div>
			</div>
					
			[#-- Flash --]
			<div class="form-group collapse">
				<label for="flash" class="col-sm-2 control-label">
					<span class="required">*</span>
					Flash
				</label>
				<div class="col-sm-4">
					<div class="input-group input-file">
						<input class="form-control file-name" />
						<span class="input-group-btn">
							<span class="btn btn-default btn-file">
								选择Flash
								<input id="flash" class="ignore" type="file" name="flashFile" />
							</span>
						</span>
					</div>
				</div>
			</div>
					
			[#-- 链接地址 --]
			<div class="form-group">
				<label for="url" class="col-sm-2 control-label">
					链接地址
				</label>
				<div class="col-sm-4">
					<input id="url" class="form-control" type="text" name="url" maxlength="200" />
				</div>
			</div>
			
			[#--
			[#-- 内容 --\]
			<div class="form-group collapse in">
				<label for="cont" class="col-sm-2 control-label">
					内容
				</label>
				<div class="col-sm-8">
					<textarea id="cont" class="form-control kind-editor" name="cont" cols="10" rows="5" style="width: 100%;"></textarea>
				</div>
			</div>
			--]
			
			[#-- 内容 --]
			<div class="form-group">
				<label for="cont" class="col-sm-2 control-label">
					内容
				</label>
				<div class="col-sm-4">
					<textarea id="cont" class="form-control" name="cont" cols="10" rows="5"></textarea>
				</div>
			</div>
				
			[#-- 开始日期 --]
			<div class="form-group">
				<label for="startDate" class="col-sm-2 control-label">
					开始日期
				</label>
				<div class="col-sm-4">
					<input id="startDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="startDate" />
				</div>
			</div>
				
			[#-- 结束日期 --]
			<div class="form-group">
				<label for="endDate" class="col-sm-2 control-label">
					结束日期
				</label>
				<div class="col-sm-4">
					<input id="endDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="endDate" />
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
					
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;创&nbsp;建&nbsp;</button>
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}[#if adPositionId??]?adPositionId=${adPositionId}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
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
    [#-- Bootstrap DatetimePicker 日期选择器 --]
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.zh-CN.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/datepicker/bootstrap.datetimepicker.common.min.js"></script>
    [#--
	[#-- kindeditor 编辑器 --\]
	<script type="text/javascript" src="${base}/resources/lib/kindeditor/kindeditor.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/kindeditor/kindeditor.common.min.js"></script>
	--]
	[#-- ad.add 广告添加 --]
	<script type="text/javascript" src="${base}/resources/admin/js/ad.add.min.js"></script>
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