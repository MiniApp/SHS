<div class="form-group">
	<div class="col-sm-offset-1 col-sm-10">
		<table class="table table-bordered">
			<tr>
				<th>编号</th>
				<th>投资人</th>
				<th>金额</th>
				<th>状态</th>
			</tr>
			[#list investments as investment]
				<tr>
					<td>${investment.id}</td>
					<td>${investment.investor.username}</td>
					<td>${investment.amount?string("currency")}</td>
					<td>${message("InvestmentState." + investment.state)}</td>
				</tr>
			[/#list]
		</table>
	</div>
</div>