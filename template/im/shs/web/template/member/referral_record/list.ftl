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
                <p>推荐记录</p>
                <a href="#" class="pull-right">我的推荐</a> </div>
            <div class="content">
                <div class="recommend" style="margin-top:0px;">
                	[#--
                    <div class="recommend-search bg">
                        <div class="search">
                       		<input type="date" placeholder="起始日期" value="" class="search-date" />
                        	<input type="date" placeholder="截止日期" value="" class="search-date" />
                            <input type="text" placeholder="请输入用户名" value="" class="search-text" />
                            <input type="button" value="搜索" class="search-btn"  />
                        </div>
                    </div>
                    --]
                    <table>
                    	<tr>
                        	<th>ID</th>
                            <th>用户名</th>
                            <th>推荐金额</th>
                            <th>推荐费率</th>
                            <th>推荐费</th>
                            <th>计划结算时间</th>
                            <th>实际结算时间</th>
                            <th>状态</th>
                        </tr>
                        [#list page.cont as referralFee]
	                        <tr>
	                        	<td>${referralFee.id}</td>
	                        	<td>${referralFee.referral}</td>
	                            <td>${referralFee.referralAmt?string("currency")}</td>
	                        	<td>${referralFee.referralFeeRate}%</td>
	                        	<td>${referralFee.referralFee?string("currency")}</td>
	                        	<td>${referralFee.planPaymentDate?string("yyyy-MM-dd HH:mm:ss")}</td>
	                        	<td>${(referralFee.paymentDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</td>
	                        	<td>${message("ReferralFeeState." + referralFee.state)}</td>
	                        </tr>
		                [/#list]
		                [#if page.cont?size == 0]
	                        <tr>
		                    	<td colspan="8">没有记录！</td>
		                    </tr>
		                [/#if]
                    </table>
					[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?pageNumber={pageNumber}"]
						[#include "/include/pagination.ftl"]
					[/@pagination]
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