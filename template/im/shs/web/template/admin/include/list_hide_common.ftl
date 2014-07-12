[#-- hide elements 隐藏元素 --]
<div class="hide">
    
    [#-- actions for jQuery DataTables 数据表格 - 操作 --]
    <div class="dataTableActions">
        <div class="btn-group">
			<a href="${indexUrl}/new" class="btn btn-default btn-sm">
				<i class="icon-plus"></i>
				添加
			</a>
			<a href="${indexUrl}" class="btn btn-default btn-sm">
            	<i class="icon-refresh"></i>
            	刷新
			</a>
			<a href="${indexUrl}/batch_delete" class="btn btn-default btn-sm operateRows deleteRows">
				<i class="icon-remove"></i>
	        	删除
			</a>
		</div>
    </div>
    
    [#-- delete confirmation box 删除确认对话框 --]
    <div class="colorbox-content deleteConfirmDialog">
        <div class="colorbox-message">
        	<strong>确定删除所选记录吗？</strong>
    	</div>
        <div class="colorbox-button">
            <a href="#" class="btn btn-primary btn-xs confirmYes">&nbsp;确&nbsp;定&nbsp;</a>
            &nbsp;&nbsp;
            <a href="#" class="btn btn-default btn-xs confirmNo">&nbsp;取&nbsp;消&nbsp;</a>
        </div>
    </div>
    
</div>