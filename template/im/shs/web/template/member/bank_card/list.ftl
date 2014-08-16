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
        	<div class="title size-14">我的银行卡</div>
        	
            [#if page.cont?size gt 0]
				[#-- 添加银行卡 --]
	            <div class="drawcash">
	                <div class="drawcash-bank">
	                	<div class="drawcash-title">
	                        <span class="pull-left">已添加银行</span>
	                        <div class="pull-right"><a href="${base}/account/bank_card/new" class="btn-four">添加银行卡</a></div>
	                    </div>
        				[#-- 银行卡列表 --]
	                    <ul class="bankCards_list">
							[#list page.cont as bankCard]
		                        <li class="bankCards_list_li">
		                            <div><img src="[#if (bankCard.bank.logo)??]${base}${bankCard.bank.logo}?version=${setting.basic.siteVersion}[/#if]" /></div>
		                            <div class="card">
		                            	<span class="pull-left margin-left">${secrecy("backcard", bankCard.card)}</span>
		                                <span class="pull-right margin-right"><a href="${base}/account/bank_card/${bankCard.id}/delete">删除</a></span>
		                                <span class="pull-right margin-right"><a href="${base}/account/bank_card/${bankCard.id}/modify">修改</a></span>
		                            </div>
		                        </li>
		              		[/#list]
	                    </ul>
	                </div>
	            </div>
	            
                [#-- 分页 --]
            	[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?pageNumber={pageNumber}"]
					[#include "/include/pagination.ftl"]
				[/@pagination]
				
			[#else]
				[#-- 添加银行卡 --]
	            <div class="drawcash">
	                <div class="drawcash-bank">
	                	<div class="drawcash-title">
	                        <div class="pull-right"><a href="${base}/account/bank_card/new" class="btn-four">添加银行卡</a></div>
	                    </div>
	                </div>
	            </div>
	            [#-- 无银行卡提示 --]
	            <div class="no-bank">没有记录！</div>
            [/#if]
            
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
[#-- jQuery Colorbox 弹出层 --]
<script type="text/javascript" src="${base}/resources/js/jquery.colorbox.js?version=${setting.basic.siteVersion}"></script>
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