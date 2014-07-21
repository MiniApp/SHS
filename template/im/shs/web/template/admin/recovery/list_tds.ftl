<td class="center-left">${recovery.id}</td>
<td class="center-left">${recovery.investor.username}</td>
<td class="center-left">
	<small>计划期数：${recovery.period}</small>
	<hr/>
	<small>已收期数：${recovery.recoveredPeriod}</small>
</td>
<td class="center-left">
	<small>计划本息：${recovery.capitalInterest?string("currency")}</small>
	<br/>
	<small>计划本金：${recovery.capital?string("currency")}</small>
	<br/>
	<small>计划利息：${recovery.interest?string("currency")}</small>
	<hr/>
	<small>已收本息：${recovery.recoveredCapitalInterest?string("currency")}</small>
	<br/>
	<small>已收本金：${recovery.recoveredCapital?string("currency")}</small>
	<br/>
	<small>已收利息：${recovery.recoveredInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划服务费：${recovery.fee?string("currency")}</small>
	<hr/>
	<small>已付服务费：${recovery.paidFee?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算金额：${recovery.countAmount?string("currency")}</small>
	<hr/>
	<small>已收金额：${recovery.recoveredAmount?string("currency")}</small>
</td>
<td class="center-left">
	<small>计划收入：${recovery.income?string("currency")}</small>
	<hr/>
	<small>实际收入：${recovery.recoveredIncome?string("currency")}</small>
</td>
<td class="center-left">
	<small>开始日期：${recovery.createDate?string("yyyy-MM-dd HH:mm:ss")}</small>
	<br/>
	<small>计划完成日期：${recovery.endDate?string("yyyy-MM-dd")}</small>
	[#-- 存在下一还款日期时 --]
	[#if recovery.nextDate??]
		<br/>
		<small>下一期日期：${recovery.nextDate?string("yyyy-MM-dd")}</small>
	[/#if]
	<hr/>
	<small>实际完成日期：${(recovery.finishDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</small>
</td>
<td class="center-left">
	<small>计算期限：${recovery.overduePeriod}天</small>
	<br/>
	<small>计算利息：${recovery.overdueInterest?string("currency")}</small>
	<hr/>
	<small>已收利息：${recovery.recoveredOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">
	<small>计算期限：${recovery.seriousOverduePeriod}天</small>
	<br/>
	<small>计算利息：${recovery.seriousOverdueInterest?string("currency")}</small>
	<hr/>
	<small>已收利息：${recovery.recoveredSeriousOverdueInterest?string("currency")}</small>
</td>
<td class="center-left">${message("RecoveryState." + recovery.state)}</td>