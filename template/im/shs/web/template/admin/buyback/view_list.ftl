<div class="form-group">
	<table class="table table-bordered">
		<tr>
			[#-- 回购 List TH --]
			[#include "/template/admin/buyback/list_ths.ftl" /]
		</tr>
		[#list buybacks as buyback]
			${buyback.countOverdue()}
			<tr>
				[#-- 回购 List TD --]
				[#include "/template/admin/buyback/list_tds.ftl" /]
			</tr>
		[/#list]
	</table>
</div>