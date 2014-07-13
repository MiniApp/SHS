package im.shs.web.template.method;

import im.shs.util.SpringUtils;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

/**
 * @class : MessageMethod
 * @description: 模板方法 - 多语言
 *
 * @author suhao
 * @date 2014年7月13日 上午1:01:07
 * @version 1.0
 */
@Component("messageMethod")
public class MessageMethod implements TemplateMethodModelEx {

	@SuppressWarnings("rawtypes")
	public Object exec(List arguments) throws TemplateModelException {
		if (arguments != null && !arguments.isEmpty()
				&& arguments.get(0) != null
				&& StringUtils.isNotBlank(arguments.get(0).toString())) {
			String message = null;
			String code = arguments.get(0).toString();
			if (arguments.size() > 1) {
				Object[] args = arguments.subList(1, arguments.size())
						.toArray();
				message = SpringUtils.getMessage(code, args);
			} else {
				message = SpringUtils.getMessage(code);
			}
			return new SimpleScalar(message);
		}
		return null;
	}

}