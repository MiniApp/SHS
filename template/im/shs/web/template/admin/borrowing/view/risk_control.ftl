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

[#-- 风险度 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		风险度
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.riskDegree??]
					${borrowing.riskDegree}%
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 风险额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		风险额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.riskAmount??]
					${borrowing.riskAmount?string("currency")}
				[#else]
					-
				[/#if]
			</strong>
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

[#-- 最低投资 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		最低投资
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.investmentMinimum??]
					${borrowing.investmentMinimum?string("currency")}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#--
[#-- 最高投资 --\]
<div class="form-group">
	<label class="col-sm-2 control-label">
		最高投资
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.investmentMaximum??]
					${borrowing.investmentMaximum?string("currency")}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>
--]

[#-- 投资期限 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		投资期限
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.investmentPeriod??]
					${borrowing.investmentPeriod}天
				[#else]
					-
				[/#if]
			</strong>
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
[#-- 提前还款费率 --\]
<div class="form-group">
	<label class="col-sm-2 control-label">
		提前还款费率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.prepaymentFeeRate??]
					${borrowing.prepaymentFeeRate}%
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>
--]

[#-- 借款服务费率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款服务费率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.feeRate??]
					${borrowing.feeRate}%
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 还款服务费率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		还款服务费率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.repaymentFeeRate??]
					${borrowing.repaymentFeeRate}%
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 回收服务费率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		回收服务费率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.recoveryFeeRate??]
					${borrowing.recoveryFeeRate}%
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 逾期利率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		逾期利率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.overdueInterestRate??]
					${borrowing.overdueInterestRate}%/天
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 严重逾期开始期限 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期开始期限
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.seriousOverdueStartPeriod??]
					${borrowing.seriousOverdueStartPeriod}天
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 严重逾期利率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期利率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.seriousOverdueInterestRate??]
					${borrowing.seriousOverdueInterestRate}%/天
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>