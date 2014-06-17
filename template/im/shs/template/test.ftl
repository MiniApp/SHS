${.now?string("yyyy-MM-dd")}

<table>
	[#list list as l]
		<tr>
			<td>${l.name}</td>
		</tr>
	[/#list]
</table>