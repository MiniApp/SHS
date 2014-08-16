<div class="footer size-14"> 
	
    [#-- 页脚底部 --]
    <div class="navbar-fixed-bottom">
    	<div class="container">
    	
        	[#-- 友情链接 --]
            <div class="bom-bank">
            	<ul>
                	<li>友情链接：</li>
			      	[@friend_link_list count = 10]
						[#list friendLinks as friendLink]
				    		<li><a href="${friendLink.url}" target="_blank" title="${friendLink.name}"><img src="${base}${friendLink.logo}?version=${setting.basic.siteVersion}" /></a></li>
						[/#list]
					[/@friend_link_list]
                </ul>
            </div>
            
            <div class="div-left pull-left">
            
            	[#-- 底部导航 --]
              	<div class="ul-one">
	              	<ul>
	                    <li><a href="${base}/about">关于裕信创投</a></li>
	                    <li><span>|</span></li>
	                    <li><a href="${base}/security">安全保障</a></li>
	                    <li><span>|</span></li>
	                    <li><a href="${base}/help">帮助中心</a></li>
	                    <li><span>|</span></li>
	                    <li><a href="${base}/charges">资费说明</a></li>
	                    <li><span>|</span></li>
	                    <li><a href="${base}/about" id="border-no">联系我们</a></li>
	                </ul>
              	</div>
              
              	[#-- 底部介绍 --]
              	<div class="txt-one">
	              	<p>地址：${setting.basic.address}</p>
	              	[#--
	                <p>Copyright Reserved 版权所有&copy;2014-${.now?string("yyyy")} ${setting.basic.siteName}[yuxinct.com]</p>
	                --]
	                <p>
	                	&copy;
	                	${.now?string("yyyy")} ${setting.basic.siteName}
	                	All rights reserved.
	                	|
	                	${setting.basic.certtext}
	                	|
	                	技术支持：<a href="http://www.icl-network.com" target="_blank" style="color: #fff;">成都新创易网络科技有限公司</a>
	                </p>
              	</div> 
              
            </div>
            
            [#-- 客服热线 --]
            <div class="div-right">
            	<img src="${base}/resources/images/bottom-phone.png?version=${setting.basic.siteVersion}" />
                <div class="div-a">
                	<ul>
                    	<li><span>24小时热线：</span></li>
                        <li><label>${setting.basic.phone}</label></li>
                        [#--
                        <li><p>9:00&nbsp;-&nbsp;17:30</p></li>
                        --]
                    </ul>
                </div>
            </div>
            
            [#--
            [#-- 页脚图标 --\]
            <div class="content-img">
                <a href="#" title="可信网站"><img src="${base}/resources/images/footer_icon_two.gif?version=${setting.basic.siteVersion}" /></a>
                <a href="#" title="监管"><img src="${base}/resources/images/footer_icon_one.gif?version=${setting.basic.siteVersion}" /></a>
            </div>
            --]
            
        </div>
    </div>
    
</div>