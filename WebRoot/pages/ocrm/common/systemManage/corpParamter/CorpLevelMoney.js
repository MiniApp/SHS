/**
 * 对公客户分级金额设置
 * 
 */
ObjectUtil.define(
		"crm.pages.ocrm.common.systemManage.corpParamter.CorpLevelMoney",
		"base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/corpParamter/CorpLevelMoney.html",// html路径
			initData : function() {
				var owner = this;
				ConnectionUtil.ajaxReq({
							strServId : "CorLevelMoneyService.findList",
							callback : function(data) {
								DataUtil.populateDataForArea(data,
										owner.ids.corpLevelMoneyContentDiv);// 渲染数据到页面
								owner.refreshDiv();
							}
						});
			},

			initCmp : function() {
				var owner = this;
				// 面板
				this.panel = this.create('component.Panel', {
							contentEl : this.ids.corpLevelMoneyContentDiv,
							hasBackGroundColor : true,
							heightPercent : 0.95,
							renderTo : this.ids.corpLevelMoneyDiv,
							buttons : [{
										text : '保存',
										iconCls : 'save',
										handler : function() {
											owner.update();
										}
									}]
						});
			},
			refreshDiv : function() {
				var owner = this;
				// 存款
				HtmlUtil.getDom(owner.ids.generalDepositMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.cityMajorDepositMinValue).value;
				HtmlUtil.getDom(owner.ids.cityMajorDepositMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerMajorDepositMinValue).value;
				HtmlUtil.getDom(owner.ids.centerMajorDepositMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerSpeDepositMinValue).value;
				// 存款日均
				HtmlUtil.getDom(owner.ids.generalDepositDailyMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.cityMajorDepositDailyMinValue).value;
				HtmlUtil.getDom(owner.ids.cityMajorDepositDailyMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerMajorDepositDailyMinValue).value;
				HtmlUtil.getDom(owner.ids.centerMajorDepositDailyMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerSpeDepositDailyMinValue).value;
				// 贷款
				HtmlUtil.getDom(owner.ids.generalLoanmaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.cityMajorLoanminValue).value;
				HtmlUtil.getDom(owner.ids.cityMajorLoanmaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerMajorLoanminValue).value;
				HtmlUtil.getDom(owner.ids.centerMajorLoanmaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerSpeLoanminValue).value;
				// 表外
				HtmlUtil.getDom(owner.ids.generalOutMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.cityMajorOutMinValue).value;
				HtmlUtil.getDom(owner.ids.cityMajorOutMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerMajorOutMinValue).value;
				HtmlUtil.getDom(owner.ids.centerMajorOutMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerSpeOutMinValue).value;
				// 银承
				HtmlUtil.getDom(owner.ids.generalSilverMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.cityMajorSilverMinValue).value;
				HtmlUtil.getDom(owner.ids.cityMajorSilverMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerMajorSilverMinValue).value;
				HtmlUtil.getDom(owner.ids.centerMajorSilverMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerSpeSilverMinValue).value;
				// 贴现
				HtmlUtil.getDom(owner.ids.generalDiscountMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.cityMajorDiscountMinValue).value;
				HtmlUtil.getDom(owner.ids.cityMajorDiscountMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerMajorDiscountMinValue).value;
				HtmlUtil.getDom(owner.ids.centerMajorDiscountMaxValue).innerHTML = HtmlUtil
						.getDom(owner.ids.centerSpeDiscountMinValue).value;
			},
			update : function() {
				var owner = this;
				var data = DataUtil
						.getDataFromArea(owner.ids.corpLevelMoneyContentDiv);// 获取页面输入的信息并自动验证
				if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
					var d1 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.generalDepositMinValue).value);
					var d2 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.cityMajorDepositMinValue).value);
					var d3 = owner
							.getNumberbyString(HtmlUtil
									.getDom(owner.ids.centerMajorDepositMinValue).value);
					var d4 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerSpeDepositMinValue).value);
					if (d2 < d1 || d3 < d2 || d4 < d3) {
						MsgUtil.error("验证错误", "存款余额设置错误。高级别范围下限低于低级别范围下限！");
						return;
					}
					// 存款日均
					var d1 = owner
							.getNumberbyString(HtmlUtil
									.getDom(owner.ids.generalDepositDailyMinValue).value);
					var d2 = owner
							.getNumberbyString(HtmlUtil
									.getDom(owner.ids.cityMajorDepositDailyMinValue).value);
					var d3 = owner
							.getNumberbyString(HtmlUtil
									.getDom(owner.ids.centerMajorDepositDailyMinValue).value);
					var d4 = owner
							.getNumberbyString(HtmlUtil
									.getDom(owner.ids.centerSpeDepositDailyMinValue).value);
					if (d2 < d1 || d3 < d2 || d4 < d3) {
						MsgUtil.error("验证错误", "存款余额设置错误。高级别范围下限低于低级别范围下限！");
						return;
					}
					// 贷款
					var d1 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.generalLoanminValue).value);
					var d2 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.cityMajorLoanminValue).value);
					var d3 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerMajorLoanminValue).value);
					var d4 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerSpeLoanminValue).value);
					if (d2 < d1 || d3 < d2 || d4 < d3) {
						MsgUtil.error("验证错误", "存款余额设置错误。高级别范围下限低于低级别范围下限！");
						return;
					}
					// 表外
					var d1 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.generalOutMinValue).value);
					var d2 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.cityMajorOutMinValue).value);
					var d3 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerMajorOutMinValue).value);
					var d4 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerSpeOutMinValue).value);
					if (d2 < d1 || d3 < d2 || d4 < d3) {
						MsgUtil.error("验证错误", "存款余额设置错误。高级别范围下限低于低级别范围下限！");
						return;
					}
					// 银承
					var d1 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.generalSilverMinValue).value);
					var d2 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.cityMajorSilverMinValue).value);
					var d3 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerMajorSilverMinValue).value);
					var d4 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerSpeSilverMinValue).value);
					if (d2 < d1 || d3 < d2 || d4 < d3) {
						MsgUtil.error("验证错误", "存款余额设置错误。高级别范围下限低于低级别范围下限！");
						return;
					}
					// 贴现
					var d1 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.generalDiscountMinValue).value);
					var d2 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.cityMajorDiscountMinValue).value);
					var d3 = owner
							.getNumberbyString(HtmlUtil
									.getDom(owner.ids.centerMajorDiscountMinValue).value);
					var d4 = owner.getNumberbyString(HtmlUtil
							.getDom(owner.ids.centerSpeDiscountMinValue).value);
					if (d2 < d1 || d3 < d2 || d4 < d3) {
						MsgUtil.error("验证错误", "存款余额设置错误。高级别范围下限低于低级别范围下限！");
						return;
					}
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "CorLevelMoneyService.updateList",
						jsonData : data,
						callback : function(msg) {
							MsgUtil.alert("提示", "修改参数成功！");
							owner.refreshDiv();
						}
					});
				}
			},
			/**
			 * 取数方法，从money格式的string中得到值
			 */
			getNumberbyString : function(tring) {
				var a = tring.replace(/\,/g, "");
				return new Number(a);
			}
		});