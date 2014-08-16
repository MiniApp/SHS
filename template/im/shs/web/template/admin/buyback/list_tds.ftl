<td class="center-left">${buyback.id}</td>
<td class="center-left">${buyback.borrower.username}</td>
<td class="center-left">
	<small>计划期数：${buyback.period}</small>
	<hr/>
	<small>已还期数：${buyback.paidPeriod}</small>
</td>
<td class="center-left">
	<small>计划本息：${buyback.capitalInterest?string("currency")}</small>
	<br/>
	<small>计划本金：${buyback.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${buyback.interest?string("currency")}</small>
	<hr/>
	<small>已还本息：${buyback.paidCapitalInterest?string("currency")}</small>
	<br/>
	<small>已还本金：${buyback.paidCapital?string("currency")}</small>
	<br/>
	<small>已还利息：${buyback.paidInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算金额：${buyback.countAmount?string("currency")}</small>
	<hr/>
	<small>已付金额：${buyback.paidAmount?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划支出：${buyback.expenditure?string("currency")}</small>
	<hr/>
	<small>实际支出：${buyback.paidExpenditure?string("currency")}</small>
</td>
<td class="center-left">
	<small>开始日期：${buyback.createDate?string("yyyy-MM-dd HH:mm:ss")}</small>
	<br/>
	<small>计划完成日期：${buyback.endDate?string("yyyy-MM-dd")}</small>
	[#-- 存在下一回购日期时 --]
	[#if buyback.nextDate??]
		<br/>
		<small>下一期日期：${buyback.nextDate?string("yyyy-MM-dd")}</small>
	[/#if]
	<hr/>
	<small>实际完成日期：${(buyback.completedDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</small>
</td>
<td class="center-left">
	<small>计算利息：${buyback.overdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${buyback.paidOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算利息：${buyback.seriousOverdueInterest?string("currency")}</small>
	<hr/>
	<small>已还利息：${buyback.paidSeriousOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">${message("BuybackState." + buyback.state)}</td>