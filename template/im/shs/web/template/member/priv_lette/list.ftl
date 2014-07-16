[@compress single_line = !systemDevelopment]
[#-- 状态: 消息管理 --]
[#assign state = "comm" /]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-账户中心</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="userpage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
    <div class="rows">
      	
      	[#-- 边导航 --]
      	[#include "/template/member/include/sidebar.ftl" /]
      	
      	[#-- 内容--]
      	<div class="right-content pull-right">
        	<div class="title size-14">我的私信</div>

			[#-- 私信会话列表 --]            
            <div class="invest">
                <div class="invest-title">
                	<ul>
                        <li><a href="javascript:void(0);" class="active">私信列表</a></li>
                        <li><a href="${base}/account/priv_lette/send">发送私信</a></li>
                    </ul>
                </div>
                [#if page.cont?size gt 0]
	                <div id="table-two">
	                    <ul>
							[#list page.cont as dialog]
		                        <li class="site_notice_list">
		                            <div class="pull-left"><img src="${base}/resources/images/email_open.gif?version=${setting.basic.siteVersion}" /></div>
		                            <div class="site_notice_content pull-left">
		                                <h3><a href="${base}/account/priv_lette/${dialog.id}/detail" class="color-one">[#if dialog.verifySender(currentMember.id)]发至：${dialog.receiver}[#elseif dialog.verifyReceiver(currentMember.id)]来自：${dialog.sender}[/#if]</a></h3>
		                                <p>${dialog.cont}</p>
		                                <p>${dialog.date}</p>
		                            </div>
			                  		[#if dialog.verifyReceiver(currentMember.id)]
			                  			<div class="news_time pull-right">未读&nbsp;<a href="${base}/account/priv_lette/${dialog.id}/detail">${dialog.unreads}</a>&nbsp;条 | <a href="${base}/account/priv_lette/${dialog.id}/detail">回复</a></div>
			                  		[#else]
			                  			<div class="news_time pull-right">对方未读&nbsp;<a href="${base}/account/priv_lette/${dialog.id}/detail">${dialog.unreads}</a>&nbsp;条 | <a href="${base}/account/priv_lette/${dialog.id}/detail">查看</a></div>
			                  		[/#if]
		                        </li>
	                		[/#list]
	                    </ul>
	                    
	                    [#-- 分页 --]
	                	[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?pageNumber={pageNumber}"]
							[#include "/include/pagination.ftl"]
						[/@pagination]
	                    
	                </div>
                [#else]
	                <div id="table-two" class="display-yes no-letter">
	                	没有记录！
	                </div>
                [/#if]
            </div>
            
        </div>
        
    </div>
</div>
[#-- Footer 页脚 --]
[#include "/template/include/footer.ftl" /]
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
[#-- jQuery Cookie --]
<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 公共 --]
<script type="text/javascript" src="${base}/resources/js/common.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]