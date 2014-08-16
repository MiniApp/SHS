[#-- 借款状态 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款状态
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("BorrowingProgressState." + borrowing.progress + "." + borrowing.state)}</strong>
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

[#-- 借款金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.amount??]
					${borrowing.amount?string("currency")}
				[#else]
					-
				[/#if]
			</strong>
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

[#-- 借款期限 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款期限
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.period??]
					${borrowing.period}个月
				[#else]
					-
				[/#if]
			</strong>
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

[#-- 借款利率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款利率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.interestRate??]
					${borrowing.interestRate}%/年
				[#else]
					-
				[/#if]
			</strong>
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

[#-- 创建日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		创建日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.createDate?string("yyyy-MM-dd HH:mm:ss")}</strong>
		</p>
	</div>
</div>

[#-- 创建IP --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		创建IP
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.ip!"-"}</strong>
		</p>
	</div>
</div>