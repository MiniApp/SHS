[#-- 借款材料 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款材料
	</label>
	<div class="col-sm-4">
		[#list borrowing.materials as material]
			<a href="${material.large}" title="${material.title}" target="_blank">
				<img src="${material.thumbnail}" alt="${material.title}" />
			</a>
		[/#list]
	</div>
</div>