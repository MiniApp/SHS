<td class="center">${borrowing.id}</td>
<td class="center">${message("BorrowingType." + borrowing.type)}</td>
<td class="center-left">
	[#if borrowing.amount??]
		金额：${borrowing.amount?string("currency")}
	[/#if]
	[#if borrowing.period??]
		<br/>
		<small>期限：${borrowing.period}个月</small>
	[/#if]
	[#if borrowing.interestRate??]
		<br/>
		<small>利率：${borrowing.interestRate}%/年</small>
	[/#if]
</td>
<td class="center-left">
	[#if borrowing.guaranteeMethod??]
		方式：${message("GuaranteeMethod." + borrowing.guaranteeMethod)}
		[#if borrowing.guaranteeCorp??]
			<br/>
			<small>公司：${borrowing.guaranteeCorp.corpName}</small>
		[/#if]
		[#--
		[#if borrowing.guaranteeCapital??]
			<br/>
			<small>金额：${borrowing.guaranteeCapital?string("currency")}</small>
		[/#if]
		--]
	[#else]
		-
	[/#if]
</td>
<td class="center">${message("CreditRating." + borrowing.creditRating)}</td>
<td class="center-left">
	[#if borrowing.investmentMethod??]
		方式：${message("InvestmentMethod." + borrowing.investmentMethod)}
	[/#if]
	[#if borrowing.investmentPeriod??]
		期限：${borrowing.investmentPeriod}天
	[/#if]
	[#if borrowing.investmentMinimum??]
		<br/>
		<small>最小金额：${borrowing.investmentMinimum?string("currency")}</small>
	[/#if]
</td>
<td class="center-left">${message("RepaymentMethod." + borrowing.repaymentMethod)}</td>
<td class="center-left">
	[#if borrowing.feeRate??]
		${borrowing.feeRate}%
		[#--
		<br/>
		<small>${borrowing.fee?string("currency")}</small>
		--]
	[/#if]
</td>
<td class="center-left">
	[#if borrowing.borrower.name??]
		${borrowing.borrower.name}
	[#else]
		${borrowing.borrower}
	[/#if]
	[#if borrowing.borrower.gender != null]
		<br/>
		<small>${message("Gender." + borrowing.borrower.gender)}</small>
	[/#if]
	[#if borrowing.borrower.mobile != null]
		<br/>
		<small>${borrowing.borrower.mobile}</small>
	[/#if]
</td>
<td class="center">
	${borrowing.createDate?string("yyyy-MM-dd HH:mm:ss")}
	[#if borrowing.ip??]
		<br/>
		<small>${borrowing.ip}</small>
	[/#if]
</td>