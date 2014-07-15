[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/payment_plugin" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>设置线下汇款支付[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					设置线下汇款支付
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${plugin.settingUrl}" method="post" enctype="multipart/form-data">
			
			[#-- 支付名称 --]
			<div class="form-group">
				<label for="paymentName" class="col-sm-2 control-label">
					<span class="required">*</span>
					支付名称
				</label>
				<div class="col-sm-4">
					<input id="paymentName" class="form-control" type="text" name="paymentName" value="${plugin.paymentName}" maxlength="200" />
				</div>
			</div>
		
			[#-- LOGO --]
			<div class="form-group">
				<label for="logo" class="col-sm-2 control-label">
					LOGO
				</label>
				<div class="col-sm-4">
					[#if plugin.logo??]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${base}${plugin.logo}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input id="logo" type="file" name="logoFile" />
								</span>
								<a href="${base}${plugin.logo}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
					[#else]
						<div class="input-group input-file">
							<input class="form-control file-name ignore" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									选择图片
									<input id="logo" type="file" name="logoFile" />
								</span>
							</span>
						</div>
					[/#if]
				</div>
			</div>
			
			[#-- 银行 --]
			<div class="form-group">
				<label for="bankName" class="col-sm-2 control-label">
					<span class="required">*</span>
					银行
				</label>
				<div class="col-sm-4">
					<input id="bankName" class="form-control" type="text" name="bankName" value="${plugin.bankName}" maxlength="200" />
				</div>
			</div>
			
			[#-- 银行支行 --]
			<div class="form-group">
				<label for="bankBranchName" class="col-sm-2 control-label">
					<span class="required">*</span>
					银行支行
				</label>
				<div class="col-sm-4">
					<input id="bankBranchName" class="form-control" type="text" name="bankBranchName" value="${plugin.bankBranchName}" maxlength="200" />
				</div>
			</div>
			
			[#-- 银行卡号 --]
			<div class="form-group">
				<label for="bankCardNo" class="col-sm-2 control-label">
					<span class="required">*</span>
					银行卡号
				</label>
				<div class="col-sm-4">
					<input id="bankCardNo" class="form-control" type="text" name="bankCardNo" value="${plugin.bankCardNo}" maxlength="200" />
				</div>
			</div>
			
			[#-- 银行卡持有人 --]
			<div class="form-group">
				<label for="bankCardHolderName" class="col-sm-2 control-label">
					<span class="required">*</span>
					银行卡持有人
				</label>
				<div class="col-sm-4">
					<input id="bankCardHolderName" class="form-control" type="text" name="bankCardHolderName" value="${plugin.bankCardHolderName}" maxlength="200" />
				</div>
			</div>
			
			[#-- 最低额度 --]
			<div class="form-group">
				<label for="minimum" class="col-sm-2 control-label">
					最低额度
				</label>
				<div class="input-group col-sm-4">
					<label class="input-group-addon">${setting.security.currencySign}</label>
					<input id="minimum" class="form-control" type="text" name="minimum" value="${plugin.minimum}" maxlength="20" />
				</div>
			</div>
			
			[#-- 最高额度 --]
			<div class="form-group">
				<label for="maximum" class="col-sm-2 control-label">
					最高额度
				</label>
				<div class="input-group col-sm-4">
					<label class="input-group-addon">${setting.security.currencySign}</label>
					<input id="maximum" class="form-control" type="text" name="maximum" value="${plugin.maximum}" maxlength="20" />
				</div>
			</div>
			
			[#-- 服务费类型 --]
			<div class="form-group">
				<label for="feeType" class="col-sm-2 control-label">
					服务费类型
				</label>
				<div class="col-sm-4">
					<select id="feeType" class="form-control chosen-select" name="feeType" data-placeholder="&nbsp;">
						[#list feeTypes as feeType]
							<option value="${feeType}"[#if plugin.feeType == feeType] selected="selected"[/#if]>${message("PaymentFeeType." + feeType)}</option>
						[/#list]
					</select>
				</div>
			</div>
			
			[#-- 服务费 --]
			<div class="form-group">
				<label for="fee" class="col-sm-2 control-label">
					<span class="required">*</span>
					服务费
				</label>
				<div class="col-sm-4">
					<input id="fee" class="form-control" type="text" name="fee" value="${plugin.fee}" maxlength="20" />
				</div>
			</div>
			
			[#-- 处理时间 --]
			<div class="form-group">
				<label for="handleTime" class="col-sm-2 control-label">
					<span class="required">*</span>
					处理时间
				</label>
				<div class="col-sm-4">
					<input id="handleTime" class="form-control" type="text" name="handleTime" value="${plugin.handleTime}" maxlength="200" />
				</div>
			</div>
			
			[#-- 描述 --]
			<div class="form-group">
				<label for="description" class="col-sm-2 control-label">
					描述
				</label>
				<div class="col-sm-4">
					<textarea id="description" class="form-control" name="description" cols="10" rows="5">${plugin.description?html}</textarea>
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
	[#-- payment_plugin.remittance.setting 线下汇款支付设置 --]
	<script type="text/javascript" src="${base}/resources/admin/js/payment_plugin.remittance.setting.min.js"></script>
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