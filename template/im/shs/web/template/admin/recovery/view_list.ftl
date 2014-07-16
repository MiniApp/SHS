<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 回收 List TH --]
			[#include "/template/admin/recovery/list_ths.ftl" /]
		</tr>
		[#list recoveries as recovery]
			<tr>
				[#-- 回收 List TD --]
				[#include "/template/admin/recovery/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>