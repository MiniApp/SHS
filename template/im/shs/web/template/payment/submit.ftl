[@compress single_line = !systemDevelopment]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=[#if requestCharset?has_content]${requestCharset}[#else]utf-8[/#if]" />
		<meta name="author" content="ICLNetwork Team" />
		<meta name="copyright" content="ICLNetwork" />
		<title>${setting.basic.siteName}[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
	</head>
	<body onload="javascript: document.forms[0].submit();">
		<form action="${requestUrl}"[#if requestMethod??] method="${requestMethod}"[/#if][#if requestCharset?has_content] accept-charset="${requestCharset}"[/#if]>
			[#list parameterMap.entrySet() as entry]
				<input type="hidden" name="${entry.key}" value="${entry.value}" />
			[/#list]
		</form>
	</body>
</html>
[/@compress]