<td class="center-left">${recoveryPlan.id}</td>
<td class="center-left">${recoveryPlan.investor.username}</td>
<td class="center-left">第${recoveryPlan.period}期</td>
<td class="center-left">
	<small>计划本息：${recoveryPlan.capitalInterest?string("currency")}</small>
	<br/>
	<small>计划本金：${recoveryPlan.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${recoveryPlan.interest?string("currency")}</small>
	<hr/>
	<small>已回本息：${recoveryPlan.recoveredCapitalInterest?string("currency")}</small>
	<br/>
	<small>已回本金：${recoveryPlan.recoveredCapital?string("currency")}</small>
	<br/>
	<small>已回利息：${recoveryPlan.recoveredInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划服务费：${recoveryPlan.fee?string("currency")}</small>
	<hr/>
	<small>已付服务费：${recoveryPlan.paidFee?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算金额：${recoveryPlan.countAmount?string("currency")}</small>
	<hr/>
	<small>已收金额：${recoveryPlan.recoveredAmount?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划收入：${recoveryPlan.income?string("currency")}</small>
	<hr/>
	<small>实际收入：${recoveryPlan.recoveredIncome?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划日期：${(recoveryPlan.date?string("yyyy-MM-dd"))!"-"}</small>
	<hr/>
	<small>实际日期：${(recoveryPlan.recoveredDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</small>
</td>
<td class="center-left">
	<small>计算期限：${recoveryPlan.overduePeriod}天</small>
	<br/>
	<small>计算利息：${recoveryPlan.overdueInterest?string("currency")}</small>
	<hr/>
	<small>已收利息：${recoveryPlan.recoveredOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算期限：${recoveryPlan.seriousOverduePeriod}天</small>
	<br/>
	<small>计算利息：${recoveryPlan.seriousOverdueInterest?string("currency")}</small>
	<hr/>
	<small>已收利息：${recoveryPlan.recoveredSeriousOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">${message("RecoveryState." + recoveryPlan.state)}</td>