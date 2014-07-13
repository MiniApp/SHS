// JavaScript Document

//修改密码
$(document).ready(function(){
	
	$(".passwordFind_btn_email").click(function(e){
		e.preventDefault();
	    $('.email_find').css({
			display:'block',
		})
		$('.phone_find').css({
			display:'none',
		})
		$('.captcha').css({
			display:'block',
		})
	});
	
	$(".passwordFind_btn_phone").click(function(e){
		e.preventDefault();
	    $('.phone_find').css({
			display:'block',
		})
		$('.email_find').css({
			display:'none',
		})
		$('.captcha').css({
			display:'block',
		})
	});	
});


 //点击提交按钮判断弹出页面
$(document).ready(function(){
	$(".input_button").click(function(e){
		e.preventDefault();
		if($('.email_find').css("display")=="block")
		{
			$('#email_update').css({
				display:'block',
			})
			$('.password_update_one').css({
				display:'none',
			})
		}
		else if($('.email_find').css("display")=="none")
	    {
			$('#phone_update').css({
				display:'block',
			})
			$('.password_update_one').css({
				display:'none',
			})
		}
	});
});




 
//点击提交按钮跳转到输入新密码
$(document).ready(function(){
	$(".input_button_email").click(function(e){
		e.preventDefault();
	    $('#email_update').css({
			display:'none',
		})
		$('#reset_Password').css({
			display:'block',
		})
	});
	$(".input_button_phone").click(function(e){
		e.preventDefault();
	    $('#phone_update').css({
			display:'none',
		})
		$('#reset_Password').css({
			display:'block',
		})
	});
});



 //提现密码修改点击提交按钮判断弹出页面
$(document).ready(function(){
	$(".input_button_tx").click(function(e){
		e.preventDefault();
	
		$('.email_update').css({
			display:'block',
		})
		$('#update-password').css({
			display:'none',
		})

	});
});