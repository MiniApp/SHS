<td class="center">${recoveryRecord.id}</td>
<td class="center">${recoveryRecord.investor.username}</td>
<td class="center-left">第${recoveryRecord.period}期</td>
<td class="center-left">
	计划本息：${recoveryRecord.capitalInterest?string("currency")}
	<br/>
	<small>计划本金：${recoveryRecord.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${recoveryRecord.interest?string("currency")}</small>
	<hr/>
	已回本息：${recoveryRecord.recoveredCapitalInterest?string("currency")}
	<br/>
	<small>已回本金：${recoveryRecord.recoveredCapital?string("currency")}</small>
	<br/>
	<small>已回利息：${recoveryRecord.recoveredInterest?string("currency")}</small>
</td>
<td class="center-left">
	计划日期：${(recoveryRecord.date?string("yyyy-MM-dd"))!"-"}
	<hr/>
	实际日期：${(recoveryRecord.recoveredDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}
</td>
<td class="center-left">
	计算利息：${recoveryRecord.overdueInterest?string("currency")}
	<br/>
	计算服务费：${recoveryRecord.overdueFee?string("currency")}
	<hr/>
	已回利息：${recoveryRecord.paidOverdueInterest?string("currency")}
	<br/>
	已付服务费：${recoveryRecord.paidOverdueFee?string("currency")}
</td>
<td class="center-left">
	计算利息：${recoveryRecord.seriousOverdueInterest?string("currency")}
	<br/>
	计算服务费：${recoveryRecord.seriousOverdueFee?string("currency")}
	<hr/>
	已回利息：${recoveryRecord.paidSeriousOverdueInterest?string("currency")}
	<br/>
	已付服务费：${recoveryRecord.paidSeriousOverdueFee?string("currency")}
</td>
<td class="center">${message("InvestmentState." + recoveryRecord.state)}</td>