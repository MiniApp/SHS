[#-- 风险分析 --]
<div class="form-group">
	<label for="riskAnalysis" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		风险分析
	</label>
	<div class="col-sm-4">
		<textarea id="riskAnalysis" class="form-control" name="riskAnalysis" cols="10" rows="5"></textarea>
	</div>
</div>

[#-- 风险度 --]
<div class="form-group">
	<label for="riskDegree" class="col-sm-2 control-label">
		<span class="required">*</span>
		风险度
	</label>
	<div class="input-group col-sm-4">
		<input id="riskDegree" class="form-control" type="text" name="riskDegree" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 信用评级 --]
<div class="form-group">
	<label for="creditRating" class="col-sm-2 control-label">
		<span class="required">*</span>
		信用评级
	</label>
	<div class="col-sm-4">
		<select id="creditRating" class="form-control chosen-select" name="creditRating" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list creditRatings as creditRating]
				<option value="${creditRating}">${message("CreditRating." + creditRating)}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 投资方式 --]
<div class="form-group">
	<label for="investmentMethod" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		投资方式
	</label>
	<div class="input-group col-sm-4">
		<select id="investmentMethod" class="form-control chosen-select" name="investmentMethod" data-placeholder="&nbsp;">
			[#--
			<option value="">-</option>
			[#list investmentMethods as investmentMethod]
				[#assign investmentMethod = "multiple_of_minimum"]
				<option value="${investmentMethod}">${message("InvestmentMethod." + investmentMethod)}</option>
			[/#list]
			--]
			[#assign investmentMethod = "multiple_of_minimum" /]
			<option value="${investmentMethod}">${message("InvestmentMethod." + investmentMethod)}</option>
		</select>
	</div>
</div>

[#-- 最低投资 --]
<div class="form-group">
	<label for="investmentMinimum" class="col-sm-2 control-label">
		<span class="required">*</span>
		最低投资
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="investmentMinimum" class="form-control" type="text" name="investmentMinimum" value="0" maxlength="20" autocomplete="off" />
	</div>
</div>

[#--
[#-- 最高投资 --\]
<div class="form-group">
	<label for="investmentMaximum" class="col-sm-2 control-label">
		最高投资
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="investmentMaximum" class="form-control" type="text" name="investmentMaximum" maxlength="20" autocomplete="off" />
	</div>
</div>
--]

[#-- 投资期限 --]
<div class="form-group">
	<label for="investmentPeriod" class="col-sm-2 control-label">
		投资期限
	</label>
	<div class="input-group col-sm-4">
		<input id="investmentPeriod" class="form-control" type="text" name="investmentPeriod" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">天</label>
	</div>
</div>

[#-- 出借时间 --]
<div class="form-group">
	<label for="lendingTime" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		出借时间
	</label>
	<div class="col-sm-4">
		<select id="lendingTime" class="form-control chosen-select" name="lendingTime" data-placeholder="&nbsp;">
			[#--
			<option value="">-</option>
			[#list lendingTimes as lendingTime]
				<option value="${lendingTime}">${message("LendingTime." + lendingTime)}</option>
			[/#list]
			--]
			[#assign lendingTime = "after_audit" /]
			<option value="${lendingTime}">${message("LendingTime." + lendingTime)}</option>
		</select>
	</div>
</div>

[#-- 还款方式 --]
<div class="form-group">
	<label for="repaymentMethod" class="col-sm-2 control-label">
		<span class="required">*</span>
		还款方式
	</label>
	<div class="col-sm-4">
		<select id="repaymentMethod" class="form-control chosen-select" name="repaymentMethod" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#assign repaymentMethods = ["each_period_avg_capital_plus_interest", "each_period_interest_and_last_period_plus_capital", "last_period_capital_plus_interest"] /]
			[#list repaymentMethods as repaymentMethod]
				<option value="${repaymentMethod}">${message("RepaymentMethod." + repaymentMethod)}</option>
			[/#list]
		</select>
	</div>
</div>

<input type="hidden" name="prepaymentFeeRate" value="0" />
[#--
[#-- 提前还款费率 --\]
<div class="form-group">
	<label for="prepaymentFeeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		提前还款费率
	</label>
	<div class="input-group col-sm-4">
		<input id="prepaymentFeeRate" class="form-control" type="text" name="prepaymentFeeRate" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>
--]

[#-- 借款服务费率 --]
<div class="form-group">
	<label for="feeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款服务费率
	</label>
	<div class="input-group col-sm-4">
		<input id="feeRate" class="form-control" type="text" name="feeRate" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 还款服务费率 --]
<div class="form-group">
	<label for="repaymentFeeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		还款服务费率
	</label>
	<div class="input-group col-sm-4">
		<input id="repaymentFeeRate" class="form-control" type="text" name="repaymentFeeRate" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 回收服务费率 --]
<div class="form-group">
	<label for="recoveryFeeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		回收服务费率
	</label>
	<div class="input-group col-sm-4">
		<input id="recoveryFeeRate" class="form-control" type="text" name="recoveryFeeRate" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 逾期利率 --]
<div class="form-group">
	<label for="overdueInterestRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		逾期利率
	</label>
	<div class="input-group col-sm-4">
		<input id="overdueInterestRate" class="form-control" type="text" name="overdueInterestRate" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%/天</label>
	</div>
</div>

[#-- 严重逾期开始期限 --]
<div class="form-group">
	<label for="seriousOverdueStartPeriod" class="col-sm-2 control-label">
		<span class="required">*</span>
		严重逾期开始期限
	</label>
	<div class="input-group col-sm-4">
		<input id="seriousOverdueStartPeriod" class="form-control" type="text" name="seriousOverdueStartPeriod" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">天</label>
	</div>
</div>

[#-- 严重逾期利率 --]
<div class="form-group">
	<label for="seriousOverdueInterestRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		严重逾期利率
	</label>
	<div class="input-group col-sm-4">
		<input id="seriousOverdueInterestRate" class="form-control" type="text" name="seriousOverdueInterestRate" value="0" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%/天</label>
	</div>
</div>