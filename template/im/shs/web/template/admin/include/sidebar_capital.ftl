[#list ["admin:capital", "admin:platform_capital", "admin:account", "admin:account_recharge", "admin:account_charge", "admin:recharge", "admin:recharge_modif", "admin:recharge_audit", "admin:recharge_transfer", "admin:recharge_cancel", "admin:recharge_remedy", "admin:withdrawal", "admin:withdrawal_modif", "admin:withdrawal_audit", "admin:withdrawal_transfer", "admin:withdrawal_cancel", "admin:withdrawal_remedy", "admin:bank_card", "admin:bank_card_modif", "admin:bank_card_audit", "admin:bank_card_invalid", "admin:bank_card_remedy", "admin:referral_fee"] as permission]
[@shiro.hasPermission name = permission]
	<div class="panel panel-default">
		<div class="panel-heading">
			<a href="#collapse_capital" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
				<i class="glyphicon glyphicon-usd"></i>
				资金管理
			</a>
		</div>
		<div class="accordion-body collapse" id="collapse_capital">
			<div class="panel-body">
				<ul class="nav nav-pills nav-stacked">
				
					[#-- 用户资金管理 --]
					[@shiro.hasPermission name="admin:capital"]
						<li class="nav-header">用户资金管理</li>
						<li><a href="${baseUrl}/capital" target="iframe">资金列表</a></li>
						<li><a href="${baseUrl}/capital/credit" target="iframe">资金收入</a></li>
						<li><a href="${baseUrl}/capital/debit" target="iframe">资金支出</a></li>
						<li><a href="${baseUrl}/capital/frozen" target="iframe">资金冻结</a></li>
						<li><a href="${baseUrl}/capital/unfrozen" target="iframe">资金解冻</a></li>
					[/@shiro.hasPermission]
				
					[#-- 平台资金管理 --]
					[@shiro.hasPermission name="admin:platform_capital"]
						<li class="nav-header">平台资金管理</li>
						<li><a href="${baseUrl}/platform_capital" target="iframe">资金列表</a></li>
						<li><a href="${baseUrl}/platform_capital?type=credit" target="iframe">资金收入</a></li>
						<li><a href="${baseUrl}/platform_capital?type=debit" target="iframe">资金支出</a></li>
					[/@shiro.hasPermission]
					
					[#-- 账户管理 --]
					[#list ["admin:account", "admin:account_recharge", "admin:account_charge"] as permission]
						[@shiro.hasPermission name = permission]
						<li class="nav-header">账户管理</li>
						[@shiro.hasPermission name="admin:account"]
							<li><a href="${baseUrl}/account" target="iframe">账户列表</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:account_recharge"]
							<li><a href="${baseUrl}/account_recharge" target="iframe">账户充值</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:account_charge"]
							<li><a href="${baseUrl}/account_charge" target="iframe">账户扣费</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 账户管理 --]
					[#list ["admin:recharge", "admin:recharge_modif", "admin:recharge_audit", "admin:recharge_transfer", "admin:recharge_cancel", "admin:recharge_remedy"] as permission]
						[@shiro.hasPermission name = permission]
						<li class="nav-header">充值管理</li>
						[@shiro.hasPermission name="admin:recharge"]
							<li><a href="${baseUrl}/recharge" target="iframe">充值列表</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:recharge_modif"]
							<li><a href="${baseUrl}/recharge_modif" target="iframe">充值修改</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:recharge_audit"]
							<li><a href="${baseUrl}/recharge_audit" target="iframe">充值审核</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:recharge_transfer"]
							<li><a href="${baseUrl}/recharge_transfer" target="iframe">充值转账</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:recharge_cancel"]
							<li><a href="${baseUrl}/recharge_cancel" target="iframe">充值取消</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:recharge_remedy"]
							<li><a href="${baseUrl}/recharge_remedy" target="iframe">充值补救</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 提现管理 --]
					[#list ["admin:withdrawal", "admin:withdrawal_modif", "admin:withdrawal_audit", "admin:withdrawal_transfer", "admin:withdrawal_cancel", "admin:withdrawal_remedy"] as permission]
						[@shiro.hasPermission name = permission]
						<li class="nav-header">提现管理</li>
						[@shiro.hasPermission name="admin:withdrawal"]
							<li><a href="${baseUrl}/withdrawal" target="iframe">提现列表</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:withdrawal_modif"]
							<li><a href="${baseUrl}/withdrawal_modif" target="iframe">提现修改</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:withdrawal_audit"]
							<li><a href="${baseUrl}/withdrawal_audit" target="iframe">提现审核</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:withdrawal_transfer"]
							<li><a href="${baseUrl}/withdrawal_transfer" target="iframe">提现转账</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:withdrawal_cancel"]
							<li><a href="${baseUrl}/withdrawal_cancel" target="iframe">提现取消</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:withdrawal_remedy"]
							<li><a href="${baseUrl}/withdrawal_remedy" target="iframe">提现补救</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 银行卡管理 --]
					[#list ["admin:bank_card", "admin:bank_card_modif", "admin:bank_card_audit", "admin:bank_card_invalid", "admin:bank_card_remedy"] as permission]
						[@shiro.hasPermission name = permission]
						<li class="nav-header">银行卡管理</li>
						[@shiro.hasPermission name="admin:bank_card"]
							<li><a href="${baseUrl}/bank_card" target="iframe">银行卡列表</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:bank_card_modif"]
							<li><a href="${baseUrl}/bank_card_modif" target="iframe">银行卡修改</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:bank_card_audit"]
							<li><a href="${baseUrl}/bank_card_audit" target="iframe">银行卡审核</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:bank_card_invalid"]
							<li><a href="${baseUrl}/bank_card_invalid" target="iframe">银行卡作废</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:bank_card_remedy"]
							<li><a href="${baseUrl}/bank_card_remedy" target="iframe">银行卡补救</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 推荐管理 --]
					[@shiro.hasPermission name="admin:referral_fee"]
						<li class="nav-header">推荐管理</li>
						<li><a href="${baseUrl}/referral_fee" target="iframe">推荐费列表</a></li>
					[/@shiro.hasPermission]
					
				</ul>
			</div>
		</div>
	</div>
	[#break /]
[/@shiro.hasPermission]
[/#list]