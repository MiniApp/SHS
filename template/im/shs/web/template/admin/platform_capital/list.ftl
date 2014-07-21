[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/platform_capital${capitalType???string('?type=' + capitalType, '')}" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>平台资金[#if capitalType??]${message("CapitalType." + capitalType)}[/#if]记录[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- jQuery DataTables For Bootstrap 数据表格 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/datatables/dataTables.bootstrap.min.css">
		[#-- jQuery DataTables For ColReorder 数据表格 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/datatables/dataTables.colReorder.min.css">
		[#-- jQuery DataTables For ColVis 数据表格 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/datatables/dataTables.colVis.min.css">
		[#-- jQuery DataTables For TableTools 数据表格 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/datatables/dataTables.tableTools.min.css">
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
		[#-- Font Awesome Icon 图标 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/font-awesome/css/font-awesome.min.css">
		[#-- jBreadcrumbs 面包屑 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.fix.min.css" />
		[#-- HubSpot Messenger 弹框（Alert）组件库 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.theme.future.min.css" />	
		[#-- Link 底部 --]
    	[#include "/template/admin/include/link_bottom.ftl" /]
    </head>
    <body class="contentwrapper">

		[#-- 面包屑 --]
		<div id="jBreadCrumb" class="breadCrumb module">
			<ul>
				<li>
					<a href="${homepageUrl}"></a>
				</li>
				<li>
					资金管理
				</li>
				<li>
					平台资金[#if capitalType??]${message("CapitalType." + capitalType)}[/#if]记录
				</li>
			</ul>
		</div>
		
		[#-- jQuery DataTables 数据表格 --]
		<table class="table table-striped table-bordered dataTable">
			[#if capitalType??]
				<thead>
					<tr>
	                    <th>编号</th>
                    	<th>${message("CapitalType." + capitalType)}方式</th>
                    	<th>${message("CapitalType." + capitalType)}资金</th>
				        <th>用户名</th>
				        <th>备注</th>
	                    <th>创建日期</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
				        <th class="right">当前页统计</th>
				        <th>&nbsp;</th>
				        <th class="capitalPageTotals">&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
					</tr>
					<tr>
				        <th class="right">总统计</th>
				        <th>&nbsp;</th>
				        <th class="capitalTotals">&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
					</tr>
		        </tfoot>
				<tbody>
					[#list list as capital]
					    <tr>
					        <td>${capital.id}</td>
					        <td>${message("CapitalMethod." + capital.method)}</td>
					        [#if capitalType == "debit"]
					        	<td>${capital.credit?string("currency")}</td>
					        [#elseif capitalType == "credit"]
					        	<td>${capital.debit?string("currency")}</td>
					        [#else]
					        	<td>${0?string("currency")}</td>
					        [/#if]
					        <td>${capital.member.username}</td>
					        <td>${capital.memo!"-"}</td>
					        <td>${capital.createDate?string("yyyy-MM-dd HH:mm:ss")}</td>
					    </tr>
					[/#list]
				</tbody>
			[#else]
				<thead>
					<tr>
	                    <th>编号</th>
                    	<th>类型</th>
                    	<th>方式</th>
				        <th>收入资金</th>
				        <th>支出资金</th>
				        <th>用户名</th>
				        <th>备注</th>
				        <th>创建日期</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
				        <th class="right">当前页统计</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
				        <th class="creditPageTotals">&nbsp;</th>
				        <th class="debitPageTotals">&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
					</tr>
					<tr>
				        <th class="right">总统计</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
				        <th class="creditTotals">&nbsp;</th>
				        <th class="debitTotals">&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
				        <th>&nbsp;</th>
					</tr>
		        </tfoot>
				<tbody>
					[#list list as capital]
					    <tr>
					        <td>${capital.id}</td>
					        [#if capital.type == "debit"]
					        	<td>${message("CapitalType.credit")}</td>
					        [#elseif capital.type == "credit"]
					        	<td>${message("CapitalType.debit")}</td>
					        [#else]
					        	<td>-</td>
					        [/#if]
					        <td>${message("CapitalMethod." + capital.method)}</td>
					        <td>${capital.debit?string("currency")}</td>
					        <td>${capital.credit?string("currency")}</td>
					        <td>${capital.member.username}</td>
					        <td>${capital.memo!"-"}</td>
					        <td>${capital.createDate?string("yyyy-MM-dd HH:mm:ss")}</td>
					    </tr>
					[/#list]
				</tbody>
			[/#if]
		</table>
		
		[#-- hide elements 隐藏元素 --]
		<div class="hide">
		    
		    [#-- actions for jQuery DataTables 数据表格 - 操作 --]
		    <div class="dataTableActions">
		        <div class="btn-group">
					<a href="${indexUrl}" class="btn btn-default btn-sm">
		            	<i class="icon-refresh"></i>
		            	刷新
					</a>
				</div>
				<div class="btn-group">
		            <button data-toggle="dropdown" class="btn dropdown-toggle btn-default btn-sm">
		            	<i class="icon-filter"></i>
		            	筛选
		            	<span class="caret"></span>
		            </button>
		            <ul class="dropdown-menu">
		            	<li><a href="${baseUrl}/platform_capital">所有</a></li>
		            </ul>
		        </div>
		    </div>
		    
		</div>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
	[#-- jQuery DataTables 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.min.js"></script>
	[#-- jQuery DataTables For Bootstrap 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.bootstrap.min.js"></script>
	[#-- jQuery DataTables For ColReorder 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.colReorder.min.js"></script>
	[#-- jQuery DataTables For ColVis 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.colVis.min.js"></script>
	[#-- jQuery DataTables For Sorting 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.sorting.min.js"></script>
	[#-- jQuery DataTables For TableTools 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.tableTools.min.js"></script>
	[#-- jQuery DataTables Common Settings 数据表格 - 公共 - 设置 --]
    <script type="text/javascript">
    	[#if capitalType??]
	    	var dataTableSettings = {
	    		"sDom": "R<'row header'<'col-sm-9'<'actions pull-left'>l<'columns pull-left'C><'tools pull-left'T>><'col-sm-3'f>r>t<'row footer'<'col-sm-5'i><'col-sm-7'p>>",
				"aoColumns": [
					null,
					{"sType": "string"},
					{"sType": "formatted-number"},
					{"sType": "string"},
					{"bSortable": false},
					{"sType": "eu_date"}
				],
	    		"scrollY": $(window).height() - 275,
		    	"aaSorting": [
					[5, "desc"]
				],
		        "colVis": {
		        	"buttonText": "字段"
		        },
				[#-- 页脚显示回调 --]
	            "footerCallback": function(row, datas, start, end, display) {
	            
	        		[#-- 统计当前页总和 --]
					var capitalPageTotals = 0;
					for(var i = start; i < end; i ++) {
						var data = datas[display[i]];
						capitalPageTotals = floatAdd(capitalPageTotals, getNumber(data[2]));
					}
					$("div.dataTables_wrapper table.dataTable tfoot th.capitalPageTotals").text(currency(capitalPageTotals, true, true));
					
	        		[#-- 统计所有总和 --]
					var capitalTotals = 0;
					for(var i = 0; i < display.length; i ++) {
						var data = datas[display[i]];
						capitalTotals = floatAdd(capitalTotals, getNumber(data[2]));
					}
					$("div.dataTables_wrapper table.dataTable tfoot th.capitalTotals").text(currency(capitalTotals, true, true));
				},
				[#-- 工具 --]
		        "tableTools": {
		            "aButtons": [
		                {
		                    "sExtends": "copy",
		                    "sButtonText": "复制到剪贴板"
		                },
		                {
		                    "sExtends": "print",
		                    "sButtonText": "显示打印视图",
		                    "sToolTip": "显示打印视图",
		                    "sInfo": "<h6>打印视图</h6><p>请使用浏览器的打印功能，打印该表视图！</p>"
		                },
		                {
		                    "sExtends": "collection",
		                    "sButtonText": "导出&nbsp;<span class='caret'></span>",
		                    "aButtons": [ "csv", "xls", "pdf" ]
		                }
		            ]
		        }
	    	};
		[#else]
	    	var dataTableSettings = {
	    		"sDom": "R<'row header'<'col-sm-9'<'actions pull-left'>l<'columns pull-left'C><'tools pull-left'T>><'col-sm-3'f>r>t<'row footer'<'col-sm-5'i><'col-sm-7'p>>",
				"aoColumns": [
					null,
					{"sType": "string"},
					{"sType": "string"},
					{"sType": "formatted-number"},
					{"sType": "formatted-number"},
					{"sType": "string"},
					{"bSortable": false},
					{"sType": "eu_date"}
				],
	    		"scrollY": $(window).height() - 275,
		    	"aaSorting": [
					[7, "desc"]
				],
		        "colVis": {
		        	"buttonText": "字段"
		        },
				[#-- 页脚显示回调 --]
	            "footerCallback": function(row, datas, start, end, display) {
	            
	        		[#-- 统计当前页总和 --]
					var creditPageTotals = 0;
					var debitPageTotals = 0;
					for(var i = start; i < end; i ++) {
						var data = datas[display[i]];
						creditPageTotals = floatAdd(creditPageTotals, getNumber(data[3]));
						debitPageTotals = floatAdd(debitPageTotals, getNumber(data[4]));
					}
					$("div.dataTables_wrapper table.dataTable tfoot th.creditPageTotals").text(currency(creditPageTotals, true, true));
					$("div.dataTables_wrapper table.dataTable tfoot th.debitPageTotals").text(currency(debitPageTotals, true, true));
					
	        		[#-- 统计所有总和 --]
					var creditTotals = 0;
					var debitTotals = 0;
					for(var i = 0; i < display.length; i ++) {
						var data = datas[display[i]];
						creditTotals = floatAdd(creditTotals, getNumber(data[3]));
						debitTotals = floatAdd(debitTotals, getNumber(data[4]));
					}
					$("div.dataTables_wrapper table.dataTable tfoot th.creditTotals").text(currency(creditTotals, true, true));
					$("div.dataTables_wrapper table.dataTable tfoot th.debitTotals").text(currency(debitTotals, true, true));
				},
				[#-- 工具 --]
		        "tableTools": {
		            "aButtons": [
		                {
		                    "sExtends": "copy",
		                    "sButtonText": "复制到剪贴板"
		                },
		                {
		                    "sExtends": "print",
		                    "sButtonText": "显示打印视图",
		                    "sToolTip": "显示打印视图",
		                    "sInfo": "<h6>打印视图</h6><p>请使用浏览器的打印功能，打印该表视图！</p>"
		                },
		                {
		                    "sExtends": "collection",
		                    "sButtonText": "导出&nbsp;<span class='caret'></span>",
		                    "aButtons": [ "csv", "xls", "pdf" ]
		                }
		            ]
		        }
	    	};
		[/#if]
    </script>
    [#-- jQuery DataTables Common functions 数据表格 - 公共 - 函数 --]
    <script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.common.js"></script>
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- HubSpot Messenger 弹框（Alert）组件库 --]
	<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.theme.future.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.common.min.js"></script>
	[#-- 有瞬时消息时 --]
	[#if flashMessage != null]
		<script type="text/javascript">
			$().ready(function() {
				${flashMessage}
			});
		</script>
	[/#if]
	[#-- Script 底部 --]
	[#include "/template/admin/include/script_bottom.ftl" /]
</html>
[/@compress]