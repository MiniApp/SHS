<td class="center">${recovery.id}</td>
<td class="center-left">${recovery.investor.username}</td>
<td class="center-left">
	计划期数：${recovery.period}
	<hr/>
	已回期数：${recovery.recoveredPeriod}
</td>
<td class="center-left">
	计划本息：${recovery.capitalInterest?string("currency")}
	<br/>
	<small>计划本金：${recovery.amount?string("currency")}</small>
	<br/>
	<small>计划利息：${recovery.interest?string("currency")}</small>
	<hr/>
	已回本息：${recovery.recoveredCapitalInterest?string("currency")}
	<br/>
	<small>已回本金：${recovery.recoveredCapital?string("currency")}</small>
	<br/>
	<small>已回利息：${recovery.recoveredInterest?string("currency")}</small>
</td>
<td class="center-left">
	开始日期：${recovery.recoveryStartDate?string("yyyy-MM-dd HH:mm:ss")}
	<br/>
	计划完成日期：${recovery.recoveryEndDate?string("yyyy-MM-dd")}
	[#-- 存在下一还款日期时 --]
	[#if recovery.nextRecoveryDate??]
		<br/>
		下一期日期：${recovery.nextRecoveryDate?string("yyyy-MM-dd")}
	[/#if]
	<hr/>
	实际完成日期：${(recovery.recoveryFinishDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}
</td>
<td class="center-left">
	计算利息：${recovery.recoveryOverdueInterest?string("currency")}
	<br/>
	计算服务费：${recovery.recoveryOverdueFee?string("currency")}
	<hr/>
	已回利息：${recovery.recoveryPaidOverdueInterest?string("currency")}
	<br/>
	已付服务费：${recovery.recoveryPaidOverdueFee?string("currency")}
</td>
<td class="center-left">
	计算利息：${recovery.recoverySeriousOverdueInterest?string("currency")}
	<br/>
	计算服务费：${recovery.recoverySeriousOverdueFee?string("currency")}
	<hr/>
	已回利息：${recovery.recoveryPaidSeriousOverdueInterest?string("currency")}
	<br/>
	已付服务费：${recovery.recoveryPaidSeriousOverdueFee?string("currency")}
</td>
<td class="center">${message("InvestmentState." + recovery.state)}</td>