<div class="form-group">
	<div class="col-sm-offset-1 col-sm-10">
		<table class="table table-bordered">
			<tr>
				<th>编号</th>
				<th>操作员</th>
				<th>内容</th>
				<th>是否通过</th>
				<th>类型</th>
				<th>日期/IP</th>
			</tr>
			[#list logs as log]
				<tr>
					<td>${log.id}</td>
					<td>${log.operator!"-"}</td>
					<td>${log.cont!"-"}</td>
					<td>${log.approved?string("是", "否")}</td>
					<td>${message("BorrowingLogType." + log.type)}</td>
					<td>
						${log.createDate?string("yyyy-MM-dd HH:mm:ss")}
						<br/>
						${log.ip!"-"}
					</td>
				</tr>
			[/#list]
		</table>
	</div>
</div>