<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 回购计划 List TH --]
			[#include "/template/admin/buyback_plan/list_ths.ftl" /]
		</tr>
		[#list buybackPlans as buybackPlan]
			${buybackPlan.countOverdue()}
			<tr>
				[#-- 回购计划 List TD --]
				[#include "/template/admin/buyback_plan/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>