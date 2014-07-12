[#-- 借款材料 --]
<div class="form-group">
	<label for="material" class="col-sm-2 control-label">
		借款材料
	</label>
	<div class="col-sm-4">
		<button id="addMaterial" class="btn btn-default btn-sm" type="button">&nbsp;添&nbsp;加&nbsp;</button>
	</div>
</div>
<div class="form-group">
	<div class="col-sm-offset-2 col-sm-8">
		<table id="materialTable" class="table table-bordered">
			<tr>
				<th width="38%">文件</th>
				<th width="45%">标题</th>
				<th width="10%">排序</th>
				<th width="7%">操作</th>
			</tr>
			[#list borrowing.materials as material]
				<tr>
					<td>
						<div class="input-group input-file">
							<input class="form-control file-name ignore" value="${material.large}" />
							<span class="input-group-btn">
								<span class="btn btn-default btn-file">
									修改图片
									<input type="file" name="materials[${material_index}].file" />
								</span>
								<a href="${material.large}" class="btn btn-default" target="_blank">查看图片</a>
							</span>
						</div>
						<input type="hidden" name="materials[${material_index}].source" value="${material.source}" />
						<input type="hidden" name="materials[${material_index}].large" value="${material.large}" />
						<input type="hidden" name="materials[${material_index}].medium" value="${material.medium}" />
						<input type="hidden" name="materials[${material_index}].thumbnail" value="${material.thumbnail}" />
					</td>
					<td>
						<input class="form-control" type="text" name="materials[${material_index}].title" value="${material.title}" />
					</td>
					<td>
						<input class="form-control" type="text" name="materials[${material_index}].order" value="${material.order}" />
					</td>
					<td>
						<a href="#" class="delete">
							<i class="icon-remove"></i>
							删除
						</a>
					</td>
				</tr>
			[/#list]
		</table>
	</div>
</div>