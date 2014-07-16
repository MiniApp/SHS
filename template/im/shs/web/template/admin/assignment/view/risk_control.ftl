[#-- 风险分析 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		风险分析
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.riskAnalysis!"-"}</strong>
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
				[#if assignment.riskDegree??]
					${assignment.riskDegree}%
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
				[#if assignment.riskAmount??]
					${assignment.riskAmount?string("currency")}
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
			<strong>${message("CreditRating." + assignment.creditRating)}</strong>
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
			<strong>${message("InvestmentMethod." + assignment.investmentMethod)}</strong>
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
				[#if assignment.investmentMinimum??]
					${assignment.investmentMinimum?string("currency")}
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
				[#if assignment.investmentMaximum??]
					${assignment.investmentMaximum?string("currency")}
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
				[#if assignment.investmentPeriod??]
					${assignment.investmentPeriod}天
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 受让时间 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		受让时间
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("LendingTime." + assignment.lendingTime)}</strong>
		</p>
	</div>
</div>

[#-- 回购方式 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		回购方式
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("RepaymentMethod." + assignment.repaymentMethod)}</strong>
		</p>
	</div>
</div>

[#--
[#-- 提前回购费率 --\]
<div class="form-group">
	<label class="col-sm-2 control-label">
		提前回购费率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if assignment.prepaymentFeeRate??]
					${assignment.prepaymentFeeRate}%
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>
--]

[#-- 转让服务费率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让服务费率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if assignment.feeRate??]
					${assignment.feeRate}%
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 回购服务费率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		回购服务费率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if assignment.repaymentFeeRate??]
					${assignment.repaymentFeeRate}%
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
				[#if assignment.recoveryFeeRate??]
					${assignment.recoveryFeeRate}%
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
				[#if assignment.overdueInterestRate??]
					${assignment.overdueInterestRate}%/天
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
				[#if assignment.seriousOverdueStartPeriod??]
					${assignment.seriousOverdueStartPeriod}天
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
				[#if assignment.seriousOverdueInterestRate??]
					${assignment.seriousOverdueInterestRate}%/天
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>