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
        	<div class="title size-14">我要充值</div>
            <div class="charge">
            	[#--
                <div class="charge-bank"> 
                	<h3 class="charge-title">选择充值方式</h3>
                    <ul>
                        <li>
                            <label>
                                <input type="radio" name="chongzhi" class="bank_checkbox"  checked="checked"/>
                                <img src="${base}/resources/images/Bank_5.gif?version=${setting.basic.siteVersion}" />
                            </label>
                        </li>
                    </ul>
                </div>
                --]
                
                [#-- 充值金额 --]
                <div class="charge-money"> 
                    <h3 class="charge-title">填写充值金额</h3>
                    <form id="rechargeForm" action="${base}/account/recharge" method="post" target="_blank">
                    	<input id="paymentPlugin" type="hidden" name="paymentPlugin" value="${defaultPaymentPlugin.id}" />
	                    <table>
	                        <tr>
	                            <td width="30%" align="right">账户余额</td>
	                            <td width="70%">
	                            	<span>${currentMember.available?string("currency")}</span>
	                                <span></span>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right" valign="top">
	                            	<span class="color-three">*</span>
	                                <span>充值金额</span>
	                            </td>
	                            <td style="padding-bottom: 0px;">
	                            	<input id="amount" type="text" name="amount" class="text-two" />&nbsp;元
	                            	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin-top: 5px;"></p>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right">充值费用</td>
	                            <td>
	                            	<span id="fee" class="prepaid_expenses">0.00</span>
	                                <span>&nbsp;元</span>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right">
	                            	<span class="color-three">*</span> 
	                                <span>实际支付金额</span>
	                            </td>
	                            <td>
	                            	<span id="paymentAmout" class="real_amount">0.00</span>
	                                <span>&nbsp;元</span>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td align="right">&nbsp;</td>
	                            <td><input type="submit" value="充值" class="btn-one"/></td>
	                        </tr>
	                    </table>
					</form>
                </div>
                
                [#-- 注意事项 --]
                <div class="charge-hint"> 
                	<h3 class="charge-title">温馨提示</h3>
                    <p>为了您的账户安全，请在充值前进行身份认证、手机绑定以及提现密码设置。</p>
                    <p>请注意您的银行卡充值限制，以免造成不便。</p>
                    <p>禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
                    <p>如果充值金额没有及时到账，请联系客服，${setting.basic.phone}。</p>
                </div>
                
            </div>
            
        </div>
        
    </div>
    
    [#-- 充值提示 --]
    <div style="display:none;">
        <div id="rechargePrompt" class="recharge" style="overflow: hidden; margin: 20px 30px;">
            <div class="title">请您在新打开的网上银行页面上完成付款</div>
            <div class="table">
                <p>付款完成前请不要关闭此窗口。</p>
                <p>完成付款后请根据您的情况点击下面的按钮：</p>
                <br /><br />
                <div class="pull-left margin" style="margin: 0 20px 0 45px;"><input type="button" value="已完成付款" class="btn-six" onclick="location.href='${base}/account/capital'" target="_blank" /></div>
                <div class="pull-left"><input type="button" value="付款遇到问题" class="btn-seven" onclick="location.href='${base}/help'" target="_blank" /></div>
            </div>
        </div>
    </div>
    
</div>
[#-- Footer 页脚 --]
[#include "/template/include/footer.ftl" /]
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
<script type="text/javascript">var available = ${currentMember.available};</script>
<script type="text/javascript" src="${base}/resources/member/js/recharge.min.js?version=${setting.basic.siteVersion}"></script>
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