<div class="panel panel-default">
	<div class="panel-heading">
		<a href="#collapse_syst" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
			<i class="glyphicon glyphicon-wrench"></i>
			系统管理
		</a>
	</div>
	<div class="accordion-body collapse" id="collapse_syst">
		<div class="panel-body">
			<ul class="nav nav-pills nav-stacked">
				<li class="nav-header">系统设置</li>
				<li><a href="${baseUrl}/basic_setting" target="iframe">基本设置</a></li>
				<li><a href="${baseUrl}/security_setting" target="iframe">安全设置</a></li>
				<li><a href="${baseUrl}/display_setting" target="iframe">显示设置</a></li>
				<li><a href="${baseUrl}/comm_setting" target="iframe">通信设置</a></li>
				[#--
				<li><a href="${baseUrl}/referral_setting" target="iframe">推荐设置</a></li>
				--]
				<li class="nav-header">插件管理</li>
				<li><a href="${baseUrl}/payment_plugin" target="iframe">支付插件</a></li>
				<li><a href="${baseUrl}/storage_plugin" target="iframe">存储插件</a></li>
				<li class="nav-header">权限管理</li>
				<li><a href="${baseUrl}/admin" target="iframe">管理员管理</a></li>
				<li><a href="${baseUrl}/role" target="iframe">角色管理</a></li>
				<li class="nav-header">内容管理</li>
				<li><a href="${baseUrl}/area" target="iframe">地区管理</a></li>
				<li><a href="${baseUrl}/bank" target="iframe">银行管理</a></li>
				<li><a href="${baseUrl}/dict" target="iframe">词典管理</a></li>
				<li class="nav-header">模板管理</li>
				<li><a href="${baseUrl}/template/page" target="iframe">${message("TemplateType.page")}模板</a></li>
				<li><a href="${baseUrl}/template/mail" target="iframe">${message("TemplateType.mail")}模板</a></li>
				<li><a href="${baseUrl}/template/texting" target="iframe">${message("TemplateType.texting")}模板</a></li>
				<li><a href="${baseUrl}/template/print" target="iframe">${message("TemplateType.print")}模板</a></li>
				<li><a href="${baseUrl}/template/js" target="iframe">${message("TemplateType.js")}模板</a></li>
				<li><a href="${baseUrl}/template/css" target="iframe">${message("TemplateType.css")}模板</a></li>
				<li class="nav-header">缓存管理</li>
				<li><a href="${baseUrl}/cache" target="iframe">缓存管理</a></li>
				<li class="nav-header">日志管理</li>
				<li><a href="${baseUrl}/log" target="iframe">日志管理</a></li>
				<li class="nav-header">令牌管理</li>
				<li><a href="${baseUrl}/token" target="iframe">令牌管理</a></li>
				[#--
				<li class="nav-header">备份管理</li>
				<li><a href="${baseUrl}/database" target="iframe">数据库备份</a></li>
				--]
			</ul>
		</div>
	</div>
</div>