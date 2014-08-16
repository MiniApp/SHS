[@compress single_line = !systemDevelopment]
[#-- 状态: 资金管理 --]
[#assign state = "capital" /]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-账户中心</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- jQuery Colorbox 弹出层 --]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/colorbox.css?version=${setting.basic.siteVersion}"/>
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
        	<div class="title size-14">我要提现</div>
        	
            <div class="drawcash">
            
            	[#-- 选择银行卡 --]
                <div class="drawcash-bank">
                    <h3 class="drawcash-title">选择提现银行卡</h3>
                    <ul class="bankCards_list">
			        	[#list bankCards as bankCard]
			        		[#if defaultBankCard == null]
					            <li class="bankCards_list_li bankCards[#if bankCard_index == 0] active[/#if]" val="${bankCard.id}">
		                            <div><img src="[#if (bankCard.bank.logo)??]${base}${bankCard.bank.logo}?version=${setting.basic.siteVersion}[/#if]" /></div>
		                            <div class="card">${secrecy("backcard", bankCard.card)}</div>
		                        </li>
		                        [#if !bankCard_has_next]
		                        	[#assign defaultBankCard = bankCard /]
		                        [/#if]
			        		[#else]
					            <li class="bankCards_list_li bankCards[#if defaultBankCard.id == bankCard.id] active[/#if]" val="${bankCard.id}">
		                            <div><img src="[#if (bankCard.bank.logo)??]${base}${bankCard.bank.logo}?version=${setting.basic.siteVersion}[/#if]" /></div>
		                            <div class="card">${secrecy("backcard", bankCard.card)}</div>
		                        </li>
			        		[/#if]
			            [/#list]
                    </ul>
                </div>
                
                [#-- 填写提现金额 --]
                <div class="drawcash-money"> 
                	<h3 class="drawcash-title">填写提现金额</h3 >
                	<form id="withdrawalForm" action="${base}/account/withdrawal" method="post">
	                	<input id="bankCard" type="hidden" name="bankCard" value="${(defaultBankCard.id)!}" />
	                	[#--
	                	<input id="paymentPlugin" type="hidden" name="paymentPlugin" value="${defaultPaymentPlugin.id}" />
	                	--]
	                    <table>
	                        <tr>
	                            <td width="30%" align="right">可用资金</td>
	                            <td>${currentMember.available?string("currency")}</td>
	                        </tr>
	                        <tr>
	                            <td align="right" valign="top">
	                            	<span class="color-three">*</span>
	                                <span>提现金额</span>
	                            </td>
	                            <td style="padding-bottom: 0px;">
	                            	<input id="amount" type="text" name="amount" class="text-two" />&nbsp;元
	                            	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin-top: 5px;"></p>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right">提现费用</td>
	                            <td>
	                            	<span id="fee" class="withdrawal_fee">0.00</span>
	                                <span>&nbsp;元</span>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right">实际扣除金额</td>
	                            <td>
	                            	<span id="paymentAmout" class="amount_deducted">0.00</span>
	                                <span>&nbsp;元</span>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right">预计到账日期</td>
	                            <td>
	                            	<span>${defaultPaymentPlugin.handleTime}</span>&nbsp;&nbsp;
	                                <span></span>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right" valign="top">
	                            	<span class="color-three">*</span>
	                            	<span>支付密码</span>
	                            </td>
	                            <td>
	                            	<input type="password" class="text-two" name="password" />
	                            	<a href="${base}/account/security" target="_blank" class="color-one">忘记密码？</a>
	                            	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin-top: 5px;"></p>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right">&nbsp;</td>
	                            <td><input type="submit" value="提现" class="btn-one" /></td>
	                        </tr>
	                    </table>
					</form>
                </div>
                
                [#-- 注意事项 --]
                <div class="drawcash-hint"> 
                	<h3 class="drawcash-title">温馨提示</h3>
                    <p>请确保您输入的提现金额，以及银行帐号信息准确无误。</p>
                    <p>如果您填写的提现信息不正确可能会导致提现失败，由此产生的提现费用将不予返还。</p>
                    <p>在双休日和法定节假日期间，用户可以申请提现，${setting.basic.siteName}会在下一个工作日进行处理。由此造成的不便，请多多谅解！</p>
                    <p>平台禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
                </div>
                
            </div>
        
        </div>
        
    </div>
</div>
[#-- Footer 页脚 --]
[#include "/template/include/footer.ftl" /]
[#-- RSA加密 --]
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/jsbn.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/prng4.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rng.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rsa.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/base/base64.min.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
[#-- validate 验证器 --]
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js?version=${setting.basic.siteVersion}"></script>
[#-- jQuery Cookie --]
<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 公共 --]
<script type="text/javascript" src="${base}/resources/js/common.min.js?version=${setting.basic.siteVersion}"></script>
[#-- jQuery Colorbox 弹出层 --]
<script type="text/javascript" src="${base}/resources/js/jquery.colorbox.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript">var modulus = "${modulus}", exponent = "${exponent}";</script>
<script type="text/javascript" src="${base}/resources/member/js/withdrawal.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 瞬时消息 --]
[@flash_message; flashMessage]
[#if flashMessage??]
<script type="text/javascript">
$().ready(function() {
	$.colorbox({ html: "<div style='color: rgb(0, 125, 181); font-size: 20px; padding: 10px 30px; overflow: hidden; margin: 5px; text-align: center; height: 60px; width: 300px; line-height: 60px;'>${flashMessage}</div>" });
});
</script>
[/#if]
[/@flash_message]
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]