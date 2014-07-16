<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 还款 List TH --]
			[#include "/template/admin/repayment/list_ths.ftl" /]
		</tr>
		[#list repayments as repayment]
			${repayment.countOverdue()}
			<tr>
				[#-- 还款 List TD --]
				[#include "/template/admin/repayment/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>