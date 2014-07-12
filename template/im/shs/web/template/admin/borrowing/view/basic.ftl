[#-- 借款进度 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款进度
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("BorrowingProgress." + borrowing.progress)}</strong>
		</p>
	</div>
</div>

[#-- 借款状态 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款状态
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("BorrowingState." + borrowing.state)}</strong>
		</p>
	</div>
</div>

[#-- 借款类型 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款类型
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("BorrowingType." + borrowing.type)}</strong>
		</p>
	</div>
</div>

[#-- 借款标题 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款标题
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.title!"-"}</strong>
		</p>
	</div>
</div>

[#-- 借款金额（元） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款金额（元）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(borrowing.amount?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>

[#-- 借款金额范围 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款金额范围
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("AmountScope." + borrowing.amountScope)}</strong>
		</p>
	</div>
</div>

[#-- 借款期限（月） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款期限（月）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.period!"-"}</strong>
		</p>
	</div>
</div>

[#-- 借款期限范围 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款期限范围
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("PeriodScope." + borrowing.periodScope)}</strong>
		</p>
	</div>
</div>

[#-- 借款利率（%/年） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款利率（%/年）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.interestRate!"-"}</strong>
		</p>
	</div>
</div>

[#-- 借款利率范围 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款利率范围
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("InterestRateScope." + borrowing.interestRateScope)}</strong>
		</p>
	</div>
</div>

[#-- 借款描述 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款描述
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.description!"-"}</strong>
		</p>
	</div>
</div>

[#-- 申请日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		申请日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.createDate?string("yyyy-MM-dd HH:mm:ss")}</strong>
		</p>
	</div>
</div>

[#-- 申请IP --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		申请IP
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.ip!"-"}</strong>
		</p>
	</div>
</div>