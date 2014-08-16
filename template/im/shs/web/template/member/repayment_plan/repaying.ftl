[@compress single_line = !systemDevelopment]
[#-- 状态: 借款管理 --]
[#assign state = "borrowing" /]
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
				<p>我的借款</p>
			</div>
			[#--
			<div class="MyBorFund_Head">
				<ul class="MyBorFund_HeadUl">
					<li>借款总金额</li>
					<li class="MyBorFund_HeadUla">0.00元</li>
				</ul>
				<ul class="MyBorFund_HeadUl">
					<li>已还总金额</li>
					<li>0.00元</li>
				</ul>
				<ul class="MyBorFund_HeadUl">
					<li>待还总金额</li>
					<li>0.00元</li>
				</ul>
				<ul class="MyBorFund_HeadUl">
					<li>逾期总金额</li>
					<li>0.00元</li>
				</ul>
				<table class="MyBorFund_HeadTbl">
					<tr>
						<td>您最近10天内有0笔</td>
						<td>借款须归还 , 总金额</td>
						<td>0.00</td>
						<td>元</td>
					</tr>
				</table>
			</div>
			--]
			<div class="MyBorFund_HeadK"> 
				<a href="javascript:void(0);">
				<div class="MyBorFund_HeadKa">还款中借款</div>
				</a> 
				<a href="${base}/account/repayment_plan?state=repaid">
				<div class="MyBorFund_HeadKb">已还清借款</div>
				</a> 
		    </div>
			<div class="BorrowFundsDetaila">
				<div class="MyBorFund_btmWk">
					<table class="MyBorFund_btm">
						<tr class="MyBorFund_btma">
							<td>编号</td>
							<td>类型</td>
							<td>额度</td>
							<td>期限</td>
							<td>利率</td>
							<td>偿还本息</td>
							<td>已还本息</td>
							<td>未还本息</td>
							<td>下个还款日</td>
							<td>操作</td>
						</tr>
						[#list page.cont as repaymentPlan]
							[#assign borrowing = repaymentPlan.borrowing /]
							[#assign capitalInterest = repaymentPlan.capitalInterest /]
							[#assign paidCapitalInterest = repaymentPlan.paidCapitalInterest /]
		                    <tr class="MyBorFund_btmb">
		                    	<td>${borrowing.id}</td>
		                		<td>${message("BorrowingType." + borrowing.type)}</td>
		                        <td>${repaymentPlan.capital?string("currency")}</td>
		                        <td>${borrowing.period}个月</td>
								<td>${borrowing.interestRate}%/年</td>
		                        <td>${capitalInterest?string("currency")}</td>
		                        <td>${paidCapitalInterest?string("currency")}</td>
		                        <td>${(capitalInterest - paidCapitalInterest)?string("currency")}</td>
		                        <td>${(repaymentPlan.nextDate?string("yyyy-MM-dd"))!}</td>
								<td><a href="${base}/account/repayment_plan/${repaymentPlan.id}">马上还款</a></td>
		                    </tr>
		                [/#list]
		                [#if page.cont?size == 0]
		                    <tr class="BorAplin_Frb_b">
		                    	<td colspan="9">没有记录！</td>
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
	</div>
    
    [#-- Footer 页脚 --]
    [#include "/template/include/footer.ftl" /]
	
  </div>
</div>
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
<script type="text/javascript" src="${base}/resources/js/slider.js?version=${setting.basic.siteVersion}"></script> 
<script type="text/javascript" src="${base}/resources/js/BorrowFunds.js?version=${setting.basic.siteVersion}"></script> 
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /]
[@flash_message; flashMessage]
	[#if flashMessage??]
    	<script type="text/javascript">
    		alert("${flashMessage}");
		</script>
	[/#if]
[/@flash_message]
</body>
</html>
[/@compress]