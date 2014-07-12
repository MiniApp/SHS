[#-- 风险分析 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		风险分析
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.riskAnalysis!"-"}</strong>
		</p>
	</div>
</div>

[#-- 风险度（%） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		风险度（%）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.riskDegree!"-"}</strong>
		</p>
	</div>
</div>

[#-- 风险额（元） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		风险额（元）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.riskAmount?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 信用评级 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		信用评级
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("CreditRating." + borrowing.creditRating)}</strong>
		</p>
	</div>
</div>

[#-- 投资方式 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		投资方式
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("InvestmentMethod." + borrowing.investmentMethod)}</strong>
		</p>
	</div>
</div>

[#-- 最低投资（元） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		最低投资（元）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(borrowing.investmentMinimum?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>

[#--
[#-- 最高投资（元） --\]
<div class="form-group">
	<label class="col-sm-2 control-label">
		最高投资（元）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(borrowing.investmentMaximum?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
--]

[#-- 投资期限（天） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		投资期限（天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.investmentPeriod!"-"}</strong>
		</p>
	</div>
</div>

[#-- 出借时间 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		出借时间
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("LendingTime." + borrowing.lendingTime)}</strong>
		</p>
	</div>
</div>

[#-- 还款方式 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		还款方式
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("RepaymentMethod." + borrowing.repaymentMethod)}</strong>
		</p>
	</div>
</div>

[#--
[#-- 提前还款违约期数（期） --\]
<div class="form-group">
	<label class="col-sm-2 control-label">
		提前还款违约期数（期）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.prepaymentDefaultPeriod!"-"}</strong>
		</p>
	</div>
</div>

[#-- 提前还款费率（%） --\]
<div class="form-group">
	<label class="col-sm-2 control-label">
		提前还款费率（%）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.prepaymentFeeRate!"-"}</strong>
		</p>
	</div>
</div>
--]

[#-- 借款服务费率（%） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款服务费率（%）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.feeRate!"-"}</strong>
		</p>
	</div>
</div>

[#-- 还款服务费率（%） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		还款服务费率（%）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.repaymentFeeRate!"-"}</strong>
		</p>
	</div>
</div>

[#-- 回收服务费率（%） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		回收服务费率（%）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.recoveryFeeRate!"-"}</strong>
		</p>
	</div>
</div>

[#-- 逾期利率（%/天） --]
<div class="form-group">
	<label for="overdueInterestRate" class="col-sm-2 control-label">
		逾期利率（%/天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.repaymentOverdueInterestRate!"-"}</strong>
		</p>
	</div>
</div>

[#-- 逾期服务费率（%/天） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		逾期服务费率（%/天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.repaymentOverdueFeeRate!"-"}</strong>
		</p>
	</div>
</div>

[#-- 严重逾期开始期限（天） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期开始期限（天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.repaymentSeriousOverdueStartPeriod!"-"}</strong>
		</p>
	</div>
</div>

[#-- 严重逾期利率（%/天） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期利率（%/天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.repaymentSeriousOverdueInterestRate!"-"}</strong>
		</p>
	</div>
</div>

[#-- 严重逾期服务费率（%/天） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期服务费率（%/天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.repaymentSeriousOverdueFeeRate!"-"}</strong>
		</p>
	</div>
</div>