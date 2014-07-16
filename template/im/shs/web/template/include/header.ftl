<div class="header">
	
    [#-- 页眉顶部 --]
    <div class="navbar-fixed-top">
    	<div class="container size-14">
        	
        	[#-- 理财热线 --]
            <div class="navbar-contact pull-left">
            	<span>您好，欢迎来到${setting.basic.siteName}！</span>
            </div>
            
            [#-- 顶部导航 --]
            <div class="navbar-nav pull-right">
                <ul class="nav">
                    <li id="headerUsername" style="display: none;"><a id="headerUsernameText" href="${base}/account"></a>|</li>
                    <li id="headerLogout" style="display: none;"><a href="${base}/logout">退出</a>|</li>
                    <li id="headerLogin"><a href="${base}/login">登录</a>|</li>
                    <li id="headerRegister"><a href="${base}/regist">注册</a>|</li>
                    <li><a href="${setting.basic.siteUrl}/account">账户中心</a>|</li>
                    <li><a href="${base}/help">帮助中心</a></li>
                </ul>
            </div>
            
        </div>
    </div>
    
    [#-- 页眉底部 --]
    <div class="navbar-fixed-bottom">
    	<div class="container">
        	<div class="rows">
                
                [#-- 页眉LOGO --]
                <a href="${base}/" title="${setting.basic.siteName}">
                    <img src="${base}${setting.basic.siteLogo}?version=${setting.basic.siteVersion}" class="navbar-logo pull-left" height="47" width="185" />
                </a>
                
                [#-- 联系电话 --]
                <div class="pull-right size-16 navbar-nav">
                  <ul>
                  	<li><a href="${base}/"[#if nav == "homepage"] class="active"[/#if]>首页</a></li>
                    <li class="li-img"></li>
                    <li><a href="${base}/investment"[#if nav == "investment"] class="active"[/#if]>我要投资</a></li>
                    <li class="li-img"></li>
                    <li><a href="${base}/borrowing"[#if nav == "borrowing"] class="active"[/#if]>我要借款</a></li>
                    <li class="li-img"></li>
                    <li><a href="${base}/news"[#if nav == "news"] class="active"[/#if]>新闻动态</a></li>
                    <li class="li-img"></li>
                    <li><a href="${base}/about"[#if nav == "about"] class="active"[/#if]>关于${setting.basic.siteName}</a></li>
					<li class="li-img"></li>
                    <li><a href="${base}/security"[#if nav == "security"] class="active"[/#if]>安全保障</a></li>
                  </ul>
                </div>
                
            </div>
         </div>
    </div>
    
</div>