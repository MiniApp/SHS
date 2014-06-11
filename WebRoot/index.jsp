<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<html>
<head>
	<title>Hello EXT5.0</title>
	<!-- <script type="text/javascript" src="resource/js/jsloader/jsloader.js"></script>
	<script type="text/javascript" src="resource/js/jsloader/base.js"></script>
	<script type="text/javascript" src="resource/js/jsloader/ext.js"></script>
	<script type="text/javascript" src="resource/js/jsloader/util.js"></script> -->
	<link rel="stylesheet" type="text/css" href="${base}/resource/js/extjs/4.2/resources/css/ext-all.css" />
	<script type="text/javascript" src=""${base}/resource/js/extjs/4.2/bootstrap.js"></script>
</head>
<body>
<script type="text/javascript">
	Ext.onReady(function() {
		var page = Ext.create("crm.pages.mainPage.MainPage", {
			id : 'MainPage'
		});
		page.render();
	})
</script>
</body>
</html>
