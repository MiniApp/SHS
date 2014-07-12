/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Menu
 * Version: 3.0
 */

[#-- 登录页面若在框架内，则跳出框架 --]
if (self != top) {
	top.location = self.location;
};

$().ready(function() {

	[#-- 边导航显示/隐藏 --]
	var $sidebar = $("div.sidebar"), $iframe = $("#iframe");
	$("a.sidebar-switch").click(function(e) {
		e.preventDefault();
		
		var $this = $(this);
		$this.toggleClass("switch-off");
		$this.attr("data-hint", $this.attr("data-hint") == "隐藏边导航" ? "显示边导航" : "隐藏边导航");
		$sidebar.toggle();
		$iframe.toggleClass("no-sidebar");
	});
	
	[#-- 边导航选择--]
	var $sidebarNav = $("div.sidebar div.panel div.collapse ul.nav li");
	var $currentNav = null;
	$sidebarNav.click(function() {
		var $this = $(this);
		if($currentNav != null) {
			$currentNav.toggleClass("active");
		}
		$currentNav = $this;
		$currentNav.toggleClass("active");
	});
	
});