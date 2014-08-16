<div class="form-group">
	<div class="col-sm-offset-1 col-sm-10">
		<table class="table table-bordered">
			<tr>
				<th>编号</th>
				<th>类型</th>
				<th>内容</th>
				<th>发表人</th>
				<th>创建</th>
			</tr>
			[#list opinions as opinion]
				<tr>
					<td>${opinion.id}</td>
					<td>${message("BorrowingOpinionType." + opinion.type)}</td>
					<td>${opinion.cont!"-"}</td>
					<td>${opinion.operator!"-"}</td>
					<td>
						[#if opinion.createDate?? || opinion.ip??]
							[#if opinion.createDate??]
								<small>日期：${opinion.createDate?string("yyyy-MM-dd HH:mm:ss")}</small>
							[/#if]
							[#if opinion.ip??]
								<br/>
								<small>IP：${opinion.ip}</small>
							[/#if]
						[#else]
							-
						[/#if]
					</td>
				</tr>
			[/#list]
		</table>
	</div>
</div>