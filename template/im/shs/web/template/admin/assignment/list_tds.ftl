<td class="center">${assignment.id}</td>
<td class="center-left">
	[#if assignment.amount?? || assignment.period?? || assignment.interestRate?? || assignment.repaymentMethod??]
		[#if assignment.amount??]
			<small>金额：${assignment.amount?string("currency")}</small>
		[/#if]
		[#if assignment.period??]
			<br/>
			<small>期限：${assignment.period}个月</small>
		[/#if]
		[#if assignment.interestRate??]
			<br/>
			<small>利率：${assignment.interestRate}%/年</small>
		[/#if]
		[#if assignment.repaymentMethod??]
			<br/>
			<small>回购：${message("RepaymentMethod." + assignment.repaymentMethod)}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if assignment.guaranteeMethod?? || assignment.guaranteeCorp??]
		[#if assignment.guaranteeMethod??]
			<small>方式：${message("GuaranteeMethod." + assignment.guaranteeMethod)}</small>
		[/#if]
		[#if assignment.guaranteeCorp??]
			<br/>
			<small>公司：${assignment.guaranteeCorp.corpName}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if assignment.overdueInterestRate?? || assignment.seriousOverdueInterestRate??]
		[#if assignment.overdueInterestRate??]
			<small>一般：${assignment.overdueInterestRate}%/天</small>
		[/#if]
		[#if assignment.seriousOverdueInterestRate??]
			<br/>
			<small>严重：${assignment.seriousOverdueInterestRate}%/天（${assignment.seriousOverdueStartPeriod}天后）</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center">${message("CreditRating." + assignment.creditRating)}</td>
<td class="center-left">
	[#if assignment.investmentMethod?? || assignment.investmentPeriod?? || assignment.investmentMinimum??]
		[#if assignment.investmentMethod??]
			<small>方式：${message("InvestmentMethod." + assignment.investmentMethod)}</small>
		[/#if]
		[#if assignment.investmentPeriod??]
			<br/>
			<small>期限：${assignment.investmentPeriod}天</small>
		[/#if]
		[#if assignment.investmentMinimum??]
			<br/>
			<small>最低：${assignment.investmentMinimum?string("currency")}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if assignment.feeRate?? || assignment.repaymentFeeRate?? || assignment.recoveryFeeRate??]
		[#if assignment.feeRate??]
			<small>转让：${assignment.feeRate}%</small>
		[/#if]
		[#if assignment.repaymentFeeRate??]
			<br/>
			<small>回购：${assignment.repaymentFeeRate}%</small>
		[/#if]
		[#if assignment.recoveryFeeRate??]
			<br/>
			<small>回收：${assignment.recoveryFeeRate}%</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if assignment.borrower??]
		[#if assignment.borrower.name??]
			<small>姓名：${assignment.borrower.name}</small>
		[#else]
			<small>用户名：${assignment.borrower.username}</small>
		[/#if]
		[#if assignment.borrower.gender != null]
			<br/>
			<small>性别：${message("Gender." + assignment.borrower.gender)}</small>
		[/#if]
		[#if assignment.borrower.mobile != null]
			<br/>
			<small>手机：${assignment.borrower.mobile}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>
<td class="center-left">
	[#if assignment.createDate?? || assignment.ip??]
		[#if assignment.createDate??]
			<small>日期：${assignment.createDate?string("yyyy-MM-dd HH:mm")}</small>
		[/#if]
		[#if assignment.ip??]
			<br/>
			<small>IP：${assignment.ip}</small>
		[/#if]
	[#else]
		-
	[/#if]
</td>