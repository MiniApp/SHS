<td class="center-left">${repaymentPlan.id}</td>
<td class="center-left">${repaymentPlan.borrower.username}</td>
<td class="center-left">第${repaymentPlan.period}期</td>
<td class="center-left">
	<small>计划本息：${repaymentPlan.capitalInterest?string("currency")}</small>
	<br/>
	<small>计划本金：${repaymentPlan.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${repaymentPlan.interest?string("currency")}</small>
	<hr/>
	<small>已还本息：${repaymentPlan.paidCapitalInterest?string("currency")}</small>
	<br/>
	<small>已还本金：${repaymentPlan.paidCapital?string("currency")}</small>
	<br/>
	<small>已还利息：${repaymentPlan.paidInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划服务费：${repaymentPlan.fee?string("currency")}</small>
	<hr/>
	<small>已付服务费：${repaymentPlan.paidFee?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算金额：${repaymentPlan.countAmount?string("currency")}</small>
	<hr/>
	<small>已付金额：${repaymentPlan.paidAmount?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划支出：${repaymentPlan.expenditure?string("currency")}</small>
	<hr/>
	<small>实际支出：${repaymentPlan.paidExpenditure?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划日期：${(repaymentPlan.date?string("yyyy-MM-dd"))!"-"}</small>
	<hr/>
	<small>实际日期：${(repaymentPlan.paidDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</small>
</td>
<td class="center-left">
	<small>计算期限：${repaymentPlan.overduePeriod}天</small>
	<br/>
	<small>计算利息：${repaymentPlan.overdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${repaymentPlan.paidOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算期限：${repaymentPlan.seriousOverduePeriod}天</small>
	<br/>
	<small>计算利息：${repaymentPlan.seriousOverdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${repaymentPlan.paidSeriousOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">${message("RepaymentState." + repaymentPlan.state)}</td>