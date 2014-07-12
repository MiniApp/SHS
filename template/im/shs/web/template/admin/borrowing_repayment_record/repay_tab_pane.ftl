<form id="inputForm" action="${indexUrl}/batch_repay" method="post">
	[#if currentRepayment?? && currentBorrowing??]
		<input type="hidden" name="repayment" value="${currentRepayment}" />
	[#elseif currentBorrowing??]
		<input type="hidden" name="borrowing" value="${currentBorrowing}" />
	[/#if]
	[#list currentRepaymentRecords as repaymentRecord]
		<input type="hidden" name="ids" value="${repaymentRecord.id}" />
	[/#list]

	[#-- 还款记录 --]
	<div class="form-group">
		<table class="table table-bordered">
			<tr>
				[#-- 还款记录 List TH --]
				[#include "/template/admin/repayment_record/list_ths.ftl" /]
			</tr>
			[#list currentRepaymentRecords as repaymentRecord]
				<tr>
					[#-- 还款记录 List TD --]
					[#include "/template/admin/repayment_record/list_tds.ftl" /]
				</tr>
			[/#list]
		</table>
	</div>
	
	[#-- 还款总额 （元） --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			还款总额 （元）
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${repaymentAmts?string("currency")}</strong>
			</p>
		</div>
	</div>
	
	[#-- 借款人可用余额（元） --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			借款人可用余额（元）
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${borrower.available?string("currency")}</strong>
			</p>
		</div>
	</div>
													
	[#-- 还款意见 --]
	<div class="form-group">
		<label for="opinion" class="col-sm-2 control-label">
			<span class="required">*</span>
			还款意见
		</label>
		<div class="col-sm-4">
			<textarea id="opinion" class="form-control" name="opinion" cols="10" rows="5"></textarea>
		</div>
	</div>
	
	[#-- 表单按钮 --]
	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-4">
			<button class="btn btn-default btn-sm" type="submit">&nbsp;提&nbsp;交&nbsp;</button>
			<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}?[#if currentRepayment?? && currentBorrowing??]repayment=${currentRepayment}[#elseif currentBorrowing??]borrowing=${currentBorrowing}[/#if]'">&nbsp;返&nbsp;回&nbsp;</button>
		</div>
	</div>
	
</form>