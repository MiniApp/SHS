/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Hint Common
 * Version: 3.0
 */

// 选项卡提示
$tabHint = {
	msgCls: "hint--top hint--error hint--always",
	msgAttr: "data-hint",
	msgVal: "未通过验证",
	show: function(id) {
		$("#" + id).attr($tabHint.msgAttr, $tabHint.msgVal).addClass($tabHint.msgCls);
	},
	hide: function(id) {
		$("#" + id).removeAttr($tabHint.msgAttr).removeClass($tabHint.msgCls);
	}
};