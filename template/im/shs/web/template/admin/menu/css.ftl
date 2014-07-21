/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 * 
 * Cascading Style Sheets - Menu
 * Version: 3.0
 */

html.menu body {
	overflow-y: hidden;
}

/* header */
html.menu header .navbar-fixed-top {
	border-width: 0;
    margin: 0;
    min-height: 41px;
}

html.menu header .container {
	width: auto;
}

html.menu header .navbar .container .brand {
	color: #FFFFFF;
    font: 100 18px/39px "Microsoft Yahei",sans-serif;
    padding: 0 30px 0 10px;
    text-decoration: none;
    text-shadow: none;
}

html.menu header .navbar .container .brand .version {
	font-size: 11px;
}

html.menu header .navbar .container .divider-vertical {
	height: 42px;
	border-width: 0 1px;
	border-style: solid
}

html.menu header .navbar-default .container .navbar-nav > li > a {
	color: #fff;
    padding: 10px;
    text-shadow: none;
}

html.menu header .navbar-default .container .navbar-nav > li > a .glyphicon {
	height: 20px;
}

html.menu header .navbar-default .container .navbar-nav > .dropdown > a .caret {
	border-bottom-color: #fff;
    border-top-color: #fff;
}

html.menu header .navbar .container .nav li.dropdown.open>.dropdown-toggle,
html.menu header .navbar .container .nav li.dropdown.active>.dropdown-toggle,
html.menu header .navbar .container .nav li.dropdown.open.active>.dropdown-toggle {
	background: none;
	color: #fff;
}

/* sidebar-switch */
html.menu a.sidebar-switch {
	cursor: pointer;
    display: block;
    height: 12px;
    position: fixed;
    top: 51px;
    width: 17px;
    z-index: 100;
}

html.menu a.sidebar-switch.switch-on {
	background: url(../img/sidebar-switch.gif) no-repeat 0 -18px;
    left: 153px;
}

html.menu a.sidebar-switch.switch-off {
	background: url(../img/sidebar-switch.gif) no-repeat 0 0;
    left: 10px;
}

/* sidebar */
html.menu div.sidebar {
	border-right: 1px solid #CCCCCC;
    float: left;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 42px;
    width: 181px;
    z-index: 99;
}

html.menu div.sidebar .panel-group {
	border-top: 1px solid #ccc;
	margin-bottom: 43px;
}

html.menu div.sidebar .panel-heading {
	text-shadow: 1px 1px 0 #efefef;
	background: #e0e0e0;
	-webkit-box-shadow: inset 0px 1px 0px 0px #ececec;
	box-shadow: inset 0px 1px 0px 0px #ececec;
	padding: 0;
}

html.menu div.sidebar .panel-heading a:hover {
	background-color: #cfcfcf;
}

html.menu div.sidebar .panel {
	-webkit-border-radius: 0;
	-moz-border-radius: 0;
	border-radius: 0;
	margin-bottom: 0;
	border-color: #ccc;
	border-style: solid;
	border-width: 0 0 1px;
}

html.menu div.sidebar .panel a {
	color: #222;
	letter-spacing: 1px;
	text-decoration: none !important;
}

html.menu div.sidebar .panel .active a {
	color: #fff;
}

html.menu div.sidebar .panel .panel-heading a {
	color: #222;
	letter-spacing: 3px;
}

html.menu div.sidebar .panel+.panel {
	margin-top: 0;
}

html.menu div.sidebar .panel-heading .accordion-toggle {
	display: block;
	padding: 8px 20px;
}

html.menu div.sidebar .panel-body {
	border-top: 1px solid #ccc;
	background: #fafafa;
}

html.menu div.sidebar .nav-pills>li>a {
	padding: 3px 15px;
}

html.menu div.sidebar .nav-header {
	color: #999999;
	display: block;
	font-size: 13px;
	letter-spacing: 1px;
	line-height: 20px;
	padding: 3px 20px 3px 3px;
	text-transform: uppercase;
}

html.menu div.sidebar li+.nav-header {
	margin-top: 5px;
}

/* iframe */
html.menu iframe.iframe {
	float: left;
    height: 100%;
    padding: 42px 0 0 182px;
    width: 100%;
}

html.menu iframe.iframe.no-sidebar {
	padding-left: 0px;
}