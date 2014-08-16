[@compress single_line = !systemDevelopment]
[#-- 状态: 推荐管理 --]
[#assign state = "referral" /]
<!doctype html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="not-ie" lang="en">
<!--<![endif]-->
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-会员中心</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/AccountCenter.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>

<body>

<!--外框-->
<div class="ACtHoPage_L0Le">
  <div class="ACtHoPage_L0Les">
  
    [#-- 页眉 --]
    [#include "/template/include/header.ftl" /]
    
    <!--中-->
    <div class="ACtHoPage_MOLe">
      <div class="ACtHoPage_MOLes"> 
      
      	[#-- 边导航 --]
      	[#include "/template/member/include/sidebar.ftl" /]
    
	    <!--中 > 右边-->
        <div class="ACtHoPage_MedCtsRight">
            <div class="ACtHoPage_MedCtsRhead">
                <p>我的推荐</p>
                [#--
                <a href="#" class="pull-right">推荐记录</a>
                --]
            </div>
            <div class="content">
            	<div class="reward">
                	<h3>推荐奖励说明</h3>
                    <ul>
                    	<li>1、邀请好友或其他朋友注册成功，即可建立推荐荐关系；</li>
						<li>2、好友或其他朋友投资成功，系统将自动根据投资推荐抽成比例给予奖励；</li>
						[#--
						<li>3、好友或其他朋友借款成功，还款时系统自动根据借款推荐抽成比例给予奖励。</li>
						--]
                    </ul>
                </div>
                <div class="recommend">
                	<ul style="clear: both; overflow: hidden;">
                    	<li>邀请人数：<span>${page.total}</span> 人，</li>
                        <li>提成总额：<span>0.00</span> 元，</li>
                        <li>投资提成：<span>0.00</span> 元。</li>
                        [#--
                        <li>借款还款提成：<span>0.00</span> 元。</li>
                        --]
                    </ul>
                    <div class="recommend-search" style="clear: both;">
                    	<h3 class="pull-left">我的推荐</h3>
                        <div class="pull-right search">
                        	<form action="${base}/account/referral" method="post">
		                        <input type="text" placeholder="请输入用户名" name="username" value="${page.searchValue}" class="search-text" />
		                        <input type="submit" value="搜索" class="search-btn" />
	                        <form>
                        </div>
                    </div>
                    <table>
                    	<tr>
                        	<th>序号</th>
                            <th>用户名</th>
                            <th>借款总额</th>
                            <th>投资总额</th>
                            <th>充值总额</th>
                            <th>提现总额</th>
                            [#--
                            <th>还款总额</th>
                            --]
                        </tr>
                        [#list page.cont as member]
	                        <tr>
	                        	<td>${member.id}</td>
	                            <td>${member.username}</td>
	                            <td>${member.borrowingAmts?string("currency")}</td>
	                            <td>${member.investmentAmts?string("currency")}</td>
	                            <td>${member.rechargeAmts?string("currency")}</td>
	                            <td>${member.withdrawalAmts?string("currency")}</td>
	                            [#--
	                            <td>还款总额</td>
	                            --]
	                        </tr>
		                [/#list]
		                [#if page.cont?size == 0]
	                        <tr>
		                    	<td colspan="6">没有记录！</td>
		                    </tr>
		                [/#if]
                    </table>
					[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?pageNumber={pageNumber}"]
						[#include "/include/pagination.ftl"]
					[/@pagination]
                </div>
            	<div class="recommend-process">
                	<h3>如何建立推荐：</h3>
                    <p>1、发送下面的邀请链接给好友或其他朋友（建议不要发送给不熟悉的人士），通过此链接，注册成功即可成为你的推荐客户</p>
                    <div>邀请链接：${setting.basic.siteUrl}${referrerUrl}</div>
                    <p>2、好友注册时在“填写推荐人”时，填写您的用户名，注册成功即可成为您的推荐。如下图：</p>
                    <div><img src="${base}/resources/images/tj-img.gif" /></div>
                    [#--
                    <p>3、如好友忘记与您建立推广，则可让好友注册成功后，联系客服人员给予建立推荐关系。</p>
                    --]
                </div>
            </div>
        </div>
	</div>
    
    [#-- Footer 页脚 --]
    [#include "/template/include/footer.ftl" /]
	
  </div>
</div>
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
<script type="text/javascript" src="${base}/resources/js/slider.js?version=${setting.basic.siteVersion}"></script> 
<script type="text/javascript" src="${base}/resources/js/BorrowFunds.js?version=${setting.basic.siteVersion}"></script>
[@flash_message; flashMessage]
	[#if flashMessage??]
	<script type="text/javascript">
		alert("${flashMessage}");
	</script>
	[/#if]
[/@flash_message]
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /]
</body>
</html>
[/@compress]