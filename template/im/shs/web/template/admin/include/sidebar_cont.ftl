[#list ["admin:article_category", "admin:article", "admin:ad_position", "admin:ad", "admin:friend_link_text", "admin:friend_link_image"] as permission]
[@shiro.hasPermission name = permission]
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
				
					[#-- 文章管理 --]
					[#list ["admin:article_category", "admin:article"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">文章管理</li>
						[@shiro.hasPermission name="admin:article_category"]
							<li><a href="${baseUrl}/article_category" target="iframe">文章分类管理</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:article"]
							<li><a href="${baseUrl}/article" target="iframe">文章列表</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
				
					[#-- 广告管理 --]
					[#list ["admin:ad_position", "admin:ad"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">广告管理</li>
						[@shiro.hasPermission name="admin:ad_position"]
							<li><a href="${baseUrl}/ad_position" target="iframe">广告位管理</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:ad"]
							<li><a href="${baseUrl}/ad" target="iframe">广告列表</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
				
					[#-- 链接管理 --]
					[#list ["admin:friend_link_text", "admin:friend_link_image"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">链接管理</li>
						[@shiro.hasPermission name="admin:friend_link_text"]
							<li><a href="${baseUrl}/friend_link/text" target="iframe">${message("FriendLinkType.text")}</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:friend_link_image"]
							<li><a href="${baseUrl}/friend_link/image" target="iframe">${message("FriendLinkType.image")}</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
				</ul>
			</div>
		</div>
	</div>
	[#break /]
[/@shiro.hasPermission]
[/#list]