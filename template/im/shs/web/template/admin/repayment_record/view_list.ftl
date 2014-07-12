<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 还款记录 List TH --]
			[#include "/template/admin/repayment_record/list_ths.ftl" /]
		</tr>
		[#list repaymentRecords as repaymentRecord]
			<tr>
				[#-- 还款记录 List TD --]
				[#include "/template/admin/repayment_record/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>