[#-- 标签 --]
<div class="tabbable">

	[#-- 选项卡 --]
	<ul class="nav nav-tabs">
		<li class="active">
			<a id="assignment_basic_tab" href="#assignment_basic" data-toggle="tab">基本信息</a>
		</li>
		<li>
			<a id="assignment_inquiry_tab" href="#assignment_inquiry" data-toggle="tab">调查信息</a>
		</li>
		<li>
			<a id="assignment_guarantee_tab" href="#assignment_guarantee" data-toggle="tab">担保信息</a>
		</li>
		<li>
			<a id="assignment_risk_control_tab" href="#assignment_risk_control" data-toggle="tab">风控信息</a>
		</li>
		[#-- 存在转让材料时 --]
		[#if assignment.materials]
			<li>
				<a id="assignment_materials_tab" href="#assignment_materials" data-toggle="tab">材料信息</a>
			</li>
		[/#if]
		[#-- 存在转让意见时 --]
		[#if assignment.opinions?size gt 0]
			<li>
				<a id="assignment_opinions_tab" href="#assignment_opinions" data-toggle="tab">意见信息</a>
			</li>
		[/#if]
	</ul>
	
	[#-- 选项卡内容 --]
	<div class="tab-content">
			
		[#-- 基本信息 --]
		<div id="assignment_basic" class="tab-pane active" tab-id="assignment_basic_tab">
	    	[#include "/admin/assignment/view/basic.ftl" /]
		</div>
		
		[#-- 调查信息 --]
		<div id="assignment_inquiry" class="tab-pane" tab-id="assignment_inquiry_tab">
	    	[#include "/admin/assignment/view/inquiry.ftl" /]
		</div>
		
		[#-- 担保信息 --]
		<div id="assignment_guarantee" class="tab-pane" tab-id="assignment_guarantee_tab">
	    	[#include "/admin/assignment/view/guarantee.ftl" /]
		</div>
		
		[#-- 风控信息 --]
		<div id="assignment_risk_control" class="tab-pane" tab-id="assignment_risk_control_tab">
	    	[#include "/admin/assignment/view/risk_control.ftl" /]
		</div>
		
		[#-- 存在转让材料时 --]
		[#if assignment.materials]
			[#-- 材料信息 --]
			<div id="assignment_materials" class="tab-pane" tab-id="assignment_materials_tab">
		    	[#include "/admin/assignment/view/material.ftl" /]
			</div>
		[/#if]
					
		[#-- 存在转让意见时 --]
		[#if assignment.opinions?size gt 0]
			[#-- 意见信息 --]
			<div id="assignment_opinions" class="tab-pane" tab-id="assignment_opinions_tab">
				[#assign opinions = assignment.opinions /]
		    	[#include "/admin/assignment_opinion/view_list.ftl" /]
			</div>
		[/#if]

	</div>
	
</div>