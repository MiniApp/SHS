// JavaScript Document

//帮助中心
$(document).ready(function() {

	$("a.navigation").click(function(e) {
		e.preventDefault();

		var $this = $(this);
		var href = $this.attr("href");
		$(href).toggle();
		$this.toggleClass("current");
	});

});

// 导航二级菜单
$(document).ready(function() {

	$('.dropdown').mousemove(function() {
		$(this).find('.dropdown-menu').css("display", "block");
	});
	$('.dropdown').mouseleave(function() {
		$(this).find('.dropdown-menu').css("display", "none");
	});
});

// 信用贷申请流程页签效果
$(document).ready(function() {
	var $lastprocess = $(".process .title-info a.active");
	var $lastprocessUl = $("#form-one");
	$(".process .title-info a").click(function(e) {
		e.preventDefault();

		var $this = $(this);
		$lastprocess.toggleClass("active");
		$lastprocessUl.hide();

		$lastprocess = $this;
		$lastprocess.toggleClass("active");
		$lastprocessUl = $($this.attr("href"));
		$lastprocessUl.show();
	});

});

// 标的详情页标题页签效果
$(document).ready(function() {
	var $lastDetails = $(".Details .title a.active");
	var $lastDetailtab = $("#Details-content-one");
	$(".Details .title a").click(function(e) {
		e.preventDefault();

		var $this = $(this);
		$lastDetails.toggleClass("active");
		$lastDetailtab.hide();

		$lastDetails = $this;
		$lastDetails.toggleClass("active");
		$lastDetailtab = $($this.attr("href"));
		$lastDetailtab.show();
	});
});

// 标列表页搜索效果
$(document).ready(function() {

	$().ready(function() {
		$type = $(".search .type.active")
		$credit = $(".search .credit.active")
		$term = $(".search .term.active")

		$(".search .type").click(function(e) {
			e.preventDefault();

			var $this = $(this);
			$type.toggleClass("active");

			$type = $this;
			$type.toggleClass("active");

		});
		$(".search .credit").click(function(e) {
			e.preventDefault();

			var $this = $(this);
			$credit.toggleClass("active");

			$credit = $this;
			$credit.toggleClass("active");
		});
		$(".search .term").click(function(e) {
			e.preventDefault();

			var $this = $(this);
			$term.toggleClass("active");

			$term = $this;
			$term.toggleClass("active");
		});
	});

});

// 账户中心导航效果
$(document).ready(function() {
	var $navItems = $(".left_nav div.nav .nav-item");
	var $currentItem = null;
	var $currentItemPanel = null;
	var $item_panel_a_actve = $(".item-panel a.active");
	var $item_panel_a = $(".item-panel a");
	// 点击一级栏目效果
	$navItems.click(function() {

		if ($currentItem != null && $currentItemPanel != null) {
			$navItems.removeClass("active");
			$currentItem.toggleClass("active");
			$currentItemPanel.hide();
			$item_panel_a_actve.removeClass("active");
		}
		$navItems.removeClass("active");
		$currentItem = $(this).toggleClass("active");
		$(".item-panel").css("display", "none");
		$currentItemPanel = $(this).find(".item-panel").show();
		$item_panel_a_actve.removeClass("active");
	});
	// 点击二级栏目效果
	$item_panel_a.click(function() {

		$item_panel_a.removeClass("active");
		$item_panel_a = $(this).toggleClass("active");
	});

});

// 安全中心内容效果
$(document).ready(function() {

	$("a.setting").click(function(e) {
		e.preventDefault();

		var $this = $(this);
		var href = $this.attr("href");

		// 激活设置/修改时
		if (!$this.hasClass("setting-ing")) {
			$this.addClass("setting-ing");
			$this.text($this.data("setting-ing"));
			// 设置时
			if ($this.hasClass("setting-no")) {
				$this.text($this.data("setting-no-cancel"));
			}
			// 修改时
			else if ($this.hasClass("setting-yes")) {
				$this.text($this.data("setting-yes-cancel"));
			}
			// TODO 出现
			$(href).slideDown("fast");
		}
		// 取消设置/修改时
		else {
			$this.removeClass("setting-ing");
			// 设置时
			if ($this.hasClass("setting-no")) {
				$this.text($this.data("setting-no"));
			}
			// 修改时
			else if ($this.hasClass("setting-yes")) {
				$this.text($this.data("setting-yes"));
			}
			// TODO 隐藏
			$(href).slideUp("fast");
		}
	});

});

// 标的详情页标题页签效果
$(document).ready(function() {

	var $lastinvest = $(".invest .invest-title-two a.active");
	var $lastinvesttab = $("#table-two");
	$(".invest .invest-title-two a").click(function(e) {
		e.preventDefault();

		var $this = $(this);
		$lastinvest.toggleClass("active");
		$lastinvesttab.hide();

		$lastinvest = $this;
		$lastinvest.toggleClass("active");
		$lastinvesttab = $($this.attr("href"));
		$lastinvesttab.show();
	});

});

// 提现银行卡选中效果
$(document).ready(function() {

	var $navItems = $(".bankCards_list_li");
	var $currentItem = null;
	$navItems.click(function() {
		if ($currentItem != null) {
			$navItems.removeClass("active");
			$currentItem.toggleClass("active");
		}
		$navItems.removeClass("active");
		$currentItem = $(this).toggleClass("active");
	});

});

// 留言板块点击回复
$(document).ready(function() {

	var $reply = $(".reply-btn");
	var $replyForm = $(".reply-form");
	$reply.click(function(e) {
		e.preventDefault();

		var $this = $(this);
		$replyForm = $($this.attr("href"));
		$replyForm.toggleClass("display-no");
	});
});

// 返回顶部JS
$(document).ready(function() {

	$(function() {
		$(".backToTop").goToTop();
		$(window).bind('scroll resize', function() {
			$(".backToTop").goToTop();
		});
	});
});