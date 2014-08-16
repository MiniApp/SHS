<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 还款计划 List TH --]
			[#include "/template/admin/repayment_plan/list_ths.ftl" /]
		</tr>
		[#list repaymentPlans as repaymentPlan]
			${repaymentPlan.countOverdue()}
			<tr>
				[#-- 还款计划 List TD --]
				[#include "/template/admin/repayment_plan/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>