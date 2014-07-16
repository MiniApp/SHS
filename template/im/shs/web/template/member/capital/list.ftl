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
        	<div class="title size-14">我的交易记录</div>
        	
        	[#-- 资金记录 --]
            <div class="drawcash">
                <div class="drawcash-bank">
                	[#--
                	<div class="transaction_records_list">
                    	<ul>
                        	<li class="transaction_records_list_title">起止日期</li>
                            <li><input type="time" value="" class="text-two" />&nbsp;到&nbsp;<input type="time" value="" class="text-two"  /></li>
                            <li class="transaction_records_li"><a href="#">最近7天</a></li>
                            <li class="transaction_records_li"><a href="#">1个月</a></li>
                            <li class="transaction_records_li"><a href="#">2个月</a></li>
                            <li class="transaction_records_li"><a href="#">3个月</a></li>
                        </ul>
                        <ul>
                        	<li class="transaction_records_list_title">交易类型</li>
                            <li>
                            	<select class="select-two">
                                	<option>请选择</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </li>
                            <li>
                            	<input type="button" value="查询" class="btn-ones" style="margin-left:5px;" />
                            </li>
                        </ul>
                    </div>
                    --]
                    <table class="investment_table">
                        <tr>
				            <th>收入</th>
				            <th>支出</th>
				            <th>结余</th>
				            <th>类型明细</th>
				            <th>时间</th>
				            <th>备注</th>
                        </tr>
						[#list page.cont as capital]
							<tr>
				                <td>
				                	[#if capital.credit == 0]
				                		-
				                	[#else]
				                		${capital.credit?string("currency")}
				                	[/#if]
				                </td>
				                <td>
				                	[#if capital.debit == 0]
				                		-
				                	[#else]
				                		${capital.debit?string("currency")}
				                	[/#if]
				                </td>
				                <td>${capital.balance?string("currency")}</td>
				                <td>${message("CapitalMethod." + capital.method)}[#--${message("CapitalType." + capital.type)}--]</td>
				                <td>${capital.createDate?string("yyyy-MM-dd HH:mm:ss")}</td>
				                <td>
				                	[#if capital.memo??]
				                		${capital.memo}
				                	[#else]
				                		-
				                	[/#if]
				                </td>
				            </tr>
						[/#list]
		                [#if page.cont?size == 0]
		                    <tr>
		                    	<td colspan="6">没有记录！</td>
		                    </tr>
		                [/#if]
                    </table>
                    
                    [#-- 分页 --]
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