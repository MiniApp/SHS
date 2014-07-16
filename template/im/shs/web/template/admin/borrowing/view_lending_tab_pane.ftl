[#-- 存在出借资金时 --]
[#if lendingCapitals?size gt 0]
	[#-- 出借资金 --]
	<div id="borrowing_lending_capitals" class="tab-pane" tab-id="borrowing_lending_capitals_tab">
		[#assign capitals = lendingCapitals /]
    	[#include "/template/admin/capital/view_lending_list.ftl" /]
	</div>
[/#if]