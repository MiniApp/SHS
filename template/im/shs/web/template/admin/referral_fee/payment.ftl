[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/referral_fee" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>结算推荐费[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
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
					资金管理
				</li>
				<li>
					推荐管理
				</li>
				<li>
					结算推荐费
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${referralFee.id}/pay" method="post">
		
			[#-- 状态 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					状态
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${message("ReferralFeeState." + referralFee.state)}</strong>
					</p>
				</div>
			</div>

			[#-- 推荐金额 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					推荐金额
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${referralFee.referralAmt?string("currency")}</strong>
					</p>
				</div>
			</div>

			[#-- 提成费率 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					提成费率
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${referralFee.referralFeeRate}%</strong>
					</p>
				</div>
			</div>

			[#-- 推荐费 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					推荐费
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${referralFee.referralFee?string("currency")}</strong>
					</p>
				</div>
			</div>
			
			[#-- 计划结算时间 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					计划结算时间
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${referralFee.planPaymentDate?string("yyyy-MM-dd HH:mm:ss")}</strong>
					</p>
				</div>
			</div>

			[#-- 实际结算时间 --]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					实际结算时间
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${(referralFee.paymentDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</strong>
					</p>
				</div>
			</div>
			
			[#-- 推荐人--]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					推荐人
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${referralFee.referrer}</strong>
					</p>
				</div>
			</div>
			
			[#-- 被推荐人--]
			<div class="form-group">
				<label class="col-sm-2 control-label">
					被推荐人
				</label>
				<div class="col-sm-4">
					<p class="form-control-static">
						<strong>${referralFee.referral}</strong>
					</p>
				</div>
			</div>
			
			[#-- 备注 --]
			<div class="form-group">
				<label for="memo" class="col-sm-2 control-label">
					<span class="required">*</span>
					备注
				</label>
				<div class="col-sm-4">
					<textarea id="memo" class="form-control" name="memo" cols="10" rows="5"></textarea>
				</div>
			</div>

			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;结&nbsp;算&nbsp;</button>
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
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
	[#-- referral_fee.payment 推荐费结算 --]
	<script type="text/javascript" src="${base}/resources/admin/js/referral_fee.payment.min.js"></script>
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