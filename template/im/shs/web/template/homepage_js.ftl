/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Homepage
 * Version: 3.0
 */
$().ready(function() {
	
	var mySwiper = new Swiper('.swiper-container',{ pagination: '.pagination', loop:true, grabCursor: false, paginationClickable: true, autoplay:5000, onlyExternal:true });
	$('.arrow-left').on('click', function(e){
		e.preventDefault();
		mySwiper.swipePrev();
	});
	$('.arrow-right').on('click', function(e){
		e.preventDefault();
    	mySwiper.swipeNext();
  	});
  	
});