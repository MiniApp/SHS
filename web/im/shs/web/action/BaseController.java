package im.shs.web.action;

import im.shs.DateEditor;
import im.shs.Message;
import im.shs.util.SettingUtils;
import im.shs.util.SpringUtils;
import im.shs.web.setting.security.SecuritySetting;
import im.shs.web.template.directive.FlashMessageDirective;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import javax.annotation.Resource;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * @class : BaseController
 * @description: 基类
 *
 * @author suhao
 * @date 2014年7月12日 下午10:42:02
 * @version 1.0
 */
public class BaseController {

    /** 主页重定向URL */
    protected static final String HOMEPAGE_REDIRECT_URL = "redirect:/";

    /** 错误视图 */
    protected static final String ERROR_VIEW = "/error";

    /** 错误消息 */
    protected static final Message ERROR_MESSAGE = Message.error("操作错误");

    /** 成功消息 */
    protected static final Message SUCCESS_MESSAGE = Message.success("操作成功");

    @Resource(name = "validator")
    private Validator validator;

    /**
     * 数据绑定
     * 
     * @param binder
     *            WebDataBinder
     */
    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
        binder.registerCustomEditor(Date.class, new DateEditor(true));
    }

    /**
     * 数据验证
     * 
     * @param target
     *            验证对象
     * @param groups
     *            验证组
     * @return 验证结果
     */
    protected boolean verify(Object target, Class<?>... groups) {
        return validator.validate(target, groups).isEmpty();
    }

    /**
     * 数据验证
     * 
     * @param redirectAttributes
     *            重定向参数
     * @param target
     *            验证对象
     * @param groups
     *            验证组
     * @return 验证结果
     */
    protected boolean verify(RedirectAttributes redirectAttributes, Object target, Class<?>... groups) {
        Set<ConstraintViolation<Object>> constraintViolations = validator.validate(target, groups);
        if (constraintViolations.isEmpty()) {
            return true;
        } else {
            StringBuffer message = new StringBuffer("");
            for (Iterator<ConstraintViolation<Object>> iterator = constraintViolations.iterator(); iterator.hasNext();) {
                ConstraintViolation<Object> constraintViolation = (ConstraintViolation<Object>) iterator.next();
                message.append("<p>");
                message.append(constraintViolation.getMessage());
                message.append("</p>");
            }
            // 添加瞬时消息
            addFlashMessage(redirectAttributes, Message.error(message.toString()));
            return false;
        }
    }

    /**
     * 数据验证
     * 
     * @param type
     *            类型
     * @param property
     *            属性
     * @param value
     *            值
     * @param groups
     *            验证组
     * @return 验证结果
     */
    protected boolean verify(Class<?> type, String property, Object value, Class<?>... groups) {
        return validator.validateValue(type, property, value, groups).isEmpty();
    }

    /**
     * 数据验证
     * 
     * @param redirectAttributes
     *            重定向参数
     * @param type
     *            类型
     * @param property
     *            属性
     * @param value
     *            值
     * @param groups
     *            验证组
     * @return 验证结果
     */
    protected boolean verify(RedirectAttributes redirectAttributes, Class<?> type, String property, Object value,
            Class<?>... groups) {
        Set<?> constraintViolations = validator.validateValue(type, property, value, groups);
        if (constraintViolations.isEmpty()) {
            return true;
        } else {
            StringBuffer message = new StringBuffer("");
            for (Iterator<?> iterator = constraintViolations.iterator(); iterator.hasNext();) {
                ConstraintViolation<?> constraintViolation = (ConstraintViolation<?>) iterator.next();
                message.append("<p>");
                message.append(constraintViolation.getMessage());
                message.append("</p>");
            }
            // 添加瞬时消息
            addFlashMessage(redirectAttributes, Message.error(message.toString()));
            return false;
        }
    }

    /**
     * 货币格式化
     * 
     * @param amount
     *            金额
     * @param showSign
     *            显示标志
     * @param showUnit
     *            显示单位
     * @return 货币格式化
     */
    protected String currency(BigDecimal amount, boolean showSign, boolean showUnit) {
        SecuritySetting setting = SettingUtils.get().getSecurity();
        String price = setting.setScale(amount).toString();
        if (showSign) {
            price = setting.getCurrencySign() + price;
        }
        if (showUnit) {
            price += setting.getCurrencyUnit();
        }
        return price;
    }

    /**
     * 获取国际化消息
     * 
     * @param code
     *            代码
     * @param args
     *            参数
     * @return 国际化消息
     */
    protected String message(String code, Object... args) {
        return SpringUtils.getMessage(code, args);
    }

    /**
     * 添加瞬时消息
     * 
     * @param redirectAttributes
     *            RedirectAttributes
     * @param message
     *            消息
     */
    protected void addFlashMessage(RedirectAttributes redirectAttributes, Message message) {
        if (redirectAttributes != null && message != null) {
            redirectAttributes.addFlashAttribute(FlashMessageDirective.FLASH_MESSAGE_ATTRIBUTE_NAME, message);
        }
    }

    /**
     * 添加瞬时消息
     * 
     * @param model
     *            ModelMap
     * @param message
     *            消息
     */
    protected void addFlashMessage(ModelMap model, Message message) {
        if (model != null && message != null) {
            model.addAttribute(FlashMessageDirective.FLASH_MESSAGE_ATTRIBUTE_NAME, message);
        }
    }

}