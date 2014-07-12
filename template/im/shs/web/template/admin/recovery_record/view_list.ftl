<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 回收记录 List TH --]
			[#include "/template/admin/recovery_record/list_ths.ftl" /]
		</tr>
		[#list recoveryRecords as recoveryRecord]
			<tr>
				[#-- 回收记录 List TD --]
				[#include "/template/admin/recovery_record/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>