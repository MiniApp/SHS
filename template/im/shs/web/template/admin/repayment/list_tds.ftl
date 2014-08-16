<td class="center-left">${repayment.id}</td>
<td class="center-left">${repayment.borrower.username}</td>
<td class="center-left">
	<small>计划期数：${repayment.period}</small>
	<hr/>
	<small>已还期数：${repayment.paidPeriod}</small>
</td>
<td class="center-left">
	<small>计划本息：${repayment.capitalInterest?string("currency")}</small>
	<br/>
	<small>计划本金：${repayment.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${repayment.interest?string("currency")}</small>
	<hr/>
	<small>已还本息：${repayment.paidCapitalInterest?string("currency")}</small>
	<br/>
	<small>已还本金：${repayment.paidCapital?string("currency")}</small>
	<br/>
	<small>已还利息：${repayment.paidInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划服务费：${repayment.fee?string("currency")}</small>
	<hr/>
	<small>已付服务费：${repayment.paidFee?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算金额：${repayment.countAmount?string("currency")}</small>
	<hr/>
	<small>已付金额：${repayment.paidAmount?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划支出：${repayment.expenditure?string("currency")}</small>
	<hr/>
	<small>实际支出：${repayment.paidExpenditure?string("currency")}</small>
</td>
<td class="center-left">
	<small>开始日期：${repayment.createDate?string("yyyy-MM-dd HH:mm:ss")}</small>
	<br/>
	<small>计划完成日期：${repayment.endDate?string("yyyy-MM-dd")}</small>
	[#-- 存在下一还款日期时 --]
	[#if repayment.nextDate??]
		<br/>
		<small>下一期日期：${repayment.nextDate?string("yyyy-MM-dd")}</small>
	[/#if]
	<hr/>
	<small>实际完成日期：${(repayment.completedDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</small>
</td>
<td class="center-left">
	<small>计算期限：${repayment.overduePeriod}天</small>
	<br/>
	<small>计算利息：${repayment.overdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${repayment.paidOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算期限：${repayment.seriousOverduePeriod}天</small>
	<br/>
	<small>计算利息：${repayment.seriousOverdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${repayment.paidSeriousOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">${message("RepaymentState." + repayment.state)}</td>