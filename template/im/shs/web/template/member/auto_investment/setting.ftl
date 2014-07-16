[@compress single_line = !systemDevelopment]
[#-- 状态: 投资管理 --]
[#assign state = "investment" /]
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
		<div class="ThCgIsWt_RightK">
			<div class="ACtHoPage_MedCtsRhead">
				<p>自动投标</p>
			</div>
			[#--
			<div class="ThCgIsWt_HeadDiva" style="height:50px;">
				<p class="ThCgIsWt_HeadPa" style=" line-height:40px; font-size:18px;">自动投标状态： ${(autoInvestment.enabled?string("开启", "关闭"))!"关闭"}状态</p>
			</div>
			--]
			<div class="ThCgIsWt_cenDiva" style="width:710px;">
				[#--
				<p class="ThCgIsWt_HeadPa" style="text-indent:0px; line-height:40px; font-size:18px; margin-bottom:20px;">开启自动投标</p>
				--]
				<form id="inputForm" action="${base}/account/auto_investment" method="post">
					<table class="ThCgIsWt_CenTaba" style="width:100%">
						<tr>
							<td>账户可用余额：</td>
							<td>${currentMember.available?string("currency")}</td>
	                        <td>[#--（大于等于1000元才可开启自动投标工具）--]</td>
						</tr>
						<tr>
							<td>每次投标金额：</td>
							<td><input type="text" class="ThCgIsWt_Centdd recharge_amount" name="amount" value="${(autoInvestment.amount)!"50"}" /><label>元</label></td>
							[#--
	                        <td>（该数值须不小于200元，且为50的倍数）</td>
	                        --]
	                        <td>（该数值须为50的倍数）</td>
						</tr>
						<tr>
							<td>利息范围：</td>
							<td>
								<select class="ThCgIsWt_Centdd" name="interestRateMinimum">
									[#list 10 .. 24 as i]
										[#if autoInvestment != null]
											<option value="${i}"[#if autoInvestment.interestRateMinimum?string("number") == i] selected="selected"[/#if]>${i}%</option>
										[#else]
											<option value="${i}"[#if i_index == 0] selected="selected"[/#if]>${i}%</option>
										[/#if]
									[/#list]
								</select>
								-
								<select class="ThCgIsWt_Centdd" name="interestRateMaximum">
									[#list 10 .. 24 as i]
										[#if autoInvestment != null]
											<option value="${i}"[#if autoInvestment.interestRateMaximum?string("number") == i] selected="selected"[/#if]>${i}%</option>
										[#else]
											<option value="${i}"[#if !has_next] selected="selected"[/#if]>${i}%</option>
										[/#if]
									[/#list]
								</select>
							</td>
	                        <td>[#--（10%-24%为有效利率范围）--]</td>
						</tr>
						<tr>
							<td>借款期限：</td>
							<td>
								<select class="ThCgIsWt_Centdd" name="periodMinimum">
									[#list 3 .. 12 as i]
										[#if autoInvestment != null]
											<option value="${i}"[#if autoInvestment.periodMinimum?string("number") == i] selected="selected"[/#if]>${i}个月</option>
										[#else]
											<option value="${i}"[#if i_index == 0] selected="selected"[/#if]>${i}个月</option>
										[/#if]
									[/#list]
								</select>
								-
								<select class="ThCgIsWt_Centdd" name="periodMaximum">
									[#list 3 .. 12 as i]
										[#if autoInvestment != null]
											<option value="${i}"[#if autoInvestment.periodMaximum?string("number") == i] selected="selected"[/#if]>${i}个月</option>
										[#else]
											<option value="${i}"[#if !has_next] selected="selected"[/#if]>${i}个月</option>
										[/#if]
									[/#list]
								</select>
							</td>
	                        <td></td>
						</tr>
						<tr>
							<td>账户保留金额：</td>
							<td><input type="text" class="ThCgIsWt_Centdd recharge_amount" name="reserve" value="${(autoInvestment.reserve)!"0"}" /><label>元</label></td>
	                        <td>（您可填写一个金额，这部分钱不会加入自动投标）</td>
						</tr>
						[#if autoInvestment == null]
							<tr>
								<td>&nbsp;</td>
								<td>
		                        	<input type="submit" value="开启投标" class="ThCgIsWt_Centde"/>
		                        </td>
							</tr>
						[#else]
							<tr>
								<td>状态：</td>
								<td>
									<select class="ThCgIsWt_Centdd" name="enabled">
										<option value="true">开启</option>
										<option value="false"[#if autoInvestment.enabled == false] selected="selected"[/#if]>关闭</option>
									</select>
								</td>
		                        <td></td>
							</tr>
							<tr>
								<td>&nbsp;</td>
								<td>
		                        	<input type="submit" value="修改" class="ThCgIsWt_Centde"/>
		                        </td>
							</tr>
						[/#if]
					</table>
				</form>
			</div>
			<div class="ThCgIsWt_cenDivb">
				<p class="ThCgIsWt_HeadPa" style="line-height:40px; font-size:18px; margin-bottom:20px;">自动投标工具说明</p>
				<ul class="ThCgIsWt_cenUla">
					<li>1. 借款用户在获得借款时会自动关闭自动投标，以避免借款被用作自动投标资金。</li>
                    <li>2. 投标排序规则如下：</li>
                    <li>a）投标序列按照开启自动投标的时间先后进行排序。</li>
                    <li>b）每个用户每个标仅自动投标一次，投标后，排到队尾。</li>
                    <li>c）轮到用户投标时没有符合用户条件的标，也视为投标一次，重新排队。</li>
				</ul>
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