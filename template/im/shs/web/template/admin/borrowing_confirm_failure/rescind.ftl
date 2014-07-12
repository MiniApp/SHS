[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/borrowing_confirm_failure" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>撤销借款确认[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
		[#-- Font Awesome Icon 图标 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/font-awesome/css/font-awesome.min.css">
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
					借款管理
				</li>
				<li>
					借款失败管理
				</li>
				<li>
					撤销借款确认
				</li>
			</ul>
		</div>
		
		[#-- 表单 --]
		<div class="form-horizontal">
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="borrowing_tab" href="#borrowing" data-toggle="tab">借款信息</a>
					</li>
					<li>
						<a id="borrower_tab" href="#borrower" data-toggle="tab">借款人信息</a>
					</li>
					<li>
						<a id="rescind_tab" href="#rescind" data-toggle="tab">
							<i class="icon-undo"></i>
							撤销意见
						</a>
					</li>
					<li>
						<a id="prev_step_tab" href="${indexUrl}">
							<i class="icon-mail-reply-all"></i>
							返回
						</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
					
					[#-- 借款信息 --]
					<div id="borrowing" class="tab-pane active" tab-id="borrowing_tab">
						[#include "/template/admin/borrowing/view_tab.ftl" /]
					</div>
					
					[#-- 借款人信息 --]
					<div id="borrower" class="tab-pane" tab-id="borrower_tab">
						[#assign pers = borrower /]
						[#include "/template/admin/pers/view_tab.ftl" /]
					</div>
					
					[#-- 撤销意见 --]
					<div id="rescind" class="tab-pane" tab-id="rescind_tab">
						<form id="inputForm" action="${indexUrl}/${id}" method="post">
							
							[#-- 撤销状态 --]
							<div class="form-group">
								<label for="inquired" class="col-sm-2 control-label">
									撤销状态
								</label>
								<div class="col-sm-4">
									<select id="inquired" class="form-control chosen-select" name="inquired" data-placeholder="&nbsp;">
										<option value="false">待调查</option>
										<option value="true">待确认</option>
									</select>
								</div>
							</div>
							
							[#-- 撤销意见 --]
							<div class="form-group">
								<label for="opinion" class="col-sm-2 control-label">
									<span class="required">*</span>
									撤销意见
								</label>
								<div class="col-sm-4">
									<textarea id="opinion" class="form-control" name="opinion" cols="10" rows="5"></textarea>
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
					</div>
					
				</div>
			</div>
			
		</div>
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
    [#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
    [#-- borrowing.confirm.rescind 借款确认撤销 --]
	<script type="text/javascript" src="${base}/resources/admin/js/borrowing.confirm.rescind.min.js"></script>
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