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
		<form id="form" method="post">
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
	<select id="cont_module" class="form-control chosen-select" name="auths" multiple="true" data-placeholder="&nbsp;">
		<optgroup label="文章管理">
			<option >文章分类管理</option>
			<option >文章列表</option>
		</optgroup>
		<optgroup label="广告管理">
			<option >广告位管理</option>
			<option >广告列表</option>
		</optgroup>
	</select>
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
		  var cmd =  [{"storeId":"0a1", "address":"西斗门路2号", "goods":[{"goodsId":"1"}, {"goodsId":"2"}, {"goodsId":"3"}]},{"storeId":"0a1", "address":"西斗门路2号", "goods":[{"goodsId":"4"}, {"goodsId":"4"}, {"goodsId":"5"}]}];
	      $(form).ajaxSubmit({
	        url:"${base}/index/test2",
	        type : "POST",  
            datatype:"json",  
            contentType: "application/json; charset=utf-8",  
            data :jQuery.parseJSON(cmd),  
            success : function(data, stats) {  
                if (stats == "success") {  
                  //   window.location.href="/yc"  
                }  
            },  
            error : function(data) {  
                alert("请求失败");  
            }  
	      });
	    }
	});
});

</script>
</html>
