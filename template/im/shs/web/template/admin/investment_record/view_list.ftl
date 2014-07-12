<div class="form-group">
	<div class="col-sm-offset-1 col-sm-10">
		<table class="table table-bordered">
			<tr>
				<th>编号</th>
				<th>投资人</th>
				<th>金额</th>
				<th>方式</th>
				<th>日期/IP</th>
			</tr>
			[#list investmentRecords as investmentRecord]
				<tr>
					<td>${investmentRecord.id}</td>
					<td>${investmentRecord.investor.username}</td>
					<td>${investmentRecord.amount?string("currency")}</td>
					<td>${message("OperationMethod." + investmentRecord.operationMethod)}</td>
					<td>
						${investmentRecord.createDate?string("yyyy-MM-dd HH:mm:ss")}
						<br/>
						${investmentRecord.ip!"-"}
					</td>
				</tr>
			[/#list]
		</table>
	</div>
</div>