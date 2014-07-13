package im.shs.web.template.method;

import java.util.List;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

/**
 * @class : AbbreviateMethod
 * @description: 模板方法 - 字符串缩略
 *
 * @author suhao
 * @date 2014年7月13日 上午12:56:00
 * @version 1.0
 */
@Component("abbreviateMethod")
public class AbbreviateMethod implements TemplateMethodModelEx {

    /** 中文字符配比 */
    private static final Pattern PATTERN = Pattern.compile("[\\u4e00-\\u9fa5\\ufe30-\\uffa0]+$");

    @SuppressWarnings("rawtypes")
    public Object exec(List arguments) throws TemplateModelException {
        if (arguments != null && !arguments.isEmpty() && arguments.get(0) != null
                && StringUtils.isNotBlank(arguments.get(0).toString())) {
            Integer width = null;
            String ellipsis = null;
            if (arguments.size() == 2) {
                if (arguments.get(1) != null) {
                    width = Integer.valueOf(arguments.get(1).toString());
                }
            } else if (arguments.size() > 2) {
                if (arguments.get(1) != null) {
                    width = Integer.valueOf(arguments.get(1).toString());
                }
                if (arguments.get(2) != null) {
                    ellipsis = arguments.get(2).toString();
                }
            }
            return new SimpleScalar(abbreviate(arguments.get(0).toString(), width, ellipsis));
        }
        return null;
    }

    /**
     * 
     * 字符串缩略
     * 
     * @param str
     *            原字符串
     * @param width
     *            宽度
     * @param ellipsis
     *            省略符
     * @return 缩略字符
     */
    private String abbreviate(String str, Integer width, String ellipsis) {
        if (width != null) {
            int strLength = 0;
            for (int strWidth = 0; strLength < StringUtils.length(str); strLength++) {
                strWidth = PATTERN.matcher(String.valueOf(str.charAt(strLength))).find() ? strWidth + 2 : strWidth + 1;
                if (strWidth >= width) {
                    break;
                }
            }
            if (strLength < StringUtils.length(str)) {
                if (ellipsis != null) {
                    return str.substring(0, strLength + 1) + ellipsis;
                } else {
                    return str.substring(0, strLength + 1);
                }
            } else {
                return str;
            }
        } else {
            if (ellipsis != null) {
                return str + ellipsis;
            } else {
                return str;
            }
        }
    }

}