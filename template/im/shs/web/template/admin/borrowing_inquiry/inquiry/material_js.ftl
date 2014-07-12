[#-- 借款材料 --]
var $materialTable = $("#materialTable tbody");

[#-- 添加借款材料 --]
$("#addMaterial").click(function() {
	[@compress single_line = true]
	$materialTable.append("
		<tr>
			<td>
				<div class=\"input-group input-file\">
					<input class=\"form-control file-name ignore\" />
					<span class=\"input-group-btn\">
						<span class=\"btn btn-default btn-file\">
							选择图片
							<input type=\"file\" name=\"materials[" + materialIndex + "].file\" />
						</span>
					</span>
				</div>
			</td>
			<td>
				<input class=\"form-control\" type=\"text\" name=\"materials[" + materialIndex + "].title\" />
			</td>
			<td>
				<input class=\"form-control\" type=\"text\" name=\"materials[" + materialIndex + "].order\" />
			</td>
			<td>
				<a href=\"#\" class=\"delete\">
					<i class=\"icon-remove\"></i>
					删除
				</a>
			</td>
		</tr>
	");
	[/@compress]
	materialIndex++;
});

[#-- 删除借款材料 --]
$materialTable.on("click", "a.delete", function(e) {
	e.preventDefault();
	
	var $this = $(this);
	$this.closest("tr").remove();
});