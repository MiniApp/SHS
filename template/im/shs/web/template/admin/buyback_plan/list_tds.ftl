<td class="center-left">${buybackPlan.id}</td>
<td class="center-left">${buybackPlan.borrower.username}</td>
<td class="center-left">第${buybackPlan.period}期</td>
<td class="center-left">
	<small>计划本息：${buybackPlan.capitalInterest?string("currency")}</small>
	<br/>
	<small>计划本金：${buybackPlan.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${buybackPlan.interest?string("currency")}</small>
	<hr/>
	<small>已还本息：${buybackPlan.paidCapitalInterest?string("currency")}</small>
	<br/>
	<small>已还本金：${buybackPlan.paidCapital?string("currency")}</small>
	<br/>
	<small>已还利息：${buybackPlan.paidInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算金额：${buybackPlan.countAmount?string("currency")}</small>
	<hr/>
	<small>已付金额：${buybackPlan.paidAmount?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划支出：${buybackPlan.expenditure?string("currency")}</small>
	<hr/>
	<small>实际支出：${buybackPlan.paidExpenditure?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划日期：${(buybackPlan.date?string("yyyy-MM-dd"))!"-"}</small>
	<hr/>
	<small>实际日期：${(buybackPlan.paidDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</small>
</td>
<td class="center-left">
	<small>计算利息：${buybackPlan.overdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${buybackPlan.paidOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算利息：${buybackPlan.seriousOverdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${buybackPlan.paidSeriousOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">${message("BuybackState." + buybackPlan.state)}</td>