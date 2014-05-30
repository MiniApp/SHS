/**
 * 归属其他机构客户价值统计报表
 * @author wuqihui
 * @Since:2012-11-14
 * @Update:2012-11-14
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.report.ReportDemo20003",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/report/ReportDemo20003.html",
					initCmp : function() {
						var owner = this;
						this
								.createOrgSelectTree( {
									renderTo : this.ids.ReportSearchContentPanelDiv_nodeTree,
									codeDomId : this.ids.ReportSearchContentPanelDiv_node,
									textDomId : this.ids.ReportSearchContentPanelDiv_nodename,
									width : 350,
									onlyLeafSelect : false
								});
						//产品
						HtmlUtil.getDom(this.ids.campainSelectProduct).onclick = function() {
							owner.createProductSelectWindow( {
										title : '选择产品',
										checkbox : false,
										displayDomId : owner.ids.createCampaign_productTypeStr,
										hiddenDomId : owner.ids.productID
									});
						};

					},
					/**
					 * 取得搜索区域值
					 * @return {}
					 */
					getData : function() {
						var date1 = DataUtil.getDataFromArea(this.ids.ReportSearchContentPanelDiv20003)
						
						if(date1!= Constants.VALIDATION_FAIL)
							{var date = DataUtil
								.decode(date1);
							}
						if (DataUtil.isEmpty(date.date)) {
							var now = new Date();
							var yearmonth = now.getFullYear().toString()
									+ (now.getMonth()).toString();
							ObjectUtil.applyIf(date, DataUtil
									.decode('{"date":"' + yearmonth + '"}'));
						}
						var strt = date.date;
						return DataUtil.encode(date);
						//		return DataUtil.getDataFromArea(this.ids.ReportSearchContentPanelDiv10001);
					},
					/**
					 * 取得搜索区域的高
					 * @return {Number}
					 */
					getHeight : function() {
						return 120;
					}
				})
