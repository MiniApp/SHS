<td class="center">${repaymentRecord.id}</td>
<td class="center-left">${repaymentRecord.borrower.username}</td>
<td class="center-left">第${repaymentRecord.period}期</td>
<td class="center-left">
	计划本息：${repaymentRecord.capitalInterest?string("currency")}
	<br/>
	<small>计划本金：${repaymentRecord.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${repaymentRecord.interest?string("currency")}</small>
	<hr/>
	已还本息：${repaymentRecord.paidCapitalInterest?string("currency")}
	<br/>
	<small>已还本金：${repaymentRecord.paidCapital?string("currency")}</small>
	<br/>
	<small>已还利息：${repaymentRecord.paidInterest?string("currency")}</small>
</td>
<td class="center-left">
	计划日期：${(repaymentRecord.date?string("yyyy-MM-dd"))!"-"}
	<hr/>
	实际日期：${(repaymentRecord.paidDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}
</td>
<td class="center-left">
	计算利息：${repaymentRecord.overdueInterest?string("currency")}
	<br/>
	计算服务费：${repaymentRecord.overdueFee?string("currency")}
	<hr/>
	已还利息：${repaymentRecord.paidOverdueInterest?string("currency")}
	<br/>
	已付服务费：${repaymentRecord.paidOverdueFee?string("currency")}
</td>
<td class="center-left">
	计算利息：${repaymentRecord.seriousOverdueInterest?string("currency")}
	<br/>
	计算服务费：${repaymentRecord.seriousOverdueFee?string("currency")}
	<hr/>
	已还利息：${repaymentRecord.paidSeriousOverdueInterest?string("currency")}
	<br/>
	已付服务费：${repaymentRecord.paidSeriousOverdueFee?string("currency")}
</td>
<td class="center">${message("RepaymentState." + repaymentRecord.state)}</td>