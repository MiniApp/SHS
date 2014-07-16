[#-- 页眉 --]
<header>
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="navbar-inner">
			<div class="container">
				[#-- 系统名称、版本号 --]
				<a class="brand pull-left" href="${baseUrl}">
					${systemName}
					<span class="version">${systemVersion}</span>
				</a>
				
				[#--
				<ul class="nav navbar-nav">
					
					<li class="divider-vertical hidden-sm"></li>
					<li>
						<a href="#">
							<span class="glyphicon glyphicon-folder-close"></span>
							借款管理
					 	</a>
					</li>
					
					<li class="divider-vertical hidden-sm"></li>
					<li>
						<a href="#">
							<span class="glyphicon glyphicon-usd"></span>
							资金管理
					 	</a>
					</li>
					
					<li class="divider-vertical hidden-sm"></li>
					<li>
						<a href="#">
							<span class="glyphicon glyphicon-user"></span>
							用户管理
					 	</a>
					</li>
					
					<li class="divider-vertical hidden-sm"></li>
					<li>
						<a href="#">
							<span class="glyphicon glyphicon-credit-card"></span>
							认证管理
					 	</a>
					</li>
					
					<li class="divider-vertical hidden-sm"></li>
					
				</ul>
				--]
				
				[#--
				<ul class="nav navbar-nav">
					
					<li class="divider-vertical hidden-sm hidden-xs"></li>
					<li class="dropdown">
						<a href="#" data-toggle="dropdown" class="dropdown-toggle">
							<span class="glyphicon glyphicon-folder-close"></span>
							借款管理
						 	<b class="caret"></b>
					 	</a>
						<ul class="dropdown-menu">
							<li><a href="${base}/admin/loan/list.action">借款管理</a></li>
							<li><a href="javascript:void(0)">初审借款</a></li>
							<li><a href="javascript:void(0)">满标借款</a></li>
							<li><a href="javascript:void(0)">流转标借款</a></li>
							<li><a href="${base}/admin/propertycreditorright">原始债权</a></li>
							<li><a href="${base}/admin/creditorright">债权转让</a></li>
							<li><a href="javascript:void(0)">逾期借款</a></li>
							<li><a href="javascript:void(0)">借款金额</a></li>
							<li><a href="javascript:void(0)">还款信息</a></li>
							<li><a href="javascript:void(0)">收款信息</a></li>
							<li><a href="javascript:void(0)">投资信息</a></li>
							<li><a href="javascript:void(0)">借款费用</a></li>
							<li><a href="javascript:void(0)">标种类型</a></li>
							<li><a href="javascript:void(0)">还款方式 </a></li>
						</ul>
					</li>
					
					<li class="divider-vertical hidden-sm hidden-xs"></li>
					<li class="dropdown">
						<a href="#" data-toggle="dropdown" class="dropdown-toggle">
							<span class="glyphicon glyphicon-usd"></span>
							资金管理
						 	<b class="caret"></b>
					 	</a>
						<ul class="dropdown-menu">
							<li><a href="javascript:void(0)">资金帐号管理</a></li>
							<li><a href="javascript:void(0)">资金记录</a></li>
							<li><a href="${base}/admin/rechargeconf?type=recharge">充值配置</a></li>
							<li><a href="${base}/admin/rechargeconf?type=drawcash">提现配置</a></li>
							<li><a href="${base}/admin/cards">银行卡管理</a></li>
							<li><a href="${base}/admin/bank">银行管理</a></li>
							<li><a href="javascript:void(0)">充值管理</a></li>
							<li><a href="${base}/admin/drawcash">提现管理</a></li>
							<li><a href="javascript:void(0)">添加充值 </a></li>
							<li><a href="javascript:void(0)">扣除费用</a></li>
							<li><a href="javascript:void(0)">网站费用</a></li>
							<li><a href="javascript:void(0)">用户费用</a></li>
							<li><a href="javascript:void(0)">支付方式</a></li>
							<li><a href="javascript:void(0)">资金费用</a></li>
						</ul>
					</li>
					
					<li class="divider-vertical hidden-sm hidden-xs"></li>
					<li class="dropdown">
						<a href="#" data-toggle="dropdown" class="dropdown-toggle">
							<span class="glyphicon glyphicon-user"></span>
							用户管理
						 	<b class="caret"></b>
					 	</a>
						<ul class="dropdown-menu">
							<li><a href="javascript:void(0)">用户列表</a></li>
							<li><a href="javascript:void(0)">添加用户</a></li>
							<li><a href="javascript:void(0)">用户信息</a></li>
							<li><a href="javascript:void(0)">用户类型</a></li>
							<li><a href="javascript:void(0)">VIP管理</a></li>
						</ul>
					</li>
					
					<li class="divider-vertical hidden-sm hidden-xs"></li>
					<li class="dropdown">
						<a href="#" data-toggle="dropdown" class="dropdown-toggle">
							<span class="glyphicon glyphicon-credit-card"></span>
							认证管理
						 	<b class="caret"></b>
					 	</a>
						<ul class="dropdown-menu">
							<li><a href="javascript:void(0)">实名认证</a></li>
							<li><a href="javascript:void(0)">学历认证</a></li>
							<li><a href="javascript:void(0)">手机认证</a></li>
							<li><a href="javascript:void(0)">视频认证</a></li>
							<li><a href="javascript:void(0)">总体认证 </a></li>
						</ul>
					</li>
					
					<li class="divider-vertical hidden-sm hidden-xs"></li>
					
				</ul>
				--]
				
				<ul class="nav navbar-nav pull-right">
					<li class="divider-vertical hidden-sm hidden-xs"></li>
					<li class="dropdown">
						[#-- 登录管理员 --]
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img src="${base}/resources/admin/img/user_avatar.gif" alt="[@shiro.principal /]" class="user_avatar">
							[@shiro.principal /]
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li><a href="${base}/admin/profile/setting" target="iframe">帐号设置</a></li>
							<li class="divider"></li>
							<li><a href="${base}/admin/logout">注销</a></li>
						</ul>
					</li>
					<li class="divider-vertical hidden-sm hidden-xs"></li>
				</ul>
			</div>
		</div>
	</nav>
	
</header>