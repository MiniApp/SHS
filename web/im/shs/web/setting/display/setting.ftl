[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/display_setting" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>显示设置[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					系统设置
				</li>
				<li>
					显示设置
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}" method="post" enctype="multipart/form-data">
			
			[#-- 图片高度（缩略） --]
			<div class="form-group">
				<label for="thumbnailImageHeight" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片高度（缩略）
				</label>
				<div class="input-group col-sm-4">
					<input id="thumbnailImageHeight" class="form-control" type="text" name="thumbnailImageHeight" value="${setting.thumbnailImageHeight}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
			
			[#-- 图片宽度（缩略） --]
			<div class="form-group">
				<label for="thumbnailImageWidth" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片宽度（缩略）
				</label>
				<div class="input-group col-sm-4">
					<input id="thumbnailImageWidth" class="form-control" type="text" name="thumbnailImageWidth" value="${setting.thumbnailImageWidth}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
			
			[#-- 图片高度（小） --]
			<div class="form-group">
				<label for="smallImageHeight" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片高度（小）
				</label>
				<div class="input-group col-sm-4">
					<input id="smallImageHeight" class="form-control" type="text" name="smallImageHeight" value="${setting.smallImageHeight}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
			
			[#-- 图片宽度（小） --]
			<div class="form-group">
				<label for="smallImageWidth" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片宽度（小）
				</label>
				<div class="input-group col-sm-4">
					<input id="smallImageWidth" class="form-control" type="text" name="smallImageWidth" value="${setting.smallImageWidth}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
			
			[#-- 图片宽度（中） --]
			<div class="form-group">
				<label for="mediumImageWidth" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片宽度（中）
				</label>
				<div class="input-group col-sm-4">
					<input id="mediumImageWidth" class="form-control" type="text" name="mediumImageWidth" value="${setting.mediumImageWidth}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
			
			[#-- 图片高度（中） --]
			<div class="form-group">
				<label for="mediumImageHeight" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片高度（中）
				</label>
				<div class="input-group col-sm-4">
					<input id="mediumImageHeight" class="form-control" type="text" name="mediumImageHeight" value="${setting.mediumImageHeight}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
			
			[#-- 图片高度（大） --]
			<div class="form-group">
				<label for="largeImageHeight" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片高度（大）
				</label>
				<div class="input-group col-sm-4">
					<input id="largeImageHeight" class="form-control" type="text" name="largeImageHeight" value="${setting.largeImageHeight}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
			
			[#-- 图片宽度（大） --]
			<div class="form-group">
				<label for="largeImageWidth" class="col-sm-2 control-label">
					<span class="required">*</span>
					图片宽度（大）
				</label>
				<div class="input-group col-sm-4">
					<input id="largeImageWidth" class="form-control" type="text" name="largeImageWidth" value="${setting.largeImageWidth}" maxlength="9" />
					<label class="input-group-addon">像素</label>
				</div>
			</div>
		
			[#-- 默认图片（缩略） --]
			<div class="form-group">
				<label for="defaultThumbnailImage" class="col-sm-2 control-label">
					默认图片（缩略）
				</label>
				<div class="col-sm-4 input-group">
					[#if setting.defaultThumbnailImage??]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${base}${setting.defaultThumbnailImage}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="defaultThumbnailImage" type="file" name="defaultThumbnailImageFile" />
								</span>
								<a href="${base}${setting.defaultThumbnailImage}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="defaultThumbnailImage" type="file" name="defaultThumbnailImageFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
		
			[#-- 默认图片（小） --]
			<div class="form-group">
				<label for="defaultSmallImage" class="col-sm-2 control-label">
					默认图片（小）
				</label>
				<div class="col-sm-4 input-group">
					[#if setting.defaultSmallImage??]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${base}${setting.defaultSmallImage}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="defaultSmallImage" type="file" name="defaultSmallImageFile" />
								</span>
								<a href="${base}${setting.defaultSmallImage}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="defaultSmallImage" type="file" name="defaultSmallImageFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
		
			[#-- 默认图片（中） --]
			<div class="form-group">
				<label for="defaultMediumImage" class="col-sm-2 control-label">
					默认图片（中）
				</label>
				<div class="col-sm-4 input-group">
					[#if setting.defaultMediumImage??]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${base}${setting.defaultMediumImage}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="defaultMediumImage" type="file" name="defaultMediumImageFile" />
								</span>
								<a href="${base}${setting.defaultMediumImage}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="defaultMediumImage" type="file" name="defaultMediumImageFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
		
			[#-- 默认图片（大） --]
			<div class="form-group">
				<label for="defaultLargeImage" class="col-sm-2 control-label">
					默认图片（大）
				</label>
				<div class="col-sm-4 input-group">
					[#if setting.defaultLargeImage??]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${base}${setting.defaultLargeImage}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="defaultLargeImage" type="file" name="defaultLargeImageFile" />
								</span>
								<a href="${base}${setting.defaultLargeImage}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="defaultLargeImage" type="file" name="defaultLargeImageFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
		
			[#-- 水印图片 --]
			<div class="form-group">
				<label for="watermarkImage" class="col-sm-2 control-label">
					水印图片
				</label>
				<div class="col-sm-4 input-group">
					[#if setting.watermarkImage??]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${base}${setting.watermarkImage}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="watermarkImage" type="file" name="watermarkImageFile" />
								</span>
								<a href="${base}${setting.watermarkImage}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="watermarkImage" type="file" name="watermarkImageFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
			
			[#-- 水印位置 --]
			<div class="form-group">
				<label for="watermarkPosition" class="col-sm-2 control-label">
					水印位置
				</label>
				<div class="col-sm-4">
					<select id="watermarkPosition" class="form-control chosen-select" name="watermarkPosition" data-placeholder="&nbsp;">
						[#list watermarkPositions as watermarkPosition]
							<option value="${watermarkPosition}"[#if watermarkPosition == setting.watermarkPosition] selected="selected"[/#if]>${message("WatermarkPosition." + watermarkPosition)}</option>
						[/#list]
					</select>
				</div>
			</div>
		
			[#-- 水印透明度 --]
			<div class="form-group">
				<label for="watermarkAlpha" class="col-sm-2 control-label">
					<span class="required">*</span>
					水印透明度
				</label>
				<div class="col-sm-4">
					<input id="watermarkAlpha" class="form-control" type="text" name="watermarkAlpha" value="${setting.watermarkAlpha}" maxlength="9" />
					<span class="help-block">取值范围: 0-100，0表示完全透明</span>
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
	[#-- display.set 显示设置 --]
	<script type="text/javascript" src="${base}/resources/admin/js/display.setting.min.js"></script>
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