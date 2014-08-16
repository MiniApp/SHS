[@compress single_line = !systemDevelopment]
[#-- 状态: 投资管理 --]
[#assign state = "investment" /]
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
        	<div class="title size-14">我的投资统计</div>
            <div class="invest">
            	<div class="invest-title">
                	<ul>
                    	<li><a href="${base}/account/statistics/investment">投资统计</a></li>
                        <li><a href="${base}/account/statistics/recovering">待收统计</a></li>
                        <li><a href="javascript:void(0);" class="active">已收统计</a></li>
                    </ul>
                </div>
                <div class="table">
                	<div class="statistics">
                        <div class="div-sty" style="margin:0px">
                        	<div class="pull-left div-container">
                            	<div id="container" style="min-width:450px; height:300px; margin: 0 auto;"></div>
                            </div>
                            <div class="pull-left txt-container">
                            	<ul>
                                	<li>
                                    	<p>信用认证标<span>${creditRecoveredAmts?string("currency")}</span></p>
                                    </li>
                                    <li>
                                    	<p>机构担保标<span>${guaranteeRecoveredAmts?string("currency")}</span></p>
                                    </li>
                                    <li>
                                    	<p>抵押质押标<span>${mortgageRecoveredAmts?string("currency")}</span></p>
                                    </li>
                                    <li id="border-no">
                                    	<label>总计：${recoveredAmts?string("currency")}</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
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
[#-- highcharts 报表 --]
<script type="text/javascript" src="${base}/resources/js/highcharts.js?version=${setting.basic.siteVersion}"></script>
[#-- statistics.project_type_amout 统计项目类型金额 --]
<script type="text/javascript">var creditAmts = ${creditRecoveredAmts}, guaranteeAmts = ${guaranteeRecoveredAmts}, mortgageAmts = ${mortgageRecoveredAmts};</script>
<script type="text/javascript" src="${base}/resources/member/js/statistics.project_type_amout.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]