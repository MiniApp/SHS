package im.shs.web.template.directive;

import im.shs.Message;

import java.io.IOException;
import java.io.Writer;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * @class : FlashMessageDirective
 * @description: 模板指令 - 瞬时消息
 *
 * @author suhao
 * @date 2014年7月13日 上午1:31:38
 * @version 1.0
 */
@Component("flashMessageDirective")
public class FlashMessageDirective extends BaseDirective {

    /** "瞬时消息"属性名称 */
    public static final String FLASH_MESSAGE_ATTRIBUTE_NAME = FlashMessageDirective.class.getName() + ".FLASH_MESSAGE";

    /** 变量名称 */
    private static final String VARIABLE_NAME = "flashMessage";

    @SuppressWarnings("rawtypes")
    public void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body)
            throws TemplateException, IOException {

        // 获取请求参数
        RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
        if (requestAttributes != null) {

            // 获取消息
            Message message = (Message) requestAttributes.getAttribute(FLASH_MESSAGE_ATTRIBUTE_NAME,
                    RequestAttributes.SCOPE_REQUEST);

            // 输出消息
            if (body != null) {
                setLocalVariable(VARIABLE_NAME, message, env, body);
            } else {
                if (message != null) {
                    Writer out = env.getOut();
                    out.write("$.globalMessenger().post({type: \"" + message.getType() + "\", message: \""
                            + message.getCont() + "\", showCloseButton: true});");
                }
            }
        }
    }

}