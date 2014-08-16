<div class="form-group">
	<table class="table table-bordered">
		<tr>
	        <th>编号</th>
	        <th>类型</th>
	        <th>方式</th>
	        <th>收入</th>
	        <th>支出</th>
	        <th>冻结</th>
	        <th>解冻</th>
	        <th>待收</th>
	        <th>待还</th>
	        <th>已冻结</th>
	        <th>可用</th>
	        <th>余额</th>
	        <th>转让人</th>
	        <th>日期/IP</th>
		</tr>
		[#list capitals as capital]
			<tr>
		        <td>${capital.id}</td>
		        <td>${message("CapitalType." + capital.type)}</td>
		        <td>${message("CapitalMethod." + capital.method)}</td>
		        <td>${capital.credit?string("currency")}</td>
		        <td>${capital.debit?string("currency")}</td>
		        <td>${capital.frozen?string("currency")}</td>
		        <td>${capital.unfrozen?string("currency")}</td>
		        <td>${capital.credits?string("currency")}</td>
		        <td>${capital.debits?string("currency")}</td>
		        <td>${capital.frozens?string("currency")}</td>
		        <td>${capital.available?string("currency")}</td>
		        <td>${capital.balance?string("currency")}</td>
		        <td>${capital.member.username}</td>
		        <td>
		        	${capital.createDate?string("yyyy-MM-dd HH:mm:ss")}
					[#if capital.ip??]
						<br/>
						<small>${capital.ip}</small>
					[/#if]
		        </td>
			</tr>
		[/#list]
	</table>
</div>