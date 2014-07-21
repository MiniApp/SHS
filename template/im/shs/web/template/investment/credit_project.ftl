[@compress single_line = !systemDevelopment]
[#-- 状态: 我要投资 --]
[#assign nav = "investment"]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-我要投资</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/global.css?version=${setting.basic.siteVersion}"/>
[#-- jQuery Colorbox 弹出层 --]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/colorbox.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="bidpage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
	
	[#-- 项目信息 --]
    <div class="rows">
    	<div class="bid">
        	
        	[#-- 项目标题 --]
        	<div class="bid-top">
                <div class="left pull-left">
                    <div class="pull-left icon"><img src="${base}/resources/images/borrowing_${project.type}.gif?version=${setting.basic.siteVersion}" /></div>
                    <div class="pull-left size-24" title="${project.title}">${abbreviate(project.title, 30, "...")}</div>
                    <div class="pull-left size-14">（${borrower.username}）</div>
                </div>
				<div class="right pull-right"><a href="${base}/investment/agreement/${project.id}" target="_blank">借款协议（范本）</a></div>
			</div>
			
			[#-- 项目信息 --]
			<div class="bid-bottom">
			
				[#-- 项目状态 - 印章 --]
	            [#if project.isFailure]
	            	<div class="stamp"><img src="${base}/resources/images/yz-four.png?version=${setting.basic.siteVersion}" /></div>
	            [#else]
	                [#if project.progress == "investing"]
	                	[#--
	                	<div class="stamp"><img src="${base}/resources/images/yz-one.png?version=${setting.basic.siteVersion}" /></div>
	                	--]
					[#elseif project.progress == "lending"]
						<div class="stamp"><img src="${base}/resources/images/yz-two.png?version=${setting.basic.siteVersion}" /></div>
					[#elseif project.progress == "repaying"]
	                    <div class="stamp"><img src="${base}/resources/images/yz-three.png?version=${setting.basic.siteVersion}" /></div>
					[#elseif project.progress == null && project.state == "success"]
						<div class="stamp"><img src="${base}/resources/images/yz-five.png?version=${setting.basic.siteVersion}" /></div>
					[/#if]
	            [/#if]
	            
	            [#-- 基本信息 --]
            	<div class="size-14 pull-left bid-list">
                    <ul class="bid-list-one">
                        <li>
                            <div class="li-title">借款总额</div>
                            <div class="li-content clear">${project.amount?string("currency")}</div>
                        </li>
                        <li>
                            <div class="li-title">借款利率</div>
                            <div class="li-content clear">${project.interestRate}%/年</div>
                        </li>
                        <li>
                            <div class="li-title">借款期限</div>
                            <div class="li-content clear">${project.period}个月</div>
                        </li>
                    </ul>
                    <ul class="bid-list-two">
                    	<li>
                            <div class="li-title">担保方式</div>
                            <div class="li-content">${message("GuaranteeMethod." + project.guaranteeMethod)}</div>
                        </li>
                        <li>
                            <div class="li-title">还款方式</div>
                            <div class="li-content">${message("RepaymentMethod." + project.repaymentMethod)}</div>
                        </li>
                        [#--
                        <li>
                            <div class="li-title">月还本息</div>
                            <div class="li-content">4,068.70元</div>
                        </li>
                        <li>
                            <div class="li-title">提前还款费率</div>
                            <div class="li-content">0.00%</div>
                        </li>
                        --]
                        <li>
                            <div class="li-title">普通逾期利率</div>
                            <div class="li-content">${project.overdueInterestRate}%/天</div>
                        </li>
                        <li>
                            <div class="li-title">严重逾期利率</div>
                            <div class="li-content">${project.seriousOverdueInterestRate}%/天（发生逾期${project.seriousOverdueStartPeriod}天后）</div>
                        </li>
                        <li>
                            <div class="li-title">回收服务费率</div>
                            <div class="li-content">${project.recoveryFeeRate}%/期</div>
                        </li>
                        [#if project.isFailure]
	                        [#if project.investmentEndDate??]
		                        <li>
		                            <div class="li-title">流标日期</div>
		                            <div class="li-content">${project.investmentEndDate?string("yyyy年MM月dd日 HH时mm分")}</div>
		                        </li>
	                        [/#if]
			            [#else]
			                [#if project.progress == "investing"]
		                        [#if project.investmentEndDate??]
			                        <li>
			                            <div class="li-title">投资结束日期</div>
			                            <div class="li-content">${project.investmentEndDate?string("yyyy年MM月dd日 HH时mm分")}</div>
			                        </li>
		                        [/#if]
		                        <li>
		                            <div class="li-title">投资进度</div>
		                            <div class="li-content">${project.investmentProgress?string("percent")}</div>
		                        </li>
							[#elseif project.progress == "lending"]
		                        <li>
		                            <div class="li-title">满标时间</div>
		                            <div class="li-content">${project.investmentFinishDate?string("yyyy年MM月dd日")}</div>
		                        </li>
							[#elseif project.progress == "repaying"]
								[#list project.repayments as repayment]
			                        <li>
			                            <div class="li-title">还款结束日期</div>
			                            <div class="li-content">${repayment.endDate?string("yyyy年MM月dd日")}</div>
			                        </li>
								[/#list]
							[#elseif project.progress == null && project.state == "success"]
								[#list project.repayments as repayment]
			                        <li>
			                            <div class="li-title">完成时间</div>
			                            <div class="li-content">${repayment.finishDate?string("yyyy年MM月dd日")}</div>
			                        </li>
								[/#list]
							[/#if]
			            [/#if]
                    </ul>
                </div>
			
				[#-- 项目状态 --]
	            [#if project.isFailure]
	            	<div class="bids pull-right">
	                	<ul>
	                    	<li>
	                        	<div class="full-title">已投金额：</div>
	                            <div class="full-content">${project.investedAmount?string("currency")}</div>
	                        </li>
	                        <li>
	                        	<div class="full-title">流标日期：</div>
	                            <div class="full-content">${project.investmentEndDate?string("yyyy年MM月dd日")}</div>
	                        </li>
	                    </ul>
	                </div>
	            [#else]
	                [#if project.progress == "investing"]
	                	<div class="bid-money pull-right">
	                		[#if currentMember??]
			                	<div class="money">
			                        <div class="size-20">项目剩余可投金额：</div>
			                        <div class="number"><span class="color-one size-28">${project.surplusInvestmentAmount?string("currency")}</span></div>
			                    </div>
			                    <p>${project.investmentMinimum?string("currency")}为一份，输入金额须为${project.investmentMinimum?string("currency")}的整数倍</p>
			                    <form id="investmentFrom">
				                    <div class="input">
				                    	<input type="text" class="text-four" name="amount" value="${project.investmentMinimum}" placeholder="请输入投资金额" />
				                    	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0px 0px;"></p>
				                    </div>
				                    <p>当前余额：${currentMember.available?string("currency")}&nbsp;（<a href="${base}/account/recharge" target="_blank" class="color-one">立即充值</a>）</p>
				                    <div class="btn-margin"><input type="submit" value="马上投标" class="btn-ten" /></div>
								</form>
			                [#else]
			                	<div style="font-size: 20px; margin: 85px 0px 0px 50px;">点击 <a class="color-one" href="${base}/login?redirectUrl=${(setting.basic.siteUrl + "/investment/" + project.id)?url}">登录</a> 后可见</div>
			                [/#if]
		                </div>
					[#elseif project.progress == "lending"]
						<div class="full pull-right">
		                	<ul>
		                    	<li>
		                        	<div class="full-title">满标时间：</div>
		                            <div class="full-content">${project.investmentFinishDate?string("yyyy年MM月dd日")}</div>
		                        </li>
		                        [#if project.investmentEndDate??]
			                        <li>
			                        	<div class="full-title">加入人次：</div>
			                            <div class="full-content">${project.investments?size}人</div>
			                        </li>
		                        [/#if]
		                    </ul>
		                </div>
					[#elseif project.progress == "repaying"]
						[#list project.repayments as repayment]
		                    <div class="repayment pull-right">
			                	<ul>
			                    	<li>
			                        	<div class="full-title">待还本息：</div>
			                            <div class="full-content">${repayment.surplusCapitalInterest?string("currency")}</div>
			                        </li>
			                        <li>
			                        	<div class="full-title">待还期数：</div>
			                            <div class="full-content">${repayment.paidPeriod}/${repayment.period}</div>
			                        </li>
			                        <li>
			                        	<div class="full-title">下一合约还款日：</div>
			                            <div class="full-content">${repayment.nextDate?string("yyyy年MM月dd日")}</div>
			                        </li>
			                    </ul>
			                </div>
						[/#list]
					[#elseif project.progress == null && project.state == "success"]
						[#list project.repayments as repayment]
							<div class="complete pull-right">
			                	<ul>
			                    	<li>
			                        	<div class="full-title">已还本息：</div>
			                            <div class="full-content">${repayment.paidCapitalInterest?string("currency")}</div>
			                        </li>
			                        <li>
			                        	<div class="full-title">完成时间：</div>
			                            <div class="full-content">${repayment.finishDate?string("yyyy年MM月dd日")}</div>
			                        </li>
			                    </ul>
			                </div>
						[/#list]
					[/#if]
	            [/#if]
                
            </div>
        </div>
    </div>
    
    <div class="rows">
    	<div class="Details">
        	<div class="title">
            	<ul>
                	<li><a href="#Details-content-one" class="active">项目介绍</a></li>
                    <li><a href="#Details-content-two">投资记录</a></li>
                </ul>
            </div>
            
            [#-- 项目介绍 --]
            <div id="Details-content-one" class="container">
                
                [#-- 借款人介绍 --]
                <div class="info">
                	<div class="pull-left info-title">用户信息</div>
                    <ul class="size-14">
                        <li>
                            <div class="li-title">用户名：</div>
                            <div class="li-content">${borrower.username}</div>
                        </li>
                        <li>
                            <div class="li-title">公司行业：</div>
                            <div class="li-content">${borrower.corpDomain!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">工作城市：</div>
                            <div class="li-content">${borrowerInfo.corpLocality!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">学历：</div>
                            <div class="li-content">${borrower.educ!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">公司规模：</div>
                            <div class="li-content">${borrower.corpScale!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">年龄：</div>
                            <div class="li-content">[#if borrower.age != 0]${borrower.age}岁[#else]-[/#if]</div>
                        </li>
                        <li>
                            <div class="li-title">学校：</div>
                            <div class="li-content">${borrower.univ!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">工作时间：</div>
                            <div class="li-content">${borrower.period!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">车产：</div>        
                            <div class="li-content">
                                <span class="${((borrowerInfo.ownCar == true)?string("active", "no-active"))!"no-active"}">车产</span>
                                <span class="${((borrowerInfo.withCarLoan == true)?string("active", "no-active"))!"no-active"}">车贷</span>
                            </div>
                        </li>
                        <li>
                            <div class="li-title">职位：</div>
                            <div class="li-content">${borrower.post!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">收入范围：</div>
                            <div class="li-content">${borrower.income!"-"}</div>
                        </li>
                        <li>
                            <div class="li-title">房产：</div>        
                            <div class="li-content">
                                <span class="${((borrowerInfo.ownHouse == true)?string("active", "no-active"))!"no-active"}">房产</span>
                                <span class="${((borrowerInfo.withHouseLoan == true)?string("active", "no-active"))!"no-active"}">房贷</span>
                            </div>
                        </li>
                        <li>
                            <div class="li-title">婚姻：</div>
                            <div class="li-content">${message("Marriage." + borrower.marriage)}</div>
                        </li>
                    </ul>
                </div>
                
                [#--
                [#-- 信用档案 --\]
                <div class="file">
                	<div class="pull-left file-title">信用档案</div>
                    <div class="pull-left file-content">
                    	<div class="credit-rating">A</div>
                        <ul class="size-14">
                            <li>
                                <div class="li-title">申请借款（笔）</div>
                                <div class="li-content">1</div>
                            </li>
                            <li>
                                <div class="li-title">信用额度（元）</div>
                                <div class="li-content">40000,00</div>
                            </li>
                            <li>
                                <div class="li-title">逾期总额（元）</div>
                                <div class="li-content">0</div>
                            </li>
                            <li>
                                <div class="li-title">还清借款（笔）</div>
                                <div class="li-content">1</div>
                            </li>
                            <li>
                                <div class="li-title">借款总额（元）</div>
                                <div class="li-content">40000,00</div>
                            </li>
                            <li>
                                <div class="li-title">逾期次数（次）</div>
                                <div class="li-content">0</div>
                            </li>
                            <li>
                                <div class="li-title">成功借款（笔）</div>
                                <div class="li-content">1</div>
                            </li>
                            <li>
                                <div class="li-title">待还本息（元）</div>
                                <div class="li-content">42421,00</div>
                            </li>
                            <li>
                                <div class="li-title">严重逾期（笔）</div>        
                                <div class="li-content">0</div>
                            </li>
                        </ul>
                    </div>
                </div>
                --]
                
                [#-- 借款介绍 --]
                <div class="introduction">
                	<div class="pull-left introduction-title">借款描述</div>
                    <div class="pull-left introduction-content">${project.description!"-"}</div>
                </div>
                
                [#-- 项目材料 --]
                [#if project.materials?size gt 0]
	                <div class="materials">
	                	<h3>项目材料</h3>
	                	<table>
	                    	<tr>
	                        	<th>审核项目</th>
	                            <th>状态</th>
	                            <th>通过时间</th>
	                            <th>操作</th>
	                        </tr>
                        	[#list project.materials as material]
		                        <tr>
		                        	<td>${material.title}</td>
		                            <td><img src="${base}/resources/images/attcinInfmto_A.png?version=${setting.basic.siteVersion}" /></td>
		                            <td>${project.investmentStartDate?string("yyyy-MM-dd")}</td>
		                            <td><a href="${material.large}" target="_blank">查看</a></td>
		                        </tr>
                            [/#list]
	                    </table>
	                </div>
                [/#if]
                
                [#--
                [#-- 项目材料 --\]
                [#if project.materials?size gt 0]
	                <div class="audit">
	                	<div class="pull-left audit-title">项目材料</div>
	                    <div class="pull-left audit-content">
	                        <div id="container">
	                            <div id="products_example">
	                                <div id="products">
	                                    <div class="slides_container">
				                        	[#list project.materials as material]
				                        		<a href="${material.large}" target="_blank"><img src="${material.medium}?version=${setting.basic.siteVersion}" width="366" alt="${material.title}"></a>
				                            [/#list]
	                                    </div>
	                                    <ul class="pagination">
				                        	[#list project.materials as material]
				                        		<li><a href="#"><img src="${material.thumbnail}?version=${setting.basic.siteVersion}" width="55" alt="${material.title}"></a></li>
				                            [/#list]
	                                    </ul>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
                [/#if]
                --]
                
                [#-- 留言 --]
                <div class="comments">
                	<div class="title">留言</div>
                    <div class="form">
                    	<form id="commentForm" action="${base}/comment/${project.id}" method="post">
                        	<div>
                        		<textarea class="textarea-two" name="cont"></textarea>
                        		<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
                        	</div>
                            <div class="pull-right btn-submit"><input type="submit" value="提交" class="btn-one" /></div>
                        </form>
                    </div>
                    <div class="container">
                    	<h3>最近五条留言</h3>
                        <div class="list">
                        	[@comment_list borrowing=project.id forComment=null sortBy="modifyDate desc" ; comments]
	                    	[#list comments as comment]
		                    	
		                    	<div class="div-one">
	                            	<div class="pull-left color-one size-14">${comment.reviewer.username}</div>
	                                <div class="pull-right">留言时间：${comment.createDate?string("yyyy-MM-dd HH:mm")}</div>
	                            </div>
	                            
	                            <div class="div-two">
	                            	<div class="pull-left">${comment.cont}</div>
	                            	
	                            	[#-- 评论回复 --]
	                                <div class="pull-right"><a href="#reply-form-${comment_index}" class="reply-btn">回复</a></div>
	                                <div id="reply-form-${comment_index}" class="reply-form display-no clear">
	                                	<form id="commentReplyForm" action="${base}/comment/${comment.id}/reply" method="post">
	                                        <div>
	                                        	<textarea class="textarea-two" name="cont"></textarea>
	                                        	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
	                                        </div>
	                                        <div class="pull-right btn-submit"><input type="submit" value="提交" class="btn-one" /></div>
	                                    </form>
	                                </div>
	                                
	                                [#-- 评论回复列表 --]
	                                [#list comment.replys as reply]
		                                <div class="reply">
		                                	<div class="pull-left">
		                                    	<span class="color-one size-14">${reply.reviewer.username}</span>
		                                        <span>回复：</span>
		                                        <span>${reply.cont}</span>
		                                    </div>
		                                </div>
                                    [/#list]
                                    
	                            </div>
	                    	[/#list]
	                    	[/@comment_list]
                        </div>
                    </div>
                </div>
            </div>
            
            [#-- 投资记录 --]
            <div id="Details-content-two" class="container display-no">
            	<div class="table">
                    <table class="Recordbid-table">
                        <tr>
                        	<th>投资人</th>
	                        <th>投资金额</th>
	                    	<th>投资方式</th>
	                        <th>投资时间</th>
                        </tr>
						[#list project.investmentRecords as investmentRecord]
		                    <tr>
		                    	<td>${investmentRecord.investor.username}</td>
		                        <td>${investmentRecord.amount?string("currency")}</td>
		                        <td>${message("OperationMethod." + investmentRecord.operationMethod)}</td>
		                        <td>${investmentRecord.createDate?string("yyyy-MM-dd HH:mm:ss")}</td>
		                    </tr>
						[/#list]
						[#if project.investmentRecords?size == 0]
		                    <tr>
		                    	<td colspan="4">没有记录！</td>
		                    </tr>
						[/#if]
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    [#-- 投资确认 --]
	[#if currentMember?? && !project.isFailure && project.progress == "investing"]
	    [#-- 隐藏元素 --]
	    <div style="display:none;">
	        [#-- 投资确认会话 --]
	        <form id="investmentConfirmForm" class="investmentForm" action="${base}/investment/${project.id}/invest" method="post">
	        	<input type="hidden" name="amount" value="" />
	            <div class="title">确认投资</div>
	            <div class="table" style="width: 380px">
	                <table>
	                    <tr>
	                        <td width="20%" align="right">借款编号：</td>
	                        <td>${project.id}</td>
	                    </tr>
	                    <tr>
	                        <td align="right">借款标题：</td>
	                        <td>${abbreviate(project.title, 20, "...")}</td>
	                    </tr>
	                    <tr>
	                        <td align="right">借款金额：</td>
	                        <td>${project.amount?string("currency")}</td>
	                    </tr>
	                    <tr>
	                        <td align="right">借款利率：</td>
	                        <td>${project.interestRate}%/年</td>
	                    </tr>
	                    <tr>
	                        <td align="right">借款期限：</td>
	                        <td>${project.period}个月</td>
	                    </tr>
	                    <tr>
	                        <td align="right">还款方式：</td>
	                        <td>${message("RepaymentMethod." + project.repaymentMethod)}</td>
	                    </tr>
	                    <tr>
	                        <td align="right">投资金额：</td>
	                        <td class="color-one"><label id="investmentAmount">0</label>&nbsp;元</td>
	                    </tr>
	                    <tr>
	                        <td align="right" valign="top">支付密码：</td>
	                        <td>
	                        	<input type="password" class="text-one" name="password" value="" placeholder="请输入支付密码" />
	                        	<a href="${base}/account/security" class="color-one" target="_blank">忘记密码？</a>
	                        	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colspan="2">如遇流标情况，投标期内所冻结的金额将在流标后进行解冻。</td>
	                    </tr>
	                    <tr>
	                        <td>&nbsp;</td>
	                        <td>
	                        	<label><input type="checkbox" name="agreement" value="true" checked="checked" />我已阅读并同意《<a href="${base}/investment/agreement/${project.id}" target="_blank" class="color-one">借款协议</a>》</label>
	                        	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 0px 0px 15px;"></p>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>&nbsp;</td>
	                        <td>
				                <div class="pull-left" style="margin-right: 25px"><input type="submit" value="确定" class="btn-one" /></div>
				                <div class="pull-left"><input type="button" value="取消" class="btn-two cancel" /></div>
	                        </td>
	                    </tr>
	                </table>
	            </div>
	        </form>
	    </div>
	[/#if]
    
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
[#-- project.invest 项目投资 --]
<script type="text/javascript">var modulus = "${modulus}", exponent = "${exponent}", available = ${(currentMember.available)!project.amount}, multiples = ${project.investmentMinimum};</script>
<script type="text/javascript" src="${base}/resources/js/project.invest.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/slides.min.jquery.js?version=${setting.basic.siteVersion}"></script>
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