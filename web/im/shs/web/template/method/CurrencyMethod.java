package im.shs.web.template.method;

import im.shs.util.SettingUtils;
import im.shs.web.setting.security.SecuritySetting;

import java.math.BigDecimal;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;

/**
 * @class : CurrencyMethod
 * @description: 模板方法 - 货币格式化
 *
 * @author suhao
 * @date 2014年7月13日 上午12:57:49
 * @version 1.0
 */
@Component("currencyMethod")
public class CurrencyMethod implements TemplateMethodModelEx {

    @SuppressWarnings("rawtypes")
    public Object exec(List arguments) throws TemplateModelException {
        if (arguments != null && !arguments.isEmpty() && arguments.get(0) != null
                && StringUtils.isNotBlank(arguments.get(0).toString())) {
            boolean showSign = false;
            boolean showUnit = false;
            if (arguments.size() == 2) {
                if (arguments.get(1) != null) {
                    showSign = Boolean.valueOf(arguments.get(1).toString());
                }
            } else if (arguments.size() > 2) {
                if (arguments.get(1) != null) {
                    showSign = Boolean.valueOf(arguments.get(1).toString());
                }
                if (arguments.get(2) != null) {
                    showUnit = Boolean.valueOf(arguments.get(2).toString());
                }
            }
            SecuritySetting setting = SettingUtils.get().getSecurity();
            BigDecimal amount = new BigDecimal(arguments.get(0).toString());
            String price = setting.setScale(amount).toString();
            if (showSign) {
                price = setting.getCurrencySign() + price;
            }
            if (showUnit) {
                price += setting.getCurrencyUnit();
            }
            return new SimpleScalar(price);
        }
        return null;
    }

}