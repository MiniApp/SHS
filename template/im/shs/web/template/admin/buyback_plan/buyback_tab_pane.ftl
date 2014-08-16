<form id="inputForm" action="${indexUrl}/batch_buyback" method="post">
	[#if currentBuyback?? && currentAssignment??]
		<input type="hidden" name="buyback" value="${currentBuyback}" />
	[#elseif currentAssignment??]
		<input type="hidden" name="assignment" value="${currentAssignment}" />
	[/#if]
	[#list currentBuybackPlans as buybackPlan]
		<input type="hidden" name="ids" value="${buybackPlan.id}" />
	[/#list]

	[#-- 回购计划 --]
	<div class="form-group">
		<table class="table table-bordered">
			<tr>
				[#-- 回购计划 List TH --]
				[#include "/template/admin/buyback_plan/list_ths.ftl" /]
			</tr>
			[#list currentBuybackPlans as buybackPlan]
				<tr>
					[#-- 回购计划 List TD --]
					[#include "/template/admin/buyback_plan/list_tds.ftl" /]
				</tr>
			[/#list]
		</table>
	</div>
	
	[#-- 回购总额 （元） --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			回购总额 （元）
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${buybackAmts?string("currency")}</strong>
			</p>
		</div>
	</div>
	
	[#-- 转让人可用余额（元） --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			转让人可用余额（元）
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${assignor.available?string("currency")}</strong>
			</p>
		</div>
	</div>
													
	[#-- 回购意见 --]
	<div class="form-group">
		<label for="opinion" class="col-sm-2 control-label">
			<span class="required">*</span>
			回购意见
		</label>
		<div class="col-sm-4">
			<textarea id="opinion" class="form-control" name="opinion" cols="10" rows="5"></textarea>
		</div>
	</div>
	
	[#-- 表单按钮 --]
	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-4">
			<button class="btn btn-default btn-sm" type="submit">&nbsp;提&nbsp;交&nbsp;</button>
			<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}?[#if currentBuyback?? && currentAssignment??]buyback=${currentBuyback}[#elseif currentAssignment??]assignment=${currentAssignment}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
		</div>
	</div>
	
</form>