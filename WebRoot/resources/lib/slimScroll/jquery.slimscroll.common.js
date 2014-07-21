/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - jQuery Slim Scroll Common
 * Version: 3.0
 */

$().ready(function(){
	
	$("div#slimScroll").slimScroll({
        position: "left",
        height: "auto",
        alwaysVisible: true,
        opacity: "0.2",
		wheelStep: 1
    });
	
});