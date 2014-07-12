[#-- 信用评级 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		信用评级
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("CreditRating." + credit.rating)}</strong>
		</p>
	</div>
</div>
			
[#-- 信用分 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		信用分
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.score!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 信用额度 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		信用额度
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.amount?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 已使用信用额度 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		已使用信用额度
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.usedAmount?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 申请借款数 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		申请借款数
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.appliedBorrowingCount!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 申请借款 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		申请借款
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.appliedBorrowing?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 借款数 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款数
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.borrowingCount!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 借款 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.borrowing?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 已还借款数 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		已还借款数
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.repaidBorrowingCount!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 已还借款 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		已还借款
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.repaidBorrowing?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 还款数 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		还款数
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.repaymentCount!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 还款 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		还款
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.repayment?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 已付还款数 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		已付还款数
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.paidRepaymentCount!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 已付还款 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		已付还款
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.paidRepayment?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 逾期数 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		逾期数
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.overdueCount!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 逾期期限（天） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		逾期期限（天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.overduePeriod!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 逾期额度 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		逾期额度
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.overdueAmount?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 逾期利息 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		逾期利息
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.overdueInterest?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 严重逾期数 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期数
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.seriousOverdueCount!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 严重逾期期限（天） --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期期限（天）
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${credit.seriousOverduePeriod!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 严重逾期额度 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期额度
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.seriousOverdueAmount?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 严重逾期利息 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		严重逾期利息
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(credit.seriousOverdueInterest?string("currency"))!"-"}</strong>
		</p>
	</div>
</div>