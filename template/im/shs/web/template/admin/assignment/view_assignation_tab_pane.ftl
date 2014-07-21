[#-- 存在受让资金时 --]
[#if assignationCapitals?size gt 0]
	[#-- 受让资金 --]
	<div id="assignment_assignation_capitals" class="tab-pane" tab-id="assignment_assignation_capitals_tab">
		[#assign capitals = assignationCapitals /]
    	[#include "/template/admin/capital/view_assignation_list.ftl" /]
	</div>
[/#if]