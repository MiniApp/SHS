<div class="left_nav">
	<div class="nav">
	    <div class="nav-item[#if state == "homepage"] active[/#if]" id="border-no">
	        <div class="item-title itema" id="border-no">
	        	<div class="item1"></div>
	            <p>账户首页</p>
	        </div>
	        <div class="item-panel ${(state == "homepage")?string("display-yes", "display-no")}">
	            <ul>
	                <li><a href="${base}/account" class="active">账户首页</a></li>
	            </ul>
	        </div>
	    </div>
	    <div class="nav-item[#if state == "account"] active[/#if]">
	        <div class="item-title itema">
	        	<div class="item2"></div>
	            <p>账户管理</p>
	        </div>
	        <div class="item-panel ${(state == "account")?string("display-yes", "display-no")}">
	            <ul>
	                [#--
	                <li><a href="#">个人资料</a></li>
	                <li><a href="#">认证信息</a></li>
	                --]
	                <li><a href="${base}/account/security">安全中心</a></li>
	                [#--
					<li><a href="#">密码修改</a></li>
					--]
	            </ul>
	        </div>
	    </div>
	    <div class="nav-item[#if state == "investment"] active[/#if]">
	       <div class="item-title itema">
	        	<div class="item3"></div>
	            <p>投资管理</p>
	        </div>
	        <div class="item-panel ${(state == "investment")?string("display-yes", "display-no")}">
	            <ul>
	                <li><a href="${base}/account/recovery?state=recovering">我的投资</a></li>
	                <li><a href="${base}/account/recovery_plan?state=recovering">我的回账</a></li>
	                <li><a href="${base}/account/statistics/investment">投资统计</a></li>
	            </ul>
	        </div>
	    </div>
	    <div class="nav-item[#if state == "borrowing"] active[/#if]">
	        <div class="item-title itema">
	        	<div class="item4"></div>
	            <p>借款管理</p>
	        </div>
	        <div class="item-panel ${(state == "borrowing")?string("display-yes", "display-no")}">
	            <ul>
	                <li><a href="${base}/account/repayment?state=repaying">我的借款</a></li>
	                <li><a href="${base}/account/borrowing/application">我的借款申请</a></li>
	                <li><a href="${base}/account/statistics/borrowing">借款统计</a></li>
	            </ul>
	        </div>
	    </div>
	    <div class="nav-item[#if state == "capital"] active[/#if]">
	        <div class="item-title itema">
	        	<div class="item5"></div>
	            <p>资金管理</p>
	        </div>
	        <div class="item-panel ${(state == "capital")?string("display-yes", "display-no")}">
	            <ul>
	                <li><a href="${base}/account/capital">我的交易记录</a></li>
	                <li><a href="${base}/account/bank_card">我的银行卡</a></li>
	                <li><a href="${base}/account/recharge">我要充值</a></li>
	                <li><a href="${base}/account/withdrawal">我要提现</a></li>
	            </ul>
	        </div>
	    </div>
	    <div class="nav-item[#if state == "comm"] active[/#if]">
	        <div class="item-title itema">
	        	<div class="item8"></div>
	            <p>消息管理</p>
	        </div>
	        <div class="item-panel ${(state == "comm")?string("display-yes", "display-no")}">
	            <ul>
	                <li><a href="${base}/account/priv_lette">我的私信</a></li>
	            </ul>
	        </div>
	    </div>
	</div>
</div>