<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">    
<html>
<head>
	<meta http-equiv=Content-Type content="text/html;charset=utf-8">
	<title>Hello EXT5.0</title>
	<script type="text/javascript" src="${base}/resource/js/jquery/jquery-1.11.1.min.js"></script>
	<script type="text/JavaScript" src="${base}/resource/js/jquery/jquery.form.js"></script>
	<script type="text/javascript" src="${base}/resource/js/jquery/jquery.validate.min.js"></script>
</head>
<body>
	<header class="container">
		<h1>Basic Demo</h1>
	</header>

	<div class="container">
		<form id="form">
			<div class="control-group input-append">
				<input type="text" name="nickname" id="nickname" data-required="true" />

				<label for="nickname" class="add-on"><span class="icon-asterisk"></span> Nickname</label>
			</div>
			<div class="btn-group">
				<button type="submit" class="btn btn-primary">Send</button>
			</div>
		</form>
	</div>
	<div id="test"></div>
</body>
<script type="text/javascript">
$(function(){
	$('form').validate({
		rules: {
			nickname: {
				required:true
			}
		},
		messages : {
			nickname: {
				required:"不能为空"
			}
		},
		errorPlacement:function(error,element){
	      var s=element.parent().find("span[htmlFor='" + element.attr("id") + "']");
	     
	      error.appendTo(element.parent());
	    },
		submitHandler:function(form){
		  var cmd =  {club:[{name:"suhao", age:"27"}, {name:"suhao2", age:"28"}]};
	      $(form).ajaxSubmit({
	        url:"${base}/index/test2",
	        type : "POST",  
            datatype:"json",  
            data : cmd,  
	        success: function(data) {
	        	$("#test").html(data);
	        }
	      });
	    }
	});
});

</script>
</html>
