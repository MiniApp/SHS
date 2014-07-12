<div class="panel panel-default">
	<div class="panel-heading">
		<a href="#collapse_cont" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
			<i class="glyphicon glyphicon-list-alt"></i>
			内容管理
		</a>
	</div>
	<div class="accordion-body collapse" id="collapse_cont">
		<div class="panel-body">
			<ul class="nav nav-pills nav-stacked">
				<li class="nav-header">文章管理</li>
				<li><a href="${baseUrl}/article_category" target="iframe">文章分类管理</a></li>
				<li><a href="${baseUrl}/article" target="iframe">文章列表</a></li>
				<li class="nav-header">广告管理</li>
				<li><a href="${baseUrl}/ad_position" target="iframe">广告位管理</a></li>
				<li><a href="${baseUrl}/ad" target="iframe">广告列表</a></li>
				<li class="nav-header">链接管理</li>
				<li><a href="${baseUrl}/friend_link/text" target="iframe">${message("FriendLinkType.text")}</a></li>
				<li><a href="${baseUrl}/friend_link/image" target="iframe">${message("FriendLinkType.image")}</a></li>
			</ul>
		</div>
	</div>
</div>