[@compress single_line = !systemDevelopment]
[#if notifyMessage??]
	${notifyMessage}
[#else]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-支付</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/idangerous.swiper.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="homepage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
	<div class="rows">
    	<div class="Recharge-success-content">
			[#if payment.state == "success"]
				<div class="div-a">
					<span><img src="${base}/resources/images/Recharge-success.png?version=${setting.basic.siteVersion}" /></span>
					<label>成功充值<strong>${payment.effectiveAmount?string("currency")}</strong>，资金已到达您的账户。</label>
				</div>
			[#else]
				<div class="div-a">
					<span><img src="${base}/resources/images/Recharge-success-no.png?version=${setting.basic.siteVersion}" /></span>
					<label>充值失败！请及时联系我们&nbsp;${setting.basic.phone}</label>
				</div>
			[/#if]
			<div class="div-c">
				<p>
					<a href="${base}/account/capital">查看账户余额</a>
					|
					<a href="${base}/account/recharge">继续充值</a>
				</p>
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
[/#if]
[/@compress]