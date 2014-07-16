<td class="center">${borrowing.id}</td>
<td class="center">${message("BorrowingType." + borrowing.type)}</td>
<td class="center-left">
	[#if borrowing.amount?? || borrowing.period?? || borrowing.interestRate?? || borrowing.repaymentMethod??]
		[#if borrowing.amount??]
			<small>金额：${borrowing.amount?string("currency")}</small>
		[/#if]
		[#if borrowing.period??]
			<br/>
			<small>期限：${borrowing.period}个月</small>
		[/#if]
		[#if borrowing.interestRate??]
			<br/>
			<small>利率：${borrowing.interestRate}%/年</small>
		[/#if]
		[#if borrowing.repaymentMethod??]
			<br/>
			<small>还款：${message("RepaymentMethod." + borrowing.repaymentMethod)}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if borrowing.guaranteeMethod?? || borrowing.guaranteeCorp??]
		[#if borrowing.guaranteeMethod??]
			<small>方式：${message("GuaranteeMethod." + borrowing.guaranteeMethod)}</small>
		[/#if]
		[#if borrowing.guaranteeCorp??]
			<br/>
			<small>公司：${borrowing.guaranteeCorp.corpName}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if borrowing.overdueInterestRate?? || borrowing.seriousOverdueInterestRate??]
		[#if borrowing.overdueInterestRate??]
			<small>一般：${borrowing.overdueInterestRate}%/天</small>
		[/#if]
		[#if borrowing.seriousOverdueInterestRate??]
			<br/>
			<small>严重：${borrowing.seriousOverdueInterestRate}%/天（${borrowing.seriousOverdueStartPeriod}天后）</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center">${message("CreditRating." + borrowing.creditRating)}</td>
<td class="center-left">
	[#if borrowing.investmentMethod?? || borrowing.investmentPeriod?? || borrowing.investmentMinimum??]
		[#if borrowing.investmentMethod??]
			<small>方式：${message("InvestmentMethod." + borrowing.investmentMethod)}</small>
		[/#if]
		[#if borrowing.investmentPeriod??]
			<br/>
			<small>期限：${borrowing.investmentPeriod}天</small>
		[/#if]
		[#if borrowing.investmentMinimum??]
			<br/>
			<small>最低：${borrowing.investmentMinimum?string("currency")}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if borrowing.feeRate?? || borrowing.repaymentFeeRate?? || borrowing.recoveryFeeRate??]
		[#if borrowing.feeRate??]
			<small>借款：${borrowing.feeRate}%</small>
		[/#if]
		[#if borrowing.repaymentFeeRate??]
			<br/>
			<small>还款：${borrowing.repaymentFeeRate}%</small>
		[/#if]
		[#if borrowing.recoveryFeeRate??]
			<br/>
			<small>回收：${borrowing.recoveryFeeRate}%</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if borrowing.borrower??]
		[#if borrowing.borrower.name??]
			<small>姓名：${borrowing.borrower.name}</small>
		[#else]
			<small>用户名：${borrowing.borrower.username}</small>
		[/#if]
		[#if borrowing.borrower.gender != null]
			<br/>
			<small>性别：${message("Gender." + borrowing.borrower.gender)}</small>
		[/#if]
		[#if borrowing.borrower.mobile != null]
			<br/>
			<small>手机：${borrowing.borrower.mobile}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if borrowing.createDate?? || borrowing.ip??]
		[#if borrowing.createDate??]
			<small>日期：${borrowing.createDate?string("yyyy-MM-dd HH:mm")}</small>
		[/#if]
		[#if borrowing.ip??]
			<br/>
			<small>IP：${borrowing.ip}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>