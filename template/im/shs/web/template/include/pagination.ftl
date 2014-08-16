[#if totalPages > 1]
	<div class="yellow">
		[#if hasPrevious]
			<a href="[@pattern?replace("{pageNumber}", "${previousPageNumber}")?interpret /]">上一页</a>
		[#else]
			<span class="disabled">上一页</span>
		[/#if]
		[#list segment as segmentPageNumber]
			[#if segmentPageNumber_index == 0 && segmentPageNumber > firstPageNumber + 1]
				<span class="disabled">...</span>
			[/#if]
			[#if segmentPageNumber != pageNumber]
				<a href="[@pattern?replace("{pageNumber}", "${segmentPageNumber}")?interpret /]">${segmentPageNumber}</a>
			[#else]
				<span class="current">${segmentPageNumber}</span>
			[/#if]
			[#if !segmentPageNumber_has_next && segmentPageNumber < lastPageNumber - 1]
				<span class="disabled">...</span>
			[/#if]
		[/#list]
		[#if hasNext]
			<a href="[@pattern?replace("{pageNumber}", "${nextPageNumber}")?interpret /]">下一页</a>
		[#else]
			<span class="disabled">下一页</span>
		[/#if]
	</div>
[/#if]