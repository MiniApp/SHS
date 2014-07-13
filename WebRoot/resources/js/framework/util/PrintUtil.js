/**
 * 页面打印处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2013-01-28
 * @class PrintUtil
 */
ObjectUtil
		.define(
				"PrintUtil",
				{
					statics : {
						printPage : function(config) {
							var printWindow = window
									.open("", "_blank",
											"width=1,height=1,scrollbars=no,toolbar=no");
							if (!DataUtil.isEmpty(config.printHtml)) {
								printWindow.document
										.write("<html><head><link href='"
												+ Constants.CONTEXT_PATH
												+ "/resources/css/print.css' rel='stylesheet' /><link href='"
												+ Constants.CONTEXT_PATH
												+ "/resources/css/print.css' rel='stylesheet' media='print' /></head><body>"
												+ config.printHtml + "</body>");
							} else {
								if (DataUtil.isEmpty(config.printDomId)) {
								MsgUtil.error("验证错误", "printDomId必须传入值");
								return;
							    }
								printWindow.document
										.write("<html><head><link href='"
												+ Constants.CONTEXT_PATH
												+ "/resources/css/print.css' rel='stylesheet' /><link href='"
												+ Constants.CONTEXT_PATH
												+ "/resources/css/print.css' rel='stylesheet' media='print' /></head><body>"
												+ HtmlUtil
														.getDom(config.printDomId).innerHTML
												+ "</body>");
							}
							printWindow.document.close();
							printWindow.print();
							printWindow.close();
						}
					}
				});