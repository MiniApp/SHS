package im.shs.web.template.method;

import im.shs.web.util.SecrecyUtils;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

/**
 * @class : SecrecyMethod
 * @description: 模板方法 - 保密格式化
 *
 * @author suhao
 * @date 2014年7月13日 上午1:02:20
 * @version 1.0
 */
@Component("secrecyMethod")
public class SecrecyMethod implements TemplateMethodModelEx {

    @SuppressWarnings("rawtypes")
    public Object exec(List arguments) throws TemplateModelException {

        // 验证参数
        if (arguments != null && !arguments.isEmpty() && arguments.get(0) != null
                && StringUtils.isNotBlank(arguments.get(0).toString())) {

            // 获取格式化类型
            String type = arguments.get(0).toString();

            // 格式化用户名
            if (StringUtils.equals(type, "username") && arguments.size() > 1) {
                String username = arguments.get(1).toString();
                return new SimpleScalar(SecrecyUtils.toUsername(username, null));
            }

            // 格式化全名
            if (StringUtils.equals(type, "fullName") && arguments.size() > 1) {
                String fullName = arguments.get(1).toString();
                return new SimpleScalar(SecrecyUtils.toName(fullName, null));
            }

            // 格式化姓名
            if (StringUtils.equals(type, "surname-name") && arguments.size() > 2) {
                String surname = arguments.get(1).toString();
                String name = arguments.get(2).toString();
                String replaceChar = arguments.get(3) != null ? arguments.get(3).toString() : null;
                return new SimpleScalar(SecrecyUtils.toName(surname, name, replaceChar));
            }

            // 格式化邮箱地址
            if (StringUtils.equals(type, "email") && arguments.size() > 1) {
                String email = arguments.get(1).toString();
                return new SimpleScalar(SecrecyUtils.toEmail(email, null));
            }

            // 格式化手机号码
            if (StringUtils.equals(type, "mobile") && arguments.size() > 1) {
                String mobile = arguments.get(1).toString();
                return new SimpleScalar(SecrecyUtils.toMobile(mobile, null));
            }

            // 格式化身份证号码
            if (StringUtils.equals(type, "idNo") && arguments.size() > 1) {
                String identity = arguments.get(1).toString();
                return new SimpleScalar(SecrecyUtils.toIdNo(identity, null));
            }
            
            // 格式化银行卡号
            if (StringUtils.equals(type, "backcard") && arguments.size() > 1) {
                String backcard = arguments.get(1).toString();
                return new SimpleScalar(SecrecyUtils.toBackCard(backcard, null));
            }

        }

        return null;
    }

}