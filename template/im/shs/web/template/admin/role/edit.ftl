[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/role" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>编辑角色[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					系统管理
				</li>
				<li>
					权限管理
				</li>
				<li>
					编辑角色
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${role.id}" method="post">
			<input type="hidden" name="_method" value="put" />
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="tab1" href="#tab_pane1" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="tab2" href="#tab_pane2" data-toggle="tab">权限信息</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
					[#-- 基本信息 --]
					<div id="tab_pane1" class="tab-pane active" tab-id="tab1">
					
						[#-- 名称 --]
						<div class="form-group">
							<label for="name" class="col-sm-2 control-label">
								<span class="required">*</span>
								名称
							</label>
							<div class="col-sm-4">
								<input id="name" class="form-control" type="text" name="name" value="${role.name}" maxlength="20" />
							</div>
						</div>
					
						[#-- 描述 --]
						<div class="form-group">
							<label for="description" class="col-sm-2 control-label">
								描述
							</label>
							<div class="col-sm-4">
								<textarea id="description" class="form-control" name="description" cols="10" rows="5">${role.description}</textarea>
							</div>
						</div>
					
					</div>
					
					[#-- 权限信息 --]
					<div id="tab_pane2" class="tab-pane" tab-id="tab2">
					
						[#-- 系统管理 --]
						<div class="form-group">
							<label for="syst_module" class="col-sm-2 control-label">
								系统管理模块
							</label>
							<div class="col-sm-4">
								<select id="syst_module" class="form-control chosen-select" name="auths" multiple="true" data-placeholder="&nbsp;">
									<optgroup label="系统设置">
										<option value="admin:basic_setting"[#if role.auths?seq_contains("admin:basic_setting")] selected="selected"[/#if]>基本设置</option>
										<option value="admin:security_setting"[#if role.auths?seq_contains("admin:security_setting")] selected="selected"[/#if]>安全设置</option>
										<option value="admin:display_setting"[#if role.auths?seq_contains("admin:display_setting")] selected="selected"[/#if]>显示设置</option>
										<option value="admin:comm_setting"[#if role.auths?seq_contains("admin:comm_setting")] selected="selected"[/#if]>通信设置</option>
									</optgroup>
									<optgroup label="插件管理">
										<option value="admin:payment_plugin"[#if role.auths?seq_contains("admin:payment_plugin")] selected="selected"[/#if]>支付插件</option>
										<option value="admin:storage_plugin"[#if role.auths?seq_contains("admin:storage_plugin")] selected="selected"[/#if]>存储插件</option>
									</optgroup>
									<optgroup label="权限管理">
										<option value="admin:admin"[#if role.auths?seq_contains("admin:admin")] selected="selected"[/#if]>管理员管理</option>
										<option value="admin:role"[#if role.auths?seq_contains("admin:role")] selected="selected"[/#if]>角色管理</option>
									</optgroup>
									<optgroup label="内容管理">
										<option value="admin:area"[#if role.auths?seq_contains("admin:area")] selected="selected"[/#if]>地区管理</option>
										<option value="admin:bank"[#if role.auths?seq_contains("admin:bank")] selected="selected"[/#if]>银行管理</option>
										<option value="admin:bank_branch"[#if role.auths?seq_contains("admin:bank_branch")] selected="selected"[/#if]>银行管理-支行列表</option>
										<option value="admin:dict"[#if role.auths?seq_contains("admin:dict")] selected="selected"[/#if]>词典管理</option>
										<option value="admin:dict_word"[#if role.auths?seq_contains("admin:dict_word")] selected="selected"[/#if]>词典管理-单词列表</option>
									</optgroup>
									<optgroup label="模板管理">
										<option value="admin:template_page"[#if role.auths?seq_contains("admin:template_page")] selected="selected"[/#if]>页面模版</option>
										<option value="admin:template_mail"[#if role.auths?seq_contains("admin:template_mail")] selected="selected"[/#if]>邮件模版</option>
										<option value="admin:template_texting"[#if role.auths?seq_contains("admin:template_texting")] selected="selected"[/#if]>短信模版</option>
										<option value="admin:template_print"[#if role.auths?seq_contains("admin:template_print")] selected="selected"[/#if]>打印模版</option>
										<option value="admin:template_js"[#if role.auths?seq_contains("admin:template_js")] selected="selected"[/#if]>JS模版</option>
										<option value="admin:template_css"[#if role.auths?seq_contains("admin:template_css")] selected="selected"[/#if]>CSS模版</option>
									</optgroup>
									<option value="admin:cache"[#if role.auths?seq_contains("admin:cache")] selected="selected"[/#if]>缓存管理</option>
									<option value="admin:log"[#if role.auths?seq_contains("admin:log")] selected="selected"[/#if]>日志管理</option>
								</select>
							</div>
						</div>
					
						[#-- 内容管理 --]
						<div class="form-group">
							<label for="cont_module" class="col-sm-2 control-label">
								内容管理模块
							</label>
							<div class="col-sm-4">
								<select id="cont_module" class="form-control chosen-select" name="auths" multiple="true" data-placeholder="&nbsp;">
									<optgroup label="文章管理">
										<option value="admin:article_category"[#if role.auths?seq_contains("admin:article_category")] selected="selected"[/#if]>文章分类管理</option>
										<option value="admin:article"[#if role.auths?seq_contains("admin:article")] selected="selected"[/#if]>文章列表</option>
									</optgroup>
									<optgroup label="广告管理">
										<option value="admin:ad_position"[#if role.auths?seq_contains("admin:ad_position")] selected="selected"[/#if]>广告位管理</option>
										<option value="admin:ad"[#if role.auths?seq_contains("admin:ad")] selected="selected"[/#if]>广告列表</option>
									</optgroup>
									<optgroup label="链接管理">
										<option value="admin:friend_link_text"[#if role.auths?seq_contains("admin:friend_link_text")] selected="selected"[/#if]>文字链接</option>
										<option value="admin:friend_link_image"[#if role.auths?seq_contains("admin:friend_link_image")] selected="selected"[/#if]>图片链接</option>
									</optgroup>
								</select>
							</div>
						</div>
					
						[#-- 资金管理 --]
						<div class="form-group">
							<label for="capital_module" class="col-sm-2 control-label">
								资金管理模块
							</label>
							<div class="col-sm-4">
								<select id="capital_module" class="form-control chosen-select" name="auths" multiple="true" data-placeholder="&nbsp;">
									<option value="admin:capital"[#if role.auths?seq_contains("admin:capital")] selected="selected"[/#if]>资金管理</option>
									<optgroup label="账户管理">
										<option value="admin:account"[#if role.auths?seq_contains("admin:account")] selected="selected"[/#if]>账户列表</option>
										<option value="admin:account_charge"[#if role.auths?seq_contains("admin:account_charge")] selected="selected"[/#if]>账户扣费</option>
										<option value="admin:account_recharge"[#if role.auths?seq_contains("admin:account_recharge")] selected="selected"[/#if]>账户充值</option>
									</optgroup>
									<optgroup label="充值管理">
										<option value="admin:recharge"[#if role.auths?seq_contains("admin:recharge")] selected="selected"[/#if]>充值列表</option>
										<option value="admin:recharge_modif"[#if role.auths?seq_contains("admin:recharge_modif")] selected="selected"[/#if]>充值修改</option>
										<option value="admin:recharge_audit"[#if role.auths?seq_contains("admin:recharge_audit")] selected="selected"[/#if]>充值审核</option>
										<option value="admin:recharge_transfer"[#if role.auths?seq_contains("admin:recharge_transfer")] selected="selected"[/#if]>充值转账</option>
										<option value="admin:recharge_cancel"[#if role.auths?seq_contains("admin:recharge_cancel")] selected="selected"[/#if]>充值取消</option>
										<option value="admin:recharge_remedy"[#if role.auths?seq_contains("admin:recharge_remedy")] selected="selected"[/#if]>充值补救</option>
									</optgroup>
									<optgroup label="提现管理">
										<option value="admin:withdrawal"[#if role.auths?seq_contains("admin:withdrawal")] selected="selected"[/#if]>提现列表</option>
										<option value="admin:withdrawal_modif"[#if role.auths?seq_contains("admin:withdrawal_modif")] selected="selected"[/#if]>提现修改</option>
										<option value="admin:withdrawal_audit"[#if role.auths?seq_contains("admin:withdrawal_audit")] selected="selected"[/#if]>提现审核</option>
										<option value="admin:withdrawal_transfer"[#if role.auths?seq_contains("admin:withdrawal_transfer")] selected="selected"[/#if]>提现转账</option>
										<option value="admin:withdrawal_cancel"[#if role.auths?seq_contains("admin:withdrawal_cancel")] selected="selected"[/#if]>提现取消</option>
										<option value="admin:withdrawal_remedy"[#if role.auths?seq_contains("admin:withdrawal_remedy")] selected="selected"[/#if]>提现补救</option>
									</optgroup>
									<optgroup label="银行卡管理">
										<option value="admin:bank_card"[#if role.auths?seq_contains("admin:bank_card")] selected="selected"[/#if]>银行卡列表</option>
										<option value="admin:bank_card_modif"[#if role.auths?seq_contains("admin:bank_card_modif")] selected="selected"[/#if]>银行卡修改</option>
										<option value="admin:bank_card_audit"[#if role.auths?seq_contains("admin:bank_card_audit")] selected="selected"[/#if]>银行卡审核</option>
										<option value="admin:bank_card_invalid"[#if role.auths?seq_contains("admin:bank_card_invalid")] selected="selected"[/#if]>银行卡作废</option>
										<option value="admin:bank_card_remedy"[#if role.auths?seq_contains("admin:bank_card_remedy")] selected="selected"[/#if]>银行卡补救</option>
									</optgroup>
								</select>
							</div>
						</div>
					
						[#-- 会员管理 --]
						<div class="form-group">
							<label for="capital_module" class="col-sm-2 control-label">
								会员管理模块
							</label>
							<div class="col-sm-4">
								<select id="capital_module" class="form-control chosen-select" name="auths" multiple="true" data-placeholder="&nbsp;">
									<optgroup label="会员管理">
										<option value="admin:member"[#if role.auths?seq_contains("admin:member")] selected="selected"[/#if]>会员列表</option>
										<option value="admin:member_regist"[#if role.auths?seq_contains("admin:member_regist")] selected="selected"[/#if]>会员注册</option>
										<option value="admin:member_modif"[#if role.auths?seq_contains("admin:member_modif")] selected="selected"[/#if]>会员修改</option>
									</optgroup>
									<option value="admin:pers"[#if role.auths?seq_contains("admin:pers")] selected="selected"[/#if]>个人列表/修改</option>
									<option value="admin:corp"[#if role.auths?seq_contains("admin:corp")] selected="selected"[/#if]>公司列表/登记/修改</option>
								</select>
							</div>
						</div>
					
						[#-- 借款管理 --]
						<div class="form-group">
							<label for="borrowing_module" class="col-sm-2 control-label">
								借款管理模块
							</label>
							<div class="col-sm-4">
								<select id="borrowing_module" class="form-control chosen-select" name="auths" multiple="true" data-placeholder="&nbsp;">
									<option value="admin:borrowing_audit_unaudited"[#if role.auths?seq_contains("admin:borrowing_audit_unaudited")] selected="selected"[/#if]>借款审核/修改</option>
									<option value="admin:borrowing_audit_audited"[#if role.auths?seq_contains("admin:borrowing_audit_audited")] selected="selected"[/#if]>借款确认</option>
									<option value="admin:borrowing_audit_unapproved"[#if role.auths?seq_contains("admin:borrowing_audit_unapproved")] selected="selected"[/#if]>借款重新审核/修改</option>
									<option value="admin:borrowing_investment_investing"[#if role.auths?seq_contains("admin:borrowing_investment_investing")] selected="selected"[/#if]>投资中借款</option>
									<option value="admin:borrowing_investment_success"[#if role.auths?seq_contains("admin:borrowing_investment_success")] selected="selected"[/#if]>投资出借</option>
									<option value="admin:borrowing_investment_failure"[#if role.auths?seq_contains("admin:borrowing_investment_failure")] selected="selected"[/#if]>借款投资失败</option>
									<option value="admin:borrowing_repayment_repaying"[#if role.auths?seq_contains("admin:borrowing_repayment_repaying")] selected="selected"[/#if]>借款还款中</option>
									<option value="admin:borrowing_repayment_repaid"[#if role.auths?seq_contains("admin:borrowing_repayment_repaid")] selected="selected"[/#if]>借款已还款</option>
								</select>
							</div>
						</div>
						
					</div>
					
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					[#if role.builtin]
						<span class="btn btn-danger btn-sm">&nbsp;内置角色不允许修改&nbsp;</span>
					[#else]
						<button class="btn btn-default btn-sm" type="submit">&nbsp;修&nbsp;改&nbsp;</button>
					[/#if]
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
    [#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
	[#-- role.edit 角色编辑 --]
	<script type="text/javascript">
		var previousName = "${role.name}";
	</script>
	<script type="text/javascript" src="${base}/resources/admin/js/role.edit.min.js"></script>
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