<td class="center">${repayment.id}</td>
<td class="center-left">${repayment.borrower.username}</td>
<td class="center-left">
	计划期数：${repayment.period}
	<hr/>
	已还期数：${repayment.paidPeriod}
</td>
<td class="center-left">
	计划本息：${repayment.capitalInterest?string("currency")}
	<br/>
	<small>计划本金：${repayment.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${repayment.interest?string("currency")}</small>
	<hr/>
	已还本息：${repayment.paidCapitalInterest?string("currency")}
	<br/>
	<small>已还本金：${repayment.paidCapital?string("currency")}</small>
	<br/>
	<small>已还利息：${repayment.paidInterest?string("currency")}</small>
</td>
<td class="center-left">
	开始日期：${repayment.createDate?string("yyyy-MM-dd HH:mm:ss")}
	<br/>
	计划完成日期：${repayment.endDate?string("yyyy-MM-dd")}
	[#-- 存在下一还款日期时 --]
	[#if repayment.nextDate??]
		<br/>
		下一期日期：${repayment.nextDate?string("yyyy-MM-dd")}
	[/#if]
	<hr/>
	实际完成日期：${(repayment.completedDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}
</td>
<td class="center-left">
	计算利息：${repayment.overdueInterest?string("currency")}
	<br/>
	计算服务费：${repayment.overdueFee?string("currency")}
	<hr/>
	已还利息：${repayment.paidOverdueInterest?string("currency")}
	<br/>
	已付服务费：${repayment.paidOverdueFee?string("currency")}
</td>
<td class="center-left">
	计算利息：${repayment.seriousOverdueInterest?string("currency")}
	<br/>
	计算服务费：${repayment.seriousOverdueFee?string("currency")}
	<hr/>
	已还利息：${repayment.paidSeriousOverdueInterest?string("currency")}
	<br/>
	已付服务费：${repayment.paidSeriousOverdueFee?string("currency")}
</td>
<td class="center">${message("RepaymentState." + repayment.state)}</td>