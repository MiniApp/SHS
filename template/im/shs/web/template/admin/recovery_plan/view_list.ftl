<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 回收计划 List TH --]
			[#include "/template/admin/recovery_plan/list_ths.ftl" /]
		</tr>
		[#list recoveryPlans as recoveryPlan]
			<tr>
				[#-- 回收计划 List TD --]
				[#include "/template/admin/recovery_plan/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>