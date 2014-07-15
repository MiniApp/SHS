package im.shs.web.template.method;

import im.shs.web.util.ConvertUtils;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

/**
 * @class : ConvertMethod
 * @description: 模板方法 - 转换
 *
 * @author suhao
 * @date 2014年7月13日 上午12:56:51
 * @version 1.0
 */
@Component("convertMethod")
public class ConvertMethod implements TemplateMethodModelEx {

    @SuppressWarnings("rawtypes")
    public Object exec(List arguments) throws TemplateModelException {

        // 验证参数
        if (arguments != null && !arguments.isEmpty() && arguments.get(0) != null
                && StringUtils.isNotBlank(arguments.get(0).toString())) {

            // 获取转换类型
            String type = arguments.get(0).toString();

            // 转换三目运算
            if (StringUtils.equals(type, "ternary") && arguments.size() > 3) {
                String bool = arguments.get(1).toString();
                String result1 = arguments.get(2).toString();
                String result2 = arguments.get(3).toString();
                return new SimpleScalar(ConvertUtils.toTernary(bool, result1, result2));
            }

            // 转换数字字符串
            if (StringUtils.equals(type, "intStr") && arguments.size() > 1) {
                String str = arguments.get(1).toString();
                return new SimpleScalar(ConvertUtils.toIntStr(str));
            }

        }

        return null;
    }

}